import mongoose from "mongoose";

const candidateSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      role: {
        type: String,
        default: "candidate",
      },

      bio: {
        type: String,
        default: "",
      },

      headline: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      experience: {
        type: String,
        default: "",
      },

      education: {
        type: String,
        default: "",
      },

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

      skills: [
        {
          type: String,
          trim: true,
        },
      ],

      resume: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        default:
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Candidate",
  candidateSchema
);