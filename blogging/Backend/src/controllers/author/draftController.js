import Post from "../../models/Post.js";

// @desc    Get all drafts by logged-in author
// @route   GET /api/author/drafts
// @access  Private/Author
export const getMyDrafts = async (req, res, next) => {
  try {
    const drafts = await Post.find({ author: req.user._id, status: "draft" })
      .populate("category", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, count: drafts.length, data: drafts });
  } catch (error) {
    next(error);
  }
};

// @desc    Save as draft (update existing draft)
// @route   PUT /api/author/drafts/:id
// @access  Private/Author
export const updateDraft = async (req, res, next) => {
  try {
    const draft = await Post.findOne({ _id: req.params.id, author: req.user._id, status: "draft" });
    if (!draft) return res.status(404).json({ success: false, message: "Draft not found" });

    const { title, content, category, tags } = req.body;
    if (title) draft.title = title;
    if (content) draft.content = content;
    if (category) draft.category = category;
    if (tags) draft.tags = typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags;

    await draft.save();
    res.status(200).json({ success: true, message: "Draft saved", data: draft });
  } catch (error) {
    next(error);
  }
};
