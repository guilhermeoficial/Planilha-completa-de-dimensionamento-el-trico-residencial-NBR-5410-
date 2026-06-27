"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularPerdaJoule } from "@/lib/calculadoras";
import { TABELA_CABOS } from "@/lib/nbr5410";

export default function PerdaJoulePage() {
  const [corrente, setCorrente] = useState("20");
  const [secao, setSecao] = useState(2.5);
  const [comprimento, setComprimento] = useState("30");
  const [trifasico, setTrifasico] = useState(false);

  const linha = TABELA_CABOS.find((l) => l.bitola === secao) ?? TABELA_CABOS[0];
  const perdaW = calcularPerdaJoule(Number(corrente) || 0, linha.r, Number(comprimento) || 0, trifasico);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Perda por Efeito Joule</h1>
      <p className="mt-1 text-sm text-muted">Calcule a potência dissipada em calor num trecho de cabo (P = I² × R).</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Corrente (A)
          <input type="number" value={corrente} onChange={(e) => setCorrente(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Seção do cabo (mm²)
          <select value={secao} onChange={(e) => setSecao(Number(e.target.value))} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
            {TABELA_CABOS.map((l) => <option key={l.bitola} value={l.bitola}>{l.bitola} mm²</option>)}
          </select>
        </label>
        <label className="text-xs text-muted">
          Comprimento do trecho (m)
          <input type="number" value={comprimento} onChange={(e) => setComprimento(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={trifasico} onChange={(e) => setTrifasico(e.target.checked)} className="accent-accent" />
          Circuito trifásico
        </label>
      </div>

      <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
        <p className="text-xs text-muted">Perda de potência estimada</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">{perdaW.toFixed(1)} W</p>
      </div>
      <p className="mt-3 text-xs text-muted">Em trechos longos e correntes altas, essa perda pode justificar usar uma seção de cabo maior que o mínimo normativo, por economia de energia no longo prazo.</p>
    </div>
  );
}
