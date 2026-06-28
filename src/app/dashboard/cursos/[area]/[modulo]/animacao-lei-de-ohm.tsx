"use client";

import { useState, useMemo } from "react";
import Formula from "../../formula";

/**
 * Animação interativa: elétrons (pontos) circulando por um fio entre uma
 * bateria (tensão V) e um resistor (R). A velocidade do fluxo é proporcional
 * à corrente I = V/R, tornando visível a Lei de Ohm em tempo real.
 */
export default function AnimacaoLeiDeOhm() {
  const [v, setV] = useState(12);
  const [r, setR] = useState(4);

  const corrente = v / r;
  // duração da animação inversamente proporcional à corrente (mais corrente = mais rápido)
  const duracaoS = useMemo(() => Math.max(0.6, 6 / corrente), [corrente]);
  const numEletrons = 8;

  // Caminho do fio: um retângulo arredondado simples (circuito fechado)
  const pathId = "fio-circuito";

  return (
    <div className="rounded-lg border border-panel-border bg-bg-elevated p-5">
      <p className="mb-3 font-display text-sm font-semibold text-accent">Simulação — Lei de Ohm em tempo real</p>

      <svg viewBox="0 0 360 180" className="w-full">
        <defs>
          <path id={pathId} d="M 40 40 H 320 V 140 H 40 Z" />
        </defs>

        {/* fio (circuito) */}
        <path d="M 40 40 H 320 V 140 H 40 Z" fill="none" stroke="var(--panel-border)" strokeWidth={4} />

        {/* bateria (lado esquerdo) */}
        <g>
          <rect x="20" y="70" width="40" height="40" rx="4" fill="var(--panel)" stroke="var(--accent)" strokeWidth={2} />
          <text x="40" y="95" textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="bold">{v}V</text>
        </g>

        {/* resistor (lado direito, zigue-zague) */}
        <g transform="translate(290, 60)">
          <polyline
            points="0,0 6,-8 12,8 18,-8 24,8 30,-8 36,0"
            fill="none"
            stroke="var(--phase-s)"
            strokeWidth={3}
          />
          <text x="18" y="35" textAnchor="middle" fontSize="11" fill="var(--phase-s)" fontWeight="bold">{r}Ω</text>
        </g>

        {/* elétrons animados */}
        {Array.from({ length: numEletrons }).map((_, i) => (
          <circle key={i} r="4" fill="var(--phase-t)">
            <animateMotion
              dur={`${duracaoS}s`}
              repeatCount="indefinite"
              begin={`${(i * duracaoS) / numEletrons}s`}
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs text-muted">
          Tensão V = {v} V
          <input type="range" min={1} max={24} value={v} onChange={(e) => setV(Number(e.target.value))} className="mt-1 w-full accent-accent" />
        </label>
        <label className="text-xs text-muted">
          Resistência R = {r} Ω
          <input type="range" min={1} max={20} value={r} onChange={(e) => setR(Number(e.target.value))} className="mt-1 w-full accent-accent" />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <Formula latex={`I = \\dfrac{V}{R} = \\dfrac{${v}}{${r}} = ${corrente.toFixed(2)}\\ \\text{A}`} />
      </div>
      <p className="mt-2 text-center text-xs text-muted">
        Aumente a tensão ou diminua a resistência e observe os elétrons acelerarem — exatamente como prevê a Lei de Ohm.
      </p>
    </div>
  );
}
