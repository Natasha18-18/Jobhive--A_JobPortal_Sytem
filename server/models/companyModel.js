import mongoose from "mongoose";

const companySchema =
  new mongoose.Schema(
    {
      companyName: {
        type: String,
        required: true,
      },

      industry: {
        type: String,
      },

      location: {
        type: String,
      },

      website: {
        type: String,
      },

      companyLogo: {
        type: String,
      },

      description: {
        type: String,
      },

      totalJobs: {
        type: Number,
        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

const Company =
  mongoose.model(
    "Company",
    companySchema
  );

export default Company;