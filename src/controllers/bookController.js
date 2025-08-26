import { getAllBooks, insertBook } from "../models/books/BookModel.js";

export const fetchBooks = async (req, res) => {
    // Logic to fetch books
    try {
        // Simulating fetching books from a database
        let books = await getAllBooks({ status: "available" });
        res.status(200).json({
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