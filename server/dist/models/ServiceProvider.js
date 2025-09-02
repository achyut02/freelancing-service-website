import mongoose, { Schema, Document, Model, Types } from 'mongoose';
const ServiceProviderSchema = new Schema({
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
            new Schema({
                day: { type: Number, required: true, min: 0, max: 6 },
                open: { type: String, required: true },
                close: { type: String, required: true },
            })
        ],
        default: [],
    },
    isVerified: { type: Boolean, default: false, index: true },
}, { timestamps: true });
export const ServiceProvider = mongoose.models.ServiceProvider || mongoose.model('ServiceProvider', ServiceProviderSchema);
//# sourceMappingURL=ServiceProvider.js.map