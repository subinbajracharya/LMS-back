import User from "./UserSchema.js";

// Get list of users
export const getAllUsers = () => {
    // list of users
    return User.find();
};

// Get user by id
export const getUserById = (id) => {
    return User.findById(id);
};

// Get user by filter
export const getUser = (filter) => {
    // filter: {email: 'email'}
    // filter: {username: 'name'}
    return User.findOne(filter);
};

// Create user
export const createUser = (userObj) => {
    return User.insertOne(userObj);
};

// Update user
export const updateUserById = (id, updateObj) => {
    return User.findByIdAndUpdate(id, updateObj);
};

// Delete user
export const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};
