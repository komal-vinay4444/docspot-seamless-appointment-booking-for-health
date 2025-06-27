// models/Doctor.js

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  specialization: {
    type: String,
  },
  experience: {
    type: Number,
  },
  fees: {
    type: Number,
  },
  timings: {
    type: Array,
  },
  status: {
    type: String,
    default: "pending", // pending, approved, rejected
  },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
