import Job from "../models/JobModel.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

export const getRecruiterDashboard = async (
  req,
  res
) => {
  try {
    // =========================
    // RECRUITER
    // =========================

    const recruiter = await User.findById(
      req.user._id
    ).select("fullName recruiterProfile profileImage");

    // =========================
    // JOBS
    // =========================

    const jobs = await Job.find({
      recruiter: req.user._id,
    }).sort({ createdAt: -1 });

    const totalJobs = jobs.length;

    // =========================
    // APPLICATIONS
    // =========================

    const jobIds = jobs.map(
      (job) => job._id
    );

    const applications =
      await Application.find({
        job: {
          $in: jobIds,
        },
      });

    const totalApplications =
      applications.length;

    // =========================
    // ACCEPTED
    // =========================

    const acceptedApplications =
      applications.filter(
        (app) =>
          app.status === "Accepted"
      ).length;

    // =========================
    // HIRING RATE
    // =========================

    const hiringRate =
      totalApplications > 0
        ? Math.round(
            (acceptedApplications /
              totalApplications) *
              100
          )
        : 0;

    // =========================
    // RECENT JOBS
    // =========================

    const recentJobs = await Promise.all(
      jobs.slice(0, 5).map(
        async (job) => {
          const applicantsCount =
            await Application.countDocuments(
              {
                job: job._id,
              }
            );

          return {
            _id: job._id,
            title: job.title,
            location: job.location,
            jobType: job.jobType,
            applicants: applicantsCount,
            createdAt: job.createdAt,
            status:
              job.status || "Active",
          };
        }
      )
    );

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      dashboard: {
        recruiter,
        stats: {
          totalJobs,
          totalApplications,
          acceptedApplications,
          hiringRate,
        },
        recentJobs,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard",
    });
  }
};