import mongoose, { Schema, Document, Model, Types } from 'mongoose';
const BookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true, index: true },
    appointmentAt: { type: Date, required: true, index: true },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
}, { timestamps: true });
export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
//# sourceMappingURL=Booking.js.map