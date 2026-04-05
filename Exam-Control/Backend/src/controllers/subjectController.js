const Subject = require('../models/Subject');

// @desc    Get all subjects (optionally by course)
// @route   GET /api/subjects
// @access  Private
exports.getSubjects = async (req, res) => {
    const { courseId } = req.query;
    try {
        const query = courseId ? { courseId } : {};
        const subjects = await Subject.find(query).populate('courseId', 'name code');
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create subject
// @route   POST /api/subjects
// @access  Admin/Faculty
exports.createSubject = async (req, res) => {
    const { name, code, courseId, sem, credits, desc } = req.body;
    try {
        const subject = await Subject.create({ name, code, courseId, sem, credits, desc });
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Admin/Faculty
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        
        await Subject.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subject removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
