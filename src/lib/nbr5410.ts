// Motor de cálculo elétrico residencial — NBR 5410
// Reproduz fielmente a lógica da planilha Engine_Projeto_Eletrico_Corrigido.xlsx

export type TipoAmbiente = "Social/Quarto" | "Serviço/Cozinha" | "Banheiro" | "Varanda/Externo";
export type TipoCircuito = "Iluminação" | "TUG" | "TUE";
export type Fase = "R" | "S" | "T";
/** Fase de um circuito: monofásico em R, S ou T; "RST" = circuito trifásico (3F). */
export type FaseCircuito = Fase | "RST";
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

/** Tipos de lâmpada com potência típica em W */
export const TIPOS_LAMPADA = [
  { id: "led-9w",   nome: "LED 9W",          potenciaW: 9  },
  { id: "led-12w",  nome: "LED 12W",         potenciaW: 12 },
  { id: "led-15w",  nome: "LED 15W",         potenciaW: 15 },
  { id: "led-20w",  nome: "LED 20W (spot/downlight)", potenciaW: 20 },
  { id: "led-40w",  nome: "LED 40W (linear/fita)", potenciaW: 40 },
  { id: "fluo-15w", nome: "Fluorescente 15W", potenciaW: 15 },
  { id: "fluo-20w", nome: "Fluorescente 20W", potenciaW: 20 },
  { id: "fluo-40w", nome: "Fluorescente 40W", potenciaW: 40 },
] as const;

export type TipoLampada = typeof TIPOS_LAMPADA[number]["id"];

/**
 * Potência de iluminação (VA) baseada na lâmpada escolhida e nº de pontos.
 * Se nenhuma lâmpada/pontos informados, usa a fórmula prescritiva da NBR 5410
 * (100VA + 60VA por 4m² adicionais) como valor de segurança mínimo.
 */
export function calcPotenciaIluminacao(
  areaM2: number,
  pontosLuz?: number,
  tipoLampada?: TipoLampada
): number {
  // Se o projetista informou pontos e tipo de lâmpada, usa valores reais
  if (pontosLuz && pontosLuz > 0 && tipoLampada) {
    const lampada = TIPOS_LAMPADA.find(l => l.id === tipoLampada);
    if (lampada) {
      const potenciaW = pontosLuz * lampada.potenciaW;
      const fp = 0.92;
      return Math.ceil(potenciaW / fp); // VA
    }
  }
  // Fallback: fórmula prescritiva NBR 5410 (conservadora, era das incandescentes)
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
  tipoLampada?: TipoLampada | null;
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
    potIluminacaoVA: calcPotenciaIluminacao(
      ambiente.areaM2,
      ambiente.pontosLuzManual ?? undefined,
      ambiente.tipoLampada ?? undefined
    ),
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
  fase: FaseCircuito;
  potenciaVA: number;
  comprimentoM: number;
  isolacao: Isolacao;
  circuitosAgrupados?: number;
  /** Fator de correção por agrupamento deste circuito (substitui o do projeto). */
  fca?: number | null;
  /** Disjuntor definido em projeto (A); se vazio, o motor escolhe. */
  disjuntorFixoA?: number | null;
  /** Proteção por DR de alta sensibilidade (30 mA). */
  dr30ma?: boolean;
}

export interface OpcoesCalculo {
  /** Fator de correção por agrupamento padrão do projeto (ex.: 0,70 para 3 circuitos por eletroduto). */
  fca?: number;
}

export interface CircuitoCalculado extends Circuito {
  potenciaW: number;
  ibA: number; // corrente de projeto (A)
  ibCorrigidaA: number;
  secaoCaboMm2: number;
  quedaPercent: number;
  secaoFinalMm2: number;
  disjuntorA: number;
  ampacidadeFinalA: number; // Iz: capacidade do cabo final já com o fator de agrupamento (A)
  fcaAplicado: number;
  trifasico: boolean;
}

function ampacidade(linha: LinhaCabo, isolacao: Isolacao, trifasico = false): number {
  if (trifasico) return isolacao === "EPR" ? linha.epr3 : linha.pvc3;
  return isolacao === "EPR" ? linha.epr2 : linha.pvc2;
}

function escolherSecaoPorAmpacidade(ibA: number, isolacao: Isolacao, trifasico: boolean): LinhaCabo {
  for (const linha of TABELA_CABOS) {
    if (ampacidade(linha, isolacao, trifasico) >= ibA) return linha;
  }
  return TABELA_CABOS[TABELA_CABOS.length - 1];
}

