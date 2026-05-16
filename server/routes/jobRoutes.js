import express from "express";

import {
  createJob,
  getJobs,
  getSingleJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post(
  "/create",
  createJob
);

router.get(
  "/all",
  getJobs
);

router.get(
  "/:id",
  getSingleJob
);

export default router;