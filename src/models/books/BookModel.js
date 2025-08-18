import mongoose from "mongoose";
import BookSchema from "./BookSchema.js";

const BookModel = mongoose.model("Book", BookSchema);

export const createBook = async (bookData) => {
    const book = new BookModel(bookData);
    return await book.save();
}

export const getAllBooks = async () => {
    return await BookModel.find({});
}

export const getBookById = async (id) => {
    return await BookModel.findById(id);
}

export const updateBook = async (id, bookData) => {
    return await BookModel.findByIdAndUpdate(id, bookData, { new: true });
}

export const deleteBook = async (id) => {
    return await BookModel.findByIdAndDelete(id);
}

export const findBooksByTitle = async (title) => {
    return await BookModel.find({ title: new RegExp(title, 'i') });
}

export const findBooksByAuthor = async (author) => {
    return await BookModel.find({ author: new RegExp(author, 'i') });
}

export const findBooksByGenre = async (genre) => {
    return await BookModel.find({ genre: new RegExp(genre, 'i') });
}

export const findBooksByISBN = async (isbn) => {
    return await BookModel.findOne({ isbn });
}

export const findBooksByStatus = async (status) => {
    return await BookModel.find({ status });
}