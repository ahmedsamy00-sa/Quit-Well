import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// register a new user
// POST /api/v1/auth/register
// Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    const userExists = await User.find({ $or: [{ email }, { phone }] });
    if (userExists.length) {
        return next(new ApiError('Email or phone number already in use', 400));
    }
    if (password !== confirmPassword) {
        return next(new ApiError('Password and Confirm Password do not match', 400));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, phone, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id }, process.env.Jwt_secret_key, { expiresIn: '20d' });
    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        },
        message: "User registered successfully"
    });
});

// login a user
// POST /api/v1/auth/login
// Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (!user.length) {
        return next(new ApiError('Invalid email or password', 400));
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
        return next(new ApiError('Invalid email or password', 400));
    }
    const token = jwt.sign({ id: user[0].id }, process.env.Jwt_secret_key, { expiresIn: '20d' });
    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email
            },
            token
        },
        message: "Login successful"
    });
});

export { registerUser, loginUser };