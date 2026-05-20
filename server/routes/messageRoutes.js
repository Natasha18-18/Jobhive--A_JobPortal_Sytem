import express from "express";

import {
  sendMessage,
  getConversation,
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router =
  express.Router();


// SEND MESSAGE
router.post(
  "/send",
  protect,
  sendMessage
);


// GET CONVERSATION
router.get(
  "/:userId",
  protect,
  getConversation
);

export default router;