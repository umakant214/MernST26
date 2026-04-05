const express = require('express');
const router = express.Router();
const { getFaculty, getStudents, updateUser, DashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/faculty', protect, admin, getFaculty);
router.get('/students', protect, admin, getStudents);
router.get('/stats', protect, admin, DashboardStats);
router.put('/users/:id', protect, admin, updateUser);


module.exports = router;
