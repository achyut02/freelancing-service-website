import { Document, Model } from 'mongoose';
export type UserRole = 'user' | 'provider' | 'admin';
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    avatarUrl?: string;
    role: UserRole;
    isEmailVerified: boolean;
    comparePassword(candidate: string): Promise<boolean>;
}
export declare const User: Model<IUser>;
//# sourceMappingURL=User.d.ts.map