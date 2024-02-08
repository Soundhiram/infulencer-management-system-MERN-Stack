/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';
import cors from 'cors';
import authRoutes from './src/auth-user/authUser.routes';
import influencerRouter from './src/Influencers/influencer.router';



mongoose.connect(
  'mongodb+srv://jamster:Soundar@jamsterapp.cuxjnde.mongodb.net/influencer-management'
);

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', authRoutes);
app.use('/api/influencers', influencerRouter)



app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server-api!' });
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
