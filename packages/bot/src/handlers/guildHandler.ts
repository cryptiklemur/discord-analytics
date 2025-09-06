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
        logger.warn({ guildId: guild.id }, 'Server not found in database - user needs to connect via web app');
      }
    } catch (error) {
      logger.error({ error, guildId: guild.id }, 'Error checking server authorization');
    }
  }

  getEventName(): string {
    return Events.GuildCreate;
  }
}
