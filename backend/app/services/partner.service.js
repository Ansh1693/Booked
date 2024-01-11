const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');

exports.findOnePartnerConfig = async (req, res) => {
    try {
        const savedUserConfig = await User.findById({ _id: req.user.id }).
            populate({ path: 'users', select: ['firstName', 'lastName', 'email'] }).
            select('firstName lastName email');
        if (savedUserConfig) {
            const hotelDetails = await Hotel.findOne({ partnerId: req.user.id }).populate({ path: 'rooms', populate: { path: 'roomDetails', populate: { path: 'bookingDetails',populate: { path: 'foodOrdered' } } } });;
            let data = {};
            data.profile = savedUserConfig;
            data.hotelDetails = hotelDetails;
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("user not found with id " + req.user.id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

