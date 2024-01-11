const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

exports.findOneAdminConfig = async (req, res) => {
    try {
        const savedUserConfig = await User.findById({ _id: req.user.id });
        if (savedUserConfig) {
            const hotels = await Hotel.find().populate('rooms');
            let data = {};
            data.firstName = savedUserConfig.firstName;
            data.lastName = savedUserConfig.lastName;
            data.email = savedUserConfig.email;
            data.hotels = hotels;
            data.role = savedUserConfig.role;
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("user not found with id " + req.user.id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.findOneTeamConfig = async (req, res) => {
    try {
        const savedUserConfig = await User.findById({ _id: req.user.id });
        if (savedUserConfig) {
            const hotels = await Hotel.find({ partnerId: savedUserConfig.partnerId }).populate('rooms');
            let data = {};
            data.firstName = savedUserConfig.firstName;
            data.lastName = savedUserConfig.lastName;
            data.email = savedUserConfig.email;
            data.hotels = hotels;
            data.role = savedUserConfig.role;
            return Promise.resolve(data);
        }
        else {
            return Promise.reject("user not found with id " + req.user.id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

exports.getTeamConfig = async (req, res) => {
    try {
        if (req.params.hotelId)  {  
           const hotel = await Hotel.findOne({ hotelId: req.params.hotelId });
            const team = await User.find({ hotelId: hotel._id });
            return Promise.resolve(team);
        }
        else {
            return Promise.reject("user not found with id " + req.user.id);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

exports.deleteTeamConfig = async (req, res) => {
    try {
       const id = req.params.id;
        if(id){
            const user = await User.deleteOne({_id:id});

            return Promise.resolve("Team deleted successfully");
        }
    } catch (error) {
        return Promise.reject(error);
    }
}


exports.addTeam = async (req, res) => {
    try {
        const { hotelId,emails,  role="TEAM" } = req.body;
        const hotel = await Hotel.findOne({ hotelId: hotelId });
        emails.forEach(async (email) => {
        const userCheck = await User.findOne({ email: email });
        if (hotel && !userCheck) {
            let newTeam;
           if(role==="RECEPTION"){
            let password = hotel.hotelName.slice(0,7) + Math.floor(Math.random() * 1000);
            password = password.replace(/\s/g, '');
            newTeam  = new User({
                firstName: `${role}`,
                lastName: hotel.hotelName,
                email: email,
                role: role,
                partnerId: hotel.partnerId,
                hotelId: hotel._id,
                password: bcrypt.hashSync(password, 10)
            })
            console.log(password);
           }else{
            newTeam  = new User({
                firstName: `${role}`,
                lastName: hotel.hotelName,
                email: email,
                role: role,
                partnerId: hotel.partnerId,
                hotelId: hotel._id
            })
        }
            const savedTeam = await newTeam.save();

            console.log(savedTeam);
        }
        });

        return Promise.resolve("Team added successfully");
        
        
    } catch (error) {
        return Promise.reject(error);
    }
}