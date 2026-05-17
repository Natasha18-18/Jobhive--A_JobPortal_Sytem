import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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

    // ==========================
    // COMMON PROFILE IMAGE
    // ==========================

    profileImage: {
      type: String,
      default: "",
    },

    // ==========================
    // RECRUITER PROFILE
    // ==========================

    recruiterProfile: {
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