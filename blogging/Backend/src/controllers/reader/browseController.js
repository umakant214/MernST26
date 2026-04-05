import Post from "../../models/Post.js";
import Category from "../../models/Category.js";

// @desc    Browse all published posts with filters
// @route   GET /api/reader/browse
// @access  Private
export const browsePosts = async (req, res, next) => {
  try {
    const { category, sort, search, page = 1, limit = 12 } = req.query;
    let query = { status: "published" };

    if (category && category !== "All Categories") {
      const cat = await Category.findOne({ name: { $regex: category, $options: "i" } });
      if (cat) query.category = cat._id;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "Most Liked") sortOption = { likes: -1 };
    else if (sort === "Most Viewed") sortOption = { views: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate("author", "name username")
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active categories
// @route   GET /api/reader/browse/categories
// @access  Private
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ status: "active" }).select("name slug");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};
