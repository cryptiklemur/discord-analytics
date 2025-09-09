import { createDb } from '@discord-analytics/shared';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Database');

logger.info('Connecting to database');

export const db: ReturnType<typeof createDb> = createDb();

export * from '@discord-analytics/shared';
