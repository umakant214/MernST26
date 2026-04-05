const User = require('../models/User');

// @desc    Get all faculty
// @route   GET /api/admin/faculty
// @access  Admin
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await User.find({ role: 'faculty' }).select('-password');
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Admin
exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Admin
exports.updateUser = async (req, res) => {
    const { name, email, role, dept, rollNo } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.role = role || user.role;
            user.dept = dept || user.dept;
            user.rollNo = rollNo || user.rollNo;
            const updated = await user.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
exports.DashboardStats = async (req, res) => {
    try {
        const students = await User.countDocuments({ role: 'student' });
        const faculty = await User.countDocuments({ role: 'faculty' });
        const Exam = require('../models/Exam');
        const exams = await Exam.countDocuments({});
        const liveExams = await Exam.countDocuments({ status: 'live' });
        const Submission = require('../models/Submission');
        const submissions = await Submission.countDocuments({});
        
        res.json({ 
            students, 
            faculty, 
            totalExams: exams, 
            liveExams, 
            totalSubmissions: submissions 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
