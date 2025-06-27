const User = require("../models/User");

const sendNotification = async (userId, message) => {
  const user = await User.findById(userId);
  if (!user) return;

  user.notification.push({
    message,
    date: new Date(),
  });

  await user.save();
};

module.exports = sendNotification;
