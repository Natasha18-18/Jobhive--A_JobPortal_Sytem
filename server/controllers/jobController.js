import Job from "../models/jobModel.js";


// CREATE JOB
export const createJob = async (
  req,
  res
) => {
  try {

    const job = await Job.create({
      ...req.body,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET ALL JOBS
export const getJobs = async (
  req,
  res
) => {
  try {

    const jobs = await Job.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET SINGLE JOB
export const getSingleJob =
  async (req, res) => {

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

      res.json({
        success: true,
        job,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };