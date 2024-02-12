import { Schema, model, Document } from 'mongoose';



interface Feedback extends Document {
  fullName: string;
  email: string;
  feedback: string;
  recommended: boolean;
  rating: number;
 
}

const feedbackSchema = new Schema<Feedback>({
    fullName:{type:String},
    email:{type:String},
    feedback:{type:String},
    recommended:{type:Boolean},
    rating:{type:Number}

});

export default model<Feedback>('Feedback', feedbackSchema);
