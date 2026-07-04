"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, AmbienteRow, AmbienteTueRow, CircuitoRow, MotorRow } from "@/lib/types";
import {
  Plus, FolderOpen, Copy, Wrench, GraduationCap,
  ClipboardList, ArrowRight, MoreVertical,
} from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [projetos, setProjetos] = useState<ProjectRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [duplicando, setDuplicando] = useState<string | null>(null);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setCarregando(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjetos((data as ProjectRow[]) ?? []);
    setCarregando(false);
  }

  async function criarProjeto(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { error } = await supabase.from("projects").insert({ nome, cliente, owner_id: userData.user.id });
    if (!error) { setNome(""); setCliente(""); setMostrarForm(false); carregar(); }
    setSalvando(false);
  }

  async function duplicarProjeto(p: ProjectRow, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    setDuplicando(p.id);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: novoProjeto, error } = await supabase
      .from("projects")
      .insert({ owner_id: userData.user.id, nome: `${p.nome} (cópia)`, cliente: p.cliente, endereco: p.endereco, tensao_v: p.tensao_v, tipo_entrada: p.tipo_entrada, dps_quantidade: p.dps_quantidade, precos_json: p.precos_json, responsavel_tecnico: p.responsavel_tecnico, registro_profissional: p.registro_profissional })
      .select().single();
    if (error || !novoProjeto) { setDuplicando(null); return; }
    const [{ data: ambientes }, { data: circuitos }, { data: motores }] = await Promise.all([
      supabase.from("ambientes").select("*").eq("project_id", p.id),
      supabase.from("circuitos").select("*").eq("project_id", p.id),
      supabase.from("motores").select("*").eq("project_id", p.id),
    ]);
    const mapaAmbientes = new Map<string, string>();
    for (const a of (ambientes as AmbienteRow[]) ?? []) {
      const { data: novoAmbiente } = await supabase.from("ambientes").insert({ project_id: novoProjeto.id, nome: a.nome, tipo: a.tipo, area_m2: a.area_m2, perimetro_m: a.perimetro_m, pontos_luz_manual: a.pontos_luz_manual, ordem: a.ordem }).select().single();
      if (novoAmbiente) mapaAmbientes.set(a.id, novoAmbiente.id);
    }
    if (mapaAmbientes.size > 0) {
      const { data: tues } = await supabase.from("ambiente_tues").select("*").in("ambiente_id", Array.from(mapaAmbientes.keys()));
      const novosTues = ((tues as AmbienteTueRow[]) ?? []).map((t) => ({ ambiente_id: mapaAmbientes.get(t.ambiente_id), nome: t.nome, potencia_w: t.potencia_w, fp: t.fp, quantidade: t.quantidade }));
      if (novosTues.length) await supabase.from("ambiente_tues").insert(novosTues);
    }
    const novosCircuitos = ((circuitos as CircuitoRow[]) ?? []).map((c) => ({ project_id: novoProjeto.id, numero: c.numero, descricao: c.descricao, tipo: c.tipo, tensao_v: c.tensao_v, fp: c.fp, fase: c.fase, potencia_va: c.potencia_va, comprimento_m: c.comprimento_m, isolacao: c.isolacao, bloqueado: c.bloqueado, qtd_pontos: c.qtd_pontos }));
    if (novosCircuitos.length) await supabase.from("circuitos").insert(novosCircuitos);
    const novosMotores = ((motores as MotorRow[]) ?? []).map((m) => ({ project_id: novoProjeto.id, nome: m.nome, tipo: m.tipo, potencia_cv: m.potencia_cv, tensao_v: m.tensao_v, fp_atual: m.fp_atual, fp_desejado: m.fp_desejado, quantidade: m.quantidade }));
    if (novosMotores.length) await supabase.from("motores").insert(novosMotores);
    setDuplicando(null);
    router.push(`/dashboard/projects/${novoProjeto.id}`);
  }

  const ultimoProjeto = projetos[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Título */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Bem-vindo ao Hub Voltis</h1>
        <p className="mt-1 text-sm text-muted">Escolha por onde quer começar.</p>
      </div>

      {/* ── 3 cards grandes ── */}
      <div className="grid gap-5 lg:grid-cols-3">

        {/* ─ Card Ferramentas & Projetos ─ */}
        <div className="flex flex-col rounded-2xl border border-phase-s/40 bg-panel overflow-hidden">
          {/* topo colorido */}
          <div className="flex items-center gap-3 bg-phase-s/10 px-5 py-4 border-b border-phase-s/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-phase-s/20">
              <Wrench size={20} className="text-phase-s" />
            </div>
            <div>
              <p className="font-display text-base font-bold">Projetos &</p>
              <p className="font-display text-base font-bold">Ferramentas</p>
            </div>
          </div>

          {/* conteúdo */}
          <div className="flex flex-1 flex-col p-5">
            {/* último projeto */}
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-muted">Projetos recentes</p>
              <button
                onClick={() => setMostrarForm((v) => !v)}
                className="flex items-center gap-1 rounded-md bg-phase-s/15 px-2.5 py-1 text-xs font-medium text-phase-s hover:bg-phase-s/25 transition-colors"
              >
                <Plus size={12} /> Novo projeto
              </button>
            </div>

            {mostrarForm && (
              <form onSubmit={criarProjeto} className="mb-3 flex flex-col gap-2">
                <input required placeholder="Nome do projeto" value={nome} onChange={(e) => setNome(e.target.value)} className="rounded-md border border-panel-border bg-bg px-3 py-1.5 text-xs" />
                <input placeholder="Cliente (opcional)" value={cliente} onChange={(e) => setCliente(e.target.value)} className="rounded-md border border-panel-border bg-bg px-3 py-1.5 text-xs" />
                <button disabled={salvando} className="rounded-md bg-phase-s px-3 py-1.5 text-xs font-medium text-bg hover:opacity-90 disabled:opacity-50">
                  {salvando ? "Criando..." : "Criar"}
                </button>
              </form>
            )}

            <div className="flex-1 space-y-2">
              {carregando ? (
                <p className="text-xs text-muted">Carregando...</p>
              ) : projetos.length === 0 ? (
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-panel-border p-3 text-xs text-muted">
                  <FolderOpen size={14} /> Nenhum projeto ainda.
                </div>
              ) : (
                projetos.slice(0, 3).map((p) => (
                  <Link key={p.id} href={`/dashboard/projects/${p.id}`}
                    className="group flex items-center justify-between rounded-lg border border-panel-border bg-bg-elevated px-3 py-2.5 transition-colors hover:border-phase-s/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">{p.nome}</p>
                      <p className="text-xs text-muted">{p.cliente || "Sem cliente"} · {p.tensao_v}V · {new Date(p.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={(e) => duplicarProjeto(p, e)} disabled={duplicando === p.id} title="Duplicar" className="rounded p-1 text-muted opacity-0 hover:text-phase-s group-hover:opacity-100 transition-opacity">
                        <Copy size={13} />
                      </button>
                      <MoreVertical size={13} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* botões inferiores */}
            <div className="mt-4 space-y-2">
              <Link href="/dashboard/ferramentas" className="flex w-full items-center justify-center gap-2 rounded-lg border border-panel-border py-2 text-sm text-muted hover:border-phase-s hover:text-phase-s transition-colors">
                <Wrench size={14} /> Calculadoras & Conversores
              </Link>
              <Link href="/dashboard/projects" className="flex w-full items-center justify-center gap-2 rounded-lg bg-phase-s py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity">
                Acessar Projetos <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ─ Card Cursos ─ */}
        <div className="flex flex-col rounded-2xl border border-phase-t/40 bg-panel overflow-hidden">
          <div className="flex items-center gap-3 bg-phase-t/10 px-5 py-4 border-b border-phase-t/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-phase-t/20">
              <GraduationCap size={20} className="text-phase-t" />
            </div>
            <p className="font-display text-base font-bold">Seus Cursos</p>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="mb-3 text-xs text-muted">Módulos disponíveis</p>

            <div className="flex-1 space-y-2">
              {[
                "Eletrotécnica Básica",
                "Normas Regulamentadoras — NR10",
                "Máquinas Elétricas",
                "Eletrônica Aplicada",
                "Instalações Industriais",
              ].map((curso) => (
                <Link key={curso} href="/dashboard/cursos"
                  className="flex items-center rounded-lg border border-panel-border bg-bg-elevated px-3 py-2.5 text-xs transition-colors hover:border-phase-t/50 hover:text-phase-t"
                >
                  {curso}
                </Link>
              ))}
            </div>

            {/* barra de progresso */}
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>Progresso geral</span>
                <span>40%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                <div className="h-full w-[40%] rounded-full bg-phase-t transition-all" />
              </div>
            </div>

            <Link href="/dashboard/cursos" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-phase-t py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity">
              Ir para Aulas <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ─ Card Simulados & Questões ─ */}
        <div className="flex flex-col rounded-2xl border border-accent/40 bg-panel overflow-hidden">
          <div className="flex items-center gap-3 bg-accent/10 px-5 py-4 border-b border-accent/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
              <ClipboardList size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-display text-base font-bold">Simulados</p>
              <p className="font-display text-base font-bold">& Questões</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="mb-3 text-xs text-muted">Categorias disponíveis</p>

            <div className="flex-1 space-y-2">
              {[
                "Eletrotécnica Geral",
                "Eletrônica e Instrumentação",
                "Telecomunicações",
                "NBR 5410 e Normas",
                "Questões Inéditas ✨",
              ].map((cat) => (
                <Link key={cat} href="/dashboard/cursos/questoes"
                  className="flex items-center rounded-lg border border-panel-border bg-bg-elevated px-3 py-2.5 text-xs transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <Link href="/dashboard/cursos/questoes" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity">
              Iniciar Questões <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
