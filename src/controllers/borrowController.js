import { updateBookById } from "../models/books/BookModel.js";
import { getAllBorrows, getBorrowById, insertBorrow } from "../models/borrow/BorrowModel.js";

export const createBorrowRecord = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { bookId, title, thumbnail } = req.body;

        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(borrowDate.getDate() + 14); // 2 weeks from borrow date

        const bookData = await updateBookById(bookId, { isAvailable: false, expectedAvailable: dueDate });

        const newBorrow = {
            userId,
            bookId,
            bookTitle: title,
            thumbnail,
            borrowDate,
            dueDate,
        };

        let book = await insertBorrow(newBorrow);
        res.status(201).json({
            status: "success",
            message: "Book borrowed successfully",
            borrow: book,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message: "Borrowing failed",
        });
    }
}

export const fetchAllBorrows = async (req, res, next) => {
    try {
        const borrows = await getAllBorrows({ userId: req.user._id });
        return res.status(200).json({
            status: "success",
            message: "Borrows fetched successfully",
            borrows,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Fetching borrows failed",
        });
    }
};

export const returnBook = async (req, res, next) => {
    try {
        const borrowId = req.params.id;
        const borrow = await getBorrowById(borrowId);

        if (borrow) {
            borrow.status = "returned";
            borrow.returnDate = new Date();
            let bookId = borrow.bookId;
            let bookData = await updateBookById(bookId, { isAvailable: true, expectedAvailable: null });
            await borrow.save();
            return res.status(200).json({
                status: "success",
                message: "Book returned successfully",
                borrow,
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "Borrow record not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Returning book failed",
        });
    }
};