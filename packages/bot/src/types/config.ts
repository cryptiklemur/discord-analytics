export interface Config {
  discord: {
    botToken: string;
  };
  supabase: {
    url: string;
    serviceKey: string;
  };
  bot: {
    flushIntervalMs: number;
    maxQueueSize: number;
  };
}