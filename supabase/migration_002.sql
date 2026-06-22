-- =============================================================================
-- Migração 002 — pontos de tomada/iluminação por circuito, DPS e ajustes manuais
-- Execute no SQL Editor do Supabase (projetos já existentes).
-- =============================================================================

alter table public.circuitos
  add column if not exists qtd_pontos integer not null default 1;

alter table public.ambientes
  add column if not exists pontos_luz_manual integer;

alter table public.projects
  add column if not exists dps_quantidade integer not null default 1;

comment on column public.circuitos.qtd_pontos is 'Quantidade de pontos de tomada ou de luz atendidos por este circuito';
comment on column public.ambientes.pontos_luz_manual is 'Sobrescreve o número mínimo de pontos de luz calculado automaticamente (NULL = usa o cálculo automático)';
comment on column public.projects.dps_quantidade is 'Quantidade de DPS (protetores de surto) considerados no orçamento do projeto';

-- -----------------------------------------------------------------------------
-- Preços de referência editáveis, por projeto (calibrados pelo projetista
-- a partir do preço local em sua loja/fornecedor)
-- -----------------------------------------------------------------------------
alter table public.projects
  add column if not exists precos_json jsonb not null default '{}'::jsonb;

comment on column public.projects.precos_json is 'Tabela de preços de referência (R$) editável por projeto: cabo/m por bitola, disjuntor por faixa, DPS, tomada, ponto de luz, conector, capacitor/kVAr';

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
