# Architecture Notes

Qubool Nikah App is a frontend-only Next.js experience that will connect to Supabase Auth, Storage, and Postgres services through environment variables.

## Frontend shape
- App Router with route groups for auth, profile, and core experience pages
- Shared components for layout, forms, and cards
- Feature folders for future domain expansion without coupling UI to backend logic

## Backend integration
- Supabase Auth handles authentication flows
- Supabase Storage provides media support when enabled
- The frontend remains free from backend implementation details and only consumes the external services
