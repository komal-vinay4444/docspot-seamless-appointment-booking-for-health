// models/User.js

const mongoose = require("mongoose");

// Define notification schema
const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    isDoctor: { type: Boolean, default: false },
    type: { type: String, default: "user" },

    // Updated notification structure
    notification: { type: [notificationSchema], default: [] },
    seenNotification: { type: [notificationSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
