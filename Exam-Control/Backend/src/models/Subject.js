const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    sem: { type: String, required: true },
    credits: { type: Number, required: true },
    desc: { type: String },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Linked Faculty
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', subjectSchema);
