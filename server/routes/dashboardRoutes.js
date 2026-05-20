import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getRecruiterDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/recruiter",
  protect,
  getRecruiterDashboard
);

export default router;