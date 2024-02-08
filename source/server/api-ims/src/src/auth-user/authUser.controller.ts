import { Request, Response } from 'express';
import User from './authUser-models';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) throw new Error('Invalid credentials');

    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, name, mobileNumber } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
      email,
      name,
      mobileNumber,
    });

    // Save the new user to the database
    await newUser.save();

    // Sign a JWT token and send it back in the response
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
