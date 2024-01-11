const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const customerService = require('../services/customer.service')

exports.findOneCustomerConfig = async (req, res) => {
    try {
        const result = await customerService.findOneCustomerConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}