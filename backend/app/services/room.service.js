const Room = require("../models/room.model.js");
const Hotel = require("../models/hotel.model.js");

exports.saveRoomConfig = async (req, res) => {
  try {
    let {
      roomId,
      hotelId,
      roomName,
      roomType,
      roomSize,
      roomDescription,
      roomPrice,
      amenities,
      roomNumbers,
    } = req.body;
    if (req.user.role == "PARTNER") {
      if (
        !(
          roomId &&
          roomName &&
          roomType &&
          roomSize &&
          roomDescription &&
          roomPrice &&
          amenities &&
          roomNumbers
        )
      ) {
        return Promise.reject("All input is required");
      } else {
        let isHotel = await Hotel.findOne({ partnerId: req.user.id });
        hotelId = isHotel.hotelId;
      }
    } else {
      if (
        !(
          roomId &&
          hotelId &&
          roomName &&
          roomType &&
          roomSize &&
          roomDescription &&
          roomPrice &&
          amenities &&
          roomNumbers
        )
      ) {
        return Promise.reject("All input is required");
      }
    }
    let savedHotelConfig = await Hotel.findOne({ hotelId }).populate("rooms");
    let savedRoomConfig = await Room.findOne({ roomId });
    let isRoomNumber;
    savedHotelConfig?.rooms?.find((o) => {
      isRoomNumber = o.roomDetails.find((a) => {
        let isRoomNumber = roomNumbers.includes(a.roomNumber);
        if (isRoomNumber) {
          return true;
        } else {
          return false;
        }
      });
    });
    const toFindDuplicateRoomNumber = (roomNumbers) =>
      roomNumbers.filter((item, index) => roomNumbers.indexOf(item) !== index);
    const duplicateRoomNumbers = toFindDuplicateRoomNumber(roomNumbers);
    if (!savedHotelConfig) {
      return Promise.reject("hotel not found!");
    } else if (savedRoomConfig) {
      return Promise.reject("roomId Already Exist!");
    } else if (duplicateRoomNumbers.length != 0) {
      return Promise.reject("can't accept duplicate room number!");
    } else if (isRoomNumber) {
      return Promise.reject("room number Already Exist!");
    } else {
      const newRoomConfig = new Room();
      if (req.user.role == "PARTNER") newRoomConfig.verify = false;
      Object.assign(newRoomConfig, req.body);
      newRoomConfig.totalRoom = roomNumbers.length;
      newRoomConfig.hotelId = hotelId;
      roomNumbers.forEach((element, i) => {
        newRoomConfig.roomDetails.push({ roomNumber: element });
      });
      savedHotelConfig.rooms.push(newRoomConfig._id);
      await Promise.all[(savedHotelConfig.save(), newRoomConfig.save())];
      return Promise.resolve("Room has been Created Successful!");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.saveDormitoryRoomConfig = async (req, res) => {
  try {
    let {
      roomId,
      hotelId,
      roomName,
      roomType,
      roomSize,
      roomDescription,
      bedPrice,
      amenities,
      bedNumbers,
    } = req.body;
    if (req.user.role == "PARTNER") {
      if (
        !(
          roomId &&
          roomName &&
          roomType &&
          roomSize &&
          roomDescription &&
          bedPrice &&
          amenities &&
          bedNumbers
        )
      ) {
        return Promise.reject("All input is required");
      } else {
        let isHotel = await Hotel.findOne({ partnerId: req.user.id });
        hotelId = isHotel.hotelId;
      }
    } else {
      if (
        !(
          roomId &&
          hotelId &&
          roomName &&
          roomType &&
          roomSize &&
          roomDescription &&
          bedPrice &&
          amenities &&
          bedNumbers
        )
      ) {
        return Promise.reject("All input is required");
      }
    }
    let savedHotelConfig = await Hotel.findOne({ hotelId }).populate("rooms");
    let savedRoomConfig = await Room.findOne({ roomId });
    let isBedNumber;
    savedHotelConfig?.rooms?.find((o) => {
      isBedNumber = o.roomDetails.find((a) => {
        let isBedNumber = bedNumbers.includes(a.bedNumber);
        if (isBedNumber) {
          return true;
        } else {
          return false;
        }
      });
    });
    const toFindDuplicateRoomNumber = (bedNumbers) =>
      bedNumbers.filter((item, index) => bedNumbers.indexOf(item) !== index);
    const duplicateBedNumbers = toFindDuplicateRoomNumber(bedNumbers);
    if (!savedHotelConfig) {
      return Promise.reject("hotel not found!");
    } else if (savedRoomConfig) {
      return Promise.reject("roomId Already Exist!");
    } else if (duplicateBedNumbers.length != 0) {
      return Promise.reject("can't accept duplicate bed number!");
    } else if (isBedNumber) {
      return Promise.reject("bed number Already Exist!");
    } else {
      const newRoomConfig = new Room();
      if (req.user.role == "PARTNER") newRoomConfig.verify = false;
      Object.assign(newRoomConfig, req.body);
      newRoomConfig.totalBed = bedNumbers.length;
      newRoomConfig.hotelId = hotelId;
      bedNumbers.forEach((element, i) => {
        newRoomConfig.roomDetails.push({ bedNumber: element });
      });
      savedHotelConfig.rooms.push(newRoomConfig._id);
      await Promise.all[(savedHotelConfig.save(), newRoomConfig.save())];
      return Promise.resolve("Dormitory Room has been Created Successful!");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.verifyRoom = async (req, res) => {
  try {
    const savedRoomConfig = await Room.findOne({ roomId: req.params.roomId });
    if (savedRoomConfig) {
      if (savedRoomConfig.verify == true) {
        return Promise.reject("room already verified");
      } else {
        savedRoomConfig.verify = true;
        await savedRoomConfig.save();
        return Promise.resolve("room verified has been successful!");
      }
    } else {
      return Promise.reject("room not found with id " + req.params.roomId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findAllRoomConfig = async (req, res) => {
  try {
    let savedRoomConfigList;
    if (req.user?.role == "PARTNER") {
      savedRoomConfigList = await Hotel.findOne({ partnerId: req.user.id })
        .populate("rooms")
        .select("rooms");
    } else {
      savedRoomConfigList = await Room.find({ verify: true });
    }
    return Promise.resolve(savedRoomConfigList);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findAllRoomConfigNonReview = async (req, res) => {
  try {
    let savedRoomConfigList = await Room.find({ verify: false });
    return Promise.resolve(savedRoomConfigList);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findAllRoomConfigByHotelId = async (req, res) => {
  try {
    const savedRoomConfigList = await Hotel.findOne({
      hotelId: req.params.hotelId,
    })
      .select("rooms")
      .populate({
        path: "rooms",
        populate: { path: "roomDetails", select: "-roomDetails" },
      });
    if (savedRoomConfigList) {
      return Promise.resolve(savedRoomConfigList);
    } else {
      return Promise.reject("Room not found");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.findOneRoomConfig = async (req, res) => {
  try {
    if (req.user?.role == "PARTNER") {
      const savedRoomConfigList = await Hotel.findOne({
        partnerId: req.user.id,
      })
        .populate("rooms")
        .select("rooms");
      let isRoom = savedRoomConfigList.rooms.find(
        (o) => o.roomId == req.params.roomId
      );
      if (isRoom) {
        return Promise.resolve(isRoom);
      } else {
        return Promise.reject("room not found with id " + req.params.roomId);
      }
    } else {
      const savedRoomConfig = await Room.findOne({
        roomId: req.params.roomId,
      }).select("-roomDetails");
      if (savedRoomConfig) {
        return Promise.resolve(savedRoomConfig);
      } else {
        return Promise.reject("room not found with id " + req.params.roomId);
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.updateRoomConfig = async (req, res) => {
  try {
    const savedRoomConfig = await Room.findOne({ roomId: req.params.roomId });
    console.log(req.body);
    if (savedRoomConfig) {
      let isDirty = false;
      if (req.body.roomName) {
        savedRoomConfig.roomName = req.body.roomName;
        isDirty = true;
      }
      if (req.body.roomType) {
        savedRoomConfig.roomType = req.body.roomType;
        isDirty = true;
      }
      if (req.body.roomSize) {
        savedRoomConfig.roomSize = req.body.roomSize;
        isDirty = true;
      }
      if (req.body.roomDescription) {
        savedRoomConfig.roomDescription = req.body.roomDescription;
        isDirty = true;
      }
      if (req.body.roomPrice) {
        savedRoomConfig.roomPrice = req.body.roomPrice;
        isDirty = true;
      }
      if (req.body.amenities) {
        savedRoomConfig.amenities = req.body.amenities;
        isDirty = true;
      }
      if (req.body.images) {
        savedRoomConfig.images = req.body.images;
        isDirty = true;
      }
      if (req.body.extraBedPrice) {
        savedRoomConfig.extraBedPrice = req.body.extraBedPrice;
        isDirty = true;
      }

      if (isDirty) {
        console.log(savedRoomConfig);
        await savedRoomConfig.save();
        return Promise.resolve("room has been updated successful");
      }
    } else {
      return Promise.reject("room not found with id " + req.params.roomId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.removeSavedRoomConfig = async (req, res) => {
  try {
    const savedRoomConfig = await Room.findOne({ roomId: req.params.roomId });
    if (savedRoomConfig) {
      await Room.deleteMany({ roomId: req.params.roomId });
      return Promise.resolve("room has been deleted successful");
    } else {
      return Promise.reject("room not found with id " + req.params.roomId);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
