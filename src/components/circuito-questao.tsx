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

// ── e2 — Dois resistores em paralelo (8Ω // 12Ω) ────────────────────────────
function CircuitoE2() {
  const W = 500, H = 260;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      {/* Fonte */}
      <FonteCA cx={70} cy={130} r={28} label="V"/>
      {/* Trilho superior */}
      <Fio x1={70} y1={102} x2={70} y2={55}/>
      <Fio x1={70} y1={55} x2={420} y2={55}/>
      {/* Trilho inferior */}
      <Fio x1={70} y1={158} x2={70} y2={205}/>
      <Fio x1={70} y1={205} x2={420} y2={205}/>
      {/* Nós de junção */}
      <No x={70} y={55}/><No x={420} y={55}/>
      <No x={70} y={205}/><No x={420} y={205}/>
      <No x={220} y={55}/><No x={220} y={205}/>
      {/* Resistor R1=8Ω (esquerda do paralelo) */}
      <Fio x1={220} y1={55} x2={220} y2={88}/>
      <Resistor x={208} y={88} w={24} h={80} label="R₁=8Ω" vertical/>
      <Fio x1={220} y1={168} x2={220} y2={205}/>
      {/* Resistor R2=12Ω (direita do paralelo) */}
      <Fio x1={330} y1={55} x2={330} y2={88}/>
      <Resistor x={318} y={88} w={24} h={80} label="R₂=12Ω" vertical/>
      <Fio x1={330} y1={168} x2={330} y2={205}/>
      {/* Fio da esquerda ao paralelo */}
      <Fio x1={70} y1={55} x2={220} y2={55}/>
      <Fio x1={220} y1={55} x2={330} y2={55}/>
      <Fio x1={330} y1={55} x2={420} y2={55}/>
      <Fio x1={70} y1={205} x2={420} y2={205}/>
      {/* Terminais A-B */}
      <No x={420} y={55}/><No x={420} y={205}/>
      <text x={430} y={59} fontSize="13" fill="#00e5ff" fontFamily="monospace" fontWeight="bold">A</text>
      <text x={430} y={209} fontSize="13" fill="#00e5ff" fontFamily="monospace" fontWeight="bold">B</text>
      <text x={200} y={40} fontSize="11" fill="#aaa" fontFamily="monospace">paralelo</text>
      <Ground x={70} y={205}/>
    </svg>
  );
}

// ── e14 — Transformador ideal 10:1, primário 2200V ──────────────────────────
function CircuitoE14() {
  const W = 500, H = 260;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      {/* Fonte primário */}
      <FonteCA cx={80} cy={130} r={28} label="2200V"/>
      <Fio x1={80} y1={102} x2={80} y2={55}/><Fio x1={80} y1={55} x2={200} y2={55}/>
      <Fio x1={80} y1={158} x2={80} y2={205}/><Fio x1={80} y1={205} x2={200} y2={205}/>
      {/* Bobina primária */}
      <path d="M200,80 A12,12 0 0,1 200,104 A12,12 0 0,1 200,128 A12,12 0 0,1 200,152 A12,12 0 0,1 200,176"
            fill="none" stroke="#b347ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#gp)"/>
      <Fio x1={200} y1={55} x2={200} y2={80}/><Fio x1={200} y1={176} x2={200} y2={205}/>
      {/* Núcleo */}
      <line x1={220} y1={70} x2={220} y2={190} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      <line x1={228} y1={70} x2={228} y2={190} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      {/* Bobina secundária */}
      <path d="M248,80 A12,12 0 0,0 248,104 A12,12 0 0,0 248,128 A12,12 0 0,0 248,152 A12,12 0 0,0 248,176"
            fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" filter="url(#gg)"/>
      <Fio x1={248} y1={55} x2={248} y2={80}/><Fio x1={248} y1={176} x2={248} y2={205}/>
      {/* Carga secundário */}
      <Fio x1={248} y1={55} x2={380} y2={55}/>
      <Fio x1={248} y1={205} x2={380} y2={205}/>
      <Resistor x={368} y={88} w={24} h={80} label="Rcarga" vertical/>
      <Fio x1={380} y1={55} x2={380} y2={88}/><Fio x1={380} y1={168} x2={380} y2={205}/>
      {/* Labels */}
      <text x={195} y={46} fontSize="10" fill="#b347ff" fontFamily="monospace" textAnchor="middle">N₁</text>
      <text x={253} y={46} fontSize="10" fill="#39ff14" fontFamily="monospace">N₂</text>
      <text x={220} y={215} fontSize="11" fill="#ff9500" fontFamily="monospace" textAnchor="middle">Relação 10:1</text>
      <text x={150} y={130} fontSize="11" fill="#b347ff" fontFamily="monospace" textAnchor="middle">V₁=2200V</text>
      <text x={325} y={130} fontSize="11" fill="#39ff14" fontFamily="monospace" textAnchor="middle">V₂=?</text>
      <Ground x={80} y={205}/>
    </svg>
  );
}

