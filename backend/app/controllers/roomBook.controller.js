const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage} = require('../utils/response.util')
const roomBookService = require('../services/roomBook.service')

exports.saveRoomBookConfig = async (req, res) => {
    try {
        const result = await roomBookService.saveRoomBookConfig(req, res);
        // console.log(result , "controller"); 
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.saveRoomCancelConfig = async (req, res) => {
    try {
        const result = await roomBookService.saveRoomCancelConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.roomBookPayment = async (req, res) => {
    try {
        const result = await roomBookService.roomBookPayment(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.saveRoomCheckoutConfig = async (req, res) => {
    try {
        const result = await roomBookService.saveRoomCheckoutConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.getRoomBookConfig = async (req, res) => {
    try {
        const result = await roomBookService.getBookings(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.saveRoomCheckInConfig = async (req, res) => {
    try {
        const result = await roomBookService.saveRoomCheckinConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.getAmountRemaining = async (req, res) => {
    try {
        const result = await roomBookService.getAmountRemaining(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}