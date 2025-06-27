const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middlewares/authMiddleware");

const {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");

// 🩺 Book a new appointment
router.post("/book", authMiddleware, bookAppointment);

// 📋 Get appointments by user ID
router.get("/user/:id", authMiddleware, getUserAppointments);

// 📋 Get appointments by doctor ID
router.get("/doctor/:id", authMiddleware, getDoctorAppointments);

// ✅ Update appointment status (approve/decline)
router.put("/status/:id", authMiddleware, updateAppointmentStatus);

// ❌ Delete appointment
router.delete("/:id", authMiddleware, deleteAppointment);

// 📋 Admin: Get all appointments (use controller only)
router.get("/all", authMiddleware, requireRole("admin"), getAllAppointments);

module.exports = router;
