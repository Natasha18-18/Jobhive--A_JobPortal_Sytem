import express from "express";
import multer from "multer";

import Candidate from "../models/Candidate.js";

const router = express.Router();

// ======================
// MULTER STORAGE
// ======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
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

      const existingCandidate =
        await Candidate.findOne({
          userId: req.body.userId,
        });

      if (existingCandidate) {

        existingCandidate.fullName =
          req.body.fullName;

        existingCandidate.email =
          req.body.email;

        existingCandidate.phone =
          req.body.phone;

        existingCandidate.role =
          req.body.role;

        existingCandidate.bio =
          req.body.bio;

        existingCandidate.portfolio =
          req.body.portfolio;

        existingCandidate.linkedin =
          req.body.linkedin;

        existingCandidate.github =
          req.body.github;

        existingCandidate.skills =
          JSON.parse(req.body.skills || "[]");

        if (req.files?.resume) {
          existingCandidate.resume =
            req.files.resume[0].filename;
        }

        if (req.files?.profileImage) {
          existingCandidate.profileImage =
            req.files.profileImage[0].filename;
        }

        await existingCandidate.save();

        return res.status(200).json({
          success: true,
          message: "Profile Updated",
          data: existingCandidate,
        });
      }

      // CREATE NEW PROFILE

      const candidate = new Candidate({
        userId: req.body.userId,

        fullName: req.body.fullName,

        email: req.body.email,

        phone: req.body.phone,

        role: req.body.role,

        bio: req.body.bio,

        portfolio: req.body.portfolio,

        linkedin: req.body.linkedin,

        github: req.body.github,

        skills: JSON.parse(
          req.body.skills || "[]"
        ),

        resume: req.files?.resume
          ? req.files.resume[0].filename
          : "",

        profileImage: req.files?.profileImage
          ? req.files.profileImage[0].filename
          : "",
      });

      await candidate.save();

      res.status(200).json({
        success: true,
        message: "Profile Saved",
        data: candidate,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ======================
// GET ALL CANDIDATES
// ======================

router.get("/all", async (req, res) => {
  try {

    const candidates = await Candidate.find();

    res.status(200).json({
      success: true,
      data: candidates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// ======================
// GET SINGLE PROFILE
// ======================

router.get("/:userId", async (req, res) => {
  try {

    const candidate = await Candidate.findOne({
      userId: req.params.userId,
    });

    if (!candidate) {

      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });

    }

    res.status(200).json({
      success: true,
      data: candidate,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

export default router;