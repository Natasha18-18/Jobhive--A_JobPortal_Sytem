import express from "express";

import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
  markAllAsRead
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/my",
  protect,
  getMyNotifications
);

router.put(
  "/read/:id",
  protect,
  markAsRead
);

router.put(
  "/read-all",
  protect,
  markAllAsRead
);

router.delete(
  "/delete/:id",
  protect,
  deleteNotification
);

router.delete(
  "/clear",
  protect,
  clearAllNotifications
);

export default router;