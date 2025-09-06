import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './index.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Migration');

async function runMigrations() {
  try {
    logger.info('Starting database migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    logger.info('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Migration failed');
    process.exit(1);
  }
}

runMigrations();