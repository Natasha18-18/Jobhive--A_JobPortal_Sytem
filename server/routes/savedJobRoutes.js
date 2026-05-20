import express from "express";

import {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} from "../controllers/savedController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// SAVE JOB
router.post(
  "/save",
  protect,
  saveJob
);

// GET SAVED JOBS
router.get(
  "/all",
  protect,
  getSavedJobs
);

// DELETE
router.delete(
  "/remove/:jobId",
  protect,
  removeSavedJob
);

export default router;