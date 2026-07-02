"use client";

/**
 * VidroTrincado — overlay SVG de vidro quebrado com animação
 * de propagação das rachaduras (strokeDashoffset) e fragmentos
 * triangulares com reflexo, exatamente como vidro golpeado por martelo.
 */
export default function VidroTrincado({ visivel }: { visivel: boolean }) {
  if (!visivel) return null;

  // Ponto de impacto: levemente acima-esquerdo do centro
  const cx = 50;
  const cy = 46;

  // Braços principais com ramificações: [caminho, comprimento aprox]
  const bracos: { d: string; len: number; delay: number }[] = [
    { d: `M${cx},${cy} L80,12`,           len: 58, delay: 0    },
    { d: `M80,12 L92,4`,                  len: 15, delay: 60   },
    { d: `M80,12 L88,22`,                 len: 13, delay: 70   },
    { d: `M${cx},${cy} L100,38`,          len: 52, delay: 10   },
    { d: `M100,38 L100,22`,               len: 16, delay: 65   },
    { d: `M${cx},${cy} L82,82`,           len: 57, delay: 5    },
    { d: `M82,82 L95,96`,                 len: 18, delay: 62   },
    { d: `M82,82 L72,98`,                 len: 18, delay: 72   },
    { d: `M${cx},${cy} L48,100`,          len: 54, delay: 15   },
    { d: `M48,100 L35,100`,               len: 13, delay: 68   },
    { d: `M${cx},${cy} L14,80`,           len: 52, delay: 8    },
    { d: `M14,80 L2,95`,                  len: 17, delay: 63   },
    { d: `M14,80 L4,70`,                  len: 14, delay: 73   },
    { d: `M${cx},${cy} L0,50`,            len: 52, delay: 12   },
    { d: `M0,50 L0,32`,                   len: 18, delay: 66   },
    { d: `M${cx},${cy} L16,14`,           len: 52, delay: 3    },
    { d: `M16,14 L4,4`,                   len: 17, delay: 60   },
    { d: `M16,14 L24,4`,                  len: 13, delay: 68   },
    { d: `M${cx},${cy} L50,0`,            len: 46, delay: 18   },
    // sub-ramificações saindo dos braços principais
    { d: `M68,28 L78,18`,                 len: 14, delay: 80   },
    { d: `M35,68 L22,75`,                 len: 15, delay: 82   },
    { d: `M30,34 L20,25`,                 len: 15, delay: 78   },
    { d: `M62,64 L72,72`,                 len: 14, delay: 84   },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        {/* Escurecimento geral — simula perda de luz do vidro quebrado */}
        <radialGradient id="vt-escuro" cx="50%" cy="46%" r="60%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.60)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </radialGradient>
        {/* Brilho no ponto de impacto */}
        <radialGradient id="vt-brilho" cx="50%" cy="46%" r="10%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Reflexo nos fragmentos centrais */}
        <linearGradient id="vt-reflexo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>

      {/* Camada de escurecimento */}
      <rect width="100" height="100" fill="url(#vt-escuro)" />

      {/* Sombras das rachaduras (deslocadas) */}
      {bracos.map(({ d }, i) => (
        <path
          key={`s${i}`}
          d={d}
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          transform="translate(0.5,0.5)"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            animation: `propagar 0.18s ${bracos[i].delay}ms ease-out forwards`,
          }}
        />
      ))}

      {/* Rachaduras brancas principais */}
      {bracos.map(({ d, len, delay }) => (
        <path
          key={`r${d}`}
          d={d}
          stroke="rgba(255,255,255,0.88)"
          strokeWidth="0.55"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: len + 5,
            strokeDashoffset: len + 5,
            animation: `propagar 0.16s ${delay}ms ease-out forwards`,
          }}
        />
      ))}

      {/* Fragmentos triangulares perto do impacto com reflexo */}
      {[
        `M${cx},${cy} L${cx+14},${cy-12} L${cx+18},${cy+2} Z`,
        `M${cx},${cy} L${cx-4},${cy-14} L${cx+10},${cy-16} Z`,
        `M${cx},${cy} L${cx-14},${cy-8} L${cx-16},${cy+6} Z`,
        `M${cx},${cy} L${cx-12},${cy+10} L${cx-4},${cy+18} Z`,
        `M${cx},${cy} L${cx+6},${cy+16} L${cx+16},${cy+8} Z`,
        `M${cx},${cy} L${cx+18},${cy-4} L${cx+16},${cy+10} Z`,
      ].map((d, i) => (
        <path
          key={`f${i}`}
          d={d}
          fill="url(#vt-reflexo)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.35"
          style={{
            animation: `surgir 0.12s ${i * 12}ms ease-out both`,
          }}
        />
      ))}

      {/* Halo e ponto de impacto */}
      <circle cx={cx} cy={cy} r="7"   fill="url(#vt-brilho)" style={{ animation: "surgir 0.1s ease-out both" }} />
      <circle cx={cx} cy={cy} r="2.5" fill="white" opacity="0.9" style={{ animation: "surgir 0.08s ease-out both" }} />
      <circle cx={cx} cy={cy} r="1"   fill="white"               style={{ animation: "surgir 0.06s ease-out both" }} />

      <style>{`
        @keyframes propagar {
          to { stroke-dashoffset: 0; }
        }
        @keyframes surgir {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </svg>
  );
}
