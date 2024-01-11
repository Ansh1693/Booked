const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const roomService = require('../services/room.service')

exports.saveRoomConfig = async (req, res) => {
    try {
        const result = await roomService.saveRoomConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.saveDormitoryRoomConfig = async (req, res) => {
    try {
        const result = await roomService.saveDormitoryRoomConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAllRoomConfig = async (req, res) => {
    try {
        const result = await roomService.findAllRoomConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAllRoomConfigNonReview = async (req, res) => {
    try {
        const result = await roomService.findAllRoomConfigNonReview(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.verifyRoom = async (req, res) => {
    try {
        const result = await roomService.verifyRoom(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAllRoomConfigByHotelId = async (req, res) => {
    try {
        const result = await roomService.findAllRoomConfigByHotelId(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findOneRoomConfig = async (req, res) => {
    try {
        const result = await roomService.findOneRoomConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.updateRoomConfig = async (req, res) => {
    try {
        const result = await roomService.updateRoomConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.removeSavedRoomConfig = async (req, res) => {
    try {
        const result = await roomService.removeSavedRoomConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}