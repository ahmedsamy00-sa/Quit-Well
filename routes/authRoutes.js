import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { validateRegisterUser, validateLogin } from "../utils/validators/authValidator.js";

const router = express.Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;