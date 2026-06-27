-- =============================================================================
-- Sistema de Projetos Elétricos Residenciais — Schema Supabase (Postgres)
-- Execute este arquivo em: Supabase Dashboard > SQL Editor > New query
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Perfis (1:1 com auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text,
  empresa text,
  is_admin boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'inactive'
    check (subscription_status in ('inactive', 'active', 'past_due', 'canceled')),
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_stripe_customer on public.profiles (stripe_customer_id);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- cria o profile automaticamente quando um usuário se cadastra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome) values (new.id, new.raw_user_meta_data ->> 'nome');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Projetos
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  nome text not null,
  cliente text,
  endereco text,
  tensao_v integer not null default 220,
  dps_quantidade integer not null default 1,
  precos_json jsonb not null default '{}'::jsonb,
  responsavel_tecnico text,
  registro_profissional text,
  numero_art text,
  tipo_entrada text not null default 'Monofásico' check (tipo_entrada in ('Monofásico', 'Bifásico', 'Trifásico')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects_owner_all" on public.projects
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- -----------------------------------------------------------------------------
-- Ambientes (cômodos) — previsão de carga NBR 5410 item 9.5
-- -----------------------------------------------------------------------------
create table if not exists public.ambientes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  nome text not null,
  tipo text not null check (tipo in ('Social/Quarto', 'Serviço/Cozinha', 'Banheiro', 'Varanda/Externo')),
  area_m2 numeric not null default 0,
  perimetro_m numeric not null default 0,
  pontos_luz_manual integer,
  ordem integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ambientes enable row level security;

create policy "ambientes_via_project_owner" on public.ambientes
  for all using (
    exists (select 1 from public.projects p where p.id = ambientes.project_id and p.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.projects p where p.id = ambientes.project_id and p.owner_id = auth.uid())
  );

-- -----------------------------------------------------------------------------
-- TUEs vinculados a um ambiente (equipamentos de uso específico)
-- -----------------------------------------------------------------------------
create table if not exists public.ambiente_tues (
  id uuid primary key default gen_random_uuid(),
  ambiente_id uuid not null references public.ambientes (id) on delete cascade,
  nome text not null,
  potencia_w numeric not null default 0,
  fp numeric not null default 1,
  quantidade integer not null default 1
);

alter table public.ambiente_tues enable row level security;

create policy "ambiente_tues_via_project_owner" on public.ambiente_tues
  for all using (
    exists (
      select 1 from public.ambientes a
      join public.projects p on p.id = a.project_id
      where a.id = ambiente_tues.ambiente_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.ambientes a
      join public.projects p on p.id = a.project_id
      where a.id = ambiente_tues.ambiente_id and p.owner_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- Circuitos — memorial de cálculo / quadro de cargas
-- -----------------------------------------------------------------------------
create table if not exists public.circuitos (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  numero integer not null,
  descricao text not null,
  tipo text not null check (tipo in ('Iluminação', 'TUG', 'TUE')),
  tensao_v integer not null default 220,
  fp numeric not null default 1,
  fase text not null default 'R' check (fase in ('R', 'S', 'T')),
  potencia_va numeric not null default 0,
  comprimento_m numeric not null default 10,
  isolacao text not null default 'PVC' check (isolacao in ('PVC', 'EPR')),
  bloqueado boolean not null default false,
  qtd_pontos integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.circuitos enable row level security;

create policy "circuitos_via_project_owner" on public.circuitos
  for all using (
    exists (select 1 from public.projects p where p.id = circuitos.project_id and p.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.projects p where p.id = circuitos.project_id and p.owner_id = auth.uid())
  );

create index if not exists idx_ambientes_project on public.ambientes (project_id);
create index if not exists idx_circuitos_project on public.circuitos (project_id);
create index if not exists idx_ambiente_tues_ambiente on public.ambiente_tues (ambiente_id);

-- -----------------------------------------------------------------------------
-- Motores — módulo industrial / correção de fator de potência
-- -----------------------------------------------------------------------------
create table if not exists public.motores (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  nome text not null,
  tipo text not null check (tipo in ('Monofásico', 'Trifásico')),
  potencia_cv numeric not null default 0,
  tensao_v integer not null default 220,
  fp_atual numeric not null default 0.75,
  fp_desejado numeric not null default 0.95,
  quantidade integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.motores enable row level security;

create policy "motores_via_project_owner" on public.motores
  for all using (
    exists (select 1 from public.projects p where p.id = motores.project_id and p.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.projects p where p.id = motores.project_id and p.owner_id = auth.uid())
  );

create index if not exists idx_motores_project on public.motores (project_id);