// ── ce3 — Divisor de tensão, R2=3×R1 ────────────────────────────────────────
function CircuitoCe3() {
  const W = 480, H = 280;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      <FonteCA cx={70} cy={140} r={28} label="V"/>
      <Fio x1={70} y1={112} x2={70} y2={60}/><Fio x1={70} y1={60} x2={320} y2={60}/>
      <Fio x1={70} y1={168} x2={70} y2={220}/><Fio x1={70} y1={220} x2={320} y2={220}/>
      {/* R1 em série */}
      <Fio x1={320} y1={60} x2={320} y2={88}/>
      <Resistor x={308} y={88} w={24} h={58} label="R₁" vertical/>
      <Fio x1={320} y1={146} x2={320} y2={165}/>
      {/* Nó central */}
      <No x={320} y={165}/>
      {/* R2=3×R1 em série */}
      <Resistor x={308} y={165} w={24} h={80} label="R₂=3R₁" vertical/>
      <Fio x1={320} y1={245} x2={320} y2={220}/>
      {/* Saída Vout (tensão sobre R2) */}
      <Fio x1={320} y1={165} x2={400} y2={165}/>
      <Fio x1={320} y1={220} x2={400} y2={220}/>
      <text x={408} y={198} fontSize="13" fill="#00bfff" fontFamily="monospace" fontWeight="bold">Vout</text>
      <line x1={402} y1={165} x2={402} y2={220} stroke="#00bfff" strokeWidth="1.5" strokeDasharray="4 3" filter="url(#gb)"/>
      <No x={320} y={165}/><No x={320} y={220}/>
      <Ground x={70} y={220}/>
      <text x={240} y={45} fontSize="11" fill="#aaa" fontFamily="monospace" textAnchor="middle">Divisor de tensão</text>
    </svg>
  );
}

