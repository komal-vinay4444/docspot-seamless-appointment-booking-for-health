const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  getAllNotifications,
  markAllAsSeen,
  deleteAllNotifications,
} = require("../controllers/notificationController");

// ✅ Get all notifications (seen + unseen)
router.get("/", authMiddleware, getAllNotifications);

// ✅ Mark all unseen notifications as seen
router.put("/mark-as-seen", authMiddleware, markAllAsSeen);

// ✅ Delete all notifications
router.delete("/clear", authMiddleware, deleteAllNotifications);

module.exports = router;
