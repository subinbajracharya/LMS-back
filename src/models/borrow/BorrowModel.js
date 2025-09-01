import Borrow from "./BorrowSchema.js";

export const getAllBorrows = (filter) => {
    return Borrow.find(filter)
}

export const insertBorrow = (borrowObj) => {
    return Borrow.insertOne(borrowObj);
}

export const updateBorrowById = (borrowId, updateObj) => {
    return Borrow.findByIdAndUpdate(borrowId, updateObj, { new: true });
}

export const deleteBorrow = (borrowId) => {
    return Borrow.findByIdAndDelete(borrowId);
}

export const getBorrowById = (borrowId) => {
    return Borrow.findById(borrowId);
}