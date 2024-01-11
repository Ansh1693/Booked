const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    foodName: { type: String, require: true },
    quantity: { type: String, require: true },
    price: { type: String, require: true },
    total: { type: String, require: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('foodOrdered', restaurantSchema);
