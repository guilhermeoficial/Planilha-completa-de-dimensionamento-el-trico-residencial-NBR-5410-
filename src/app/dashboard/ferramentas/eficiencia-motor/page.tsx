"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularEficienciaMotor, calcularPotenciaEntrada } from "@/lib/calculadoras";

export default function EficienciaMotorPage() {
  const [modo, setModo] = useState<"eficiencia" | "entrada">("eficiencia");
  const [pEntrada, setPEntrada] = useState("1000");
  const [pSaida, setPSaida] = useState("850");
  const [eficiencia, setEficiencia] = useState("85");

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Eficiência de Motor</h1>
      <p className="mt-1 text-sm text-muted">Relação entre potência elétrica de entrada e potência mecânica de saída.</p>

      <div className="mt-6 flex rounded-md border border-panel-border p-1 text-sm">
        <button onClick={() => setModo("eficiencia")} className={`flex-1 rounded-sm py-1.5 ${modo === "eficiencia" ? "bg-accent text-bg font-medium" : "text-muted"}`}>Calcular eficiência</button>
        <button onClick={() => setModo("entrada")} className={`flex-1 rounded-sm py-1.5 ${modo === "entrada" ? "bg-accent text-bg font-medium" : "text-muted"}`}>Calcular potência de entrada</button>
      </div>

      {modo === "eficiencia" ? (
        <>
          <div className="mt-4 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
            <label className="text-xs text-muted">
              Potência de entrada (W)
              <input type="number" value={pEntrada} onChange={(e) => setPEntrada(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
            </label>
            <label className="text-xs text-muted">
              Potência de saída (W)
              <input type="number" value={pSaida} onChange={(e) => setPSaida(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
            </label>
          </div>
          <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
            <p className="text-xs text-muted">Eficiência</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">{calcularEficienciaMotor(Number(pEntrada) || 0, Number(pSaida) || 0).toFixed(1)}%</p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
            <label className="text-xs text-muted">
              Potência de saída desejada (W)
              <input type="number" value={pSaida} onChange={(e) => setPSaida(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
            </label>
            <label className="text-xs text-muted">
              Eficiência do motor (%)
              <input type="number" value={eficiencia} onChange={(e) => setEficiencia(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
            </label>
          </div>
          <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
            <p className="text-xs text-muted">Potência de entrada necessária</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">{calcularPotenciaEntrada(Number(pSaida) || 0, Number(eficiencia) || 0).toFixed(0)} W</p>
          </div>
        </>
      )}
    </div>
  );
}
