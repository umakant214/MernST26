const express = require('express');
const router = express.Router();
const { getSubjects, createSubject, deleteSubject } = require('../controllers/subjectController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getSubjects)
    .post(protect, faculty, createSubject);

router.route('/:id')
    .delete(protect, faculty, deleteSubject);

module.exports = router;
