// Motor de cálculo elétrico residencial — NBR 5410
// Reproduz fielmente a lógica da planilha Engine_Projeto_Eletrico_Corrigido.xlsx

export type TipoAmbiente = "Social/Quarto" | "Serviço/Cozinha" | "Banheiro" | "Varanda/Externo";
export type TipoCircuito = "Iluminação" | "TUG" | "TUE";
export type Fase = "R" | "S" | "T";
export type Isolacao = "PVC" | "EPR";

// ---------------------------------------------------------------------------
// Tabela de referência (aba Suporte_Tabelas)
// ---------------------------------------------------------------------------
export interface LinhaCabo {
  bitola: number; // mm²
  pvc2: number; // PVC - 2 cond (A)
  pvc3: number; // PVC - 3 cond (A)
  epr2: number; // EPR - 2 cond (A)
  epr3: number; // EPR - 3 cond (A)
  r: number; // Ohm/km
}

export const TABELA_CABOS: LinhaCabo[] = [
  { bitola: 1.5, pvc2: 17.5, pvc3: 15.5, epr2: 22, epr3: 19, r: 14.8 },
  { bitola: 2.5, pvc2: 24, pvc3: 21, epr2: 30, epr3: 26, r: 8.91 },
  { bitola: 4, pvc2: 32, pvc3: 28, epr2: 40, epr3: 35, r: 5.51 },
  { bitola: 6, pvc2: 41, pvc3: 36, epr2: 51, epr3: 45, r: 3.67 },
  { bitola: 10, pvc2: 57, pvc3: 50, epr2: 71, epr3: 62, r: 2.16 },
  { bitola: 16, pvc2: 76, pvc3: 68, epr2: 95, epr3: 83, r: 1.35 },
  { bitola: 25, pvc2: 101, pvc3: 89, epr2: 125, epr3: 110, r: 0.85 },
  { bitola: 35, pvc2: 125, pvc3: 110, epr2: 155, epr3: 137, r: 0.6 },
];

export const DISJUNTORES_PADRAO = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125];

export const QUEDA_MAX_PERCENT = 4; // limite normativo usual para circuitos terminais

// ---------------------------------------------------------------------------
// Banco de TUEs (aba Banco_TUEs)
// ---------------------------------------------------------------------------
export interface TUEPadrao {
  nome: string;
  potenciaW: number;
  fp: number;
  categoria: string;
}

