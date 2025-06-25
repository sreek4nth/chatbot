import express from 'express';
import { chatbotController, getChatHistory } from '../controllers/chatbotController.js';

const ChatbotRouter = express.Router();

ChatbotRouter.post('/message', chatbotController);
ChatbotRouter.get('/history/:userId', getChatHistory);

export default ChatbotRouter;
