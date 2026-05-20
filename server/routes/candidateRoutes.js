import express from "express";
import multer from "multer";

import Candidate from "../models/Candidate.js";
import User from "../models/User.js";

const router = express.Router();


// ======================
// MULTER STORAGE
// ======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});


// ======================
// CREATE / UPDATE PROFILE
// ======================

router.post(
  "/create",

  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),

  async (req, res) => {
    try {

      const {
        userId,
        fullName,
        email,
        phone,
        role,
        bio,
        headline,
        location,
        experience,
        education,
        portfolio,
        linkedin,
        github,
      } = req.body;

      // ======================
      // CHECK USER ID
      // ======================

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      // ======================
      // FIND EXISTING
      // ======================

      let candidate =
        await Candidate.findOne({
          userId,
        });

      // ======================
      // UPDATE
      // ======================

      if (candidate) {

        candidate.fullName =
          fullName;

        candidate.email =
          email;

        candidate.phone =
          phone;

        candidate.role =
          role;

        candidate.bio =
          bio;

        candidate.headline =
          headline;

        candidate.location =
          location;

        candidate.experience =
          experience;

        candidate.education =
          education;

        candidate.portfolio =
          portfolio;

        candidate.linkedin =
          linkedin;

        candidate.github =
          github;

        candidate.skills =
          JSON.parse(
            req.body.skills || "[]"
          );

        // PROFILE IMAGE

        if (
          req.files?.profileImage
        ) {
          candidate.profileImage =
            req.files.profileImage[0]
              .filename;
        }

        // RESUME

        if (req.files?.resume) {
          candidate.resume =
            req.files.resume[0]
              .filename;
        }

        await candidate.save();

      } else {

        // ======================
        // CREATE
        // ======================

        candidate =
          await Candidate.create({
            userId,

            fullName,
            email,
            phone,
            role,
            bio,

            headline,
            location,
            experience,
            education,

            portfolio,
            linkedin,
            github,

            skills: JSON.parse(
              req.body.skills || "[]"
            ),

            profileImage:
              req.files
                ?.profileImage
                ? req.files
                    .profileImage[0]
                    .filename
                : "",

            resume:
              req.files?.resume
                ? req.files.resume[0]
                    .filename
                : "",
          });
      }

      // ======================
      // UPDATE USER
      // ======================

      await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          email,
          phone,

          profileImage:
            candidate.profileImage,
        }
      );

      return res.status(200).json({
        success: true,
        message:
          "Profile Saved Successfully",
        data: candidate,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  }
);


// ======================
// GET SINGLE PROFILE
// ======================

router.get(
  "/:userId",

  async (req, res) => {
    try {

      const candidate =
        await Candidate.findOne({
          userId:
            req.params.userId,
        });

      if (!candidate) {

        return res.status(404).json({
          success: false,
          message:
            "Profile not found",
        });

      }

      res.status(200).json({
        success: true,
        data: candidate,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  }
);

export default router;