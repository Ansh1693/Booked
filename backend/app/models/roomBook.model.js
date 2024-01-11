const mongoose = require('mongoose');

const roomBookSchema = new mongoose.Schema({
    roomId: { type: String, require: true },
    hotelId: { type: String, require: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
    guests:[{
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
    }],
    status: { type: String, default: 'Booked' },
    roomNumber: { type: String, require: true },
    bedNumber: { type: String, require: true },
    checkIn: { type: Date, require: true },
    checkedIn : { type: Boolean, default: false },
    checkOut: { type: Date, require: true },
    checkedOut : { type: Boolean, default: false },
    night: { type: String, require: true },
    mode: { type: String },
    foodOrdered: [{ type: mongoose.Schema.Types.ObjectId, ref: "foodOrdered" }],
    totalFoodAmount: {
        amount: { type: Number, default: 0 },
        paidAmount: { type: Number, default: 0 },
        paymentMade: { type: Boolean },
        mode: { type: String }
    },
    totalRoomAmount: {
        amount: { type: Number, default: 0 },
        paidAmount: { type: Number, default: 0 },
        paymentMade: { type: Boolean, default: 'false' },
        mode: { type: String }
    },
    paymentInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "payment"}]
}, {
    timestamps: true
});

module.exports = mongoose.model('roomBook', roomBookSchema);
