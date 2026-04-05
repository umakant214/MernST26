import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import Category from "../../models/Category.js";

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const publishedPosts = await Post.countDocuments({ status: "published" });
    const totalComments = await Comment.countDocuments();
    const pendingApproval = await Post.countDocuments({ status: "pending" });

    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name username");

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name username role createdAt");

    const categories = await Category.find({ status: "active" });
    const totalCatPosts = categories.reduce((sum, c) => sum + c.postCount, 0) || 1;
    const distribution = categories.map((c) => ({
      name: c.name,
      percentage: Math.round((c.postCount / totalCatPosts) * 100),
    }));

    res.status(200).json({
      success: true,
      data: {
        stats: { totalUsers, publishedPosts, totalComments, pendingApproval },
        recentPosts,
        recentUsers,
        contentDistribution: distribution,
      },
    });
  } catch (error) {
    next(error);
  }
};
