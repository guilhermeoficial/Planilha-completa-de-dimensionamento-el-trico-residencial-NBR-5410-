// Módulo de Calculadoras & Conversores — ferramentas avulsas de bancada,
// independentes do motor de projeto (nbr5410.ts). Cada função é pura e testável.

// ---------------------------------------------------------------------------
// Conexão estrela-triângulo (motores trifásicos)
// ---------------------------------------------------------------------------
export interface ResultadoEstrelaTriangulo {
  correnteLinhaEstrelaA: number;
  correnteLinhaTrianguloA: number;
  tensaoFaseEstrelaV: number;
  tensaoFaseTrianguloV: number;
  razaoCorrente: number; // Iy / I∆ = 1/3
}

/**
 * Converte grandezas entre ligação estrela e triângulo para o mesmo motor trifásico.
 * Em estrela: V_fase = V_linha/√3, I_fase = I_linha.
 * Em triângulo: V_fase = V_linha, I_fase = I_linha/√3.
 * A corrente de linha em estrela é 1/3 da corrente de linha em triângulo (mesma potência).
 */
export function calcularEstrelaTriangulo(tensaoLinhaV: number, correnteLinhaTrianguloA: number): ResultadoEstrelaTriangulo {
  const correnteLinhaEstrelaA = correnteLinhaTrianguloA / 3;
  return {
    correnteLinhaEstrelaA,
    correnteLinhaTrianguloA,
    tensaoFaseEstrelaV: tensaoLinhaV / Math.sqrt(3),
    tensaoFaseTrianguloV: tensaoLinhaV,
    razaoCorrente: 1 / 3,
  };
}

// ---------------------------------------------------------------------------
// Resistência equivalente
// ---------------------------------------------------------------------------
export function resistenciaSerie(resistencias: number[]): number {
  return resistencias.reduce((s, r) => s + r, 0);
}

export function resistenciaParalela(resistencias: number[]): number {
  const validas = resistencias.filter((r) => r > 0);
  if (validas.length === 0) return 0;
  const inverso = validas.reduce((s, r) => s + 1 / r, 0);
  return inverso > 0 ? 1 / inverso : 0;
}

// ---------------------------------------------------------------------------
// Lei de Ohm e potência — informe 2 grandezas, calcule as demais
// ---------------------------------------------------------------------------
export interface EntradaOhm {
  tensaoV?: number;
  correnteA?: number;
  resistenciaOhm?: number;
  potenciaW?: number;
}

export interface ResultadoOhm {
  tensaoV: number;
  correnteA: number;
  resistenciaOhm: number;
  potenciaW: number;
}

/** Resolve V, I, R, P a partir de quaisquer 2 grandezas conhecidas. */
export function calcularLeiDeOhm(entrada: EntradaOhm): ResultadoOhm | null {
  let { tensaoV: V, correnteA: I, resistenciaOhm: R, potenciaW: P } = entrada;

  if (V != null && I != null) {
    R = V / I;
    P = V * I;
  } else if (V != null && R != null) {
    I = V / R;
    P = (V * V) / R;
  } else if (V != null && P != null) {
    I = P / V;
    R = (V * V) / P;
  } else if (I != null && R != null) {
    V = I * R;
    P = I * I * R;
  } else if (I != null && P != null) {
    V = P / I;
    R = P / (I * I);
  } else if (R != null && P != null) {
    V = Math.sqrt(P * R);
    I = Math.sqrt(P / R);
  } else {
    return null; // menos de 2 grandezas informadas
  }

  if (V == null || I == null || R == null || P == null) return null;
  return { tensaoV: V, correnteA: I, resistenciaOhm: R, potenciaW: P };
}

// ---------------------------------------------------------------------------
// Conversor de unidades de potência
// ---------------------------------------------------------------------------
const CV_PARA_W = 735.5;
const HP_PARA_W = 745.7;

export function converterPotencia(valor: number, de: "CV" | "HP" | "W" | "kW"): { cv: number; hp: number; w: number; kw: number } {
  let watts: number;
  switch (de) {
    case "CV": watts = valor * CV_PARA_W; break;
    case "HP": watts = valor * HP_PARA_W; break;
    case "kW": watts = valor * 1000; break;
    default: watts = valor;
  }
  return { cv: watts / CV_PARA_W, hp: watts / HP_PARA_W, w: watts, kw: watts / 1000 };
}

