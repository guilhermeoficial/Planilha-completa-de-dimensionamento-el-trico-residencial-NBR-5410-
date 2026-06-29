// Módulo de Cursos — estrutura de conteúdo por nível e área, no estilo
// "passar a página" (inspirado no material aberto do IMD). Por enquanto o
// conteúdo é estático no código; se o formato validar, migramos para uma
// tabela no banco com painel de edição.

export type Nivel = "Técnico" | "Superior";
export type BlocoEdital = "Conhecimentos Básicos" | "Bloco I" | "Bloco II" | "Bloco III";

export interface Dica {
  gatilho: string;
  titulo: string;
  explicacao: string;
  tipo: "senoide-fase" | "atraso-indutivo" | "avanco-capacitivo" | "triangulo-potencias" | "carga-capacitor" | "descarga-indutor" | "comparacao-corrente";
}

export interface Pagina {
  titulo: string;
  conteudo: string[]; // parágrafos antes das equações
  equacoes?: { latex: string; legenda?: string }[]; // fórmulas em destaque, renderizadas em LaTeX
  conteudo2?: string[]; // parágrafos depois das equações
  videoUrl?: string; // reservado para quando os vídeos (Manim/Python) existirem
  animacao?: "lei-de-ohm"; // animação interativa embutida nesta página
  dicas?: Dica[]; // dicas interativas com gráfico ao passar o mouse — estratégia de ensino
}

