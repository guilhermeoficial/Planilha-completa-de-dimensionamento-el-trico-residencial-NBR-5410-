"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularPartidaMotor } from "@/lib/calculadoras";

export default function PartidaMotorPage() {
  const [correnteNominal, setCorrenteNominal] = useState("20");
  const [razao, setRazao] = useState("7");

  const resultados = calcularPartidaMotor(Number(correnteNominal) || 0, Number(razao) || 7);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Corrente de Partida de Motor</h1>
      <p className="mt-1 text-sm text-muted">Compare a corrente de partida do motor entre os principais métodos de acionamento.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Corrente nominal do motor (A)
          <input type="number" value={correnteNominal} onChange={(e) => setCorrenteNominal(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Relação Ip/In (placa do motor, típico 6-8)
          <input type="number" value={razao} onChange={(e) => setRazao(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-panel-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-xs uppercase tracking-wide text-muted">
            <tr><th className="px-3 py-2.5">Método</th><th className="px-3 py-2.5">Multiplicador</th><th className="px-3 py-2.5">Corrente de partida</th></tr>
          </thead>
          <tbody>
            {resultados.map((r) => (
              <tr key={r.metodo} className="border-t border-panel-border">
                <td className="px-3 py-2.5 font-medium">{r.metodo}</td>
                <td className="tabular px-3 py-2.5 text-muted">{r.multiplicador.toFixed(2)}×</td>
                <td className="tabular px-3 py-2.5 font-medium text-accent">{r.correnteA.toFixed(1)} A</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Valores de soft-starter e inversor são típicos de mercado — confira o datasheet do equipamento específico para precisão.</p>
    </div>
  );
}
