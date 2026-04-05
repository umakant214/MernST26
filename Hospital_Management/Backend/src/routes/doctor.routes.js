import express from 'express';
import {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    getDoctorDashboardStats
} from '../controllers/doctor.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/dashboard-stats', protect, getDoctorDashboardStats);

router.route('/')
    .get(getDoctors)
    .post(protect, admin, addDoctor);

router.route('/:id')
    .get(getDoctorById)
    .put(protect, updateDoctor); // Middleware handles checking if admin or self

export default router;
