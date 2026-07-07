"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Tabelas de simbologia pneumática/hidráulica — baseadas na norma ISO 1219
// Desenhadas em SVG puro, organizadas por categoria
// ─────────────────────────────────────────────────────────────────────────────

interface Simbolo {
  descricao: string;
  svg: React.ReactNode;
}

// ── Componentes SVG reutilizáveis ─────────────────────────────────────────────
const C = "var(--text)";   // cor principal
const M = "var(--muted)";  // cor secundária
const A = "var(--accent)"; // destaque

// Célula de válvula direcional (quadrado com setas)
function CelulaValvula({ x, y, config }: {
  x: number; y: number;
  config: "block" | "cross" | "pass-l" | "pass-r" | "pass-both" | "tank-l" | "tank-r"
}) {
  const size = 18;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={size} height={size} fill="none" stroke={C} strokeWidth="1.2" />
      {config === "block" && (
        <>
          <line x1="5" y1="5" x2="5" y2="13" stroke={C} strokeWidth="1" />
          <line x1="13" y1="5" x2="13" y2="13" stroke={C} strokeWidth="1" />
        </>
      )}
      {config === "cross" && (
        <>
          <line x1="3" y1="9" x2="15" y2="9" stroke={C} strokeWidth="1.2" />
          <polygon points="12,6 15,9 12,12" fill={C} />
          <line x1="9" y1="3" x2="9" y2="15" stroke={C} strokeWidth="1.2" />
          <polygon points="6,12 9,15 12,12" fill={C} />
        </>
      )}
      {config === "pass-l" && (
        <>
          <path d="M3,9 L15,9 M3,5 L3,13" fill="none" stroke={C} strokeWidth="1.2" />
          <polygon points="12,6 15,9 12,12" fill={C} />
        </>
      )}
      {config === "pass-r" && (
        <>
          <path d="M3,9 L15,9 M15,5 L15,13" fill="none" stroke={C} strokeWidth="1.2" />
          <polygon points="6,6 3,9 6,12" fill={C} />
        </>
      )}
      {config === "pass-both" && (
        <>
          <line x1="3" y1="9" x2="15" y2="9" stroke={C} strokeWidth="1.2" />
          <polygon points="12,6 15,9 12,12" fill={C} />
          <polygon points="6,6 3,9 6,12" fill={C} />
        </>
      )}
      {config === "tank-l" && (
        <>
          <path d="M9,3 Q3,9 9,15" fill="none" stroke={C} strokeWidth="1.2" />
          <polygon points="6,12 9,15 9,12" fill={C} />
        </>
      )}
      {config === "tank-r" && (
        <>
          <path d="M9,3 Q15,9 9,15" fill="none" stroke={C} strokeWidth="1.2" />
          <polygon points="12,12 9,15 9,12" fill={C} />
        </>
      )}
    </g>
  );
}

// Linha de conexão com seta
function Porta({ x1, y1, x2, y2, seta = false }: { x1: number; y1: number; x2: number; y2: number; seta?: boolean }) {
  const dx = x2 - x1; const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len; const uy = dy / len;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C} strokeWidth="1.2" />
      {seta && (
        <polygon
          points={`${x2},${y2} ${x2 - ux * 4 - uy * 3},${y2 - uy * 4 + ux * 3} ${x2 - ux * 4 + uy * 3},${y2 - uy * 4 - ux * 3}`}
          fill={C}
        />
      )}
    </g>
  );
}

