# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server with Turbopack at http://localhost:3000
- `npm run build` - Create an optimized production build with Turbopack
- `npm run start` - Start the production server

### Code Quality
- `npm run lint` - Run Biome linter to check code quality
- `npm run format` - Auto-format code using Biome
- `npx tsc --noEmit` - Run TypeScript type checking without emitting files

## Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS.

### Key Technologies
- **Next.js 15.5.2** with App Router and Turbopack
- **React 19.1.0** with Server Components
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **Biome** for linting and formatting (replaces ESLint/Prettier)

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
- `public/` - Static assets served directly
- `biome.json` - Biome configuration for linting/formatting (2-space indentation, React/Next.js rules)
- `tsconfig.json` - TypeScript config with `@/*` path alias for root imports

### Development Guidelines
- Components use TypeScript with strict typing
- Path imports use `@/` alias (maps to project root)
- Biome enforces consistent code style (2 spaces, organized imports)