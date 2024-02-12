import express from 'express';
import { createFeedback } from './feedback-controller';



const feedbackRouter = express.Router();

feedbackRouter.post('/create', createFeedback);

export default feedbackRouter;