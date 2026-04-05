const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    type: { type: String, enum: ['Final', 'Final Exam', 'Mid-term', 'Mid-term Exam', 'Unit Test', 'Quiz', 'Practical'], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    totalMarks: { type: Number, required: true },
    passMarks: { type: Number, required: true },
    negativeMarking: { type: Number, default: 0 },
    batch: { type: String }, // e.g. "CS-3A"
    proctoring: {
        faceAuth: { type: Boolean, default: true },
        liveMonitoring: { type: Boolean, default: true },
        tabSwitch: { type: Boolean, default: true },
        multiFace: { type: Boolean, default: true }
    },
    status: { type: String, enum: ['draft', 'scheduled', 'live', 'completed'], default: 'draft' },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
