import express from "express";

import {
  createJob,
  getMyJobs,
  getAllJobs,
  deleteJob,
  getSingleJob,
  updateJob,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE JOB
router.post(
  "/create",
  protect,
  createJob
);

// GET ALL JOBS
router.get(
  "/all",
  getAllJobs
);

// GET MY JOBS
router.get(
  "/my-jobs",
  protect,
  getMyJobs
);

// GET SINGLE JOB
router.get(
  "/:id",
  getSingleJob
);

// UPDATE JOB
router.put(
  "/update/:id",
  protect,
  updateJob
);

// DELETE JOB
router.delete(
  "/delete/:id",
  protect,
  deleteJob
);

export default router;