import express from "express";
import { protect, authorize } from "../../middleware/auth.js";

// Controllers
import { getAuthorDashboard } from "../../controllers/author/dashboardController.js";
import { createPost, getMyPosts, getPostById, updatePost, deletePost } from "../../controllers/author/postController.js";
import { getMyDrafts, updateDraft } from "../../controllers/author/draftController.js";
import { submitPost, getSubmittedPosts } from "../../controllers/author/submitController.js";
import { getCommentsOnMyPosts, replyToComment } from "../../controllers/author/commentController.js";
import { getMyMedia, uploadMedia, deleteMedia } from "../../controllers/author/mediaController.js";

const router = express.Router();

// All author routes are protected + author only
router.use(protect, authorize("author"));

// Dashboard
router.get("/dashboard", getAuthorDashboard);

// Posts
router.get("/posts", getMyPosts);
router.post("/posts", createPost);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// Drafts
router.get("/drafts", getMyDrafts);
router.put("/drafts/:id", updateDraft);

// Submit for review
router.get("/submit", getSubmittedPosts);
router.put("/submit/:id", submitPost);

// Comments
router.get("/comments", getCommentsOnMyPosts);
router.post("/comments/:id/reply", replyToComment);

// Media
router.get("/media", getMyMedia);
router.post("/media", uploadMedia);
router.delete("/media/:id", deleteMedia);

export default router;
