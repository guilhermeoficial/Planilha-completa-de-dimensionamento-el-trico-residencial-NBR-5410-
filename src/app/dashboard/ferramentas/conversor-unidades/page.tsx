"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { converterPotencia } from "@/lib/calculadoras";

export default function ConversorUnidadesPage() {
  const [valor, setValor] = useState("10");
  const [unidade, setUnidade] = useState<"CV" | "HP" | "W" | "kW">("CV");

  const r = converterPotencia(Number(valor) || 0, unidade);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Conversor de Potência</h1>
      <p className="mt-1 text-sm text-muted">Converta entre CV, HP, W e kW — útil para motores e equipamentos.</p>

      <div className="mt-6 flex gap-3 rounded-lg border border-panel-border bg-panel p-5">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="flex-1 rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text"
        />
        <select
          value={unidade}
          onChange={(e) => setUnidade(e.target.value as typeof unidade)}
          className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text"
        >
          <option value="CV">CV</option>
          <option value="HP">HP</option>
          <option value="W">W</option>
          <option value="kW">kW</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "CV", valor: r.cv },
          { label: "HP", valor: r.hp },
          { label: "W", valor: r.w },
          { label: "kW", valor: r.kw },
        ].map((u) => (
          <div key={u.label} className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
            <p className="text-xs text-muted">{u.label}</p>
            <p className="tabular mt-1 font-display text-lg font-bold">{u.valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted">1 CV ≈ 735,5 W · 1 HP ≈ 745,7 W (valores de referência, pequenas variações conforme a norma adotada).</p>
    </div>
  );
}
