const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, registerFace, getUsers, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post('/register-face', protect, registerFace);
router.get('/users', protect, getUsers);
router.delete('/users/:id', protect, deleteUser);


module.exports = router;
