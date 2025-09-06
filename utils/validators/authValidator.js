import { body, validationResult } from 'express-validator';
import ApiError from '../ApiError.js';

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];

const validateRegisterUser = [
    body('name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
    body('phone').isMobilePhone().withMessage("Invalid phone number").isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be exactly 11 characters"),
    body('confirmPassword')
    .isLength({ min: 6 }).withMessage('Confirm Password must be at least 6 characters')
    .matches(/\d/).withMessage('Confirm Password must contain a number')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
    }),
];

const handleValidateAuthError = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return next(new ApiError(extractedErrors.join(', '), 400));
    }
    next();
}

export { validateLogin, validateRegisterUser, handleValidateAuthError };