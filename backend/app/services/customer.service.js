const User = require('../models/user.model.js');
const RoomBook = require('../models/roomBook.model.js');

exports.findOneCustomerConfig = async (req, res) => {
    try {
        const savedUserConfig = await User.findById({ _id: req.user.id }).populate('roomBookings').exec();
        if (savedUserConfig) {
            const roomDetails = await RoomBook.find({ customerId: req.user.id }).populate('foodOrdered')
            let bookedRoomDetails = roomDetails.filter(o => o.status == 'Booked')
            let canceledRoomDetails = roomDetails.filter(o => o.status == 'Canceled')
            let completeRoomDetails = roomDetails.filter(o => o.status == 'Complete')
            let data = {};
            data.firstName = savedUserConfig.firstName;
            data.lastName = savedUserConfig.lastName;
            data.email = savedUserConfig.email;
            data.roomBookings = savedUserConfig.roomBookings;
            data.roomBookingDetails = { bookedRoomDetails, canceledRoomDetails, completeRoomDetails };
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("user not found with id " + req.user.id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

