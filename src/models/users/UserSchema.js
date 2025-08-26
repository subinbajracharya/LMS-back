import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true,
        },
        lName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "student"],
            default: "student",
        },
        refreshJWT: {
            type: String,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            default: "",
        },
        accessToken: [
            {
                type: String,
                default: [],
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default userSchema