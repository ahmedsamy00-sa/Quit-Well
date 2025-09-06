import { body, validationResult } from 'express-validator';
import ApiError from '../ApiError.js';

const validateUpdateUser = [
    body('name').notEmpty().withMessage('Username is required'),
    body('phone').isMobilePhone().withMessage("Invalid phone number").isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be exactly 11 characters"),
    body('email').custom((value) => {
        if (value) {
            throw new Error('Email cannot be updated');
        }
        return true;
    }),
    
];

const handleValidateUserError = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return next(new ApiError(extractedErrors.join(', '), 400));
    }
    next();
}

export { validateUpdateUser, handleValidateUserError };