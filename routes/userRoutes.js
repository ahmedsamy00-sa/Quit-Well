import express from "express";
import { getUsers, getUserById, updateUserById, deleteUserById } from "../controller/userController.js";
import { validateUpdateUser, validateGet, validateDelete } from "../utils/validators/userValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); 
router.route('/').get(getUsers); 
router.route('/:id')
.get(validateGet, getUserById)
.put(validateUpdateUser, updateUserById)
.delete( validateDelete, deleteUserById); 

export default router;