import express from "express"
import { createBook, deleteBook, fetchAllBooks, fetchBooks, updateBook } from "../controllers/bookController.js"
import { auth, isAdmin } from "../middleware/authMiddleware.js"
import { createBookValidation } from "../middleware/joiMiddleware.js"
import { upload } from "../middleware/multerConfig.js"

const router = express.Router()

router.get("/pub-books", fetchBooks)

router.get("/", auth, isAdmin, fetchAllBooks)

router.post("/", upload.single("image"), createBookValidation, auth, isAdmin, createBook)

router.put("/:id", auth, isAdmin, updateBook)

router.delete("/:id", auth, isAdmin, deleteBook)

export default router