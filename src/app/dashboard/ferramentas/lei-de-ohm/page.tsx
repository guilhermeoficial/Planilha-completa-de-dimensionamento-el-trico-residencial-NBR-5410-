"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { calcularLeiDeOhm } from "@/lib/calculadoras";

type Campo = "tensaoV" | "correnteA" | "resistenciaOhm" | "potenciaW";

const CAMPOS: { key: Campo; label: string; unidade: string }[] = [
  { key: "tensaoV", label: "Tensão (V)", unidade: "V" },
  { key: "correnteA", label: "Corrente (I)", unidade: "A" },
  { key: "resistenciaOhm", label: "Resistência (R)", unidade: "Ω" },
  { key: "potenciaW", label: "Potência (P)", unidade: "W" },
];

export default function LeiDeOhmPage() {
  const [valores, setValores] = useState<Record<Campo, string>>({
    tensaoV: "220",
    correnteA: "10",
    resistenciaOhm: "",
    potenciaW: "",
  });

  const preenchidos = CAMPOS.filter((c) => valores[c.key].trim() !== "");
  const entrada =
    preenchidos.length >= 2
      ? Object.fromEntries(preenchidos.slice(0, 2).map((c) => [c.key, Number(valores[c.key])]))
      : null;
  const resultado = entrada ? calcularLeiDeOhm(entrada) : null;

  function atualizar(campo: Campo, valor: string) {
    setValores((v) => ({ ...v, [campo]: valor }));
  }

  function limpar() {
    setValores({ tensaoV: "", correnteA: "", resistenciaOhm: "", potenciaW: "" });
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <div className="mb-1 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Lei de Ohm & Potência</h1>
        <button onClick={limpar} className="flex items-center gap-1 text-xs text-muted hover:text-text">
          <RotateCcw size={13} /> Limpar
        </button>
      </div>
      <p className="mt-1 text-sm text-muted">Preencha quaisquer 2 campos — os outros são calculados automaticamente.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        {CAMPOS.map((c) => {
          const calculado = resultado && valores[c.key].trim() === "";
          return (
            <label key={c.key} className="text-xs text-muted">
              {c.label}
              <input
                type="number"
                value={calculado ? resultado![c.key].toFixed(4).replace(/\.?0+$/, "") : valores[c.key]}
                onChange={(e) => atualizar(c.key, e.target.value)}
                placeholder="—"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  calculado ? "border-accent/40 bg-accent/10 text-accent" : "border-panel-border bg-bg text-text"
                }`}
              />
            </label>
          );
        })}
      </div>

      {!resultado && preenchidos.length < 2 && (
        <p className="mt-4 text-sm text-muted">Informe pelo menos 2 grandezas para calcular as demais.</p>
      )}
    </div>
  );
}
