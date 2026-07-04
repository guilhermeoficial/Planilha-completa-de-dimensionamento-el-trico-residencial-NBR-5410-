"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, AmbienteRow, AmbienteTueRow, CircuitoRow, MotorRow } from "@/lib/types";
import { Plus, FolderOpen, Copy, Wrench, GraduationCap, ClipboardList, ArrowRight, Zap, BookOpen, BarChart3, Sparkles } from "lucide-react";

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
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    carregar();
    async function pegarUsuario() {
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) {
        setNomeUsuario(data.user.email.split("@")[0]);
      }
    }
    pegarUsuario();
  }, []);

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

  return (
    <div className="min-h-screen">

      {/* ── Saudação ── */}
      <div className="border-b border-panel-border bg-bg-elevated/60 px-8 py-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Bem-vindo de volta</p>
        <h1 className="mt-1 font-display text-2xl font-bold capitalize">{nomeUsuario || "Voltis"}</h1>
        <p className="mt-0.5 text-sm text-muted">Por onde você quer começar hoje?</p>
      </div>

      {/* ── 3 Cards principais ── */}
      <div className="grid min-h-[calc(100vh-130px)] grid-cols-1 md:grid-cols-3">

        {/* ─ QUESTÕES ─ */}
        <Link
          href="/dashboard/cursos/questoes"
          className="group relative flex flex-col overflow-hidden border-r border-panel-border bg-panel transition-colors hover:bg-accent/5"
        >
          {/* faixa lateral de cor */}
          <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-1 flex-col px-10 py-12">
            {/* ícone grande */}
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 transition-all group-hover:scale-110 group-hover:bg-accent/20">
              <ClipboardList size={32} className="text-accent" />
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-accent">Módulo 01</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight">Simulados &<br />Questões</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Banco com questões inéditas de Eletrotécnica, Eletrônica e Telecomunicações.
              Gabarito comentado, filtros por banca, estatísticas e caderno de erros.
            </p>

            <div className="mt-6 space-y-2">
              {[
                { icon: Sparkles, text: "Questões inéditas exclusivas" },
                { icon: BarChart3, text: "Estatísticas de desempenho" },
                { icon: BookOpen, text: "Gabarito comentado completo" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted">
                  <Icon size={12} className="text-accent shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 flex items-center gap-2 font-semibold text-accent">
              Iniciar questões <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* ─ CURSOS ─ */}
        <Link
          href="/dashboard/cursos"
          className="group relative flex flex-col overflow-hidden border-r border-panel-border bg-panel transition-colors hover:bg-phase-t/5"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-phase-t opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-1 flex-col px-10 py-12">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-phase-t/30 bg-phase-t/10 transition-all group-hover:scale-110 group-hover:bg-phase-t/20">
              <GraduationCap size={32} className="text-phase-t" />
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-phase-t">Módulo 02</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight">Cursos &<br />Módulos</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Conteúdo completo de Eletrotécnica, Eletrônica e Instrumentação.
              Dicas interativas, equações renderizadas e exemplos resolvidos.
            </p>

            <div className="mt-6 space-y-2">
              {[
                { icon: BookOpen,    text: "5 módulos por área temática" },
                { icon: Sparkles,    text: "Dicas visuais interativas" },
                { icon: BarChart3,   text: "Progresso salvo automaticamente" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted">
                  <Icon size={12} className="text-phase-t shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 flex items-center gap-2 font-semibold text-phase-t">
              Ir para os cursos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* ─ FERRAMENTAS ─ */}
        <div className="group relative flex flex-col overflow-hidden bg-panel">
          <div className="absolute left-0 top-0 h-full w-1 bg-phase-s opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-1 flex-col px-10 py-12">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-phase-s/30 bg-phase-s/10 transition-all group-hover:scale-110 group-hover:bg-phase-s/20">
              <Wrench size={32} className="text-phase-s" />
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-phase-s">Módulo 03</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight">Projetos &<br />Ferramentas</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Dimensionamento NBR 5410, projetos elétricos residenciais e industriais,
              calculadoras e conversores técnicos.
            </p>

            {/* Projetos recentes */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-muted">Projetos recentes</p>
                <button
                  onClick={() => setMostrarForm(v => !v)}
                  className="flex items-center gap-1 text-xs text-phase-s hover:underline"
                >
                  <Plus size={11} /> Novo
                </button>
              </div>

              {mostrarForm && (
                <form onSubmit={criarProjeto} className="mb-3 flex flex-col gap-2">
                  <input required placeholder="Nome do projeto" value={nome} onChange={e => setNome(e.target.value)} className="rounded-md border border-panel-border bg-bg px-3 py-1.5 text-xs" />
                  <input placeholder="Cliente (opcional)" value={cliente} onChange={e => setCliente(e.target.value)} className="rounded-md border border-panel-border bg-bg px-3 py-1.5 text-xs" />
                  <button disabled={salvando} className="rounded-md bg-phase-s px-3 py-1.5 text-xs font-medium text-bg hover:opacity-90 disabled:opacity-50">
                    {salvando ? "Criando..." : "Criar"}
                  </button>
                </form>
              )}

              <div className="space-y-1.5">
                {carregando ? (
                  <p className="text-xs text-muted">Carregando...</p>
                ) : projetos.length === 0 ? (
                  <div className="flex items-center gap-2 rounded-lg border border-dashed border-panel-border p-3 text-xs text-muted">
                    <FolderOpen size={13} /> Nenhum projeto ainda.
                  </div>
                ) : (
                  projetos.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/dashboard/projects/${p.id}`}
                      className="flex items-center justify-between rounded-lg border border-panel-border bg-bg-elevated px-3 py-2 text-xs transition-colors hover:border-phase-s/50"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{p.nome}</p>
                        <p className="text-muted">{p.cliente || "Sem cliente"} · {p.tensao_v}V</p>
                      </div>
                      <button onClick={e => duplicarProjeto(p, e)} disabled={duplicando === p.id} className="ml-2 shrink-0 rounded p-1 text-muted hover:text-phase-s">
                        <Copy size={12} />
                      </button>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
              <Link href="/dashboard/ferramentas" className="flex items-center justify-center gap-1.5 rounded-lg border border-panel-border py-2 text-xs text-muted hover:border-phase-s hover:text-phase-s transition-colors">
                <Zap size={12} /> Calculadoras
              </Link>
              <Link href="/dashboard/projects" className="flex items-center justify-center gap-1.5 rounded-lg bg-phase-s py-2 text-xs font-medium text-bg hover:opacity-90 transition-opacity">
                Ver projetos <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
