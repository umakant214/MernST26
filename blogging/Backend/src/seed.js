import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Category from "./models/Category.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Notification from "./models/Notification.js";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Notification.deleteMany({});
    console.log("🧹 Cleared all existing data");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    // ─── Create Users ─────────────────────────────────
    const admin = await User.create({
      name: "Rahul",
      username: "rahul",
      email: "rahul@blogsphere.com",
      password: hashedPassword,
      role: "admin",
      bio: "Platform administrator",
      status: "active",
    });

    const john = await User.create({
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: hashedPassword,
      role: "author",
      bio: "Full-Stack Developer & Technical Writer",
      status: "active",
    });

    const sara = await User.create({
      name: "Sara Mehta",
      username: "saramehta",
      email: "sara@example.com",
      password: hashedPassword,
      role: "reader",
      bio: "Tech enthusiast and avid blog reader",
      status: "active",
    });

    const ravi = await User.create({
      name: "Ravi Kumar",
      username: "ravikumar",
      email: "ravi@example.com",
      password: hashedPassword,
      role: "author",
      bio: "ML Engineer & Educator",
      status: "pending",
    });

    const anil = await User.create({
      name: "Anil Sharma",
      username: "anilsharma",
      email: "anil@example.com",
      password: hashedPassword,
      role: "reader",
      bio: "Book lover",
      status: "banned",
    });

    const meera = await User.create({
      name: "Meera Sharma",
      username: "meerasharma",
      email: "meera@mail.com",
      password: hashedPassword,
      role: "reader",
      bio: "Tech enthusiast and avid blog reader.",
      status: "active",
    });

    const priya = await User.create({
      name: "Priya N.",
      username: "priyan",
      email: "priya@example.com",
      password: hashedPassword,
      role: "author",
      bio: "Finance blogger",
      status: "active",
    });

    console.log("👥 Users created");

    // ─── Create Categories ────────────────────────────
    const techCat = await Category.create({ name: "Technology", slug: "technology", status: "active", postCount: 342 });
    const lifeCat = await Category.create({ name: "Lifestyle", slug: "lifestyle", status: "active", postCount: 218 });
    const eduCat = await Category.create({ name: "Education", slug: "education", status: "active", postCount: 175 });
    const healthCat = await Category.create({ name: "Health & Fitness", slug: "health", status: "inactive", postCount: 98 });
    const financeCat = await Category.create({ name: "Finance", slug: "finance", status: "active", postCount: 64 });

    console.log("📂 Categories created");

    // ─── Create Posts ─────────────────────────────────
    const post1 = await Post.create({
      title: "Top 10 AI Tools That Changed Development in 2025",
      content:
        "Artificial intelligence has fundamentally transformed how developers write, test, and maintain code in 2025. From intelligent code completion to automated test generation, AI tools are now essential in every developer's toolkit. 1. GitHub Copilot X - AI pair programming at its finest. 2. Tabnine - Smart code completions. 3. ChatGPT Plus - Code review and debugging. 4. Amazon CodeWhisperer - Cloud-native suggestions. 5. Google Gemini Code - Full project understanding. 6. Cursor IDE - AI-first code editor. 7. Replit AI - Instant prototyping. 8. Codeium - Free AI autocomplete. 9. Sourcegraph Cody - Codebase-aware AI. 10. Devin - Autonomous AI engineer.",
      author: john._id,
      category: techCat._id,
      tags: ["AI", "Technology", "2025"],
      status: "published",
      visibility: "public",
      views: 3420,
      likes: [sara._id, meera._id, anil._id],
    });

    const post2 = await Post.create({
      title: "5 Healthy Morning Habits Every Developer Should Follow",
      content:
        "Starting your day right can dramatically improve your productivity and well-being as a developer. Here are 5 habits that successful developers swear by: 1. Wake up early and hydrate. 2. Exercise for at least 20 minutes. 3. Practice meditation or mindfulness. 4. Plan your day with a task list. 5. Avoid checking emails first thing.",
      author: sara._id,
      category: lifeCat._id,
      tags: ["Lifestyle", "Health", "Productivity"],
      status: "in-review",
      visibility: "public",
      views: 0,
    });

    const post3 = await Post.create({
      title: "Basics of Machine Learning Explained Simply",
      content:
        "Machine Learning is a subset of Artificial Intelligence that allows computers to learn from data without being explicitly programmed. This guide covers supervised learning, unsupervised learning, and reinforcement learning with practical examples. We will explore linear regression, decision trees, neural networks, and more.",
      author: ravi._id,
      category: eduCat._id,
      tags: ["ML", "Education", "AI"],
      status: "published",
      visibility: "public",
      views: 5100,
      likes: [john._id, sara._id, meera._id, anil._id],
    });

    const post4 = await Post.create({
      title: "Stock Market Guide 2025",
      content:
        "A comprehensive guide to investing in the stock market in 2025. Topics covered include index funds, ETFs, sector rotation, risk management, and portfolio diversification strategies for beginners and intermediate investors.",
      author: priya._id,
      category: financeCat._id,
      tags: ["Finance", "Investment", "2025"],
      status: "rejected",
      visibility: "public",
      views: 0,
    });

    const post5 = await Post.create({
      title: "Python vs JavaScript in 2025",
      content: "A detailed comparison of Python and JavaScript for modern development...",
      author: john._id,
      category: techCat._id,
      tags: ["Python", "JavaScript", "Comparison"],
      status: "pending",
      visibility: "public",
    });

    const post6 = await Post.create({
      title: "My DevOps Journey",
      content: "Documenting my learning path through DevOps tools and practices including Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.",
      author: john._id,
      category: techCat._id,
      tags: ["DevOps", "Docker", "Kubernetes"],
      status: "draft",
      visibility: "public",
    });

    const post7 = await Post.create({
      title: "Meditation for Devs",
      content: "How meditation can help developers reduce stress, improve focus, and write better code. Practical tips for busy professionals.",
      author: john._id,
      category: lifeCat._id,
      tags: ["Meditation", "Wellness", "Productivity"],
      status: "draft",
      visibility: "public",
    });

    const post8 = await Post.create({
      title: "React vs Vue 2025",
      content: "A comprehensive comparison of React and Vue.js frameworks in 2025. Performance benchmarks, ecosystem, and developer experience.",
      author: john._id,
      category: techCat._id,
      tags: ["React", "Vue", "Frontend"],
      status: "draft",
      visibility: "public",
    });

    const post9 = await Post.create({
      title: "Smart Investing in 2025",
      content: "Learn about smart investment strategies for 2025 including diversification, index funds, and emerging markets.",
      author: priya._id,
      category: financeCat._id,
      tags: ["Finance", "Investment"],
      status: "published",
      visibility: "public",
      views: 2800,
      likes: [sara._id, meera._id, john._id],
    });

    const post10 = await Post.create({
      title: "ChatGPT vs Gemini 2025",
      content: "A head-to-head comparison of ChatGPT and Google Gemini in 2025.",
      author: john._id,
      category: techCat._id,
      tags: ["AI", "ChatGPT", "Gemini"],
      status: "published",
      visibility: "public",
      views: 1200,
    });

    console.log("📝 Posts created");

    // ─── Create Comments ──────────────────────────────
    await Comment.create({
      user: meera._id,
      post: post1._id,
      text: "Great list! GitHub Copilot changed my life.",
      status: "approved",
      likes: [john._id, sara._id],
    });

    await Comment.create({
      user: anil._id,
      post: post1._id,
      text: "Would add Tabnine to this list!",
      status: "approved",
    });

    await Comment.create({
      user: sara._id,
      post: post3._id,
      text: "Loved the examples, please write more!",
      status: "pending",
    });

    await Comment.create({
      user: john._id,
      post: post1._id,
      text: "Great article! Very informative and well-written.",
      status: "approved",
    });

    await Comment.create({
      user: meera._id,
      post: post2._id,
      text: "This is spam content, click here for...",
      status: "flagged",
    });

    console.log("💬 Comments created");

    // ─── Create Notifications ─────────────────────────
    await Notification.create({
      user: meera._id,
      type: "new_post",
      message: 'John Doe published a new post: "ChatGPT vs Gemini"',
      relatedPost: post10._id,
      relatedUser: john._id,
    });

    await Notification.create({
      user: meera._id,
      type: "like",
      message: 'Your comment on "ML Basics" got 12 likes',
      relatedPost: post3._id,
    });

    await Notification.create({
      user: meera._id,
      type: "follow",
      message: "Sara Mehta started following you",
      relatedUser: sara._id,
    });

    await Notification.create({
      user: meera._id,
      type: "category",
      message: "New post added in Technology category",
    });

    await Notification.create({
      user: meera._id,
      type: "reply",
      message: "Anil K. replied to your comment",
      relatedUser: anil._id,
      isRead: true,
    });

    console.log("🔔 Notifications created");

    // ─── Set up follow relationships ──────────────────
    meera.following.push(john._id, sara._id, ravi._id);
    john.followers.push(meera._id);
    sara.followers.push(meera._id);
    ravi.followers.push(meera._id);

    await meera.save();
    await john.save();
    await sara.save();
    await ravi.save();

    console.log("🔗 Follow relationships set up");

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📋 Login Credentials (password: 123456 for all):");
    console.log("   Admin  → admin@blogsphere.com");
    console.log("   Author → john@example.com");
    console.log("   Reader → meera@mail.com\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDB();
