const express = require('express');
const router = express.Router();
const { submitExam, getMyResults, getResultById, addProctorFlag, getAllSubmissions, getProctorLogs } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, submitExam)
    .get(protect, getMyResults);

router.get('/all', protect, getAllSubmissions);
router.get('/proctor-logs', protect, getProctorLogs);
router.get('/:id', protect, getResultById);
router.post('/:id/flags', protect, addProctorFlag);


module.exports = router;
