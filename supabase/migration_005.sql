-- =============================================================================
-- Migração 005 — Conta mestre/admin (acesso livre, sem assinatura)
-- Execute no SQL Editor do Supabase
-- =============================================================================

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

comment on column public.profiles.is_admin is 'Conta mestre/administradora: acesso liberado ao painel sem precisar de assinatura ativa';

-- Depois de rodar esta migração, marque a SUA conta como admin substituindo
-- o e-mail abaixo pelo e-mail real com o qual você se cadastrou no Voltis:

-- update public.profiles
-- set is_admin = true
-- where id = (select id from auth.users where email = 'SEU-EMAIL-AQUI@exemplo.com');
