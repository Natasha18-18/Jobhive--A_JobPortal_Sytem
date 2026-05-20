import SavedJob from "../models/SavedJob.js";

// SAVE JOB
export const saveJob = async (req, res) => {
  try {

    const userId = req.user._id;

    const {
      jobId,
      title,
      company,
      location,
      salary,
      type,
    } = req.body;

    const existing =
      await SavedJob.findOne({
        userId,
        jobId,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob =
      await SavedJob.create({
        userId,
        jobId,
        title,
        company,
        location,
        salary,
        type,
      });

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET SAVED JOBS
export const getSavedJobs =
  async (req, res) => {

    try {

      const userId =
        req.user._id;

      const jobs =
        await SavedJob.find({
          userId,
        }).sort({
          createdAt: -1,
        });

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

// DELETE SAVED JOB
export const removeSavedJob =
  async (req, res) => {

    try {

      const userId =
        req.user._id;

      const { jobId } =
        req.params;

      await SavedJob.findOneAndDelete({
        userId,
        jobId,
      });

      res.json({
        success: true,
        message: "Removed from saved jobs",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };