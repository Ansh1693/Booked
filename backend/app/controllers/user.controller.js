const {
  sendSuccessResponse,
  sendErrorResponse,
  sendSuccessResponseMessage,
} = require("../utils/response.util");
const userService = require("../services/user.service");

exports.registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req, res);
    sendSuccessResponse(res, 200, true, { token: result });
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req, res);
    sendSuccessResponse(res, 200, true, { token: result });
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const result = await userService.verifyOtp(req, res);
    sendSuccessResponse(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.loginWithPass = async (req, res) => {
  try {
    const result = await userService.loginWithPass(req, res);
    sendSuccessResponse(res, 200, true, { token: result });
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await userService.getUser(req, res);
    sendSuccessResponseMessage(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.addUser = async (req, res) => {
  try {
    const result = await userService.addUser(req, res);
    sendSuccessResponseMessage(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.sendOtp = async (req, res) => {
  try {
    if (req.body.email) {
      const result = await userService.sendOtp(req.body.email);
      console.log(result);
      sendSuccessResponseMessage(res, 200, true, { token: result });
    } else {
      sendErrorResponse(res, false, "Email is required");
    }
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req, res);
    sendSuccessResponseMessage(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const result = await userService.getUserBookings(req, res);
    sendSuccessResponseMessage(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};

exports.getUserBookingById = async (req, res) => {
  try {
    const result = await userService.getUserBookingById(req, res);
    sendSuccessResponseMessage(res, 200, true, result);
  } catch (error) {
    sendErrorResponse(res, false, error || "Internal Server Error");
  }
};