// ── ce8 — Carga trifásica estrela, 3 fios ───────────────────────────────────
function CircuitoCe8() {
  const W = 500, H = 270;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      {/* Três geradores (fases A, B, C) */}
      <circle cx={90} cy={80}  r={22} fill="#070714" stroke="#39ff14" strokeWidth="2" filter="url(#gg)"/>
      <circle cx={90} cy={140} r={22} fill="#070714" stroke="#ff9500" strokeWidth="2" filter="url(#go)"/>
      <circle cx={90} cy={200} r={22} fill="#070714" stroke="#b347ff" strokeWidth="2" filter="url(#gp)"/>
      <text x={90} y={85}  fontSize="11" fill="#39ff14" fontFamily="monospace" textAnchor="middle">A</text>
      <text x={90} y={145} fontSize="11" fill="#ff9500" fontFamily="monospace" textAnchor="middle">B</text>
      <text x={90} y={205} fontSize="11" fill="#b347ff" fontFamily="monospace" textAnchor="middle">C</text>
      {/* Fios de fase → cargas */}
      <Fio x1={112} y1={80}  x2={300} y2={80}/>
      <Fio x1={112} y1={140} x2={300} y2={140}/>
      <Fio x1={112} y1={200} x2={300} y2={200}/>
      {/* Estrela — ponto neutro */}
      <Fio x1={300} y1={80}  x2={380} y2={135}/>
      <Fio x1={300} y1={140} x2={380} y2={135}/>
      <Fio x1={300} y1={200} x2={380} y2={135}/>
      <No x={380} y={135}/>
      {/* Cargas ZA, ZB, ZC */}
      <Resistor x={288} y={62}  w={24} h={36} label="Zₐ" vertical/>
      <Resistor x={288} y={122} w={24} h={36} label="Z_b" vertical/>
      <Resistor x={288} y={182} w={24} h={36} label="Z_c" vertical/>
      {/* Fio de neutro */}
      <Fio x1={68} y1={135} x2={68} y2={135}/> 
      <line x1={60} y1={80} x2={60} y2={200} stroke="#aaa" strokeWidth="1.5" strokeDasharray="4 3"/>
      <Fio x1={60} y1={140} x2={68} y2={140}/>
      <No x={68} y={140}/>
      <text x={35} y={144} fontSize="10" fill="#aaa" fontFamily="monospace">N</text>
      <text x={390} y={139} fontSize="11" fill="#00e5ff" fontFamily="monospace">N'</text>
      <text x={210} y={45} fontSize="11" fill="#aaa" fontFamily="monospace" textAnchor="middle">Carga trifásica — Estrela</text>
      <text x={210} y={258} fontSize="10" fill="#39ff14" fontFamily="monospace" textAnchor="middle">IL = IF  (linha = fase)</text>
    </svg>
  );
}

// ── ce18 — Transformador 400:100 espiras, 440V/8A ───────────────────────────
function CircuitoCe18() {
  const W = 500, H = 260;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      <FonteCA cx={80} cy={130} r={28} label="440V"/>
      <Fio x1={80} y1={102} x2={80} y2={55}/><Fio x1={80} y1={55} x2={200} y2={55}/>
      <Fio x1={80} y1={158} x2={80} y2={205}/><Fio x1={80} y1={205} x2={200} y2={205}/>
      {/* Bobina primária N1=400 */}
      <path d="M200,75 A12,12 0 0,1 200,99 A12,12 0 0,1 200,123 A12,12 0 0,1 200,147 A12,12 0 0,1 200,171"
            fill="none" stroke="#b347ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#gp)"/>
      <Fio x1={200} y1={55} x2={200} y2={75}/><Fio x1={200} y1={171} x2={200} y2={205}/>
      {/* Núcleo */}
      <line x1={220} y1={65} x2={220} y2={195} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      <line x1={228} y1={65} x2={228} y2={195} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      {/* Bobina secundária N2=100 — apenas 1 arco (ratio 4:1) */}
      <path d="M248,105 A12,12 0 0,0 248,129 A12,12 0 0,0 248,153"
            fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" filter="url(#gg)"/>
      <Fio x1={248} y1={90} x2={248} y2={105}/><Fio x1={248} y1={153} x2={248} y2={170}/>
      <Fio x1={248} y1={90} x2={380} y2={90}/><Fio x1={248} y1={170} x2={380} y2={170}/>
      <Resistor x={368} y={98} w={24} h={64} label="carga" vertical/>
      <Fio x1={380} y1={90} x2={380} y2={98}/><Fio x1={380} y1={162} x2={380} y2={170}/>
      {/* Labels */}
      <text x={194} y={46} fontSize="10" fill="#b347ff" fontFamily="monospace" textAnchor="middle">N₁=400</text>
      <text x={252} y={82} fontSize="10" fill="#39ff14" fontFamily="monospace">N₂=100</text>
      <text x={140} y={128} fontSize="11" fill="#b347ff" fontFamily="monospace" textAnchor="middle">V₁=440V</text>
      <text x={140} y={144} fontSize="10" fill="#b347ff" fontFamily="monospace" textAnchor="middle">I₁=8A</text>
      <text x={224} y={216} fontSize="11" fill="#ff9500" fontFamily="monospace" textAnchor="middle">Relação 4:1</text>
      <Ground x={80} y={205}/>
    </svg>
  );
}

