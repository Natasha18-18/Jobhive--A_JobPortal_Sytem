import express from "express";

import { protect }
from "../middleware/authMiddleware.js";

import {
  updateCandidateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.put(
  "/candidate/update",
  protect,
  updateCandidateProfile
);

export default router;