import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBusinessHour {
  day: number; // 0-6
  open: string; // HH:mm
  close: string; // HH:mm
}

export interface IServiceProvider extends Document {
  user: Types.ObjectId; // reference to User
  businessName: string;
  description?: string;
  categories: string[]; // e.g., healthcare:doctor, home:electrician
  phone?: string;
  email?: string;
  address?: string;
  location?: { type: 'Point'; coordinates: [number, number] }; // [lng, lat]
  priceRange?: { min: number; max: number };
  ratingAverage: number;
  ratingCount: number;
  photos: string[];
  businessHours: IBusinessHour[];
  isVerified: boolean;
}

const ServiceProviderSchema = new Schema<IServiceProvider>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    businessName: { type: String, required: true, index: true },
    description: { type: String },
    categories: { type: [String], required: true, index: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' },
    },
    priceRange: { min: { type: Number }, max: { type: Number } },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    photos: { type: [String], default: [] },
    businessHours: {
      type: [
        new Schema<IBusinessHour>({
          day: { type: Number, required: true, min: 0, max: 6 },
          open: { type: String, required: true },
          close: { type: String, required: true },
        })
      ],
      default: [],
    },
    isVerified: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const ServiceProvider: Model<IServiceProvider> =
  mongoose.models.ServiceProvider || mongoose.model<IServiceProvider>('ServiceProvider', ServiceProviderSchema);

