const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendResponse = require("../utils/response");

const protect = async (req, res, next) => {
    try {
        let token;

        // Expect header: Authorization: Bearer <token>
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Not authorized. No token provided.",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Load user without password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "User not found.",
            });
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Invalid or expired token."
        });

    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "Access denied. You do not have permission.",
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};