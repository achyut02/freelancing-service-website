import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface IBooking extends Document {
  user: Types.ObjectId;
  provider: Types.ObjectId; // ServiceProvider
  appointmentAt: Date;
  notes?: string;
  status: BookingStatus;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true, index: true },
    appointmentAt: { type: Date, required: true, index: true },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

