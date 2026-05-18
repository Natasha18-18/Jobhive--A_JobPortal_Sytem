import express from "express";

import {
  applyJob,
  getMyApplications,
  getApplicants,
  getSingleApplication,
  updateApplicationStatus,
  deleteApplication,
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

// GET MY APPLICATIONS
router.get(
  "/my",
  protect,
  getMyApplications
);

// GET JOB APPLICANTS
router.get(
  "/applicants/:jobId",
  protect,
  getApplicants
);

// GET SINGLE APPLICATION
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

// DELETE APPLICATION
router.delete(
  "/delete/:id",
  protect,
  deleteApplication
);

// INTERVIEW INVITE
router.post(
  "/interview/:id",
  protect,
  sendInterviewInvite
);

export default router;