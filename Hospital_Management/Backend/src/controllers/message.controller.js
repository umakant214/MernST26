import Message from '../models/message.model.js';

// @desc    Get chat history between two users
// @route   GET /api/v1/messages/:otherUserId
// @access  Private
export const getMessages = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: otherUserId },
                { sender: otherUserId, receiver: myId }
            ]
        }).sort('createdAt');

        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/v1/messages
// @access  Private
export const sendMessage = async (req, res) => {
    try {
        const { receiver, message } = req.body;
        const sender = req.user._id;

        const newMessage = await Message.create({
            sender,
            receiver,
            message
        });

        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
