"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularDemandaIluminacaoTUG } from "@/lib/calculadoras";

export default function FatorDemandaPage() {
  const [potencia, setPotencia] = useState("8000");
  const r = calcularDemandaIluminacaoTUG(Number(potencia) || 0);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Fator de Demanda (Iluminação + TUG)</h1>
      <p className="mt-1 text-sm text-muted">
        Aplica a tabela clássica de fator de demanda por faixas progressivas de potência instalada, usada para estimar a
        demanda real de iluminação e tomadas de uso geral em unidades residenciais.
      </p>

      <div className="mt-6 rounded-lg border border-panel-border bg-panel p-5">
        <label className="text-xs text-muted">
          Potência total instalada (iluminação + TUG, em VA)
          <input type="number" value={potencia} onChange={(e) => setPotencia(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Demanda estimada</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{Math.round(r.demandaVA).toLocaleString("pt-BR")} VA</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Fator de demanda médio</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{r.percentualMedio.toFixed(1)}%</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        Tabela aplicada em faixas progressivas (cada faixa de VA tem seu próprio percentual, somando-se ao final) — referência
        clássica (Creder) usada na prática profissional. Para projetos formais, confira a tabela vigente da concessionária local.
      </p>
    </div>
  );
}
