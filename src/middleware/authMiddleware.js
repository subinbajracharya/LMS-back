import { getUser } from "../models/users/userModel.js";
import { decodeAccessToken } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
    // if authenticated go to next
    // else response with unauthenticated message
    try {
        let accessToken = req?.headers?.authorization?.includes("Bearer")
            ? req?.headers?.authorization.split(" ")[1]
            : req?.headers?.authorization;

        let decoded = decodeAccessToken(accessToken);
        console.log(decoded)

        let user = await getUser({ email: decoded.email });
        console.log(user)

        if (user && user?.accessToken?.includes(accessToken)) {
            user.password = "";
            req.user = user;
            next();
        } else {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized!!",
            });
        }
    } catch (err) {
        console.log(err.message);
        let errorMessage = err?.message?.includes("jwt expired")
            ? err.message
            : "Server Error";

        let statusCode = err?.message?.includes("jwt expired") ? 401 : 500;
        return res
            .status(statusCode)
            .json({ message: errorMessage, status: "error" });
    }
};

export const isAdmin = async (req, res, next) => {
    // if user is admin go to next
    // else response with unauthorized message
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "Forbidden!! You do not have permission to access this resource.",
            });
        }
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: "Forbidden!!",
        });
    }
}

export const isUser = async (req, res, next) => {
    // if user is a regular user go to next
    // else response with unauthorized message
    try {
        if (req.user && req.user.role === "user") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "Forbidden!! You do not have permission to access this resource.",
            });
        }
    } catch (err) {
        return res.status(403).json({
            status: false,
            message: "Forbidden!!",
        });
    }
}
