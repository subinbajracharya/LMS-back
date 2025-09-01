import express from "express";
import { createBorrowRecord, fetchAllBorrows, returnBook } from "../controllers/borrowController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createBorrowRecord);

router.get("/", auth, fetchAllBorrows);

router.put("/return/:id", auth, returnBook);

export default router;



