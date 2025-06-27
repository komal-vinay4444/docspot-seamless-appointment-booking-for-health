const Appointment = require("../models/Appointment");
const User = require("../models/User"); // ✅ Required for pushing notifications
const Doctor = require("../models/Doctor"); 

// ✅ Book appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorInfo, userInfo, date, document } = req.body;

    // ✅ Use Doctor._id directly (doctorInfo is Doctor._id)
    const doctor = await Doctor.findById(doctorInfo);
    if (!doctor) return res.status(404).json({ message: "Doctor not found ❌" });

    const newAppointment = new Appointment({
      doctorInfo: doctor._id,
      userInfo,
      date,
      document,
    });

    const saved = await newAppointment.save();

    // 🔔 Notify the doctor (userId of this doctor)
    const doctorUser = await User.findById(doctor.userId);
    if (doctorUser) {
      doctorUser.notification.push({
        type: "appointment-request",
        message: "📅 New appointment request received.",
        onClickPath: "/doctor-dashboard",
        date: new Date(),
      });
      await doctorUser.save();
    }

    res.status(201).json({
      message: "Appointment booked successfully ✅",
      appointment: saved,
    });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// 🔍 View all appointments of a user
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.id;

    const appointments = await Appointment.find({ userInfo: userId })
      .populate("doctorInfo", "fullname specialization fees")
      .sort({ date: 1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("User Appointments Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔍 View all appointments of a doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctorInfo: doctorId })
      .populate("userInfo", "name email phone")
      .populate("doctorInfo", "fullname email specialization")
      .sort({ date: 1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Doctor Appointments Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Update appointment status (confirm, cancel, complete, etc.)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found ❌" });
    }

    // 🔔 Notify the user
    const user = await User.findById(appointment.userInfo);
    if (user) {
      user.notification.push({
        type: "status-update",
        message: `Your appointment has been ${status} ✅`,
        onClickPath: "/appointments",
      });
      await user.save();
    }

    res.status(200).json({
      message: `Appointment status updated to '${status}' ✅`,
      appointment,
    });
  } catch (error) {
    console.error("Update Status Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ❌ Delete appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const deleted = await Appointment.findByIdAndDelete(appointmentId);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found ❌" });
    }

    res.status(200).json({
      message: "Appointment deleted successfully ✅",
      appointment: deleted,
    });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// 🔍 Admin: View all appointments
// GET /appointment
const getAllAppointments = async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied ❌" });
    }

    const appointments = await Appointment.find()
      .populate("doctorInfo", "fullname email specialization")
      .populate("userInfo", "name email phone")
      .sort({ date: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Admin Appointments Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// ✅ Export everything
module.exports = {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAllAppointments,
};
