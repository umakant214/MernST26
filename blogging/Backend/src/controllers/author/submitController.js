import Post from "../../models/Post.js";

// @desc    Submit a post for admin review
// @route   PUT /api/author/submit/:id
// @access  Private/Author
export const submitPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.status !== "draft" && post.status !== "rejected") {
      return res.status(400).json({ success: false, message: "Only drafts or rejected posts can be submitted" });
    }

    post.status = "pending";
    await post.save();
    res.status(200).json({ success: true, message: "Post submitted for review", data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all submitted posts by author
// @route   GET /api/author/submit
// @access  Private/Author
export const getSubmittedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
      status: { $in: ["pending", "in-review", "published", "rejected"] },
    })
      .populate("category", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};
