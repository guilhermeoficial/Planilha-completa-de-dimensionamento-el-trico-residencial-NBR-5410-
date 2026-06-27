"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularEstrelaTriangulo } from "@/lib/calculadoras";

export default function EstrelaTrianguloPage() {
  const [tensaoLinha, setTensaoLinha] = useState("380");
  const [correnteTriangulo, setCorrenteTriangulo] = useState("10");

  const r = calcularEstrelaTriangulo(Number(tensaoLinha) || 0, Number(correnteTriangulo) || 0);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Estrela-Triângulo</h1>
      <p className="mt-1 text-sm text-muted">
        Compare tensão e corrente de fase/linha entre as ligações estrela e triângulo de um motor trifásico.
      </p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Tensão de linha (V)
          <input
            type="number"
            value={tensaoLinha}
            onChange={(e) => setTensaoLinha(e.target.value)}
            className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text"
          />
        </label>
        <label className="text-xs text-muted">
          Corrente de linha em triângulo (A)
          <input
            type="number"
            value={correnteTriangulo}
            onChange={(e) => setCorrenteTriangulo(e.target.value)}
            className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-5">
          <p className="font-display text-sm font-semibold text-accent">Ligação Estrela (Y)</p>
          <dl className="mt-3 space-y-2 text-sm">
            <Linha label="Tensão de fase" valor={`${r.tensaoFaseEstrelaV.toFixed(1)} V`} />
            <Linha label="Corrente de linha" valor={`${r.correnteLinhaEstrelaA.toFixed(2)} A`} />
          </dl>
        </div>
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-5">
          <p className="font-display text-sm font-semibold text-accent">Ligação Triângulo (∆)</p>
          <dl className="mt-3 space-y-2 text-sm">
            <Linha label="Tensão de fase" valor={`${r.tensaoFaseTrianguloV.toFixed(1)} V`} />
            <Linha label="Corrente de linha" valor={`${r.correnteLinhaTrianguloA.toFixed(2)} A`} />
          </dl>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Na partida estrela-triângulo, a corrente de linha em estrela é 1/3 da corrente em triângulo —
        por isso ela reduz a corrente de partida do motor. Após a partida, a chave comuta para triângulo
        em regime de operação normal.
      </p>
    </div>
  );
}

function Linha({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular font-medium">{valor}</dd>
    </div>
  );
}
