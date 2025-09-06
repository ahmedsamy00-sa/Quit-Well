import express from "express";
import { getUsers, getUserById, updateUserById, deleteUserById } from "../controller/userController.js";
import { validateUpdateUser, handleValidateUserError } from "../utils/validators/userValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.use(authMiddleware); 
router.route('/').get(getUsers); 
router.route('/:id').get(getUserById).put(validateUpdateUser, handleValidateUserError, updateUserById).delete(deleteUserById); 

export default router;
