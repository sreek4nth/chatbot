import express from 'express';
import { sendFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/msg', sendFeedback);
export default feedbackRouter;