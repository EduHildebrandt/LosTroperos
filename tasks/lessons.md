# Lessons & Learned Rules

## Build & Environment
- **PowerShell Script Execution Policy**: Always execute `npm.cmd` and `npx.cmd` rather than bare `npm` or `npx` in Windows PowerShell environments to avoid `PSSecurityException`.
- **Folder Names with Spaces / Uppercase**: `create-next-app` does not allow project names with capital letters or spaces. When scaffolding in such directories, scaffold in a temporary lowercase subfolder (e.g. `temp-app`) and move contents to root.

## Architecture & Framework (Next.js App Router + React 19)
- Always verify client vs server components (`'use client'` directive) when utilizing hooks (`useState`, `useEffect`, context).
- Keep state management modular and accessible across components (Cart, Location/Shipping calculation, Filters).
- Ensure styling follows the "Estética Criolla Patagónica Premium" (tonos tierra, cuero suela, verde bosque patagónico, acentos bronce y dorado, glassmorphism sutil).

## Database Migration & Persistence
- **PostgreSQL with Prisma in Next.js**: Ensure Prisma Client is instantiated as a global singleton (`globalThis.prisma`) in `src/lib/prisma.ts` to prevent multiple connection pools during Next.js hot reloads in development.
- **Resilient Fallback**: Always maintain a graceful fallback in data services so that the UI, preview and build tests work out-of-the-box before the user sets up their live PostgreSQL instance.

## Icons & External Assets
- **Lucide React Exports**: The icon `Instagram` is not exported by `lucide-react` in current releases; always implement brand icons (Instagram, WhatsApp, TikTok) with clean accessible SVG inline components or verify module export signatures before referencing.
