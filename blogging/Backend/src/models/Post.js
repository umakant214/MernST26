import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, required: [true, "Content is required"] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [{ type: String, trim: true }],
    featuredImage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "pending", "in-review", "published", "rejected"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "members", "private"],
      default: "public",
    },
    scheduledAt: { type: Date },
    wordCount: { type: Number, default: 0 },
    readTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Auto-calculate wordCount and readTime before save
postSchema.pre("save", function (next) {
  if (this.content) {
    const words = this.content.split(/\s+/).filter(Boolean).length;
    this.wordCount = words;
    this.readTime = Math.ceil(words / 200);
  }
  next();
});

export default mongoose.model("Post", postSchema);
