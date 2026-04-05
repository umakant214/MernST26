const express = require('express');
const router = express.Router();
const { getExams, createExam, getExamQuestions, addQuestion, bulkAddQuestions, getExamResults, getExamById, getQuestions, deleteExam, deleteQuestion } = require('../controllers/examController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getExams)
    .post(protect, faculty, createExam);

router.get('/questions/all', protect, getQuestions);
router.delete('/questions/:id', protect, faculty, deleteQuestion);

router.route('/:id')
    .get(protect, getExamById)
    .delete(protect, faculty, deleteExam);

router.route('/:id/questions')


    .get(protect, getExamQuestions)
    .post(protect, faculty, addQuestion);

router.post('/:id/questions/bulk', protect, faculty, bulkAddQuestions);
router.get('/:id/results', protect, faculty, getExamResults);

module.exports = router;
