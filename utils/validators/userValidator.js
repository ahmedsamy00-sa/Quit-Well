import { check } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddleware.js';


export const validateGet = [
    check('id').isMongoId().withMessage('Invalid user ID format'),
    validatorMiddleware
];

export const validateUpdateUser = [
    check('id').isMongoId().withMessage('Invalid user ID format'),
    check('name').optional().notEmpty().withMessage('Username cannot be empty'),
    check('email').custom((value, { req }) => {
        if(req.body.email !== undefined){
            throw new Error("Email cannot be updated", 400);
        }
        return true;
    }),
    check('phone').optional().isMobilePhone().withMessage("Invalid phone number").isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be exactly 11 characters"),
    validatorMiddleware
];

export const validateDelete = [
    check('id').isMongoId().withMessage('Invalid user ID format'),
    validatorMiddleware
];

