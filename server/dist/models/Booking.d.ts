import { Document, Model, Types } from 'mongoose';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export interface IBooking extends Document {
    user: Types.ObjectId;
    provider: Types.ObjectId;
    appointmentAt: Date;
    notes?: string;
    status: BookingStatus;
}
export declare const Booking: Model<IBooking>;
//# sourceMappingURL=Booking.d.ts.map