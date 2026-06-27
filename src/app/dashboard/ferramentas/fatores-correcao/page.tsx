"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fatorCorrecaoTemperatura, fatorAgrupamento } from "@/lib/calculadoras";

export default function FatoresCorrecaoPage() {
  const [temp, setTemp] = useState("30");
  const [isolacao, setIsolacao] = useState<"PVC" | "EPR">("PVC");
  const [circuitos, setCircuitos] = useState("3");
  const [correnteBase, setCorrenteBase] = useState("20");

  const fct = fatorCorrecaoTemperatura(Number(temp) || 30, isolacao);
  const fca = fatorAgrupamento(Number(circuitos) || 1);
  const fatorTotal = fct * fca;
  const correnteCorrigida = (Number(correnteBase) || 0) / fatorTotal;

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Fatores de Correção (FCT/FCA)</h1>
      <p className="mt-1 text-sm text-muted">Ajuste a corrente admissível do cabo pela temperatura ambiente e pelo agrupamento de circuitos.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Temperatura ambiente (°C)
          <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Isolação do cabo
          <select value={isolacao} onChange={(e) => setIsolacao(e.target.value as "PVC" | "EPR")} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
            <option value="PVC">PVC (70°C)</option>
            <option value="EPR">EPR/XLPE (90°C)</option>
          </select>
        </label>
        <label className="text-xs text-muted">
          Nº de circuitos agrupados
          <input type="number" value={circuitos} onChange={(e) => setCircuitos(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Corrente de projeto Ib (A)
          <input type="number" value={correnteBase} onChange={(e) => setCorrenteBase(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">FCT</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{fct.toFixed(3)}</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">FCA</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{fca.toFixed(3)}</p>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Ib corrigida</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{correnteCorrigida.toFixed(2)} A</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Ib corrigida = Ib ÷ (FCT × FCA) — use esse valor para escolher a seção do cabo pela tabela de ampacidade.</p>
    </div>
  );
}
