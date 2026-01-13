import { updateBorrowById } from "../models/borrow/borrowModel.js";
import { getAllReviews, insertReview } from "../models/review/reviewModel.js";
import { getUserById } from "../models/users/userModel.js";

export const fetchAllReviews = async (req, res, next) => {
    try {
        const reviews = await getAllReviews({ userId: req.user._id });
        return res.status(200).json({
            status: "success",
            message: "Reviews fetched successfully",
            reviews,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Fetching reviews failed",
        });
    }
};

export const createReview = async (req, res, next) => {
    try {
        // Get user data from auth middleware
        const userData = await getUserById(req.body.userId);
        const review = await insertReview(req.body);

        if (review?._id) {
            let reviewData = await updateBorrowById(req.body.borrowId, { status: "reviewed", reviewId: review._id });
        }

        res.status(201).json({
            status: "success",
            message: "Review created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Creating review failed",
        });
    }
};