export interface Modulo {
  slug: string;
  titulo: string;
  descricao: string;
  bloco: BlocoEdital;
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
        descricao: "Grandezas elétricas básicas: tensão, corrente, resistência e potência — com fórmulas e simulação interativa.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "1.1 — O que é corrente elétrica",
            conteudo: [
              "A corrente elétrica é o movimento ordenado de cargas elétricas (elétrons livres) através de um condutor, provocado por uma diferença de potencial entre dois pontos.",
              "Sua unidade de medida é o Ampère (A), e o instrumento usado para medi-la é o amperímetro, conectado em série com o circuito.",
              "Formalmente, a corrente é definida como a taxa de variação de carga elétrica (Q, em Coulombs) ao longo do tempo:",
            ],
            equacoes: [
              { latex: "I = \\dfrac{\\Delta Q}{\\Delta t}", legenda: "I em Ampères (A), Q em Coulombs (C), t em segundos (s)" },
            ],
          },
          {
            titulo: "1.2 — Tensão elétrica (diferença de potencial)",
            conteudo: [
              "A tensão elétrica, também chamada de diferença de potencial (ddp) ou voltagem, é a grandeza que impulsiona os elétrons através de um circuito.",
              "É medida em Volts (V), usando um voltímetro conectado em paralelo com o trecho do circuito que se quer medir.",
              "Em termos energéticos, a tensão representa o trabalho realizado por unidade de carga para deslocá-la entre dois pontos:",
            ],
            equacoes: [
              { latex: "V = \\dfrac{W}{Q}", legenda: "V em Volts (V), W (trabalho/energia) em Joules (J), Q em Coulombs (C)" },
            ],
          },
          {
            titulo: "1.3 — Resistência elétrica e a Lei de Ohm",
            conteudo: [
              "Todo material oferece uma certa oposição à passagem da corrente elétrica, chamada de resistência elétrica, medida em Ohms (Ω).",
              "A Lei de Ohm relaciona as três grandezas fundamentais:",
            ],
            equacoes: [
              { latex: "V = R \\times I" },
              { latex: "I = \\dfrac{V}{R}", legenda: "forma usada para calcular a corrente" },
              { latex: "R = \\dfrac{V}{I}", legenda: "forma usada para calcular a resistência" },
            ],
            animacao: "lei-de-ohm",
          },
          {
            titulo: "1.4 — Resistência de um condutor (2ª Lei de Ohm)",
            conteudo: [
              "A resistência de um fio condutor depende do material (resistividade ρ), do seu comprimento (L) e da área da seção transversal (A):",
            ],
            equacoes: [
              { latex: "R = \\rho \\cdot \\dfrac{L}{A}", legenda: "ρ em Ω·m, L em metros, A em m²" },
            ],
            conteudo2: [
              "Quanto mais longo o fio, maior a resistência; quanto mais grosso (maior área), menor a resistência — é por isso que cabos de seção maior são usados em circuitos de maior corrente.",
            ],
          },
          {
            titulo: "1.5 — Potência elétrica",
            conteudo: [
              "A potência elétrica representa a taxa de conversão de energia elétrica em outra forma de energia (calor, luz, movimento), por unidade de tempo.",
            ],
            equacoes: [
              { latex: "P = V \\times I" },
              { latex: "P = I^2 \\times R", legenda: "substituindo V = R×I" },
              { latex: "P = \\dfrac{V^2}{R}", legenda: "substituindo I = V/R" },
            ],
            conteudo2: [
              "Essas três formas da fórmula de potência são frequentemente cobradas em concursos — vale memorizar todas as variações e saber transitar entre elas.",
            ],
          },
          {
            titulo: "1.6 — Energia elétrica consumida",
            conteudo: [
              "A energia elétrica é a potência multiplicada pelo tempo de uso — é o que a concessionária efetivamente cobra na conta de luz, em kWh:",
            ],
            equacoes: [
              { latex: "E = P \\times t", legenda: "E em Wh (ou kWh se P estiver em kW e t em horas)" },
            ],
            conteudo2: [
              "Exemplo de prova: um chuveiro de 5500W ligado por 0,5h consome E = 5500 × 0,5 = 2750 Wh = 2,75 kWh.",
            ],
          },
          {
            titulo: "1.7 — Associação de resistores",
            conteudo: ["Em série: a corrente é a mesma em todos os resistores, e a resistência equivalente é a soma simples:"],
            equacoes: [
              { latex: "R_{eq} = R_1 + R_2 + R_3 + \\dots" },
            ],
            conteudo2: [
              "Em paralelo: a tensão é a mesma em todos os resistores, e o inverso da resistência equivalente é a soma dos inversos:",
            ],
          },
          {
            titulo: "1.8 — Associação em paralelo (continuação)",
            conteudo: [],
            equacoes: [
              { latex: "\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3} + \\dots" },
              { latex: "R_{eq} = \\dfrac{R_1 \\times R_2}{R_1 + R_2}", legenda: "fórmula direta para apenas 2 resistores em paralelo" },
            ],
            conteudo2: [
              "Pegadinha comum de prova: associar incorretamente as fórmulas — lembre-se que em paralelo a resistência equivalente é sempre MENOR que a menor resistência individual do circuito.",
            ],
          },
        ],
      },
      {
        slug: "diagramas-e-ca",
        titulo: "Módulo 2 — Diagramas, Corrente Alternada e Trifásico",
        descricao: "Simbologia, diagramas unifilares/trifilares, circuitos CA, potência e sistemas trifásicos.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "2.1 — Simbologia elétrica básica",
            conteudo: [
              "Antes de ler qualquer diagrama, é preciso reconhecer os símbolos padronizados dos principais componentes. Eles são definidos por normas de simbologia gráfica (no Brasil, a ABNT NBR 5444) e são praticamente universais entre fabricantes e projetistas.",
              "Os principais símbolos que você vai encontrar constantemente em provas e em campo:",
              "• Resistor: um retângulo (padrão IEC/ABNT) ou um zigue-zague (padrão americano, ainda comum em livros)",
              "• Capacitor: duas linhas paralelas, com uma curva se for capacitor eletrolítico (polarizado)",
              "• Indutor (bobina): uma série de semicírculos ou espiras desenhadas",
              "• Fonte de tensão CC: símbolo com traço longo (+) e traço curto (−)",
              "• Disjuntor: um interruptor com uma marcação diagonal de \"X\" ou um pequeno retângulo cruzado",
              "• Contator e relé: um retângulo (bobina) e pares de linhas paralelas (contatos), que se abrem ou fecham",
              "• Motor: um círculo com a letra M dentro; gerador: círculo com G",
            ],
          },
          {
            titulo: "2.2 — Diagrama unifilar, multifilar e trifilar",
            conteudo: [
              "Um mesmo circuito pode ser representado de formas diferentes, dependendo do nível de detalhe que se quer mostrar:",
              "• Diagrama unifilar: representa todas as fases de um circuito trifásico com uma única linha, simplificando a visualização. É o mais usado em projetos de instalações e subestações, justamente porque dá uma visão geral sem poluir o desenho com repetições.",
              "• Diagrama multifilar (ou trifilar, no caso de 3 fases): mostra cada condutor (cada fase, neutro e terra) com sua própria linha. É mais detalhado e usado quando se precisa mostrar exatamente como cada fio é conectado fisicamente — por exemplo, em diagramas de comando e force de quadros elétricos.",
              "Dica de prova: se a questão mencionar \"visão geral da distribuição de energia de uma subestação\", pense em unifilar. Se mencionar \"ligação física, fio a fio, de um motor\", pense em multifilar/trifilar.",
            ],
          },
          {
            titulo: "2.3 — Esquemas de acionamento e comando",
            conteudo: [
              "Os diagramas de comando elétrico (também chamados de diagramas de força e comando) descrevem como um motor ou equipamento é ligado, desligado e protegido.",
              "Componentes típicos de um esquema de comando:",
              "• Botoeira (botão pulsador): aciona manualmente um circuito — geralmente \"liga\" (NA — normalmente aberto) e \"desliga\" (NF — normalmente fechado)",
              "• Contator: uma \"chave\" eletromagnética que liga/desliga o circuito de força a partir de um sinal de comando de baixa potência",
              "• Relé térmico: protege o motor contra sobrecarga, monitorando a corrente e desarmando o circuito se ela ficar alta por tempo prolongado",
              "• Sinalizadores luminosos: indicam visualmente o estado do sistema (ligado, desligado, em falha) — cores padronizadas (vermelho geralmente indica alarme/parada, verde indica funcionamento normal)",
              "Em provas, é comum pedir para identificar, num diagrama de comando real, qual elemento é o quê — então a prática de reconhecer esses símbolos vale muito.",
            ],
          },
          {
            titulo: "2.4 — O que é corrente alternada (CA)",
            conteudo: [
              "Diferente da corrente contínua (CC), que mantém sempre o mesmo sentido e valor, a corrente alternada varia ao longo do tempo seguindo uma forma de onda — na grande maioria dos sistemas de energia, essa forma é senoidal.",
              "A tensão alternada senoidal é descrita matematicamente por:",
            ],
            equacoes: [
              { latex: "v(t) = V_{m} \\sin(\\omega t + \\varphi)", legenda: "Vm = tensão de pico, ω = frequência angular, φ = ângulo de fase" },
              { latex: "\\omega = 2\\pi f", legenda: "relação entre frequência angular (rad/s) e frequência (Hz)" },
            ],
            conteudo2: [
              "No Brasil, a frequência da rede é de 60 Hz — ou seja, a tensão completa 60 ciclos por segundo. Em parte da Europa e outros países, é 50 Hz.",
            ],
            dicas: [
              { gatilho: "ver a forma de onda senoidal", titulo: "Tensão senoidal", tipo: "senoide-fase",
                explicacao: "A curva azul (V) mostra como a tensão sobe e desce ciclicamente. Em circuitos puramente resistivos, a corrente (vermelha) acompanha exatamente o mesmo formato, sem atraso." },
            ],
          },
          {
            titulo: "2.5 — Valor de pico e valor eficaz (RMS)",
            conteudo: [
              "O valor de pico (Vm) é o valor máximo que a onda atinge. Mas na prática, quando falamos da \"tensão da rede\" (127V, 220V, 380V), estamos falando do valor eficaz — também chamado de RMS (Root Mean Square).",
              "O valor eficaz é o valor de uma tensão/corrente contínua equivalente que produziria o mesmo efeito de potência (mesmo aquecimento num resistor) que a onda alternada real.",
            ],
            equacoes: [
              { latex: "V_{rms} = \\dfrac{V_m}{\\sqrt{2}} \\approx 0{,}707 \\, V_m" },
            ],
            conteudo2: [
              "Exemplo de prova: uma tensão de pico de 311V corresponde a Vrms = 311/√2 ≈ 220V — exatamente a tensão de fase usual no Brasil. Esse cálculo (311V de pico ⇄ 220V eficaz) é extremamente recorrente em provas.",
            ],
          },
          {
            titulo: "2.6 — Defasagem: indutores atrasam a corrente",
            conteudo: [
              "Em circuitos puramente resistivos, tensão e corrente estão em fase (sobem e descem juntas). Mas quando há indutância no circuito (como em motores e transformadores), a corrente fica atrasada em relação à tensão.",
              "Esse comportamento é descrito pela reatância indutiva:",
            ],
            equacoes: [
              { latex: "X_L = \\omega L = 2\\pi f L", legenda: "XL em Ohms, L = indutância em Henry (H)" },
            ],
            conteudo2: [
              "Quanto maior a indutância ou a frequência, maior a oposição à variação da corrente — e maior o atraso de fase. No caso ideal de um indutor puro, esse atraso é de 90°.",
            ],
            dicas: [
              { gatilho: "ver o atraso da corrente", titulo: "Corrente atrasada (carga indutiva)", tipo: "atraso-indutivo",
                explicacao: "A corrente (vermelha) atinge seu pico depois da tensão (azul) — esse atraso é típico de motores, transformadores e qualquer carga com bobinas." },
            ],
          },
          {
            titulo: "2.7 — Defasagem: capacitores avançam a corrente",
            conteudo: [
              "O comportamento oposto ocorre em circuitos capacitivos: a corrente fica adiantada em relação à tensão. A oposição oferecida por um capacitor à corrente alternada é a reatância capacitiva:",
            ],
            equacoes: [
              { latex: "X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi f C}", legenda: "XC em Ohms, C = capacitância em Farad (F)" },
            ],
            conteudo2: [
              "Note que XC é inversamente proporcional à frequência — diferente de XL, que é diretamente proporcional. Essa relação inversa é frequentemente cobrada em forma de questão conceitual (\"o que acontece com a reatância capacitiva se a frequência dobrar?\" — resposta: ela cai à metade).",
            ],
            dicas: [
              { gatilho: "ver o avanço da corrente", titulo: "Corrente adiantada (carga capacitiva)", tipo: "avanco-capacitivo",
                explicacao: "A corrente (vermelha) atinge seu pico antes da tensão (azul) — efeito típico de bancos de capacitores e cargas capacitivas." },
            ],
          },
          {
            titulo: "2.8 — Potência ativa, reativa e aparente",
            conteudo: [
              "Em circuitos de corrente alternada com cargas reativas (indutivas ou capacitivas), surgem três tipos de potência:",
              "• Potência ativa (P): a potência que realmente realiza trabalho útil (gira motores, gera luz, aquece resistências). Medida em Watts (W).",
              "• Potência reativa (Q): associada à energia armazenada e devolvida pelos campos elétrico/magnético de capacitores e indutores — não realiza trabalho útil, mas é necessária para o funcionamento de motores e transformadores. Medida em Volt-Ampère-Reativo (VAr).",
              "• Potência aparente (S): a potência total \"vista\" pela rede, resultado da combinação vetorial de P e Q. Medida em Volt-Ampère (VA).",
            ],
            equacoes: [
              { latex: "P = V \\, I \\cos(\\varphi)", legenda: "potência ativa" },
              { latex: "Q = V \\, I \\sin(\\varphi)", legenda: "potência reativa" },
              { latex: "S = V \\, I", legenda: "potência aparente" },
            ],
          },
          {
            titulo: "2.9 — O triângulo de potências",
            conteudo: [
              "As três potências se relacionam geometricamente como um triângulo retângulo, onde P e Q são os catetos e S é a hipotenusa:",
            ],
            equacoes: [
              { latex: "S^2 = P^2 + Q^2", legenda: "Teorema de Pitágoras aplicado às potências" },
              { latex: "S = \\sqrt{P^2 + Q^2}" },
            ],
            dicas: [
              { gatilho: "ver o triângulo de potências", titulo: "Triângulo de potências", tipo: "triangulo-potencias",
                explicacao: "P (potência ativa) e Q (reativa) são os catetos; S (aparente) é a hipotenusa. O ângulo entre P e S é o mesmo ângulo de defasagem (φ) entre tensão e corrente." },
            ],
          },
          {
            titulo: "2.10 — Fator de potência",
            conteudo: [
              "O fator de potência (FP) é a relação entre a potência ativa e a potência aparente — indica o quão \"eficientemente\" a energia fornecida está sendo convertida em trabalho útil.",
            ],
            equacoes: [
              { latex: "FP = \\cos(\\varphi) = \\dfrac{P}{S}" },
            ],
            conteudo2: [
              "FP = 1 (cargas puramente resistivas, como chuveiros e lâmpadas incandescentes): toda a energia fornecida é convertida em trabalho útil.",
              "FP < 1 (motores, transformadores — cargas indutivas): parte da energia fica \"circulando\" como potência reativa, sem realizar trabalho, mas ainda exigindo capacidade dos condutores e equipamentos.",
              "No Brasil, as concessionárias de energia cobram penalidades de empresas com FP abaixo de 0,92 — por isso a correção de fator de potência é tão relevante na indústria.",
            ],
          },
          {
            titulo: "2.11 — Correção do fator de potência",
            conteudo: [
              "Como a maioria das cargas industriais (motores) é indutiva, a forma mais comum de corrigir o fator de potência é instalar um banco de capacitores em paralelo com a carga — os capacitores fornecem a potência reativa localmente, reduzindo a quantidade que precisa vir da rede.",
              "A potência reativa do banco de capacitores necessária para elevar o FP de um valor atual para um valor desejado é:",
            ],
            equacoes: [
              { latex: "Q_c = P \\times \\left[ \\tan(\\varphi_{atual}) - \\tan(\\varphi_{desejado}) \\right]" },
            ],
            conteudo2: [
              "Esse é exatamente o cálculo que o módulo industrial do Voltis já automatiza pra você na aba de Ferramentas — vale revisitar aquela calculadora depois de entender a fórmula por trás dela.",
            ],
          },
          {
            titulo: "2.12 — Sistemas trifásicos: por que três fases?",
            conteudo: [
              "A energia elétrica é gerada, transmitida e distribuída majoritariamente em sistemas trifásicos — três tensões senoidais de mesma amplitude e frequência, mas defasadas entre si em 120°.",
              "As vantagens da geração e transmissão trifásica em relação à monofásica incluem: melhor aproveitamento dos condutores (para a mesma potência, menos material condutor é necessário), potência instantânea total constante (sem as oscilações de uma única fase), e motores trifásicos mais simples e eficientes (sem necessidade de capacitor de partida, como em motores monofásicos).",
            ],
          },
          {
            titulo: "2.13 — Ligação estrela (Y)",
            conteudo: [
              "Na ligação estrela, as três fases têm uma extremidade conectada a um ponto comum (o neutro), e a outra extremidade disponível como fase.",
              "Na ligação estrela, a tensão de linha (entre duas fases) é maior que a tensão de fase (entre fase e neutro):",
            ],
            equacoes: [
              { latex: "V_L = \\sqrt{3} \\times V_F" },
            ],
            conteudo2: [
              "Exemplo prático: numa rede trifásica de 220V de fase, a tensão de linha é 220×√3 ≈ 381V — valor próximo do padrão de 380V muito comum em instalações industriais brasileiras.",
            ],
          },
          {
            titulo: "2.14 — Ligação triângulo (Δ)",
            conteudo: [
              "Na ligação triângulo, as três fases são conectadas formando um laço fechado (cada bobina/enrolamento liga o final de uma fase ao início da próxima), sem ponto neutro.",
              "Na ligação triângulo, a tensão de linha é igual à tensão de fase:",
            ],
            equacoes: [
              { latex: "V_L = V_F" },
            ],
            conteudo2: [
              "Já a corrente de linha é maior que a corrente de fase, na mesma proporção √3 — é o efeito inverso do que ocorre na estrela:",
            ],
          },
          {
            titulo: "2.15 — Resumo comparativo estrela × triângulo",
            conteudo: [
              "Esse quadro-resumo é um dos pontos mais cobrados em prova — vale memorizar:",
              "• Estrela (Y): VL = √3 × VF · IL = IF · tem neutro disponível",
              "• Triângulo (Δ): VL = VF · IL = √3 × IF · não tem neutro",
              "Aplicação prática mais comum desse conceito: a partida estrela-triângulo de motores, onde o motor liga primeiro em estrela (menor corrente de partida) e depois comuta para triângulo (operação nominal) — você já viu essa simulação interativa no Módulo 1.",
            ],
            dicas: [
              { gatilho: "comparar as correntes", titulo: "Corrente: estrela vs triângulo", tipo: "comparacao-corrente",
                explicacao: "Para a mesma potência do motor, a corrente de linha em triângulo é 3× maior que em estrela — por isso a partida estrela-triângulo reduz o impacto na rede." },
            ],
          },
        ],
      },
      {
        slug: "maquinas-e-protecao",
        titulo: "Módulo 3 — Máquinas Elétricas e Proteção",
        descricao: "Eletromagnetismo, transformadores, motores, máquinas síncronas/CC, proteção de baixa tensão e comandos.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "Conteúdo em produção",
            conteudo: [
              "Este módulo está sendo escrito e vai cobrir, conforme o edital verticalizado:",
              "• Noções básicas de eletromagnetismo",
              "• Transformadores, máquinas síncronas, máquinas de corrente contínua, motores de indução",
              "• Dispositivos de proteção de baixa tensão",
              "• Acionamentos e comando de motores elétricos",
              "• Segurança e higiene do trabalho, EPI e EPC com ênfase em eletricidade",
              "• Interpretação e análise de projetos elétricos",
            ],
          },
        ],
      },
      {
        slug: "medidas-e-instalacoes",
        titulo: "Módulo 4 — Medidas Elétricas e Instalações",
        descricao: "Instrumentos de medição, retificadores/baterias/no-breaks, instalações de baixa e média tensão.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "Conteúdo em produção",
            conteudo: [
              "Este módulo está sendo escrito e vai cobrir, conforme o edital verticalizado:",
              "• Fundamentos de medidas elétricas",
              "• Instrumentos de medição e testes: corrente, tensão, potência e isolação",
              "• Retificadores, baterias e no-breaks",
              "• Instalações elétricas de baixa tensão",
              "• Redes aéreas e instalações elétricas de 1,0 kV a 17,5 kV",
            ],
          },
        ],
      },
      {
        slug: "normas-e-automacao",
        titulo: "Módulo 5 — Normas, Manutenção e Automação",
        descricao: "NBR 5410, aterramento, SPDA, NR10, manutenção elétrica, eletrônica e automação industrial.",
        bloco: "Bloco III",
        paginas: [
          {
            titulo: "Conteúdo em produção",
            conteudo: [
              "Este módulo está sendo escrito e vai cobrir, conforme o edital verticalizado:",
              "• Grandezas elétricas e magnéticas, Sistema Internacional de Unidades",
              "• Aterramento de equipamentos e SPDA",
              "• NBR 5410",
              "• Conceitos básicos de manutenção elétrica",
              "• Eletrônica analógica e digital, diagramas lógicos",
              "• Automação industrial",
              "• Materiais e ferramentas de instalações elétricas",
              "• NR10 — Segurança em Eletricidade",
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

// O banco de questões foi movido para src/lib/questoes-data.ts (com filtros
// por área, assunto, banca, ano e dificuldade).
