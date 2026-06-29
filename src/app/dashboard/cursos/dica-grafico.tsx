"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";

export type TipoGrafico =
  | "senoide-fase"
  | "atraso-indutivo"
  | "avanco-capacitivo"
  | "triangulo-potencias"
  | "carga-capacitor"
  | "descarga-indutor"
  | "comparacao-corrente"
  | "curva-bh"
  | "torque-velocidade-inducao"
  | "curva-disjuntor";

interface Props {
  gatilho: string; // texto curto clicável/hoverável
  titulo: string;
  explicacao: string;
  tipo: TipoGrafico;
}

/**
 * Estratégia de ensino: "dica com gráfico" — ao passar o mouse (ou tocar, no
 * celular) sobre um termo-chave, abre um pequeno gráfico explicando o
 * comportamento da grandeza, sem precisar sair da página.
 */
export default function DicaGrafico({ gatilho, titulo, explicacao, tipo }: Props) {
  const [aberta, setAberta] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onMouseEnter={() => setAberta(true)}
        onMouseLeave={() => setAberta(false)}
        onClick={() => setAberta((a) => !a)}
        className="inline-flex items-center gap-1 rounded-md border border-dashed border-accent/50 bg-accent/10 px-1.5 py-0.5 text-accent underline decoration-dotted"
      >
        <Lightbulb size={11} />
        {gatilho}
      </button>

      {aberta && (
        <span className="absolute left-0 top-full z-20 mt-2 block w-72 rounded-lg border border-panel-border bg-bg-elevated p-3 text-left shadow-2xl shadow-black/50">
          <span className="mb-1.5 block font-display text-xs font-semibold text-accent">{titulo}</span>
          <GraficoMini tipo={tipo} />
          <span className="mt-1.5 block text-xs leading-relaxed text-muted">{explicacao}</span>
        </span>
      )}
    </span>
  );
}

