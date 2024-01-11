const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const cityService = require('../services/city.service')

exports.create = async (req, res) => {
    try {
        const result = await cityService.create(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findAll = async (req, res) => {
    try {
        const result = await cityService.findAll(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findOne = async (req, res) => {
    try {
        const result = await cityService.findOne(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.update = async (req, res) => {
    try {
        const result = await cityService.update(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}
