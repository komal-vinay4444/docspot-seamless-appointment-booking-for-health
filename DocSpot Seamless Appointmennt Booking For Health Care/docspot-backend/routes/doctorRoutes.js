// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const doctorModel = require("../models/Doctor");
const { getDoctorProfileByUserId } = require("../controllers/doctorController");

const {
  registerDoctor,
  approveDoctor,
} = require("../controllers/doctorController");

// Public route to fetch approved doctors
router.get("/approved", authMiddleware, async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.error("Fetch doctors error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile/:userId", authMiddleware, getDoctorProfileByUserId);

module.exports = router;

router.post("/register", registerDoctor);
router.put("/approve/:id", approveDoctor); 

module.exports = router;