export const BANCO_TUES_PADRAO: TUEPadrao[] = [
  // Chuveiros / aquecimento de água
  { nome: "Chuveiro Elétrico Padrão", potenciaW: 5500, fp: 1, categoria: "Aquecimento de água" },
  { nome: "Chuveiro Elétrico Super", potenciaW: 6800, fp: 1, categoria: "Aquecimento de água" },
  { nome: "Chuveiro Elétrico Turbo", potenciaW: 7500, fp: 1, categoria: "Aquecimento de água" },
  { nome: "Torneira Elétrica", potenciaW: 4500, fp: 1, categoria: "Aquecimento de água" },
  { nome: "Aquecedor de Água a Gás (booster/bomba)", potenciaW: 150, fp: 1, categoria: "Aquecimento de água" },
  { nome: "Boiler / Aquecedor de Acumulação", potenciaW: 2000, fp: 1, categoria: "Aquecimento de água" },
  // Climatização
  { nome: "Ar Condicionado 9000 BTU", potenciaW: 900, fp: 0.85, categoria: "Climatização" },
  { nome: "Ar Condicionado 12000 BTU", potenciaW: 1200, fp: 0.85, categoria: "Climatização" },
  { nome: "Ar Condicionado 18000 BTU", potenciaW: 1800, fp: 0.85, categoria: "Climatização" },
  { nome: "Ar Condicionado 24000 BTU", potenciaW: 2400, fp: 0.85, categoria: "Climatização" },
  { nome: "Aquecedor Elétrico Ambiente", potenciaW: 1500, fp: 1, categoria: "Climatização" },
  // Cozinha
  { nome: "Micro-ondas", potenciaW: 1500, fp: 0.9, categoria: "Cozinha" },
  { nome: "Forno Elétrico Embutir", potenciaW: 2500, fp: 1, categoria: "Cozinha" },
  { nome: "Cooktop Indução (4 bocas)", potenciaW: 7000, fp: 1, categoria: "Cozinha" },
  { nome: "Cooktop Elétrico (4 bocas)", potenciaW: 6000, fp: 1, categoria: "Cozinha" },
  { nome: "Geladeira / Refrigerador", potenciaW: 350, fp: 0.85, categoria: "Cozinha" },
  { nome: "Freezer Horizontal/Vertical", potenciaW: 400, fp: 0.85, categoria: "Cozinha" },
  { nome: "Lava-louças", potenciaW: 1800, fp: 0.9, categoria: "Cozinha" },
  { nome: "Cafeteira Elétrica", potenciaW: 900, fp: 0.95, categoria: "Cozinha" },
  { nome: "Liquidificador", potenciaW: 500, fp: 0.9, categoria: "Cozinha" },
  { nome: "Exaustor / Depurador de Ar", potenciaW: 200, fp: 0.85, categoria: "Cozinha" },
  { nome: "Coifa Industrial", potenciaW: 400, fp: 0.85, categoria: "Cozinha" },
  // Área de serviço
  { nome: "Máquina de Lavar Roupa", potenciaW: 1500, fp: 0.9, categoria: "Área de serviço" },
  { nome: "Lava e Seca", potenciaW: 2200, fp: 0.9, categoria: "Área de serviço" },
  { nome: "Secadora de Roupas", potenciaW: 3000, fp: 0.95, categoria: "Área de serviço" },
  { nome: "Tanquinho Elétrico", potenciaW: 500, fp: 0.85, categoria: "Área de serviço" },
  { nome: "Ferro de Passar Roupa", potenciaW: 1200, fp: 1, categoria: "Área de serviço" },
  // Bombas e equipamentos da casa
  { nome: "Motor de Portão Eletrônico", potenciaW: 600, fp: 0.8, categoria: "Equipamentos da casa" },
  { nome: "Bomba de Recalque/Pressurização", potenciaW: 750, fp: 0.85, categoria: "Equipamentos da casa" },
  { nome: "Bomba de Piscina", potenciaW: 1000, fp: 0.85, categoria: "Equipamentos da casa" },
  { nome: "Aquecedor de Piscina Elétrico", potenciaW: 3000, fp: 0.95, categoria: "Equipamentos da casa" },
  { nome: "Sauna Elétrica", potenciaW: 6000, fp: 1, categoria: "Equipamentos da casa" },
  // Eletrônicos / outros
  { nome: "Secador de Cabelo", potenciaW: 1800, fp: 1, categoria: "Outros" },
  { nome: "Banheira de Hidromassagem", potenciaW: 1500, fp: 0.9, categoria: "Outros" },
  { nome: "Carregador de Veículo Elétrico (Wallbox)", potenciaW: 7400, fp: 1, categoria: "Outros" },
];

export function potenciaAparente(potenciaW: number, fp: number): number {
  return fp > 0 ? potenciaW / fp : potenciaW;
}

// ---------------------------------------------------------------------------
// Previsão de cargas por cômodo — NBR 5410 item 9.5
// ---------------------------------------------------------------------------

/** Potência de iluminação (VA) pela regra dos 100VA/6m² + 60VA por 4m² adicionais (arredondado p/ baixo) */
export function calcPotenciaIluminacao(areaM2: number): number {
  if (areaM2 <= 6) return 100;
  const adicionais = Math.floor((areaM2 - 6) / 4);
  return 100 + adicionais * 60;
}

/** Número mínimo de pontos de luz — no mínimo 1 por ambiente, ou valor informado manualmente pelo projetista */
/**
 * Estimativa do número de pontos de luz. A NBR 5410 NÃO define uma fórmula de
 * quantidade de pontos por área — ela só estabelece a potência mínima de
 * iluminação (ver calcPotenciaIluminacao). A quantidade de luminárias é uma
 * decisão de projeto luminotécnico (tipo de luminária, pé-direito, layout).
 * Aqui usamos uma estimativa prática comum (~1 ponto a cada 12m², mínimo 1)
 * apenas como ponto de partida — sempre editável manualmente por ambiente.
 */
