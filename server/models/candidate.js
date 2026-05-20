import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: String,
    email: String,
    phone: String,
    role: String,

    bio: String,

    headline: String,
    location: String,
    experience: String,
    education: String,

    portfolio: String,
    linkedin: String,
    github: String,

    skills: [String],

    resume: String,

    profileImage: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Candidate",
  candidateSchema
);