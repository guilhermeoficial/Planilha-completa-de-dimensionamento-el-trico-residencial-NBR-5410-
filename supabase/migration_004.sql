-- =============================================================================
-- Migração 004 — Assinatura mensal (Stripe)
-- Execute no SQL Editor do Supabase
-- =============================================================================

alter table public.profiles
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists subscription_status text not null default 'inactive'
    check (subscription_status in ('inactive', 'active', 'past_due', 'canceled')),
  add column if not exists current_period_end timestamptz;

comment on column public.profiles.subscription_status is 'Status da assinatura mensal (Stripe): inactive, active, past_due, canceled';

create index if not exists idx_profiles_stripe_customer on public.profiles (stripe_customer_id);

-- O webhook do Stripe roda com a service_role key (contorna RLS), então não é
-- necessária nenhuma policy adicional para essa escrita.
