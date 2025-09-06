import { MessageReaction, User, Events } from 'discord.js';
import type {EventQueueService} from '../services/eventQueue.js';
import type {ReactionEventData} from '../types/events.js';

export class ReactionHandler {
  constructor(private readonly eventQueue: EventQueueService) {}

  handleReactionAdd(reaction: MessageReaction, user: User): void {
    if (user.bot) return;

    const eventData: ReactionEventData = {
      message_id: reaction.message.id,
      emoji: reaction.emoji.name,
    };

    this.eventQueue.queueEvent({
      server_id: reaction.message.guildId,
      event_type: 'reaction_add',
      user_id: user.id,
      channel_id: reaction.message.channelId,
      data: eventData,
    });
  }

  getEventName(): string {
    return Events.MessageReactionAdd;
  }
}
