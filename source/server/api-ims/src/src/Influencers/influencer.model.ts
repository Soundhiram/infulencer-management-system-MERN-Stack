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
}

const influencerSchema = new Schema<Influencer>({
  name: { type: String, required: true },
  socialMediaHandles: [String],
  followers: { type: Number, required: true },
  engagementRate: { type: Number, required: true },
  category: { type: String, required: true },
  contactInformation: { type: String, required: true },
  notes: String,
  profileImageUrl: String,
});

export default model<Influencer>('Influencer', influencerSchema);
