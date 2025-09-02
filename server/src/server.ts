import { createApp } from './app.js';
import { connectToDatabase } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  try {
    await connectToDatabase();
    const app = createApp();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

bootstrap();