// ---------------------------------------------------------------------------
// Conversor de bitola de cabo (mm² ↔ AWG) — tabela de referência aproximada
// ---------------------------------------------------------------------------
export const TABELA_MM2_AWG: { mm2: number; awg: string }[] = [
  { mm2: 0.5, awg: "20" },
  { mm2: 0.75, awg: "18" },
  { mm2: 1.0, awg: "17" },
  { mm2: 1.5, awg: "16" },
  { mm2: 2.5, awg: "14" },
  { mm2: 4, awg: "12" },
  { mm2: 6, awg: "10" },
  { mm2: 10, awg: "8" },
  { mm2: 16, awg: "6" },
  { mm2: 25, awg: "4" },
  { mm2: 35, awg: "2" },
  { mm2: 50, awg: "1/0" },
  { mm2: 70, awg: "2/0" },
  { mm2: 95, awg: "3/0" },
  { mm2: 120, awg: "4/0" },
];

export function mm2ParaAwgMaisProximo(mm2: number): string {
  let melhor = TABELA_MM2_AWG[0];
  let menorDiff = Math.abs(TABELA_MM2_AWG[0].mm2 - mm2);
  for (const linha of TABELA_MM2_AWG) {
    const diff = Math.abs(linha.mm2 - mm2);
    if (diff < menorDiff) {
      menorDiff = diff;
      melhor = linha;
    }
  }
  return melhor.awg;
}

// ---------------------------------------------------------------------------
// Queda de tensão simples (sem precisar montar um projeto inteiro)
// ---------------------------------------------------------------------------
export interface EntradaQuedaSimples {
  correnteA: number;
  comprimentoM: number;
  secaoMm2: number;
  tensaoV: number;
  resistividadeOhmKm: number; // Ω/km do condutor (cobre ~ varia por bitola)
  trifasico?: boolean;
}

export function calcularQuedaSimples(e: EntradaQuedaSimples): { quedaV: number; quedaPercent: number } {
  const fator = e.trifasico ? Math.sqrt(3) : 2;
  const quedaV = (fator * e.resistividadeOhmKm * (e.comprimentoM / 1000) * e.correnteA);
  return { quedaV, quedaPercent: (quedaV / e.tensaoV) * 100 };
}

// ---------------------------------------------------------------------------
// Código de cores de resistores (4 faixas)
// ---------------------------------------------------------------------------
export const CORES_RESISTOR = [
  { nome: "Preto", valor: 0, multiplicador: 1, cor: "#1a1a1a", tolerancia: "—" },
  { nome: "Marrom", valor: 1, multiplicador: 10, cor: "#7a4a1e", tolerancia: "±1%" },
  { nome: "Vermelho", valor: 2, multiplicador: 100, cor: "#d32f2f", tolerancia: "±2%" },
  { nome: "Laranja", valor: 3, multiplicador: 1000, cor: "#f57c00", tolerancia: "—" },
  { nome: "Amarelo", valor: 4, multiplicador: 10000, cor: "#fbc02d", tolerancia: "—" },
  { nome: "Verde", valor: 5, multiplicador: 100000, cor: "#388e3c", tolerancia: "±0.5%" },
  { nome: "Azul", valor: 6, multiplicador: 1000000, cor: "#1976d2", tolerancia: "±0.25%" },
  { nome: "Violeta", valor: 7, multiplicador: 10000000, cor: "#7b1fa2", tolerancia: "±0.1%" },
  { nome: "Cinza", valor: 8, multiplicador: 100000000, cor: "#757575", tolerancia: "—" },
  { nome: "Branco", valor: 9, multiplicador: 1000000000, cor: "#f5f5f5", tolerancia: "—" },
  { nome: "Dourado", valor: null, multiplicador: 0.1, cor: "#c9a227", tolerancia: "±5%" },
  { nome: "Prateado", valor: null, multiplicador: 0.01, cor: "#b0b0b0", tolerancia: "±10%" },
] as const;

export function calcularResistorPorCores(faixa1: number, faixa2: number, multiplicadorIdx: number): number {
  const multiplicador = CORES_RESISTOR[multiplicadorIdx]?.multiplicador ?? 1;
  return (faixa1 * 10 + faixa2) * multiplicador;
}

export function formatarOhms(valor: number): string {
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} MΩ`;
  if (valor >= 1_000) return `${(valor / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} kΩ`;
  return `${valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} Ω`;
}
