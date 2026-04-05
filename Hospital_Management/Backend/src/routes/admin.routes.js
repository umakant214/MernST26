import express from 'express';
import { getDashboardStats } from '../controllers/admin.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/dashboard-stats', protect, admin, getDashboardStats);

export default router;
