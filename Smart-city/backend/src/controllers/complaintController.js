const Complaint = require('../models/complaintModel');
const Notification = require('../models/notificationModel');
const path = require('path');
const fs = require('fs');

// @desc    Create new complaint
// @route   POST /api/v1/complaints
// @access  Private (Citizen)
const createComplaint = async (req, res) => {
  try {
    const { category, title, description, location, ward } = req.body;
    let imagePath = '';

    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploadPath = path.join(__dirname, '../../uploads/', `${Date.now()}_${image.name}`);
      
      // Ensure directory exists
      if (!fs.existsSync(path.join(__dirname, '../../uploads/'))) {
        fs.mkdirSync(path.join(__dirname, '../../uploads/'), { recursive: true });
      }

      await image.mv(uploadPath);
      imagePath = `/uploads/${path.basename(uploadPath)}`;
    }

    const complaint = await Complaint.create({
      citizenId: req.user.id,
      category,
      title,
      description,
      location,
      ward,
      image: imagePath
    });

    res.status(201).json(complaint);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Get my complaints
// @route   GET /api/v1/complaints/my
// @access  Private (Citizen)
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizenId: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Get all complaints
// @route   GET /api/v1/complaints
// @access  Private (Admin, Department)
const getAllComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'department') {
      // Logic could filter by department ward/category if needed
    }
    const complaints = await Complaint.find(query).populate('citizenId', 'firstName lastName email mobileNumber').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Update complaint status
// @route   PUT /api/v1/complaints/:id
// @access  Private (Admin, Department)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
      complaint.status = status || complaint.status;
      complaint.resolutionNotes = resolutionNotes || complaint.resolutionNotes;
      
      if (req.user.role === 'department') {
        complaint.departmentAssigned = req.user.id;
      }

      const updatedComplaint = await complaint.save();
      
      // Create notification for citizen
      await Notification.create({
        userId: complaint.citizenId,
        userRole: 'Citizen',
        title: `Complaint Status Updated`,
        message: `Your complaint #${complaint._id.toString().slice(-4)} (${complaint.title}) is now ${status}.`,
        type: 'StatusUpdate'
      });

      res.json(updatedComplaint);
    } else { res.status(404).json({ message: 'Complaint not found' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};
// @desc    Submit feedback
// @route   POST /api/v1/complaints/feedback/:id
// @access  Private (Citizen)
const submitFeedback = async (req, res) => {
  try {
    const { feedbackRating, feedbackComment } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (complaint && complaint.citizenId.toString() === req.user.id) {
      if (complaint.status !== 'Resolved') {
        return res.status(400).json({ message: 'Can only give feedback for resolved complaints' });
      }
      complaint.feedbackRating = feedbackRating;
      complaint.feedbackComment = feedbackComment;
      await complaint.save();
      res.json({ message: 'Feedback submitted successfully' });
    } else {
      res.status(404).json({ message: 'Complaint not found or unauthorized' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus, submitFeedback };
