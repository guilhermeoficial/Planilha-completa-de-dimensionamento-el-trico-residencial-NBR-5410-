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

// ---------------------------------------------------------------------------
// Fatores de correção — temperatura (FCT) e agrupamento (FCA) — NBR 5410
// ---------------------------------------------------------------------------
const TABELA_FCT_PVC: { temp: number; fator: number }[] = [
  { temp: 10, fator: 1.22 }, { temp: 15, fator: 1.17 }, { temp: 20, fator: 1.12 },
  { temp: 25, fator: 1.06 }, { temp: 30, fator: 1.0 }, { temp: 35, fator: 0.94 },
  { temp: 40, fator: 0.87 }, { temp: 45, fator: 0.79 }, { temp: 50, fator: 0.71 },
  { temp: 55, fator: 0.61 }, { temp: 60, fator: 0.5 },
];
const TABELA_FCT_EPR: { temp: number; fator: number }[] = [
  { temp: 10, fator: 1.15 }, { temp: 15, fator: 1.12 }, { temp: 20, fator: 1.08 },
  { temp: 25, fator: 1.04 }, { temp: 30, fator: 1.0 }, { temp: 35, fator: 0.96 },
  { temp: 40, fator: 0.91 }, { temp: 45, fator: 0.87 }, { temp: 50, fator: 0.82 },
  { temp: 55, fator: 0.76 }, { temp: 60, fator: 0.71 },
];

export function fatorCorrecaoTemperatura(tempAmbienteC: number, isolacao: "PVC" | "EPR"): number {
  const tabela = isolacao === "EPR" ? TABELA_FCT_EPR : TABELA_FCT_PVC;
  if (tempAmbienteC <= tabela[0].temp) return tabela[0].fator;
  if (tempAmbienteC >= tabela[tabela.length - 1].temp) return tabela[tabela.length - 1].fator;
  for (let i = 0; i < tabela.length - 1; i++) {
    const a = tabela[i], b = tabela[i + 1];
    if (tempAmbienteC >= a.temp && tempAmbienteC <= b.temp) {
      const t = (tempAmbienteC - a.temp) / (b.temp - a.temp);
      return a.fator + t * (b.fator - a.fator);
    }
  }
  return 1;
}

const TABELA_FCA: { ate: number; fator: number }[] = [
  { ate: 1, fator: 1.0 }, { ate: 2, fator: 0.8 }, { ate: 3, fator: 0.7 },
  { ate: 4, fator: 0.65 }, { ate: 5, fator: 0.6 }, { ate: 6, fator: 0.57 },
  { ate: 7, fator: 0.54 }, { ate: 8, fator: 0.52 }, { ate: 11, fator: 0.5 },
  { ate: 15, fator: 0.45 }, { ate: 19, fator: 0.41 }, { ate: Infinity, fator: 0.38 },
];

export function fatorAgrupamento(numCircuitos: number): number {
  return (TABELA_FCA.find((f) => numCircuitos <= f.ate) ?? TABELA_FCA[TABELA_FCA.length - 1]).fator;
}

// ---------------------------------------------------------------------------
// Fator de demanda — iluminação + TUG residencial (tabela clássica, Creder)
// ---------------------------------------------------------------------------
const TABELA_FATOR_DEMANDA: { de: number; ate: number; percentual: number }[] = [
  { de: 0, ate: 1000, percentual: 0.86 },
  { de: 1000, ate: 2000, percentual: 0.75 },
  { de: 2000, ate: 3000, percentual: 0.66 },
  { de: 3000, ate: 4000, percentual: 0.59 },
  { de: 4000, ate: 5000, percentual: 0.52 },
  { de: 5000, ate: 6000, percentual: 0.45 },
  { de: 6000, ate: 7000, percentual: 0.4 },
  { de: 7000, ate: 8000, percentual: 0.35 },
  { de: 8000, ate: 9000, percentual: 0.31 },
  { de: 9000, ate: 10000, percentual: 0.27 },
  { de: 10000, ate: 11000, percentual: 0.24 },
  { de: 11000, ate: 12000, percentual: 0.22 },
  { de: 12000, ate: 13000, percentual: 0.19 },
  { de: 13000, ate: 14000, percentual: 0.17 },
  { de: 14000, ate: 15000, percentual: 0.16 },
  { de: 15000, ate: 16000, percentual: 0.14 },
  { de: 16000, ate: 17000, percentual: 0.12 },
  { de: 17000, ate: 18000, percentual: 0.11 },
  { de: 18000, ate: Infinity, percentual: 0.1 },
];

