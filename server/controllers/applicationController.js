import Application from "../models/Application.js";
import Job from "../models/jobModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";


// ==========================================
// APPLY JOB
// ==========================================

export const applyJob = async (
  req,
  res
) => {

  try {

    const jobId =
      req.params.id;

    const userId =
      req.user._id;

    const job =
      await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

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

    const application =
      await Application.create({
        applicant: userId,
        recruiter:
          job.recruiter,
        job: jobId,
        status: "Pending",
      });

    // if (
    //   !job.applicants.includes(
    //     userId
    //   )
    // ) {

    //   job.applicants.push(
    //     userId
    //   );

    //   await job.save();

    // }

    const recruiter =
      await User.findById(
        job.recruiter
      );

    // RECRUITER NOTIFICATION
    await Notification.create({
      user: job.recruiter,
      title:
        "New Job Application",
      message:
        `${req.user.fullName} applied for ${job.title}`,
      type: "applicant",
    });

    // CANDIDATE NOTIFICATION
    await Notification.create({
      user: userId,
      title:
        "Application Submitted",
      message:
        `You successfully applied for ${job.title}`,
      type: "success",
    });

    // EMAIL
    if (recruiter) {

      await sendEmail({
        to: recruiter.email,
        subject:
          "New Job Application Received",

        html: `
          <div style="font-family:sans-serif;">
            <h2>New Applicant Applied</h2>

            <p>
              <b>${req.user.fullName}</b>
              applied for
              <b>${job.title}</b>
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

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};


// ==========================================
// GET MY APPLICATIONS
// ==========================================

export const getMyApplications =
  async (req, res) => {

    try {

      const applications =
        await Application
          .find({
            applicant:
              req.user.id,
          })
          .populate("job")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        applications,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }

  };


// ==========================================
// GET APPLICANTS
// ==========================================

export const getApplicants =
  async (req, res) => {

    try {

      const jobId =
        req.params.jobId;

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

      // OWNER CHECK
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

      const applications =
        await Application.find({
          job: jobId,
        })
          .populate(
            "applicant",
            `
              fullName
              email
              phone
              profileImage
              resume
              location
              experience
              skills
              portfolio
              linkedin
            `
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

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };


// ==========================================
// GET SINGLE APPLICATION
// ==========================================

export const getSingleApplication =
  async (req, res) => {

    try {

      const application =
        await Application
          .findById(
            req.params.id
          )
          .populate(
  "applicant",
  `
  fullName
  email
  phone
  profileImage
  headline
  bio
  location
  experience
  skills
  portfolio
  linkedin
  github
  resume
  `
)
          .populate(
            "job"
          );

      if (
        !application
      ) {

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

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };


// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const { status } =
        req.body;

      // VALIDATION
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

      const application =
        await Application
          .findById(
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

      application.status =
        status;

      await application.save();

      // NOTIFICATION
      await Notification.create({
        user:
          application.applicant._id,

        title:
          `Application ${status}`,

        message:
          status === "Accepted"
            ? `Congratulations! Your application for ${application.job.title} has been accepted`
            : `Your application for ${application.job.title} has been rejected`,

        type:
          status === "Accepted"
            ? "success"
            : "rejected",
      });

      // EMAIL
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
                  <b>${application.job.title}</b>
                  has been accepted.
                </p>

              </div>
            `
            : `
              <div style="font-family:sans-serif;">

                <h2>
                  Application Rejected
                </h2>

                <p>
                  Your application for
                  <b>${application.job.title}</b>
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

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };


// ==========================================
// DELETE APPLICATION
// ==========================================

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

      application.status =
        "Deleted";

      await application.save();

      // REMOVE USER FROM JOB
      await Job.findByIdAndUpdate(
        application.job,
        {
          $pull: {
            applicants:
              application.applicant,
          },
        }
      );

      // NOTIFICATION
      await Notification.create({
        user:
          application.applicant,

        title:
          "Application Deleted",

        message:
          "Your application has been deleted",

        type: "deleted",
      });

      res.status(200).json({
        success: true,
        message:
          "Application deleted successfully",
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };


// ==========================================
// SEND INTERVIEW INVITE
// ==========================================

export const sendInterviewInvite =
  async (req, res) => {

    try {

      const {
        date,
        time,
        mode,
        meetingLink,
        location,
        message,
      } = req.body;

      const application =
        await Application
          .findById(
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

      // SAVE INTERVIEW DATA
      application.interviewScheduled =
        true;

      application.interviewDate =
        `${date} ${time}`;

      application.interviewMode =
        mode;

      application.meetingLink =
        meetingLink;

      application.interviewLocation =
        location;

      application.interviewMessage =
        message;

      await application.save();

      // NOTIFICATION
      await Notification.create({
        user:
          application.applicant._id,

        title:
          "Interview Scheduled",

        message:
          `Interview scheduled for ${application.job.title}`,

        type:
          "interview",
      });

      // EMAIL
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
              Hello
              <b>
                ${application.applicant.fullName}
              </b>
            </p>

            <p>
              Your interview for
              <b>
                ${application.job.title}
              </b>
              has been scheduled.
            </p>

            <hr />

            <p>
              <b>Date:</b>
              ${date}
            </p>

            <p>
              <b>Time:</b>
              ${time}
            </p>

            <p>
              <b>Mode:</b>
              ${mode}
            </p>

            ${
              mode === "Online"
                ? `
                  <p>
                    <b>Meeting Link:</b>
                    ${meetingLink}
                  </p>
                `
                : `
                  <p>
                    <b>Location:</b>
                    ${location}
                  </p>
                `
            }

            <p>
              <b>Message:</b>
              ${message}
            </p>

          </div>
        `,
      });

      res.status(200).json({
        success: true,
        message:
          "Interview scheduled successfully",
        application,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };