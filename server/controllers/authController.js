import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import OTP from "../models/OTP.js";

import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";


// SEND REGISTER OTP
export const sendOTP = async (req, res) => {
  try {

    const { email } = req.body;

    const otp = generateOTP();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
    });

    await sendEmail({
  to: email,

  subject: "Job Portal OTP Verification",

  html: `
    <div style="font-family:sans-serif;">
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>
        This OTP expires in 5 minutes.
      </p>
    </div>
  `,
});

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// REGISTER
export const register = async (req, res) => {
  try {

    const {
      fullName,
      email,
      phone,
      password,
      role,
      otp,
    } = req.body;

    // CHECK OTP
    const otpData = await OTP.findOne({ email });

    if (!otpData || otpData.otp !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    // CHECK USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      isVerified: true,
    });

    // DELETE OTP
    await OTP.deleteMany({ email });

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// LOGIN WITH PASSWORD
export const login = async (req, res) => {
  try {

    const { email, password, role } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // ROLE CHECK
    if (user.role !== role) {

      return res.status(400).json({
        success: false,
        message: "Invalid role selected",
      });

    }

    // PASSWORD CHECK
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });

    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// SEND LOGIN OTP
export const sendLoginOTP = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const otp = generateOTP();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
    });

    await sendEmail({
  to: email,

  subject: "Job Portal OTP Verification",

  html: `
    <div style="font-family:sans-serif;">
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>
        This OTP expires in 5 minutes.
      </p>
    </div>
  `,
});

    res.status(200).json({
      success: true,
      message: "Login OTP sent successfully",
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// VERIFY LOGIN OTP
export const verifyLoginOTP = async (req, res) => {
  try {

    const { email, otp, role } = req.body;

    // CHECK OTP
    const otpData = await OTP.findOne({ email });

    if (!otpData || otpData.otp !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // ROLE CHECK
    if (user.role !== role) {

      return res.status(400).json({
        success: false,
        message: "Invalid role selected",
      });

    }

    // DELETE OTP
    await OTP.deleteMany({ email });

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


///////////////////////////////////////////////////////////
// SEND FORGOT PASSWORD OTP
///////////////////////////////////////////////////////////

export const sendForgotOTP = async (req, res) => {
  try {

    const { email } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // GENERATE OTP
    const otp = generateOTP();

    // DELETE OLD OTP
    await OTP.deleteMany({ email });

    // SAVE NEW OTP
    await OTP.create({
      email,
      otp,
    });

    // SEND EMAIL
    await sendEmail({
  to: email,

  subject: "Job Portal OTP Verification",

  html: `
    <div style="font-family:sans-serif;">
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>
        This OTP expires in 5 minutes.
      </p>
    </div>
  `,
});

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




///////////////////////////////////////////////////////////
// VERIFY FORGOT PASSWORD OTP
///////////////////////////////////////////////////////////

export const verifyForgotOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    // FIND OTP
    const otpData = await OTP.findOne({ email });

    // CHECK OTP
    if (!otpData || otpData.otp !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


///////////////////////////////////////////////////////////
// RESET PASSWORD
///////////////////////////////////////////////////////////

export const resetPassword = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    // DELETE OTP
    await OTP.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

///////////////////////////////////////////////////////////
// CHANGE PASSWORD
///////////////////////////////////////////////////////////

export const changePassword = async (
  req,
  res
) => {

  try {

    const {
      userId,
      oldPassword,
      newPassword,
    } = req.body;

    // FIND USER
    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // CHECK OLD PASSWORD
    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Current password incorrect",
      });

    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};