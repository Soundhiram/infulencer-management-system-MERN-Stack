import { RequestHandler } from 'express';
import Influencer from './influencer.model';

export const getAllInfluencers: RequestHandler = async (req, res) => {
  try {
    const influencers = await Influencer.find({ archived: false });
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInfluencer: RequestHandler = async (req, res) => {
  const influencer = new Influencer(req.body);
  try {
    const newInfluencer = await influencer.save();
    res.status(201).json(newInfluencer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInfluencerById: RequestHandler = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInfluencer: RequestHandler = async (req, res) => {
  try {
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInfluencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(updatedInfluencer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteInfluencer: RequestHandler = async (req, res) => {
  try {
    const deletedInfluencer = await Influencer.findByIdAndUpdate(
      req.params.id,
      { archived: true }
    );
    if (!deletedInfluencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json({ message: 'Influencer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
