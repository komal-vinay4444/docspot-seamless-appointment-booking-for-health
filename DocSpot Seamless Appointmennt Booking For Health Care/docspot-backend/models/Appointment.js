// models/Appointment.js

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorInfo: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    document: { type: String }, // optional file URL or name
    status: { type: String, default: "pending" }, // pending, confirmed, completed, cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
