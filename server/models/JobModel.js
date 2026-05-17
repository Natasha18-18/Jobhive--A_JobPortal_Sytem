import mongoose from "mongoose";

const jobSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      salary: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        default: "Full Time",
      },

      experience: {
        type: String,
        required: true,
      },

      skills: [
        {
          type: String,
        },
      ],

      status: {
        type: String,
        enum: [
          "Active",
          "Closed",
        ],
        default: "Active",
      },

      applicants: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      recruiter: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Job =
  mongoose.models.Job ||
  mongoose.model(
    "Job",
    jobSchema
  );

export default Job;