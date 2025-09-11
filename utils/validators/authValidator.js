import { check } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddleware.js';

export const validateLogin = [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
    validatorMiddleware
];

export const validateRegisterUser = [
    check('name').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
    check('phone').isMobilePhone().withMessage("Invalid phone number").isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be exactly 11 characters"),
    check('confirmPassword')
    .isLength({ min: 6 }).withMessage('Confirm Password must be at least 6 characters')
    .matches(/\d/).withMessage('Confirm Password must contain a number')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
    }),
    validatorMiddleware
];

