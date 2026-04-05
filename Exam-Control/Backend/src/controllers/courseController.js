const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Admin
exports.createCourse = async (req, res) => {
    const { name, code, dept, duration, sems, icon, desc } = req.body;
    try {
        const exists = await Course.findOne({ code });
        if (exists) return res.status(400).json({ message: 'Course already exists' });

        const course = await Course.create({ name, code, dept, duration, sems, icon, desc });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Admin/Faculty
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