// ── n1 — Dois wattímetros em carga trifásica ────────────────────────────────
function CircuitoN1() {
  const W = 520, H = 270;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      {/* Três fases */}
      <text x={30} y={84}  fontSize="12" fill="#39ff14" fontFamily="monospace" fontWeight="bold">A</text>
      <text x={30} y={144} fontSize="12" fill="#ff9500" fontFamily="monospace" fontWeight="bold">B</text>
      <text x={30} y={204} fontSize="12" fill="#b347ff" fontFamily="monospace" fontWeight="bold">C</text>
      {/* Fios das três fases */}
      <Fio x1={45} y1={80} x2={460} y2={80}/>
      <Fio x1={45} y1={140} x2={460} y2={140}/>
      <Fio x1={45} y1={200} x2={460} y2={200}/>
      {/* Wattímetro W1 na fase A */}
      <circle cx={160} cy={80} r={20} fill="#0a0a1a" stroke="#ff4da6" strokeWidth="2" filter="url(#gk)"/>
      <text x={160} y={85} fontSize="11" fill="#ff4da6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">W₁</text>
      {/* Bobina de tensão W1: fase A → fase B */}
      <line x1={160} y1={100} x2={160} y2={140} stroke="#ff4da6" strokeWidth="1.5" strokeDasharray="4 3" filter="url(#gk)"/>
      <text x={135} y={125} fontSize="10" fill="#ff4da6" fontFamily="monospace">900W</text>
      {/* Wattímetro W2 na fase C */}
      <circle cx={160} cy={200} r={20} fill="#0a0a1a" stroke="#00bfff" strokeWidth="2" filter="url(#gb)"/>
      <text x={160} y={205} fontSize="11" fill="#00bfff" fontFamily="monospace" fontWeight="bold" textAnchor="middle">W₂</text>
      {/* Bobina de tensão W2: fase C → fase B */}
      <line x1={160} y1={180} x2={160} y2={140} stroke="#00bfff" strokeWidth="1.5" strokeDasharray="4 3" filter="url(#gb)"/>
      <text x={135} y={168} fontSize="10" fill="#00bfff" fontFamily="monospace">500W</text>
      {/* Carga trifásica */}
      <rect x={390} y={65} width={70} height={150} rx="6" fill="#0d0820" stroke="#39ff14" strokeWidth="2" filter="url(#gg)"/>
      <text x={425} y={143} fontSize="11" fill="#39ff14" fontFamily="monospace" textAnchor="middle">Carga</text>
      <text x={425} y={157} fontSize="10" fill="#39ff14" fontFamily="monospace" textAnchor="middle">3φ</text>
      <No x={460} y={80}/><No x={460} y={140}/><No x={460} y={200}/>
      <text x={220} y={40} fontSize="11" fill="#aaa" fontFamily="monospace" textAnchor="middle">Método dos 2 wattímetros</text>
      <text x={220} y={255} fontSize="11" fill="#ff4da6" fontFamily="monospace" textAnchor="middle">P_total = W₁ + W₂ = 1400 W</text>
    </svg>
  );
}

