// controllers/adminController.js
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const sendNotification = require("../utils/sendNotification");

// ✅ Approve a doctor (with proper notification)
const approveDoctor = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      doctor = new Doctor({
        userId,
        fullname: user.name,
        email: user.email,
        phone: user.phone || "",
        specialization: "General",
        status: "approved",
      });
    } else {
      doctor.status = "approved";
    }

    await doctor.save();

    user.type = "doctor";

    // 🔔 Add notification to user (not seen yet)
    user.notification.push({
      message: "🎉 Your doctor application has been approved by Admin!",
      date: new Date(),
    });

    await user.save();

    res.status(200).json({ message: "Doctor promoted and approved ✅" });
  } catch (err) {
    console.error("Approve Doctor Error:", err.message);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Fetch doctors with status: 'pending'
const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" }).populate("userId", "name email");
    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.error("Error fetching pending doctors:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  approveDoctor,
  getAllDoctors,
  getAllUsers,
  getPendingDoctors,
};
