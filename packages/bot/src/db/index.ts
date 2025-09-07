import { createDb, getConnectionString } from '@discord-analytics/shared';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Database');

const connectionString = getConnectionString();
logger.info('Connecting to database');

export const db = createDb(connectionString);

export * from '@discord-analytics/shared';