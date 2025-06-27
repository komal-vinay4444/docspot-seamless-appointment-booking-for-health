// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    // 🛡️ Basic validation
    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Received data:", req.body);

    // 🔍 Check if user already exists (by email or username)
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create new user
    const newUser = new User({
      name,
      username,  // ✅ Include username here
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Login existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 🎟️ Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
