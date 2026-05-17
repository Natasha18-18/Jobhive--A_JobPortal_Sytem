import Application from "../models/Application.js";
import Job from "../models/jobModel.js";

// ==========================
// APPLY JOB
// ==========================

export const applyJob = async (
  req,
  res
) => {

  try {

    const jobId =
      req.params.id;

    const userId =
      req.user._id;

    // ==========================
    // FIND JOB
    // ==========================

    const job =
      await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    // ==========================
    // RECRUITER CANNOT APPLY
    // ==========================

    if (
      req.user.role ===
      "recruiter"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Recruiters cannot apply",
      });

    }

    // ==========================
    // CHECK ALREADY APPLIED
    // ==========================

    const alreadyApplied =
      await Application.findOne({
        job: jobId,
        applicant: userId,
      });

    if (alreadyApplied) {

      return res.status(400).json({
        success: false,
        message:
          "Already applied to this job",
      });

    }

    // ==========================
    // CREATE APPLICATION
    // ==========================

    const application =
      await Application.create({
        applicant: userId,
        recruiter:
          job.recruiter,
        job: jobId,
        status: "Pending",
      });

    // ==========================
    // PUSH APPLICANT INTO JOB
    // ==========================

    if (
      !job.applicants.includes(
        userId
      )
    ) {

      job.applicants.push(
        userId
      );

    }

    await job.save();

    // ==========================
    // RESPONSE
    // ==========================

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      application,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

// ==========================
// GET MY APPLICATIONS
// ==========================

export const getMyApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({
          applicant:
            req.user._id,
        })
          .populate(
            "job",
            "title company location salary type"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        applications,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ==========================
// GET JOB APPLICANTS
// ==========================

export const getApplicants =
  async (req, res) => {

    try {

      const jobId =
        req.params.id;

      // ==========================
      // FIND JOB
      // ==========================

      const job =
        await Job.findById(
          jobId
        );

      if (!job) {

        return res.status(404).json({
          success: false,
          message:
            "Job not found",
        });

      }

      // ==========================
      // ONLY OWNER CAN VIEW
      // ==========================

      if (
        job.recruiter.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied",
        });

      }

      // ==========================
      // GET APPLICATIONS
      // ==========================

      const applications =
        await Application.find({
          job: jobId,
        })
          .populate(
            "applicant",
            "fullName email phone"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        applications,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ==========================
// UPDATE APPLICATION STATUS
// ==========================

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const { status } =
        req.body;

      // ==========================
      // VALIDATION
      // ==========================

      if (
        ![
          "Pending",
          "Accepted",
          "Rejected",
        ].includes(status)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid status",
        });

      }

      // ==========================
      // FIND APPLICATION
      // ==========================

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });

      }

      // ==========================
      // FIND JOB
      // ==========================

      const job =
        await Job.findById(
          application.job
        );

      if (!job) {

        return res.status(404).json({
          success: false,
          message:
            "Job not found",
        });

      }

      // ==========================
      // ONLY RECRUITER
      // ==========================

      if (
        job.recruiter.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied",
        });

      }

      // ==========================
      // UPDATE STATUS
      // ==========================

      application.status =
        status;

      await application.save();

      // ==========================
      // RESPONSE
      // ==========================

      res.status(200).json({
        success: true,
        message:
          `Application ${status}`,
        application,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ==========================
// DELETE APPLICATION
// ==========================

export const deleteApplication =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });

      }

      await application.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Application deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };