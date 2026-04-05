const express = require('express');
const router = express.Router();
const { getCourses, createCourse, getCourseById, deleteCourse } = require('../controllers/courseController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCourses)
    .post(protect, faculty, createCourse);

router.route('/:id')
    .get(protect, getCourseById)
    .delete(protect, faculty, deleteCourse);

module.exports = router;