// Mola
function Mola({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) {
  const pts = vertical
    ? `${x},${y} ${x - 3},${y + 3} ${x + 3},${y + 6} ${x - 3},${y + 9} ${x + 3},${y + 12} ${x},${y + 15}`
    : `${x},${y} ${x + 3},${y - 3} ${x + 6},${y + 3} ${x + 9},${y - 3} ${x + 12},${y + 3} ${x + 15},${y}`;
  return <polyline points={pts} fill="none" stroke={C} strokeWidth="1.2" />;
}

// ── TABELA 1: Válvulas Direcionais ────────────────────────────────────────────
const VALVULAS_DIRECIONAIS: Simbolo[] = [
  {
    descricao: "Válvula direcional 2/2 vias — posição normal fechada",
    svg: (
      <svg viewBox="0 0 80 36" className="h-9 w-20">
        {/* Célula bloqueada + célula com passagem */}
        <rect x={5} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="10" y1="13" x2="10" y2="23" stroke={C} strokeWidth="1" />
        <line x1="16" y1="13" x2="16" y2="23" stroke={C} strokeWidth="1" />
        <rect x={27} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="42" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="39,15 42,18 39,21" fill={C} />
        {/* Portas */}
        <line x1="14" y1="27" x2="14" y2="34" stroke={C} strokeWidth="1.2" />
        <text x="12" y="34" fontSize="6" fill={M}>1</text>
        <line x1="14" y1="0" x2="14" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="12" y="7" fontSize="6" fill={M}>2</text>
        {/* Mola à direita */}
        <Mola x={47} y={15} />
        {/* Piloto manual */}
        <line x1="0" y1="18" x2="5" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="14" x2="0" y2="22" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Válvula direcional 2/2 vias — posição normal aberta",
    svg: (
      <svg viewBox="0 0 80 36" className="h-9 w-20">
        {/* Célula passagem + célula bloqueada */}
        <rect x={5} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="8" y1="18" x2="20" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="17,15 20,18 17,21" fill={C} />
        <rect x={27} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="13" x2="30" y2="23" stroke={C} strokeWidth="1" />
        <line x1="42" y1="13" x2="42" y2="23" stroke={C} strokeWidth="1" />
        {/* Portas */}
        <line x1="14" y1="27" x2="14" y2="34" stroke={C} strokeWidth="1.2" />
        <text x="12" y="34" fontSize="6" fill={M}>1</text>
        <line x1="14" y1="0" x2="14" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="12" y="7" fontSize="6" fill={M}>2</text>
        <Mola x={47} y={15} />
        <line x1="0" y1="18" x2="5" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="14" x2="0" y2="22" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Válvula direcional 3/2 vias — posição normal fechada",
    svg: (
      <svg viewBox="0 90 36" className="h-9 w-24">
        {/* 2 células */}
        <rect x={5} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="9" y1="13" x2="9" y2="23" stroke={C} strokeWidth="1" />
        <line x1="19" y1="13" x2="19" y2="23" stroke={C} strokeWidth="1" />
        <rect x={27} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="42" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="39,15 42,18 39,21" fill={C} />
        <line x1="36" y1="27" x2="36" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="33" y1="27" x2="39" y2="27" stroke={C} strokeWidth="1.5" />
        {/* Portas */}
        <line x1="14" y1="27" x2="14" y2="34" stroke={C} strokeWidth="1.2" />
        <text x="12" y="34" fontSize="6" fill={M}>1</text>
        <line x1="14" y1="0" x2="14" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="12" y="7" fontSize="6" fill={M}>2</text>
        <Mola x={47} y={15} />
        <line x1="0" y1="18" x2="5" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="14" x2="0" y2="22" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Válvula direcional 3/2 vias — posição normal aberta",
    svg: (
      <svg viewBox="0 0 90 36" className="h-9 w-24">
        <rect x={5} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="8" y1="18" x2="20" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="17,15 20,18 17,21" fill={C} />
        <line x1="14" y1="27" x2="14" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="11" y1="27" x2="17" y2="27" stroke={C} strokeWidth="1.5" />
        <rect x={27} y={9} width={18} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="13" x2="30" y2="23" stroke={C} strokeWidth="1" />
        <line x1="42" y1="13" x2="42" y2="23" stroke={C} strokeWidth="1" />
        {/* Portas */}
        <line x1="14" y1="0" x2="14" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="12" y="7" fontSize="6" fill={M}>2</text>
        <line x1="36" y1="27" x2="36" y2="34" stroke={C} strokeWidth="1.2" />
        <text x="34" y="34" fontSize="6" fill={M}>1</text>
        <Mola x={47} y={15} />
        <line x1="0" y1="18" x2="5" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="14" x2="0" y2="22" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Válvula direcional 4/2 vias",
    svg: (
      <svg viewBox="0 0 100 42" className="h-10 w-24">
        {/* Duas células */}
        <rect x={10} y={9} width={22} height={22} fill="none" stroke={C} strokeWidth="1.2" />
        {/* Cruz na primeira célula */}
        <line x1="13" y1="13" x2="29" y2="29" stroke={C} strokeWidth="1.2" />
        <polygon points="26,13 29,16 26,19" fill={C} transform="rotate(-45,29,29)" />
        <line x1="29" y1="13" x2="13" y2="29" stroke={C} strokeWidth="1.2" />
        <polygon points="16,26 13,29 16,32" fill={C} transform="rotate(45,13,29)" />
        <rect x={36} y={9} width={22} height={22} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="39" y1="20" x2="55" y2="20" stroke={C} strokeWidth="1.2" />
        <polygon points="52,17 55,20 52,23" fill={C} />
        <line x1="47" y1="11" x2="47" y2="31" stroke={C} strokeWidth="1.2" />
        <polygon points="44,28 47,31 50,28" fill={C} />
        {/* Portas */}
        <line x1="17" y1="31" x2="17" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="15" y="38" fontSize="6" fill={M}>4</text>
        <line x1="25" y1="31" x2="25" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="23" y="38" fontSize="6" fill={M}>2</text>
        <line x1="21" y1="0" x2="21" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="19" y="7" fontSize="6" fill={M}>1</text>
        <Mola x={60} y={16} />
        <line x1="0" y1="20" x2="10" y2="20" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="15" x2="0" y2="25" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Válvula direcional 5/2 vias",
    svg: (
      <svg viewBox="0 0 110 42" className="h-10 w-28">
        <rect x={8} y={9} width={22} height={22} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="11" y1="19" x2="27" y2="19" stroke={C} strokeWidth="1.2" />
        <polygon points="24,16 27,19 24,22" fill={C} />
        <line x1="19" y1="11" x2="19" y2="31" stroke={C} strokeWidth="1.2" />
        <polygon points="16,28 19,31 22,28" fill={C} />
        <rect x={34} y={9} width={22} height={22} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="37" y1="19" x2="53" y2="19" stroke={C} strokeWidth="1.2" />
        <polygon points="40,16 37,19 40,22" fill={C} />
        <line x1="45" y1="11" x2="45" y2="31" stroke={C} strokeWidth="1.2" />
        <polygon points="42,12 45,9 48,12" fill={C} />
        {/* Portas */}
        <line x1="12" y1="31" x2="12" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="10" y="38" fontSize="6" fill={M}>4</text>
        <line x1="24" y1="31" x2="24" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="22" y="38" fontSize="6" fill={M}>2</text>
        <line x1="18" y1="0" x2="18" y2="9" stroke={C} strokeWidth="1.2" />
        <text x="16" y="7" fontSize="6" fill={M}>1</text>
        <line x1="40" y1="31" x2="40" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="38" y="38" fontSize="6" fill={M}>3</text>
        <line x1="50" y1="31" x2="50" y2="38" stroke={C} strokeWidth="1.2" />
        <text x="48" y="38" fontSize="6" fill={M}>5</text>
        <Mola x={58} y={16} />
        <line x1="0" y1="20" x2="8" y2="20" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="15" x2="0" y2="25" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
];

// ── TABELA 2: Atuadores de Válvulas ───────────────────────────────────────────
const ATUADORES: Simbolo[] = [
  {
    descricao: "Controle manual geral",
    svg: (
      <svg viewBox="0 0 30 20" className="h-8 w-16">
        <line x1="0" y1="10" x2="12" y2="10" stroke={C} strokeWidth="1.2" />
        <line x1="8" y1="4" x2="16" y2="16" stroke={C} strokeWidth="1.5" />
        <line x1="12" y1="2" x2="20" y2="2" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Controle manual — botão",
    svg: (
      <svg viewBox="0 0 30 20" className="h-8 w-16">
        <line x1="0" y1="10" x2="12" y2="10" stroke={C} strokeWidth="1.2" />
        <line x1="12" y1="5" x2="12" y2="15" stroke={C} strokeWidth="1.5" />
        <rect x={12} y={6} width={8} height={8} fill="none" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Controle manual — pedal",
    svg: (
      <svg viewBox="0 0 35 22" className="h-8 w-16">
        <line x1="0" y1="11" x2="10" y2="11" stroke={C} strokeWidth="1.2" />
        <line x1="10" y1="4" x2="10" y2="18" stroke={C} strokeWidth="1.5" />
        <line x1="10" y1="16" x2="20" y2="16" stroke={C} strokeWidth="1.5" />
        <line x1="10" y1="6" x2="26" y2="6" stroke={C} strokeWidth="1" strokeDasharray="2 1" />
        <polygon points="22,3 26,6 22,9" fill={C} />
      </svg>
    ),
  },
  {
    descricao: "Controle mecânico — mola",
    svg: (
      <svg viewBox="0 0 30 20" className="h-8 w-16">
        <line x1="0" y1="10" x2="6" y2="10" stroke={C} strokeWidth="1.2" />
        <Mola x={6} y={7} />
      </svg>
    ),
  },
  {
    descricao: "Controle mecânico — rolete",
    svg: (
      <svg viewBox="0 0 30 22" className="h-8 w-16">
        <line x1="0" y1="11" x2="10" y2="11" stroke={C} strokeWidth="1.2" />
        <line x1="10" y1="5" x2="10" y2="17" stroke={C} strokeWidth="1.5" />
        <line x1="10" y1="5" x2="18" y2="5" stroke={C} strokeWidth="1.2" />
        <circle cx={18} cy={5} r={4} fill="none" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Eletroválvula — enrolamento simples",
    svg: (
      <svg viewBox="0 0 35 22" className="h-8 w-16">
        <line x1="0" y1="11" x2="8" y2="11" stroke={C} strokeWidth="1.2" />
        <rect x={8} y={4} width={20} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="11" y1="7" x2="11" y2="15" stroke={C} strokeWidth="1" />
        <line x1="14" y1="7" x2="14" y2="15" stroke={C} strokeWidth="1" />
        <line x1="17" y1="7" x2="17" y2="15" stroke={C} strokeWidth="1" />
        <line x1="20" y1="7" x2="20" y2="15" stroke={C} strokeWidth="1" />
        <line x1="23" y1="7" x2="23" y2="15" stroke={C} strokeWidth="1" />
      </svg>
    ),
  },
  {
    descricao: "Eletroválvula — dois enrolamentos (dupla ação)",
    svg: (
      <svg viewBox="0 0 50 22" className="h-8 w-20">
        <rect x={4} y={4} width={18} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="7" y1="7" x2="7" y2="15" stroke={C} strokeWidth="1" />
        <line x1="10" y1="7" x2="10" y2="15" stroke={C} strokeWidth="1" />
        <line x1="13" y1="7" x2="13" y2="15" stroke={C} strokeWidth="1" />
        <line x1="16" y1="7" x2="16" y2="15" stroke={C} strokeWidth="1" />
        <line x1="19" y1="7" x2="19" y2="15" stroke={C} strokeWidth="1" />
        <rect x={28} y={4} width={18} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="31" y1="7" x2="31" y2="15" stroke={C} strokeWidth="1" />
        <line x1="34" y1="7" x2="34" y2="15" stroke={C} strokeWidth="1" />
        <line x1="37" y1="7" x2="37" y2="15" stroke={C} strokeWidth="1" />
        <line x1="40" y1="7" x2="40" y2="15" stroke={C} strokeWidth="1" />
        <line x1="43" y1="7" x2="43" y2="15" stroke={C} strokeWidth="1" />
      </svg>
    ),
  },
  {
    descricao: "Controle de pressão (piloto pneumático)",
    svg: (
      <svg viewBox="0 0 30 22" className="h-8 w-16">
        <line x1="0" y1="11" x2="10" y2="11" stroke={C} strokeWidth="1.2" />
        <line x1="10" y1="5" x2="10" y2="17" stroke={C} strokeWidth="1.5" />
        <line x1="10" y1="11" x2="22" y2="11" stroke={C} strokeWidth="1.2" />
        <polygon points="19,8 22,11 19,14" fill={C} />
      </svg>
    ),
  },
];

// ── TABELA 3: Cilindros Pneumáticos ───────────────────────────────────────────
const CILINDROS: Simbolo[] = [
  {
    descricao: "Cilindro de simples efeito — contração por força externa",
    svg: (
      <svg viewBox="0 0 80 28" className="h-8 w-24">
        <rect x={5} y={7} width={45} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={50} y={10} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="62" y1="14" x2="75" y2="14" stroke={C} strokeWidth="1.5" />
        <line x1="5" y1="10" x2="5" y2="18" stroke={C} strokeWidth="2" />
        <line x1="5" y1="18" x2="10" y2="22" stroke={C} strokeWidth="1" />
        <line x1="8" y1="22" x2="15" y2="22" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Cilindro de simples efeito — retorno por mola",
    svg: (
      <svg viewBox="0 0 85 28" className="h-8 w-24">
        <rect x={5} y={7} width={50} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={55} y={10} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="67" y1="14" x2="80" y2="14" stroke={C} strokeWidth="1.5" />
        <line x1="5" y1="10" x2="5" y2="18" stroke={C} strokeWidth="2" />
        {/* Mola interna */}
        <polyline points="10,14 13,10 16,18 19,10 22,18 25,10 28,18 31,14" fill="none" stroke={C} strokeWidth="1" />
        <line x1="1" y1="21" x2="9" y2="21" stroke={C} strokeWidth="1.2" />
        <line x1="5" y1="18" x2="5" y2="21" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Cilindro de duplo efeito — haste simples",
    svg: (
      <svg viewBox="0 0 85 28" className="h-8 w-24">
        <rect x={5} y={7} width={55} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={60} y={10} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="72" y1="14" x2="82" y2="14" stroke={C} strokeWidth="1.5" />
        <line x1="5" y1="10" x2="5" y2="18" stroke={C} strokeWidth="2" />
        <line x1="60" y1="10" x2="60" y2="18" stroke={C} strokeWidth="2" />
        <line x1="1" y1="14" x2="9" y2="14" stroke={C} strokeWidth="1.2" />
        <line x1="5" y1="25" x2="5" y2="28" stroke={C} strokeWidth="1" />
        <line x1="65" y1="25" x2="65" y2="28" stroke={C} strokeWidth="1" />
        <text x="1" y="28" fontSize="5" fill={M}>1</text>
        <text x="61" y="28" fontSize="5" fill={M}>2</text>
      </svg>
    ),
  },
  {
    descricao: "Cilindro de duplo efeito — haste passante",
    svg: (
      <svg viewBox="0 0 95 28" className="h-8 w-28">
        <rect x={15} y={7} width={55} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={70} y={10} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="82" y1="14" x2="92" y2="14" stroke={C} strokeWidth="1.5" />
        <rect x={3} y={10} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="14" x2="3" y2="14" stroke={C} strokeWidth="1.5" />
        <line x1="15" y1="10" x2="15" y2="18" stroke={C} strokeWidth="2" />
        <line x1="70" y1="10" x2="70" y2="18" stroke={C} strokeWidth="2" />
      </svg>
    ),
  },
  {
    descricao: "Cilindro de duplo efeito — amortecimento ajustável (haste simples)",
    svg: (
      <svg viewBox="0 0 90 32" className="h-9 w-28">
        <rect x={5} y={7} width={55} height={18} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={60} y={11} width={12} height={10} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="72" y1="16" x2="82" y2="16" stroke={C} strokeWidth="1.5" />
        <line x1="5" y1="11" x2="5" y2="25" stroke={C} strokeWidth="2" />
        <line x1="60" y1="11" x2="60" y2="25" stroke={C} strokeWidth="2" />
        {/* Amortecimento esquerdo */}
        <polygon points="5,25 14,25 14,16 5,16" fill="none" stroke={C} strokeWidth="1" />
        <line x1="8" y1="25" x2="8" y2="16" stroke={C} strokeWidth="0.8" />
        {/* Amortecimento direito */}
        <polygon points="60,25 51,25 51,16 60,16" fill="none" stroke={C} strokeWidth="1" />
        <line x1="57" y1="25" x2="57" y2="16" stroke={C} strokeWidth="0.8" />
        {/* Seta regulação */}
        <line x1="8" y1="28" x2="14" y2="22" stroke={C} strokeWidth="1" />
        <polygon points="13,21 14,22 13,23" fill={C} />
        <line x1="51" y1="28" x2="57" y2="22" stroke={C} strokeWidth="1" />
        <polygon points="56,21 57,22 56,23" fill={C} />
        <line x1="1" y1="16" x2="9" y2="16" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Cilindro com leitura de curso — haste simples",
    svg: (
      <svg viewBox="0 0 90 30" className="h-9 w-28">
        <rect x={5} y={5} width={55} height={14} fill="none" stroke={C} strokeWidth="1.2" />
        <rect x={60} y={8} width={12} height={8} fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="72" y1="12" x2="82" y2="12" stroke={C} strokeWidth="1.5" />
        <line x1="5" y1="8" x2="5" y2="19" stroke={C} strokeWidth="2" />
        <line x1="60" y1="8" x2="60" y2="19" stroke={C} strokeWidth="2" />
        <line x1="1" y1="12" x2="9" y2="12" stroke={C} strokeWidth="1.2" />
        {/* Sensor de posição */}
        <rect x={12} y={19} width={40} height={8} fill="none" stroke={A} strokeWidth="1" strokeDasharray="2 1" />
        <text x="14" y="26" fontSize="5" fill={A}>sensor posição</text>
      </svg>
    ),
  },
];

// ── TABELA 4: Válvulas de Controle de Fluxo e Anti-retorno ────────────────────
const VALVULAS_FLUXO: Simbolo[] = [
  {
    descricao: "Válvula anti-retorno (check valve)",
    svg: (
      <svg viewBox="0 0 50 20" className="h-7 w-16">
        <line x1="0" y1="10" x2="15" y2="10" stroke={C} strokeWidth="1.2" />
        <polygon points="15,5 15,15 28,10" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="28" y1="5" x2="28" y2="15" stroke={C} strokeWidth="1.5" />
        <line x1="28" y1="10" x2="50" y2="10" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Válvula anti-retorno — sem mola",
    svg: (
      <svg viewBox="0 0 50 22" className="h-7 w-16">
        <line x1="0" y1="11" x2="12" y2="11" stroke={C} strokeWidth="1.2" />
        <polygon points="12,5 12,17 25,11" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="25" y1="5" x2="25" y2="17" stroke={C} strokeWidth="1.5" />
        <line x1="25" y1="11" x2="50" y2="11" stroke={C} strokeWidth="1.2" />
        <circle cx={11} cy={11} r={3} fill="none" stroke={C} strokeWidth="1" />
      </svg>
    ),
  },
  {
    descricao: "Válvula reguladora de caudal — ajustável",
    svg: (
      <svg viewBox="0 0 55 22" className="h-7 w-16">
        <line x1="0" y1="11" x2="12" y2="11" stroke={C} strokeWidth="1.2" />
        <line x1="12" y1="5" x2="12" y2="17" stroke={C} strokeWidth="1.5" />
        <line x1="12" y1="11" x2="30" y2="11" stroke={C} strokeWidth="1.2" />
        {/* Restrição variável */}
        <path d="M20,11 Q24,6 28,11 Q24,16 20,11" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="18" y1="16" x2="26" y2="8" stroke={C} strokeWidth="1" />
        <polygon points="25,7 26,8 25,9" fill={C} />
        <line x1="30" y1="5" x2="30" y2="17" stroke={C} strokeWidth="1.5" />
        <line x1="30" y1="11" x2="55" y2="11" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Válvula anti-retorno + reguladora (num sentido ajustável)",
    svg: (
      <svg viewBox="0 0 65 22" className="h-7 w-20">
        <line x1="0" y1="11" x2="8" y2="11" stroke={C} strokeWidth="1.2" />
        {/* Anti-retorno */}
        <polygon points="8,5 8,17 18,11" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="18" y1="5" x2="18" y2="17" stroke={C} strokeWidth="1.5" />
        {/* Paralela com reguladora */}
        <line x1="8" y1="5" x2="8" y2="2" stroke={C} strokeWidth="1" />
        <line x1="18" y1="5" x2="18" y2="2" stroke={C} strokeWidth="1" />
        <line x1="8" y1="2" x2="18" y2="2" stroke={C} strokeWidth="1" />
        <line x1="18" y1="11" x2="65" y2="11" stroke={C} strokeWidth="1.2" />
        {/* Reguladora no bypass */}
        <path d="M10,2 Q13,-2 16,2" fill="none" stroke={C} strokeWidth="1" />
        <line x1="11" y1="5" x2="15" y2="0" stroke={C} strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    descricao: "Válvula de escape rápido (quick exhaust)",
    svg: (
      <svg viewBox="0 0 55 28" className="h-8 w-16">
        {/* Triângulo típico da válvula de escape rápido */}
        <polygon points="5,5 5,23 35,14" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="35" y1="5" x2="35" y2="23" stroke={C} strokeWidth="1.5" />
        {/* Porta de escape */}
        <line x1="35" y1="14" x2="50" y2="14" stroke={C} strokeWidth="1.2" />
        <line x1="50" y1="10" x2="50" y2="18" stroke={C} strokeWidth="1.5" />
        <line x1="48" y1="21" x2="52" y2="21" stroke={C} strokeWidth="1.5" />
        <line x1="50" y1="18" x2="50" y2="21" stroke={C} strokeWidth="1" />
        <line x1="0" y1="14" x2="5" y2="14" stroke={C} strokeWidth="1.2" />
        <text x="48" y="27" fontSize="5" fill={M}>R</text>
        <text x="0" y="13" fontSize="5" fill={M}>1</text>
      </svg>
    ),
  },
  {
    descricao: "Válvula 'OU' (shuttle valve)",
    svg: (
      <svg viewBox="0 0 60 28" className="h-8 w-20">
        <line x1="0" y1="20" x2="10" y2="14" stroke={C} strokeWidth="1.2" />
        <line x1="0" y1="8" x2="10" y2="14" stroke={C} strokeWidth="1.2" />
        <path d="M10,8 Q30,5 50,14 Q30,23 10,20 Z" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="50" y1="14" x2="60" y2="14" stroke={C} strokeWidth="1.2" />
        <circle cx={30} cy={14} r={3} fill="none" stroke={C} strokeWidth="1" />
        <text x="0" y="27" fontSize="5" fill={M}>1</text>
        <text x="0" y="8" fontSize="5" fill={M}>2</text>
        <text x="55" y="13" fontSize="5" fill={M}>3</text>
      </svg>
    ),
  },
];

// ── TABELA 5: Tratamento do Ar (FRL) ──────────────────────────────────────────
const TRATAMENTO_AR: Simbolo[] = [
  {
    descricao: "Filtro com separador de água",
    svg: (
      <svg viewBox="0 0 40 40" className="h-10 w-12">
        <line x1="0" y1="18" x2="10" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="40" y2="18" stroke={C} strokeWidth="1.2" />
        {/* Losango = filtro */}
        <polygon points="20,5 30,18 20,31 10,18" fill="none" stroke={C} strokeWidth="1.5" />
        {/* Separador de água — copo */}
        <path d="M12,31 L12,37 L28,37 L28,31" fill="none" stroke={C} strokeWidth="1.2" />
        {/* Gotejamento */}
        <line x1="20" y1="31" x2="20" y2="37" stroke={C} strokeWidth="1" />
        <text x="16" y="38" fontSize="5" fill={M}>purga</text>
      </svg>
    ),
  },
  {
    descricao: "Regulador de pressão — ajustável",
    svg: (
      <svg viewBox="0 0 40 40" className="h-10 w-12">
        <line x1="0" y1="20" x2="10" y2="20" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="20" x2="40" y2="20" stroke={C} strokeWidth="1.2" />
        {/* Losango regulador */}
        <polygon points="20,7 30,20 20,33 10,20" fill="none" stroke={C} strokeWidth="1.5" />
        {/* Seta variável */}
        <line x1="12" y1="28" x2="28" y2="12" stroke={C} strokeWidth="1" />
        <polygon points="27,11 28,12 27,13" fill={C} />
        {/* Piloto interno */}
        <line x1="20" y1="7" x2="20" y2="0" stroke={C} strokeWidth="1" strokeDasharray="2 1" />
        <polygon points="17,2 20,0 23,2" fill={C} />
      </svg>
    ),
  },
  {
    descricao: "Lubrificador",
    svg: (
      <svg viewBox="0 0 40 40" className="h-10 w-12">
        <line x1="0" y1="18" x2="10" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="40" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="20,5 30,18 20,31 10,18" fill="none" stroke={C} strokeWidth="1.5" />
        {/* Gotas de óleo */}
        <circle cx={20} cy={22} r={2} fill={C} opacity={0.6} />
        <path d="M20,28 Q17,31 20,34 Q23,31 20,28" fill={C} opacity={0.6} />
      </svg>
    ),
  },
  {
    descricao: "Manômetro pneumático",
    svg: (
      <svg viewBox="0 0 30 32" className="h-10 w-10">
        <line x1="15" y1="25" x2="15" y2="32" stroke={C} strokeWidth="1.2" />
        <circle cx={15} cy={15} r={12} fill="none" stroke={C} strokeWidth="1.5" />
        <line x1="15" y1="15" x2="22" y2="9" stroke={C} strokeWidth="1.5" />
        <circle cx={15} cy={15} r={1.5} fill={C} />
      </svg>
    ),
  },
  {
    descricao: "Unidade de manutenção FRL (filtro + regulador + lubrificador)",
    svg: (
      <svg viewBox="0 0 80 40" className="h-10 w-24">
        <line x1="0" y1="18" x2="8" y2="18" stroke={C} strokeWidth="1.2" />
        {/* Filtro */}
        <polygon points="18,5 28,18 18,31 8,18" fill="none" stroke={C} strokeWidth="1.3" />
        <path d="M10,28 L10,35 L26,35 L26,28" fill="none" stroke={C} strokeWidth="1" />
        {/* Conector */}
        <line x1="28" y1="18" x2="36" y2="18" stroke={C} strokeWidth="1.2" />
        {/* Regulador */}
        <polygon points="46,5 56,18 46,31 36,18" fill="none" stroke={C} strokeWidth="1.3" />
        <line x1="38" y1="28" x2="54" y2="8" stroke={C} strokeWidth="1" />
        <polygon points="53,7 54,8 53,9" fill={C} />
        <line x1="46" y1="5" x2="46" y2="0" stroke={C} strokeWidth="1" strokeDasharray="2 1" />
        {/* Conector */}
        <line x1="56" y1="18" x2="64" y2="18" stroke={C} strokeWidth="1.2" />
        {/* Lubrificador */}
        <polygon points="74,5 84,18 74,31 64,18" fill="none" stroke={C} strokeWidth="1.3" />
        <circle cx={74} cy={22} r={2} fill={C} opacity={0.6} />
        <line x1="84" y1="18" x2="92" y2="18" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Reservatório pneumático",
    svg: (
      <svg viewBox="0 0 60 24" className="h-8 w-20">
        <line x1="0" y1="12" x2="8" y2="12" stroke={C} strokeWidth="1.2" />
        <line x1="52" y1="12" x2="60" y2="12" stroke={C} strokeWidth="1.2" />
        <rect x={8} y={4} width={44} height={16} rx={8} fill="none" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    descricao: "Filtro fino micrónico",
    svg: (
      <svg viewBox="0 0 40 40" className="h-10 w-12">
        <line x1="0" y1="18" x2="10" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="40" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="20,5 30,18 20,31 10,18" fill="none" stroke={C} strokeWidth="1.5" />
        {/* Indicação de filtração fina */}
        <polygon points="20,10 26,18 20,26 14,18" fill="none" stroke={C} strokeWidth="0.8" />
        <path d="M13,30 L13,36 L27,36 L27,30" fill="none" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Secador",
    svg: (
      <svg viewBox="0 0 40 38" className="h-10 w-12">
        <line x1="0" y1="18" x2="10" y2="18" stroke={C} strokeWidth="1.2" />
        <line x1="30" y1="18" x2="40" y2="18" stroke={C} strokeWidth="1.2" />
        <polygon points="20,5 30,18 20,31 10,18" fill="none" stroke={C} strokeWidth="1.5" />
        {/* S de secador */}
        <text x="15" y="22" fontSize="9" fill={C} fontWeight="bold">S</text>
      </svg>
    ),
  },
];

// ── TABELA 6: Pressostatos e Silenciadores ────────────────────────────────────
const OUTROS: Simbolo[] = [
  {
    descricao: "Pressostato (pressure switch)",
    svg: (
      <svg viewBox="0 0 55 30" className="h-8 w-20">
        <line x1="0" y1="15" x2="10" y2="15" stroke={C} strokeWidth="1.2" />
        {/* Losango pressão */}
        <polygon points="20,5 30,15 20,25 10,15" fill="none" stroke={C} strokeWidth="1.3" />
        {/* Switch elétrico */}
        <line x1="30" y1="15" x2="38" y2="15" stroke={C} strokeWidth="1.2" />
        <line x1="38" y1="10" x2="38" y2="20" stroke={C} strokeWidth="1.5" />
        <line x1="38" y1="10" x2="50" y2="10" stroke={C} strokeWidth="1.2" />
        <line x1="38" y1="20" x2="50" y2="20" stroke={C} strokeWidth="1.2" />
        <line x1="38" y1="13" x2="46" y2="10" stroke={C} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    descricao: "Silenciador",
    svg: (
      <svg viewBox="0 0 40 24" className="h-7 w-14">
        <line x1="0" y1="12" x2="10" y2="12" stroke={C} strokeWidth="1.2" />
        <rect x={10} y={5} width={20} height={14} rx={3} fill="none" stroke={C} strokeWidth="1.5" />
        {/* Linhas de difusão */}
        <line x1="14" y1="8" x2="14" y2="16" stroke={C} strokeWidth="0.8" />
        <line x1="18" y1="8" x2="18" y2="16" stroke={C} strokeWidth="0.8" />
        <line x1="22" y1="8" x2="22" y2="16" stroke={C} strokeWidth="0.8" />
        <line x1="26" y1="8" x2="26" y2="16" stroke={C} strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    descricao: "Ejector de vácuo",
    svg: (
      <svg viewBox="0 0 55 28" className="h-8 w-18">
        <line x1="0" y1="8" x2="12" y2="8" stroke={C} strokeWidth="1.2" />
        <polygon points="12,3 12,13 35,8" fill="none" stroke={C} strokeWidth="1.2" />
        <line x1="35" y1="8" x2="50" y2="8" stroke={C} strokeWidth="1.2" />
        <line x1="25" y1="13" x2="25" y2="25" stroke={C} strokeWidth="1.2" />
        <text x="22" y="28" fontSize="5" fill={M}>vácuo</text>
      </svg>
    ),
  },
  {
    descricao: "Actuador rotativo — duplo efeito",
    svg: (
      <svg viewBox="0 0 36 32" className="h-9 w-12">
        <circle cx={18} cy={16} r={13} fill="none" stroke={C} strokeWidth="1.5" />
        <path d="M5,16 Q18,2 31,16" fill="none" stroke={C} strokeWidth="1.2" />
        <polygon points="28,13 31,16 28,19" fill={C} />
        <path d="M31,16 Q18,30 5,16" fill="none" stroke={C} strokeWidth="1.2" strokeDasharray="2 1" />
        <polygon points="8,19 5,16 8,13" fill={C} />
        <line x1="18" y1="3" x2="18" y2="0" stroke={C} strokeWidth="1.5" />
        <line x1="18" y1="29" x2="18" y2="32" stroke={C} strokeWidth="1.5" />
      </svg>
    ),
  },
];

// ── Componente principal ──────────────────────────────────────────────────────
export type TabelaSimbolosId =
  | "valvulas-direcionais"
  | "atuadores"
  | "cilindros"
  | "valvulas-fluxo"
  | "tratamento-ar"
  | "outros-pneumaticos";

const TABELAS: Record<TabelaSimbolosId, { titulo: string; simbolos: Simbolo[] }> = {
  "valvulas-direcionais": { titulo: "Válvulas Direcionais (ISO 1219)", simbolos: VALVULAS_DIRECIONAIS },
  "atuadores": { titulo: "Atuadores de Válvulas", simbolos: ATUADORES },
  "cilindros": { titulo: "Cilindros Pneumáticos", simbolos: CILINDROS },
  "valvulas-fluxo": { titulo: "Válvulas de Controle de Fluxo e Anti-retorno", simbolos: VALVULAS_FLUXO },
  "tratamento-ar": { titulo: "Tratamento do Ar — Filtro, Regulador, Lubrificador", simbolos: TRATAMENTO_AR },
  "outros-pneumaticos": { titulo: "Pressostatos, Silenciadores e Outros", simbolos: OUTROS },
};

export default function TabelaSimbolos({ id }: { id: TabelaSimbolosId }) {
  const tabela = TABELAS[id];
  if (!tabela) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-panel-border">
      <div className="bg-accent/10 px-4 py-2 border-b border-panel-border">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">{tabela.titulo}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-panel-border bg-bg-elevated">
              <th className="px-4 py-2 text-left text-xs text-muted font-normal w-32">Símbolo</th>
              <th className="px-4 py-2 text-left text-xs text-muted font-normal">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {tabela.simbolos.map((s, i) => (
              <tr key={i} className={`border-b border-panel-border/50 ${i % 2 === 0 ? "" : "bg-bg-elevated/30"}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center">{s.svg}</div>
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-text">{s.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