/** Aplica o fator de demanda por faixas progressivas (cada faixa de VA tem seu próprio %, como uma tabela de IR). */
export function calcularDemandaIluminacaoTUG(potenciaTotalVA: number): { demandaVA: number; percentualMedio: number } {
  let restante = potenciaTotalVA;
  let demandaVA = 0;
  for (const faixa of TABELA_FATOR_DEMANDA) {
    if (restante <= 0) break;
    const larguraFaixa = faixa.ate - faixa.de;
    const nesta = Math.min(restante, larguraFaixa);
    demandaVA += nesta * faixa.percentual;
    restante -= nesta;
  }
  return { demandaVA, percentualMedio: potenciaTotalVA > 0 ? (demandaVA / potenciaTotalVA) * 100 : 0 };
}

// ---------------------------------------------------------------------------
// Curto-circuito simplificado (estimativa educacional)
// ---------------------------------------------------------------------------
export interface EntradaCurtoCircuito {
  tensaoV: number;
  impedanciaFonteOhm: number; // Zcc no ponto de entrega (concessionária/transformador)
  resistividadeCaboOhmKm: number;
  comprimentoM: number;
  trifasico?: boolean;
}

export function calcularCurtoCircuitoSimplificado(e: EntradaCurtoCircuito): { correnteCcA: number } {
  const zCabo = e.resistividadeCaboOhmKm * (e.comprimentoM / 1000);
  const zTotal = e.impedanciaFonteOhm + zCabo;
  const correnteCcA = e.trifasico ? e.tensaoV / (Math.sqrt(3) * zTotal) : e.tensaoV / zTotal;
  return { correnteCcA };
}

// ---------------------------------------------------------------------------
// Dimensionamento de eletroduto pela taxa de ocupação (40%, NBR 5410)
// ---------------------------------------------------------------------------
const TABELA_ELETRODUTOS: { dn: string; areaInternaMm2: number }[] = [
  { dn: "16mm (1/2\")", areaInternaMm2: 122 },
  { dn: "20mm (3/4\")", areaInternaMm2: 201 },
  { dn: "25mm (1\")", areaInternaMm2: 324 },
  { dn: "32mm (1.1/4\")", areaInternaMm2: 531 },
  { dn: "40mm (1.1/2\")", areaInternaMm2: 718 },
  { dn: "50mm (2\")", areaInternaMm2: 1140 },
  { dn: "60mm (2.1/2\")", areaInternaMm2: 1652 },
  { dn: "75mm (3\")", areaInternaMm2: 2627 },
];

/** Área externa aproximada de um condutor isolado (regra prática: ~1,4x a seção nominal) */
export function areaExternaAproximadaCabo(secaoMm2: number): number {
  return secaoMm2 * 1.4;
}

