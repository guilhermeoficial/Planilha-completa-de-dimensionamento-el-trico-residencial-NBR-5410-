"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularCorrecaoFP, PRECOS_PADRAO, type EntradaMotor } from "@/lib/comercial";

export default function CorrecaoFPPage() {
  const [tipo, setTipo] = useState<EntradaMotor["tipo"]>("Trifásico");
  const [potenciaCv, setPotenciaCv] = useState("10");
  const [fpAtual, setFpAtual] = useState("0.75");
  const [fpDesejado, setFpDesejado] = useState("0.95");

  const resultado = calcularCorrecaoFP(
    {
      tipo,
      potencia: Number(potenciaCv) || 0,
      unidadePotencia: "CV",
      fpAtual: Number(fpAtual) || 0.01,
      fpDesejado: Number(fpDesejado) || 1,
      quantidade: 1,
    },
    PRECOS_PADRAO.capacitorPorKvar
  );

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Correção de Fator de Potência</h1>
      <p className="mt-1 text-sm text-muted">Versão avulsa — calcule rapidamente o banco de capacitores sem precisar abrir um projeto.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Tipo de motor
          <select value={tipo} onChange={(e) => setTipo(e.target.value as EntradaMotor["tipo"])} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
            <option value="Monofásico">Monofásico</option>
            <option value="Trifásico">Trifásico</option>
          </select>
        </label>
        <label className="text-xs text-muted">
          Potência (CV)
          <input type="number" value={potenciaCv} onChange={(e) => setPotenciaCv(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          FP atual
          <input type="number" step="0.01" value={fpAtual} onChange={(e) => setFpAtual(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          FP desejado
          <input type="number" step="0.01" value={fpDesejado} onChange={(e) => setFpDesejado(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Qc necessário</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{resultado.qcNecessarioKvar.toFixed(2)} kVAr</p>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Banco sugerido</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{resultado.bancoSugeridoKvar.join(" + ") || "—"} kVAr</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Preço estimado do banco: {resultado.precoEstimado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (referência editável)</p>
    </div>
  );
}
