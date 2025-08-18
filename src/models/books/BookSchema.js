import mongose from "mongoose";

const bookSchema = new mongose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        unique: true,
        required: true,
    },
    published_date: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    borrowed_in: {
        type: Date,
        required: false,
    },
    returned_on: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        enum: ["available", "borrowed", "reserved"],
        default: "available",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongose.model("Book", bookSchema);