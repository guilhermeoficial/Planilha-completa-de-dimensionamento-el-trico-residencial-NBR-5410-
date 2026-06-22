"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  calcularPrevisaoCarga,
  BANCO_TUES_PADRAO,
  type Ambiente,
  type TipoAmbiente,
} from "@/lib/nbr5410";
import type { AmbienteRow, AmbienteTueRow } from "@/lib/types";
import ImportarPlanilha from "./importar-planilha";

const TIPOS: TipoAmbiente[] = ["Social/Quarto", "Serviço/Cozinha", "Banheiro", "Varanda/Externo"];
const CATEGORIAS_TUE = Array.from(new Set(BANCO_TUES_PADRAO.map((t) => t.categoria)));

interface Props {
  projectId: string;
  ambientes: AmbienteRow[];
  tuesPorAmbiente: Record<string, AmbienteTueRow[]>;
  onChange: () => void;
}

export default function AmbientesTab({ projectId, ambientes, tuesPorAmbiente, onChange }: Props) {
  const supabase = createClient();
  const [expandido, setExpandido] = useState<string | null>(null);
  const [novo, setNovo] = useState({ nome: "", tipo: "Social/Quarto" as TipoAmbiente, area_m2: "", perimetro_m: "" });

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    if (!novo.nome) return;
    await supabase.from("ambientes").insert({
      project_id: projectId,
      nome: novo.nome,
      tipo: novo.tipo,
      area_m2: Number(novo.area_m2) || 0,
      perimetro_m: Number(novo.perimetro_m) || 0,
      ordem: ambientes.length,
    });
    setNovo({ nome: "", tipo: "Social/Quarto", area_m2: "", perimetro_m: "" });
    onChange();
  }

  async function atualizar(id: string, patch: Partial<AmbienteRow>) {
    await supabase.from("ambientes").update(patch).eq("id", id);
    onChange();
  }

  async function remover(id: string) {
    await supabase.from("ambientes").delete().eq("id", id);
    onChange();
  }

  async function adicionarTue(ambienteId: string, nome: string, potenciaW: number, fp: number) {
    await supabase.from("ambiente_tues").insert({ ambiente_id: ambienteId, nome, potencia_w: potenciaW, fp, quantidade: 1 });
    onChange();
  }

  async function removerTue(id: string) {
    await supabase.from("ambiente_tues").delete().eq("id", id);
    onChange();
  }

  return (
    <div>
      <div className="mb-3">
        <ImportarPlanilha projectId={projectId} ordemInicial={ambientes.length} onImported={onChange} />
      </div>
      <form onSubmit={criar} className="mb-5 grid gap-2 rounded-lg border border-panel-border bg-panel p-4 sm:grid-cols-[1.3fr_1fr_0.7fr_0.7fr_auto]">
        <input
          placeholder="Nome do ambiente"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
          className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
        />
        <select
          value={novo.tipo}
          onChange={(e) => setNovo({ ...novo, tipo: e.target.value as TipoAmbiente })}
          className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          placeholder="Área (m²)"
          type="number"
          step="0.1"
          value={novo.area_m2}
          onChange={(e) => setNovo({ ...novo, area_m2: e.target.value })}
          className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
        />
        <input
          placeholder="Perímetro (m)"
          type="number"
          step="0.1"
          value={novo.perimetro_m}
          onChange={(e) => setNovo({ ...novo, perimetro_m: e.target.value })}
          className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
        />
        <button className="flex items-center justify-center gap-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity">
          <Plus size={15} /> Adicionar
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border border-panel-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-2.5">Ambiente</th>
              <th className="px-4 py-2.5">Tipo</th>
              <th className="px-4 py-2.5">Área</th>
              <th className="px-4 py-2.5">Perímetro</th>
              <th className="px-4 py-2.5">Pts. Luz</th>
              <th className="px-4 py-2.5">Ilum. (VA)</th>
              <th className="px-4 py-2.5">TUG (VA)</th>
              <th className="px-4 py-2.5">TUEs (W)</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {ambientes.map((a) => {
              const tues = tuesPorAmbiente[a.id] ?? [];
              const ambienteCalc: Ambiente = {
                id: a.id,
                nome: a.nome,
                tipo: a.tipo,
                areaM2: Number(a.area_m2),
                perimetroM: Number(a.perimetro_m),
                pontosLuzManual: a.pontos_luz_manual,
                tuesVinculados: tues.map((t) => ({ tueNome: t.nome, potenciaW: Number(t.potencia_w), fp: Number(t.fp), quantidade: t.quantidade })),
              };
              const previsao = calcularPrevisaoCarga(ambienteCalc);
              const aberto = expandido === a.id;
              return (
                <React.Fragment key={a.id}>
                  <tr key={a.id} className="border-t border-panel-border">
                    <td className="px-4 py-2.5">
                      <input
                        defaultValue={a.nome}
                        onBlur={(e) => e.target.value !== a.nome && e.target.value && atualizar(a.id, { nome: e.target.value })}
                        className="w-32 rounded border border-transparent bg-transparent px-1 py-0.5 font-medium hover:border-panel-border focus:border-accent focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <select
                        value={a.tipo}
                        onChange={(e) => atualizar(a.id, { tipo: e.target.value as TipoAmbiente })}
                        className="rounded border border-transparent bg-transparent px-1 py-0.5 text-muted hover:border-panel-border focus:border-accent focus:outline-none"
                      >
                        {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="number"
                        step="0.1"
                        defaultValue={a.area_m2}
                        onBlur={(e) => Number(e.target.value) !== Number(a.area_m2) && atualizar(a.id, { area_m2: Number(e.target.value) })}
                        className="tabular w-16 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                      /> m²
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="number"
                        step="0.1"
                        defaultValue={a.perimetro_m}
                        onBlur={(e) => Number(e.target.value) !== Number(a.perimetro_m) && atualizar(a.id, { perimetro_m: Number(e.target.value) })}
                        className="tabular w-16 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                      /> m
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="number"
                        min={1}
                        defaultValue={previsao.pontosLuzMin}
                        title="Quantidade de pontos de luz (editável)"
                        onBlur={(e) => {
                          const v = Number(e.target.value);
                          if (v !== previsao.pontosLuzMin) atualizar(a.id, { pontos_luz_manual: v || null });
                        }}
                        className="tabular w-12 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                      />
                    </td>
                    <td className="tabular px-4 py-2.5">{previsao.potIluminacaoVA}</td>
                    <td className="tabular px-4 py-2.5">{previsao.potTugVA}</td>
                    <td className="tabular px-4 py-2.5">{previsao.potTueW}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button onClick={() => setExpandido(aberto ? null : a.id)} className="mr-2 text-muted hover:text-text">
                        {aberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <button onClick={() => remover(a.id)} className="text-muted hover:text-danger">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                  {aberto && (
                    <tr className="border-t border-panel-border bg-bg-elevated/50">
                      <td colSpan={9} className="px-4 py-3">
                        <p className="mb-2 text-xs text-muted">Equipamentos de uso específico (TUEs) vinculados a {a.nome}</p>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {tues.map((t) => (
                            <span key={t.id} className="flex items-center gap-1.5 rounded-full border border-panel-border bg-panel px-3 py-1 text-xs">
                              {t.nome} · {t.potencia_w}W
                              <button onClick={() => removerTue(t.id)} className="text-muted hover:text-danger">×</button>
                            </span>
                          ))}
                          {tues.length === 0 && <span className="text-xs text-muted">Nenhum equipamento vinculado.</span>}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              if (!e.target.value) return;
                              const tue = BANCO_TUES_PADRAO.find((t) => t.nome === e.target.value);
                              if (tue) adicionarTue(a.id, tue.nome, tue.potenciaW, tue.fp);
                              e.target.value = "";
                            }}
                            className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs"
                          >
                            <option value="">+ Adicionar do banco de cargas...</option>
                            {CATEGORIAS_TUE.map((cat) => (
                              <optgroup key={cat} label={cat}>
                                {BANCO_TUES_PADRAO.filter((t) => t.categoria === cat).map((t) => (
                                  <option key={t.nome} value={t.nome}>{t.nome} ({t.potenciaW}W)</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <CustomTueForm onAdd={(nome, w, fp) => adicionarTue(a.id, nome, w, fp)} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {ambientes.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-muted">
                  Nenhum ambiente cadastrado. Adicione os cômodos do projeto acima.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomTueForm({ onAdd }: { onAdd: (nome: string, potenciaW: number, fp: number) => void }) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [potencia, setPotencia] = useState("");
  const [fp, setFp] = useState("1");

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="rounded-md border border-dashed border-panel-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-text"
      >
        + Equipamento personalizado
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!nome || !potencia) return;
        onAdd(nome, Number(potencia), Number(fp) || 1);
        setNome("");
        setPotencia("");
        setFp("1");
        setAberto(false);
      }}
      className="flex flex-wrap items-center gap-1.5"
    >
      <input
        autoFocus
        placeholder="Nome do equipamento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-44 rounded-md border border-panel-border bg-bg px-2 py-1.5 text-xs"
      />
      <input
        type="number"
        placeholder="Potência (W)"
        value={potencia}
        onChange={(e) => setPotencia(e.target.value)}
        className="w-28 rounded-md border border-panel-border bg-bg px-2 py-1.5 text-xs"
      />
      <input
        type="number"
        step="0.01"
        max={1}
        placeholder="FP"
        value={fp}
        onChange={(e) => setFp(e.target.value)}
        className="w-16 rounded-md border border-panel-border bg-bg px-2 py-1.5 text-xs"
      />
      <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-bg hover:opacity-90">Adicionar</button>
      <button type="button" onClick={() => setAberto(false)} className="text-xs text-muted hover:text-text">Cancelar</button>
    </form>
  );
}
