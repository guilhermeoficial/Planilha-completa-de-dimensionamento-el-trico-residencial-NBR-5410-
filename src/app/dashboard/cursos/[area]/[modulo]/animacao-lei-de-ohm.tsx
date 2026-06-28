"use client";

import { useState, useMemo } from "react";
import Formula from "../../formula";

/**
 * Animação interativa: elétrons (pontos com brilho) circulando por um fio
 * entre uma bateria (tensão V) e um resistor (R), desenhados como símbolos
 * reais de diagrama elétrico. Inclui a seta de corrente convencional (sentido
 * oposto ao fluxo real de elétrons) — distinção clássica de prova.
 */
export default function AnimacaoLeiDeOhm() {
  const [v, setV] = useState(12);
  const [r, setR] = useState(4);

  const corrente = v / r;
  const duracaoS = useMemo(() => Math.max(0.7, 7 / corrente), [corrente]);
  const numEletrons = 7;
  const pathId = "fio-circuito-ohm";

  return (
    <div className="rounded-lg border border-panel-border bg-bg-elevated p-5">
      <p className="mb-3 font-display text-sm font-semibold text-accent">Simulação — Lei de Ohm em tempo real</p>

      <svg viewBox="0 0 400 200" className="w-full">
        <defs>
          <path id={pathId} d="M 170 50 H 230 H 350 V 170 H 50 V 110 V 90 V 50 Z" />
          <radialGradient id="brilhoEletron" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--phase-t)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--phase-t)" stopOpacity="0" />
          </radialGradient>
          <marker id="setaCorrente" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* trilho do fio (com vãos para a bateria e o resistor) */}
        <path
          d="M 170 50 H 230 M 350 50 V 170 H 50 V 110 M 50 90 V 50 H 170"
          fill="none"
          stroke="#9aa3b2"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* seta de corrente convencional (sentido horário, oposto ao elétron) */}
        <path d="M 280 50 H 300" stroke="var(--accent)" strokeWidth={2.5} markerEnd="url(#setaCorrente)" />
        <text x="290" y="38" textAnchor="middle" fontSize="9" fill="var(--accent)">I (convencional)</text>

        {/* bateria — símbolo clássico: traço longo/fino (+) e curto/grosso (−) */}
        <g>
          <line x1="38" y1="90" x2="62" y2="90" stroke="#e5e9f0" strokeWidth={2.5} />
          <line x1="42" y1="110" x2="58" y2="110" stroke="#e5e9f0" strokeWidth={5.5} />
          <text x="72" y="93" fontSize="11" fill="var(--text)" fontWeight="bold">+</text>
          <text x="72" y="114" fontSize="11" fill="var(--text)" fontWeight="bold">−</text>
          <text x="50" y="135" textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="bold">{v} V</text>
        </g>

        {/* resistor — zigue-zague clássico, embutido no trecho superior do fio */}
        <g>
          <polyline
            points="170,50 178,38 188,62 198,38 208,62 218,38 230,50"
            fill="none"
            stroke="var(--phase-s)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <text x="200" y="25" textAnchor="middle" fontSize="11" fill="var(--phase-s)" fontWeight="bold">{r} Ω</text>
        </g>

        {/* elétrons com brilho e rastro (sentido anti-horário: do − ao + pelo circuito externo) */}
        {Array.from({ length: numEletrons }).map((_, i) => (
          <g key={i}>
            <circle r="9" fill="url(#brilhoEletron)">
              <animateMotion dur={`${duracaoS}s`} repeatCount="indefinite" begin={`${(i * duracaoS) / numEletrons}s`} keyPoints="1;0" keyTimes="0;1">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
            <circle r="3.5" fill="var(--phase-t)">
              <animateMotion dur={`${duracaoS}s`} repeatCount="indefinite" begin={`${(i * duracaoS) / numEletrons}s`} keyPoints="1;0" keyTimes="0;1">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        <text x="200" y="190" textAnchor="middle" fontSize="9" fill="var(--muted)">e⁻ fluem do polo negativo (−) ao positivo (+) pelo circuito externo</text>
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
