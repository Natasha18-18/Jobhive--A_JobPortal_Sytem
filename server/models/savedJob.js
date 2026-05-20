import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // CHANGE THIS
    jobId: {
      type: String,
      required: true,
    },

    title: String,
    company: String,
    location: String,
    salary: String,
    type: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "SavedJob",
  savedJobSchema
);