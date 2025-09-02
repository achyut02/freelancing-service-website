import { Document, Model, Types } from 'mongoose';
export interface IReview extends Document {
    user: Types.ObjectId;
    provider: Types.ObjectId;
    rating: number;
    comment?: string;
}
export declare const Review: Model<IReview>;
//# sourceMappingURL=Review.d.ts.map