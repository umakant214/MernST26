import Post from "../../models/Post.js";
import Category from "../../models/Category.js";

// @desc    Get all posts for admin moderation
// @route   GET /api/admin/posts
// @access  Private/Admin
export const getAllPosts = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    let query = {};

    if (status && status !== "All Status") query.status = status.toLowerCase();
    if (category && category !== "All Categories") {
      const cat = await Category.findOne({ name: { $regex: category, $options: "i" } });
      if (cat) query.category = cat._id;
    }

    const posts = await Post.find(query)
      .populate("author", "name username")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a post
// @route   PUT /api/admin/posts/:id/approve
// @access  Private/Admin
export const approvePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.status = "published";
    await post.save();

    if (post.category) {
      await Category.findByIdAndUpdate(post.category, { $inc: { postCount: 1 } });
    }

    res.status(200).json({ success: true, message: "Post approved and published", data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a post
// @route   PUT /api/admin/posts/:id/reject
// @access  Private/Admin
export const rejectPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.status = "rejected";
    await post.save();
    res.status(200).json({ success: true, message: "Post rejected", data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/admin/posts/:id
// @access  Private/Admin
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
