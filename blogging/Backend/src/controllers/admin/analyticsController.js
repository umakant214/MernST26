import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

// @desc    Get analytics stats
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res, next) => {
  try {
    const postsWithViews = await Post.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);
    const totalViews = postsWithViews.length > 0 ? postsWithViews[0].totalViews : 0;

    const uniqueVisitors = await User.countDocuments();
    const avgSession = "4m 32s";
    const bounceRate = "38%";

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTraffic = await Post.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
          views: { $sum: "$views" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: { pageViews: totalViews, uniqueVisitors, avgSession, bounceRate, monthlyTraffic },
    });
  } catch (error) {
    next(error);
  }
};
