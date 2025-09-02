import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user', index: true },
    isEmailVerified: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});
UserSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map