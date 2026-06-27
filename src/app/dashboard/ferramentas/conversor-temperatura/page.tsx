"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { converterTemperatura } from "@/lib/calculadoras";

export default function ConversorTemperaturaPage() {
  const [valor, setValor] = useState("30");
  const [unidade, setUnidade] = useState<"C" | "F" | "K">("C");

  const r = converterTemperatura(Number(valor) || 0, unidade);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Conversor de Temperatura</h1>
      <p className="mt-1 text-sm text-muted">Converta entre Celsius, Fahrenheit e Kelvin — útil em fatores de correção de cabos.</p>

      <div className="mt-6 flex gap-3 rounded-lg border border-panel-border bg-panel p-5">
        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="flex-1 rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        <select value={unidade} onChange={(e) => setUnidade(e.target.value as typeof unidade)} className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
          <option value="C">°C</option>
          <option value="F">°F</option>
          <option value="K">K</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Celsius</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{r.c.toFixed(1)}°C</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Fahrenheit</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{r.f.toFixed(1)}°F</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Kelvin</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{r.k.toFixed(1)} K</p>
        </div>
      </div>
    </div>
  );
}
