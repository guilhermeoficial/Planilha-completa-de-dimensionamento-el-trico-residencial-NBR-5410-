-- =============================================================================
-- Migração 003 — Dados do responsável técnico (ART/RRT) e tipo de entrada
-- Execute no SQL Editor do Supabase, no mesmo projeto onde já rodou as anteriores
-- =============================================================================

alter table public.projects
  add column if not exists responsavel_tecnico text,
  add column if not exists registro_profissional text,
  add column if not exists numero_art text,
  add column if not exists tipo_entrada text not null default 'Monofásico' check (tipo_entrada in ('Monofásico', 'Bifásico', 'Trifásico'));

comment on column public.projects.responsavel_tecnico is 'Nome do engenheiro/técnico responsável pelo projeto';
comment on column public.projects.registro_profissional is 'CREA, CFT ou outro registro profissional';
comment on column public.projects.numero_art is 'Número da ART/RRT vinculada ao projeto';
comment on column public.projects.tipo_entrada is 'Tipo de entrada de energia considerado no resumo de demanda';
