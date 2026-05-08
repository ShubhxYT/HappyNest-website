-- HappyNest chat persistence schema
-- Apply via Supabase Studio → SQL Editor, or `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_agent  text,
  ip_hash     text
);

create table if not exists chat_messages (
  id          bigserial primary key,
  session_id  uuid not null references chat_sessions(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists chat_messages_session_idx
  on chat_messages (session_id, created_at);