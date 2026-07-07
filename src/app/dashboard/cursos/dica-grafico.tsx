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
  | "curva-disjuntor"
  | "valvula-globo"
  | "valvula-borboleta"
  | "valvula-esfera"
  | "valvula-diafragma"
  | "valvula-gaveta"
  | "atuador-pneumatico"
  | "loop-controle"
  | "sinal-4-20ma";

interface Props {
  gatilho: string;
  titulo: string;
  explicacao: string;
  tipo: TipoGrafico;
}

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
        <span className="absolute left-0 top-full z-20 mt-2 block w-80 rounded-lg border border-panel-border bg-bg-elevated p-3 text-left shadow-2xl shadow-black/50">
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

  // ── Ondas senoidais ─────────────────────────────────────────────────────
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

  // ── Triângulo de potências ───────────────────────────────────────────────
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

  // ── Carga/descarga RC e RL ───────────────────────────────────────────────
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
        <text x="5" y="12" fontSize="9" fill="var(--accent)">{subindo ? "V capacitor" : "I indutor"}</text>
        <text x="290" y="70" fontSize="8" fill="var(--muted)">tempo (τ)</text>
      </svg>
    );
  }

  // ── Comparação estrela × triângulo ──────────────────────────────────────
  if (tipo === "comparacao-corrente") {
    return (
      <svg viewBox="0 0 200 70" className="w-full">
        <rect x="30" y="10" width="30" height="50" fill="var(--phase-t)" opacity={0.8} />
        <text x="45" y="68" fontSize="8" textAnchor="middle" fill="var(--muted)">Estrela</text>
        <rect x="120" y="-10" width="30" height="70" fill="var(--accent)" opacity={0.8} />
        <text x="135" y="68" fontSize="8" textAnchor="middle" fill="var(--muted)">Triângulo</text>
        <text x="45" y="8" fontSize="8" fill="var(--phase-t)" textAnchor="middle">1×</text>
        <text x="135" y="8" fontSize="8" fill="var(--accent)" textAnchor="middle">√3×</text>
      </svg>
    );
  }

  // ── Curva B-H ───────────────────────────────────────────────────────────
  if (tipo === "curva-bh") {
    const curva = Array.from({ length: 41 }, (_, i) => {
      const x = i * 9;
      const h = i / 40;
      const b = 60 * (1 - Math.exp(-h * 4));
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
        <text x="190" y="22" fontSize="8" fill="var(--phase-s)">saturação</text>
      </svg>
    );
  }

  // ── Torque × velocidade (motor de indução) ──────────────────────────────
  if (tipo === "torque-velocidade-inducao") {
    const curva = Array.from({ length: 51 }, (_, i) => {
      const s = 1 - i / 50;
      const x = (1 - s) * 340 + 10;
      const escorreg = 1 - s;
      const torque = (2.2 * escorreg) / (0.25 + escorreg * escorreg);
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

  // ── Curva disjuntor ─────────────────────────────────────────────────────
  if (tipo === "curva-disjuntor") {
    const curva = Array.from({ length: 51 }, (_, i) => {
      const x = 10 + i * 6.8;
      const t = i / 50;
      const tempo = 60 * Math.exp(-t * 5.5) + 2;
      const y = 68 - Math.min(60, tempo);
      return `${x},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 360 75" className="w-full">
        <line x1="10" y1="68" x2="350" y2="68" stroke="var(--panel-border)" strokeWidth={1} />
        <line x1="10" y1="68" x2="10" y2="5" stroke="var(--panel-border)" strokeWidth={1} />
        <polyline points={curva} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x="40" y="16" fontSize="8" fill="var(--phase-s)">zona térmica</text>
        <text x="230" y="58" fontSize="8" fill="var(--phase-t)">zona magnética</text>
        <text x="5" y="12" fontSize="9" fill="var(--accent)">t</text>
        <text x="335" y="65" fontSize="9" fill="var(--muted)">I</text>
      </svg>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // VÁLVULAS DE CONTROLE — SVG desenhados à mão
  // ════════════════════════════════════════════════════════════════════════

  // ── Válvula Globo ───────────────────────────────────────────────────────
  if (tipo === "valvula-globo") {
    return (
      <svg viewBox="0 0 280 120" className="w-full">
        {/* Tubulação entrada (esquerda) */}
        <rect x="0" y="48" width="60" height="16" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Tubulação saída (direita) */}
        <rect x="200" y="48" width="80" height="16" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Corpo da válvula globo — forma característica em S */}
        <path d="M60,48 Q80,48 90,56 L90,70 Q90,80 100,80 L180,80 Q190,80 190,70 L190,56 Q200,48 220,48"
          fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <path d="M60,64 Q80,64 90,56 M190,56 Q200,64 220,64"
          fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Sede (assento) */}
        <line x1="120" y1="72" x2="160" y2="72" stroke="var(--accent)" strokeWidth="3" />
        {/* Tampão (plug) */}
        <path d="M132,55 L148,55 L145,72 L135,72 Z" fill="var(--accent)" opacity="0.7" />
        {/* Haste */}
        <line x1="140" y1="22" x2="140" y2="55" stroke="var(--text)" strokeWidth="2.5" />
        {/* Atuador pneumático (retângulo) */}
        <rect x="112" y="4" width="56" height="20" fill="none" stroke="var(--phase-s)" strokeWidth="1.5" rx="3" />
        <text x="140" y="17" fontSize="8" textAnchor="middle" fill="var(--phase-s)">ATUADOR</text>
        {/* Setas de fluxo */}
        <path d="M10,56 L30,56 M25,52 L30,56 L25,60" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Labels */}
        <text x="140" y="98" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">VÁLVULA GLOBO</text>
        <text x="140" y="110" fontSize="8" textAnchor="middle" fill="var(--muted)">Fluxo: horizontal → sede → saída</text>
      </svg>
    );
  }

  // ── Válvula Borboleta ───────────────────────────────────────────────────
  if (tipo === "valvula-borboleta") {
    return (
      <svg viewBox="0 0 280 120" className="w-full">
        {/* Tubulação */}
        <rect x="0" y="44" width="90" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <rect x="180" y="44" width="100" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Corpo circular da borboleta */}
        <circle cx="135" cy="54" r="34" fill="none" stroke="var(--phase-t)" strokeWidth="2.5" />
        {/* Disco borboleta (aberto a 45°) */}
        <ellipse cx="135" cy="54" rx="5" ry="28" fill="var(--accent)" opacity="0.8"
          transform="rotate(30,135,54)" />
        {/* Eixo */}
        <line x1="135" y1="20" x2="135" y2="88" stroke="var(--text)" strokeWidth="2" strokeDasharray="3 3" />
        {/* Atuador no topo */}
        <rect x="118" y="4" width="34" height="16" fill="none" stroke="var(--phase-s)" strokeWidth="1.5" rx="2" />
        <text x="135" y="15" fontSize="7" textAnchor="middle" fill="var(--phase-s)">ATUADOR</text>
        <line x1="135" y1="20" x2="135" y2="20" stroke="var(--phase-s)" strokeWidth="1.5" />
        {/* Ângulo de abertura */}
        <path d="M135,54 L155,42" stroke="var(--ok)" strokeWidth="1" strokeDasharray="2 2" />
        <text x="158" y="42" fontSize="8" fill="var(--ok)">~45°</text>
        {/* Seta de fluxo */}
        <path d="M15,54 L35,54 M30,50 L35,54 L30,58" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Labels */}
        <text x="135" y="102" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">VÁLVULA BORBOLETA</text>
        <text x="135" y="113" fontSize="8" textAnchor="middle" fill="var(--muted)">Disco gira 90° entre aberta e fechada</text>
      </svg>
    );
  }

  // ── Válvula Esfera ──────────────────────────────────────────────────────
  if (tipo === "valvula-esfera") {
    return (
      <svg viewBox="0 0 280 120" className="w-full">
        {/* Tubulações */}
        <rect x="0" y="44" width="80" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <rect x="190" y="44" width="90" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Corpo quadrado (típico da esfera) */}
        <rect x="80" y="30" width="110" height="48" fill="none" stroke="var(--phase-t)" strokeWidth="2" rx="4" />
        {/* Esfera */}
        <circle cx="135" cy="54" r="22" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
        {/* Furo da esfera (aberta) */}
        <ellipse cx="135" cy="54" rx="8" ry="10" fill="var(--ok)" opacity="0.6" />
        {/* Indicando que está aberta — furo alinhado com fluxo */}
        <line x1="110" y1="54" x2="160" y2="54" stroke="var(--ok)" strokeWidth="2" strokeDasharray="4 2" />
        {/* Eixo superior */}
        <line x1="135" y1="30" x2="135" y2="10" stroke="var(--text)" strokeWidth="2" />
        <rect x="124" y="4" width="22" height="10" fill="none" stroke="var(--phase-s)" strokeWidth="1.5" rx="2" />
        <text x="135" y="12" fontSize="7" textAnchor="middle" fill="var(--phase-s)">ATUADOR</text>
        {/* Seta de fluxo */}
        <path d="M12,54 L32,54 M27,50 L32,54 L27,58" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Labels */}
        <text x="135" y="100" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">VÁLVULA ESFERA</text>
        <text x="135" y="112" fontSize="8" textAnchor="middle" fill="var(--muted)">Esfera gira 90° — vedação excelente</text>
      </svg>
    );
  }

  // ── Válvula Diafragma ───────────────────────────────────────────────────
  if (tipo === "valvula-diafragma") {
    return (
      <svg viewBox="0 0 280 120" className="w-full">
        {/* Tubulações */}
        <rect x="0" y="50" width="70" height="18" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <rect x="200" y="50" width="80" height="18" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Corpo em U (weir body) */}
        <path d="M70,40 L70,80 Q135,95 200,80 L200,40 Z"
          fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Tampa superior */}
        <rect x="70" y="18" width="130" height="24" fill="none" stroke="var(--phase-t)" strokeWidth="2" rx="3" />
        {/* Diafragma flexível */}
        <path d="M75,42 Q135,62 195,42" fill="var(--accent)" opacity="0.5" stroke="var(--accent)" strokeWidth="2" />
        {/* Compressor (peça que empurra o diafragma) */}
        <rect x="115" y="30" width="40" height="12" fill="var(--phase-s)" opacity="0.6" rx="2" />
        {/* Haste do atuador */}
        <line x1="135" y1="4" x2="135" y2="30" stroke="var(--text)" strokeWidth="2.5" />
        {/* Atuador */}
        <rect x="118" y="0" width="34" height="8" fill="none" stroke="var(--phase-s)" strokeWidth="1.5" rx="2" />
        {/* Seta de fluxo */}
        <path d="M10,59 L25,59 M21,55 L25,59 L21,63" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Label fluido corrosivo */}
        <text x="135" y="87" fontSize="8" textAnchor="middle" fill="var(--phase-s)">fluido corrosivo/viscoso</text>
        {/* Labels */}
        <text x="135" y="100" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">VÁLVULA DIAFRAGMA</text>
        <text x="135" y="112" fontSize="8" textAnchor="middle" fill="var(--muted)">Membrana separa fluido do atuador</text>
      </svg>
    );
  }

  // ── Válvula Gaveta ──────────────────────────────────────────────────────
  if (tipo === "valvula-gaveta") {
    return (
      <svg viewBox="0 0 280 130" className="w-full">
        {/* Tubulações */}
        <rect x="0" y="52" width="75" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <rect x="195" y="52" width="85" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        {/* Corpo da gaveta */}
        <rect x="75" y="36" width="120" height="52" fill="none" stroke="var(--phase-t)" strokeWidth="2" rx="3" />
        {/* Disco (gaveta) em posição intermediária */}
        <rect x="122" y="40" width="26" height="44" fill="var(--accent)" opacity="0.7" />
        {/* Haste */}
        <line x1="135" y1="4" x2="135" y2="40" stroke="var(--text)" strokeWidth="3" />
        {/* Volante (handwheel) manual */}
        <circle cx="135" cy="8" r="14" fill="none" stroke="var(--phase-s)" strokeWidth="2" />
        <line x1="121" y1="8" x2="149" y2="8" stroke="var(--phase-s)" strokeWidth="1.5" />
        <line x1="135" y1="0" x2="135" y2="16" stroke="var(--phase-s)" strokeWidth="1.5" />
        <text x="135" y="8" fontSize="7" textAnchor="middle" fill="var(--phase-s)" dy="3">M</text>
        {/* Cruz vermelha — BLOQUEIO apenas, não controle */}
        <line x1="90" y1="90" x2="108" y2="105" stroke="var(--danger)" strokeWidth="1.5" />
        <line x1="108" y1="90" x2="90" y2="105" stroke="var(--danger)" strokeWidth="1.5" />
        <text x="100" y="115" fontSize="7" textAnchor="middle" fill="var(--danger)">NÃO para controle</text>
        {/* Seta de fluxo */}
        <path d="M10,62 L30,62 M25,58 L30,62 L25,66" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Labels */}
        <text x="180" y="97" fontSize="8" textAnchor="middle" fill="var(--ok)">BLOQUEIO</text>
        <text x="180" y="108" fontSize="7" textAnchor="middle" fill="var(--muted)">Aberta ou Fechada</text>
        <text x="135" y="122" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">VÁLVULA GAVETA (GATE)</text>
      </svg>
    );
  }

  // ── Atuador Pneumático com Mola ─────────────────────────────────────────
  if (tipo === "atuador-pneumatico") {
    return (
      <svg viewBox="0 0 280 140" className="w-full">
        {/* Carcaça do atuador */}
        <rect x="70" y="8" width="140" height="70" fill="none" stroke="var(--phase-t)" strokeWidth="2" rx="5" />
        {/* Membrana (diafragma do atuador) */}
        <path d="M75,50 Q140,42 205,50" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        {/* Câmara de pressão (acima) */}
        <text x="140" y="32" fontSize="8" textAnchor="middle" fill="var(--phase-s)">Pressão de ar</text>
        <text x="140" y="42" fontSize="8" textAnchor="middle" fill="var(--phase-s)">(3-15 psi)</text>
        {/* Entrada de ar */}
        <line x1="140" y1="8" x2="140" y2="0" stroke="var(--phase-s)" strokeWidth="2" />
        <path d="M133,2 L147,2 L140,8 Z" fill="var(--phase-s)" />
        {/* Mola */}
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M${i % 2 === 0 ? 110 : 130},${55 + i * 5} Q120,${57 + i * 5} ${i % 2 === 0 ? 130 : 110},${60 + i * 5}`}
            fill="none"
            stroke="var(--phase-r)"
            strokeWidth="1.5"
          />
        ))}
        <text x="175" y="80" fontSize="8" fill="var(--phase-r)">mola</text>
        {/* Haste saindo pelo fundo */}
        <line x1="140" y1="78" x2="140" y2="110" stroke="var(--text)" strokeWidth="3" />
        {/* Gland (empanque) */}
        <rect x="130" y="78" width="20" height="6" fill="var(--muted)" opacity="0.5" />
        <text x="158" y="84" fontSize="7" fill="var(--muted)">empanque</text>
        {/* Corpo da válvula (simplificado) */}
        <rect x="100" y="110" width="80" height="20" fill="none" stroke="var(--phase-t)" strokeWidth="2" rx="3" />
        <text x="140" y="123" fontSize="8" textAnchor="middle" fill="var(--phase-t)">CORPO DA VÁLVULA</text>
        {/* Labels FA/FC */}
        <text x="20" y="60" fontSize="8" fill="var(--ok)">FC</text>
        <text x="8" y="70" fontSize="7" fill="var(--ok)">Fail</text>
        <text x="8" y="79" fontSize="7" fill="var(--ok)">Close</text>
        <text x="140" y="135" fontSize="9" textAnchor="middle" fill="var(--accent)" fontWeight="bold">ATUADOR PNEUMÁTICO (mola-diafragma)</text>
      </svg>
    );
  }

  // ── Malha de Controle 4-20mA ────────────────────────────────────────────
  if (tipo === "loop-controle") {
    return (
      <svg viewBox="0 0 300 120" className="w-full">
        {/* Processo */}
        <rect x="5" y="40" width="55" height="35" rx="4" fill="none" stroke="var(--phase-t)" strokeWidth="2" />
        <text x="32" y="57" fontSize="8" textAnchor="middle" fill="var(--phase-t)">PROCESSO</text>
        <text x="32" y="67" fontSize="7" textAnchor="middle" fill="var(--muted)">(vaso, linha)</text>
        {/* Transmissor */}
        <circle cx="100" cy="57" r="18" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <text x="100" y="53" fontSize="8" textAnchor="middle" fill="var(--accent)">TT</text>
        <text x="100" y="63" fontSize="7" textAnchor="middle" fill="var(--accent)">101</text>
        {/* Seta sensor → transmissor */}
        <path d="M60,57 L82,57 M78,53 L82,57 L78,61" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
        {/* Sinal 4-20mA para controlador */}
        <path d="M118,57 L165,57 M161,53 L165,57 L161,61" fill="none" stroke="var(--phase-s)" strokeWidth="1.5" />
        <text x="141" y="50" fontSize="7" textAnchor="middle" fill="var(--phase-s)">4-20mA</text>
        {/* Controlador */}
        <rect x="165" y="40" width="55" height="35" rx="4" fill="none" stroke="var(--phase-s)" strokeWidth="2" />
        <text x="192" y="55" fontSize="8" textAnchor="middle" fill="var(--phase-s)">TIC</text>
        <text x="192" y="65" fontSize="7" textAnchor="middle" fill="var(--phase-s)">DCS/CLP</text>
        {/* Sinal controlador → válvula */}
        <path d="M192,75 L192,95 L245,95 M241,91 L245,95 L241,99" fill="none" stroke="var(--phase-r)" strokeWidth="1.5" />
        <text x="218" y="90" fontSize="7" textAnchor="middle" fill="var(--phase-r)">4-20mA</text>
        {/* Válvula */}
        <path d="M245,85 L275,85 L275,105 L245,105 Z" fill="none" stroke="var(--phase-r)" strokeWidth="2" />
        <path d="M248,95 L272,95" stroke="var(--accent)" strokeWidth="2" />
        <text x="260" y="113" fontSize="7" textAnchor="middle" fill="var(--phase-r)">FCV</text>
        {/* Seta ação no processo */}
        <path d="M245,95 L220,95 L220,75 L32,75 L32,75" fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 2" />
        <text x="140" y="112" fontSize="8" textAnchor="middle" fill="var(--muted)">malha de controle fechada</text>
      </svg>
    );
  }

  // ── Sinal 4-20mA ────────────────────────────────────────────────────────
  if (tipo === "sinal-4-20ma") {
    const dados = [
      [0, 4], [25, 8], [50, 12], [75, 16], [100, 20],
    ];
    return (
      <svg viewBox="0 0 280 100" className="w-full">
        {/* Eixos */}
        <line x1="40" y1="10" x2="40" y2="80" stroke="var(--panel-border)" strokeWidth="1.5" />
        <line x1="40" y1="80" x2="260" y2="80" stroke="var(--panel-border)" strokeWidth="1.5" />
        {/* Labels eixos */}
        <text x="20" y="80" fontSize="8" fill="var(--muted)">4mA</text>
        <text x="20" y="14" fontSize="8" fill="var(--muted)">20mA</text>
        <text x="36" y="92" fontSize="7" fill="var(--muted)">0%</text>
        <text x="233" y="92" fontSize="7" fill="var(--muted)">100%</text>
        {/* Linha do sinal */}
        <line x1="40" y1="80" x2="250" y2="14" stroke="var(--accent)" strokeWidth="2.5" />
        {/* Pontos */}
        {dados.map(([pct, ma]) => {
          const x = 40 + pct * 2.1;
          const y = 80 - (ma - 4) * 4.125;
          return (
            <g key={pct}>
              <circle cx={x} cy={y} r="3" fill="var(--accent)" />
              <text x={x + 5} y={y - 3} fontSize="7" fill="var(--phase-s)">{ma}mA</text>
            </g>
          );
        })}
        {/* Zona morta */}
        <rect x="40" y="10" width="210" height="70" fill="none" stroke="var(--ok)" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="150" y="8" fontSize="8" textAnchor="middle" fill="var(--ok)">Sinal 4-20 mA (linear)</text>
        <text x="150" y="96" fontSize="8" textAnchor="middle" fill="var(--muted)">% da faixa de medição</text>
      </svg>
    );
  }

  return null;
}
