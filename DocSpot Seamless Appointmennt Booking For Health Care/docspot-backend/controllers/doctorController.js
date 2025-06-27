const Doctor = require("../models/Doctor");
const User = require("../models/User");  // ✅ Import User model

const registerDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" });
    const savedDoctor = await newDoctor.save();

    // 🔔 Notify Admins (UNSEEN notifications)
    const admins = await User.find({ type: "admin" });
    const notification = {
      message: `New doctor application: ${savedDoctor.fullname || "Unknown"}`,
      date: new Date(),
    };

    for (const admin of admins) {
      admin.notification.push(notification);  // ✅ Not seenNotification
      await admin.save();
    }

    res.status(201).json({
      message: "Doctor profile submitted. Awaiting admin approval ✅",
      doctor: savedDoctor,
    });
  } catch (error) {
    console.error("Doctor Registration Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const approveDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status: "approved" },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found ❌" });
    }

    const user = await User.findById(doctor.userId);
    if (user) {
      user.notification.push({  // ✅ Changed from seenNotification
        message: `Your doctor application has been approved 🎉`,
        date: new Date(),
      });
      await user.save();
    }

    res.status(200).json({ message: "Doctor approved ✅", doctor });
  } catch (error) {
    console.error("Admin Approval Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getDoctorProfileByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor profile:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getDoctorProfileByUserId, registerDoctor, approveDoctor };
