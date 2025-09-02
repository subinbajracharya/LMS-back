import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    mongoOptions: {
        url: process.env.MONGO_URL || "mongodb://localhost:27017/lms-db",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
        expiresIn: process.env.JWT_EXPIRESIN || "2d",
        refresh_secret: process.env.JWT_REFRESH_SECRET || "refreshSecret",
        refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    },
    salt: parseInt(process.env.SALT) || 10,
}