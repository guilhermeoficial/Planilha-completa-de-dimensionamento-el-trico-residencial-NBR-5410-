"use client";

/**
 * Pequena biblioteca de diagramas de circuito em SVG, usados para ilustrar
 * questões do banco que fazem referência a esquemas elétricos.
 */

const linha = { stroke: "#9aa3b2", strokeWidth: 2.5, fill: "none" as const };
const texto = { fill: "var(--text)", fontSize: 12 };

export function DiagramaResistoresSerie({ r1 = "R1", r2 = "R2" }: { r1?: string; r2?: string }) {
  return (
    <svg viewBox="0 0 300 100" className="w-full max-w-sm">
      <path d="M20,50 H70" {...linha} />
      <rect x="70" y="38" width="50" height="24" fill="none" stroke="var(--accent)" strokeWidth={2} />
      <text x="95" y="30" textAnchor="middle" {...texto}>{r1}</text>
      <path d="M120,50 H170" {...linha} />
      <rect x="170" y="38" width="50" height="24" fill="none" stroke="var(--phase-s)" strokeWidth={2} />
      <text x="195" y="30" textAnchor="middle" {...texto}>{r2}</text>
      <path d="M220,50 H280 V80 H20 V50" {...linha} />
      <circle cx="20" cy="80" r="3" fill="var(--accent)" />
      <text x="10" y="95" {...texto} fontSize={10}>+V−</text>
    </svg>
  );
}

export function DiagramaResistoresParalelo({ r1 = "R1", r2 = "R2" }: { r1?: string; r2?: string }) {
  return (
    <svg viewBox="0 0 260 120" className="w-full max-w-xs">
      <path d="M20,20 H100 M20,100 H100" {...linha} />
      <path d="M20,20 V100" {...linha} />
      <rect x="100" y="30" width="40" height="20" fill="none" stroke="var(--accent)" strokeWidth={2} />
      <path d="M120,20 V30 M120,50 V100 M100,20 H140 M100,100 H140" {...linha} />
      <text x="120" y="20" textAnchor="middle" {...texto}>{r1}</text>
      <rect x="170" y="30" width="40" height="20" fill="none" stroke="var(--phase-s)" strokeWidth={2} />
      <path d="M190,20 V30 M190,50 V100 M140,20 H230 M140,100 H230" {...linha} />
      <text x="190" y="20" textAnchor="middle" {...texto}>{r2}</text>
      <path d="M230,20 V100" {...linha} />
      <text x="5" y="65" {...texto} fontSize={10}>+V−</text>
    </svg>
  );
}

export function DiagramaDivisorTensao({ r1 = "R1", r2 = "R2" }: { r1?: string; r2?: string }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-[200px]">
      <path d="M100,10 V40" {...linha} />
      <rect x="80" y="40" width="40" height="30" fill="none" stroke="var(--accent)" strokeWidth={2} />
      <text x="130" y="60" {...texto}>{r1}</text>
      <path d="M100,70 V90" {...linha} />
      <circle cx="100" cy="90" r="3" fill="var(--phase-t)" />
      <text x="115" y="93" {...texto} fontSize={10}>Vout</text>
      <rect x="80" y="90" width="40" height="30" fill="none" stroke="var(--phase-s)" strokeWidth={2} />
      <text x="130" y="110" {...texto}>{r2}</text>
      <path d="M100,120 V150 M30,10 H170 M30,150 H170" {...linha} />
      <path d="M30,10 V150 M170,10 V150" {...linha} />
      <text x="10" y="80" {...texto} fontSize={10}>+V−</text>
    </svg>
  );
}

