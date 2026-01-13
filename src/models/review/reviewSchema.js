import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
        },
        borrowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "borrow",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        bookTitle: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        comment: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Review", reviewSchema);