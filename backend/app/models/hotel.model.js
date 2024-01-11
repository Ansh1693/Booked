const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelId: { type: String, require: true },
    partnerId: { type: String, require: true },
    hotelName: { type: String, require: true },
    hotelEmail: { type: String, require: true },
    hotelUrl: { type: String, require: true },
    description: { type: String, require: true },
    city: { type: String, require: true },
    address: { type: String, require: true },
    location: { lat: { type: String }, lang: { type: String } },
    amenities: { type: Object, require: true },
    verify: { type: Boolean, default: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "room" }],
    images: [{ type: String }],
    policies: {
      covid: { type: String },
      property: { type: String },
      cancellation: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
