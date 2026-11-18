-- =============================================================================
-- Migração 008 — Dossiê do projeto (resultados de planilha) e Documentos privados
-- Execute no SQL Editor do Supabase.
-- =============================================================================

alter table public.projects
  add column if not exists dossie_json jsonb;

comment on column public.projects.dossie_json is 'Dossiê do projeto (KPIs, demanda, orçamento, quantitativos, pendências) exibido na aba Dossiê';

-- Bucket privado: cada usuário só enxerga a própria pasta (<uid>/<project_id>/arquivo)
insert into storage.buckets (id, name, public)
values ('projeto-docs', 'projeto-docs', false)
on conflict (id) do nothing;

drop policy if exists "projeto_docs_select_own" on storage.objects;
drop policy if exists "projeto_docs_insert_own" on storage.objects;
drop policy if exists "projeto_docs_update_own" on storage.objects;
drop policy if exists "projeto_docs_delete_own" on storage.objects;

create policy "projeto_docs_select_own" on storage.objects for select to authenticated
  using (bucket_id = 'projeto-docs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "projeto_docs_insert_own" on storage.objects for insert to authenticated
  with check (bucket_id = 'projeto-docs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "projeto_docs_update_own" on storage.objects for update to authenticated
  using (bucket_id = 'projeto-docs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "projeto_docs_delete_own" on storage.objects for delete to authenticated
  using (bucket_id = 'projeto-docs' and (storage.foldername(name))[1] = auth.uid()::text);
