"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularSistemaFotovoltaico } from "@/lib/calculadoras";

export default function FotovoltaicoPage() {
  const [consumo, setConsumo] = useState("400");
  const [hsp, setHsp] = useState("5");
  const [eficiencia, setEficiencia] = useState("80");
  const [potenciaPainel, setPotenciaPainel] = useState("550");

  const r = calcularSistemaFotovoltaico(Number(consumo) || 0, Number(hsp) || 5, (Number(eficiencia) || 80) / 100, Number(potenciaPainel) || 550);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Dimensionamento Fotovoltaico Básico</h1>
      <p className="mt-1 text-sm text-muted">Estimativa inicial de potência e número de painéis a partir do consumo mensal.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Consumo mensal (kWh)
          <input type="number" value={consumo} onChange={(e) => setConsumo(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Horas de sol pleno (HSP) na região
          <input type="number" step="0.1" value={hsp} onChange={(e) => setHsp(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Eficiência do sistema (%)
          <input type="number" value={eficiencia} onChange={(e) => setEficiencia(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Potência do painel (Wp)
          <input type="number" value={potenciaPainel} onChange={(e) => setPotenciaPainel(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Potência necessária</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{r.potenciaNecessariaKwp.toFixed(2)} kWp</p>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Nº de painéis</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{r.numeroDePaineis}</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Geração estimada/mês</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{r.geracaoEstimadaMensalKwh.toFixed(0)} kWh</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Estimativa inicial — o projeto definitivo deve considerar irradiação solar real do local, sombreamento, inclinação, orientação e perdas específicas do sistema.</p>
    </div>
  );
}
