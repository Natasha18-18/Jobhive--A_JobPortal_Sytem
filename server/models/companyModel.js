import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    industry: String,

    location: String,

    website: String,

    companyLogo: String,

    description: String,

    totalJobs: {
      type: Number,
      default: 0,
    },
    
    openStatus: {
      type: Boolean,
      default: true,
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