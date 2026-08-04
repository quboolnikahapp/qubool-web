# Production deployment

## Prerequisites

Install Docker, the current Supabase CLI, and pnpm. Copy [`.env.example`](../.env.example) to an untracked `.env` for local development. It contains placeholders only: values prefixed `NEXT_PUBLIC_` are browser-visible; every other value is secret or CI-only and must not be sent to the browser.

## Create and link the project

1. Create a hosted project in the intended organization and region through the Supabase Dashboard. Enable point-in-time recovery, backups, and production log retention for the selected plan.
2. Run `supabase login`, then `supabase link --project-ref <PROJECT_REF>` from this repository.
3. Confirm the linked ref with `supabase status` and never link a production project from an unreviewed branch.
4. Before the first push, run `supabase db reset` locally. For an empty hosted project, deploy with `supabase db push`. For a project that already has schema changes, first capture them using `supabase db pull` and resolve migration history before pushing.

Storage bucket declarations are in `supabase/config.toml`. After linking, run `supabase seed buckets --linked` to create/synchronize the three bucket definitions. Database Storage object policies are installed by the database migrations.

## Auth configuration in the Dashboard

In **Authentication → URL Configuration**, set the production Site URL (for example `https://app.example.com`) and an explicit allow-list including `https://app.example.com/auth/callback`. Do not leave localhost URLs in the production allow-list. Enable email confirmations, secure password change, and your SMTP provider in **Authentication → SMTP**; production mail must not rely on the default service.

In **Authentication → Providers → Google**, enable Google and set the OAuth client ID/secret. In Google Cloud Console, create a Web application and add `https://<PROJECT_REF>.supabase.co/auth/v1/callback` as the Authorized redirect URI. Configure the production app URL under Supabase Auth URL Configuration, not in Google’s callback field.

In **Authentication → Providers → Apple**, enable Apple with the Services ID/client secret. Configure the same `https://<PROJECT_REF>.supabase.co/auth/v1/callback` callback in Apple Developer, keep the Apple key/certificate rotation date in the operations calendar, and rotate before expiry.

Email/password, verified signup, password recovery, and magic-link/OTP support are configured locally. Provider credentials in `config.toml` are for local development; hosted Auth provider settings are controlled in the Dashboard.

## Edge Functions and secrets

Create a secure local `supabase/functions/.env` using the secret section of `.env.example`, then set hosted secrets without placing them in git:

```sh
supabase secrets set --env-file supabase/functions/.env
supabase functions deploy send-email send-notification image-processing profile-verification moderation webhooks
```

Set `ALLOWED_ORIGINS` to a comma-separated list of exact HTTPS origins, `EMAIL_FROM` to a verified Resend sender, and the Stripe values to production restricted keys. `SUPABASE_SERVICE_ROLE_KEY` is server-only. The `webhooks` function is deliberately deployed without Supabase JWT verification because it validates Stripe’s signed request; all other functions require JWT verification.

Register the Stripe webhook endpoint `https://<PROJECT_REF>.supabase.co/functions/v1/webhooks` for subscription events and store its signing secret in `STRIPE_WEBHOOK_SECRET`.

## Pre-release checklist

- [ ] `supabase db reset` passes locally and CI’s Supabase job is green.
- [ ] `supabase db push --dry-run` is reviewed, then `supabase db push` completes against the intended project.
- [ ] `supabase seed buckets --linked` has created `profile-images`, `verification-documents`, and `chat-media`; confirm the public/private settings and Storage policies in Dashboard.
- [ ] Hosted Auth URLs, SMTP, Google, and Apple are configured and tested using a real production-domain callback.
- [ ] All Function secrets are set; no `NEXT_PUBLIC_` variable contains a secret/service role key.
- [ ] Security and Performance Advisors are reviewed after migration deployment; monitor Auth, Database, Storage, Realtime, and Function logs.
- [ ] Backups/PITR, alerting, billing limits, and an incident contact are configured.

## Rollback

Migrations are append-only. Do not delete or edit a deployed migration. Roll forward with a reviewed compensating migration for schema or policy issues. Restore from a verified backup/PITR point only for data-loss incidents, then reconcile migrations and redeploy Functions. Edge Function rollback is performed by redeploying the last known-good committed version. Keep Stripe webhook endpoint changes backward compatible during the rollback window.
