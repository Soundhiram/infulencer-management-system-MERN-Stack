import { RequestHandler } from 'express';
import Feedback from './feedback-model';


export const createFeedback: RequestHandler = async (req,res) =>{
    const feedback = new Feedback(req.body);
    try{
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};
   