import mongoose from 'mongoose';
import { env } from './env.js';
export async function connectToDatabase() {
    mongoose.set('strictQuery', true);
    return mongoose.connect(env.mongoUri);
}
//# sourceMappingURL=db.js.map