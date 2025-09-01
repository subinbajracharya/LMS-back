import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
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
        bookTitle: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        borrowDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["borrowed", "returned"],
            default: "borrowed",
        },
        returnDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Borrow", borrowSchema);
