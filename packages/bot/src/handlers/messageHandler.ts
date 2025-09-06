import { Message, Events } from 'discord.js';
import type {EventQueueService} from '../services/eventQueue.js';
import type {MessageEventData} from '../types/events.js';

export class MessageHandler {
  constructor(private readonly eventQueue: EventQueueService) {}

  handleMessage(message: Message): void {
    if (message.author.bot) return;

    const eventData: MessageEventData = {
      message_id: message.id,
      length: message.content.length,
      has_attachment: message.attachments.size > 0,
      has_embed: message.embeds.length > 0,
    };

    this.eventQueue.queueEvent({
      server_id: message.guildId,
      event_type: 'message',
      user_id: message.author.id,
      channel_id: message.channelId,
      data: eventData,
    });
  }

  getEventName(): string {
    return Events.MessageCreate;
  }
}
