const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        answerText: { type: String }, // For SA/LA/FILL
        selectedOption: { type: Number }, // For MCQ (Index)
        tfAnswer: { type: Boolean }, // For TF
        isCorrect: { type: Boolean }, // For Auto-grading
        marksObtained: { type: Number, default: 0 }
    }],
    totalMarksObtained: { type: Number, default: 0 },
    status: { type: String, enum: ['submitted', 'graded', 'flagged'], default: 'submitted' },
    proctoringFlags: [{
        type: { type: String }, // "Face mismatch", "Tab switch"
        timestamp: { type: Date, default: Date.now },
        score: { type: Number, default: 0 }, // Severity score 0-1
        screenshot: { type: String } // Path to image
    }],
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