export function DiagramaTransformador({ n1 = "N1", n2 = "N2" }: { n1?: string; n2?: string }) {
  return (
    <svg viewBox="0 0 260 140" className="w-full max-w-sm">
      <path d="M20,30 V110 M20,30 H60 M20,110 H60" {...linha} />
      <path d="M70,20 Q80,20 80,35 Q80,50 70,50 Q80,50 80,65 Q80,80 70,80 Q80,80 80,95 Q80,110 70,110" fill="none" stroke="var(--accent)" strokeWidth={2.5} />
      <path d="M75,20 V20 M75,110 V110" {...linha} />
      <line x1="92" y1="15" x2="92" y2="115" stroke="var(--panel-border)" strokeWidth={2} strokeDasharray="4 3" />
      <path d="M105,20 Q115,20 115,35 Q115,50 105,50 Q115,50 115,65 Q115,80 105,80 Q115,80 115,95 Q115,110 105,110" fill="none" stroke="var(--phase-s)" strokeWidth={2.5} />
      <path d="M120,30 H160 M120,110 H160" {...linha} />
      <text x="40" y="20" textAnchor="middle" {...texto} fontSize={11}>{n1}</text>
      <text x="140" y="20" textAnchor="middle" {...texto} fontSize={11}>{n2}</text>
      <text x="20" y="135" {...texto} fontSize={10}>Primário</text>
      <text x="140" y="135" {...texto} fontSize={10}>Secundário</text>
    </svg>
  );
}

export function DiagramaWattimetros() {
  return (
    <svg viewBox="0 0 260 160" className="w-full max-w-sm">
      <text x="10" y="20" {...texto} fontSize={11}>L1</text>
      <path d="M20,20 H80" {...linha} />
      <circle cx="100" cy="20" r="20" fill="none" stroke="var(--accent)" strokeWidth={2} />
      <text x="100" y="25" textAnchor="middle" {...texto} fontSize={11}>W1</text>
      <path d="M120,20 H230" {...linha} />
      <text x="10" y="80" {...texto} fontSize={11}>L2</text>
      <path d="M20,80 H230" {...linha} />
      <text x="10" y="140" {...texto} fontSize={11}>L3</text>
      <path d="M20,140 H80" {...linha} />
      <circle cx="100" cy="140" r="20" fill="none" stroke="var(--phase-s)" strokeWidth={2} />
      <text x="100" y="145" textAnchor="middle" {...texto} fontSize={11}>W2</text>
      <path d="M120,140 H230" {...linha} />
      <rect x="230" y="10" width="20" height="140" fill="none" stroke="var(--panel-border)" strokeWidth={2} />
      <text x="240" y="85" textAnchor="middle" {...texto} fontSize={10} transform="rotate(90 240 85)">Carga 3φ</text>
    </svg>
  );
}

export function DiagramaEstrelaTriangulo() {
  return (
    <svg viewBox="0 0 260 160" className="w-full max-w-sm">
      <circle cx="130" cy="80" r="35" fill="none" stroke="var(--accent)" strokeWidth={2.5} />
      <text x="130" y="85" textAnchor="middle" {...texto} fontSize={13} fontWeight="bold">M</text>
      <text x="130" y="135" textAnchor="middle" {...texto} fontSize={11}>Motor trifásico</text>
      {[0, 1, 2].map((i) => {
        const angle = (i * 120 - 90) * (Math.PI / 180);
        const x2 = 130 + 70 * Math.cos(angle);
        const y2 = 80 + 70 * Math.sin(angle);
        const x1 = 130 + 35 * Math.cos(angle);
        const y1 = 80 + 35 * Math.sin(angle);
        return (
          <g key={i}>
            <path d={`M${x1},${y1} L${x2},${y2}`} {...linha} />
            <text x={x2 + (i === 0 ? 0 : i === 1 ? 10 : -10)} y={y2 - 8} {...texto} fontSize={11}>
              {["1U", "1V", "1W"][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DiagramaCurvaDisjuntor() {
  return (
    <svg viewBox="0 0 260 160" className="w-full max-w-sm">
      <path d="M20,20 V140 H240" {...linha} />
      <text x="5" y="15" {...texto} fontSize={9}>t(s)</text>
      <text x="225" y="155" {...texto} fontSize={9}>I/In</text>
      <path d="M40,30 C70,60 90,90 110,135" fill="none" stroke="var(--phase-s)" strokeWidth={2.5} />
      <text x="50" y="25" {...texto} fontSize={10} fill="var(--phase-s)">Disjuntor de ramal</text>
      <path d="M100,30 C150,60 180,100 200,135" fill="none" stroke="var(--accent)" strokeWidth={2.5} />
      <text x="130" y="25" {...texto} fontSize={10} fill="var(--accent)">Disjuntor geral</text>
    </svg>
  );
}
