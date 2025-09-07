export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar?: string
}

export interface DiscordGuild {
  id: string
  name: string
  icon?: string
  ownerId: string
}

export interface DiscordChannel {
  id: string
  name: string
  type: number
  guildId?: string
}

export interface DiscordMessage {
  id: string
  content: string
  authorId: string
  channelId: string
  timestamp: string
  editedTimestamp?: string
}