export function escolherEletroduto(areaTotalCondutoresMm2: number): { dn: string; taxaOcupacao: number } | null {
  for (const e of TABELA_ELETRODUTOS) {
    const taxa = (areaTotalCondutoresMm2 / e.areaInternaMm2) * 100;
    if (taxa <= 40) return { dn: e.dn, taxaOcupacao: taxa };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Seletividade simplificada entre disjuntores
// ---------------------------------------------------------------------------
export function verificarSeletividade(disjuntorMontanteA: number, disjuntorJusanteA: number): { seletivo: boolean; razao: number } {
  const razao = disjuntorMontanteA / disjuntorJusanteA;
  return { seletivo: razao >= 1.6, razao }; // regra prática conservadora (verificar curvas de disparo para certeza)
}

// ---------------------------------------------------------------------------
// Perdas por efeito Joule num cabo
// ---------------------------------------------------------------------------
export function calcularPerdaJoule(correnteA: number, resistenciaOhmKm: number, comprimentoM: number, trifasico = false): number {
  const numCondutores = trifasico ? 3 : 2;
  const rTotal = resistenciaOhmKm * (comprimentoM / 1000) * (numCondutores / 2);
  return numCondutores === 3 ? 3 * correnteA * correnteA * (resistenciaOhmKm * (comprimentoM / 1000)) : correnteA * correnteA * rTotal * 2;
}

// ---------------------------------------------------------------------------
// Eficiência de motor
// ---------------------------------------------------------------------------
export function calcularEficienciaMotor(potenciaEntradaW: number, potenciaSaidaW: number): number {
  return potenciaEntradaW > 0 ? (potenciaSaidaW / potenciaEntradaW) * 100 : 0;
}

export function calcularPotenciaEntrada(potenciaSaidaW: number, eficienciaPercent: number): number {
  return eficienciaPercent > 0 ? potenciaSaidaW / (eficienciaPercent / 100) : 0;
}

// ---------------------------------------------------------------------------
// Corrente de partida de motor — comparativo entre métodos
// ---------------------------------------------------------------------------
export interface ComparativoPartida {
  metodo: string;
  correnteA: number;
  multiplicador: number;
}

export function calcularPartidaMotor(correnteNominalA: number, razaoPartidaDireta = 7): ComparativoPartida[] {
  return [
    { metodo: "Partida direta", correnteA: correnteNominalA * razaoPartidaDireta, multiplicador: razaoPartidaDireta },
    { metodo: "Estrela-triângulo", correnteA: correnteNominalA * (razaoPartidaDireta / 3), multiplicador: razaoPartidaDireta / 3 },
    { metodo: "Soft-starter (típico)", correnteA: correnteNominalA * 3, multiplicador: 3 },
    { metodo: "Inversor de frequência", correnteA: correnteNominalA * 1.2, multiplicador: 1.2 },
  ];
}

// ---------------------------------------------------------------------------
// Luminotécnica — método dos lúmens (simplificado)
// ---------------------------------------------------------------------------
export function calcularPontosLuzPorLux(
  iluminanciaDesejadaLux: number,
  areaM2: number,
  fluxoLuminosoLampadaLm: number,
  fatorUtilizacao = 0.6,
  fatorManutencao = 0.8
): number {
  const fluxoTotalNecessario = (iluminanciaDesejadaLux * areaM2) / (fatorUtilizacao * fatorManutencao);
  return Math.ceil(fluxoTotalNecessario / fluxoLuminosoLampadaLm);
}

// ---------------------------------------------------------------------------
// Dimensionamento fotovoltaico básico
// ---------------------------------------------------------------------------
export interface ResultadoFotovoltaico {
  potenciaNecessariaKwp: number;
  numeroDePaineis: number;
  geracaoEstimadaMensalKwh: number;
}

export function calcularSistemaFotovoltaico(
  consumoMensalKwh: number,
  horasSolPleno = 5,
  eficienciaSistema = 0.8,
  potenciaPainelWp = 550
): ResultadoFotovoltaico {
  const consumoDiarioKwh = consumoMensalKwh / 30;
  const potenciaNecessariaKwp = consumoDiarioKwh / (horasSolPleno * eficienciaSistema);
  const numeroDePaineis = Math.ceil((potenciaNecessariaKwp * 1000) / potenciaPainelWp);
  const geracaoEstimadaMensalKwh = numeroDePaineis * (potenciaPainelWp / 1000) * horasSolPleno * eficienciaSistema * 30;
  return { potenciaNecessariaKwp, numeroDePaineis, geracaoEstimadaMensalKwh };
}

// ---------------------------------------------------------------------------
// Autonomia de bateria / no-break
// ---------------------------------------------------------------------------
export function calcularAutonomiaBateria(
  capacidadeAh: number,
  tensaoBateriaV: number,
  potenciaCargaW: number,
  eficienciaInversor = 0.85
): number {
  const energiaDisponivelWh = capacidadeAh * tensaoBateriaV * eficienciaInversor;
  return potenciaCargaW > 0 ? energiaDisponivelWh / potenciaCargaW : 0;
}

// ---------------------------------------------------------------------------
// Conversor de temperatura
// ---------------------------------------------------------------------------
export function converterTemperatura(valor: number, de: "C" | "F" | "K"): { c: number; f: number; k: number } {
  let celsius: number;
  if (de === "F") celsius = ((valor - 32) * 5) / 9;
  else if (de === "K") celsius = valor - 273.15;
  else celsius = valor;
  return { c: celsius, f: (celsius * 9) / 5 + 32, k: celsius + 273.15 };
}

// ---------------------------------------------------------------------------
// Área e perímetro — formas geométricas comuns
// ---------------------------------------------------------------------------
export function calcularRetangulo(largura: number, comprimento: number) {
  return { area: largura * comprimento, perimetro: 2 * (largura + comprimento) };
}

export function calcularCirculo(raio: number) {
  return { area: Math.PI * raio * raio, perimetro: 2 * Math.PI * raio };
}

export function calcularTrianguloRetangulo(base: number, altura: number) {
  const hipotenusa = Math.sqrt(base * base + altura * altura);
  return { area: (base * altura) / 2, perimetro: base + altura + hipotenusa };
}
