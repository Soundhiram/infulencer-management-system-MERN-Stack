import { Schema, model, Document } from 'mongoose';

interface Influencer extends Document {
  name: string;
  socialMediaHandles: string[];
  followers: number;
  engagementRate: number;
  category: string;
  contactInformation: string;
  notes?: string;
  profileImageUrl?: string;
  archived:boolean;
}

const influencerSchema = new Schema<Influencer>({
  archived:{type: Boolean, default: false},
  name: { type: String },
  socialMediaHandles: [String],
  followers: { type: Number },
  engagementRate: { type: Number },
  category: { type: String },
  contactInformation: { type: String },
  notes: String,
  profileImageUrl: String,
});

export default model<Influencer>('Influencer', influencerSchema);
