import express from "express"
import { createBook, fetchAllBooks, fetchBooks } from "../controllers/bookController.js"
import { auth, isAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/pub-books", fetchBooks)

router.get("/", auth, isAdmin, fetchAllBooks)

router.post("/", auth, isAdmin, createBook)

export default router