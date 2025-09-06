import {Client, GatewayIntentBits, Events} from 'discord.js';
import type {Config} from '../types/config.js';
import type {DatabaseService} from './database.js';
import type {EventQueueService} from './eventQueue.js';
import {MessageHandler} from '../handlers/messageHandler.js';
import {MemberHandler} from '../handlers/memberHandler.js';
import {VoiceHandler} from '../handlers/voiceHandler.js';
import {ReactionHandler} from '../handlers/reactionHandler.js';
import {GuildHandler} from '../handlers/guildHandler.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('AnalyticsBot');

export class AnalyticsBot {
	private readonly client: Client;
	private readonly eventQueue: EventQueueService;
	private readonly messageHandler: MessageHandler;
	private readonly memberHandler: MemberHandler;
	private readonly voiceHandler: VoiceHandler;
	private readonly reactionHandler: ReactionHandler;
	private readonly guildHandler: GuildHandler;

	constructor(
		private readonly config: Config,
		private readonly databaseService: DatabaseService,
		eventQueue: EventQueueService
	) {
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessageReactions,
			]
		});

		this.eventQueue = eventQueue;
		this.messageHandler = new MessageHandler(this.eventQueue);
		this.memberHandler = new MemberHandler(this.eventQueue);
		this.voiceHandler = new VoiceHandler(this.eventQueue);
		this.reactionHandler = new ReactionHandler(this.eventQueue);
		this.guildHandler = new GuildHandler(this.databaseService);
		this.setupEventHandlers();
	}

	private setupEventHandlers(): void {
		this.client.once(Events.ClientReady, () => {
			logger.info({ serverCount: this.client.guilds.cache.size }, 'Analytics bot online');
		});

		this.client.on(this.messageHandler.getEventName(),
			(message) => this.messageHandler.handleMessage(message));

		this.client.on(this.memberHandler.getJoinEventName(),
			(member) => this.memberHandler.handleMemberJoin(member));

		this.client.on(this.memberHandler.getLeaveEventName(),
			(member) => this.memberHandler.handleMemberLeave(member));

		this.client.on(this.voiceHandler.getEventName(),
			(oldState, newState) => this.voiceHandler.handleVoiceStateUpdate(oldState, newState));

		this.client.on(this.reactionHandler.getEventName(),
			(reaction, user) => this.reactionHandler.handleReactionAdd(reaction, user));

		this.client.on(this.guildHandler.getEventName(),
			(guild) => this.guildHandler.handleGuildCreate(guild));
	}

	async start(): Promise<void> {
		this.eventQueue.start();
		await this.client.login(this.config.discord.botToken);
	}

	async stop(): Promise<void> {
		await this.eventQueue.stop();
		this.client.destroy();
	}
}
