const express = require('express');
const router = express.Router();
const { registerCitizen, loginCitizen, updateCitizenPassword } = require('../controllers/authController');
const { getCitizenProfile } = require('../controllers/citizenController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', registerCitizen);
router.post('/login', loginCitizen);
router.post('/update-password', protect, authorize('citizen'), updateCitizenPassword);
router.get('/profile', protect, authorize('citizen'), getCitizenProfile);

module.exports = router;
