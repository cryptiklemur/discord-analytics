import { VoiceState, Events } from 'discord.js';
import type {EventQueueService} from '../services/eventQueue.js';
import type {VoiceEventData} from '../types/events.js';

export class VoiceHandler {
  constructor(private readonly eventQueue: EventQueueService) {}

  handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): void {
    if (!oldState.channelId && newState.channelId) {
      this.handleVoiceJoin(newState);
    } else if (oldState.channelId && !newState.channelId) {
      this.handleVoiceLeave(oldState);
    } else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
      this.handleVoiceSwitch(oldState, newState);
    }
  }

  private handleVoiceJoin(state: VoiceState): void {
    const eventData: VoiceEventData = {
      channel_name: state.channel?.name ?? 'n/a',
      streaming: state.streaming ?? false,
      video: state.selfVideo ?? false,
    };

    this.eventQueue.queueEvent({
      server_id: state.guild.id,
      event_type: 'voice_join',
      user_id: state.member?.id,
      channel_id: state.channelId,
      data: eventData,
    });
  }

  private handleVoiceLeave(state: VoiceState): void {
    const eventData: VoiceEventData = {
      duration_seconds: null,
    };

    this.eventQueue.queueEvent({
      server_id: state.guild.id,
      event_type: 'voice_leave',
      user_id: state.member?.id,
      channel_id: state.channelId,
      data: eventData,
    });
  }

  private handleVoiceSwitch(oldState: VoiceState, newState: VoiceState): void {
    const eventData: VoiceEventData = {
      from_channel: oldState.channelId!,
      to_channel: newState.channelId!,
    };

    this.eventQueue.queueEvent({
      server_id: newState.guild.id,
      event_type: 'voice_switch',
      user_id: newState.member?.id,
      channel_id: newState.channelId,
      data: eventData,
    });
  }

  getEventName(): string {
    return Events.VoiceStateUpdate;
  }
}
