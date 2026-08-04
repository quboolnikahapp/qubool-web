-- Defense in depth for all application tables exposed through the Data API.
-- Privileged server work runs through the Supabase service role, which has
-- BYPASSRLS; browser and authenticated database access remains policy-bound.
alter table public.countries force row level security;
alter table public.states force row level security;
alter table public.cities force row level security;
alter table public.lookup_values force row level security;
alter table public.profiles force row level security;
alter table public.profile_photos force row level security;
alter table public.profile_preferences force row level security;
alter table public.education force row level security;
alter table public.occupations force row level security;
alter table public.family_information force row level security;
alter table public.profile_languages force row level security;
alter table public.user_verifications force row level security;
alter table public.interests force row level security;
alter table public.matches force row level security;
alter table public.conversations force row level security;
alter table public.messages force row level security;
alter table public.blocked_users force row level security;
alter table public.reports force row level security;
alter table public.subscription_plans force row level security;
alter table public.user_subscriptions force row level security;
alter table public.notifications force row level security;
alter table public.audit_logs force row level security;
alter table public.rate_limit_events force row level security;
