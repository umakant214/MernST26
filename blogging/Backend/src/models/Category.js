import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"], trim: true, unique: true },
    slug: { type: String, required: [true, "Slug is required"], trim: true, unique: true, lowercase: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    postCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
