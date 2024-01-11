const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, require: true },
    mobile: { type: String },
    role: { type: String },
    partnerId: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    roomBookings : [{ type: mongoose.Schema.Types.ObjectId, ref: "roomBook" }],
    hotelId : { type: mongoose.Schema.Types.ObjectId, ref: "hotel" },
    password: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);