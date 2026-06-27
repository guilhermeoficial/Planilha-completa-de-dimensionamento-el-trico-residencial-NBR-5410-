"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularQuedaSimples } from "@/lib/calculadoras";
import { TABELA_CABOS } from "@/lib/nbr5410";

export default function QuedaDeTensaoPage() {
  const [corrente, setCorrente] = useState("20");
  const [comprimento, setComprimento] = useState("25");
  const [secao, setSecao] = useState(2.5);
  const [tensao, setTensao] = useState("220");
  const [trifasico, setTrifasico] = useState(false);

  const linha = TABELA_CABOS.find((l) => l.bitola === secao) ?? TABELA_CABOS[0];
  const resultado = calcularQuedaSimples({
    correnteA: Number(corrente) || 0,
    comprimentoM: Number(comprimento) || 0,
    secaoMm2: secao,
    tensaoV: Number(tensao) || 220,
    resistividadeOhmKm: linha.r,
    trifasico,
  });

  const status = resultado.quedaPercent <= 4 ? "ok" : resultado.quedaPercent <= 6 ? "atencao" : "critico";

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Queda de Tensão Simples</h1>
      <p className="mt-1 text-sm text-muted">Calcule rapidamente a queda de tensão de um trecho, sem montar um projeto completo.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Corrente (A)
          <input type="number" value={corrente} onChange={(e) => setCorrente(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Comprimento do trecho (m)
          <input type="number" value={comprimento} onChange={(e) => setComprimento(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Seção do cabo (mm²)
          <select value={secao} onChange={(e) => setSecao(Number(e.target.value))} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
            {TABELA_CABOS.map((l) => <option key={l.bitola} value={l.bitola}>{l.bitola} mm²</option>)}
          </select>
        </label>
        <label className="text-xs text-muted">
          Tensão (V)
          <input type="number" value={tensao} onChange={(e) => setTensao(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="flex items-center gap-2 text-xs text-muted sm:col-span-2">
          <input type="checkbox" checked={trifasico} onChange={(e) => setTrifasico(e.target.checked)} className="accent-accent" />
          Circuito trifásico (senão, considera monofásico)
        </label>
      </div>

      <div className="mt-4 rounded-lg border border-panel-border bg-bg-elevated p-5 text-center">
        <p className="text-xs text-muted">Queda de tensão</p>
        <p
          className={`mt-1 font-display text-2xl font-bold ${
            status === "ok" ? "text-ok" : status === "atencao" ? "text-warn" : "text-danger"
          }`}
        >
          {resultado.quedaV.toFixed(2)} V ({resultado.quedaPercent.toFixed(2)}%)
        </p>
        <p className="mt-1 text-xs text-muted">
          {status === "ok" ? "Dentro do limite usual de 4%" : status === "atencao" ? "Acima de 4% — considere aumentar a seção" : "Queda muito alta — aumente a seção do cabo"}
        </p>
      </div>
    </div>
  );
}
