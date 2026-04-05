import Post from "../../models/Post.js";

// @desc    Create a new blog post
// @route   POST /api/author/posts
// @access  Private/Author
export const createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags, visibility, scheduledAt } = req.body;

    let featuredImage = "";
    if (req.files && req.files.featuredImage) {
      const file = req.files.featuredImage;
      const fileName = `post_${Date.now()}_${file.name}`;
      const uploadPath = `uploads/posts/${fileName}`;
      await file.mv(uploadPath);
      featuredImage = uploadPath;
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      category: category || undefined,
      tags: tags ? (typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags) : [],
      featuredImage,
      visibility: visibility || "public",
      scheduledAt: scheduledAt || undefined,
      status: "draft",
    });

    res.status(201).json({ success: true, message: "Post created as draft", data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts by logged-in author
// @route   GET /api/author/posts
// @access  Private/Author
export const getMyPosts = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = { author: req.user._id };
    if (status) query.status = status;

    const posts = await Post.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by id
// @route   GET /api/author/posts/:id
// @access  Private/Author
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id })
      .populate("category", "name")
      .populate("author", "name username");

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/author/posts/:id
// @access  Private/Author
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const { title, content, category, tags, visibility, scheduledAt } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (tags) post.tags = typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags;
    if (visibility) post.visibility = visibility;
    if (scheduledAt) post.scheduledAt = scheduledAt;

    if (req.files && req.files.featuredImage) {
      const file = req.files.featuredImage;
      const fileName = `post_${Date.now()}_${file.name}`;
      const uploadPath = `uploads/posts/${fileName}`;
      await file.mv(uploadPath);
      post.featuredImage = uploadPath;
    }

    await post.save();
    res.status(200).json({ success: true, message: "Post updated", data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/author/posts/:id
// @access  Private/Author
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
