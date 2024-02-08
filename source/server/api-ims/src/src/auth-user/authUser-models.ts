import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  password: string;
  email: string;
  name: string;
  mobileNumber: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
