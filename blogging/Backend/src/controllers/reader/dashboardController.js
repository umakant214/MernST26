import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Notification from "../../models/Notification.js";

// @desc    Get reader dashboard
// @route   GET /api/reader/dashboard
// @access  Private/Reader
export const getReaderDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const followingCount = user.following.length;
    const likedPosts = await Post.countDocuments({ likes: userId });
    const newNotifications = await Notification.countDocuments({ user: userId, isRead: false });

    const followedAuthorPosts = await Post.find({
      author: { $in: user.following },
      status: "published",
    })
      .populate("author", "name username")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: {
        stats: { followingCount, likedPosts, newNotifications },
        recentPosts: followedAuthorPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};
