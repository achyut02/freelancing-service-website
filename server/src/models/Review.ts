import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IReview extends Document {
  user: Types.ObjectId;
  provider: Types.ObjectId; // ServiceProvider
  rating: number; // 1-5
  comment?: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true, index: true },
    rating: { type: Number, min: 1, max: 5, required: true, index: true },
    comment: { type: String },
  },
  { timestamps: true }
);

ReviewSchema.index({ user: 1, provider: 1 }, { unique: true });

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

