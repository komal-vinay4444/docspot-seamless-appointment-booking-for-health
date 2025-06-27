// index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load env variables
dotenv.config();

// Create app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);                    // /api/register, /api/login
app.use("/api/doctor", doctorRoutes);           // /api/doctor/register, approve, etc.
app.use("/api/appointment", appointmentRoutes); // /api/appointment/book, etc.
app.use("/api/admin", adminRoutes);             // /api/admin/doctor-list, etc.
app.use("/api/notifications", notificationRoutes); // /api/notifications

// Sample route
app.get("/", (req, res) => {
  res.send("DocSpot backend is live 🚀");
});

// DB connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
