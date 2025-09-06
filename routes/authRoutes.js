import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { validateRegisterUser, validateLogin, handleValidateAuthError } from "../utils/validators/authValidator.js";

const router = express.Router();

router.post('/register', validateRegisterUser, handleValidateAuthError, registerUser);
router.post('/login', validateLogin,handleValidateAuthError, loginUser);

export default router;