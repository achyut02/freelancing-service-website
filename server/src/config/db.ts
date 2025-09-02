import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectToDatabase(): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  return mongoose.connect(env.mongoUri);
}

