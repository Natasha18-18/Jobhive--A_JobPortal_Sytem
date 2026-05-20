import express from "express";

import {
  createJob,
  getMyJobs,
  getAllJobs,
  deleteJob,
  getSingleJob,
  updateJob,
} from "../controllers/jobController.js";

import {
  getExternalJobs,
} from "../controllers/externalJobController.js";

import { protect }
from "../middleware/authMiddleware.js";

const router =
  express.Router();


// =======================
// EXTERNAL JOBS
// =======================

router.get(
  "/external",
  getExternalJobs
);


// =======================
// CREATE JOB
// =======================

router.post(
  "/create",
  protect,
  createJob
);


// =======================
// GET ALL JOBS
// =======================

router.get(
  "/all",
  getAllJobs
);


// =======================
// GET MY JOBS
// =======================

router.get(
  "/my-jobs",
  protect,
  getMyJobs
);


// =======================
// UPDATE JOB
// =======================

router.put(
  "/update/:id",
  protect,
  updateJob
);


// =======================
// DELETE JOB
// =======================

router.delete(
  "/delete/:id",
  protect,
  deleteJob
);


// =======================
// SINGLE JOB
// ALWAYS KEEP LAST
// =======================

router.get(
  "/:id",
  getSingleJob
);

export default router;