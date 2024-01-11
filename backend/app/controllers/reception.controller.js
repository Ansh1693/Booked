const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const receptionService = require('../services/reception.service')

exports.findOnePartnerReceptionConfig = async (req, res) => {
    try {
        const result = await receptionService.findOnePartnerReceptionConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.foodOrdered = async (req, res) => {
    try {
        const result = await receptionService.foodOrdered(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}