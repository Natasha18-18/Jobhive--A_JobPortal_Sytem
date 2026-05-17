import Job from "../models/jobModel.js";

// ==========================
// CREATE JOB
// ==========================

export const createJob = async (
  req,
  res
) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      skills,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !type ||
      !experience ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all fields",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      skills:
        skills?.split(",") || [],
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message:
        "Job uploaded successfully",
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

// ==========================
// GET MY JOBS
// ==========================

export const getMyJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    }).sort({
      createdAt: -1,
    });

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

// ==========================
// GET ALL JOBS
// ==========================

export const getAllJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Job.find().sort({
      createdAt: -1,
    });

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

// ==========================
// GET SINGLE JOB
// ==========================

export const getSingleJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

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

// ==========================
// UPDATE JOB
// ==========================

export const updateJob = async (
  req,
  res
) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      skills,
      status,
    } = req.body;

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.title = title;
    job.company = company;
    job.location = location;
    job.salary = salary;
    job.type = type;
    job.experience = experience;
    job.description = description;
    job.status = status;

    job.skills =
      skills?.split(",") || [];

    await job.save();

    res.status(200).json({
      success: true,
      message:
        "Job updated successfully",
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

// ==========================
// DELETE JOB
// ==========================

export const deleteJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};