import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

// @desc    Get author dashboard stats
// @route   GET /api/author/dashboard
// @access  Private/Author
export const getAuthorDashboard = async (req, res, next) => {
  try {
    const authorId = req.user._id;

    const publishedPosts = await Post.countDocuments({ author: authorId, status: "published" });
    const totalComments = await Comment.countDocuments({
      post: { $in: await Post.find({ author: authorId }).distinct("_id") },
    });

    const postsWithLikes = await Post.find({ author: authorId });
    const totalLikes = postsWithLikes.reduce((sum, p) => sum + p.likes.length, 0);
    const totalViews = postsWithLikes.reduce((sum, p) => sum + p.views, 0);

    const recentPosts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("category", "name");

    const authorPostIds = await Post.find({ author: authorId }).distinct("_id");
    const recentComments = await Comment.find({ post: { $in: authorPostIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name username")
      .populate("post", "title");

    res.status(200).json({
      success: true,
      data: {
        stats: { publishedPosts, totalComments, totalLikes, totalViews },
        recentPosts,
        recentComments,
      },
    });
  } catch (error) {
    next(error);
  }
};
