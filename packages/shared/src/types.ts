export interface User {
  id: string
  username: string
  discriminator: string
  avatar?: string
}

export interface Guild {
  id: string
  name: string
  icon?: string
  ownerId: string
}

export interface Channel {
  id: string
  name: string
  type: number
  guildId?: string
}

export interface Message {
  id: string
  content: string
  authorId: string
  channelId: string
  timestamp: string
  editedTimestamp?: string
}