function quedaTensao(linha: LinhaCabo, comprimentoM: number, ibA: number, tensaoV: number, trifasico: boolean): number {
  // Monofásico (ida e volta): ΔV = 2·R·L·I / V. Trifásico: ΔV = √3·R·L·I / V (V de linha).
  const k = trifasico ? Math.sqrt(3) : 2;
  return (k * linha.r * (comprimentoM / 1000) * ibA) / tensaoV;
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
 * Ib = S / V (monofásico) ou S / (√3·V) (trifásico), com S = P/FP. A seção sai da capacidade de
 * condução com o fator de agrupamento (Iz = Itab × FCA ≥ Ib), do limite de queda de tensão (calculada
 * com o Ib real) e do mínimo da NBR 5410 (1,5 mm² iluminação; 2,5 mm² força, incluindo TUE).
 */
export function calcularCircuito(c: Circuito, op: OpcoesCalculo = {}): CircuitoCalculado {
  const trifasico = c.fase === "RST";
  const fca = c.fca && c.fca > 0 ? c.fca : op.fca && op.fca > 0 ? op.fca : 1;
  const potenciaW = c.potenciaVA * c.fp;
  const ibA = trifasico ? c.potenciaVA / (Math.sqrt(3) * c.tensaoV) : c.potenciaVA / c.tensaoV;
  const ibCorrigidaA = ibA / fca;

  let linha = escolherSecaoPorAmpacidade(ibCorrigidaA, c.isolacao, trifasico);
  let idx = TABELA_CABOS.findIndex((l) => l.bitola === linha.bitola);
  const secaoMin = c.tipo === "Iluminação" ? 1.5 : 2.5;
  while (TABELA_CABOS[idx].bitola < secaoMin && idx < TABELA_CABOS.length - 1) idx += 1;
  linha = TABELA_CABOS[idx];

  // sobe a seção até respeitar o limite de queda de tensão
  let queda = quedaTensao(linha, c.comprimentoM, ibA, c.tensaoV, trifasico);
  while (queda * 100 > QUEDA_MAX_PERCENT && idx < TABELA_CABOS.length - 1) {
    idx += 1;
    linha = TABELA_CABOS[idx];
    queda = quedaTensao(linha, c.comprimentoM, ibA, c.tensaoV, trifasico);
  }

  const secaoFinalMm2 = linha.bitola;
  const ampacidadeFinalA = ampacidade(linha, c.isolacao, trifasico) * fca;
  const disjuntorA = c.disjuntorFixoA && c.disjuntorFixoA > 0 ? c.disjuntorFixoA : escolherDisjuntor(ibA, ampacidadeFinalA);

  return {
    ...c,
    potenciaW,
    ibA,
    ibCorrigidaA,
    secaoCaboMm2: secaoFinalMm2,
    quedaPercent: queda * 100,
    secaoFinalMm2,
    disjuntorA,
    ampacidadeFinalA,
    fcaAplicado: fca,
    trifasico,
  };
}

export function calcularMemorial(circuitos: Circuito[], op: OpcoesCalculo = {}): CircuitoCalculado[] {
  return circuitos.map((c) => calcularCircuito(c, op));
}

// ---------------------------------------------------------------------------
// Resumo de demanda geral e disjuntor de entrada (padrão de entrada)
// ---------------------------------------------------------------------------
export type TipoEntrada = "Monofásico" | "Bifásico" | "Trifásico";

// ---------------------------------------------------------------------------
// CRITÉRIOS DE CONCESSIONÁRIAS — padrões de entrada e exigências específicas
// ---------------------------------------------------------------------------
export interface CriterioConcessionaria {
  nome: string;
  /** Carga máxima para entrada monofásica (kW) */
  maxMonofasicoKW: number;
  /** Carga máxima para entrada bifásica (kW) */
  maxBifasicoKW: number;
  /** Seção mínima do ramal de entrada (mm²) — condutor de fase */
  secaoMinRamalMm2: number;
  /** Disjuntor mínimo no padrão de entrada (A) */
  disjuntorMinEntradaA: number;
  /** Altura mínima do medidor (m) */
  alturaMinMedidorM: number;
  /** Observações específicas da concessionária */
  obs: string[];
}

export const CRITERIOS_CONCESSIONARIAS: Record<string, CriterioConcessionaria> = {
  COSERN: {
    nome: "COSERN — RN",
    maxMonofasicoKW: 12,
    maxBifasicoKW: 25,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: [
      "Ramal de entrada mínimo: 10 mm² Cu ou 16 mm² Al",
      "Disjuntor geral mínimo: 40 A (monofásico) ou 40 A por fase (bifásico/trifásico)",
      "Carga > 12 kW: obrigatório bifásico ou trifásico",
      "Carga > 25 kW: obrigatório trifásico",
      "Medidor: altura mínima 1,50 m do solo, máxima 1,80 m",
      "Aterramento: resistência ≤ 10 Ω (COSERN NT-17/2020)",
      "DR obrigatório em banheiros, cozinha e área de serviço (COSERN NT-03)",
    ],
  },
  CELPE: {
    nome: "CELPE — PE",
    maxMonofasicoKW: 12,
    maxBifasicoKW: 25,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: ["Ramal mínimo 10 mm² Cu", "Carga > 12 kW: bifásico ou trifásico"],
  },
  COELBA: {
    nome: "COELBA — BA",
    maxMonofasicoKW: 12,
    maxBifasicoKW: 25,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: ["Ramal mínimo 10 mm² Cu", "Carga > 12 kW: bifásico ou trifásico"],
  },
  CEMIG: {
    nome: "CEMIG — MG",
    maxMonofasicoKW: 14,
    maxBifasicoKW: 28,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: ["Ramal mínimo 10 mm² Cu (CEMIG NTC-5)", "Carga > 14 kW: bifásico ou trifásico"],
  },
  LIGHT: {
    nome: "LIGHT — RJ",
    maxMonofasicoKW: 12,
    maxBifasicoKW: 25,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: ["Ramal mínimo 10 mm² Cu", "Carga > 12 kW: bifásico ou trifásico"],
  },
  COPEL: {
    nome: "COPEL — PR",
    maxMonofasicoKW: 14,
    maxBifasicoKW: 28,
    secaoMinRamalMm2: 10,
    disjuntorMinEntradaA: 40,
    alturaMinMedidorM: 1.5,
    obs: ["Ramal mínimo 10 mm² Cu (COPEL NTC 904200)", "Carga > 14 kW: bifásico"],
  },
};

/**
 * Aplica os critérios da concessionária para ajustar o tipo de entrada
 * e a seção mínima do ramal, além de gerar alertas quando a carga
 * exige mudança obrigatória do padrão de entrada.
 */
export function aplicarCriterioConcessionaria(
  cargaW: number,
  tipoEntradaSolicitado: TipoEntrada,
  concessionaria: string
): {
  tipoEntradaFinal: TipoEntrada;
  secaoRamalMm2: number;
  alertasConcessionaria: string[];
} {
  const c = CRITERIOS_CONCESSIONARIAS[concessionaria] ?? CRITERIOS_CONCESSIONARIAS["COSERN"];
  const cargaKW = cargaW / 1000;
  const alertas: string[] = [];
  let tipoEntradaFinal = tipoEntradaSolicitado;

  if (cargaKW > c.maxBifasicoKW && tipoEntradaFinal !== "Trifásico") {
    tipoEntradaFinal = "Trifásico";
    alertas.push(`⚡ ${c.nome}: carga de ${cargaKW.toFixed(1)} kW excede ${c.maxBifasicoKW} kW — entrada TRIFÁSICA obrigatória.`);
  } else if (cargaKW > c.maxMonofasicoKW && tipoEntradaFinal === "Monofásico") {
    tipoEntradaFinal = "Bifásico";
    alertas.push(`⚡ ${c.nome}: carga de ${cargaKW.toFixed(1)} kW excede ${c.maxMonofasicoKW} kW — entrada BIFÁSICA ou TRIFÁSICA obrigatória.`);
  }

  return {
    tipoEntradaFinal,
    secaoRamalMm2: c.secaoMinRamalMm2,
    alertasConcessionaria: alertas,
  };
}

export interface ResumoDemanda {
  cargaInstaladaW: number;
  correnteEntradaA: number;
  disjuntorGeralA: number;
  tipoEntradaSugerido: TipoEntrada;
  alertasConcessionaria?: string[];
  secaoRamalMm2?: number;
  /** "dis-nor-030" quando a demanda sai do método da concessionária (unidade comercial). */
  metodo?: "simplificado" | "dis-nor-030";
  demandaKVA?: number;
  categoria?: CategoriaConcessionaria | null;
  parcelas?: ParcelaDemanda[];
  tensaoLinhaV?: number;
}

// ---------------------------------------------------------------------------
// Demanda pelo método da DIS-NOR-030 (Neoenergia) para unidade comercial
// ---------------------------------------------------------------------------
export type GrupoDemanda = "iluminacao" | "tomadas" | "microondas" | "arcondicionado" | "motor" | "especial";

export interface CargaDemanda {
  grupo: GrupoDemanda;
  descricao: string;
  potenciaW: number; // potência ativa unitária
  fp: number;
  quantidade?: number;
}

export interface ParcelaDemanda {
  id: string;
  descricao: string;
  base: string; // como a parcela foi obtida
  kva: number;
}

/** Faixas de demanda por categoria. Tabela PARCIAL: só T10 e T11 foram conferidas no projeto da Ctécnica (R02). */
export interface CategoriaConcessionaria {
  id: string;
  demandaMinKVA: number;
  demandaMaxKVA: number;
  disjuntorA: number;
  ramalMm2: number;
  ramalDescricao: string;
}

export const CATEGORIAS_COSERN: CategoriaConcessionaria[] = [
  { id: "T10", demandaMinKVA: 40.1, demandaMaxKVA: 52, disjuntorA: 80, ramalMm2: 25, ramalDescricao: "3 x 25 + N 25 mm² (tabela T10)" },
  { id: "T11", demandaMinKVA: 52.1, demandaMaxKVA: 66, disjuntorA: 100, ramalMm2: 35, ramalDescricao: "3 x 35 + N 35 + PE 16 mm² Cu HEPR (tabela T11)" },
];

export function categoriaPorDemanda(demandaKVA: number): CategoriaConcessionaria | null {
  return CATEGORIAS_COSERN.find((c) => demandaKVA >= c.demandaMinKVA && demandaKVA <= c.demandaMaxKVA) ?? null;
}

/**
 * D = a + d + f + g + h (kVA).
 *  a: iluminação (FD 1, em kVA pelo FP) + tomadas (FD 1 até completar 12 kW somados à iluminação; 0,50 no excedente);
 *  d: micro-ondas; f: ar-condicionado (FD adotado 1,00); g: motores (maior 100%, demais 50%); h: equipamentos especiais.
 * Fatores conforme o R02 (escolas, Tabelas 12, 14 e 22 da DIS-NOR-030 REV 04; conferir a revisão vigente).
 */
export function calcularDemandaDisNor030(cargas: CargaDemanda[]): { parcelas: ParcelaDemanda[]; demandaKVA: number; cargaInstaladaW: number } {
  const dos = (g: GrupoDemanda) => cargas.filter((c) => c.grupo === g);
  const pot = (c: CargaDemanda) => c.potenciaW * (c.quantidade ?? 1);
  const va = (c: CargaDemanda) => pot(c) / (c.fp || 1);

  const pIlum = dos("iluminacao").reduce((t, c) => t + pot(c), 0);
  const vaIlum = dos("iluminacao").reduce((t, c) => t + va(c), 0);
  const pTom = dos("tomadas").reduce((t, c) => t + pot(c), 0);
  const faixa1 = Math.max(0, Math.min(pTom, 12000 - pIlum));
  const a = vaIlum + faixa1 * 1.0 + (pTom - faixa1) * 0.5;
  const d = dos("microondas").reduce((t, c) => t + va(c), 0);
  const f = dos("arcondicionado").reduce((t, c) => t + va(c), 0) * 1.0;

  const unidadesMotor: number[] = [];
  for (const m of dos("motor")) for (let i = 0; i < (m.quantidade ?? 1); i++) unidadesMotor.push(m.potenciaW / (m.fp || 1));
  unidadesMotor.sort((x, y) => y - x);
  const g = unidadesMotor.reduce((t, v, i) => t + (i === 0 ? v : v * 0.5), 0);
  const h = dos("especial").reduce((t, c) => t + va(c), 0);

  const parcelas: ParcelaDemanda[] = [
    { id: "a", descricao: "Iluminação e tomadas", base: `${Math.round(pIlum)} W de iluminação (FP) + tomadas ${Math.round(pTom)} W: FD 1,00 até 12 kW e 0,50 no excedente`, kva: a / 1000 },
    { id: "d", descricao: "Micro-ondas", base: "FD 1,00", kva: d / 1000 },
    { id: "f", descricao: "Ar-condicionado", base: "FD 1,00 adotado a favor da segurança", kva: f / 1000 },
    { id: "g", descricao: "Motores e máquinas de bancada", base: "maior unidade 100%, demais 50%", kva: g / 1000 },
    { id: "h", descricao: "Equipamentos especiais (laboratório)", base: "FD 1,00", kva: h / 1000 },
  ];
  const cargaInstaladaW = cargas.reduce((t, c) => t + pot(c), 0);
  return { parcelas, demandaKVA: parcelas.reduce((t, p) => t + p.kva, 0), cargaInstaladaW };
}

export function calcularResumoDemandaDisNor030(
  circuitos: { potenciaW: number }[],
  cargas: CargaDemanda[],
  tensaoLinhaV: number
): ResumoDemanda {
  const cargaInstaladaW = circuitos.reduce((t, c) => t + c.potenciaW, 0);
  const dem = calcularDemandaDisNor030(cargas);
  const categoria = categoriaPorDemanda(dem.demandaKVA);
  const correnteEntradaA = (dem.demandaKVA * 1000) / (Math.sqrt(3) * tensaoLinhaV);
  const alertas: string[] = [];
  if (Math.abs(dem.cargaInstaladaW - cargaInstaladaW) > 1) {
    alertas.push(`As cargas usadas na demanda somam ${Math.round(dem.cargaInstaladaW)} W e os circuitos somam ${Math.round(cargaInstaladaW)} W: conferir.`);
  }
  if (!categoria) alertas.push(`Demanda de ${dem.demandaKVA.toFixed(2)} kVA fora das categorias T10 e T11 cadastradas: conferir a tabela da Cosern.`);
  if (cargaInstaladaW > 75000) alertas.push("Carga instalada acima de 75 kW: atendimento em baixa tensão não é permitido (ANEEL REN 1000/2021).");
  return {
    cargaInstaladaW,
    correnteEntradaA,
    disjuntorGeralA: categoria?.disjuntorA ?? escolherDisjuntorPadrao(correnteEntradaA * 1.15),
    tipoEntradaSugerido: "Trifásico",
    alertasConcessionaria: alertas,
    secaoRamalMm2: categoria?.ramalMm2,
    metodo: "dis-nor-030",
    demandaKVA: dem.demandaKVA,
    categoria,
    parcelas: dem.parcelas,
    tensaoLinhaV,
  };
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
  tipoEntrada: TipoEntrada,
  concessionaria?: string
): ResumoDemanda {
  const cargaInstaladaW = circuitos.reduce((s, c) => s + c.potenciaW, 0);

  // Aplicar critérios da concessionária (padrão COSERN se não informado)
  const { tipoEntradaFinal, secaoRamalMm2, alertasConcessionaria } =
    concessionaria
      ? aplicarCriterioConcessionaria(cargaInstaladaW, tipoEntrada, concessionaria)
      : { tipoEntradaFinal: tipoEntrada, secaoRamalMm2: 10, alertasConcessionaria: [] };

  let correnteEntradaA: number;
  if (tipoEntradaFinal === "Trifásico") {
    correnteEntradaA = cargaInstaladaW / (Math.sqrt(3) * tensaoV);
  } else if (tipoEntradaFinal === "Bifásico") {
    correnteEntradaA = cargaInstaladaW / (2 * tensaoV);
  } else {
    correnteEntradaA = cargaInstaladaW / tensaoV;
  }

  const disjuntorGeralA = escolherDisjuntorPadrao(correnteEntradaA * 1.15);

  let tipoEntradaSugerido: TipoEntrada = tipoEntradaFinal;
  if (disjuntorGeralA > 63) tipoEntradaSugerido = "Trifásico";
  else if (disjuntorGeralA > 40) tipoEntradaSugerido = "Bifásico";

  return {
    cargaInstaladaW,
    correnteEntradaA,
    disjuntorGeralA,
    tipoEntradaSugerido,
    alertasConcessionaria,
    secaoRamalMm2,
  };
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

/** Soma por fase (R, S, T). Circuitos "RST" dividem a carga igualmente entre as três fases. */
function somarPorFase(circuitos: { fase: FaseCircuito; potenciaW: number }[]): Record<Fase, number> {
  const totals: Record<Fase, number> = { R: 0, S: 0, T: 0 };
  for (const c of circuitos) {
    if (c.fase === "RST") { totals.R += c.potenciaW / 3; totals.S += c.potenciaW / 3; totals.T += c.potenciaW / 3; }
    else totals[c.fase] += c.potenciaW;
  }
  return totals;
}

/** O campo potenciaW recebe a carga a equilibrar; use VA (carga aparente) para equilibrar correntes. */
export function calcularBalanco(circuitos: { fase: FaseCircuito; potenciaW: number }[]): BalancoFases {
  const totals = somarPorFase(circuitos);
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
export function balancearFases<T extends { id: string; potenciaW: number; fase: FaseCircuito }>(
  circuitos: T[],
  bloqueados: Set<string> = new Set()
): T[] {
  const fixos = circuitos.filter((c) => bloqueados.has(c.id) || c.fase === "RST");
  const moveis = circuitos.filter((c) => !bloqueados.has(c.id) && c.fase !== "RST").sort((a, b) => b.potenciaW - a.potenciaW);

  const totals = somarPorFase(fixos);

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
