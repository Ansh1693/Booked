const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    razorpay_payment_id: { type: String },
    razorpay_order_id: { type: String },
    razorpay_signature: { type: String },
    mode: { type: String },
    amount : { type: Number },
    status : { type: String },
    roomBookings : [{ type: mongoose.Schema.Types.ObjectId, ref: "roomBook" }],
    razorpay_refund_id: { type: String },
});

module.exports = mongoose.model("payment", paymentSchema);