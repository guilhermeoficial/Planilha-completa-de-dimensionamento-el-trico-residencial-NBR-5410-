"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { resistenciaSerie, resistenciaParalela, formatarOhms } from "@/lib/calculadoras";

export default function ResistenciaEquivalentePage() {
  const [tipo, setTipo] = useState<"serie" | "paralelo">("serie");
  const [resistores, setResistores] = useState<string[]>(["100", "220"]);

  const valores = resistores.map((r) => Number(r) || 0);
  const equivalente = tipo === "serie" ? resistenciaSerie(valores) : resistenciaParalela(valores);

  function atualizar(i: number, valor: string) {
    setResistores((rs) => rs.map((r, idx) => (idx === i ? valor : r)));
  }

  function adicionar() {
    setResistores((rs) => [...rs, ""]);
  }

  function remover(i: number) {
    setResistores((rs) => rs.filter((_, idx) => idx !== i));
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Resistência Equivalente</h1>
      <p className="mt-1 text-sm text-muted">Some resistores em série ou em paralelo, em qualquer quantidade.</p>

      <div className="mt-6 flex rounded-md border border-panel-border p-1 text-sm">
        <button
          onClick={() => setTipo("serie")}
          className={`flex-1 rounded-sm py-1.5 transition-colors ${tipo === "serie" ? "bg-accent text-bg font-medium" : "text-muted"}`}
        >
          Série
        </button>
        <button
          onClick={() => setTipo("paralelo")}
          className={`flex-1 rounded-sm py-1.5 transition-colors ${tipo === "paralelo" ? "bg-accent text-bg font-medium" : "text-muted"}`}
        >
          Paralelo
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {resistores.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 text-xs text-muted">R{i + 1}</span>
            <input
              type="number"
              value={r}
              onChange={(e) => atualizar(i, e.target.value)}
              placeholder="Ω"
              className="flex-1 rounded-md border border-panel-border bg-panel px-3 py-2 text-sm text-text"
            />
            <span className="text-xs text-muted">Ω</span>
            <button onClick={() => remover(i)} className="text-muted hover:text-danger" disabled={resistores.length <= 1}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button
          onClick={adicionar}
          className="flex items-center gap-1.5 rounded-md border border-dashed border-panel-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-text"
        >
          <Plus size={15} /> Adicionar resistor
        </button>
      </div>

      <div className="mt-5 rounded-lg border border-panel-border bg-bg-elevated p-5 text-center">
        <p className="text-xs text-muted">Resistência equivalente ({tipo === "serie" ? "série" : "paralelo"})</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">{formatarOhms(equivalente)}</p>
      </div>
    </div>
  );
}
