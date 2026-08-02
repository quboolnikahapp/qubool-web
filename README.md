# Qubool Nikah App

Qubool Nikah App is a premium, privacy-first frontend experience for a Muslim matrimonial platform that aims to feel modern, trustworthy, and elegant.

## Project overview

This repository contains the frontend experience for Qubool, including:
- a premium landing experience
- responsive authentication screens
- a profile creation flow
- reusable UI components for future Supabase integration

## Tech stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Supabase client SDK (prepared for future integration)
- Netlify deployment configuration

## Local setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the example environment file
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase values to .env.local
4. Start the local app
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Build and deployment

Build locally:
```bash
npm run build
```

Deployment is prepared for Netlify through netlify.toml with:
- build command: npm run build
- publish directory: .next

## Folder structure

```text
src/
  app/
  components/
  features/
  lib/
  hooks/
  types/
  constants/
public/
  images/
docs/
```

## Notes

- No backend APIs or database logic are implemented in this repository yet.
- Authentication and storage are prepared for future Supabase integration.
- The UI is designed to scale cleanly as the product evolves.
