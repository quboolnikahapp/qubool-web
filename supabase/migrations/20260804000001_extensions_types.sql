create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;
create extension if not exists pg_trgm with schema extensions;
create extension if not exists unaccent with schema extensions;

create type public.account_role as enum ('user', 'moderator', 'admin');
create type public.profile_visibility as enum ('public', 'members_only', 'private');
create type public.interest_status as enum ('pending', 'accepted', 'rejected', 'withdrawn');
create type public.match_status as enum ('active', 'unmatched', 'blocked');
create type public.message_kind as enum ('text', 'image', 'document', 'audio', 'system');
create type public.verification_status as enum ('pending', 'approved', 'rejected', 'expired');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled', 'expired');
create type public.notification_type as enum ('interest', 'match', 'message', 'verification', 'subscription', 'system');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
create type public.prayer_frequency as enum ('always', 'usually', 'sometimes', 'rarely', 'prefer_not_to_say');
create type public.gender as enum ('woman', 'man', 'non_binary', 'prefer_not_to_say');

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public, auth
as $$ select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator'), false) $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = timezone('utc', now()); return new; end $$;
