"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularPartidaMotor } from "@/lib/calculadoras";
import { TABELA_CABOS, DISJUNTORES_PADRAO } from "@/lib/nbr5410";

export default function CaboDisjuntorMotorPage() {
  const [correnteNominal, setCorrenteNominal] = useState("20");
  const [razao, setRazao] = useState("7");
  const [isolacao, setIsolacao] = useState<"PVC" | "EPR">("PVC");

  const In = Number(correnteNominal) || 0;
  const partida = calcularPartidaMotor(In, Number(razao) || 7)[0]; // partida direta

  // Cabo: dimensiona pela corrente nominal com margem de 25% (regra prática NBR 5410 p/ motores)
  const correnteProjeto = In * 1.25;
  const linhaCabo = TABELA_CABOS.find((l) => (isolacao === "EPR" ? l.epr2 : l.pvc2) >= correnteProjeto) ?? TABELA_CABOS[TABELA_CABOS.length - 1];

  // Disjuntor motor: deve suportar a corrente de partida sem disparar (tipicamente disjuntor magnético/motor, não residencial padrão)
  const disjuntorSugerido = DISJUNTORES_PADRAO.find((d) => d >= correnteProjeto) ?? DISJUNTORES_PADRAO[DISJUNTORES_PADRAO.length - 1];

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Cabo e Disjuntor para Motor</h1>
      <p className="mt-1 text-sm text-muted">Dimensionamento simplificado considerando a corrente nominal com margem para regime de partida.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Corrente nominal do motor (A)
          <input type="number" value={correnteNominal} onChange={(e) => setCorrenteNominal(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Relação Ip/In (partida direta)
          <input type="number" value={razao} onChange={(e) => setRazao(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted sm:col-span-2">
          Isolação do cabo
          <select value={isolacao} onChange={(e) => setIsolacao(e.target.value as "PVC" | "EPR")} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text">
            <option value="PVC">PVC</option>
            <option value="EPR">EPR/XLPE</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-panel-border bg-bg-elevated p-4 text-center">
          <p className="text-xs text-muted">Corrente de partida</p>
          <p className="tabular mt-1 font-display text-lg font-bold">{partida.correnteA.toFixed(1)} A</p>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Cabo recomendado</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{linhaCabo.bitola} mm²</p>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4 text-center">
          <p className="text-xs text-muted">Disjuntor motor</p>
          <p className="tabular mt-1 font-display text-lg font-bold text-accent">{disjuntorSugerido} A</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        ⚠️ Use disjuntor com curva apropriada para motores (tipo D/MA ou disjuntor-motor dedicado), capaz de suportar a
        corrente de partida transitoriamente sem atuar. Disjuntores residenciais padrão (curva B/C) não são adequados para a maioria dos motores.
      </p>
    </div>
  );
}
