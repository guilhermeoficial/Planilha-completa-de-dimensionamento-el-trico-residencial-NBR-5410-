"use client";

import { useState } from "react";
import { Gauge, FileSignature } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { calcularResumoDemanda, type TipoEntrada, type CircuitoCalculado, type BalancoFases } from "@/lib/nbr5410";
import type { ProjectRow } from "@/lib/types";
import BalancoCard from "./balanco-card";

interface Props {
  project: ProjectRow;
  circuitosCalculados: CircuitoCalculado[];
  balanco: BalancoFases;
  onProjectChange: (patch: Partial<ProjectRow>) => void;
}

const TIPOS_ENTRADA: TipoEntrada[] = ["Monofásico", "Bifásico", "Trifásico"];

export default function ResumoTab({ project, circuitosCalculados, balanco, onProjectChange }: Props) {
  const supabase = createClient();
  const [salvando, setSalvando] = useState(false);

  const resumo = calcularResumoDemanda(circuitosCalculados, project.tensao_v, project.tipo_entrada);

  async function atualizar(patch: Partial<ProjectRow>) {
    setSalvando(true);
    onProjectChange(patch);
    await supabase.from("projects").update(patch).eq("id", project.id);
    setSalvando(false);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-panel-border bg-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-sm font-semibold">
              <Gauge size={16} className="text-accent" /> Demanda geral & entrada
            </p>
            <select
              value={project.tipo_entrada}
              onChange={(e) => atualizar({ tipo_entrada: e.target.value as TipoEntrada })}
              className="rounded-md border border-panel-border bg-bg px-2 py-1 text-xs"
            >
              {TIPOS_ENTRADA.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <dl className="space-y-2.5 text-sm">
            <Linha label="Carga instalada total" valor={`${Math.round(resumo.cargaInstaladaW).toLocaleString("pt-BR")} W`} />
            <Linha label="Corrente de entrada estimada" valor={`${resumo.correnteEntradaA.toFixed(1)} A`} />
            <Linha label="Disjuntor geral recomendado" valor={`${resumo.disjuntorGeralA} A`} destaque />
            <Linha label="Tipo de entrada sugerido pela carga" valor={resumo.tipoEntradaSugerido} />
          </dl>

          <p className="mt-4 text-xs text-muted">
            Estimativa simplificada (soma da carga ativa instalada + margem de segurança de 15%), sem aplicar
            fatores de demanda por tipo de carga (NBR 5410/14039). Use como ponto de partida e confirme o
            padrão de entrada definitivo com as normas técnicas da concessionária local.
          </p>
        </div>

        <BalancoCard balanco={balanco} />
      </div>

      <div className="rounded-lg border border-panel-border bg-panel p-5">
        <p className="mb-4 flex items-center gap-2 font-display text-sm font-semibold">
          <FileSignature size={16} className="text-accent" /> Responsável técnico (ART/RRT)
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-muted">
            Nome do responsável
            <input
              defaultValue={project.responsavel_tecnico ?? ""}
              onBlur={(e) => e.target.value !== (project.responsavel_tecnico ?? "") && atualizar({ responsavel_tecnico: e.target.value })}
              placeholder="Eng. João da Silva"
              className="mt-1 w-full rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Registro profissional
            <input
              defaultValue={project.registro_profissional ?? ""}
              onBlur={(e) => e.target.value !== (project.registro_profissional ?? "") && atualizar({ registro_profissional: e.target.value })}
              placeholder="CREA-SP 000000/D"
              className="mt-1 w-full rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Número da ART/RRT
            <input
              defaultValue={project.numero_art ?? ""}
              onBlur={(e) => e.target.value !== (project.numero_art ?? "") && atualizar({ numero_art: e.target.value })}
              placeholder="SP00000000000000"
              className="mt-1 w-full rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm text-text"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-muted">
          Esses dados aparecem automaticamente no cabeçalho do relatório em PDF.{salvando ? " Salvando..." : ""}
        </p>
      </div>
    </div>
  );
}

function Linha({ label, valor, destaque }: { label: string; valor: string; destaque?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-panel-border/60 pb-2 last:border-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className={`tabular ${destaque ? "text-base font-semibold text-accent" : ""}`}>{valor}</dd>
    </div>
  );
}
