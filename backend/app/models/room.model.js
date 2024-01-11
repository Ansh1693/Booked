const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: { type: String, require: true },
    hotelId: { type: String, require: true },
    roomType: { type: String, require: true },
    roomName: { type: String },
    roomSize: { type: String, require: true },
    roomDescription: { type: String, require: true },
    amenities: { type: Object, require: true },
    roomPrice: { type: Number, require: true },
    bedPrice: { type: Number, require: true },
    totalRoom: { type: Number },
    totalBed: { type: Number },
    verify: { type: Boolean, default: true },
    extraBedPrice: { type: Number},    
    roomDetails: [{
        roomNumber: { type: String, require: true },
        bedNumber: { type: String, require: true },
        bookingDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "roomBook" }]
    }],
    images: [{ type: String }]
}, {
    timestamps: true
});

module.exports = mongoose.model('room', roomSchema);
