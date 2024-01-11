const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const hotelService = require('../services/hotel.service')

exports.saveHotelConfig = async (req, res) => {
    try {
        const result = await hotelService.saveHotelConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAllHotelConfig = async (req, res) => {
    try {
        const result = await hotelService.findAllHotelConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAllHotelConfigNonReview = async (req, res) => {
    try {
        const result = await hotelService.findAllHotelConfigNonReview(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findOneHotelConfig = async (req, res) => {
    try {
        const result = await hotelService.findOneHotelConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.updateHotelConfig = async (req, res) => {
    try {
        const result = await hotelService.updateHotelConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.verifyHotel = async (req, res) => {
    try {
        const result = await hotelService.verifyHotel(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.removeSavedHotelConfig = async (req, res) => {
    try {
        const result = await hotelService.removeSavedHotelConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}