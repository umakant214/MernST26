import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: [true, "Password is required"], minlength: 6 },
    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "pending", "banned"],
      default: "active",
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