export function calcPontosLuz(areaM2: number, override?: number | null): number {
  if (override != null && override > 0) return override;
  return Math.max(1, Math.ceil(areaM2 / 12));
}

export interface ResultadoTUG {
  quantidade: number;
  potenciaVA: number;
}

/** Tomadas de uso geral conforme tipo de ambiente e perímetro, NBR 5410 9.5.4 */
export function calcTUG(tipo: TipoAmbiente, perimetroM: number): ResultadoTUG {
  if (tipo === "Banheiro") {
    // mínimo 1 tomada de uso geral próxima à pia, dimensionada para 600 VA
    return { quantidade: 1, potenciaVA: 600 };
  }
  if (tipo === "Serviço/Cozinha") {
    // 1 tomada por segmento de até 3,5m de perímetro; as 3 primeiras a 600VA, demais a 100VA
    const qtd = Math.max(1, Math.ceil(perimetroM / 3.5));
    const potencia = Math.min(qtd, 3) * 600 + Math.max(qtd - 3, 0) * 100;
    return { quantidade: qtd, potenciaVA: potencia };
  }
  // Social/Quarto e Varanda/Externo: 1 tomada por segmento de até 5m de perímetro, 100VA cada
  const qtd = Math.max(1, Math.ceil(perimetroM / 5));
  return { quantidade: qtd, potenciaVA: qtd * 100 };
}

export interface Ambiente {
  id: string;
  nome: string;
  tipo: TipoAmbiente;
  areaM2: number;
  perimetroM: number;
  pontosLuzManual?: number | null;
  tuesVinculados: { tueNome: string; potenciaW: number; fp: number; quantidade: number }[];
}

export interface PrevisaoCarga {
  ambienteId: string;
  pontosLuzMin: number;
  potIluminacaoVA: number;
  tugMin: number;
  potTugVA: number;
  qtdTue: number;
  potTueW: number;
}

export function calcularPrevisaoCarga(ambiente: Ambiente): PrevisaoCarga {
  const tug = calcTUG(ambiente.tipo, ambiente.perimetroM);
  const qtdTue = ambiente.tuesVinculados.reduce((s, t) => s + t.quantidade, 0);
  const potTueW = ambiente.tuesVinculados.reduce((s, t) => s + t.potenciaW * t.quantidade, 0);
  return {
    ambienteId: ambiente.id,
    pontosLuzMin: calcPontosLuz(ambiente.areaM2, ambiente.pontosLuzManual),
    potIluminacaoVA: calcPotenciaIluminacao(ambiente.areaM2),
    tugMin: tug.quantidade,
    potTugVA: tug.potenciaVA,
    qtdTue,
    potTueW,
  };
}

// ---------------------------------------------------------------------------
// Memorial de circuitos — dimensionamento de cabo, queda de tensão e disjuntor
// ---------------------------------------------------------------------------
export interface Circuito {
  id: string;
  numero: number;
  descricao: string;
  tipo: TipoCircuito;
  tensaoV: number; // 220 monofásico (padrão deste motor)
  fp: number;
  fase: Fase;
  potenciaVA: number;
  comprimentoM: number;
  isolacao: Isolacao;
  circuitosAgrupados?: number;
}

export interface CircuitoCalculado extends Circuito {
  potenciaW: number;
  ibA: number; // corrente de projeto (A)
  ibCorrigidaA: number;
  secaoCaboMm2: number;
  quedaPercent: number;
  secaoFinalMm2: number;
  disjuntorA: number;
}

function ampacidade(linha: LinhaCabo, isolacao: Isolacao): number {
  return isolacao === "EPR" ? linha.epr2 : linha.pvc2;
}

