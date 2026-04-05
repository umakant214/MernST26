import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', sendMessage);
router.get('/:otherUserId', getMessages);

export default router;
