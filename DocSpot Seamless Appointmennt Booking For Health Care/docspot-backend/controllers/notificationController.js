const User = require("../models/User");

// ✅ Get All Notifications
const getAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // ✅ Corrected

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "Notifications fetched ✅",
      notification: user.notification,
      seenNotification: user.seenNotification,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Mark All Notifications As Seen
const markAllAsSeen = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // ✅ Corrected

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    user.seenNotification.push(...user.notification);
    user.notification = [];
    await user.save();

    res.status(200).json({ message: "All marked as seen ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Clear All Notifications
const deleteAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // ✅ Corrected

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    user.notification = [];
    user.seenNotification = [];
    await user.save();

    res.status(200).json({ message: "All notifications cleared ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  markAllAsSeen,
  deleteAllNotifications,
};
