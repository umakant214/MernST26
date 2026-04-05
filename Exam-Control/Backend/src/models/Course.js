const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    dept: { type: String, required: true },
    duration: { type: String, required: true },
    sems: { type: Number, required: true },
    icon: { type: String },
    desc: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
