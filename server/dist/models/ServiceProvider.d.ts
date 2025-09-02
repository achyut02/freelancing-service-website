import { Document, Model, Types } from 'mongoose';
export interface IBusinessHour {
    day: number;
    open: string;
    close: string;
}
export interface IServiceProvider extends Document {
    user: Types.ObjectId;
    businessName: string;
    description?: string;
    categories: string[];
    phone?: string;
    email?: string;
    address?: string;
    location?: {
        type: 'Point';
        coordinates: [number, number];
    };
    priceRange?: {
        min: number;
        max: number;
    };
    ratingAverage: number;
    ratingCount: number;
    photos: string[];
    businessHours: IBusinessHour[];
    isVerified: boolean;
}
export declare const ServiceProvider: Model<IServiceProvider>;
//# sourceMappingURL=ServiceProvider.d.ts.map