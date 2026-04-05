import "dotenv/config";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Import Routes
import authRoutes from "./routes/auth/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import authorRoutes from "./routes/author/authorRoutes.js";
import readerRoutes from "./routes/reader/readerRoutes.js";

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// ─── Create upload directories ────────────────────────────
const uploadDirs = ["uploads", "uploads/profiles", "uploads/posts", "uploads/media"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ─── Middleware ────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    abortOnLimit: true,
    createParentPath: true,
  })
);

// Static files (serve uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ─── API Routes ───────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/reader", readerRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: " BlogSphere API is running",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      author: "/api/author",
      reader: "/api/reader",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 BlogSphere API Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📂 Upload directory: ./uploads\n`);
});
