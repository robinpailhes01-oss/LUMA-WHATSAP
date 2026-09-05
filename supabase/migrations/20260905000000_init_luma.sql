-- =====================================================================
-- Luma Leads — schéma initial
-- Tables : luma_leads, luma_interactions
-- NE PAS appliquer avant validation (voir README / instructions de session).
-- =====================================================================

-- ---------------------------------------------------------------------
-- luma_leads
-- ---------------------------------------------------------------------
create table if not exists public.luma_leads (
  id                   uuid primary key default gen_random_uuid(),
  company_name         text not null,
  sector               text,
  city                 text,
  address              text,
  postal_code          text,
  phone                text,
  email                text,
  website              text,
  instagram            text,
  google_maps_url      text,
  has_whatsapp_button  boolean default null,   -- null = inconnu
  open_year_round      boolean default null,   -- null = inconnu
  estimated_revenue    text,                   -- tranche libre : "<100K", "100-300K", "300-500K", ">500K"
  google_rating        numeric,
  google_reviews_count integer,
  pain_signals         text,
  lead_score           integer not null default 0,
  status               text not null default 'nouveau',
  source               text,
  next_action_at       timestamptz,
  next_action_note     text,
  owner_notes          text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  constraint luma_leads_status_check check (
    status in (
      'nouveau',
      'a_appeler',
      'appele_sans_reponse',
      'a_rappeler',
      'rdv_pris',
      'audit_envoye',
      'client',
      'perdu',
      'hors_cible'
    )
  ),
  constraint luma_leads_lead_score_check check (lead_score between 0 and 100),
  -- Anti-doublons à l'import. NULLS NOT DISTINCT (PostgreSQL 15+) pour que
  -- deux leads sans ville mais de même nom soient aussi considérés doublons,
  -- et que l'upsert ON CONFLICT (company_name, city) fonctionne dans tous les cas.
  constraint luma_leads_company_city_key unique nulls not distinct (company_name, city)
);

create index if not exists luma_leads_status_idx         on public.luma_leads (status);
create index if not exists luma_leads_next_action_at_idx on public.luma_leads (next_action_at);
create index if not exists luma_leads_city_idx           on public.luma_leads (city);

-- ---------------------------------------------------------------------
-- luma_interactions
-- ---------------------------------------------------------------------
create table if not exists public.luma_interactions (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.luma_leads (id) on delete cascade,
  type        text not null,
  outcome     text,
  content     text,
  occurred_at timestamptz not null default now(),

  constraint luma_interactions_type_check check (
    type in ('appel', 'email', 'whatsapp', 'visite', 'note')
  )
);

create index if not exists luma_interactions_lead_id_occurred_at_idx
  on public.luma_interactions (lead_id, occurred_at desc);

-- ---------------------------------------------------------------------
-- Trigger updated_at
-- ---------------------------------------------------------------------
create or replace function public.luma_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists luma_leads_set_updated_at on public.luma_leads;
create trigger luma_leads_set_updated_at
  before update on public.luma_leads
  for each row
  execute function public.luma_set_updated_at();

-- ---------------------------------------------------------------------
-- RLS : un seul utilisateur → "authenticated full access"
-- ---------------------------------------------------------------------
alter table public.luma_leads        enable row level security;
alter table public.luma_interactions enable row level security;

drop policy if exists "authenticated full access" on public.luma_leads;
create policy "authenticated full access"
  on public.luma_leads
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated full access" on public.luma_interactions;
create policy "authenticated full access"
  on public.luma_interactions
  for all
  to authenticated
  using (true)
  with check (true);