// ── n4 — Motor trifásico partida estrela-triângulo ──────────────────────────
function CircuitoN4() {
  const W = 520, H = 280;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      {/* Três fases de alimentação */}
      <text x={25} y={84}  fontSize="12" fill="#39ff14" fontFamily="monospace" fontWeight="bold">L1</text>
      <text x={25} y={144} fontSize="12" fill="#ff9500" fontFamily="monospace" fontWeight="bold">L2</text>
      <text x={25} y={204} fontSize="12" fill="#b347ff" fontFamily="monospace" fontWeight="bold">L3</text>
      <Fio x1={45} y1={80} x2={200} y2={80}/>
      <Fio x1={45} y1={140} x2={200} y2={140}/>
      <Fio x1={45} y1={200} x2={200} y2={200}/>
      {/* Contator principal KM */}
      <rect x={200} y={60} width={50} height={160} rx="4" fill="#0d0820" stroke="#00e5ff" strokeWidth="2" filter="url(#gc)"/>
      <text x={225} y={143} fontSize="10" fill="#00e5ff" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KM</text>
      <Fio x1={250} y1={80} x2={310} y2={80}/>
      <Fio x1={250} y1={140} x2={310} y2={140}/>
      <Fio x1={250} y1={200} x2={310} y2={200}/>
      {/* Relé de sobrecarga */}
      <rect x={310} y={60} width={40} height={160} rx="4" fill="#0d0820" stroke="#ff4da6" strokeWidth="1.5" filter="url(#gk)"/>
      <text x={330} y={143} fontSize="9" fill="#ff4da6" fontFamily="monospace" textAnchor="middle">OL</text>
      <Fio x1={350} y1={80} x2={380} y2={80}/>
      <Fio x1={350} y1={140} x2={380} y2={140}/>
      <Fio x1={350} y1={200} x2={380} y2={200}/>
      {/* Motor */}
      <circle cx={430} cy={140} r={45} fill="#0d0820" stroke="#39ff14" strokeWidth="2.5" filter="url(#gg)"/>
      <text x={430} y={135} fontSize="14" fill="#39ff14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">M</text>
      <text x={430} y={152} fontSize="10" fill="#39ff14" fontFamily="monospace" textAnchor="middle">3φ</text>
      <Fio x1={380} y1={80} x2={390} y2={105}/>
      <Fio x1={380} y1={140} x2={385} y2={140}/>
      <Fio x1={380} y1={200} x2={390} y2={175}/>
      {/* Label Y-Δ */}
      <text x={260} y={245} fontSize="11" fill="#00e5ff" fontFamily="monospace" textAnchor="middle">Partida Y-Δ</text>
      <text x={260} y={260} fontSize="10" fill="#ff4da6" fontFamily="monospace" textAnchor="middle">Ipartida_Δ = 6×120 = 720A   |   IY = 720/3 = 240A</text>
    </svg>
  );
}

// ── n5 — Transformador 20:1, 4400V, 8A ──────────────────────────────────────
function CircuitoN5() {
  const W = 500, H = 260;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64">
      <Defs/><Fundo w={W} h={H}/>
      <FonteCA cx={75} cy={130} r={28} label="4400V"/>
      <Fio x1={75} y1={102} x2={75} y2={55}/><Fio x1={75} y1={55} x2={195} y2={55}/>
      <Fio x1={75} y1={158} x2={75} y2={205}/><Fio x1={75} y1={205} x2={195} y2={205}/>
      {/* Bobina N1=20 */}
      <path d="M195,68 A13,13 0 0,1 195,94 A13,13 0 0,1 195,120 A13,13 0 0,1 195,146 A13,13 0 0,1 195,172"
            fill="none" stroke="#b347ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#gp)"/>
      <Fio x1={195} y1={55} x2={195} y2={68}/><Fio x1={195} y1={172} x2={195} y2={205}/>
      {/* Núcleo */}
      <line x1={215} y1={62} x2={215} y2={198} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      <line x1={223} y1={62} x2={223} y2={198} stroke="#ff9500" strokeWidth="5" filter="url(#go)"/>
      {/* Bobina N2=1 — pequena */}
      <path d="M243,118 A12,12 0 0,0 243,142"
            fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" filter="url(#gg)"/>
      <Fio x1={243} y1={108} x2={243} y2={118}/><Fio x1={243} y1={142} x2={243} y2={152}/>
      <Fio x1={243} y1={108} x2={380} y2={108}/><Fio x1={243} y1={152} x2={380} y2={152}/>
      <Resistor x={368} y={112} w={24} h={64} label="Rcarga" vertical/>
      <Fio x1={380} y1={108} x2={380} y2={112}/><Fio x1={380} y1={176} x2={380} y2={152}/>
      <text x={190} y={46} fontSize="10" fill="#b347ff" fontFamily="monospace" textAnchor="middle">N₁=20</text>
      <text x={247} y={100} fontSize="10" fill="#39ff14" fontFamily="monospace">N₂=1</text>
      <text x={130} y={128} fontSize="11" fill="#b347ff" fontFamily="monospace" textAnchor="middle">4400V / 8A</text>
      <text x={220} y={220} fontSize="11" fill="#ff9500" fontFamily="monospace" textAnchor="middle">S = V₁×I₁ = 35,2 kVA</text>
      <Ground x={75} y={205}/>
    </svg>
  );
}

