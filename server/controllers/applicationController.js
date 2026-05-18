import Application from "../models/Application.js";
import Job from "../models/jobModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/User.js";
import createNotification from "../utils/createNotification.js";
import sendEmail from "../utils/sendEmail.js";


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

    // FIND JOB
    const job =
      await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    // RECRUITER CANNOT APPLY
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

    // ALREADY APPLIED
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

    // CREATE APPLICATION
    const application =
      await Application.create({
        applicant: userId,

        recruiter:
          job.recruiter,

        job: jobId,

        status: "Pending",
      });

    // PUSH APPLICANT
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
    // CREATE RECRUITER NOTIFICATION
    // ==========================

    await Notification.create({
      user: job.recruiter,

      title:
        "New Job Application",

      message:
        `${req.user.fullName} applied for ${job.title}`,

      type: "applicant",
    });

    // ==========================
    // SEND EMAIL TO RECRUITER
    // ==========================

    const recruiter =
      await User.findById(
        job.recruiter
      );

    if (recruiter) {

      await sendEmail({
        to: recruiter.email,

        subject:
          "New Job Application Received",

        html: `
          <div style="font-family:sans-serif;">

            <h2>
              New Applicant Applied
            </h2>

            <p>
              <b>
                ${req.user.fullName}
              </b>

              applied for your job:

              <b>
                ${job.title}
              </b>
            </p>

          </div>
        `,
      });

    }

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
        req.params.jobId;

      // FIND JOB
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

      // ONLY OWNER
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

      // GET APPLICATIONS
      const applications =
        await Application.find({
          job: jobId,
        })
          .populate(
            "applicant",
            "fullName email phone profileImage resume"
          )
          .populate(
            "job",
            "title"
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
// GET SINGLE APPLICATION
// ==========================

export const getSingleApplication =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        )
          .populate(
            "applicant"
          )
          .populate(
            "job"
          );

      if (!application) {

        return res.status(404).json({
          success: false,

          message:
            "Application not found",
        });

      }

      res.status(200).json({
        success: true,

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
// UPDATE APPLICATION STATUS
// ==========================

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const { status } =
        req.body;

      // VALID STATUS
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

      // FIND APPLICATION
      const application =
        await Application.findById(
          req.params.id
        )
          .populate(
            "applicant"
          )
          .populate(
            "job"
          );

      if (!application) {

        return res.status(404).json({
          success: false,

          message:
            "Application not found",
        });

      }

      // FIND JOB
      const job =
        await Job.findById(
          application.job._id
        );

      if (!job) {

        return res.status(404).json({
          success: false,

          message:
            "Job not found",
        });

      }

      // CHECK OWNER
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

      // UPDATE STATUS
      application.status =
        status;

      await application.save();

      // ==========================
      // CREATE CANDIDATE NOTIFICATION
      // ==========================

      await Notification.create({
        user:
          application.applicant._id,

        title:
          `Application ${status}`,

        message:
          status === "Accepted"
            ? `Congratulations! Your application for ${job.title} has been accepted`
            : `Your application for ${job.title} has been rejected`,

        type:
          status === "Accepted"
            ? "success"
            : "rejected",
      });

      // ==========================
      // SEND EMAIL TO CANDIDATE
      // ==========================

      await sendEmail({
        to:
          application.applicant.email,

        subject:
          status === "Accepted"
            ? "Application Accepted"
            : "Application Rejected",

        html:
          status === "Accepted"
            ? `
              <div style="font-family:sans-serif;">

                <h2>
                  Congratulations 🎉
                </h2>

                <p>
                  Your application for
                  <b>${job.title}</b>
                  has been accepted.
                </p>

              </div>
            `
            : `
              <div style="font-family:sans-serif;">

                <h2>
                  Application Update
                </h2>

                <p>
                  Your application for
                  <b>${job.title}</b>
                  has been rejected.
                </p>

              </div>
            `,
      });

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


// ==========================
// SEND INTERVIEW INVITE
// ==========================

export const sendInterviewInvite =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        )
          .populate(
            "applicant"
          )
          .populate(
            "job"
          );

      if (!application) {

        return res.status(404).json({
          success: false,

          message:
            "Application not found",
        });

      }

      // CREATE NOTIFICATION

      await Notification.create({
        user:
          application.applicant._id,

        title:
          "Interview Invitation",

        message:
          `You have been invited for an interview for ${application.job.title}`,

        type:
          "interview",
      });

      // SEND EMAIL

      await sendEmail({
        to:
          application.applicant.email,

        subject:
          "Interview Invitation",

        html: `
          <div style="font-family:sans-serif;">

            <h2>
              Interview Invitation
            </h2>

            <p>
              Congratulations!
            </p>

            <p>
              You have been shortlisted for

              <b>
                ${application.job.title}
              </b>
            </p>

          </div>
        `,
      });

      res.status(200).json({
        success: true,

        message:
          "Interview invite sent",
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