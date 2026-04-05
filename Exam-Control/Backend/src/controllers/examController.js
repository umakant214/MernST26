const Exam = require('../models/Exam');
const Question = require('../models/Question');

// @desc    Get exams (optionally filtered by subject or faculty)
// @route   GET /api/exams
// @access  Private
exports.getExams = async (req, res) => {
    const { subjectId, facultyId } = req.query;
    try {
        let query = {};
        if (subjectId) query.subjectId = subjectId;
        if (facultyId) query.facultyId = facultyId;

        const exams = await Exam.find(query).populate('subjectId', 'name code');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create exam
// @route   POST /api/exams
// @access  Faculty
exports.createExam = async (req, res) => {
    const { title, name, subjectId, type, date, time, duration, totalMarks, passMarks, proctoring, negativeMarking, batch, status } = req.body;
    try {
        const exam = await Exam.create({
            name: title || name, // Handle title as name
            subjectId, type, date, time, duration, totalMarks, passMarks, proctoring,
            negativeMarking, batch,
            status: status || 'scheduled',
            facultyId: req.user._id
        });
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get exam by ID
// @route   GET /api/exams/:id
// @access  Private
exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id)
            .populate('subjectId', 'name code')
            .populate('facultyId', 'name');
        if (exam) {
            res.json(exam);
        } else {
            res.status(404).json({ message: 'Exam not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// @desc    Get questions for an exam
// @route   GET /api/exams/:id/questions
// @access  Private
exports.getExamQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ examId: req.params.id });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Add question to exam
// @route   POST /api/exams/:id/questions
// @access  Faculty
exports.addQuestion = async (req, res) => {
    const { text, type, marks, diff, options, correctOption, tfAnswer, modelAnswer, tag } = req.body;
    try {
        const question = await Question.create({
            examId: req.params.id,
            text, type, marks, diff, options, correctOption, tfAnswer, modelAnswer, tag
        });
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Bulk add questions
// @route   POST /api/exams/:id/questions/bulk
// @access  Faculty
exports.bulkAddQuestions = async (req, res) => {
    const { questions } = req.body;
    try {
        const questionsWithExam = questions.map(q => ({ ...q, examId: req.params.id }));
        const created = await Question.insertMany(questionsWithExam);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get results for an exam (Monitoring)
// @route   GET /api/exams/:id/results
// @access  Faculty
exports.getExamResults = async (req, res) => {
    const Submission = require('../models/Submission');
    try {
        const results = await Submission.find({ examId: req.params.id })
            .populate('studentId', 'name email rollNo');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// @desc    Get all questions (global)
// @route   GET /api/exams/questions/all
// @access  Faculty/Admin
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({})
            .populate('examId', 'name')
            .populate('subjectId', 'name');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete exam
// @route   DELETE /api/exams/:id
// @access  Private/Faculty
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (exam) {
            // Also delete associated questions
            await Question.deleteMany({ examId: req.params.id });
            res.json({ message: 'Exam and its questions deleted successfully' });
        } else {
            res.status(404).json({ message: 'Exam not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete question
// @route   DELETE /api/exams/questions/:id
// @access  Faculty
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (question) {
            res.json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
