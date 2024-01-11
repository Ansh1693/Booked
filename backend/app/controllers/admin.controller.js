const { sendSuccessResponse, sendErrorResponse, sendSuccessResponseMessage } = require('../utils/response.util')
const adminService = require('../services/admin.service')

exports.findOneAdminConfig = async (req, res) => {
    try {
        const result = await adminService.findOneAdminConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.findOneTeamConfig = async (req, res) => {
    try {
        const result = await adminService.findOneTeamConfig(req, res);
        sendSuccessResponse(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.getTeamConfig = async (req, res) => {
    try {
        const result = await adminService.getTeamConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}

exports.deleteTeamConfig = async (req, res) => {
    try {
        const result = await adminService.deleteTeamConfig(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}



exports.addTeamConfig = async (req, res) => {
    try {
        const result = await adminService.addTeam(req, res);
        sendSuccessResponseMessage(res, 200, true, result);
    } catch (error) {
        sendErrorResponse(res, false, error || "Internal Server Error");
    }
}