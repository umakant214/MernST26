const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderRole: { type: String, enum: ['Citizen', 'Department'], required: true },
  text: { type: String, required: true }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