function GraficoMini({ tipo }: { tipo: TipoGrafico }) {
  const pontos = (fn: (x: number) => number, fase = 0, amp = 25) =>
    Array.from({ length: 61 }, (_, i) => {
      const x = i * 6;
      const y = 35 - amp * fn((x + fase) * (Math.PI / 180));
      return `${x},${y.toFixed(1)}`;
    }).join(" ");

  if (tipo === "senoide-fase" || tipo === "atraso-indutivo" || tipo === "avanco-capacitivo") {
    const defasagem = tipo === "atraso-indutivo" ? -45 : tipo === "avanco-capacitivo" ? 45 : 0;
    return (
      <svg viewBox="0 0 360 70" className="w-full">
        <line x1="0" y1="35" x2="360" y2="35" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={pontos(Math.sin, 0)} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <polyline points={pontos(Math.sin, defasagem)} fill="none" stroke="var(--phase-t)" strokeWidth={2} strokeDasharray={defasagem !== 0 ? "0" : "3 3"} />
        <text x="5" y="12" fontSize="9" fill="var(--accent)">V</text>
        <text x="5" y="64" fontSize="9" fill="var(--phase-t)">I</text>
      </svg>
    );
  }

  if (tipo === "triangulo-potencias") {
    return (
      <svg viewBox="0 0 200 90" className="w-full">
        <path d="M20,80 H140 L140,20 Z" fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x="75" y="92" fontSize="9" fill="var(--accent)" textAnchor="middle">P (ativa)</text>
        <text x="150" y="50" fontSize="9" fill="var(--phase-s)">Q (reativa)</text>
        <text x="60" y="45" fontSize="9" fill="var(--phase-t)">S (aparente)</text>
        <line x1="140" y1="20" x2="140" y2="80" stroke="var(--phase-s)" strokeWidth={2} />
        <line x1="20" y1="80" x2="140" y2="20" stroke="var(--phase-t)" strokeWidth={2} />
      </svg>
    );
  }

  if (tipo === "carga-capacitor" || tipo === "descarga-indutor") {
    const subindo = tipo === "carga-capacitor";
    const curva = Array.from({ length: 61 }, (_, i) => {
      const x = i * 6;
      const t = i / 60;
      const y = subindo ? 60 - 50 * (1 - Math.exp(-t * 5)) : 10 + 50 * (1 - Math.exp(-t * 5));
      return `${x},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 360 70" className="w-full">
        <line x1="0" y1="60" x2="360" y2="60" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={curva} fill="none" stroke="var(--accent)" strokeWidth={2} />
      </svg>
    );
  }

  if (tipo === "comparacao-corrente") {
    return (
      <svg viewBox="0 0 200 70" className="w-full">
        <rect x="30" y="10" width="30" height="50" fill="var(--phase-t)" opacity={0.8} />
        <text x="45" y="68" fontSize="8" textAnchor="middle" fill="var(--muted)">Estrela</text>
        <rect x="120" y="-10" width="30" height="70" fill="var(--accent)" opacity={0.8} />
        <text x="135" y="68" fontSize="8" textAnchor="middle" fill="var(--muted)">Triângulo</text>
      </svg>
    );
  }

  if (tipo === "curva-bh") {
    // Curva de magnetização: sobe rápido e depois satura (efeito de saturação do núcleo)
    const curva = Array.from({ length: 41 }, (_, i) => {
      const x = i * 9;
      const h = i / 40;
      const b = 60 * (1 - Math.exp(-h * 4)); // sobe e satura
      const y = 65 - b;
      return `${x},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 360 70" className="w-full">
        <line x1="0" y1="65" x2="360" y2="65" stroke="var(--panel-border)" strokeWidth={1} />
        <line x1="0" y1="65" x2="0" y2="5" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={curva} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x="5" y="12" fontSize="9" fill="var(--accent)">B (T)</text>
        <text x="320" y="63" fontSize="9" fill="var(--muted)">H (A/m)</text>
        <line x1="180" y1="10" x2="350" y2="10" stroke="var(--phase-s)" strokeWidth={1} strokeDasharray="3 3" />
        <text x="190" y="22" fontSize="8" fill="var(--phase-s)">região de saturação</text>
      </svg>
    );
  }

  if (tipo === "torque-velocidade-inducao") {
    // Conjugado x velocidade de motor de indução: sobe do torque de partida,
    // passa por um pico (torque máximo) e cai a zero na velocidade síncrona
    const curva = Array.from({ length: 51 }, (_, i) => {
      const s = 1 - i / 50; // velocidade relativa de 0 (parado) a 1 (síncrono)
      const x = (1 - s) * 340 + 10;
      const escorreg = 1 - s;
      const torque = (2.2 * escorreg) / (0.25 + escorreg * escorreg) ; // curva tipo torque x escorregamento simplificada
      const y = 65 - torque * 22;
      return `${x},${Math.max(5, y).toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 360 75" className="w-full">
        <line x1="10" y1="65" x2="350" y2="65" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={curva} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x="12" y="74" fontSize="8" fill="var(--muted)">parado</text>
        <text x="310" y="74" fontSize="8" fill="var(--muted)">síncrona</text>
        <text x="5" y="15" fontSize="9" fill="var(--accent)">T</text>
      </svg>
    );
  }

  if (tipo === "curva-disjuntor") {
    // Curva tempo x corrente: zona térmica (lenta) e zona magnética (rápida)
    const curva = Array.from({ length: 51 }, (_, i) => {
      const x = 10 + i * 6.8;
      const t = i / 50;
      const tempo = 60 * Math.exp(-t * 5.5) + 2; // cai rápido, simulando atuação térmica -> magnética
      const y = 68 - Math.min(60, tempo);
      return `${x},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 360 75" className="w-full">
        <line x1="10" y1="68" x2="350" y2="68" stroke="var(--panel-border)" strokeWidth={1} />
        <line x1="10" y1="68" x2="10" y2="5" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={curva} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x="40" y="16" fontSize="8" fill="var(--phase-s)">zona térmica (sobrecarga)</text>
        <text x="230" y="58" fontSize="8" fill="var(--phase-t)">zona magnética (curto)</text>
        <text x="5" y="12" fontSize="9" fill="var(--accent)">t</text>
        <text x="335" y="65" fontSize="9" fill="var(--muted)">I</text>
      </svg>
    );
  }

  return null;
}
