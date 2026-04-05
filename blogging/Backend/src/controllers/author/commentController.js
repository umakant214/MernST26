import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";

// @desc    Get comments on author's posts
// @route   GET /api/author/comments
// @access  Private/Author
export const getCommentsOnMyPosts = async (req, res, next) => {
  try {
    const authorPostIds = await Post.find({ author: req.user._id }).distinct("_id");

    const comments = await Comment.find({ post: { $in: authorPostIds } })
      .populate("user", "name username")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: comments.length, data: comments });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to a comment on author's post
// @route   POST /api/author/comments/:id/reply
// @access  Private/Author
export const replyToComment = async (req, res, next) => {
  try {
    const parentComment = await Comment.findById(req.params.id).populate("post");
    if (!parentComment) return res.status(404).json({ success: false, message: "Comment not found" });

    const post = await Post.findById(parentComment.post._id || parentComment.post);
    if (!post || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your post" });
    }

    const reply = await Comment.create({
      user: req.user._id,
      post: parentComment.post._id || parentComment.post,
      text: req.body.text,
      parentComment: parentComment._id,
      status: "approved",
    });

    res.status(201).json({ success: true, message: "Reply posted", data: reply });
  } catch (error) {
    next(error);
  }
};
