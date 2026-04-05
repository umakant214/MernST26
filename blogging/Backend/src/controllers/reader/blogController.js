import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

// @desc    Get single blog post
// @route   GET /api/reader/blog/:id
// @access  Private
export const getBlogPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name username bio profilePic followers")
      .populate("category", "name");

    if (!post || post.status !== "published") {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.views += 1;
    await post.save();

    const comments = await Comment.find({ post: post._id, status: "approved" })
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    const relatedPosts = await Post.find({
      category: post.category,
      _id: { $ne: post._id },
      status: "published",
    })
      .limit(3)
      .select("title readTime");

    res.status(200).json({ success: true, data: { post, comments, relatedPosts } });
  } catch (error) {
    next(error);
  }
};

// @desc    Like / Unlike a post
// @route   PUT /api/reader/blog/:id/like
// @access  Private
export const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const userId = req.user._id;
    const index = post.likes.indexOf(userId);

    if (index === -1) post.likes.push(userId);
    else post.likes.splice(index, 1);

    await post.save();
    res.status(200).json({
      success: true,
      message: index === -1 ? "Post liked" : "Post unliked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bookmark / Unbookmark a post
// @route   PUT /api/reader/blog/:id/bookmark
// @access  Private
export const toggleBookmark = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const userId = req.user._id;
    const index = post.bookmarks.indexOf(userId);

    if (index === -1) post.bookmarks.push(userId);
    else post.bookmarks.splice(index, 1);

    await post.save();
    res.status(200).json({
      success: true,
      message: index === -1 ? "Post bookmarked" : "Bookmark removed",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Post a comment on a blog
// @route   POST /api/reader/blog/:id/comment
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.status !== "published") {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.create({
      user: req.user._id,
      post: post._id,
      text: req.body.text,
      parentComment: req.body.parentComment || null,
    });

    const populatedComment = await Comment.findById(comment._id).populate("user", "name username");
    res.status(201).json({ success: true, message: "Comment posted", data: populatedComment });
  } catch (error) {
    next(error);
  }
};

// @desc    Follow / Unfollow an author
// @route   PUT /api/reader/blog/follow/:authorId
// @access  Private
export const toggleFollow = async (req, res, next) => {
  try {
    const authorId = req.params.authorId;
    const userId = req.user._id;

    if (authorId === userId.toString()) {
      return res.status(400).json({ success: false, message: "Cannot follow yourself" });
    }

    const author = await User.findById(authorId);
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });

    const user = await User.findById(userId);
    const isFollowing = user.following.includes(authorId);

    if (isFollowing) {
      user.following.pull(authorId);
      author.followers.pull(userId);
    } else {
      user.following.push(authorId);
      author.followers.push(userId);
    }

    await user.save();
    await author.save();

    res.status(200).json({ success: true, message: isFollowing ? "Unfollowed" : "Following" });
  } catch (error) {
    next(error);
  }
};
