"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Circuitos elétricos para questões — SVG inline com tema neon
// Cada circuito é um componente React identificado pelo ID da questão.
// Para adicionar um novo circuito: criar função abaixo e registrar no mapa CIRCUITOS.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { ZoomIn, ZoomOut, X } from "lucide-react";

// ── Filtros e definições compartilhados ──────────────────────────────────────
function Defs() {
  return (
    <defs>
      <filter id="gc" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="gg" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="go" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="gp" x="-40%" y="-20%" width="180%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="gb" x="-40%" y="-30%" width="180%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="gk" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0L0 0 0 20" fill="none" stroke="#ffffff08" strokeWidth="0.5"/>
      </pattern>
      <marker id="arr-pink" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 Z" fill="#ff4da6"/>
      </marker>
    </defs>
  );
}

// Fundo escuro com grid sutil
function Fundo({ w, h }: { w: number; h: number }) {
  return (
    <>
      <rect width={w} height={h} fill="#070714" rx="6"/>
      <rect width={w} height={h} fill="url(#grid)" rx="6"/>
    </>
  );
}

// Símbolo de aterramento
function Ground({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 12} stroke="#aaa" strokeWidth="2"/>
      <line x1={x - 14} y1={y + 12} x2={x + 14} y2={y + 12} stroke="#aaa" strokeWidth="2.5"/>
      <line x1={x - 9}  y1={y + 18} x2={x + 9}  y2={y + 18} stroke="#aaa" strokeWidth="1.8"/>
      <line x1={x - 4}  y1={y + 24} x2={x + 4}  y2={y + 24} stroke="#aaa" strokeWidth="1.2"/>
    </g>
  );
}