function escolherSecaoPorAmpacidade(ibA: number, isolacao: Isolacao): LinhaCabo {
  for (const linha of TABELA_CABOS) {
    if (ampacidade(linha, isolacao) >= ibA) return linha;
  }
  return TABELA_CABOS[TABELA_CABOS.length - 1];
}

function quedaTensao(linha: LinhaCabo, comprimentoM: number, ibA: number, tensaoV: number): number {
  // ΔV (fração) = 2 * R(Ω/km) * L(km) * I / V   — circuito monofásico (ida e volta)
  return (2 * linha.r * (comprimentoM / 1000) * ibA) / tensaoV;
}

function escolherDisjuntor(ibCorrigidaA: number, ampacidadeCaboA: number): number {
  for (const valor of DISJUNTORES_PADRAO) {
    if (valor >= ibCorrigidaA && valor <= ampacidadeCaboA + 1e-9) return valor;
  }
  // se nenhum disjuntor padrão respeita In <= Iz, sobe a seção é necessário — retorna o maior abaixo da ampacidade
  for (const valor of DISJUNTORES_PADRAO) {
    if (valor >= ibCorrigidaA) return valor;
  }
  return DISJUNTORES_PADRAO[DISJUNTORES_PADRAO.length - 1];
}

/**
 * Dimensiona um circuito: corrente de projeto, seção do cabo, queda de tensão e disjuntor.
 * Ib é calculado a partir da potência ativa (W), reproduzindo a convenção da planilha original.
 */
export function calcularCircuito(c: Circuito): CircuitoCalculado {
  const potenciaW = c.potenciaVA * c.fp;
  const ibA = potenciaW / c.tensaoV;
  const fatorAgrupamento = 1; // reservado para futura derating por agrupamento
  const ibCorrigidaA = ibA / fatorAgrupamento;

  let linha = escolherSecaoPorAmpacidade(ibCorrigidaA, c.isolacao);
  let secaoCaboMm2 = linha.bitola;

  // garante limite de queda de tensão, subindo a seção se necessário
  let queda = quedaTensao(linha, c.comprimentoM, ibCorrigidaA, c.tensaoV);
  let idx = TABELA_CABOS.findIndex((l) => l.bitola === secaoCaboMm2);
  while (queda * 100 > QUEDA_MAX_PERCENT && idx < TABELA_CABOS.length - 1) {
    idx += 1;
    linha = TABELA_CABOS[idx];
    secaoCaboMm2 = linha.bitola;
    queda = quedaTensao(linha, c.comprimentoM, ibCorrigidaA, c.tensaoV);
  }

  const secaoFinalMm2 = Math.max(secaoCaboMm2, 1.5);
  const disjuntorA = escolherDisjuntor(ibCorrigidaA, ampacidade(linha, c.isolacao));

  return {
    ...c,
    potenciaW,
    ibA,
    ibCorrigidaA,
    secaoCaboMm2,
    quedaPercent: queda * 100,
    secaoFinalMm2,
    disjuntorA,
  };
}

export function calcularMemorial(circuitos: Circuito[]): CircuitoCalculado[] {
  return circuitos.map(calcularCircuito);
}

// ---------------------------------------------------------------------------
// Resumo de demanda geral e disjuntor de entrada (padrão de entrada)
// ---------------------------------------------------------------------------
export type TipoEntrada = "Monofásico" | "Bifásico" | "Trifásico";

export interface ResumoDemanda {
  cargaInstaladaW: number;
  correnteEntradaA: number;
  disjuntorGeralA: number;
  tipoEntradaSugerido: TipoEntrada;
}

/**
 * Estimativa simplificada da demanda geral da instalação e do disjuntor de entrada.
 * NÃO substitui o cálculo de fator de demanda completo da NBR 5410/NBR 14039 — aqui
 * somamos a carga ativa instalada e aplicamos a corrente de entrada conforme o tipo
 * de fornecimento, escolhendo o disjuntor padrão imediatamente superior. Use como
 * ponto de partida e confirme o padrão de entrada com a concessionária local.
 */
