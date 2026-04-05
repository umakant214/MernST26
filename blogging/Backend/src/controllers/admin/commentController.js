import Comment from "../../models/Comment.js";

// @desc    Get all comments (admin moderation)
// @route   GET /api/admin/comments
// @access  Private/Admin
export const getAllComments = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== "All") query.status = status.toLowerCase();

    const comments = await Comment.find(query)
      .populate("user", "name username")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: comments.length, data: comments });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a comment
// @route   PUT /api/admin/comments/:id/approve
// @access  Private/Admin
export const approveComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    comment.status = "approved";
    await comment.save();
    res.status(200).json({ success: true, message: "Comment approved" });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove/delete a comment
// @route   DELETE /api/admin/comments/:id
// @access  Private/Admin
export const removeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    res.status(200).json({ success: true, message: "Comment removed" });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear all flagged comments
// @route   DELETE /api/admin/comments/flagged
// @access  Private/Admin
export const clearFlagged = async (req, res, next) => {
  try {
    const result = await Comment.deleteMany({ status: "flagged" });
    res.status(200).json({ success: true, message: `${result.deletedCount} flagged comments removed` });
  } catch (error) {
    next(error);
  }
};
