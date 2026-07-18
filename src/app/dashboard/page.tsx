"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, AmbienteRow, AmbienteTueRow, CircuitoRow, MotorRow } from "@/lib/types";
import { Plus, FolderOpen, Copy, Wrench, GraduationCap, ClipboardList, ArrowRight, Zap, BarChart3, Sparkles, BookOpen, Target } from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [projetos, setProjetos] = useState<ProjectRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [tensao, setTensao] = useState<127 | 220>(220);
  const [tipoEntrada, setTipoEntrada] = useState<"Monofásico" | "Bifásico" | "Trifásico">("Monofásico");
  const [concessionaria, setConcessionaria] = useState("COSERN");
  const [salvando, setSalvando] = useState(false);
  const [duplicando, setDuplicando] = useState<string | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    carregar();
    async function pegarUsuario() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        // Prioriza nome salvo no metadata, senão pega só o primeiro nome do email
        const nomeMeta = data.user.user_metadata?.nome;
        if (nomeMeta) {
          setNomeUsuario(nomeMeta.split(" ")[0]);
        } else {
          const emailNome = data.user.email?.split("@")[0] ?? "";
          // Remove números e underscores do final
          const limpo = emailNome.replace(/[_.\-]/g, " ").split(" ")[0];
          setNomeUsuario(limpo.charAt(0).toUpperCase() + limpo.slice(1));
        }
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
    const { error } = await supabase.from("projects").insert({
      nome, cliente, owner_id: userData.user.id,
      tensao_v: tensao,
      tipo_entrada: tipoEntrada,
      concessionaria: concessionaria,
    });
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

  const cards = [
    {
      id: "questoes",
      href: "/dashboard/cursos/questoes",
      modulo: "Módulo 01",
      titulo: "Simulados &\nQuestões",
      descricao: "Banco exclusivo com questões inéditas de Eletrotécnica, Eletrônica e Telecomunicações no padrão CESPE e CESGRANRIO.",
      cor: "accent",
      corHex: "#f2a33d",
      corBg: "rgba(242,163,61,0.08)",
      corBorder: "rgba(242,163,61,0.25)",
      corGlow: "rgba(242,163,61,0.15)",
      Icon: ClipboardList,
      features: [
        { Icon: Sparkles, text: "Questões inéditas exclusivas" },
        { Icon: Target,   text: "Gabarito comentado completo" },
        { Icon: BarChart3,text: "Estatísticas de desempenho" },
      ],
      cta: "Iniciar questões",
    },
    {
      id: "cursos",
      href: "/dashboard/cursos",
      modulo: "Módulo 02",
      titulo: "Cursos &\nMódulos",
      descricao: "Conteúdo aprofundado de Eletrotécnica, Eletrônica e Instrumentação com dicas interativas e equações renderizadas.",
      cor: "phase-t",
      corHex: "#4fb6e8",
      corBg: "rgba(79,182,232,0.08)",
      corBorder: "rgba(79,182,232,0.25)",
      corGlow: "rgba(79,182,232,0.15)",
      Icon: GraduationCap,
      features: [
        { Icon: BookOpen,    text: "5 módulos por área temática" },
        { Icon: Sparkles,    text: "Dicas visuais interativas" },
        { Icon: BarChart3,   text: "Progresso salvo automaticamente" },
      ],
      cta: "Ir para os cursos",
    },
  ];

  return (
    <div className="min-h-screen blueprint-grid">

      {/* ── Saudação ── */}
      <div className="px-8 pt-10 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Bem-vindo de volta</p>
        <h1 className="mt-1 font-display text-4xl font-bold">{nomeUsuario || "Voltis"} <span className="text-accent">.</span></h1>
        <p className="mt-1 text-sm text-muted">Por onde você quer começar hoje?</p>
      </div>

      {/* ── Grid principal ── */}
      <div className="grid grid-cols-1 gap-5 px-8 pb-8 md:grid-cols-3">

        {/* Cards de Questões e Cursos */}
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300"
            style={{
              borderColor: hoveredCard === card.id ? card.corHex : card.corBorder,
              background: hoveredCard === card.id ? card.corBg : "var(--panel)",
              boxShadow: hoveredCard === card.id ? `0 0 40px ${card.corGlow}, 0 8px 32px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {/* Gradiente de fundo sutil */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(ellipse at top left, ${card.corGlow} 0%, transparent 60%)` }}
            />

            <div className="relative flex flex-1 flex-col p-8">
              {/* Ícone */}
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: card.corBg, border: `1px solid ${card.corBorder}` }}
              >
                <card.Icon size={28} style={{ color: card.corHex }} />
              </div>

              {/* Label */}
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: card.corHex }}>
                {card.modulo}
              </p>

              {/* Título */}
              <h2 className="mt-2 font-display text-3xl font-bold leading-tight">
                {card.titulo.split("\n").map((linha, i) => (
                  <span key={i}>{linha}{i === 0 && <br />}</span>
                ))}
              </h2>

              {/* Descrição */}
              <p className="mt-4 text-sm leading-relaxed text-muted">{card.descricao}</p>

              {/* Features */}
              <div className="mt-6 space-y-2.5">
                {card.features.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs text-muted">
                    <Icon size={13} style={{ color: card.corHex }} className="shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-10 flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3" style={{ color: card.corHex }}>
                {card.cta} <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}

        {/* ─ Card Ferramentas ─ */}
        <div
          onMouseEnter={() => setHoveredCard("ferramentas")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300"
          style={{
            borderColor: hoveredCard === "ferramentas" ? "#f2c14e" : "rgba(242,193,78,0.25)",
            background: hoveredCard === "ferramentas" ? "rgba(242,193,78,0.08)" : "var(--panel)",
            boxShadow: hoveredCard === "ferramentas" ? "0 0 40px rgba(242,193,78,0.15), 0 8px 32px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              background: "radial-gradient(ellipse at top left, rgba(242,193,78,0.12) 0%, transparent 60%)",
              opacity: hoveredCard === "ferramentas" ? 1 : 0,
            }}
          />

          <div className="relative flex flex-1 flex-col p-8">
            {/* Ícone */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-phase-s/25 bg-phase-s/10 transition-transform duration-300 hover:scale-110">
              <Wrench size={28} className="text-phase-s" />
            </div>

            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-phase-s">Módulo 03</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight">
              Projetos &<br />Ferramentas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Dimensionamento NBR 5410, projetos elétricos completos e calculadoras técnicas para uso profissional.
            </p>

            {/* Projetos recentes */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-muted">Projetos recentes</p>
                <button onClick={() => setMostrarForm(v => !v)} className="flex items-center gap-1 text-xs font-medium text-phase-s hover:underline">
                  <Plus size={11} /> Novo
                </button>
              </div>

              {mostrarForm && (
                <form onSubmit={criarProjeto} className="mb-3 flex flex-col gap-2">
                  <input required placeholder="Nome do projeto" value={nome} onChange={e => setNome(e.target.value)} className="rounded-lg border border-panel-border bg-bg px-3 py-2 text-xs" />
                  <input placeholder="Cliente (opcional)" value={cliente} onChange={e => setCliente(e.target.value)} className="rounded-lg border border-panel-border bg-bg px-3 py-2 text-xs" />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-xs text-muted">Tensão</label>
                      <select value={tensao} onChange={e => setTensao(Number(e.target.value) as 127 | 220)} className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-xs">
                        <option value={127}>127 V</option>
                        <option value={220}>220 V</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted">Tipo de entrada</label>
                      <select value={tipoEntrada} onChange={e => setTipoEntrada(e.target.value as "Monofásico" | "Bifásico" | "Trifásico")} className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-xs">
                        <option value="Monofásico">Monofásico</option>
                        <option value="Bifásico">Bifásico</option>
                        <option value="Trifásico">Trifásico</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted">Concessionária</label>
                    <select value={concessionaria} onChange={e => setConcessionaria(e.target.value)} className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-xs">
                      <optgroup label="Nordeste">
                        <option value="COSERN">COSERN — Rio Grande do Norte</option>
                        <option value="CELPE">CELPE — Pernambuco</option>
                        <option value="COELBA">COELBA — Bahia</option>
                        <option value="CEAL">CEAL — Alagoas</option>
                        <option value="ENERGISA-PB">ENERGISA — Paraíba</option>
                        <option value="ENERGISA-SE">ENERGISA — Sergipe</option>
                        <option value="CEMAR">CEMAR — Maranhão</option>
                        <option value="CEPISA">CEPISA — Piauí</option>
                        <option value="COELCE">COELCE — Ceará</option>
                      </optgroup>
                      <optgroup label="Sudeste">
                        <option value="CEMIG">CEMIG — Minas Gerais</option>
                        <option value="LIGHT">LIGHT — Rio de Janeiro (capital)</option>
                        <option value="ENEL-RJ">ENEL — Rio de Janeiro (interior)</option>
                        <option value="ENEL-SP">ENEL — São Paulo</option>
                        <option value="CPFL">CPFL — São Paulo (interior)</option>
                        <option value="ESCELSA">ESCELSA — Espírito Santo</option>
                      </optgroup>
                      <optgroup label="Sul">
                        <option value="COPEL">COPEL — Paraná</option>
                        <option value="CELESC">CELESC — Santa Catarina</option>
                        <option value="RGE">RGE/CPFL — Rio Grande do Sul</option>
                        <option value="AES-SUL">AES Sul — Rio Grande do Sul</option>
                      </optgroup>
                      <optgroup label="Centro-Oeste / Norte">
                        <option value="CEB">CEB — Distrito Federal</option>
                        <option value="CELG">CELG — Goiás</option>
                        <option value="ENERGISA-MT">ENERGISA — Mato Grosso</option>
                        <option value="ENERSUL">ENERSUL — Mato Grosso do Sul</option>
                        <option value="CELPA">CELPA — Pará</option>
                        <option value="AMAZONAS-E">AMAZONAS ENERGIA — Amazonas</option>
                      </optgroup>
                    </select>
                  </div>
                  <button disabled={salvando} className="rounded-lg bg-phase-s px-3 py-2 text-xs font-medium text-bg hover:opacity-90 disabled:opacity-50">
                    {salvando ? "Criando..." : "Criar projeto"}
                  </button>
                </form>
              )}

              <div className="space-y-2">
                {carregando ? (
                  <p className="text-xs text-muted">Carregando...</p>
                ) : projetos.length === 0 ? (
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-panel-border p-4 text-xs text-muted">
                    <FolderOpen size={14} /> Nenhum projeto ainda.
                  </div>
                ) : (
                  projetos.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/dashboard/projects/${p.id}`}
                      className="flex items-center justify-between rounded-xl border border-panel-border bg-bg-elevated px-4 py-3 text-xs transition-all hover:border-phase-s/50 hover:bg-phase-s/5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{p.nome}</p>
                        <p className="mt-0.5 text-muted">{p.cliente || "Sem cliente"} · {p.tensao_v}V · {new Date(p.created_at).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <button onClick={e => duplicarProjeto(p, e)} disabled={duplicando === p.id} className="ml-2 shrink-0 rounded-lg p-1.5 text-muted hover:text-phase-s transition-colors">
                        <Copy size={13} />
                      </button>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
              <Link href="/dashboard/ferramentas" className="flex items-center justify-center gap-1.5 rounded-xl border border-panel-border py-2.5 text-xs font-medium text-muted transition-colors hover:border-phase-s hover:text-phase-s">
                <Zap size={12} /> Calculadoras
              </Link>
              <Link href="/dashboard/projects" className="flex items-center justify-center gap-1.5 rounded-xl bg-phase-s py-2.5 text-xs font-semibold text-bg hover:opacity-90 transition-opacity">
                Ver projetos <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
