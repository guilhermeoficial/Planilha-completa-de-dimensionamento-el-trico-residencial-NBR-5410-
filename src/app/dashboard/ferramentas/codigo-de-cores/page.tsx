"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CORES_RESISTOR, calcularResistorPorCores, formatarOhms } from "@/lib/calculadoras";

const DIGITOS = CORES_RESISTOR.filter((c) => c.valor !== null);
const MULTIPLICADORES = CORES_RESISTOR;

export default function CodigoDeCoresPage() {
  const [faixa1, setFaixa1] = useState(2); // vermelho
  const [faixa2, setFaixa2] = useState(2); // vermelho
  const [multIdx, setMultIdx] = useState(1); // marrom = x10

  const valor = calcularResistorPorCores(
    DIGITOS[faixa1]?.valor ?? 0,
    DIGITOS[faixa2]?.valor ?? 0,
    MULTIPLICADORES.findIndex((m) => m === MULTIPLICADORES[multIdx])
  );
  const tolerancia = MULTIPLICADORES[multIdx]?.tolerancia ?? CORES_RESISTOR[1].tolerancia;

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Código de Cores de Resistores</h1>
      <p className="mt-1 text-sm text-muted">Selecione as faixas de cor (padrão de 4 faixas) e veja o valor do resistor.</p>

      <div className="mt-6 flex items-center justify-center gap-1 rounded-lg border border-panel-border bg-panel p-6">
        <div className="h-3 w-16 rounded-full bg-[#d2b48c]" />
        <div className="h-8 w-2 rounded-sm" style={{ background: DIGITOS[faixa1]?.cor }} />
        <div className="h-8 w-2 rounded-sm" style={{ background: DIGITOS[faixa2]?.cor }} />
        <div className="h-8 w-2 rounded-sm" style={{ background: MULTIPLICADORES[multIdx]?.cor }} />
        <div className="h-8 w-2 rounded-sm bg-[#c9a227]" />
        <div className="h-3 w-16 rounded-full bg-[#d2b48c]" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Seletor label="1ª faixa" valor={faixa1} onChange={setFaixa1} opcoes={DIGITOS} />
        <Seletor label="2ª faixa" valor={faixa2} onChange={setFaixa2} opcoes={DIGITOS} />
        <SeletorMult label="Multiplicador" valor={multIdx} onChange={setMultIdx} />
      </div>

      <div className="mt-5 rounded-lg border border-panel-border bg-bg-elevated p-5 text-center">
        <p className="text-xs text-muted">Valor do resistor</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">{formatarOhms(valor)}</p>
        <p className="mt-1 text-xs text-muted">Tolerância: {tolerancia}</p>
      </div>
    </div>
  );
}

function Seletor({
  label,
  valor,
  onChange,
  opcoes,
}: {
  label: string;
  valor: number;
  onChange: (i: number) => void;
  opcoes: typeof DIGITOS;
}) {
  return (
    <label className="text-xs text-muted">
      {label}
      <select
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-md border border-panel-border bg-panel px-3 py-2 text-sm text-text"
      >
        {opcoes.map((c, i) => (
          <option key={c.nome} value={i}>
            {c.nome} ({c.valor})
          </option>
        ))}
      </select>
    </label>
  );
}

function SeletorMult({ label, valor, onChange }: { label: string; valor: number; onChange: (i: number) => void }) {
  return (
    <label className="text-xs text-muted">
      {label}
      <select
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-md border border-panel-border bg-panel px-3 py-2 text-sm text-text"
      >
        {MULTIPLICADORES.map((c, i) => (
          <option key={c.nome} value={i}>
            {c.nome} (×{c.multiplicador})
          </option>
        ))}
      </select>
    </label>
  );
}
