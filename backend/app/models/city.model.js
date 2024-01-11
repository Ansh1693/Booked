const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    nearByLocations:[{
        type: String,
    }],
    image:{
        type: String,
        required: true
    },
    location:{
        type: String,
    }
    
});

module.exports = mongoose.model('City', citySchema);