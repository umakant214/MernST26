import express from "express";
import { protect, authorize } from "../../middleware/auth.js";

// Controllers
import { getDashboardStats } from "../../controllers/admin/dashboardController.js";
import { getAllUsers, getUserById, updateUser, banUser, approveUser, restoreUser, deleteUser } from "../../controllers/admin/userController.js";
import { getAllPosts, approvePost, rejectPost, deletePost } from "../../controllers/admin/postController.js";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../../controllers/admin/categoryController.js";
import { getAllComments, approveComment, removeComment, clearFlagged } from "../../controllers/admin/commentController.js";
import { getAllMedia, uploadMedia, deleteMedia } from "../../controllers/admin/mediaController.js";
import { getAnalytics } from "../../controllers/admin/analyticsController.js";

const router = express.Router();

// All admin routes are protected + admin only
router.use(protect, authorize("admin"));

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.put("/users/:id/ban", banUser);
router.put("/users/:id/approve", approveUser);
router.put("/users/:id/restore", restoreUser);
router.delete("/users/:id", deleteUser);

// Posts
router.get("/posts", getAllPosts);
router.put("/posts/:id/approve", approvePost);
router.put("/posts/:id/reject", rejectPost);
router.delete("/posts/:id", deletePost);

// Categories
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Comments
router.get("/comments", getAllComments);
router.put("/comments/:id/approve", approveComment);
router.delete("/comments/flagged", clearFlagged);
router.delete("/comments/:id", removeComment);

// Media
router.get("/media", getAllMedia);
router.post("/media", uploadMedia);
router.delete("/media/:id", deleteMedia);

// Analytics
router.get("/analytics", getAnalytics);

export default router;
