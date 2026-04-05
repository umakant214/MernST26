import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import path from 'path';

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upload profile image
// @route   PUT /api/v1/users/profile-image
// @access  Private
export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const file = req.files.image;

        // Make sure the image is a photo
        if (!file.mimetype.startsWith('image')) {
            return res.status(400).json({ success: false, message: 'Please upload an image file' });
        }

        // Create custom filename
        file.name = `photo_${req.user._id}${path.parse(file.name).ext}`;

        // Path where file is uploaded
        const uploadPath = path.join(process.cwd(), 'uploads', file.name);

        file.mv(uploadPath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Problem with file upload' });
            }

            // Update user's profile image in database
            await User.findByIdAndUpdate(req.user._id, { profileImage: `/uploads/${file.name}` });

            res.json({
                success: true,
                message: 'Profile image uploaded successfully',
                data: `/uploads/${file.name}`
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/v1/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.role = req.body.role || user.role;
        await user.save();

        res.json({ success: true, data: user, message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
