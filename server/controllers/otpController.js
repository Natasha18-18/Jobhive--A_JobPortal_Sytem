// src/controllers/jobController.js

import Job from "../models/Job.js";

// ==============================
// CREATE JOB
// ==============================
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      skills,
      description,
    } = req.body;

    // validation
    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // create job
    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      skills,
      description,

      // logged in recruiter id
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// GET ALL JOBS
// ==============================
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// GET SINGLE JOB
// ==============================
export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    ).populate("recruiter", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};