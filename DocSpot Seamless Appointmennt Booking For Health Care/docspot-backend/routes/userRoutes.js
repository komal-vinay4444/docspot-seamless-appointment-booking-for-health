router.post("/clear-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.notification = [];
    await user.save();
    res.status(200).json({ message: "Notifications cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing notifications" });
  }
});
