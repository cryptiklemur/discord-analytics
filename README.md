# Discord Analytics

A monorepo containing Discord bot and analytics dashboard.

## Structure

```
discord-analytics/
├── packages/
│   ├── bot/       # Discord bot
│   ├── shared/    # Shared types and utilities
│   └── site/      # Next.js analytics dashboard
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `packages/bot/.env.example` to `packages/bot/.env`
   - Add your Discord bot token

3. Development:
```bash
# Run all packages in development
npm run dev

# Run specific package
npm run site:dev  # Dashboard
npm run bot:dev   # Bot
```

## Scripts

- `npm run dev` - Start all packages in development mode
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format all packages
- `npm run typecheck` - Type check all packages