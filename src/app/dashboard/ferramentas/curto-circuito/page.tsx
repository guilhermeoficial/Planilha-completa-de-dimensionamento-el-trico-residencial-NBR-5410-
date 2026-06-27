"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularCurtoCircuitoSimplificado } from "@/lib/calculadoras";
import { TABELA_CABOS } from "@/lib/nbr5410";

export default function CurtoCircuitoPage() {
  const [tensao, setTensao] = useState("220");
  const [zFonte, setZFonte] = useState("0.05");
  const [secao, setSecao] = useState(2.5);
  const [comprimento, setComprimento] = useState("20");
  const [trifasico, setTrifasico] = useState(false);

  const linha = TABELA_CABOS.find((l) => l.bitola === secao) ?? TABELA_CABOS[0];
  const r = calcularCurtoCircuitoSimplificado({
    tensaoV: Number(tensao) || 220,
    impedanciaFonteOhm: Number(zFonte) || 0,
    resistividadeCaboOhmKm: linha.r,
    comprimentoM: Number(comprimento) || 0,
    trifasico,
  });

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Curto-Circuito Simplificado</h1>
      <p className="mt-1 text-sm text-muted">
        Estimativa educacional da corrente de curto-circuito num ponto, a partir da impedância da fonte e do cabo.
      </p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Tensão (V)
          <input type="number" value={tensao} onChange={(e) => setTensao(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Impedância da fonte/transformador (Ω)
          <input type="number" step="0.001" value={zFonte} onChange={(e) => setZFonte(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
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
        <label className="flex items-center gap-2 text-xs text-muted sm:col-span-2">
          <input type="checkbox" checked={trifasico} onChange={(e) => setTrifasico(e.target.checked)} className="accent-accent" />
          Falta trifásica (senão, considera fase-neutro)
        </label>
      </div>

      <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
        <p className="text-xs text-muted">Corrente de curto-circuito estimada</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">{r.correnteCcA.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} A</p>
      </div>
      <p className="mt-3 text-xs text-muted">
        ⚠️ Estimativa simplificada para fins educacionais — não substitui um estudo de curto-circuito completo
        (que considera impedâncias de sequência, transformador, e demais trechos da instalação).
      </p>
    </div>
  );
}
