import { GuildMember, Events } from 'discord.js';
import type {EventQueueService} from '../services/eventQueue.js';
import type {MemberJoinEventData, MemberLeaveEventData} from '../types/events.js';

export class MemberHandler {
  constructor(private readonly eventQueue: EventQueueService) {}

  handleMemberJoin(member: GuildMember): void {
    const eventData: MemberJoinEventData = {
      username: member.user.username,
      account_created: member.user.createdAt,
    };

    this.eventQueue.queueEvent({
      server_id: member.guild.id,
      event_type: 'member_join',
      user_id: member.id,
      data: eventData,
    });
  }

  handleMemberLeave(member: GuildMember): void {
    const eventData: MemberLeaveEventData = {
      roles: member.roles?.cache.map(r => r.name) || [],
    };

    this.eventQueue.queueEvent({
      server_id: member.guild.id,
      event_type: 'member_leave',
      user_id: member.id,
      data: eventData,
    });
  }

  getJoinEventName(): string {
    return Events.GuildMemberAdd;
  }

  getLeaveEventName(): string {
    return Events.GuildMemberRemove;
  }
}