// ── n14 — Curvas de atuação de disjuntores (tempo × corrente) ───────────────
function CircuitoN14() {
  const W = 480, H = 280;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-72">
      <Defs/><Fundo w={W} h={H}/>
      {/* Eixos */}
      <line x1={70} y1={240} x2={430} y2={240} stroke="#aaa" strokeWidth="1.5"/>
      <line x1={70} y1={240} x2={70} y2={30} stroke="#aaa" strokeWidth="1.5"/>
      {/* Setas dos eixos */}
      <polygon points="430,237 430,243 440,240" fill="#aaa"/>
      <polygon points="67,30 73,30 70,20" fill="#aaa"/>
      {/* Labels eixos */}
      <text x={440} y={244} fontSize="12" fill="#aaa" fontFamily="monospace">I (A)</text>
      <text x={40} y={26} fontSize="12" fill="#aaa" fontFamily="monospace">t(s)</text>
      {/* Curva Disjuntor GERAL (mais lenta — linha branca) */}
      <path d="M 100,60 Q 140,80 200,130 Q 260,175 340,210 Q 380,228 420,238"
            fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="6 3" filter="url(#gc)"/>
      <text x={280} y={170} fontSize="11" fill="#ffffff" fontFamily="monospace">Geral</text>
      {/* Curva Disjuntor RAMAL (mais rápida — verde) */}
      <path d="M 100,100 Q 150,130 220,170 Q 290,205 370,228 Q 400,234 420,238"
            fill="none" stroke="#39ff14" strokeWidth="2.5" filter="url(#gg)"/>
      <text x={295} y={215} fontSize="11" fill="#39ff14" fontFamily="monospace">Ramal</text>
      {/* Linhas de grade */}
      {[100,150,200,250,300,350,400].map(x => (
        <line key={x} x1={x} y1={236} x2={x} y2={244} stroke="#aaa" strokeWidth="1"/>
      ))}
      {[60,100,140,180,220].map(y => (
        <line key={y} x1={66} y1={y} x2={74} y2={y} stroke="#aaa" strokeWidth="1"/>
      ))}
      {/* Destaque: ramal ABAIXO do geral → ramal atua primeiro */}
      <line x1={200} y1={130} x2={200} y2={170} stroke="#ff4da6" strokeWidth="1.5" strokeDasharray="3 2" filter="url(#gk)"/>
      <text x={206} y={155} fontSize="9" fill="#ff4da6" fontFamily="monospace">ramal mais rápido</text>
      <text x={240} y={268} fontSize="11" fill="#aaa" fontFamily="monospace" textAnchor="middle">Corrente →</text>
      <text x={240} y={20} fontSize="12" fill="#aaa" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Curvas Tempo × Corrente</text>
    </svg>
  );
}

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
  e2:    CircuitoE2,
  e14:   CircuitoE14,
  ce3:   CircuitoCe3,
  ce8:   CircuitoCe8,
  ce18:  CircuitoCe18,
  n1:    CircuitoN1,
  n4:    CircuitoN4,
  n5:    CircuitoN5,
  n14:   CircuitoN14,
  e306:  CircuitoE306,
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
