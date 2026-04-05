import express from "express";
import { protect } from "../../middleware/auth.js";

// Controllers
import { getReaderDashboard } from "../../controllers/reader/dashboardController.js";
import { getBlogPost, toggleLike, toggleBookmark, addComment, toggleFollow } from "../../controllers/reader/blogController.js";
import { browsePosts, getCategories } from "../../controllers/reader/browseController.js";
import { getNotifications, markAllRead, markOneRead } from "../../controllers/reader/notificationController.js";
import { getProfile, updateProfile, updatePassword } from "../../controllers/reader/profileController.js";

const router = express.Router();

// All reader routes are protected
router.use(protect);

// Dashboard
router.get("/dashboard", getReaderDashboard);

// Blog
router.get("/blog/:id", getBlogPost);
router.put("/blog/:id/like", toggleLike);
router.put("/blog/:id/bookmark", toggleBookmark);
router.post("/blog/:id/comment", addComment);
router.put("/blog/follow/:authorId", toggleFollow);

// Browse
router.get("/browse", browsePosts);
router.get("/browse/categories", getCategories);

// Notifications
router.get("/notifications", getNotifications);
router.put("/notifications/read", markAllRead);
router.put("/notifications/:id/read", markOneRead);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/profile/password", updatePassword);

export default router;
