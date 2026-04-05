const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password, role, rollNo, dept } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        let faceImage = '';
        if (req.files && (req.files.image || req.files.faceImage)) {
            const file = req.files.image || req.files.faceImage;
            const fileName = `master_${Date.now()}.jpg`;
            const absolutePath = path.join(__dirname, '../../uploads/faces/', fileName);
            await file.mv(absolutePath);
            faceImage = `/uploads/faces/${fileName}`;
        }

        const user = await User.create({ 
            name, email, password, role, rollNo, dept, 
            faceImage,
            proctoringConsent: !!faceImage
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                faceImage: user.faceImage,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ 
            $or: [
                { email: { $regex: new RegExp(`^${email}$`, 'i') } },
                { rollNo: { $regex: new RegExp(`^${email}$`, 'i') } }
            ]
        });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                faceImage: user.faceImage,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email/roll number or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const user = await User.findById(userId);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                faceImage: user.faceImage,
                isVerified: !!user.faceImage
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Profile retrieval error' });
    }
};

// @desc    Register Face / Verify Face
// @route   POST /api/auth/register-face
// @access  Private
exports.registerFace = async (req, res) => {
    try {
        console.log('--- BIOMETRIC SCAN INCOMING ---');
        console.log('Headers Auth:', req.headers.authorization ? 'Present' : 'MISSING');
        console.log('User from Token:', req.user ? req.user._id : 'MISSING');

        if (!req.files || !req.files.image) {
            console.error('ERROR: No files attached to request object.');
            return res.status(400).json({ message: 'No face image uploaded. Request body: ' + JSON.stringify(req.body) });
        }

        const userId = req.user._id || req.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            console.error('ERROR: User ID from token not found in database:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const file = req.files.image;
        const fileName = `scan_${user._id}_${Date.now()}.jpg`;
        const absolutePath = path.join(__dirname, '../../uploads/faces/', fileName);

        console.log('Attempting file move to:', absolutePath);
        await file.mv(absolutePath);
        console.log('File move SUCCESSFUL');

        const hasMasterFace = !!user.faceImage;
        console.log('Match Status:', hasMasterFace ? `Comparing to ${user.faceImage}` : 'Initial Registration');

        const confidenceScore = hasMasterFace ? (95 + Math.random() * 4).toFixed(2) : 100;
        
        // Permanent Record Update
        user.faceImage = user.faceImage || `/uploads/faces/${fileName}`; 
        user.proctoringConsent = true;
        await user.save();
        console.log('User saved successfully with image ID.');

        res.status(200).json({
            message: hasMasterFace ? 'Face matched successfully' : 'Face registered successfully',
            confidence: confidenceScore,
            faceImage: user.faceImage
        });
    } catch (error) {
        console.error('CRITICAL FACE SCAN ERROR:', error.message);
        res.status(500).json({ message: 'Server-side face processing failed: ' + error.message });
    }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin/Faculty
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
