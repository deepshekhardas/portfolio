import express from 'express';
import { chatWithAI } from '../controllers/chatController';

const router = express.Router();

router.route('/').post(chatWithAI);

export default router;
