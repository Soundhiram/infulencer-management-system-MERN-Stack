import express from 'express';
import { createFeedback, getAllFeedback } from './feedback-controller';



const feedbackRouter = express.Router();

feedbackRouter.post('/create', createFeedback);
feedbackRouter.get('/',getAllFeedback);


export default feedbackRouter;