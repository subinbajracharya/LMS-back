import sharp from "sharp";
import { deleteBookById, getAllBooks, insertBook, updateBookById } from "../models/books/bookModel.js";

export const fetchBooks = async (req, res) => {
    // Logic to fetch books
    try {
        // Simulating fetching books from a database
        let books = await getAllBooks({ status: "active" });
        return res.status(200).json({
            status: "success",
            message: books.length + "Books fetched successfully",
            books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch books",
            error: error.message,
        })
    }
}

export const fetchAllBooks = async (req, res) => {
    // Logic to fetch all books
    try {
        let books = await getAllBooks({});
        return res.status(200).json({
            status: "success",
            message: books.length + " Books fetched successfully",
            books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch all books",
            error: error.message,
        });
    }
}

export const createBook = async (req, res) => {
    // Logic to create a new book
    try {
        await sharp("assets/" + req.file.filename)
            .resize(200, 300)
            .toFile("assets/resized-" + req.file.filename);
        req.body.thumbnail = "resized-" + req.file.filename;

        let book = await insertBook(req.body);
        console.log(book)
        return res.status(201).json({
            status: "success",
            message: "Book created successfully",
            book,
        });
    } catch (error) {
        console.log(error);
        let message = error.code === 11000 ? "Book with this ISBN already exists" : "Failed to create book";
        console.log(error);

        return res.status(500).json({
            status: "error",
            message: "Failed to create book",
            error: error.message,
        });
    }
}

export const updateBook = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)

        let book = await updateBookById(id, req.body);
        return res.status(200).json({
            status: "success",
            message: `Book status ${req.body.status}`,
            book
        });
    } catch (error) {
        let message = error.code === 11000 ? "Book with this ISBN already exists" : "Failed to update book";
        return res.status(500).json({
            status: "error",
            message,
            error: error.message,
        });
    }
}

export const deleteBook = async (req, res) => {
    try {
        let id = req.params.id;
        let book = await deleteBookById(id);

        return res.status(200).json({
            status: "success",
            message: `Book deleted successfully`,
            book
        });
    } catch (error) {
        let message = error.code === 11000 ? "Book with this ISBN already exists" : "Failed to delete book";
        return res.status(500).json({
            status: "error",
            message,
            error: error.message,
        });
    }
}