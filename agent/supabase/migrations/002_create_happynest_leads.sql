-- HappyNest leads capture schema
-- Apply via Supabase Studio → SQL Editor, or `supabase db push`.

create table if not exists happynest_leads (
  id                uuid primary key default gen_random_uuid(),
  timestamp         timestamptz not null,
  full_name         text not null,
  phone             text,
  email             text,
  check_in          date,
  check_out         date,
  guests            integer,
  children          integer,
  pets              integer,
  budget            text,
  special_requests  text,
  source            text,
  created_at        timestamptz not null default now()
);
