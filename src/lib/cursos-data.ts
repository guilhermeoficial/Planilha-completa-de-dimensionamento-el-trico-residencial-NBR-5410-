// Módulo de Cursos — estrutura de conteúdo por nível e área, no estilo
// "passar a página" (inspirado no material aberto do IMD). Por enquanto o
// conteúdo é estático no código; se o formato validar, migramos para uma
// tabela no banco com painel de edição.

export type Nivel = "Técnico" | "Superior";

export interface Pagina {
  titulo: string;
  conteudo: string[]; // parágrafos
  videoUrl?: string; // reservado para quando os vídeos (Manim/Python) existirem
}

export interface Modulo {
  slug: string;
  titulo: string;
  descricao: string;
  paginas: Pagina[];
}

export interface Area {
  slug: string;
  nome: string;
  nivel: Nivel;
  descricao: string;
  modulos: Modulo[];
}

export const AREAS: Area[] = [
  {
    slug: "eletrotecnica",
    nome: "Eletrotécnica",
    nivel: "Técnico",
    descricao: "Fundamentos de circuitos elétricos, máquinas e instalações — base para concursos técnicos (Petrobras, Eletrobras, transmissoras e distribuidoras).",
    modulos: [
      {
        slug: "fundamentos-eletricidade",
        titulo: "Módulo 1 — Fundamentos de Eletricidade",
        descricao: "Grandezas elétricas básicas: tensão, corrente, resistência e potência.",
        paginas: [
          {
            titulo: "1.1 — O que é corrente elétrica",
            conteudo: [
              "A corrente elétrica é o movimento ordenado de cargas elétricas (elétrons livres) através de um condutor, provocado por uma diferença de potencial entre dois pontos.",
              "Sua unidade de medida é o Ampère (A), e o instrumento usado para medi-la é o amperímetro, conectado em série com o circuito.",
              "Convencionalmente, o sentido da corrente elétrica é definido como o sentido do potencial mais alto para o mais baixo (sentido convencional), mesmo sabendo que o movimento real dos elétrons ocorre no sentido contrário.",
            ],
          },
          {
            titulo: "1.2 — Tensão elétrica (diferença de potencial)",
            conteudo: [
              "A tensão elétrica, também chamada de diferença de potencial (ddp) ou voltagem, é a grandeza que impulsiona os elétrons através de um circuito.",
              "É medida em Volts (V), usando um voltímetro conectado em paralelo com o trecho do circuito que se quer medir.",
              "Sem uma diferença de potencial entre dois pontos, não há corrente elétrica — é a tensão que fornece a 'energia' necessária para o deslocamento das cargas.",
            ],
          },
          {
            titulo: "1.3 — Resistência elétrica e a Lei de Ohm",
            conteudo: [
              "Todo material oferece uma certa oposição à passagem da corrente elétrica, chamada de resistência elétrica, medida em Ohms (Ω).",
              "A Lei de Ohm relaciona as três grandezas fundamentais: V = R × I, onde V é a tensão (V), R é a resistência (Ω) e I é a corrente (A).",
              "Dessa fórmula derivam as outras duas: I = V/R (para calcular a corrente) e R = V/I (para calcular a resistência).",
              "Dica de prova: em circuitos resistivos puros (sem indutância ou capacitância), essa relação é linear — dobrar a tensão dobra a corrente, mantendo a resistência constante.",
            ],
          },
          {
            titulo: "1.4 — Potência elétrica",
            conteudo: [
              "A potência elétrica representa a taxa de conversão de energia elétrica em outra forma de energia (calor, luz, movimento), por unidade de tempo. Sua unidade é o Watt (W).",
              "A fórmula fundamental é P = V × I. Combinando com a Lei de Ohm, é possível chegar a duas formas adicionais: P = I² × R e P = V²/R.",
              "Essas três formas da fórmula de potência são frequentemente cobradas em concursos — vale memorizar todas as variações.",
            ],
          },
          {
            titulo: "1.5 — Associação de resistores",
            conteudo: [
              "Em série: a corrente é a mesma em todos os resistores, e a resistência equivalente é a soma simples: Req = R1 + R2 + R3 + ...",
              "Em paralelo: a tensão é a mesma em todos os resistores, e o inverso da resistência equivalente é a soma dos inversos: 1/Req = 1/R1 + 1/R2 + 1/R3 + ...",
              "Pegadinha comum de prova: associar incorretamente as fórmulas — lembre-se que em paralelo a resistência equivalente é sempre menor que a menor resistência individual do circuito.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "eletronica",
    nome: "Eletrônica",
    nivel: "Técnico",
    descricao: "Semicondutores, diodos, transistores e circuitos eletrônicos básicos.",
    modulos: [],
  },
];

export function buscarArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function buscarModulo(areaSlug: string, moduloSlug: string): Modulo | undefined {
  return buscarArea(areaSlug)?.modulos.find((m) => m.slug === moduloSlug);
}

// ---------------------------------------------------------------------------
// Banco de questões — exemplos originais para validar a estrutura.
// (Quando você tiver provas reais de concursos anteriores, substituímos por
// elas — questões de provas têm direitos da banca organizadora, então o ideal
// é usar questões originais ou adquiridas de bancos licenciados.)
// ---------------------------------------------------------------------------
export interface Questao {
  id: string;
  area: string;
  banca: string;
  ano: number;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number; // índice da alternativa correta
  explicacao: string;
}

export const QUESTOES: Questao[] = [
  {
    id: "q1",
    area: "Eletrotécnica",
    banca: "Exemplo",
    ano: 2026,
    enunciado: "Um resistor de 10Ω é submetido a uma tensão de 50V. Qual é a corrente que circula por ele?",
    alternativas: ["0,2 A", "2 A", "5 A", "500 A"],
    respostaCorreta: 2,
    explicacao: "Pela Lei de Ohm, I = V/R = 50/10 = 5 A.",
  },
  {
    id: "q2",
    area: "Eletrotécnica",
    banca: "Exemplo",
    ano: 2026,
    enunciado: "Três resistores de 6Ω cada são associados em paralelo. Qual é a resistência equivalente?",
    alternativas: ["18 Ω", "6 Ω", "3 Ω", "2 Ω"],
    respostaCorreta: 3,
    explicacao: "1/Req = 1/6 + 1/6 + 1/6 = 3/6 → Req = 6/3 = 2 Ω.",
  },
  {
    id: "q3",
    area: "Eletrotécnica",
    banca: "Exemplo",
    ano: 2026,
    enunciado: "Um equipamento consome 1100 W ao ser ligado em uma rede de 220V. Qual é a corrente elétrica consumida?",
    alternativas: ["2 A", "5 A", "50 A", "242000 A"],
    respostaCorreta: 1,
    explicacao: "P = V × I → I = P/V = 1100/220 = 5 A.",
  },
  {
    id: "q4",
    area: "Eletrotécnica",
    banca: "Exemplo",
    ano: 2026,
    enunciado: "Em um circuito puramente resistivo em série, ao dobrar a tensão aplicada mantendo a resistência constante, o que acontece com a corrente?",
    alternativas: ["Permanece igual", "Dobra", "Reduz à metade", "Quadruplica"],
    respostaCorreta: 1,
    explicacao: "Pela Lei de Ohm (I = V/R), com R constante, a corrente é diretamente proporcional à tensão — dobrar V dobra I.",
  },
];
