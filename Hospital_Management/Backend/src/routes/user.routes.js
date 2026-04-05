import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    uploadProfileImage,
    getAllUsers,
    updateUserRole
} from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile-image', protect, uploadProfileImage);

export default router;
