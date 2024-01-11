const Hotel = require("../models/hotel.model.js");
const User = require("../models/user.model.js");
const FoodOrdered = require("../models/foodOrdered.model.js");
const RoomBook = require("../models/roomBook.model.js");

exports.findOnePartnerReceptionConfig = async (req, res) => {
  try {
    const savedUserConfig = await User.findById({ _id: req.user.id });
    if (savedUserConfig) {
      const hotelDetails = await Hotel.findOne({
        partnerId: savedUserConfig.partnerId,
      }).populate({
        path: "rooms",
        populate: {
          path: "roomDetails",
          populate: {
            path: "bookingDetails",
            populate: { path: "foodOrdered customerId" },
          },
        },
      });
      const {
        rooms,
        hotelId,
        hotelName,
        hotelEmail,
        hotelUrl,
        description,
        address,
        city,
        amenities,
        images,
      } = hotelDetails;
      let roomBookedDetails = [],
        roomCompleteDetails = [],
        roomCanceledDetails = [],
        roomCheckedInDetails = [];
      rooms.map((o) => {
        o.roomDetails.map((p) => {
          p.bookingDetails.map((q) => {
            if (q.status == "Booked") roomBookedDetails.push(q);
            else if (q.status == "CheckedIn") roomCheckedInDetails.push(q);
            else if (q.status == "Complete") roomCompleteDetails.push(q);
            else if (q.status == "Canceled") roomCanceledDetails.push(q);
          });
        });
      });
      let data = {};
      data.profile = savedUserConfig;
      data.hotelDetails = {
        hotelId,
        hotelName,
        hotelEmail,
        hotelUrl,
        description,
        address,
        city,
        amenities,
        images,
      };
      data.roomBookingDetails = {
        roomBookedDetails,
        roomCompleteDetails,
        roomCanceledDetails,
        roomCheckedInDetails,
      };
      return Promise.resolve(data);
    } else {
      return Promise.reject("user not found with id " + req.user.id);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.foodOrdered = async (req, res) => {
  try {
    let savedRoomBookConfig = await RoomBook.findById({
      _id: req.params.roomBookedId,
    });
    if (savedRoomBookConfig) {
      if (savedRoomBookConfig.status == "Complete") {
        return Promise.reject("Room has been already checkout");
      } else {
        let totalFoodAmount = 0;
        req.body.forEach(async (element) => {
          let foodOrdered = null;
          foodOrdered = new FoodOrdered();
          Object.assign(foodOrdered, element);
          totalFoodAmount += Number(element.total);
          savedRoomBookConfig.foodOrdered.push(foodOrdered._id);
          await foodOrdered.save();
        });
        savedRoomBookConfig.totalFoodAmount.amount += totalFoodAmount;
        savedRoomBookConfig.totalFoodAmount.paymentMade = false;
        await savedRoomBookConfig.save();
        return Promise.resolve("Food Ordered Successfully");
      }
    } else {
      return Promise.reject("Room Booked Not Found");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
