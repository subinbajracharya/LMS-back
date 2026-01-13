import express from "express";
import { createReview, fetchAllReviews } from "../controllers/reviewController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createReview);

router.get("/public-reviews", auth, fetchAllReviews);

// router.get("/book/:bookId", auth, fetchReviewsByBook);

// router.delete("/:id", auth, deleteReview);

export default router;