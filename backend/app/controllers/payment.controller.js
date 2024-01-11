const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const paymentService = require('../services/payment.service.js')

exports.razorpay = async (req, res) => {
    try {
        const result = await paymentService.createOrderId(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.getBookingsfromPayment = async (req, res) => {
    try {
        const result = await paymentService.getBookingsfromPayment(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.paymentFailure = async (req, res) => {
    try {
        const result = await paymentService.paymentFailure(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.refundPayment = async (req, res) => {
    try {
        const result = await paymentService.refundPayment(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.checkRefundStatus = async (req, res) => {
    try {
        const result = await paymentService.checkRefundStatus(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}