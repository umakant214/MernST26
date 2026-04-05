const express = require('express');
const router = express.Router();
const { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus, submitFeedback } = require('../controllers/complaintController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('citizen'), createComplaint);
router.get('/my', protect, authorize('citizen'), getMyComplaints);
router.post('/feedback/:id', protect, authorize('citizen'), submitFeedback);
router.get('/', protect, authorize('admin', 'department'), getAllComplaints);
router.put('/:id', protect, authorize('admin', 'department'), updateComplaintStatus);

module.exports = router;
