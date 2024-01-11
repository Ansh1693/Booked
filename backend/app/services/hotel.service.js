const Hotel = require("../models/hotel.model.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const City = require("../models/city.model");

exports.saveHotelConfig = async (req, res) => {
  try {
    const {
      hotelId,
      hotelName,
      hotelEmail,
      hotelUrl,
      description,
      address,
      amenities,
      policies,
    } = req.body;
    if (
      !(
        hotelId &&
        hotelName &&
        hotelEmail &&
        hotelUrl &&
        description &&
        address &&
        amenities &&
        policies
      )
    ) {
      return Promise.reject("All input is required");
    }
    let savedHotelConfig = await Hotel.findOne({ hotelId });
    let isEmailId = await User.findOne({ email: hotelEmail });
    if (savedHotelConfig) {
      return Promise.reject("hotelId Already Exist!");
    } else if (isEmailId) {
      return Promise.reject("email Already Exist!");
    } else {
      if (req.user.role == "ADMIN") {
        let encryptedPassword = await bcrypt.hash("12345", 10);
        let newPartnerUser = await User.create({
          firstName: hotelName,
          email: hotelEmail.toLowerCase(),
          password: encryptedPassword,
          role: "PARTNER",
        });
        let newHotelConfig = new Hotel();
        Object.assign(newHotelConfig, req.body);
        newHotelConfig.partnerId = newPartnerUser._id;
        await newHotelConfig.save();
        await newPartnerUser.save();
      } else if (req.user.role == "PARTNER") {
        let newHotelConfig = new Hotel();
        Object.assign(newHotelConfig, req.body);
        newHotelConfig.partnerId = req.user.id;
        newHotelConfig.verify = false;
        await newHotelConfig.save();
      }
    }
    return Promise.resolve("Hotel has been Created Successful!");
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findAllHotelConfigNonReview = async (req, res) => {
  try {
    const savedHotelConfigList = await Hotel.find({ verify: false }).populate(
      "rooms"
    );
    return Promise.resolve(savedHotelConfigList);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findAllHotelConfig = async (req, res) => {
  try {
    const { checkIn, checkOut, city, hotelId } = req.query;
    let rooms = req.query?.rooms || null;
    if (rooms) rooms = rooms.split(",");
    console.log(rooms);
    if (!(checkIn && checkOut && (city || hotelId))) {
      return Promise.reject("All input is required");
    }
    let cityData;
    let filter;
    if (hotelId) {
      filter = { hotelId };
    } else if (city) {
      filter = { city };
      cityData = await City.findOne({ name: city });
      if (!cityData) {
        cityData = await City.findOne({
          name: city[0].toUpperCase() + city.slice(1),
        });
      }
    }
    let savedHotelConfigList = await Hotel.find(filter).populate({
      path: "rooms",
      populate: {
        path: "roomDetails",
        populate: {
          path: "bookingDetails",
          match: {
            $and: [
              {
                status: { $in: ["Booked", "CheckedIn"] },
                $or: [
                  {
                    $and: [
                      { checkin: { $lte: new Date(checkOut) } },
                      { checkOut: { $gt: new Date(checkIn) } },
                    ],
                  },
                  {
                    $and: [
                      { checkIn: { $gt: new Date(checkOut) } },
                      { checkout: { $lte: new Date(checkIn) } },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    });

    // .where('verify', true);
    savedHotelConfigList.map((a) => {
      a.rooms.map((b) => {
        b.roomDetails.map((c, j) => {
          if (c.bookingDetails.length) {
            let index;
            if (b.roomType == "Normal") {
              index = b.roomDetails.findIndex(
                (element) => element.roomNumber == c.roomNumber
              );
            } else if (b.roomType == "Dormitory") {
              index = b.roomDetails.findIndex(
                (element) => element.bedNumber == c.bedNumber
              );
            }
            b.roomDetails.splice(index, 1);
          }
        });
        if (rooms) {
          let price = 0;
          rooms.map((c, j) => {
            if (parseInt(c) > 2) {
              price += b.roomPrice + b.extraBedPrice * (parseInt(c) - 2);
            } else {
              price += b.roomPrice;
            }
          });

          b.roomPrice = price;
        }
      });
    });
    console.log(savedHotelConfigList);
    console.log(savedHotelConfigList[0].rooms[0]);
    return Promise.resolve({ hotels: savedHotelConfigList, city: cityData });
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findOneHotelConfig = async (req, res) => {
  try {
    const savedHotelConfig = await Hotel.findOne({
      hotelId: req.params.hotelId,
    }).populate("rooms");
    if (savedHotelConfig) {
      return Promise.resolve(savedHotelConfig);
    } else {
      return Promise.reject("hotel not found with id " + req.params.hotelId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.verifyHotel = async (req, res) => {
  try {
    const savedHotelConfig = await Hotel.findOne({
      hotelId: req.params.hotelId,
    });
    if (savedHotelConfig) {
      if (savedHotelConfig.verify == true) {
        return Promise.reject("hotel already verified");
      } else {
        savedHotelConfig.verify = true;
        await savedHotelConfig.save();
        return Promise.resolve("hotel verified has been successful!");
      }
    } else {
      return Promise.reject("hotel not found with id " + req.params.hotelId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.updateHotelConfig = async (req, res) => {
  try {
    const savedHotelConfig = await Hotel.findOne({
      hotelId: req.params.hotelId,
    });
    if (savedHotelConfig) {
      let isDirty = false;
      if (req.body.hotelName) {
        savedHotelConfig.hotelName = req.body.hotelName;
        isDirty = true;
      }
      if (req.body.hotelEmail) {
        savedHotelConfig.hotelEmail = req.body.hotelEmail;
        isDirty = true;
      }
      if (req.body.hotelUrl) {
        savedHotelConfig.hotelUrl = req.body.hotelUrl;
        isDirty = true;
      }
      if (req.body.description) {
        savedHotelConfig.description = req.body.description;
        isDirty = true;
      }
      if (req.body.images) {
        savedHotelConfig.images = [
          ...savedHotelConfig.images,
          ...req.body.images,
        ];
        isDirty = true;
      }
      if (req.body.address) {
        savedHotelConfig.address = req.body.address;
        isDirty = true;
      }
      if (req.body.amenities) {
        savedHotelConfig.amenities = req.body.amenities;
        isDirty = true;
      }
      if (req.body.policies) {
        savedHotelConfig.policies = req.body.policies;
        isDirty = true;
      }
      if (req.body.location) {
        savedHotelConfig.location = req.body.location;
        isDirty = true;
      }
      if (isDirty) {
        console.log(savedHotelConfig);
        await savedHotelConfig.save();
        return Promise.resolve("hotel has been updated successful");
      }
    } else {
      return Promise.reject("hotel not found with id " + req.params.hotelId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.removeSavedHotelConfig = async (req, res) => {
  try {
    const savedHotelConfig = await Hotel.findOne({
      hotelId: req.params.hotelId,
    });
    if (savedHotelConfig) {
      await Hotel.deleteMany({ hotelId: req.params.hotelId });
      return Promise.resolve("hotel has been deleted successful");
    } else {
      return Promise.reject("hotel not found with id " + req.params.hotelId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
