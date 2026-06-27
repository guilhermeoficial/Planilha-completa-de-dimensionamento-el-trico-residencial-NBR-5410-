"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularAutonomiaBateria } from "@/lib/calculadoras";

export default function AutonomiaBateriaPage() {
  const [capacidade, setCapacidade] = useState("100");
  const [tensao, setTensao] = useState("12");
  const [potencia, setPotencia] = useState("300");
  const [eficiencia, setEficiencia] = useState("85");

  const horas = calcularAutonomiaBateria(Number(capacidade) || 0, Number(tensao) || 0, Number(potencia) || 1, (Number(eficiencia) || 85) / 100);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Autonomia de Bateria / No-break</h1>
      <p className="mt-1 text-sm text-muted">Estime por quanto tempo uma bateria sustenta uma determinada carga.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Capacidade da bateria (Ah)
          <input type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Tensão da bateria (V)
          <input type="number" value={tensao} onChange={(e) => setTensao(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Potência da carga (W)
          <input type="number" value={potencia} onChange={(e) => setPotencia(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Eficiência do inversor (%)
          <input type="number" value={eficiencia} onChange={(e) => setEficiencia(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
        <p className="text-xs text-muted">Autonomia estimada</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">
          {horas >= 1 ? `${horas.toFixed(2)} horas` : `${(horas * 60).toFixed(0)} minutos`}
        </p>
      </div>
    </div>
  );
}
