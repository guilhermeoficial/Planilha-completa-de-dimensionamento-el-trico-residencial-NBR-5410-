"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularRetangulo, calcularCirculo, calcularTrianguloRetangulo } from "@/lib/calculadoras";

export default function AreaPerimetroPage() {
  const [forma, setForma] = useState<"retangulo" | "circulo" | "triangulo">("retangulo");
  const [a, setA] = useState("4");
  const [b, setB] = useState("3");

  const resultado =
    forma === "retangulo"
      ? calcularRetangulo(Number(a) || 0, Number(b) || 0)
      : forma === "circulo"
      ? calcularCirculo(Number(a) || 0)
      : calcularTrianguloRetangulo(Number(a) || 0, Number(b) || 0);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Área e Perímetro</h1>
      <p className="mt-1 text-sm text-muted">Calcule área e perímetro de formas comuns — útil para cadastrar ambientes irregulares.</p>

      <div className="mt-6 flex rounded-md border border-panel-border p-1 text-sm">
        {([
          ["retangulo", "Retângulo"],
          ["circulo", "Círculo"],
          ["triangulo", "Triângulo retângulo"],
        ] as const).map(([key, label]) => (
          <button key={key} onClick={() => setForma(key)} className={`flex-1 rounded-sm py-1.5 ${forma === key ? "bg-accent text-bg font-medium" : "text-muted"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          {forma === "circulo" ? "Raio (m)" : forma === "triangulo" ? "Base (m)" : "Largura (m)"}
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        {forma !== "circulo" && (
          <label className="text-xs text-muted">
            {forma === "triangulo" ? "Altura (m)" : "Comprimento (m)"}
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
          </label>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Área</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{resultado.area.toFixed(2)} m²</p>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Perímetro</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{resultado.perimetro.toFixed(2)} m</p>
        </div>
      </div>
    </div>
  );
}
