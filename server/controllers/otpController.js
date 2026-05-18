import User from "../models/User.js";

import jwt from "jsonwebtoken";

import sendEmail from "../utils/sendEmail.js";

// ==============================
// SEND OTP
// ==============================

export const sendOtp =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      // ==============================
      // CHECK EMAIL
      // ==============================

      if (!email) {

        return res.status(400).json({
          success: false,
          message:
            "Email is required",
        });

      }

      // ==============================
      // FIND USER
      // ==============================

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });

      }

      // ==============================
      // GENERATE OTP
      // ==============================

      const otp =
        Math.floor(
          100000 +
            Math.random() *
              900000
        ).toString();

      // ==============================
      // SAVE OTP
      // ==============================

      user.otp = otp;

      user.otpExpiry =
        Date.now() +
        5 * 60 * 1000;

      await user.save();

      // ==============================
      // SEND EMAIL
      // ==============================

      await sendEmail({
        to: email,

        subject:
          "Job Portal OTP Verification",

        html: `
          <div style="font-family:sans-serif;">

            <h2>
              Your OTP Code
            </h2>

            <h1>
              ${otp}
            </h1>

            <p>
              This OTP expires in
              5 minutes.
            </p>

          </div>
        `,
      });

      // ==============================
      // RESPONSE
      // ==============================

      res.status(200).json({
        success: true,
        message:
          "OTP sent successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }

  };

// ==============================
// VERIFY OTP
// ==============================

export const verifyOtp =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      // ==============================
      // FIND USER
      // ==============================

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });

      }

      // ==============================
      // CHECK OTP
      // ==============================

      if (
        user.otp !== otp
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid OTP",
        });

      }

      // ==============================
      // CHECK EXPIRY
      // ==============================

      if (
        user.otpExpiry <
        Date.now()
      ) {

        return res.status(400).json({
          success: false,
          message:
            "OTP expired",
        });

      }

      // ==============================
      // CLEAR OTP
      // ==============================

      user.otp = null;

      user.otpExpiry = null;

      await user.save();

      // ==============================
      // GENERATE TOKEN
      // ==============================

      const token =
        jwt.sign(
          {
            id: user._id,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      // ==============================
      // RESPONSE
      // ==============================

      res.status(200).json({
        success: true,
        message:
          "OTP verified successfully",

        token,

        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }

  };