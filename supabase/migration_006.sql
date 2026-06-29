-- =============================================================================
-- Migração 006 — Respostas de questões (índice de acertos + nível de confiança)
-- Execute no SQL Editor do Supabase
-- =============================================================================

create table if not exists public.respostas_questoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  questao_id text not null,
  alternativa_index integer not null,
  correta boolean not null,
  confianca text not null default 'media' check (confianca in ('alta', 'media', 'baixa', 'chute')),
  created_at timestamptz not null default now(),
  unique (user_id, questao_id)
);

alter table public.respostas_questoes enable row level security;

create policy "respostas_questoes_owner_all" on public.respostas_questoes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_respostas_questoes_user on public.respostas_questoes (user_id);

comment on table public.respostas_questoes is 'Histórico de respostas do usuário no banco de questões — usado para índice de acertos e filtros (resolvidas/acertei/errei)';
comment on column public.respostas_questoes.confianca is 'Nível de confiança declarado ao responder: alta (certeza), media (~50%), baixa (~25%), chute';
