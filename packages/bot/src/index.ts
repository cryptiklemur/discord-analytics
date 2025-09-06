import { config } from './config/config.js';
import { SupabaseService } from './services/database.js';
import { MemoryEventQueue } from './services/eventQueue.js';
import { AnalyticsBot } from './services/analyticsBot.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('main');

async function main(): Promise<void> {
  try {
    const databaseService = new SupabaseService();
    const eventQueue = new MemoryEventQueue(databaseService, config.bot);
    const bot = new AnalyticsBot(config, databaseService, eventQueue);

    const gracefulShutdown = async () => {
      logger.info('Shutting down gracefully...');
      try {
        await bot.stop();
        process.exit(0);
      } catch (error) {
        logger.error({ error }, 'Error during shutdown');
        process.exit(1);
      }
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    await bot.start();
    logger.info('Bot started successfully');
  } catch (error) {
    logger.fatal({ error }, 'Failed to start bot');
    process.exit(1);
  }
}

main();
