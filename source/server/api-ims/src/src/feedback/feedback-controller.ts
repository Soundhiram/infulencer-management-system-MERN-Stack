import { RequestHandler } from 'express';
import Feedback from './feedback-model';
import { error } from 'console';

export const getAllFeedback: RequestHandler = async (req, res) => {
    try{
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch(err){
        res.status(500).json({message:err.message });
    }
};
   

export const createFeedback: RequestHandler = async (req,res) =>{
    const feedback = new Feedback(req.body);
    try{
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};
   