const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    text: { type: String, required: true },
    type: { type: String, enum: ['MCQ', 'TF', 'SA', 'LA', 'FILL'], required: true },
    marks: { type: Number, required: true },
    diff: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    tag: { type: String }, // Topic e.g. "Recursion"

    // Only for MCQ types
    options: [{ type: String }],
    correctOption: { type: Number }, // Index of correct option (0-3)

    // For TF types
    tfAnswer: { type: Boolean },

    // For subjective (SA/LA/FILL)
    modelAnswer: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
