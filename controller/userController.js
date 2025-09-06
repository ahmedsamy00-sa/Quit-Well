import asyncHandler from 'express-async-handler';
import ApiError from '../utils/ApiError.js';
import User from '../models/userModel.js';

// Get all users
// GET /api/v1/users
// Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        results: users.length,
        data: users
    });
});

// Get a single user by ID
// GET /api/v1/users/:id
// Private
const getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ApiError('User not found', 404));
    }
    res.status(200).json({
        status: "success",
        data: user
    });
});

// Update a user by ID
// PUT /api/v1/users/:id
// Private
const updateUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
        return next(new ApiError('User not found', 404));
    }
    res.status(200).json({
        status: "success",
        data: user,
        message: "User updated successfully"
    });
});

// Delete a user by ID
// DELETE /api/v1/users/:id
// Private
const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ApiError('User not found', 404));
    }
    res.status(200).json({
        status: "success",
        message: "User deleted successfully"
    });
});

export { getUsers, getUserById, updateUserById, deleteUserById };