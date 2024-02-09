import express from 'express';
import {
  getAllInfluencers,
  createInfluencer,
  getInfluencerById,
  updateInfluencer,
  deleteInfluencer,
} from './influencer.controller';

const influencerRouter = express.Router();

influencerRouter.get('/', getAllInfluencers);

influencerRouter.post('/create', createInfluencer);

influencerRouter.get('/:id', getInfluencerById);

influencerRouter.put('/:id', updateInfluencer);

influencerRouter.delete('/:id', deleteInfluencer);

export default influencerRouter;
