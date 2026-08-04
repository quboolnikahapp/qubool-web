alter table public.countries enable row level security; alter table public.states enable row level security; alter table public.cities enable row level security; alter table public.lookup_values enable row level security;
alter table public.profiles enable row level security; alter table public.profile_photos enable row level security; alter table public.profile_preferences enable row level security; alter table public.education enable row level security; alter table public.occupations enable row level security; alter table public.family_information enable row level security; alter table public.profile_languages enable row level security; alter table public.user_verifications enable row level security;
alter table public.interests enable row level security; alter table public.matches enable row level security; alter table public.conversations enable row level security; alter table public.messages enable row level security; alter table public.blocked_users enable row level security; alter table public.reports enable row level security; alter table public.subscription_plans enable row level security; alter table public.user_subscriptions enable row level security; alter table public.notifications enable row level security; alter table public.audit_logs enable row level security; alter table public.rate_limit_events enable row level security;
-- RLS remains enabled for every table. Security-definer RPCs own controlled, multi-row
-- business transactions (match/conversation/notification creation) and therefore run as
-- the table owner; do not FORCE RLS on those tables or those atomic operations cannot work.

create policy "authenticated read reference data" on public.countries for select to authenticated using (true);
create policy "authenticated read states" on public.states for select to authenticated using (true);
create policy "authenticated read cities" on public.cities for select to authenticated using (true);
create policy "authenticated read lookups" on public.lookup_values for select to authenticated using (is_active);
create policy "admin manages reference data" on public.countries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages states" on public.states for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages cities" on public.cities for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages lookups" on public.lookup_values for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "view discoverable profiles" on public.profiles for select to authenticated using (id = auth.uid() or (deleted_at is null and is_discoverable and visibility <> 'private' and not exists (select 1 from public.blocked_users b where (b.blocker_id = auth.uid() and b.blocked_id = id) or (b.blocker_id = id and b.blocked_id = auth.uid()))));
create policy "users update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "admin manages profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "profile photos readable with profile" on public.profile_photos for select to authenticated using (profile_id = auth.uid() or (exists (select 1 from public.profiles p where p.id = profile_id and p.deleted_at is null and p.is_discoverable and p.visibility <> 'private') and not exists (select 1 from public.blocked_users b where (b.blocker_id=auth.uid() and b.blocked_id=profile_id) or (b.blocker_id=profile_id and b.blocked_id=auth.uid()))));
create policy "users add pending own photos" on public.profile_photos for insert to authenticated with check (profile_id = auth.uid() and moderation_status = 'pending');
create policy "users delete own photos" on public.profile_photos for delete to authenticated using (profile_id = auth.uid());
create policy "admin manages photos" on public.profile_photos for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "own preferences" on public.profile_preferences for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "own education" on public.education for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "own occupations" on public.occupations for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "own family info" on public.family_information for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "own languages" on public.profile_languages for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "verification owner or admin" on public.user_verifications for select to authenticated using (profile_id = auth.uid() or public.is_admin());
create policy "verification owner creates" on public.user_verifications for insert to authenticated with check (profile_id = auth.uid() and status = 'pending');
create policy "verification admin updates" on public.user_verifications for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "interest participants" on public.interests for select to authenticated using (sender_id = auth.uid() or recipient_id = auth.uid());
create policy "interest sender inserts" on public.interests for insert to authenticated with check (sender_id = auth.uid() and status = 'pending');
create policy "interest recipient responds" on public.interests for update to authenticated using (recipient_id = auth.uid() or sender_id = auth.uid()) with check (recipient_id = auth.uid() or sender_id = auth.uid());
create policy "match participants" on public.matches for select to authenticated using (user_low_id = auth.uid() or user_high_id = auth.uid());
create policy "conversation participants" on public.conversations for select to authenticated using (exists (select 1 from public.matches m where m.id = match_id and (m.user_low_id = auth.uid() or m.user_high_id = auth.uid()) and m.status = 'active'));
create policy "message participants read" on public.messages for select to authenticated using (exists (select 1 from public.conversations c join public.matches m on m.id = c.match_id where c.id = conversation_id and m.status = 'active' and (m.user_low_id = auth.uid() or m.user_high_id = auth.uid())));
create policy "message sender inserts" on public.messages for insert to authenticated with check (sender_id = auth.uid() and kind <> 'system' and exists (select 1 from public.conversations c join public.matches m on m.id=c.match_id where c.id=conversation_id and m.status='active' and (m.user_low_id=auth.uid() or m.user_high_id=auth.uid())));
create policy "message recipient reads" on public.messages for update to authenticated using (sender_id <> auth.uid() and exists (select 1 from public.conversations c join public.matches m on m.id=c.match_id where c.id=conversation_id and (m.user_low_id=auth.uid() or m.user_high_id=auth.uid()))) with check (sender_id <> auth.uid());
create policy "own blocks" on public.blocked_users for all to authenticated using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy "reporter read reports" on public.reports for select to authenticated using (reporter_id = auth.uid() or public.is_admin());
create policy "user files reports" on public.reports for insert to authenticated with check (reporter_id = auth.uid() and status = 'open' and reviewer_id is null and resolved_at is null);
create policy "admin manages reports" on public.reports for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "plans are readable" on public.subscription_plans for select to authenticated using (is_active); create policy "admin manages plans" on public.subscription_plans for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "own subscriptions" on public.user_subscriptions for select to authenticated using (profile_id = auth.uid());
create policy "own notifications" on public.notifications for select to authenticated using (profile_id = auth.uid()); create policy "own notification read state" on public.notifications for update to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "admin reads audit logs" on public.audit_logs for select to authenticated using (public.is_admin());

create policy "public profile image read" on storage.objects for select using (bucket_id = 'profile-images');
create policy "profile image owner upload" on storage.objects for insert to authenticated with check (bucket_id = 'profile-images' and (storage.foldername(name))[1] = auth.uid()::text and lower(storage.extension(name)) in ('jpg','jpeg','png','webp'));
create policy "profile image owner update" on storage.objects for update to authenticated using (bucket_id = 'profile-images' and owner_id = auth.uid()) with check (bucket_id = 'profile-images' and owner_id = auth.uid());
create policy "profile image owner delete" on storage.objects for delete to authenticated using (bucket_id = 'profile-images' and owner_id = auth.uid());
create policy "verification document private access" on storage.objects for select to authenticated using (bucket_id = 'verification-documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy "verification document owner upload" on storage.objects for insert to authenticated with check (bucket_id = 'verification-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "verification document owner delete" on storage.objects for delete to authenticated using (bucket_id = 'verification-documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy "chat media participants read" on storage.objects for select to authenticated using (bucket_id = 'chat-media' and exists (select 1 from public.messages m join public.conversations c on c.id=m.conversation_id join public.matches ma on ma.id=c.match_id where m.media_path=name and (ma.user_low_id=auth.uid() or ma.user_high_id=auth.uid())));
create policy "chat media owner upload" on storage.objects for insert to authenticated with check (bucket_id = 'chat-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "chat media owner delete" on storage.objects for delete to authenticated using (bucket_id = 'chat-media' and owner_id = auth.uid());

alter publication supabase_realtime add table public.messages, public.notifications, public.interests;
