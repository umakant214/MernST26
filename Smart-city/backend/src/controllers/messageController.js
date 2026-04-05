const Message = require('../models/messageModel');
const Notification = require('../models/notificationModel');
const Complaint = require('../models/complaintModel');

// @desc    Get messages for a complaint
// @route   GET /api/v1/messages/:complaintId
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ complaintId: req.params.complaintId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/v1/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { complaintId, text } = req.body;
    const message = await Message.create({
      complaintId,
      senderId: req.user.id,
      senderRole: req.user.role === 'citizen' ? 'Citizen' : 'Department',
      text
    });

    // Create notification only if department sends to citizen
    if (req.user.role === 'department') {
        const complaint = await Complaint.findById(complaintId);
        if (complaint) {
            await Notification.create({
                userId: complaint.citizenId,
                userRole: 'Citizen',
                title: 'New Message from Department',
                message: `You have a new message for complaint #${complaint._id.toString().slice(-4)}: "${text.substring(0, 30)}..."`,
                type: 'StatusUpdate'
            });
        }
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, sendMessage };
