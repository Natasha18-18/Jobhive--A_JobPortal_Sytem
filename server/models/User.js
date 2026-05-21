import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    // ==========================
    // BASIC INFO
    // ==========================

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "candidate",
        "recruiter",
        "admin",
      ],
      default: "candidate",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ✅ ADD THIS
    profileImage: {
      type: String,
      default: "",
    },

    // ==========================
    // CANDIDATE PROFILE
    // ==========================

    headline: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    portfolio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    // ==========================
    // OTP
    // ==========================

    otp: {
      type: String,
      default: "",
    },

    otpExpiry: {
      type: Date,
    },

    // ==========================
    // RECRUITER PROFILE
    // ==========================

recruiterProfile: {
  type: {
    companyName: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    companyDescription: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },
  },

  default: {},
},

  },

  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;