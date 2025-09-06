export type EventType = 
  | 'message'
  | 'member_join'
  | 'member_leave' 
  | 'voice_join'
  | 'voice_leave'
  | 'voice_switch'
  | 'reaction_add';

export interface BaseEvent {
  server_id: string | null;
  event_type: EventType;
  user_id: string | null | undefined;
  channel_id?: string | null;
  created_at: string;
  data: Record<string, any>;
}

export interface MessageEventData {
  message_id: string;
  length: number;
  has_attachment: boolean;
  has_embed: boolean;
}

export interface MemberJoinEventData {
  username: string;
  account_created: Date;
}

export interface MemberLeaveEventData {
  roles: string[];
}

export interface VoiceEventData {
  channel_name?: string;
  streaming?: boolean;
  video?: boolean;
  duration_seconds?: number | null;
  from_channel?: string;
  to_channel?: string;
}

export interface ReactionEventData {
  message_id: string;
  emoji: string | null;
}