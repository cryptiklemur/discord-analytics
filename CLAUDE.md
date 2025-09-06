# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start all packages in development mode (bot + site)
- `npm run site:dev` - Start only the Next.js dashboard at http://localhost:3000
- `npm run bot:dev` - Start only the Discord bot with hot reload
- `npm run build` - Build all packages for production
- `npm run start` - Start production servers

### Code Quality
- `npm run lint` - Run Biome linter across all packages
- `npm run format` - Auto-format all code using Biome
- `npm run typecheck` - Type check all packages with TypeScript
- `npm run clean` - Clean all build artifacts

### Package-Specific Commands
- **Bot**: `npm run dev -w @discord-analytics/bot` - Run bot with tsx watch
- **Site**: `npm run dev -w @discord-analytics/site` - Run Next.js with Turbopack
- **Shared**: `npm run build -w @discord-analytics/shared` - Build shared library

## Architecture

This is a Discord Analytics monorepo with three npm workspace packages that collect and visualize Discord server data.

### Monorepo Structure
- **`@discord-analytics/shared`** - Common Discord types and utilities, built as dual CJS/ESM package
- **`@discord-analytics/bot`** - Discord.js bot for data collection with PostgreSQL storage
- **`@discord-analytics/site`** - Next.js 15 analytics dashboard with Discord OAuth

### Key Technologies

**Bot Package:**
- **Discord.js v14** with comprehensive event handling
- **Drizzle ORM** with PostgreSQL for data persistence
- **Supabase** for database hosting and auth integration
- **Pino** structured logging with pretty printing in development
- Event queue system for reliable data processing

**Site Package:**
- **Next.js 15** with App Router and React Server Components
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS v4** for styling with dark mode support
- **Supabase Auth** with Discord OAuth integration
- **Recharts** for analytics visualization

**Shared Package:**
- Discord entity types (`User`, `Guild`, `Channel`, `Message`)
- Utility functions for Discord snowflake parsing and timestamp formatting
- Built with `tsup` for optimal tree-shaking

### Database Schema
The bot tracks Discord events in PostgreSQL tables:
- `servers` - Guild information and settings
- `discord_events` - All tracked events with JSON metadata
- `users` - Discord user profiles and activity
- `channels` - Channel metadata per server

Event types include: messages, member joins/leaves, voice activity, reactions, and server changes.

### Authentication Flow
- Discord OAuth via Supabase Auth with `identify` and `guilds` scopes
- Server-side session management with middleware-based route protection
- Shared Supabase client configurations between bot and site

### Development Setup
1. Install dependencies: `npm install`
2. Configure environment variables:
   - `packages/bot/.env` - Discord bot token, Supabase credentials
   - `packages/site/site/.env.local` - Supabase public keys, Discord OAuth config
3. Set up Supabase project with Discord OAuth provider
4. Run database migrations (if bot package has migration commands)
5. Start development: `npm run dev`

### Code Standards
- **Biome** for consistent linting and formatting across packages
- **TypeScript** with strict mode and project references for proper monorepo type checking
- Package-specific Biome configs (bot uses single quotes, site uses double quotes)
- Path aliases: `@/` maps to package root in bot and site packages

## Project Overview

**Discord Analytics MicroSaaS** - A paid B2B/B2C analytics platform for Discord servers at discordanalytics.com. Rebuilding a previously free product with monetization from day 1, leveraging DiscordServers.com for distribution.

### Business Goals
- Reach $2k MRR within 3-6 months
- Target both B2C (gaming/social communities) and B2B (businesses using Discord)
- Build MVP in 2-3 weeks using NextJS and Discord API
- Fully async product with automated onboarding

### Pricing Strategy

**Personal ($9.99/month)** - For friends & hobby communities
- 1 server (up to 1,000 members), 7-day retention, 3-month trends
- Basic dashboard (5 core metrics), "Powered by DiscordAnalytics" watermark

**Starter ($29.99/month)** - For growing communities
- 1 server (unlimited members), 30-day retention, 6-month trends
- Full dashboard (15+ metrics), weekly email reports, CSV exports

**Growth ($79.99/month)** - For serious community builders
- 3 servers, 90-day retention, 18-month trends
- Daily reports, engagement scoring, cohort analysis, API access (100 calls/day)

**Professional ($149.99/month)** - For businesses & agencies
- 10 servers, 180-day retention, 36-month trends
- White-label reports, unlimited API access, custom webhooks

### Core Metrics by Tier

**Personal Tier (5 core metrics):**
- Member growth over time
- Daily active members
- Peak activity times (heatmap)
- Top channels by activity
- Member retention rate

**Paid Tiers (Advanced analytics):**
- Voice vs text activity ratio, member engagement scores
- Role distribution, channel progression patterns
- Cohort retention analysis, message sentiment trends
- Member lifecycle stages, response time analytics

### Technical Architecture

**Dual-Database Strategy:**
- **Supabase**: User accounts, server configs, billing, report settings, API keys
- **Time-Series DB**: Discord events, activity data, aggregated metrics
- **Options**: ClickHouse Cloud, TimescaleDB, Tinybird, or InfluxDB

**Core Stack:**
- Frontend: NextJS with TypeScript
- Authentication: Discord OAuth (via Supabase Auth)
- Payments: Stripe, Email: Resend/SendGrid
- Analytics collector: Discord bot (discord.js)
- Deployment: Vercel, Queue/Workers: Inngest or Trigger.dev

### Development Roadmap

**Week 1:** Discord OAuth, bot invite flow, data collection, basic dashboard, Stripe integration
**Week 2:** Email reports, CSV exports, advanced metrics, dashboard polish, onboarding
**Week 3:** Customer acquisition, API docs, white-label features, performance optimization

### Business Strategy

**Customer Acquisition:**
- Feature on DiscordServers.com (owned distribution channel)
- Direct outreach to large server owners
- "Powered by" watermark on Personal tier
- Content marketing and bot developer partnerships

**Competitive Advantages:**
- Own DiscordServers.com (distribution) and discordanalytics.com (domain)
- Previous experience building this product
- Free advertising and direct access to thousands of server owners

**Design Principles:**
- Professional but not enterprise-boring
- Beautiful visualizations people want to share
- Mobile-responsive, dark mode by default
- Screenshots should look good on Twitter

### Development Guidelines

When working on this project:
- Focus on simple, shippable features with monetization from day 1
- Suggest visual/beautiful implementations over tables
- Keep technical stack simple but scalable
- Consider 10-20 hours/week development time constraint
- Assume dual-database architecture (Supabase + time-series DB)
- Consider data pipeline and aggregation strategies for efficient queries
- Prioritize actionable insights over vanity metrics