// Ponto de junção
function No({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={4} fill="#00e5ff" filter="url(#gc)"/>;
}

// Fio reto
function Fio({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00e5ff" strokeWidth="2" filter="url(#gc)"/>;
}

// Fonte CA
function FonteCA({ cx, cy, r = 30, label = "200 V" }: { cx: number; cy: number; r?: number; label?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#070714" stroke="#39ff14" strokeWidth="2" filter="url(#gg)"/>
      <path d={`M${cx-14},${cy} Q${cx-10},${cy-10} ${cx-6},${cy} Q${cx-2},${cy+10} ${cx+2},${cy} Q${cx+6},${cy-10} ${cx+10},${cy} Q${cx+14},${cy+10} ${cx+18},${cy}`}
            fill="none" stroke="#39ff14" strokeWidth="2" filter="url(#gg)"/>
      <text x={cx - 6} y={cy - r - 6} fontSize="11" fill="#39ff14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">+</text>
      <text x={cx - r - 8} y={cy + 4} fontSize="13" fill="#39ff14" fontFamily="monospace" fontWeight="bold" textAnchor="end">{label}</text>
    </g>
  );
}

// Amperímetro
function Amperimetro({ cx, cy, r = 16 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0a0a1a" stroke="#ff4da6" strokeWidth="2" filter="url(#gk)"/>
      <text x={cx} y={cy + 5} fontSize="13" fill="#ff4da6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">A</text>
      <line x1={cx + r} y1={cy} x2={cx + r + 6} y2={cy} stroke="#ff4da6" strokeWidth="1.5" markerEnd="url(#arr-pink)" filter="url(#gk)"/>
      <text x={cx} y={cy - r - 6} fontSize="10" fill="#ff4da6" fontFamily="monospace" textAnchor="middle">Amp</text>
    </g>
  );
}

// Resistor (retângulo IEC)
function Resistor({ x, y, w = 108, h = 24, label = "R", vertical = false }: {
  x: number; y: number; w?: number; h?: number; label?: string; vertical?: boolean;
}) {
  if (vertical) {
    return (
      <g>
        <rect x={x - h / 2} y={y} width={h} height={w} rx="3" fill="#0d0820" stroke="#ff9500" strokeWidth="2" filter="url(#go)"/>
        <text x={x + h / 2 + 6} y={y + w / 2 + 4} fontSize="11" fill="#ff9500" fontFamily="monospace" fontWeight="bold">{label}</text>
      </g>
    );
  }
  return (
    <g>
      <rect x={x} y={y - h / 2} width={w} height={h} rx="3" fill="#0d0820" stroke="#ff9500" strokeWidth="2" filter="url(#go)"/>
      <text x={x + w / 2} y={y - h / 2 - 6} fontSize="11" fill="#ff9500" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{label}</text>
    </g>
  );
}

// Indutor vertical (bobina — meias-circunferências para a direita)
function IndutorV({ x, yTop, yBot, label = "XL" }: { x: number; yTop: number; yBot: number; label?: string }) {
  const altura = yBot - yTop;
  const n = 4; // número de arcos
  const passo = altura / n;
  let d = `M ${x},${yTop}`;
  for (let i = 0; i < n; i++) {
    const y1 = yTop + i * passo;
    const y2 = yTop + (i + 1) * passo;
    d += ` A ${passo / 2},${passo / 2} 0 0,1 ${x},${y2}`;
  }
  return (
    <g>
      <path d={d} fill="none" stroke="#b347ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#gp)"/>
      <text x={x + 18} y={(yTop + yBot) / 2 + 4} fontSize="11" fill="#b347ff" fontFamily="monospace" fontWeight="bold">{label}</text>
    </g>
  );
}

// Capacitor vertical (duas placas horizontais)
function CapacitorV({ x, yTop, yBot, label = "XC", plateW = 48 }: {
  x: number; yTop: number; yBot: number; label?: string; plateW?: number;
}) {
  const yMid = (yTop + yBot) / 2;
  return (
    <g>
      <line x1={x - plateW / 2} y1={yMid - 8} x2={x + plateW / 2} y2={yMid - 8}
            stroke="#00bfff" strokeWidth="3.5" strokeLinecap="round" filter="url(#gb)"/>
      <line x1={x - plateW / 2} y1={yMid + 8} x2={x + plateW / 2} y2={yMid + 8}
            stroke="#00bfff" strokeWidth="3.5" strokeLinecap="round" filter="url(#gb)"/>
      <text x={x + plateW / 2 + 8} y={yMid + 4} fontSize="11" fill="#00bfff" fontFamily="monospace" fontWeight="bold">{label}</text>
    </g>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CIRCUITOS DAS QUESTÕES
// ═════════════════════════════════════════════════════════════════════════════

// e306 — Fonte 200V | Amp | R=100Ω série | XL=20Ω // XC=25Ω
function CircuitoE306() {
  const W = 560, H = 290;
  // coordenadas principais
  const xSrc = 85, ySrcTop = 65, ySrcBot = 240, ySrcMid = (ySrcTop + ySrcBot) / 2;
  const yTop = 65, yBot = 240;
  const xAmp = 160;
  const xResStart = 210, xResEnd = 320;
  const xInd = 390;
  const xCap = 490;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-72">
      <Defs/>
      <Fundo w={W} h={H}/>

      {/* Fios trilho superior */}
      <Fio x1={xSrc} y1={yTop} x2={xAmp - 16} y2={yTop}/>
      <Fio x1={xAmp + 16} y1={yTop} x2={xResStart} y2={yTop}/>
      <Fio x1={xResEnd} y1={yTop} x2={xInd} y2={yTop}/>
      <Fio x1={xInd} y1={yTop} x2={xCap} y2={yTop}/>

      {/* Fio vertical esq superior: top da fonte → trilho */}
      <Fio x1={xSrc} y1={ySrcTop + 30} x2={xSrc} y2={yTop}/>

      {/* Fios verticais indutor */}
      <Fio x1={xInd} y1={yTop} x2={xInd} y2={yTop + 22}/>
      <Fio x1={xInd} y1={yTop + 142} x2={xInd} y2={yBot}/>

      {/* Fios verticais capacitor */}
      <Fio x1={xCap} y1={yTop} x2={xCap} y2={(yTop + yBot) / 2 - 20}/>
      <Fio x1={xCap} y1={(yTop + yBot) / 2 + 20} x2={xCap} y2={yBot}/>

      {/* Trilho inferior */}
      <Fio x1={xSrc} y1={yBot} x2={xCap} y2={yBot}/>

      {/* Fio vertical esq inferior: fonte → trilho */}
      <Fio x1={xSrc} y1={ySrcBot - 30} x2={xSrc} y2={yBot}/>

      {/* Fonte */}
      <FonteCA cx={xSrc} cy={ySrcMid} r={30} label="200 V"/>

      {/* Amperímetro */}
      <Amperimetro cx={xAmp} cy={yTop}/>

      {/* Resistor 100Ω */}
      <Resistor x={xResStart} y={yTop} w={xResEnd - xResStart} h={24} label="100 Ω"/>

      {/* Indutor XL=20Ω */}
      <IndutorV x={xInd} yTop={yTop + 22} yBot={yTop + 142} label="20 Ω / XL"/>

      {/* Capacitor XC=25Ω */}
      <CapacitorV x={xCap} yTop={yTop} yBot={yBot} label="25 Ω / XC" plateW={44}/>

      {/* Aterramento */}
      <Ground x={xSrc} y={yBot}/>

      {/* Nós de junção */}
      <No x={xInd} y={yTop}/>
      <No x={xCap} y={yTop}/>
      <No x={xInd} y={yBot}/>
      <No x={xSrc} y={yTop}/>
      <No x={xSrc} y={yBot}/>
    </svg>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAPA: id da questão → componente do circuito
// Para adicionar novo circuito: criar função acima e registrar aqui.
// ═════════════════════════════════════════════════════════════════════════════
const CIRCUITOS: Record<string, React.FC> = {
  e306: CircuitoE306,
};

// ── Componente público exportado ─────────────────────────────────────────────
export default function CircuitoQuestao({ id }: { id: string }) {
  const [zoom, setZoom] = useState(false);
  const Circuito = CIRCUITOS[id];

  if (!Circuito) return null;

  return (
    <>
      {/* Caixa normal */}
      <div className="mb-4 overflow-hidden rounded-xl border border-panel-border bg-[#070714]">
        <div className="flex items-center justify-between border-b border-panel-border/50 px-3 py-1.5">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Figura do circuito</span>
          <button
            onClick={() => setZoom(true)}
            className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          >
            <ZoomIn size={13}/> ampliar
          </button>
        </div>
        <div className="p-3">
          <Circuito/>
        </div>
      </div>

      {/* Modal de zoom */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setZoom(false)}
        >
          <div
            className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-panel-border bg-[#070714] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-panel-border/50 px-4 py-2">
              <span className="font-mono text-xs text-accent uppercase tracking-widest">Figura do circuito</span>
              <button onClick={() => setZoom(false)} className="rounded-lg p-1 text-muted hover:text-text transition-colors">
                <X size={16}/>
              </button>
            </div>
            <div className="p-6">
              <Circuito/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