export function calcularResumoDemanda(
  circuitos: { potenciaW: number }[],
  tensaoV: number,
  tipoEntrada: TipoEntrada
): ResumoDemanda {
  const cargaInstaladaW = circuitos.reduce((s, c) => s + c.potenciaW, 0);

  let correnteEntradaA: number;
  if (tipoEntrada === "Trifásico") {
    correnteEntradaA = cargaInstaladaW / (Math.sqrt(3) * tensaoV);
  } else if (tipoEntrada === "Bifásico") {
    correnteEntradaA = cargaInstaladaW / (2 * tensaoV);
  } else {
    correnteEntradaA = cargaInstaladaW / tensaoV;
  }

  const disjuntorGeralA = escolherDisjuntorPadrao(correnteEntradaA * 1.15); // margem de segurança de 15%

  let tipoEntradaSugerido: TipoEntrada = "Monofásico";
  if (disjuntorGeralA > 63) tipoEntradaSugerido = "Trifásico";
  else if (disjuntorGeralA > 40) tipoEntradaSugerido = "Bifásico";

  return { cargaInstaladaW, correnteEntradaA, disjuntorGeralA, tipoEntradaSugerido };
}

function escolherDisjuntorPadrao(correnteA: number): number {
  for (const valor of DISJUNTORES_PADRAO) {
    if (valor >= correnteA) return valor;
  }
  return DISJUNTORES_PADRAO[DISJUNTORES_PADRAO.length - 1];
}

// ---------------------------------------------------------------------------
// Balanceamento automático de fases (trifásico R-S-T)
// ---------------------------------------------------------------------------
export interface BalancoFases {
  R: number;
  S: number;
  T: number;
  desbalanceamentoPercent: number;
  status: "ok" | "atencao" | "critico";
}

export function calcularBalanco(circuitos: { fase: Fase; potenciaW: number }[]): BalancoFases {
  const totals: Record<Fase, number> = { R: 0, S: 0, T: 0 };
  for (const c of circuitos) totals[c.fase] += c.potenciaW;
  const max = Math.max(totals.R, totals.S, totals.T);
  const min = Math.min(totals.R, totals.S, totals.T);
  const media = (totals.R + totals.S + totals.T) / 3;
  const desbalanceamentoPercent = media > 0 ? ((max - min) / media) * 100 : 0;
  const status = desbalanceamentoPercent <= 10 ? "ok" : desbalanceamentoPercent <= 20 ? "atencao" : "critico";
  return { ...totals, desbalanceamentoPercent, status };
}

/**
 * Redistribui automaticamente as fases dos circuitos para minimizar o desbalanceamento.
 * Algoritmo guloso LPT (Longest Processing Time): ordena os circuitos do maior para o
 * menor consumo e atribui cada um, em sequência, à fase que estiver com menor carga acumulada.
 * Circuitos de um mesmo "grupo" (ex.: já fixados por projeto) podem ser excluídos via `bloqueados`.
 */
export function balancearFases<T extends { id: string; potenciaW: number; fase: Fase }>(
  circuitos: T[],
  bloqueados: Set<string> = new Set()
): T[] {
  const fixos = circuitos.filter((c) => bloqueados.has(c.id));
  const moveis = circuitos.filter((c) => !bloqueados.has(c.id)).sort((a, b) => b.potenciaW - a.potenciaW);

  const totals: Record<Fase, number> = { R: 0, S: 0, T: 0 };
  for (const c of fixos) totals[c.fase] += c.potenciaW;

  const resultado: T[] = [...fixos];
  for (const c of moveis) {
    const faseEscolhida = (["R", "S", "T"] as Fase[]).reduce((menor, atual) =>
      totals[atual] < totals[menor] ? atual : menor
    , "R" as Fase);
    totals[faseEscolhida] += c.potenciaW;
    resultado.push({ ...c, fase: faseEscolhida });
  }

  // devolve na ordem original por id
  const ordemOriginal = new Map(circuitos.map((c, i) => [c.id, i]));
  return resultado.sort((a, b) => (ordemOriginal.get(a.id) ?? 0) - (ordemOriginal.get(b.id) ?? 0));
}
