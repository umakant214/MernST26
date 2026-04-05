import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileType: {
      type: String,
      enum: ["image", "video", "document", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
