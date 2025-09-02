import mongoose, { Schema, Document, Model, Types } from 'mongoose';
const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true, index: true },
    rating: { type: Number, min: 1, max: 5, required: true, index: true },
    comment: { type: String },
}, { timestamps: true });
ReviewSchema.index({ user: 1, provider: 1 }, { unique: true });
export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
//# sourceMappingURL=Review.js.map