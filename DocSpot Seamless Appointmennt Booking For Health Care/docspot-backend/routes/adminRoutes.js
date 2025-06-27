const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middlewares/authMiddleware");
const Doctor = require("../models/Doctor");
const {
  approveDoctor,
  getAllDoctors,
  getAllUsers,
  getPendingDoctors,
} = require("../controllers/adminController");

const userModel = require("../models/User");

// ✅ Get all registered doctors
router.get("/doctors", authMiddleware, requireRole("admin"), getAllDoctors);

// ✅ Get doctors with status = 'pending'
router.get("/pending-doctors", authMiddleware, requireRole("admin"), getPendingDoctors);

// ✅ Get all users
router.get("/users", authMiddleware, requireRole("admin"), getAllUsers);

// ✅ Approve a doctor
router.put("/approve-doctor/:id", authMiddleware, requireRole("admin"), approveDoctor);

// ✅ Change user role (admin only)
router.put("/change-role", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    const validRoles = ["user", "doctor", "admin"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { type: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Don't delete Doctor profile on demotion
    // Optionally, you can mark it as "inactive" instead, if needed

    res.status(200).json({
      success: true,
      message: `User role updated to ${newRole}`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Role change error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// In routes/adminRoutes.js
router.delete("/delete-doctor/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error("Delete Doctor Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete user by ID
router.delete("/delete-user/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const userId = req.params.id;
    const User = require("../models/User");

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({ message: "User deleted successfully ✅" });
  } catch (err) {
    console.error("Delete User Error:", err.message);
    res.status(500).json({ message: "Server error ❌" });
  }
});


module.exports = router;
