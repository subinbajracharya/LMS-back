import Book from "./BookSchema.js";

export const insertBook = (bookData) => {
    return Book(bookData).save();
}

export const getAllBooks = (filterObj) => {
    return Book.find(filterObj);
}

export const getBookById = (id) => {
    return Book.findById(id);
}

export const updateBookById = (id, bookData) => {
    return Book.findByIdAndUpdate(id, bookData, { new: true });
}

export const deleteBookById = (_id) => {
    return Book.findByIdAndDelete(_id);
}

export const findBooksByTitle = (title) => {
    return Book.find({ title: new RegExp(title, 'i') });
}

export const findBooksByAuthor = (author) => {
    return Book.find({ author: new RegExp(author, 'i') });
}

export const findBooksByGenre = (genre) => {
    return Book.find({ genre: new RegExp(genre, 'i') });
}

export const findBooksByISBN = (isbn) => {
    return Book.findOne({ isbn });
}

export const findBooksByStatus = (status) => {
    return Book.find({ status });
}