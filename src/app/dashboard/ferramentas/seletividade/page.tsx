"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { verificarSeletividade } from "@/lib/calculadoras";

export default function SeletividadePage() {
  const [montante, setMontante] = useState("63");
  const [jusante, setJusante] = useState("32");

  const r = verificarSeletividade(Number(montante) || 1, Number(jusante) || 1);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Seletividade entre Disjuntores</h1>
      <p className="mt-1 text-sm text-muted">Verificação rápida (regra prática) se o disjuntor de montante coordena com o de jusante sem atuar junto.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Disjuntor de montante / geral (A)
          <input type="number" value={montante} onChange={(e) => setMontante(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Disjuntor de jusante / terminal (A)
          <input type="number" value={jusante} onChange={(e) => setJusante(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className={`mt-4 rounded-lg border p-5 text-center ${r.seletivo ? "border-ok/40 bg-ok/10" : "border-danger/40 bg-danger/10"}`}>
        <p className="text-xs text-muted">Razão montante/jusante: {r.razao.toFixed(2)}×</p>
        <p className={`mt-1 font-display text-xl font-bold ${r.seletivo ? "text-ok" : "text-danger"}`}>
          {r.seletivo ? "Provavelmente seletivo" : "Não seletivo — verificar curvas"}
        </p>
      </div>
      <p className="mt-3 text-xs text-muted">
        Regra prática conservadora (razão ≥ 1,6×). Seletividade real depende das curvas de disparo (B/C/D) e tempo de
        atuação de cada disjuntor — consulte as curvas do fabricante para confirmação definitiva.
      </p>
    </div>
  );
}
