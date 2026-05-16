import express from "express";

import {
  sendOTP,
  register,
  login,
  sendLoginOTP,
  verifyLoginOTP,
  sendForgotOTP,
  verifyForgotOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();


// REGISTER
router.post("/send-otp", sendOTP);

router.post("/register", register);


// LOGIN
router.post("/login", login);

router.post("/send-login-otp", sendLoginOTP);

router.post("/verify-login-otp", verifyLoginOTP);


// FORGOT PASSWORD
router.post("/send-forgot-otp", sendForgotOTP);

router.post("/verify-forgot-otp", verifyForgotOTP);

router.post("/reset-password", resetPassword);

export default router;