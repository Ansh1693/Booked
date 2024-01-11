const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const partnerService = require('../services/partner.service')

exports.findOnePartnerConfig = async (req, res) => {
    try {
        const result = await partnerService.findOnePartnerConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}