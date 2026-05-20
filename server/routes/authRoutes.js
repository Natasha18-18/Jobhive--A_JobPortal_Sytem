import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  sendOTP,
  register,
  login,
  sendLoginOTP,
  verifyLoginOTP,
  sendForgotOTP,
  verifyForgotOTP,
  resetPassword,
  changePassword,
  getCandidateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/candidate/:id",
  protect,
  getCandidateProfile
);

// =========================
// REGISTER
// =========================

router.post("/send-otp", sendOTP);

router.post("/register", register);

// =========================
// LOGIN
// =========================

router.post("/login", login);

router.post("/send-login-otp", sendLoginOTP);

router.post("/verify-login-otp", verifyLoginOTP);

// =========================
// FORGOT PASSWORD
// =========================

router.post("/send-forgot-otp", sendForgotOTP);

router.post("/verify-forgot-otp", verifyForgotOTP);

router.post("/reset-password", resetPassword);

// =========================
// CHANGE PASSWORD
// =========================

router.put(
  "/change-password",
  protect,
  changePassword
); 

export default router;