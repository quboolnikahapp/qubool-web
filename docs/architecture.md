# Architecture Notes

Qubool is now organized as a monorepo with the Next.js experience living under apps/web and shared packages under packages/.

## Frontend shape
- App Router with route groups for auth, profile, and core experience pages
- Shared components for layout, forms, and cards
- Feature folders for future domain expansion without coupling UI to backend logic

## Repository layout
- apps/web contains the Next.js application
- packages/ui, packages/types, packages/utils, and packages/config hold shared workspace modules
- supabase/ contains database and edge-function assets for local development

## Backend integration
- Supabase Auth handles authentication flows
- Supabase Storage provides media support when enabled
- The frontend remains free from backend implementation details and only consumes the external services
