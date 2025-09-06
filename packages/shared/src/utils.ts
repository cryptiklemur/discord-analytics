export function formatDiscordTimestamp(timestamp: string | number): string {
  const date = new Date(timestamp)
  return date.toISOString()
}

export function parseSnowflake(snowflake: string): Date {
  const timestamp = (BigInt(snowflake) >> 22n) + 1420070400000n
  return new Date(Number(timestamp))
}

export function isValidSnowflake(id: string): boolean {
  try {
    const bigIntId = BigInt(id)
    return bigIntId > 0n
  } catch {
    return false
  }
}