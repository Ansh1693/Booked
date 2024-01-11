exports.sendSuccessResponse = (res, code, success, data) => {
    return res.status(code).json({ success, code, data });
}

exports.sendSuccessResponseMessage = (res, code, success, message) => {
    return res.status(code).json({ success, code, message });
}

exports.sendErrorResponse = (res, success, message) => {
    return res.json({ success, message });
}
