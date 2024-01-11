const City = require('../models/city.model');

// Create and Save a new City
exports.create = async (req, res) => {
    try {
        const cityCheck = await City.findOne({name: req.body.name});
        if(cityCheck){
            return Promise.reject("City already exists");
        }else{
            const city = new City({
                name: req.body.name,
                description: req.body.description,
                nearByLocations: req.body.nearByLocations,
                image: req.body.image,
                location: req.body.location
            });
            const data = await city.save();
            return Promise.resolve(data);
        }
    } catch (error) {
        
    }
}

// Retrieve and return all cities from the database.
exports.findAll = async (req, res) => {
    try {
        const data = await City.find();
        return Promise.resolve(data);
    } catch (error) {
        
    }
}

// Find a single city with a cityName
exports.findOne = async (req, res) => {
    try {
        const cityName = req.params.cityName[0].toUpperCase() + req.params.cityName.slice(1);
        let data = await City.findOne({name: req.params.cityName});
        if(!data){
           data = await City.findOne({name: cityName})
        }
        return Promise.resolve(data);
    } catch (error) {
        
    }
}

// Update a city identified by the cityName in the request
exports.update = async (req, res) => {
    try {
        const cityCheck= await City.findOne({name: req.params.cityName});
        if(cityCheck){
            Object.assign(cityCheck, req.body);
            const data = await cityCheck.save();
            return Promise.resolve(data);
        }else{
            return Promise.reject("City not found");
        }
    } catch (error) {
        
    }
}

