const payment = require("../models/payment.model.js");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

exports.createOrderId = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: +amount * 100,
    currency: "INR",
    receipt: shortid.generate(),
  };

  try {
    const response = await instance.orders.create(options);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  const sign = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(sign.toString())
    .digest("hex");

  if (req.body.razorpay_signature === expectedSign) {
    const response = await instance.orders.fetchPayments(
      req.body.razorpay_order_id
    );
    let newPayment = await payment.findOne({  
      razorpay_order_id: req.body.razorpay_order_id,
    });

    if (response.items.length > 0) {
      const confirmed = response.items.filter(
        (item) => item.status === "captured"
      );
      if (confirmed.length === 0) {
        if (!newPayment) {
          newPayment = await payment.create({
            razorpay_order_id: req.body.razorpay_order_id,
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_signature: req.body.razorpay_signature,
            amount: req.body.amount,
            status: "FAILED",
          });
        }
      } else {
        if (newPayment) {
          newPayment.status = "SUCCESS";
          (newPayment.razorpay_payment_id = req.body.razorpay_payment_id),
            (newPayment.razorpay_signature = req.body.razorpay_signature),
            (newPayment.roomBookings = []);
          await newPayment.save();
        } else {
          newPayment = await payment.create({
            razorpay_order_id: req.body.razorpay_order_id,
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_signature: req.body.razorpay_signature,
            amount: req.body.amount,
            roomBookings: [],
            status: "SUCCESS",
          });
        }
      }
      req.body.payment = newPayment;
      next();
    }
  } else {
    return res.status(400).json({ message: "payment not verified" });
  }
};

exports.paymentFailure = async (req, res, next) => {
  try {
    console.log(req.body);

    let newPayment = await payment.findOne({
      razorpay_order_id: req.body.error.metadata.order_id,
    });

    if (newPayment) {
      newPayment.status = "FAILURE";
      newPayment.razorpay_payment_id = req.body.error.metadata.payment_id;
      newPayment.roomBookings = [];
      await newPayment.save();
    } else {
      newPayment = await payment.create({
        razorpay_order_id: req.body.error.metadata.order_id,
        razorpay_payment_id: req.body.error.metadata.payment_id,
        amount: req.body.amount,
        status: "FAILURE",
        roomBookings: [],
      });
    }

    req.body.payment = newPayment;
    next();
  } catch (error) {}
};

exports.getBookingsfromPayment = async (req, res) => {
  try {
    const createdPayment = await payment
      .findById(req.params.paymentid)
      .populate("roomBookings");
    if (!payment) {
      return Promise.reject("payment not found");
    } else {
      console.log(createdPayment);
      return Promise.resolve({ payment: createdPayment });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const paymentBody = req.body.payment;
    const paymentDb = await payment
      .findById(paymentBody._id)
      .populate("roomBookings");

    // console.log(paymentDb);
    if (!paymentDb) {
      return Promise.reject("payment not found");
    } else {
      if (paymentDb.status === "SUCCESS") {
        const paymentCheck = await instance.payments.fetch(
          paymentBody.razorpay_payment_id
        );
        if (paymentCheck.status === "captured") {
          const refund = await instance.payments.refund(
            paymentBody.razorpay_payment_id,
            {
              speed: "optimum",
            }
          );

          console.log(refund);
          if (refund.status === "processed") {
            paymentDb.razorpay_refund_id = refund.id;
            paymentDb.status = "REFUNDED";
            await paymentDb.save();

            return Promise.resolve({ payment: paymentDb });
          } else {
            return Promise.reject("refund failed");
          }
        } else {
          return Promise.reject("payment not found");
        }
      } else if (paymentDb.status === "REFUNDED") {
        return Promise.reject("payment already refunded");
      } else {
        return Promise.reject("Amount not captured");
      }
    }
  } catch (error) {
    // console.log(error);
    return Promise.reject(error.message);
  }
};

exports.checkRefundStatus = async (req, res) => {
  try {
    const paymentId = req.params.paymentid;
    const paymentDb = await payment.findById(paymentId);
    if (!paymentDb) {
      return Promise.reject("payment not found");
    } else {
      if (paymentDb.status !== "REFUNDED") {
        return Promise.reject("payment refund not found! Intiate refund first");
      } else {
        const refund = await instance.refunds.fetch(
          paymentDb.razorpay_refund_id
        );

        return Promise.resolve({ refund: refund });
      }
    }
  } catch (error) {}
};
