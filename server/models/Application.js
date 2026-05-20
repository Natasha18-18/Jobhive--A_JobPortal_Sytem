import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Accepted",
          "Rejected",
          "Deleted",
        ],
        default: "Pending",
      },

      interviewScheduled: {
        type: Boolean,
        default: false,
      },

      interviewDate: {
        type: String,
      },

    },
    {
      timestamps: true,
    }
  );

const Application =
  mongoose.model(
    "Application",
    applicationSchema
  );

export default Application;