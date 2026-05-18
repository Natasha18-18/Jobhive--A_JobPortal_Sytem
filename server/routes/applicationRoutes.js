import express from "express";

import {
  applyJob,
  getMyApplications,
  getApplicants,
  getSingleApplication,
  updateApplicationStatus,
  sendInterviewInvite,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// APPLY JOB
router.post(
  "/apply/:id",
  protect,
  applyJob
);

// MY APPLICATIONS
router.get(
  "/my-applications",
  protect,
  getMyApplications
);

// GET APPLICANTS
router.get(
  "/applicants/:jobId",
  protect,
  getApplicants
);

// SINGLE APPLICATION
router.get(
  "/single/:id",
  protect,
  getSingleApplication
);

// UPDATE STATUS
router.put(
  "/status/:id",
  protect,
  updateApplicationStatus
);

// SEND INTERVIEW INVITE
router.post(
  "/interview/:id",
  protect,
  sendInterviewInvite
);
export default router;