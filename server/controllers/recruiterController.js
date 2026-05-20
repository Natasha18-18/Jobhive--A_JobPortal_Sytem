import User from "../models/User.js";
import Job from "../models/JobModel.js";

import Application from "../models/Application.js";

// ==============================
// GET RECRUITER PROFILE
// ==============================

export const getRecruiterProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to load profile",
      });
    }
  };

// ==============================
// UPDATE RECRUITER PROFILE
// ==============================

export const updateRecruiterProfile =
  async (req, res) => {

    try {

      const {
        fullName,
        email,
        phone,
        companyName,
        industry,
        location,
        website,
        linkedin,
        experience,
        skills,
        companyDescription,
      } = req.body;

      const user =
        await User.findById(req.user.id);

      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      }

      // CREATE OBJECT IF NOT EXISTS
      if (!user.recruiterProfile) {

        user.recruiterProfile = {};

      }

      // PROFILE IMAGE
      if (
        req.files?.profileImage
      ) {

        user.profileImage =
          req.files.profileImage[0]
            .filename;

      }

      // COMPANY LOGO
      if (
        req.files?.companyLogo
      ) {

        user.recruiterProfile.companyLogo =
          req.files.companyLogo[0]
            .filename;

      }

      // BASIC INFO
      user.fullName = fullName;
      user.email = email;
      user.phone = phone;

      // RECRUITER PROFILE
      user.recruiterProfile.companyName =
        companyName;

      user.recruiterProfile.industry =
        industry;

      user.recruiterProfile.location =
        location;

      user.recruiterProfile.website =
        website;

      user.recruiterProfile.linkedin =
        linkedin;

      user.recruiterProfile.experience =
        experience;

      user.recruiterProfile.skills =
        skills;

      user.recruiterProfile.companyDescription =
        companyDescription;

      await user.save();

      const updatedUser =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json({
        success: true,
        message:
          "Recruiter profile updated successfully",
        user: updatedUser,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Profile update failed",
      });

    }

  };

// ==============================
// RECRUITER DASHBOARD
// ==============================

export const getRecruiterDashboard =
  async (req, res) => {

    try {

      const recruiterId =
        req.user._id;

      // =========================
      // TOTAL JOBS
      // =========================

      const totalJobs =
        await Job.countDocuments({
          createdBy: recruiterId,
        });

      // =========================
      // RECRUITER JOBS
      // =========================

      const jobs =
        await Job.find({
          createdBy: recruiterId,
        }).sort({
          createdAt: -1,
        });

      const jobIds =
        jobs.map(
          (job) => job._id
        );

      // =========================
      // TOTAL APPLICATIONS
      // =========================

      const totalApplications =
        await Application.countDocuments({
          job: {
            $in: jobIds,
          },
        });

      // =========================
      // ACCEPTED APPLICATIONS
      // =========================

      const acceptedApplications =
        await Application.countDocuments({
          job: {
            $in: jobIds,
          },
          status: "Accepted",
        });

      // =========================
      // TOTAL VIEWS
      // =========================

      const totalViews =
        jobs.reduce(
          (acc, job) =>
            acc + (job.views || 0),
          0
        );

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

      const recentJobs =
        await Promise.all(

          jobs
            .slice(0, 5)
            .map(async (job) => {

              const applicants =
                await Application.countDocuments({
                  job: job._id,
                });

              return {
                _id: job._id,

                title: job.title,

                company:
                  job.companyName,

                applicants,

                status:
                  job.openStatus
                    ? "Active"
                    : "Closed",
              };

            })

        );

      // =========================
      // RESPONSE
      // =========================

      res.status(200).json({

        success: true,

        dashboard: {

          totalJobs,

          totalApplications,

          acceptedApplications,

          totalViews,

          hiringRate,

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