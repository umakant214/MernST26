const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');
const { getAdminProfile, getAllCitizens, getAllDepartments } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', protect, authorize('admin'), getAdminProfile);
router.get('/citizens', protect, authorize('admin'), getAllCitizens);
router.get('/departments', protect, authorize('admin'), getAllDepartments);

module.exports = router;
