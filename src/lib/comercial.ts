// Orçamento de materiais (referência editável) e correção de fator de potência
// para motores monofásicos e trifásicos.

import { TABELA_CABOS, DISJUNTORES_PADRAO, type CircuitoCalculado } from "./nbr5410";

// ---------------------------------------------------------------------------
// Tabela de preços de referência — EDITÁVEL pelo usuário.
// Valores aproximados de mercado (grandes redes de material elétrico/construção).
// Sirvem como ponto de partida; ajuste para a região e data do seu orçamento.
// ---------------------------------------------------------------------------
export interface PrecosReferencia {
  caboPorMm2PorMetro: Record<number, number>; // R$/m por bitola (cabo flexível 750V)
  disjuntorUnitario: number; // R$/un — disjuntor monopolar/bipolar padrão DIN
  dpsUnitario: number; // R$/un — DPS Classe II
  conduiteEConectorPorCircuito: number; // R$ — estimativa de eletroduto+conectores por circuito
  quadroDistribuicaoBase: number; // R$ — QDC básico (até 12 disjuntores)
  capacitorPorKvar: number; // R$/kVAr — banco de capacitores de baixa tensão
}

export const PRECOS_PADRAO: PrecosReferencia = {
  caboPorMm2PorMetro: {
    1.5: 1.9,
    2.5: 2.9,
    4: 4.4,
    6: 6.8,
    10: 11.5,
    16: 18.5,
    25: 29,
    35: 41,
  },
  disjuntorUnitario: 22,
  dpsUnitario: 75,
  conduiteEConectorPorCircuito: 18,
  quadroDistribuicaoBase: 180,
  capacitorPorKvar: 95,
};

export interface ItemOrcamento {
  descricao: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  precoTotal: number;
}

export interface Orcamento {
  itens: ItemOrcamento[];
  total: number;
}

/**
 * Monta o quantitativo de materiais a partir do memorial de circuitos calculado.
 * Metragem de cabo considera fase + neutro (2 condutores) por circuito monofásico;
 * ajuste manualmente se o seu projeto usar retorno trifásico ou terra dedicado extra.
 */
export function calcularOrcamento(
  circuitos: CircuitoCalculado[],
  precos: PrecosReferencia = PRECOS_PADRAO,
  dpsQuantidade: number = 1
): Orcamento {
  const itens: ItemOrcamento[] = [];

  // Cabo, agrupado por bitola — 2 condutores (fase + neutro) por metro de circuito
  const metrosPorBitola = new Map<number, number>();
  for (const c of circuitos) {
    const metros = c.comprimentoM * 2;
    metrosPorBitola.set(c.secaoFinalMm2, (metrosPorBitola.get(c.secaoFinalMm2) ?? 0) + metros);
  }
  for (const [bitola, metros] of Array.from(metrosPorBitola.entries()).sort((a, b) => a[0] - b[0])) {
    const preco = precos.caboPorMm2PorMetro[bitola] ?? 0;
    itens.push({
      descricao: `Cabo flexível ${bitola}mm²`,
      quantidade: Math.ceil(metros),
      unidade: "m",
      precoUnitario: preco,
      precoTotal: Math.ceil(metros) * preco,
    });
  }

  // Disjuntores, agrupados por corrente nominal
  const disjuntoresPorAmperagem = new Map<number, number>();
  for (const c of circuitos) {
    disjuntoresPorAmperagem.set(c.disjuntorA, (disjuntoresPorAmperagem.get(c.disjuntorA) ?? 0) + 1);
  }
  for (const [amperagem, qtd] of Array.from(disjuntoresPorAmperagem.entries()).sort((a, b) => a[0] - b[0])) {
    itens.push({
      descricao: `Disjuntor ${amperagem}A`,
      quantidade: qtd,
      unidade: "un",
      precoUnitario: precos.disjuntorUnitario,
      precoTotal: qtd * precos.disjuntorUnitario,
    });
  }

  // Eletroduto + conectores (estimativa por circuito)
  if (circuitos.length > 0) {
    itens.push({
      descricao: "Eletroduto e conectores (estimativa por circuito)",
      quantidade: circuitos.length,
      unidade: "circuito",
      precoUnitario: precos.conduiteEConectorPorCircuito,
      precoTotal: circuitos.length * precos.conduiteEConectorPorCircuito,
    });
  }

  // DPS
  if (dpsQuantidade > 0) {
    itens.push({
      descricao: "DPS Classe II",
      quantidade: dpsQuantidade,
      unidade: "un",
      precoUnitario: precos.dpsUnitario,
      precoTotal: dpsQuantidade * precos.dpsUnitario,
    });
  }

  // Quadro de distribuição
  itens.push({
    descricao: "Quadro de Distribuição (QDC)",
    quantidade: 1,
    unidade: "un",
    precoUnitario: precos.quadroDistribuicaoBase,
    precoTotal: precos.quadroDistribuicaoBase,
  });

  const total = itens.reduce((s, i) => s + i.precoTotal, 0);
  return { itens, total };
}

