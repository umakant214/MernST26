import User from "../../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get user profile
// @route   GET /api/reader/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile info
// @route   PUT /api/reader/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, bio } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;

    if (req.files && req.files.profilePic) {
      const file = req.files.profilePic;
      const fileName = `profile_${req.user._id}_${Date.now()}_${file.name}`;
      const uploadPath = `uploads/profiles/${fileName}`;
      await file.mv(uploadPath);
      user.profilePic = uploadPath;
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, message: "Profile updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/reader/profile/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "New passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
