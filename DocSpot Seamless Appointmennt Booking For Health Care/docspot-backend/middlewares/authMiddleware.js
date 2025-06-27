const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 Middleware to protect routes with token
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided ❌" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user object from DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found ❌" });
    }

    req.user = user;           // Full user object for role/type
    req.userId = user._id;     // User ID shortcut (used in notification controller)

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token ❌" });
  }
};

// 🧑‍⚖️ Middleware to allow only specific roles (admin, doctor, user)
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.type !== role) {
      return res.status(403).json({ message: "Forbidden: Access denied 🚫" });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  requireRole,
};
