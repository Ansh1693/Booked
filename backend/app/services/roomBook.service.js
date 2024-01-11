const Room = require("../models/room.model.js");
const Hotel = require("../models/hotel.model.js");
const RoomBook = require("../models/roomBook.model.js");
const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");
const payment = require("../models/payment.model.js");
const { updateUser, sendOtp } = require("../services/user.service.js");

exports.saveRoomBookConfig = async (req, res) => {
  try {
    console.log(req.body);
    let { userDetails, bookingDetails, guestDetails } = req.body;
    let customerId, mode;
    if (req.user) {
      if (req.user.role == "RECEPTION") mode = "OFFLINE";
    } else mode = "ONLINE";

    let newUser;
    let otpToken = null;

    const oldUser = await User.findOne({ email: userDetails.email });

    if (oldUser) {
      customerId = oldUser._id;
      req.body.user = {};
      if (!oldUser.firstName) {
        req.body.user.firstName = userDetails.firstName;
      }
      if (!oldUser.lastName) {
        req.body.user.lastName = userDetails.lastName;
      }
      if (!oldUser.mobile) {
        req.body.user.mobile = userDetails.mobile;
      }
      req.body.email = userDetails.email;
      await updateUser(req, res);
    } else {
      newUser = new User();
      Object.assign(newUser, userDetails);
      newUser.role = "CUSTOMER";
      customerId = newUser._id;
      await newUser.save();
      otpToken = await sendOtp(newUser.email);
      console.log(otpToken);
    }

    let newUserCheck = false;
    if (!oldUser) newUserCheck = true;
    let paymentVerified;
    if (req.body.payment)
      paymentVerified = await payment.findById(req.body.payment._id);
    if (req.body.payment.status !== "SUCCESS") {
      const newRoomBookConfig = new RoomBook({
        customerId: customerId,
        guests: guestDetails,
        status: "FAILED",
        hotelId: bookingDetails[0].hotelId,
        mode: mode,
        paymentInfo: [req.body.payment._id],
        night: req.body.bookingDetails[0].night,
        checkIn: req.body.bookingDetails[0].checkIn,
        checkOut: req.body.bookingDetails[0].checkOut,
      });

      await newRoomBookConfig.save();
      if (newUserCheck) {
        newUser.roomBookings.push(newRoomBookConfig._id);
        await newUser.save();
      } else {
        oldUser.roomBookings.push(newRoomBookConfig._id);
        await oldUser.save();
      }

      paymentVerified.roomBookings.push(newRoomBookConfig._id);

      await paymentVerified.save();
      return Promise.reject({
        message: "payment not verified",
        payment: paymentVerified,
        newUser: newUserCheck,
        token: otpToken,
      });
    }

    if (!(userDetails && bookingDetails.length)) {
      return Promise.reject("All input is required");
    }
    let hotelIds = bookingDetails.map((item) => item.hotelId);
    let roomIds = bookingDetails.map((item) => item.roomId);
    let savedHotelConfigList = await Hotel.find({
      hotelId: { $in: hotelIds },
    }).populate({
      path: "rooms",
      match: { roomId: { $in: roomIds } },
      populate: {
        path: "roomDetails",
        populate: {
          path: "bookingDetails",
          match: {
            status: "Booked",
            // $gte: new Date(req.body.bookingDetails[0].checkIn),
            $or: [
              {
                $and: [
                  { checkin: { $lte: new Date(req.body.bookingDetails[0].checkOut) } },
                  { checkOut: { $gt: new Date(req.body.bookingDetails[0].checkIn) } },
                ],
              },
              {
                $and: [
                  { checkIn: { $gt: new Date(req.body.bookingDetails[0].checkOut) } },
                  { checkout: { $lte: new Date(req.body.bookingDetails[0].checkIn) } },
                ],
              },
            ],

          },
        },
      },
    });

    let savedRoomIds;
    savedHotelConfigList.map((a) => {
      savedRoomIds = a.rooms.map((item) => item.roomId);
    });
    let isRoomIds = JSON.stringify(savedRoomIds) == JSON.stringify(roomIds);
    if (!isRoomIds) {
      const newRoomBookConfig = new RoomBook({
        customerId: customerId,
        status: "FAILED",
        mode: mode,
        hotelId: bookingDetails[0].hotelId,
        paymentInfo: [req.body.payment._id],
        night: req.body.bookingDetails[0].night,
        checkIn: req.body.bookingDetails[0].checkIn,
        checkOut: req.body.bookingDetails[0].checkOut,
        guests: guestDetails,
      });

      await newRoomBookConfig.save();

      if (newUserCheck) {
        newUser.roomBookings.push(newRoomBookConfig._id);
        await newUser.save();
      } else {
        oldUser.roomBookings.push(newRoomBookConfig._id);
        await oldUser.save();
      }

      paymentVerified.roomBookings.push(newRoomBookConfig._id);

      await paymentVerified.save();
      return Promise.reject({
        message: "Room Id Not Found",
        payment: paymentVerified,
        newUser: newUserCheck,
        token: otpToken,
      });
    }

    let roomAvailable = [];
    savedHotelConfigList.map((a, i) => {
      a.rooms.map((b) => {
        b.roomDetails.map((c, j) => {
          if (c.bookingDetails.length) {
            let index;
            if (b.roomType == "Dormitory") {
              index = b.roomDetails.findIndex(
                (element) => element.bedNumber == c.bedNumber
              );
            } else {
              index = b.roomDetails.findIndex(
                (element) => element.roomNumber == c.roomNumber
              );
            }
            b.roomDetails.splice(index, 1);
          }
        });
        roomAvailable.push(b);
      });
    });

    let roomNotAvailable = false;
    roomAvailable.map((o, i) => {
      if (o.roomDetails.length >= bookingDetails[i].bookingNoOfRoom)
        return true;
      else return (roomNotAvailable = true);
    });
    if (roomNotAvailable) {
      const newRoomBookConfig = new RoomBook({
        customerId: customerId,
        status: "FAILED",
        mode: mode,
        hotelId: bookingDetails[0].hotelId,
        paymentInfo: [req.body.payment._id],
        night: req.body.bookingDetails[0].night,
        checkIn: req.body.bookingDetails[0].checkIn,
        checkOut: req.body.bookingDetails[0].checkOut,
        guests: guestDetails,
      });

      await newRoomBookConfig.save();
      if (newUserCheck) {
        newUser.roomBookings.push(newRoomBookConfig._id);
        await newUser.save();
      } else {
        oldUser.roomBookings.push(newRoomBookConfig._id);
        await oldUser.save();
      }

      paymentVerified.roomBookings.push(newRoomBookConfig._id);

      await paymentVerified.save();
      return Promise.reject({
        message: "Room Not Available",
        payment: paymentVerified,
        newUser: newUserCheck,
        token: otpToken,
      });
    }

    for (const [i, o] of roomAvailable.entries()) {
      for (let p = 0; p < bookingDetails[i].bookingNoOfRoom; p++) {
        let newRoomBookConfig = null;
        newRoomBookConfig = new RoomBook();
        Object.assign(newRoomBookConfig, bookingDetails[i]);
        newRoomBookConfig.customerId = customerId;
        newRoomBookConfig.mode = mode;
        newRoomBookConfig.guests = guestDetails;
        if (o.roomType == "Dormitory") {
          newRoomBookConfig.bedNumber = o.roomDetails[p].bedNumber;
          let amount = o.bedPrice * bookingDetails[i].night;
          amount = amount + amount * 0.18;
          newRoomBookConfig.totalRoomAmount.amount = amount;
        } else {
          newRoomBookConfig.roomNumber = o.roomDetails[p].roomNumber;
          let amount =
            (o.roomPrice);
          if(bookingDetails[i].extra > 0){
            let rem = bookingDetails[i].extra;
            if(rem<=2){
              amount = amount + (o.extraBedPrice * rem);
              bookingDetails[i].extra = 0;
            }else{
              amount = amount + (o.extraBedPrice * 2);
              bookingDetails[i].extra = rem - 2;
            }
          };

          amount = amount * bookingDetails[i].night;
          amount = amount + amount * 0.18;
          newRoomBookConfig.totalRoomAmount.amount = amount;
        }
        let isRoom = null;
        isRoom = await Room.findOne({ roomId: o.roomId });
        let index;
        if (o.roomType == "Dormitory") {
          index = isRoom.roomDetails.findIndex(
            (element) => element.bedNumber == o.roomDetails[p].bedNumber
          );
        } else {
          index = isRoom.roomDetails.findIndex(
            (element) => element.roomNumber == o.roomDetails[p].roomNumber
          );
        }
        isRoom.roomDetails[index].bookingDetails.push(newRoomBookConfig._id);
        if (mode === "ONLINE") {
          newRoomBookConfig.paymentInfo.push(req.body.payment._id);
          if (
            req.body.payment.amount / 100 >
            newRoomBookConfig.totalRoomAmount.amount
          ) {
            newRoomBookConfig.totalRoomAmount.paidAmount =
              newRoomBookConfig.totalRoomAmount.amount;
            req.body.payment.amount =
              req.body.payment.amount -
              newRoomBookConfig.totalRoomAmount.amount * 100;
          } else {
            newRoomBookConfig.totalRoomAmount.paidAmount =
              req.body.payment.amount / 100;
            req.body.payment.amount = 0;
          }
          if (
            newRoomBookConfig.totalRoomAmount.paidAmount ==
            newRoomBookConfig.totalRoomAmount.amount
          ) {
            newRoomBookConfig.totalRoomAmount.paymentMade = true;
          }
        }
        await newRoomBookConfig.save();
        if (mode === "ONLINE") {
          paymentVerified.roomBookings.push(newRoomBookConfig._id);
          await paymentVerified.save();
        }
        await isRoom.save();
        if (oldUser) {
          oldUser.roomBookings.push(newRoomBookConfig._id);
          await oldUser.save();
        } else {
          newUser.roomBookings.push(newRoomBookConfig._id);
          await newUser.save();
        }
      }
    }
    // paymentVerified = await paymentVerified.save();

    // if(oldUser)  await oldUser.save();
    // else await newUser.save();

    console.log(paymentVerified);

    const data = {
      userDetails,
      payment: paymentVerified,
      newUser: newUserCheck,
      token: otpToken,
    };

    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

exports.saveRoomCancelConfig = async (req, res) => {
  try {
    const { roomBookedId } = req.body;
    if (!roomBookedId) {
      return Promise.reject("room booked id is required");
    }
    let savedRoomBookConfig = await RoomBook.find({
      _id: { $in: roomBookedId },
    }).where("status", "Booked");
    if (!savedRoomBookConfig.length) {
      return Promise.reject(
        "room not booked from id " +
          roomBookedId +
          " so coudn't able to cancel room "
      );
    } else {
      savedRoomBookConfig.forEach(async (element) => {
        element.status = "Canceled";
        await element.save();
      });
      return Promise.resolve("Room has been canceled successful!");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.roomBookPayment = async (req, res) => {
  try {
    const { paymentDetails } = req.body;
    if (!paymentDetails) {
      return Promise.reject("All input is required");
    }
    let roomBookedId = paymentDetails.map((item) => item.roomBookedId);
    let roomAmount = paymentDetails.map((item) => item.roomAmount);

    let savedRoomBookConfig = await RoomBook.find({
      _id: { $in: roomBookedId },
    }).where("status", "Booked");
    if (!savedRoomBookConfig.length) {
      return Promise.reject(
        "room not booked from id " +
          roomBookedId +
          " so coudn't able to make a payment "
      );
    } else {
      savedRoomBookConfig.forEach(async (element, i) => {
        element.totalRoomAmount.paidAmount = roomAmount[i];
        element.totalRoomAmount.paymentMade = true;
        element.totalRoomAmount.mode = "ONLINE";
        await element.save();
      });
      return Promise.resolve("Payment has been made successful!");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.saveRoomCheckoutConfig = async (req, res) => {
  try {
    let { bookingRooms, amount, remainingAmount, hotelId } = req.body;
    const bookings = await RoomBook.find({
      roomNumber: { $in: bookingRooms },
      status: "CheckedIn",
      checkedIn: true,
      checkedOut: false,
      checkIn: { $lte: new Date() },
      checkOut: { $gte: new Date() },
      hotelId: hotelId
    });

    if (remainingAmount > 0) {
        let amount2= amount;
      const paymentDetails = new payment();
      paymentDetails.amount = amount;
      paymentDetails.status = "SUCCESS";
      paymentDetails.mode = "OFFLINE";
      paymentDetails.roomBookings = [];
      await paymentDetails.save();
      for (const [i, o] of bookings.entries()) {
        if (amount2 == 0) break;
        let check = false;
        if (o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount > 0) {
          if (
            o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount >
            amount
          ) {
            o.totalRoomAmount.paidAmount += amount;
            amount2 = 0;
            check = true;
          } else {
            amount2 -= o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount;
            o.totalRoomAmount.paidAmount = o.totalRoomAmount.amount;
            if (o.totalRoomAmount.paidAmount == o.totalRoomAmount.amount)
              o.totalRoomAmount.paymentMade = true;
            check = true;
          }
        }

        if (o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount > 0) {
          if (
            o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount >
            amount2
          ) {
            o.totalFoodAmount.paidAmount += amount;
            amount2 = 0;
            check = true;
          } else {
            amount2 -= o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount;
            o.totalFoodAmount.paidAmount = o.totalFoodAmount.amount;
            if (o.totalFoodAmount.paidAmount == o.totalFoodAmount.amount)
              o.totalFoodAmount.paymentMade = true;
            check = true;
          }
        }
        if (check) {
          o.paymentInfo.push(paymentDetails._id);
          paymentDetails.roomBookings.push(o._id);
          await paymentDetails.save();
          await o.save();
        }
      }
    }

    if(remainingAmount === amount){
        for (const [i, o] of bookings.entries()) {
            o.status= "Complete";
            o.checkedOut= true;
           await o.save();
        }

        return Promise.resolve("Room Checked Out Successfully");
    }else{
        return Promise.reject("Room not checked out")
    }

  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
//get bookings based on user email or booked roomnumbers
exports.getBookings = async (req, res) => {
  const { email, roomNumbers, hotelId } = req.body;
  try {
    let bookings;
    const current = new Date(Date.now() );
    if (email) {
      const user = await User.findOne({ email: email });
      if (user) {
        bookings = await RoomBook.find({
          customerId: user._id,
          checkIn: { $lte: current },
          checkOut: { $gte: current },
          hotelId: hotelId,
        }).populate("customerId");
      } else {
        return Promise.reject("User not found");
      }
    } else {
      bookings = await RoomBook.find({
        roomNumber: { $in: roomNumbers },
        checkIn: { $lte: current },
        checkOut: { $gte: current },
        hotelId: hotelId,
        status: "Booked",
      }).populate("customerId");
    }
    return Promise.resolve(bookings);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

exports.saveRoomCheckinConfig = async (req, res) => {
  const { roomNumbers, hotelId } = req.body;
  try {
    let bookings;
    const current = new Date();

    if (roomNumbers) {
      bookings = await RoomBook.find({
        roomNumber: { $in: roomNumbers },
        checkIn: { $lte: current },
        checkOut: { $gte: current },
        hotelId: hotelId,
        status: "Booked",
      }).populate("customerId");
      for (const [i, o] of bookings.entries()) {
        o.status = "CheckedIn";
        o.checkedIn = true;
        await o.save();
      }
      console.log(bookings);
      return Promise.resolve("Room Checked In Successfully");
    } else {
      return Promise.reject("Room numbers not found");
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

exports.getAmountRemaining = async (req, res) => {
  const { email, roomNumbers, hotelId } = req.body;
  try {
    let bookings;
    console.log(email, roomNumbers, hotelId);
    const current = new Date(Date.now() + 24 * 60 * 60 * 1000);
    console.log(current);

    if (email) {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (user) {
        bookings = await RoomBook.find({
          customerId: user._id,
          checkIn: { $lte: current },
          checkOut: { $gte: current },
          hotelId: hotelId,
          status: "CheckedIn",
          checkedIn: true,
          checkedOut: false,
        }).populate("customerId foodOrdered");
      } else {
        return Promise.reject("User not found");
      }
    } else {
      bookings = await RoomBook.find({
        roomNumber: { $in: roomNumbers },
        checkIn: { $lte: current },
        checkOut: { $gte: current },
        hotelId: hotelId,
      }).populate("customerId foodOrdered");
    }
    console.log(bookings);
    let foodOrdered = [];
    let totalBookingAmount = 0;
    let paidBookingAmount = 0;
    let remainingBookingAmount = 0;
    let totalFoodAmount = 0;
    let paidFoodAmount = 0;
    let remainingFoodAmount = 0;
    bookings.forEach((element) => {
      foodOrdered = [...element.foodOrdered, ...foodOrdered];
      totalBookingAmount += element.totalRoomAmount.amount;
      paidBookingAmount += element.totalRoomAmount.paidAmount;
      totalFoodAmount += element.totalFoodAmount.amount;
      paidFoodAmount += element.totalFoodAmount.paidAmount;
    });

    remainingBookingAmount = totalBookingAmount - paidBookingAmount;
    remainingFoodAmount = totalFoodAmount - paidFoodAmount;

    return Promise.resolve({
      totalBookingAmount,
      paidBookingAmount,
      remainingBookingAmount,
      totalFoodAmount,
      paidFoodAmount,
      remainingFoodAmount,
      foodOrdered,
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

exports.payRemainingAmount = async (req, res) => {
  try {
    const { bookingRooms, amount } = req.body;
    const bookings = await RoomBook.find({
      roomNumber: { $in: bookingRooms },
      status: "CheckedIn",
      checkedIn: true,
      checkIn: { $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      checkOut: { $gte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    });
    const paymentDetails = new payment();
    paymentDetails.amount = amount;
    paymentDetails.status = "SUCCESS";
    paymentDetails.mode = "OFFLINE";
    paymentDetails.roomBookings = [];
    await paymentDetails.save();
    for (const [i, o] of bookings.entries()) {
      if (amount == 0) break;
      let check = false;
      if (o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount > 0) {
        if (o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount > amount) {
          o.totalRoomAmount.paidAmount += amount;
          amount = 0;
          check = true;
        } else {
          amount -= o.totalRoomAmount.amount - o.totalRoomAmount.paidAmount;
          o.totalRoomAmount.paidAmount = o.totalRoomAmount.amount;
          if (o.totalRoomAmount.paidAmount == o.totalRoomAmount.amount)
            o.totalRoomAmount.paymentMade = true;
          check = true;
        }
      }

      if (o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount > 0) {
        if (o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount > amount) {
          o.totalFoodAmount.paidAmount += amount;
          amount = 0;
          check = true;
        } else {
          amount -= o.totalFoodAmount.amount - o.totalFoodAmount.paidAmount;
          o.totalFoodAmount.paidAmount = o.totalFoodAmount.amount;
          if (o.totalFoodAmount.paidAmount == o.totalFoodAmount.amount)
            o.totalFoodAmount.paymentMade = true;
          check = true;
        }
      }

      o.paymentInfo.push(paymentDetails._id);
      paymentDetails.roomBookings.push(o._id);
      await paymentDetails.save();
      await o.save();
    }

    return Promise.resolve(paymentDetails);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
