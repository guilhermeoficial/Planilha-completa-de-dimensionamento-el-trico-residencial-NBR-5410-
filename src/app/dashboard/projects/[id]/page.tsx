"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, AmbienteRow, AmbienteTueRow, CircuitoRow, MotorRow } from "@/lib/types";
import { calcularMemorial, calcularBalanco, calcularResumoDemanda, type Circuito } from "@/lib/nbr5410";
import { calcularOrcamento, PRECOS_PADRAO, type PrecosReferencia } from "@/lib/comercial";
import AmbientesTab from "./ambientes-tab";
import CircuitosTab from "./circuitos-tab";
import MemorialCalculoTab from "./memorial-calculo-tab";
import OrcamentoCard from "./orcamento-card";
import MotoresTab from "./motores-tab";
import ExportButtons from "./export-buttons";
import ResumoTab from "./resumo-tab";

type Tab = "resumo" | "ambientes" | "circuitos" | "memorial" | "orcamento" | "industrial";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("resumo");
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [ambientes, setAmbientes] = useState<AmbienteRow[]>([]);
  const [tuesPorAmbiente, setTuesPorAmbiente] = useState<Record<string, AmbienteTueRow[]>>({});
  const [circuitos, setCircuitos] = useState<CircuitoRow[]>([]);
  const [motores, setMotores] = useState<MotorRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [precos, setPrecos] = useState<PrecosReferencia>(PRECOS_PADRAO);

  // ── Edição de nome e cliente ──────────────────────────────────────────────
  const [editando, setEditando] = useState(false);
  const [nomeEdit, setNomeEdit] = useState("");
  const [clienteEdit, setClienteEdit] = useState("");
  const [salvandoEdit, setSalvandoEdit] = useState(false);

  function abrirEdicao() {
    if (!project) return;
    setNomeEdit(project.nome);
    setClienteEdit(project.cliente || "");
    setEditando(true);
  }

  function cancelarEdicao() {
    setEditando(false);
  }

  async function salvarEdicao() {
    if (!project || !nomeEdit.trim()) return;
    setSalvandoEdit(true);
    await supabase.from("projects").update({ nome: nomeEdit.trim(), cliente: clienteEdit.trim() }).eq("id", project.id);
    setProject({ ...project, nome: nomeEdit.trim(), cliente: clienteEdit.trim() });
    setSalvandoEdit(false);
    setEditando(false);
  }

  const carregar = useCallback(async () => {
    const projectId = params.id;
    const [{ data: proj }, { data: amb }, { data: circ }, { data: mot }] = await Promise.all([
      supabase.from("projects").select("*").eq("id", projectId).single(),
      supabase.from("ambientes").select("*").eq("project_id", projectId).order("ordem"),
      supabase.from("circuitos").select("*").eq("project_id", projectId).order("numero"),
      supabase.from("motores").select("*").eq("project_id", projectId).order("created_at"),
    ]);
    setProject(proj as ProjectRow);
    setAmbientes((amb as AmbienteRow[]) ?? []);
    setCircuitos((circ as CircuitoRow[]) ?? []);
    setMotores((mot as MotorRow[]) ?? []);

    const precosSalvos = (proj as ProjectRow | null)?.precos_json;
    if (precosSalvos && Object.keys(precosSalvos).length > 0) {
      setPrecos({ ...PRECOS_PADRAO, ...precosSalvos } as PrecosReferencia);
    }

    const ambienteIds = (amb as AmbienteRow[] | null)?.map((a) => a.id) ?? [];
    if (ambienteIds.length) {
      const { data: tues } = await supabase.from("ambiente_tues").select("*").in("ambiente_id", ambienteIds);
      const agrupado: Record<string, AmbienteTueRow[]> = {};
      for (const t of (tues as AmbienteTueRow[]) ?? []) {
        agrupado[t.ambiente_id] = [...(agrupado[t.ambiente_id] ?? []), t];
      }
      setTuesPorAmbiente(agrupado);
    } else {
      setTuesPorAmbiente({});
    }
    setCarregando(false);
  }, [params.id, supabase]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const circuitosCalculados = useMemo(() => {
    const entrada: Circuito[] = circuitos.map((c) => ({
      id: c.id,
      numero: c.numero,
      descricao: c.descricao,
      tipo: c.tipo,
      tensaoV: c.tensao_v,
      fp: Number(c.fp),
      fase: c.fase,
      potenciaVA: Number(c.potencia_va),
      comprimentoM: Number(c.comprimento_m),
      isolacao: c.isolacao,
    }));
    return calcularMemorial(entrada);
  }, [circuitos]);

  const balanco = useMemo(
    () => calcularBalanco(circuitosCalculados.map((c) => ({ fase: c.fase, potenciaW: c.potenciaW }))),
    [circuitosCalculados]
  );

  const resumoDemanda = useMemo(
    () => calcularResumoDemanda(circuitosCalculados, project?.tensao_v ?? 220, project?.tipo_entrada ?? "Monofásico"),
    [circuitosCalculados, project?.tensao_v, project?.tipo_entrada]
  );

  const orcamento = useMemo(
    () => calcularOrcamento(circuitosCalculados, precos, project?.dps_quantidade ?? 1),
    [circuitosCalculados, precos, project?.dps_quantidade]
  );

  async function salvarPrecos(novosPrecos: PrecosReferencia) {
    setPrecos(novosPrecos);
    if (project) await supabase.from("projects").update({ precos_json: novosPrecos }).eq("id", project.id);
  }

  async function salvarDpsQuantidade(qtd: number) {
    if (!project) return;
    setProject({ ...project, dps_quantidade: qtd });
    await supabase.from("projects").update({ dps_quantidade: qtd }).eq("id", project.id);
  }

  if (carregando) {
    return <div className="px-6 py-10 text-sm text-muted">Carregando projeto...</div>;
  }

  if (!project) {
    return <div className="px-6 py-10 text-sm text-muted">Projeto não encontrado.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Projetos
      </Link>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {editando ? (
            <div className="flex flex-col gap-2">
              <input
                autoFocus
                value={nomeEdit}
                onChange={e => setNomeEdit(e.target.value)}
                placeholder="Nome do projeto"
                className="font-display text-2xl font-bold bg-transparent border-b-2 border-accent outline-none w-full"
              />
              <input
                value={clienteEdit}
                onChange={e => setClienteEdit(e.target.value)}
                placeholder="Nome do cliente"
                className="text-sm text-muted bg-transparent border-b border-panel-border outline-none w-full"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={salvarEdicao}
                  disabled={salvandoEdit || !nomeEdit.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-bg hover:opacity-90 disabled:opacity-50"
                >
                  <Check size={13}/> {salvandoEdit ? "Salvando..." : "Salvar"}
                </button>
                <button
                  onClick={cancelarEdicao}
                  className="flex items-center gap-1.5 rounded-lg border border-panel-border px-3 py-1.5 text-xs text-muted hover:text-text"
                >
                  <X size={13}/> Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="group flex items-start gap-2">
              <div>
                <h1 className="font-display text-2xl font-bold">{project.nome}</h1>
                <p className="mt-1 text-sm text-muted">{project.cliente || "Sem cliente vinculado"} · {project.tensao_v}V</p>
              </div>
              <button
                onClick={abrirEdicao}
                className="mt-1 rounded-lg p-1.5 text-muted opacity-0 group-hover:opacity-100 hover:text-accent hover:bg-accent/10 transition-all"
                title="Editar nome e cliente"
              >
                <Pencil size={14}/>
              </button>
            </div>
          )}
        </div>
        <ExportButtons
          project={project}
          ambientes={ambientes}
          circuitosCalculados={circuitosCalculados}
          circuitosOriginais={circuitos}
          orcamentoItens={orcamento.itens}
          orcamentoTotal={orcamento.total}
          motores={motores}
          balanco={balanco}
          resumoDemanda={resumoDemanda}
        />
      </div>

      <div className="mb-6 flex gap-1 border-b border-panel-border overflow-x-auto">
        {([
          ["resumo", "Resumo"],
          ["ambientes", "Ambientes & cargas"],
          ["circuitos", "Circuitos & memorial"],
          ["memorial", "Memorial de cálculo"],
          ["orcamento", "Orçamento"],
          ["industrial", "Industrial / Extra"],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative whitespace-nowrap px-4 py-2.5 text-sm transition-colors ${tab === key ? "text-text" : "text-muted hover:text-text"}`}
          >
            {label}
            {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
          </button>
        ))}
      </div>

      {tab === "resumo" && (
        <ResumoTab
          project={project}
          circuitosCalculados={circuitosCalculados}
          balanco={balanco}
          onProjectChange={(patch) => setProject({ ...project, ...patch })}
        />
      )}
      {tab === "ambientes" && (
        <AmbientesTab projectId={project.id} ambientes={ambientes} tuesPorAmbiente={tuesPorAmbiente} onChange={carregar} />
      )}
      {tab === "circuitos" && (
        <CircuitosTab
          projectId={project.id}
          tensaoV={project.tensao_v}
          tipoEntrada={project.tipo_entrada ?? "Monofásico"}
          circuitos={circuitos}
          ambientes={ambientes}
          tuesPorAmbiente={tuesPorAmbiente}
          onChange={carregar}
        />
      )}
      {tab === "memorial" && (
        <MemorialCalculoTab
          project={project}
          ambientes={ambientes}
          circuitosCalculados={circuitosCalculados}
          circuitosOriginais={circuitos}
          resumoDemanda={resumoDemanda}
          balanco={balanco}
        />
      )}
      {tab === "orcamento" && (
        <OrcamentoCard
          circuitos={circuitosCalculados}
          dpsQuantidade={project.dps_quantidade}
          onDpsChange={salvarDpsQuantidade}
          precos={precos}
          onPrecosChange={salvarPrecos}
        />
      )}
      {tab === "industrial" && (
        <MotoresTab projectId={project.id} motores={motores} capacitorPorKvar={precos.capacitorPorKvar} onChange={carregar} />
      )}
    </div>
  );
}
