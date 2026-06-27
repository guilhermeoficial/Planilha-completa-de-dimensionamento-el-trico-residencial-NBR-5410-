"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { calcularPontosLuzPorLux } from "@/lib/calculadoras";

const REFERENCIAS_LUX = [
  { ambiente: "Dormitório", lux: 150 },
  { ambiente: "Sala de estar", lux: 200 },
  { ambiente: "Cozinha", lux: 300 },
  { ambiente: "Escritório / leitura", lux: 500 },
  { ambiente: "Banheiro", lux: 200 },
  { ambiente: "Área externa / garagem", lux: 100 },
];

export default function LuminotecnicaPage() {
  const [lux, setLux] = useState("200");
  const [area, setArea] = useState("12");
  const [fluxoLampada, setFluxoLampada] = useState("800");
  const [fu, setFu] = useState("0.6");
  const [fm, setFm] = useState("0.8");

  const numLampadas = calcularPontosLuzPorLux(Number(lux) || 0, Number(area) || 0, Number(fluxoLampada) || 1, Number(fu) || 0.6, Number(fm) || 0.8);

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Luminotécnica (Método dos Lúmens)</h1>
      <p className="mt-1 text-sm text-muted">Quantas luminárias são necessárias para atingir o nível de iluminância (lux) desejado no ambiente.</p>

      <div className="mt-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Iluminância desejada (lux)
          <input type="number" value={lux} onChange={(e) => setLux(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Área do ambiente (m²)
          <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Fluxo luminoso da lâmpada (lm)
          <input type="number" value={fluxoLampada} onChange={(e) => setFluxoLampada(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted">
          Fator de utilização (0-1)
          <input type="number" step="0.05" value={fu} onChange={(e) => setFu(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
        <label className="text-xs text-muted sm:col-span-2">
          Fator de manutenção (0-1)
          <input type="number" step="0.05" value={fm} onChange={(e) => setFm(e.target.value)} className="mt-1 w-full rounded-md border border-panel-border bg-bg px-3 py-2 text-sm text-text" />
        </label>
      </div>

      <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
        <p className="text-xs text-muted">Número de luminárias recomendado</p>
        <p className="mt-1 font-display text-2xl font-bold text-accent">{numLampadas}</p>
      </div>

      <p className="mt-4 text-xs text-muted">Referências de iluminância (NBR ISO/CIE 8995):</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {REFERENCIAS_LUX.map((r) => (
          <button key={r.ambiente} onClick={() => setLux(String(r.lux))} className="rounded-md border border-panel-border px-2.5 py-1 text-xs text-muted hover:border-accent hover:text-text">
            {r.ambiente}: {r.lux} lux
          </button>
        ))}
      </div>
    </div>
  );
}
