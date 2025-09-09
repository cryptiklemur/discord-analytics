import { Guild, Events } from 'discord.js';
import type {DatabaseService} from '../services/database.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('GuildHandler');

export class GuildHandler {
  constructor(private readonly databaseService: DatabaseService) {}

  async handleGuildCreate(guild: Guild): Promise<void> {
    logger.info({ guildId: guild.id, guildName: guild.name }, 'Bot added to new server');

    try {
      const serverExists = await this.databaseService.checkServerExists(guild.id);

      if (!serverExists) {
        logger.info({ guildId: guild.id }, 'Creating server record in database');
        await this.databaseService.createServer(
          guild.id,
          guild.name,
          guild.ownerId
        );
      }
    } catch (error) {
      logger.error({ error, guildId: guild.id }, 'Error handling guild create');
    }
  }

  getEventName(): string {
    return Events.GuildCreate;
  }
}