// ---------------------------------------------------------------------------
// Correção de fator de potência — motores monofásicos e trifásicos
// ---------------------------------------------------------------------------
export const HP_PARA_KW = 0.7457;

export const PASSOS_CAPACITORES_KVAR = [2.5, 5, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 50, 60, 75, 100];

export interface EntradaMotor {
  tipo: "Monofásico" | "Trifásico";
  potencia: number;
  unidadePotencia: "kW" | "HP" | "CV";
  fpAtual: number;
  fpDesejado: number;
  quantidade: number;
}

export interface ResultadoCorrecaoFP {
  potenciaKW: number;
  potenciaAtivaTotalKW: number;
  qcNecessarioKvar: number;
  bancoSugeridoKvar: number[];
  bancoTotalKvar: number;
  precoEstimado: number;
}

function paraKW(potencia: number, unidade: EntradaMotor["unidadePotencia"]): number {
  if (unidade === "kW") return potencia;
  // CV (cavalo-vapor) e HP são tratados de forma equivalente nesta calculadora (diferença <1%)
  return potencia * HP_PARA_KW;
}

/** tan(arccos(fp)) calculado via identidade trigonométrica, evitando duas chamadas de Math.acos/Math.tan */
function tanFromFp(fp: number): number {
  const fpClamped = Math.min(Math.max(fp, 0.0001), 1);
  return Math.sqrt(1 - fpClamped * fpClamped) / fpClamped;
}

/**
 * Calcula a potência reativa de correção (kVAr) necessária para elevar o FP de um motor
 * (ou grupo de motores idênticos) do valor atual para o valor desejado, e sugere uma
 * combinação de capacitores padrão de mercado que atenda essa necessidade.
 */
export function calcularCorrecaoFP(motor: EntradaMotor, precoPorKvar: number = PRECOS_PADRAO.capacitorPorKvar): ResultadoCorrecaoFP {
  const potenciaKW = paraKW(motor.potencia, motor.unidadePotencia);
  const potenciaAtivaTotalKW = potenciaKW * motor.quantidade;
  const qcNecessarioKvar = potenciaAtivaTotalKW * (tanFromFp(motor.fpAtual) - tanFromFp(motor.fpDesejado));

  const bancoSugeridoKvar = montarBancoCapacitores(Math.max(qcNecessarioKvar, 0));
  const bancoTotalKvar = bancoSugeridoKvar.reduce((s, v) => s + v, 0);

  return {
    potenciaKW,
    potenciaAtivaTotalKW,
    qcNecessarioKvar: Math.max(qcNecessarioKvar, 0),
    bancoSugeridoKvar,
    bancoTotalKvar,
    precoEstimado: bancoTotalKvar * precoPorKvar,
  };
}

/** Combina passos padrão de capacitores (kVAr) para atingir, sem ficar abaixo, o valor necessário */
export function montarBancoCapacitores(qcNecessarioKvar: number): number[] {
  if (qcNecessarioKvar <= 0) return [];
  const passos = [...PASSOS_CAPACITORES_KVAR].sort((a, b) => b - a);
  let restante = qcNecessarioKvar;
  const escolhidos: number[] = [];

  for (const passo of passos) {
    while (restante > 0.01 && passo <= restante + 0.5) {
      escolhidos.push(passo);
      restante -= passo;
    }
  }
  // sobra pequena: fecha com o menor passo padrão disponível
  if (restante > 0.01) {
    escolhidos.push(Math.min(...PASSOS_CAPACITORES_KVAR));
  }
  return escolhidos.sort((a, b) => b - a);
}
