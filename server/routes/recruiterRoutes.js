import express from "express";

import {
  updateRecruiterProfile,
  getRecruiterProfile,
} from "../controllers/recruiterController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==============================
// GET PROFILE
// ==============================

router.get(
  "/profile",
  protect,
  getRecruiterProfile
);

// ==============================
// UPDATE PROFILE
// ==============================

router.put(
  "/profile",
  protect,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },

    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  updateRecruiterProfile
);

export default router;