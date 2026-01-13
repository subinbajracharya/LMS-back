import Review from "./reviewSchema.js";

export const getAllReviews = (filter) => {
    return Review.find(filter);
}

export const insertReview = (reviewObj) => {
    return Review.insertOne(reviewObj);
}

export const updateReviewById = (reviewId, updateObj) => {
    return Review.findByIdAndUpdate(reviewId, updateObj, { new: true });
}

export const deleteReview = (reviewId) => {
    return Review.findByIdAndDelete(reviewId);
}

export const getReviewById = (reviewId) => {
    return Review.findById(reviewId);
}

export const getReviewsByBookId = (bookId) => {
    return Review.find({ bookId: bookId, status: "active" });
}

export const getReviewsByUserId = (userId) => {
    return Review.find({ userId: userId });
}

export const getReviewByBorrowId = (borrowId) => {
    return Review.findOne({ borrowId: borrowId });
}