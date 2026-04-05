const Submission = require('../models/Submission');
const Exam = require('../models/Exam');
const Question = require('../models/Question');

// @desc    Submit an exam
// @route   POST /api/submissions
// @access  Student/Private
exports.submitExam = async (req, res) => {
    const { examId, answers, proctoringFlags } = req.body;
    try {
        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        // Auto-grading flow for MCQ/TF
        const gradedAnswers = await Promise.all(answers.map(async (ans) => {
            const question = await Question.findById(ans.questionId);
            if (!question) return { ...ans, isCorrect: false, marksObtained: 0 };

            let isCorrect = false;
            let marksObtained = 0;

            if (question.type === 'MCQ' && ans.selectedOption === question.correctOption) {
                isCorrect = true;
                marksObtained = question.marks;
            } else if (question.type === 'TF' && ans.tfAnswer === question.tfAnswer) {
                isCorrect = true;
                marksObtained = question.marks;
            }

            return {
                ...ans,
                isCorrect,
                marksObtained
            };
        }));

        // Calculate total after all questions are processed (safer)
        const totalMarksObtained = gradedAnswers.reduce((sum, current) => sum + (current.marksObtained || 0), 0);

        const submission = await Submission.create({
            studentId: req.user._id,
            examId,
            answers: gradedAnswers,
            totalMarksObtained,
            proctoringFlags: proctoringFlags || []
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error('Submission Error:', error.message);
        res.status(500).json({ message: 'Server error during submission', error: error.message });
    }
};

// @desc    Get student results
// @route   GET /api/submissions/my
// @access  Student/Private
exports.getMyResults = async (req, res) => {
    try {
        const results = await Submission.find({ studentId: req.user._id })
            .populate({
                path: 'examId',
                select: 'name type totalMarks passMarks date',
                populate: { path: 'subjectId', select: 'name code' }
            })
            .sort('-submittedAt');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get result by ID
// @route   GET /api/submissions/:id
// @access  Private
exports.getResultById = async (req, res) => {
    try {
        const result = await Submission.findById(req.params.id)
            .populate('examId', 'name type totalMarks date proctoring')
            .populate('answers.questionId', 'text type marks options correctOption tfAnswer');
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Add flag and upload screenshot mid-exam
// @route   POST /api/submissions/:id/flags
// @access  Student/Private
exports.addProctorFlag = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });

        const { type, score } = req.body;
        let screenshotPath = '';

        if (req.files && req.files.screenshot) {
            const file = req.files.screenshot;
            const fileName = `flag_${submission._id}_${Date.now()}.jpg`;
            await file.mv(`./uploads/flags/${fileName}`);
            screenshotPath = `/uploads/flags/${fileName}`;
        }

        submission.proctoringFlags.push({ type, score, screenshot: screenshotPath });
        await submission.save();

        res.json({ message: 'Flag added', submission });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all submissions (for admin/faculty)
// @route   GET /api/submissions/all
// @access  Private/Faculty/Admin
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({})
            .populate('studentId', 'name email rollNo dept')
            .populate({
                path: 'examId',
                select: 'name type totalMarks passMarks date batch status',
                populate: { path: 'subjectId', select: 'name code' }
            })
            .sort('-submittedAt');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all proctoring logs (flat list of all flags across submissions)
// @route   GET /api/submissions/proctor-logs
// @access  Private/Admin
exports.getProctorLogs = async (req, res) => {
    try {
        const submissions = await Submission.find({ 'proctoringFlags.0': { $exists: true } })
            .populate('studentId', 'name email rollNo dept')
            .populate({
                path: 'examId',
                select: 'name type totalMarks date batch status',
                populate: { path: 'subjectId', select: 'name code' }
            })
            .sort('-submittedAt');

        // Flatten flags into a single array with context
        const logs = [];
        submissions.forEach(sub => {
            sub.proctoringFlags.forEach(flag => {
                logs.push({
                    _id: flag._id,
                    submissionId: sub._id,
                    student: sub.studentId,
                    exam: sub.examId,
                    submissionStatus: sub.status,
                    flagType: flag.type || 'Unknown',
                    timestamp: flag.timestamp,
                    score: flag.score || 0,
                    screenshot: flag.screenshot || ''
                });
            });
        });

        // Sort by most recent
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Also return summary stats
        const totalFlags = logs.length;
        const criticalFlags = logs.filter(l => l.score >= 0.8).length;
        const warningFlags = logs.filter(l => l.score >= 0.5 && l.score < 0.8).length;
        const lowFlags = logs.filter(l => l.score < 0.5).length;
        const uniqueStudents = [...new Set(logs.map(l => l.student?._id?.toString()))].length;

        res.json({
            stats: { totalFlags, criticalFlags, warningFlags, lowFlags, uniqueStudents },
            logs
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

