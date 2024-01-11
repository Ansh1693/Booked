exports.hasPermission = (role) => {
    return async (req, res, next) => {
        // Check user permission
        if (req.user?.role != role) {
            return res.status(403).send("Access Denied");
        }
        else {
            return next();
        }
    }
}

exports.isXApiKey = () => {
    return async (req, res, next) => {
        // Check user permission
        if (req.headers['x-api-key'] != process.env.X_API_KEY) {
            return res.status(403).send("Access Denied");
        }
        else {
            return next();
        }
    }
}