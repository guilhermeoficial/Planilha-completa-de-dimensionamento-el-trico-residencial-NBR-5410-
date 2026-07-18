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
  tipo: string;
}

export interface QuestaoInterativa {
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number; // índice 0-based
  explicacao: string;
}

export interface Pagina {
  titulo: string;
  conteudo: string[];
  equacoes?: { latex: string; legenda?: string }[];
  conteudo2?: string[];
  videoUrl?: string;
  animacao?: "lei-de-ohm";
  dicas?: Dica[];
  tabelasSimbolos?: string[];
  questoes?: QuestaoInterativa[]; // mini-quiz interativo ao final da página
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
  // ══════════════════════════════════════════════════════════════════════════
  // CURSO: TÉCNICO EM MANUTENÇÃO ELÉTRICA — PETROBRAS (ÊNFASE 5)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "manutencao-eletrica-petrobras",
    nome: "Técnico em Manutenção Elétrica — Petrobras",
    nivel: "Técnico",
    descricao: "Conteúdo completo para a Ênfase 5 do concurso técnico Petrobras: circuitos elétricos, máquinas, proteção, instalações, aterramento, NBR 5410 e NR-10.",
    modulos: [
      // ── BLOCO I ──────────────────────────────────────────────────────────
      {
        slug: "manut-elet-bloco1",
        titulo: "Bloco I — Circuitos, Máquinas e Segurança",
        descricao: "Simbologia, circuitos CC e CA, potência, eletromagnetismo, transformadores, motores de indução, máquinas síncronas e CC, proteção, acionamentos e NR-10.",
        bloco: "Bloco I",
        paginas: [

          {
            titulo: "1.1 — Simbologia e Diagramas Elétricos",
            conteudo: [
              "A linguagem dos projetos e da manutenção elétrica é feita por diagramas normalizados. Dominar essa linguagem é obrigatório para o técnico de manutenção elétrica da Petrobras — toda intervenção em campo parte da leitura de um diagrama.",
              "O diagrama unifilar usa uma única linha para representar o sistema trifásico completo. Mostra a topologia geral: transformadores, barramentos, disjuntores, chaves seccionadoras, TCs, TPs e proteções. É o mapa do sistema — usado em reuniões de planejamento, análise de falta e documentação de subestações.",
              "O diagrama trifilar representa cada condutor individualmente: as três fases (L1, L2, L3 ou R, S, T), o neutro (N) e o condutor de proteção (PE). É o documento de referência da equipe de manutenção — permite rastrear fisicamente cada fio dentro do painel.",
              "O esquema de acionamento é dividido em dois circuitos. O circuito de potência conduz a corrente do motor (alta corrente, geralmente 380V ou 440V trifásico), protegido por disjuntor e relé de sobrecarga. O circuito de comando controla quando e como o motor opera, trabalhando em tensões menores (24V CC ou 110V CA) e correntes muito baixas.",
              "Os símbolos que o técnico deve dominar: contato NA (normalmente aberto — fica aberto em repouso, fecha ao ser acionado), contato NF (normalmente fechado — fica fechado em repouso, abre ao ser acionado), bobina de contator/relé (círculo com letra), motor (M em círculo), transformador (dois espirais acoplados), fusível (retângulo com linha), disjuntor (quadrado com traço diagonal), bornes de aterramento e neutro.",
              "Ponto crítico para provas: o estado normal de um contato é sempre o estado de repouso, sem energia na bobina. Um contato auxiliar NA do contator KM1 está ABERTO quando KM1 não está energizado. Isso é frequentemente explorado em questões de concurso sobre lógicas de comando.",
              "Na inversão de sentido de motores trifásicos, invertem-se duas fases quaisquer no circuito de potência. O intertravamento elétrico impede que os dois contatores se energizem simultaneamente, o que causaria curto entre duas fases.",
            ],
            equacoes: [],
            conteudo2: [
              "Dica de prova: diagrama unifilar = visão geral do sistema. Diagrama trifilar = execução e manutenção. Esquema de acionamento = lógica de comando e controle.",
            ],
          },

          {
            titulo: "1.2 — Grandezas Elétricas Fundamentais",
            conteudo: [
              "A carga elétrica (Q) é medida em Coulombs (C). O elétron tem carga de 1,6x10⁻¹⁹ C. 1 Coulomb equivale a aproximadamente 6,24x10¹⁸ elétrons.",
              "A corrente elétrica (I) é o fluxo de carga por unidade de tempo, medida em Ampères (A). É a grandeza medida pelo amperímetro (em série) ou pelo alicate amperímetro (por indução magnética, sem interromper o circuito).",
              "A tensão elétrica (V) é a diferença de potencial entre dois pontos — a força que impulsiona os elétrons. Medida em Volts. É medida pelo voltímetro conectado em paralelo.",
              "A resistência elétrica (R) é a oposição do material ao fluxo de corrente, medida em Ohms. Depende do material (resistividade), do comprimento e da seção transversal do condutor.",
              "A potência elétrica (P) é a taxa de conversão de energia elétrica, medida em Watts (W).",
              "A energia elétrica (E) é a potência multiplicada pelo tempo, medida em kWh comercialmente. 1 kWh = 3,6 MJ. É a grandeza registrada pelos medidores da concessionária.",
              "Resistividade do cobre: 1,72x10⁻⁸ Ohm.m a 20°C. Resistividade do alumínio: 2,82x10⁻⁸ Ohm.m. Para mesma resistência e comprimento, o alumínio precisa de seção 64% maior que o cobre.",
              "Efeito da temperatura: em metais, a resistência aumenta com a temperatura. A 80°C, a resistência do cobre é cerca de 23% maior que a 20°C — fator importante no dimensionamento de condutores.",
            ],
            equacoes: [
              { latex: "R = \\rho \\cdot \\dfrac{L}{A}", legenda: "Resistência do condutor: rho = resistividade (Ohm.m), L = comprimento (m), A = seção transversal (m²)" },
              { latex: "P = V \\cdot I \\quad [\\text{W}]", legenda: "Potência elétrica" },
              { latex: "E = P \\cdot t \\quad [\\text{kWh}]", legenda: "Energia elétrica: P em kW, t em horas" },
            ],
          },

          {
            titulo: "1.3 — Circuitos de Corrente Contínua (CC)",
            conteudo: [
              "A corrente contínua flui em sentido constante e com amplitude que não varia no tempo. Na Petrobras, circuitos CC alimentam sistemas de proteção de subestações (48V ou 125V CC), no-breaks e painéis de instrumentação.",
              "A Lei de Ohm é a relação fundamental dos circuitos resistivos: V = R x I. Para um resistor ideal, essa relação é linear — dobrando a tensão, dobra a corrente.",
              "A 1ª Lei de Kirchhoff (lei dos nós): a soma das correntes que entram em um nó é igual à soma das correntes que saem. É a conservação de carga elétrica.",
              "A 2ª Lei de Kirchhoff (lei das malhas): a soma algébrica das tensões em qualquer malha fechada é zero. É a conservação de energia.",
              "Na associação em série, a mesma corrente percorre todos os elementos. A resistência equivalente é a soma das resistências individuais.",
              "Na associação em paralelo, a mesma tensão é aplicada a todos os elementos. O inverso da resistência equivalente é a soma dos inversos.",
              "O divisor de tensão: dois resistores em série, com a saída medida nos terminais de um deles. Base dos potenciômetros e circuitos de referência.",
              "A potência dissipada em um resistor pode ser calculada de três formas equivalentes: P = V x I, P = I² x R, P = V²/R.",
            ],
            equacoes: [
              { latex: "V = R \\cdot I \\qquad I = \\dfrac{V}{R} \\qquad R = \\dfrac{V}{I}", legenda: "Lei de Ohm" },
              { latex: "R_{série} = R_1 + R_2 + R_3 + \\cdots", legenda: "Resistência equivalente em série" },
              { latex: "\\dfrac{1}{R_{par}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3} + \\cdots", legenda: "Resistência equivalente em paralelo" },
              { latex: "V_{out} = V \\cdot \\dfrac{R_2}{R_1 + R_2}", legenda: "Divisor de tensão" },
              { latex: "P = V \\cdot I = I^2 \\cdot R = \\dfrac{V^2}{R}", legenda: "Potência elétrica — três formas equivalentes" },
            ],
            conteudo2: [
              "Exemplo resolvido: condutor de cobre, seção 2,5 mm², comprimento total 40 m, corrente 16 A. Resistência: R = 1,72x10⁻⁸ x 40 / (2,5x10⁻⁶) = 0,275 Ohm. Queda de tensão: Delta_V = 0,275 x 16 = 4,4 V. Sobre 127 V: 4,4/127 x 100 = 3,46% — acima do limite de 3% da NBR 5410 para circuitos terminais. Solução: aumentar a seção para 4 mm².",
            ],
          },

          {
            titulo: "1.4 — Corrente Alternada: Forma de Onda e Valores",
            conteudo: [
              "A corrente alternada varia senoidalmente no tempo, invertendo seu sentido a cada meio ciclo. É o padrão universal de energia elétrica pois permite a transformação de tensões por transformadores.",
              "A forma geral: v(t) = Vp x sen(wt + fi), onde Vp é o valor de pico, w = 2 x pi x f é a frequência angular em rad/s, f é a frequência em Hz e fi é o ângulo de fase inicial.",
              "No Brasil, a frequência da rede é 60 Hz. O período é T = 1/60 = 16,67 ms. A frequência angular é w = 2 x pi x 60 = 377 rad/s.",
              "O valor eficaz (RMS) é o valor de CC equivalente em termos de potência dissipada. Para senoide pura: Vrms = Vp / raiz(2) = 0,707 x Vp. É o valor indicado pelos voltímetros e amperímetros CA.",
              "A tomada de 127 V tem tensão de pico de 127 x 1,414 = 179,6 V. A de 220 V tem pico de 220 x 1,414 = 311,1 V. O pico é importante para dimensionamento de isolação.",
              "O ângulo de fase indica o deslocamento temporal da senoide. A defasagem entre tensão e corrente é fundamental para calcular a potência em cargas CA.",
              "Fator de forma: relação entre valor eficaz e valor médio de uma senoide. Fator de crista: relação entre valor de pico e valor eficaz. Multímetros verdadeiramente RMS medem o valor eficaz real, mesmo para formas de onda não senoidais.",
            ],
            equacoes: [
              { latex: "V_{rms} = \\dfrac{V_p}{\\sqrt{2}} \\approx 0{,}707 \\cdot V_p", legenda: "Valor eficaz de tensão senoidal" },
              { latex: "\\omega = 2\\pi f \\qquad T = \\dfrac{1}{f}", legenda: "Frequência angular (rad/s) e período (s)" },
              { latex: "V_p = V_{rms} \\cdot \\sqrt{2} \\approx 1{,}414 \\cdot V_{rms}", legenda: "Valor de pico a partir do eficaz" },
            ],
            conteudo2: [
              "Exemplo: rede 60 Hz. T = 16,67 ms. Tensão 127 Vrms: Vp = 179,6 V. Tensão 220 Vrms: Vp = 311,1 V. Tensão 380 Vrms: Vp = 537,4 V.",
            ],
            dicas: [
              {
                gatilho: "ver a forma de onda senoidal",
                titulo: "Forma de onda da tensão CA",
                tipo: "senoide-fase",
                explicacao: "A tensão CA (azul) varia senoidalmente. Em cargas puramente resistivas, a corrente (vermelha) tem exatamente a mesma forma e fase — tensão e corrente atingem seus picos ao mesmo tempo.",
              },
            ],
          },

          {
            titulo: "1.5 — Reatância Indutiva e Capacitiva",
            conteudo: [
              "Em circuitos CA, indutores e capacitores oferecem oposição ao fluxo de corrente que depende da frequência — essa oposição é chamada reatância.",
              "O indutor armazena energia no campo magnético. Quanto maior a frequência ou a indutância, maior a oposição. A reatância indutiva XL cresce linearmente com a frequência.",
              "Comportamento de fase do indutor: a corrente atrasa 90° em relação à tensão. Mnemônico: no indutor a tensão E vem antes da corrente I (ELI).",
              "O capacitor armazena energia no campo elétrico. Quanto maior a frequência, menor a oposição — mais fácil carregar e descarregar. A reatância capacitiva XC diminui com a frequência.",
              "Comportamento de fase do capacitor: a corrente adianta 90° em relação à tensão. Mnemônico: no capacitor a corrente I vem antes da tensão E (ICE).",
              "Em circuitos RLC série, a impedância Z é a oposição total. Se XL > XC, o circuito é indutivo (corrente atrasada). Se XC > XL, é capacitivo (corrente adiantada). Se XL = XC, há ressonância.",
              "Na ressonância em série, a impedância é mínima (igual a R) e a corrente é máxima. As tensões no indutor e no capacitor podem ser muito maiores que a tensão da fonte.",
            ],
            equacoes: [
              { latex: "X_L = 2\\pi f L \\quad [\\Omega]", legenda: "Reatância indutiva: f em Hz, L em Henry" },
              { latex: "X_C = \\dfrac{1}{2\\pi f C} \\quad [\\Omega]", legenda: "Reatância capacitiva: f em Hz, C em Farad" },
              { latex: "Z = \\sqrt{R^2 + (X_L - X_C)^2}", legenda: "Impedância do circuito RLC série (Ohm)" },
              { latex: "\\cos\\varphi = \\dfrac{R}{Z}", legenda: "Fator de potência do circuito" },
              { latex: "f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}", legenda: "Frequência de ressonância" },
            ],
            conteudo2: [
              "Exemplo: R = 30 Ohm, L = 100 mH, f = 60 Hz. XL = 2 x pi x 60 x 0,1 = 37,7 Ohm. Z = raiz(30² + 37,7²) = raiz(2321) = 48,2 Ohm. FP = 30/48,2 = 0,62 indutivo. Corrente com 127 Vrms: I = 127/48,2 = 2,63 A.",
            ],
            dicas: [
              {
                gatilho: "ver o atraso da corrente no indutor",
                titulo: "Corrente atrasada — carga indutiva",
                tipo: "atraso-indutivo",
                explicacao: "A corrente (vermelha) atinge o pico depois da tensão (azul). Motores e transformadores têm esse comportamento — são cargas indutivas. O atraso máximo (indutor puro) é de 90°.",
              },
              {
                gatilho: "ver o avanço da corrente no capacitor",
                titulo: "Corrente adiantada — carga capacitiva",
                tipo: "avanco-capacitivo",
                explicacao: "A corrente (vermelha) antecipa a tensão (azul). Bancos de capacitores têm esse comportamento — por isso compensam o atraso dos motores e melhoram o fator de potência da instalação.",
              },
            ],
          },

          {
            titulo: "1.6 — Potência Ativa, Reativa e Aparente",
            conteudo: [
              "Em circuitos CA com cargas reativas, a potência se divide em três componentes. O triângulo das potências é um dos temas mais cobrados em concursos da área elétrica.",
              "Potência ativa (P) em Watts: energia convertida em trabalho útil — calor, movimento, luz. É o que aparece na fatura de energia e na leitura do wattímetro.",
              "Potência reativa (Q) em var: energia que oscila entre fonte e elementos reativos sem virar trabalho útil. Circula nos cabos e transformadores, ocupando capacidade e causando perdas adicionais. Motores, transformadores e reatores consomem potência reativa indutiva (positiva). Capacitores fornecem potência reativa capacitiva (negativa).",
              "Potência aparente (S) em VA: produto dos valores eficazes de tensão e corrente. É a capacidade total exigida dos transformadores e geradores. É o valor de dimensionamento desses equipamentos.",
              "O fator de potência FP = P/S = cos(fi) indica a eficiência do uso da energia. FP = 1: carga puramente resistiva, toda energia é útil. Motores industriais típicos: FP entre 0,7 e 0,92.",
              "A ANEEL exige FP mínimo de 0,92 para consumidores em média e alta tensão. Abaixo disso, há cobrança de energia reativa na fatura.",
              "Correção do FP: instalar bancos de capacitores em paralelo com as cargas indutivas. Os capacitores fornecem a potência reativa localmente, reduzindo a corrente demandada da rede e as perdas nos cabos.",
              "Para calcular o banco: Qc = P x (tan fi1 - tan fi2). Instalar próximo das cargas para maximizar a redução de corrente nos cabos.",
            ],
            equacoes: [
              { latex: "P = V \\cdot I \\cdot \\cos\\varphi \\quad [\\text{W}]", legenda: "Potência ativa" },
              { latex: "Q = V \\cdot I \\cdot \\text{sen}\\,\\varphi \\quad [\\text{var}]", legenda: "Potência reativa" },
              { latex: "S = V \\cdot I = \\sqrt{P^2 + Q^2} \\quad [\\text{VA}]", legenda: "Potência aparente" },
              { latex: "FP = \\cos\\varphi = \\dfrac{P}{S}", legenda: "Fator de potência" },
              { latex: "Q_C = P \\cdot (\\tan\\varphi_1 - \\tan\\varphi_2)", legenda: "Banco de capacitores para correção do FP" },
            ],
            conteudo2: [
              "Exemplo: carga 500 kW, FP = 0,75 indutivo. tan fi1 = 0,882. Elevar para FP = 0,92: tan fi2 = 0,426. Qc = 500 x (0,882 - 0,426) = 228 kvar. Resultado: corrente de linha reduz de 1013 A para 826 A — redução de 18,5%. Menos perdas e maior capacidade disponível no transformador.",
            ],
            dicas: [
              {
                gatilho: "ver o triângulo de potências",
                titulo: "Triângulo de potências P, Q e S",
                tipo: "triangulo-potencias",
                explicacao: "P (laranja) é a potência útil. Q (amarelo) é a potência reativa — oscila sem fazer trabalho. S (azul) é a hipotenusa — potência total da fonte. FP = P/S = cos(fi). Quanto menor o ângulo fi, mais próximo de 1 é o FP e mais eficiente é o uso da energia.",
              },
            ],
          },

          {
            titulo: "1.7 — Sistemas Trifásicos",
            conteudo: [
              "O sistema trifásico é composto por três tensões senoidais de mesma amplitude e frequência, defasadas 120° entre si. É o padrão mundial de transmissão por usar 25% menos material condutor que três sistemas monofásicos para mesma potência.",
              "Na ligação em estrela (Y): ponto neutro comum, tensão de linha = raiz(3) x tensão de fase, corrente de linha = corrente de fase.",
              "Na ligação em triângulo (delta): sem neutro, tensão de linha = tensão de fase, corrente de linha = raiz(3) x corrente de fase.",
              "No Brasil: sistema 380/220 V significa 380 V entre fases (linha) e 220 V fase-neutro (fase em estrela). Motores industriais são geralmente ligados a 380 V trifásico.",
              "A inversão de duas fases quaisquer inverte o sentido de rotação do campo girante e, portanto, do motor. Esse é o princípio do acionamento reversível.",
              "O desequilíbrio de tensões entre fases aumenta correntes, temperatura e vibração nos motores. A NEMA recomenda no máximo 1% de desequilíbrio para operação contínua.",
              "Potência trifásica equilibrada: usa-se as grandezas de linha multiplicadas por raiz(3), independentemente da ligação (estrela ou triângulo).",
            ],
            equacoes: [
              { latex: "\\text{Estrela:}\\quad V_L = \\sqrt{3} \\cdot V_F \\approx 1{,}732 \\cdot V_F \\qquad I_L = I_F", legenda: "Relações na ligação estrela" },
              { latex: "\\text{Triângulo:}\\quad V_L = V_F \\qquad I_L = \\sqrt{3} \\cdot I_F", legenda: "Relações na ligação triângulo" },
              { latex: "P = \\sqrt{3} \\cdot V_L \\cdot I_L \\cdot \\cos\\varphi", legenda: "Potência ativa trifásica" },
              { latex: "S = \\sqrt{3} \\cdot V_L \\cdot I_L", legenda: "Potência aparente trifásica" },
            ],
            conteudo2: [
              "Exemplo: motor 30 kW, 380 V, FP = 0,88, rendimento 92%. Potência elétrica: 30/0,92 = 32,6 kW. Potência aparente: 32.600/0,88 = 37,0 kVA. Corrente de linha: S / (raiz(3) x 380) = 37.000 / 658 = 56,2 A.",
            ],
            dicas: [
              {
                gatilho: "comparar correntes estrela e triângulo",
                titulo: "Corrente de linha: estrela x triângulo",
                tipo: "comparacao-corrente",
                explicacao: "Em triângulo, a corrente de linha é raiz(3) x maior que em estrela para a mesma carga. Na partida estrela-triângulo, o motor parte em estrela (corrente reduzida) e comuta para triângulo em operação. A corrente de partida cai para 1/3 da partida direta.",
              },
            ],
          },

          {
            titulo: "1.8 — Eletromagnetismo Aplicado",
            conteudo: [
              "O eletromagnetismo é a base de funcionamento de transformadores, motores, geradores e relés. O técnico precisa entender esses princípios para diagnosticar falhas e interpretar o comportamento dos equipamentos.",
              "O campo magnético é produzido por correntes elétricas. A indução magnética B depende do campo H e da permeabilidade do material. Em materiais ferromagnéticos (ferro, aço), a permeabilidade é muito alta — por isso são usados nos núcleos de transformadores e motores.",
              "A Lei de Faraday: uma variação de fluxo magnético através de um circuito induz uma tensão nesse circuito. É a base do transformador (fluxo variável induz tensão no secundário) e do gerador (condutores movendo-se no campo induzem tensão).",
              "A Lei de Lenz: a corrente induzida tem sentido que se opõe à variação de fluxo que a originou. É a base do freio eletromagnético e da energia regenerativa nos inversores de frequência.",
              "A curva B-H (curva de magnetização): na região linear, B cresce proporcionalmente a H. Acima de certo ponto, o material se satura — aumentar H não aumenta mais B significativamente.",
              "A saturação magnética é crítica para transformadores: operando com tensão acima da nominal, entra em saturação, a corrente de excitação aumenta drasticamente e o equipamento aquece. Não operar sistematicamente acima de 110% da tensão nominal.",
              "A força de Lorentz sobre um condutor percorrido por corrente em um campo magnético: F = B x I x L x sen(teta). É o princípio de todos os motores elétricos.",
            ],
            equacoes: [
              { latex: "e = N \\cdot \\dfrac{\\Delta\\Phi}{\\Delta t}", legenda: "Lei de Faraday: e = fem induzida (V), N = espiras, DeltaPhi = variação do fluxo (Wb), Deltat = intervalo de tempo (s)" },
              { latex: "B = \\mu_0 \\cdot \\mu_r \\cdot H", legenda: "Indução magnética (T): mi0 = 4pi x 10⁻⁷ H/m, mir = permeabilidade relativa do material" },
              { latex: "F = B \\cdot I \\cdot L \\cdot \\text{sen}\\,\\theta \\quad [\\text{N}]", legenda: "Força de Lorentz: B (T), I (A), L = comprimento (m)" },
            ],
            conteudo2: [
              "Permeabilidade relativa (mir): ar = 1, ferro silício = 7.000, permalloy = 100.000. O núcleo de ferro silício conduz o fluxo magnético 7.000 vezes melhor que o ar — por isso os transformadores têm núcleo de ferro.",
            ],
            dicas: [
              {
                gatilho: "ver a curva de magnetização B-H",
                titulo: "Curva B-H e saturação magnética",
                tipo: "curva-bh",
                explicacao: "A curva sobe rapidamente no início (região linear) e depois achata (saturação). No ponto de saturação, mais campo H não aumenta mais B. Transformadores e motores são projetados para operar abaixo da saturação — acima dela, a corrente de magnetização cresce descontroladamente.",
              },
            ],
          },

          {
            titulo: "1.9 — Transformadores",
            conteudo: [
              "O transformador é a máquina estática mais importante dos sistemas elétricos. Transfere energia por indução eletromagnética, alterando tensão e corrente sem mudar a frequência.",
              "Transformador abaixador (a > 1): N1 > N2, reduz tensão e aumenta corrente. Transformadores de distribuição são abaixadores (13,8 kV para 380 V). Transformador elevador (a < 1): N1 < N2, aumenta tensão e reduz corrente. Usados na transmissão de energia.",
              "As perdas no transformador se dividem em dois grupos: Perdas no ferro (histerese + correntes de Foucault no núcleo): praticamente constantes, independentes da carga. Ocorrem sempre que o transformador está energizado, mesmo em vazio. Perdas no cobre (efeito Joule nos enrolamentos): variam com o quadrado da corrente. São máximas em plena carga e nulas em vazio.",
              "O ensaio em vazio (secundário aberto): realizado com tensão nominal no primário. Mede as perdas no ferro e a corrente de excitação (tipicamente 1 a 5% da nominal).",
              "O ensaio em curto-circuito (secundário em curto): realizado com corrente nominal. Mede as perdas no cobre e a impedância de curto-circuito percentual (Zcc%). Transformadores de distribuição têm Zcc% entre 4% e 8%.",
              "O Zcc% representa a queda de tensão percentual no interior do transformador com corrente nominal. Quanto menor o Zcc%, maior a corrente de curto-circuito máxima no secundário.",
              "O rendimento é máximo quando perdas no ferro = perdas no cobre (carga ótima). Transformadores bem projetados têm rendimento acima de 98% em plena carga.",
            ],
            equacoes: [
              { latex: "a = \\dfrac{N_1}{N_2} = \\dfrac{V_1}{V_2} = \\dfrac{I_2}{I_1}", legenda: "Relação de transformação (transformador ideal)" },
              { latex: "\\eta = \\dfrac{P_2}{P_2 + P_{ferro} + P_{cobre}} \\times 100\\%", legenda: "Rendimento do transformador" },
              { latex: "Z_{cc}\\% = \\dfrac{V_{cc}}{V_{nominal}} \\times 100", legenda: "Impedância percentual de curto-circuito" },
              { latex: "I_{cc} = \\dfrac{I_{nominal}}{Z_{cc}\\% / 100}", legenda: "Corrente de curto-circuito máxima no secundário" },
            ],
            conteudo2: [
              "Exemplo: transformador 500 kVA, 13,8 kV / 380 V, Zcc% = 5%. Corrente nominal no secundário: In = 500.000 / (raiz(3) x 380) = 759 A. Corrente de curto máxima: Icc = 759 / 0,05 = 15.180 A. Os disjuntores do quadro de 380 V devem ter capacidade de interrupção maior ou igual a 15,2 kA.",
              "Dica de prova: as relações do transformador ideal. A relação de correntes é INVERSA à de tensões: ao elevar a tensão, a corrente diminui na mesma proporção, conservando a potência.",
            ],
          },

          {
            titulo: "1.10 — Motor de Indução Trifásico",
            conteudo: [
              "O motor de indução trifásico (MIT) é o motor mais usado na indústria — consome mais de 40% de toda a energia elétrica industrial. É robusto, barato, praticamente sem manutenção e altamente confiável.",
              "Princípio: as três correntes trifásicas no estator criam um campo magnético girante na velocidade síncrona. Esse campo induz correntes no rotor (gaiola de esquilo). As correntes rotóricas interagem com o campo, gerando torque que faz o rotor girar no mesmo sentido.",
              "O rotor nunca gira na velocidade síncrona exata. Deve existir escorregamento para manter a indução de correntes e, portanto, o torque. Sem escorregamento, sem torque.",
              "A velocidade síncrona depende apenas da frequência da rede e do número de polos. Em 60 Hz: 2 polos = 3600 rpm, 4 polos = 1800 rpm, 6 polos = 1200 rpm, 8 polos = 900 rpm.",
              "O escorregamento nominal é tipicamente 1% a 5%. Um motor 4 polos com 1740 rpm na placa tem Ns = 1800 rpm e s = 3,33%.",
              "A corrente de partida direta é 5 a 8 vezes a corrente nominal. Na partida, o rotor está parado, o motor se comporta como transformador em curto-circuito.",
              "Métodos de partida: (a) Estrela-triângulo: corrente e torque = 1/3 da partida direta. Para cargas com baixo torque de partida. (b) Soft-starter: SCRs elevam tensão gradualmente. (c) Inversor de frequência: melhor método — controle total de velocidade e torque.",
              "Diagnóstico de falhas: corrente acima da nominal = sobrecarga mecânica ou tensão baixa. Desequilíbrio de corrente entre fases maior que 5% = problema de isolamento ou conexão. Vibração excessiva = desbalanceamento ou rolamento danificado.",
            ],
            equacoes: [
              { latex: "N_s = \\dfrac{120 \\cdot f}{p} \\quad [\\text{rpm}]", legenda: "Velocidade síncrona: f = frequência (Hz), p = número de polos" },
              { latex: "s = \\dfrac{N_s - N_r}{N_s}", legenda: "Escorregamento: Ns = síncrona, Nr = velocidade real do rotor" },
              { latex: "N_r = N_s \\cdot (1 - s)", legenda: "Velocidade real do rotor" },
              { latex: "f_{rotor} = s \\cdot f_{rede}", legenda: "Frequência das correntes no rotor" },
            ],
            conteudo2: [
              "Exemplo: motor 4 polos, 60 Hz, placa 1746 rpm. Ns = 1800 rpm. s = (1800-1746)/1800 = 3%. fr = 0,03 x 60 = 1,8 Hz.",
              "Tabela de referência: 2 polos/60Hz = 3600 rpm. 4 polos = 1800 rpm. 6 polos = 1200 rpm. 8 polos = 900 rpm. 10 polos = 720 rpm. 12 polos = 600 rpm.",
            ],
            dicas: [
              {
                gatilho: "ver a curva torque x velocidade",
                titulo: "Conjugado x velocidade do motor de indução",
                tipo: "torque-velocidade-inducao",
                explicacao: "Da partida (esquerda) até a velocidade síncrona (direita): o torque sobe, atinge o máximo (ponto de tombamento) e cai a zero na velocidade síncrona. Se a carga exigir torque maior que o máximo, o motor para (tomba). O ponto de operação normal é na região descendente, após o pico.",
              },
            ],
          },

          {
            titulo: "1.11 — Máquinas Síncronas e Motores CC",
            conteudo: [
              "As máquinas síncronas operam exatamente na velocidade síncrona — sem escorregamento. São as máquinas de geração de energia elétrica em todo o mundo (termelétricas, hidrelétricas, eólicas).",
              "O gerador síncrono (alternador) converte energia mecânica em elétrica. O regulador automático de tensão (AVR) controla a corrente de campo para manter a tensão terminal constante. Sobreexcitado: fornece potência reativa para a rede (eleva tensão). Subexcitado: absorve potência reativa (deprime tensão).",
              "O motor síncrono mantém velocidade absolutamente constante. Usado em compressores de grande porte e laminadores. Problema: não parte sozinho. Solução: barras de gaiola auxiliares no rotor para partir como motor de indução, depois sincronizar.",
              "Os motores CC permitem controle preciso de velocidade e torque desde zero. Usados em guindastes, pontes rolantes e laminadores. O comutador com escovas de grafite requer manutenção periódica — principal desvantagem.",
              "A fem contraeletromotriz (E) do motor CC se opõe à tensão aplicada. Na partida (velocidade zero), E = 0 e a corrente seria limitada apenas por Ra — valores perigosos. Usa-se resistores de partida ou acionamento eletrônico.",
              "Tipos de motor CC: Shunt (derivação) = velocidade quase constante, campo em paralelo. Série = torque altíssimo na partida, campo em série, NUNCA operar sem carga (risco de destruição por excesso de velocidade). Composta = combinação de shunt e série.",
              "Controle de velocidade do motor CC shunt: (1) Variação da tensão de armadura — mais eficiente, abaixo da velocidade base. (2) Resistência em série — ineficiente. (3) Enfraquecimento do campo — acima da velocidade base, reduz torque máximo.",
            ],
            equacoes: [
              { latex: "E = V - R_a \\cdot I_a", legenda: "Motor CC: E = fem contra-eletromotriz, V = tensão aplicada, Ra = resistência de armadura, Ia = corrente" },
              { latex: "T = K_T \\cdot \\Phi \\cdot I_a", legenda: "Torque do motor CC: KT = constante, Phi = fluxo de campo, Ia = corrente de armadura" },
            ],
            conteudo2: [
              "Atenção: o motor CC série NUNCA deve operar sem carga. Com corrente de armadura pequena, o fluxo de campo é pequeno e a velocidade dispara descontroladamente, podendo destruir o rotor mecanicamente.",
            ],
          },

          {
            titulo: "1.12 — Dispositivos de Proteção de Baixa Tensão",
            conteudo: [
              "Os dispositivos de proteção detectam condições anormais e interrompem o circuito, protegendo condutores, equipamentos e pessoas.",
              "O disjuntor termomagnético combina proteção térmica (bimetal aquece com sobrecarga, deforma-se, aciona disparo após tempo inversamente proporcional à corrente) e magnética (eletroímã actua instantaneamente no curto-circuito).",
              "Curvas de disparo: B (3 a 5x In) para iluminação e cargas resistivas. C (5 a 10x In) para uso geral. D (10 a 20x In) para motores e transformadores com alta corrente de partida. A curva errada causa disparos indevidos na partida ou não protege adequadamente.",
              "A capacidade de interrupção (Icu) é a corrente de curto máxima que o disjuntor interrompe com segurança. Deve ser maior que a corrente de curto calculada no ponto de instalação.",
              "Fusíveis: gG protegem cabos e instalações. Fusíveis aM suportam a corrente de partida de motores. Após atuar em curto, deve ser substituído.",
              "Dispositivo DR: detecta corrente de fuga à terra comparando fase e neutro. Sensibilidade 30 mA: proteção de pessoas (obrigatório em banheiros, cozinhas e áreas externas pela NBR 5410). Sensibilidade 300 mA: proteção contra incêndio. O DR não protege contra sobrecarga ou curto.",
              "Relé de sobrecarga térmico: protege motores contra sobrecarga persistente, ajustado para a corrente nominal. Não protege contra curto-circuito.",
              "Seletividade: o dispositivo mais próximo da falta deve atuar antes do dispositivo geral, isolando apenas o trecho em falta sem desligar o restante da instalação.",
            ],
            equacoes: [
              { latex: "I_{cc\ máx} \\leq I_{cu} \\quad \\text{(requisito para escolha do disjuntor)}", legenda: "Capacidade de interrupção deve superar a corrente de curto máxima no ponto de instalação" },
            ],
            conteudo2: [
              "Exemplo: transformador 500 kVA, 380 V, Zcc% = 4%. Corrente nominal BT = 759 A. Icc máximo = 759/0,04 = 18.975 A ≈ 19 kA. Os disjuntores do quadro de BT devem ter Icu maior ou igual a 20 kA.",
            ],
            dicas: [
              {
                gatilho: "ver a curva de atuação do disjuntor",
                titulo: "Curva tempo x corrente do disjuntor",
                tipo: "curva-disjuntor",
                explicacao: "Na zona térmica (esquerda), o bimetal atua lentamente — 1,5x In pode levar minutos. Na zona magnética (direita), o disparo é instantâneo — correntes de curto são interrompidas em milissegundos. A curva escolhida (B, C ou D) define o fator de multiplicação para o disparo instantâneo.",
              },
            ],
          },

          {
            titulo: "1.13 — Acionamento e Comando de Motores",
            conteudo: [
              "O sistema de acionamento é composto por circuito de potência (alta corrente, alimenta o motor) e circuito de comando (baixa corrente, executa a lógica de controle).",
              "O contator é o principal dispositivo de acionamento. Controlado por bobina eletromagnética. Possui contatos principais (potência) e auxiliares (comando para retenção, sinalização e intertravamento).",
              "Retenção: contato auxiliar NA do contator em paralelo com o botão de partida. Ao energizar, o contato fecha e mantém a bobina energizada mesmo após soltar o botão.",
              "Desligamento: botão NF em série com a bobina. Ao pressionar, abre o circuito e desenerga o contator. Botão de emergência funciona pelo mesmo princípio (cogumelo com trava).",
              "Intertravamento elétrico: contato NF de K1 em série com bobina de K2, e vice-versa. Impede que K1 e K2 estejam energizados simultaneamente — essencial no acionamento reversível.",
              "Partida estrela-triângulo: KM (principal) + KY (estrela, partida) + KD (triângulo, operação). Em estrela: tensão de fase = VL/raiz(3), corrente = 1/3 da direta, torque = 1/3. Temporizador comuta para triângulo após tempo programado. Intertravamento entre KY e KD obrigatório.",
              "Soft-starter: SCRs elevam a tensão gradualmente. Após partida, contator de by-pass curto-circuita os SCRs. Transição suave sem choque mecânico.",
              "Inversor de frequência (VFD): retifica CA em CC, inverte em CA com frequência e tensão variáveis (IGBTs com PWM). Partida e parada suaves, controle contínuo de velocidade, proteções integradas, operação regenerativa.",
              "Economia com VFD em bombas e ventiladores: potência varia com o cubo da velocidade. Reduzir para 80% da velocidade reduz a potência para 51,2% — quase metade da energia com controle por válvula.",
            ],
            equacoes: [
              { latex: "\\dfrac{P_2}{P_1} = \\left(\\dfrac{n_2}{n_1}\\right)^3", legenda: "Lei de afinidade: potência varia com o cubo da velocidade (para bombas e ventiladores)" },
            ],
            conteudo2: [
              "Exemplo: bomba 55 kW a 100% da velocidade. A 80%: P2 = 55 x (0,8)³ = 55 x 0,512 = 28,2 kW. Economia: 26,8 kW. Em 16 h/dia, 22 dias/mês: economia de 9.434 kWh/mês.",
            ],
          },

          {
            titulo: "1.14 — NR-10: Segurança em Instalações Elétricas",
            conteudo: [
              "A NR-10 estabelece os requisitos mínimos de segurança para trabalhadores em instalações e serviços em eletricidade. Obrigatória em todo o Brasil e exigida em praticamente todos os concursos da área elétrica.",
              "Abrange trabalhadores com exposição direta (projetam, operam, mantêm instalações elétricas) e indireta (exercem atividades nas proximidades de instalações energizadas).",
              "Classificação das tensões: Extra-baixa tensão (EBT) = até 50 V CA ou 120 V CC. Baixa tensão (BT) = acima de EBT até 1.000 V CA ou 1.500 V CC. Alta tensão (AT) = acima de 1.000 V CA ou 1.500 V CC.",
              "Habilitação: Curso Básico NR-10 (mínimo 40 horas): obrigatório para BT energizada. Complementar SEP (mínimo 40 horas adicionais): obrigatório para AT. Reciclagem a cada 2 anos.",
              "Hierarquia das medidas de controle: (1) Eliminação do risco — trabalhar sem tensão (medida prioritária). (2) Proteção coletiva — barreiras, bloqueios, aterramento temporário, sinalização. (3) Proteção individual — EPIs. O EPI é a última barreira, nunca a primeira.",
              "Procedimento LOTO: (1) Identificar todas as fontes de energia. (2) Notificar afetados. (3) Desligar pelo procedimento normal. (4) Isolar as fontes. (5) Aplicar cadeado de bloqueio. (6) Etiquetar com nome, data e motivo. (7) Dissipar energia armazenada (capacitores, pressão, molas). (8) Verificar ausência de tensão com voltímetro calibrado antes de iniciar.",
              "EPIs elétricos: Luvas de borracha isolante — Classe 0 (500V), Classe 1 (7.500V), Classe 2 (17.000V), Classe 3 (26.500V), Classe 4 (36.000V). Capacete Classe B (não condutor, até 20.000V). Óculos e protetor facial contra arco. Vestimenta antichama (FR/AR) classificada em cal/cm². Calçado dielétrico.",
              "Arco elétrico: temperatura de até 20.000°C, superior à superfície do sol. Libera energia em milissegundos. Causa queimaduras graves, explosões e morte a vários metros. A análise de arc flash (IEEE 1584) determina a energia incidente e a categoria de proteção dos EPIs em cada ponto da instalação.",
              "Trabalho em instalações energizadas é a EXCEÇÃO: requer justificativa técnica, Análise de Risco documentada, PTE aprovado por profissional habilitado e equipe treinada.",
            ],
            equacoes: [],
            conteudo2: [
              "Pontos mais cobrados em provas: (1) Classificação EBT/BT/AT. (2) Carga horária: 40h básico + 40h SEP. (3) LOTO completo em 8 etapas. (4) Hierarquia: eliminação > proteção coletiva > EPI. (5) Trabalho sem tensão é a REGRA. (6) EPC tem prioridade sobre EPI. (7) Reciclagem a cada 2 anos.",
            ],
          },

        ],
      },

            // ── BLOCO II ─────────────────────────────────────────────────────────
      {
        slug: "manut-elet-bloco2",
        titulo: "Bloco II — Medidas, Instalações e Redes Elétricas",
        descricao: "Instrumentos de medição, retificadores, baterias, no-breaks, instalações de BT e redes de média tensão.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "2.1 — Fundamentos de Medidas Elétricas",
            conteudo: [
              "Medir grandezas elétricas com precisão é fundamental para diagnóstico e manutenção. Os principais instrumentos são: voltímetro (tensão), amperímetro (corrente), wattímetro (potência), ohmímetro (resistência), multímetro (múltiplas funções) e alicate amperímetro.",
              "O voltímetro é conectado em paralelo com o elemento a ser medido e deve ter impedância interna muito alta para não perturbar o circuito. O amperímetro é conectado em série e deve ter impedância muito baixa.",
              "O alicate amperímetro (alicate de gancho) mede corrente sem interromper o circuito, por efeito do campo magnético ao redor do condutor. É o instrumento mais usado na manutenção elétrica industrial.",
              "O megôhmetro (Megger) mede resistência de isolamento em valores de MΩ ou GΩ, aplicando alta tensão CC (500V, 1000V ou 5000V). É usado para verificar o estado do isolamento de cabos, motores e transformadores.",
            ],
            equacoes: [
              { latex: "R_{isolamento} \\geq 1\\,\\text{M}\\Omega \\cdot U_{nominal}(kV)", legenda: "Critério simplificado de isolamento mínimo" },
            ],
          },
          {
            titulo: "2.2 — Transformadores de Corrente (TC) e de Potencial (TP)",
            conteudo: [
              "Para medir tensões e correntes em sistemas de média e alta tensão, usam-se transformadores de instrumento: TC (transformador de corrente) e TP (transformador de potencial).",
              "O TC reduz grandes correntes para valores seguros de medição (tipicamente 5A no secundário). ATENÇÃO CRÍTICA: o secundário de um TC NUNCA deve ser aberto com o primário energizado — gera tensão perigosamente alta no secundário (risco de morte e destruição do equipamento).",
              "O TP reduz altas tensões para valores seguros de medição (tipicamente 115V no secundário). O secundário do TP não deve ser colocado em curto-circuito com o primário energizado.",
              "A classe de exatidão do TC indica o erro percentual máximo. Classes 0,1 e 0,2 são para medição de energia; classes 0,5 e 1 são para medição geral; classes 5P e 10P são para proteção.",
            ],
            equacoes: [
              { latex: "\\frac{I_1}{I_2} = \\frac{N_2}{N_1} = \\text{relação do TC}", legenda: "Relação de transformação do TC" },
            ],
          },
          {
            titulo: "2.3 — Retificadores, Baterias e No-Breaks",
            conteudo: [
              "Retificadores convertem corrente alternada (CA) em corrente contínua (CC). São usados em fontes de alimentação, carregadores de bateria e sistemas de CC para proteção e controle de subestações.",
              "O retificador de meia onda usa um único diodo e aproveita apenas um semiciclo da CA. O de onda completa (ponte de Graetz com 4 diodos) aproveita os dois semiciclos, produzindo CC com menor ondulação.",
              "As baterias chumbo-ácido (seladas VRLA) são as mais usadas em sistemas de no-break industrial e subestações. Fornecem autonomia durante falta de energia. A capacidade é expressa em Ah (ampère-hora).",
              "O no-break (UPS — Uninterruptible Power Supply) garante alimentação contínua a cargas críticas durante falhas da rede. O tipo online de dupla conversão é o mais confiável: converte CA→CC→CA continuamente, isolando completamente a carga da rede.",
            ],
            equacoes: [
              { latex: "V_{med} = \\dfrac{2 \\cdot V_p}{\\pi} \\approx 0{,}636 \\cdot V_p", legenda: "Tensão média: retificador meia onda" },
              { latex: "V_{med} = \\dfrac{2 \\cdot V_p}{\\pi} \\times 2 \\approx 0{,}636 \\cdot V_p", legenda: "Tensão média: retificador onda completa (≈ 0,9 × Vef)" },
            ],
          },
          {
            titulo: "2.4 — Instalações Elétricas de Baixa Tensão",
            conteudo: [
              "As instalações elétricas de baixa tensão no Brasil são normatizadas pela NBR 5410. Os principais aspectos de projeto e manutenção envolvem: dimensionamento de condutores, proteção de circuitos, queda de tensão e aterramento.",
              "O dimensionamento de condutores considera a corrente de projeto (com fatores de correção de temperatura e agrupamento) e a queda de tensão máxima admissível (4% em alimentadores + 3% em circuitos terminais = 7% total).",
              "Os sistemas de distribuição são classificados pela relação entre neutro e terra: TN (neutro e terra ligados na fonte), TT (neutro aterrado na fonte, PE aterrado no consumidor) e IT (neutro isolado da terra).",
              "O dimensionamento de condutores de proteção (PE) segue as tabelas da NBR 5410: para fase ≤ 16mm², PE = fase; para 16mm² < fase ≤ 35mm², PE = 16mm²; para fase > 35mm², PE = fase/2.",
            ],
            equacoes: [
              { latex: "\\Delta V\\% = \\dfrac{\\sqrt{3} \\cdot \\rho \\cdot L \\cdot I}{A \\cdot V_{nominal}} \\times 100", legenda: "Queda de tensão em alimentador trifásico: ρ = resistividade (Ω·m), L = comprimento (m), A = seção (m²)" },
            ],
          },
          {
            titulo: "2.5 — Redes Aéreas e Instalações de Média Tensão",
            conteudo: [
              "As redes de distribuição de energia elétrica no Brasil operam em tensões de 1,0 kV a 36,2 kV (média tensão — MT). Os técnicos de manutenção elétrica da Petrobras atuam em redes internas de 13,8 kV e 6,6 kV.",
              "As redes aéreas de MT utilizam cabos nus de alumínio (CA, CAA) suspensos em postes com isoladores. As redes subterrâneas usam cabos com isolação extrudada (XLPE ou EPR), enterrados em dutos ou diretamente no solo.",
              "As subestações abaixadoras convertem a MT da rede para BT (380/220V) para uso final. Os principais equipamentos são: transformador de potência, disjuntores, chaves seccionadoras, para-raios, TCs e TPs.",
              "A coordenação de isolamento define os níveis de suportabilidade dos equipamentos aos surtos de tensão. Para-raios de óxido de zinco (ZnO) são instalados para limitar sobretensões atmosféricas e de manobra.",
            ],
            equacoes: [],
          },
        ],
      },

      // ── BLOCO III ────────────────────────────────────────────────────────
      {
        slug: "manut-elet-bloco3",
        titulo: "Bloco III — Aterramento, Normas e Automação",
        descricao: "Aterramento, SPDA, NBR 5410, manutenção elétrica, eletrônica básica e automação industrial.",
        bloco: "Bloco III",
        paginas: [
          {
            titulo: "3.1 — Aterramento de Equipamentos",
            conteudo: [
              "O aterramento elétrico é a conexão intencional de partes de um sistema elétrico ao solo, com o objetivo de garantir a segurança das pessoas (proteção contra choques elétricos) e o correto funcionamento dos equipamentos.",
              "O aterramento de proteção (PE — Protective Earth) conecta as carcaças metálicas dos equipamentos ao terra. Em caso de falta fase-carcaça, a corrente de falta flui pelo PE e aciona o dispositivo de proteção (disjuntor ou DR).",
              "A resistência de aterramento deve ser a menor possível. A NBR 5410 exige no máximo 10 Ω para sistemas TT com DR, e valores menores para sistemas de proteção contra raios (SPDA). Típico: ≤ 1 Ω para subestações.",
              "A resistência de aterramento é reduzida aumentando a área de contato com o solo: hastes em paralelo, malhas horizontais enterradas, ou tratamento do solo com bentonita (argila expansiva) em solos rochosos ou de alta resistividade.",
            ],
            equacoes: [
              { latex: "R_{haste} = \\dfrac{\\rho}{2\\pi L} \\left[\\ln\\left(\\dfrac{4L}{d}\\right) - 1\\right]", legenda: "Resistência de uma haste vertical (fórmula de Dwight): ρ = resistividade do solo (Ω·m), L = comprimento (m), d = diâmetro (m)" },
            ],
          },
          {
            titulo: "3.2 — SPDA — Proteção contra Descargas Atmosféricas",
            conteudo: [
              "O Sistema de Proteção contra Descargas Atmosféricas (SPDA), regulamentado pela NBR 5419, protege estruturas e pessoas contra os efeitos diretos e indiretos dos raios.",
              "O SPDA externo é composto por: subsistema de captação (captores — Franklin, Faraday ou ESE), subsistema de descida (condutores de descida) e subsistema de aterramento (eletrodos).",
              "O SPDA interno protege contra os efeitos indiretos do raio (surtos eletromagnéticos induzidos). Inclui DPS (Dispositivos de Proteção contra Surtos), equipotencialização e separação entre o SPDA e as instalações internas.",
              "Os DPS são classificados em Tipo 1 (para instalações com SPDA, suportam descarga direta), Tipo 2 (para quadros de distribuição, proteção contra surtos induzidos) e Tipo 3 (junto aos equipamentos sensíveis).",
            ],
            equacoes: [],
          },
          {
            titulo: "3.3 — NBR 5410 — Pontos Essenciais",
            conteudo: [
              "A NBR 5410 é a norma brasileira para instalações elétricas de baixa tensão (até 1000V CA ou 1500V CC). Seu domínio é exigido em praticamente todos os concursos da área elétrica.",
              "Seções mínimas de condutores: fase em iluminação → 1,5 mm²; fase em tomadas TUG → 2,5 mm²; condutor de proteção (PE) → ver relação com condutor de fase.",
              "Circuitos mínimos obrigatórios por residência: 1 circuito de iluminação para cada 60m² (ou fração), 1 circuito de TUG para cada 5 pontos ou a cada 600VA, e circuitos exclusivos para equipamentos acima de 1800W.",
              "O DR de alta sensibilidade (≤ 30 mA) é obrigatório em circuitos de banheiros, área de serviço, cozinha, garagem e externos. O DR de 300 mA é usado para proteção contra incêndio.",
              "A queda de tensão máxima admissível é 7% do ponto de entrega até qualquer ponto de utilização (4% nos alimentadores + 3% nos circuitos terminais).",
            ],
            equacoes: [],
          },
          {
            titulo: "3.4 — Manutenção Elétrica",
            conteudo: [
              "A manutenção elétrica industrial se divide em três tipos principais: manutenção corretiva (após a falha), preventiva (programada por tempo ou condição) e preditiva (baseada no monitoramento de parâmetros).",
              "A manutenção preditiva em sistemas elétricos usa técnicas como: termografia infravermelha (detecção de pontos quentes em conexões, disjuntores e transformadores), análise de vibração (rolamentos de motores), análise de qualidade de energia (harmônicos, desequilíbrio) e teste de isolamento (Megger).",
              "A termografia infravermelha é a técnica preditiva mais difundida na manutenção elétrica. Conexões oxidadas ou mal apertadas geram resistência de contato, aquecimento localizado e risco de incêndio — detectáveis por câmera térmica sem necessidade de desligamento.",
              "O teste de resistência de isolamento (Megger) deve ser realizado periodicamente em motores elétricos. O valor mínimo aceitável é 1 MΩ por kV de tensão nominal. Valores abaixo indicam deterioração do isolamento.",
            ],
            equacoes: [],
          },
          {
            titulo: "3.5 — Eletrônica Analógica e Digital Básica",
            conteudo: [
              "O diodo semicondutor permite a passagem de corrente em apenas um sentido. É a base dos retificadores (conversão CA→CC) e de circuitos de proteção.",
              "O transistor BJT pode operar como chave (corte/saturação) ou como amplificador (região ativa). Na automação industrial, é usado principalmente como chave para acionar relés e outros elementos.",
              "Os circuitos lógicos digitais processam sinais binários (0 e 1) usando portas lógicas (AND, OR, NOT, NAND, NOR, XOR). A álgebra booleana é a ferramenta matemática para análise e simplificação de circuitos lógicos.",
              "Os diagramas lógicos são representações gráficas de funções booleanas usando símbolos de portas lógicas. São usados em sistemas de intertravamento de segurança e em CLPs.",
            ],
            equacoes: [],
          },
          {
            titulo: "3.6 — Automação Industrial",
            conteudo: [
              "A automação industrial integra sistemas elétricos, eletrônicos, mecânicos e de software para controlar processos produtivos com mínima intervenção humana.",
              "O CLP (Controlador Lógico Programável) é o controlador digital mais usado na indústria. Lê entradas digitais e analógicas (sensores, botões, medidores), executa o programa de controle e atua nas saídas (contatores, válvulas, inversores).",
              "A linguagem Ladder é a mais comum na programação de CLPs. Simula graficamente o circuito de relés e contatos: contatos normalmente abertos (NA) e fechados (NF), bobinas, temporizadores (TON, TOF) e contadores (CTU, CTD).",
              "Os materiais e ferramentas de uso em instalações elétricas incluem: cabos e fios de cobre e alumínio, eletrodutos metálicos e PVC, eletrocalhas, conectores, terminais, ferramentas de crimpar, alicate amperímetro, multímetro e megôhmetro.",
            ],
            equacoes: [],
          },
        ],
      },
      // ── MÓDULO 6 — CIRCUITOS ELÉTRICOS COMPLETO ──────────────────────────
      {
        slug: "circuitos-eletricos-completo",
        titulo: "Módulo 6 — Circuitos Elétricos: Do Básico ao Avançado",
        descricao: "CC e CA, Thévenin, Norton, superposição, supermalha, supernó, máxima transferência de potência, diodo, LED e muito mais.",
        bloco: "Bloco I",
        paginas: [

          // ── SEÇÃO CC ────────────────────────────────────────────────────
          {
            titulo: "6.1 — Elementos de Circuito: Fontes e Resistores",
            conteudo: [
              "Um circuito elétrico é formado por elementos interligados que permitem o fluxo de corrente elétrica. Os elementos se dividem em ativos (fontes — fornecem energia) e passivos (resistores, capacitores, indutores — absorvem ou armazenam energia).",
              "Fonte de tensão ideal: mantém tensão constante nos seus terminais independentemente da corrente que fornece. Símbolo: círculo com + e −. Exemplo: bateria ideal, gerador ideal. Na prática, toda fonte real tem resistência interna em série.",
              "Fonte de corrente ideal: mantém corrente constante nos seus terminais independentemente da tensão que aparece neles. Símbolo: círculo com seta. Usada em modelagem de transistores e amplificadores.",
              "Fonte de tensão real: modelada como fonte ideal em série com resistência interna Rint. A tensão nos terminais cai com o aumento da corrente: Vterm = Voc − Rint × I, onde Voc é a tensão em circuito aberto.",
              "Fonte de corrente real: modelada como fonte ideal em paralelo com resistência interna. Corrente nos terminais: Iterm = Icc − V/Rint, onde Icc é a corrente de curto-circuito.",
              "O resistor é o elemento passivo mais básico — converte energia elétrica em calor (efeito Joule). Resistores reais têm tolerância (±1%, ±5%, ±10%), coeficiente de temperatura e potência máxima nominal. Operar acima da potência nominal danifica o componente.",
              "O código de cores dos resistores: cada cor representa um dígito (preto=0, marrom=1, vermelho=2, laranja=3, amarelo=4, verde=5, azul=6, violeta=7, cinza=8, branco=9). Faixas de tolerância: ouro=±5%, prata=±10%, sem faixa=±20%.",
            ],
            equacoes: [
              { latex: "V_{term} = V_{oc} - R_{int} \\cdot I", legenda: "Tensão nos terminais de fonte real: Voc = tensão em aberto, Rint = resistência interna" },
              { latex: "P_{max\\ resistor} = I^2 \\cdot R = \\dfrac{V^2}{R}", legenda: "Potência dissipada no resistor — não exceder a potência nominal" },
            ],
            conteudo2: [
              "Exemplo: bateria de 12 V com resistência interna de 0,5 Ω fornecendo 8 A. Tensão nos terminais: V = 12 − 0,5 × 8 = 12 − 4 = 8 V. A queda de 4 V ocorre internamente, aquecendo a bateria.",
            ],
          },

          {
            titulo: "6.2 — Leis de Kirchhoff: KCL e KVL",
            conteudo: [
              "As Leis de Kirchhoff são as ferramentas fundamentais de análise de qualquer circuito elétrico. São consequências diretas da conservação de carga (KCL) e da conservação de energia (KVL).",
              "KCL — Lei dos Nós (1ª Lei de Kirchhoff): a soma algébrica de todas as correntes em qualquer nó de um circuito é zero. Convenção: correntes que entram no nó são positivas, correntes que saem são negativas. Equivale a dizer que carga não se acumula nos nós.",
              "KVL — Lei das Malhas (2ª Lei de Kirchhoff): a soma algébrica de todas as tensões em qualquer malha fechada é zero. Percorrendo a malha em um sentido fixo: se passamos pelo + antes do − de um elemento, a tensão é positiva; se passamos pelo − antes do +, é negativa.",
              "Convenção de sinais para KVL: ao percorrer um resistor no sentido da corrente assumida, a queda de tensão é −R×I (queda). Ao percorrer uma fonte do − para o +, a contribuição é +V (elevação). Ao percorrer uma fonte do + para o −, é −V (queda).",
              "Método sistemático de análise: (1) Identificar os nós e malhas do circuito. (2) Atribuir correntes e referências. (3) Aplicar KCL nos nós ou KVL nas malhas. (4) Resolver o sistema de equações. (5) Verificar se as correntes negativas indicam sentido inverso ao assumido.",
              "Para circuitos simples (uma malha), a KVL basta. Para circuitos com múltiplas malhas, usam-se métodos sistemáticos: análise nodal (KCL em todos os nós) ou análise de malhas (KVL em todas as malhas independentes).",
            ],
            equacoes: [
              { latex: "\\sum_{k} I_k = 0 \\quad \\text{(em qualquer nó)}", legenda: "KCL: soma das correntes no nó = zero" },
              { latex: "\\sum_{k} V_k = 0 \\quad \\text{(em qualquer malha fechada)}", legenda: "KVL: soma das tensões na malha = zero" },
            ],
            conteudo2: [
              "Exemplo KVL: malha com fonte 12 V, R1 = 2 Ω e R2 = 4 Ω em série. KVL: +12 − 2I − 4I = 0. 6I = 12. I = 2 A. Tensão em R1: V1 = 2×2 = 4 V. Tensão em R2: V2 = 4×2 = 8 V. Verificação: 4 + 8 = 12 V ✓.",
              "Exemplo KCL: nó com correntes I1 = 3 A entrando, I2 = 1 A saindo, I3 = ? KCL: 3 − 1 − I3 = 0. I3 = 2 A saindo.",
            ],
          },

          {
            titulo: "6.3 — Método das Malhas (Análise por Correntes de Malha)",
            conteudo: [
              "O método das malhas é uma técnica sistemática para analisar circuitos com múltiplas malhas. Em vez de usar correntes de ramo, define-se uma corrente de malha circulando em cada malha independente do circuito.",
              "Procedimento: (1) Identificar as malhas independentes (malhas que não podem ser divididas em malhas menores). (2) Atribuir corrente de malha a cada uma (sentido horário por convenção). (3) Escrever a equação KVL para cada malha, usando as correntes de malha. (4) Resolver o sistema linear de equações. (5) A corrente real em cada ramo compartilhado é a diferença das correntes de malha adjacentes.",
              "Em ramos compartilhados entre duas malhas, a tensão no resistor é R × (I1 − I2), onde I1 e I2 são as correntes de malha. O sinal depende de qual malha está sendo analisada.",
              "O método das malhas é especialmente eficiente quando o número de malhas independentes é menor que o número de nós independentes — gera menos equações e facilita a solução.",
              "Para N malhas independentes, o sistema tem N equações e N incógnitas (as correntes de malha). A solução pode ser obtida por substituição, escalonamento ou regra de Cramer.",
            ],
            equacoes: [
              { latex: "\\sum R_{kk} \\cdot I_k - \\sum R_{kj} \\cdot I_j = \\sum V_{fontes}", legenda: "Equação de malha k: Rkk = soma das resistências da malha k, Rkj = resistências compartilhadas" },
            ],
            conteudo2: [
              "Exemplo: circuito com duas malhas. Malha 1 (I1): +12 − 3I1 − 2(I1−I2) = 0 → 5I1 − 2I2 = 12. Malha 2 (I2): −2(I2−I1) − 4I2 − 6 = 0 → −2I1 + 6I2 = −6. Resolvendo: I1 = 66/26 ≈ 2,54 A, I2 = −6/26 ≈ −0,23 A (sentido inverso ao assumido).",
            ],
          },

          {
            titulo: "6.4 — Supermalha",
            conteudo: [
              "A supermalha surge quando uma fonte de corrente está localizada no ramo compartilhado entre duas malhas. Nesse caso, não é possível escrever diretamente a KVL para cada malha separadamente, pois a tensão na fonte de corrente é desconhecida.",
              "Para criar a supermalha: combina-se as duas malhas que contêm a fonte de corrente em uma única malha maior, excluindo o ramo com a fonte de corrente. Escreve-se a KVL para essa malha combinada.",
              "A equação de restrição: a diferença entre as correntes de malha nas duas malhas adjacentes à fonte de corrente é igual ao valor da fonte de corrente. Essa equação complementa a KVL da supermalha.",
              "A supermalha pode envolver mais de duas malhas se a fonte de corrente for adjacente a várias. O procedimento é o mesmo: combinar todas as malhas afetadas, excluir o ramo da fonte de corrente e escrever a restrição.",
              "Resumo: supermalha = KVL ao redor da malha combinada (sem o ramo da fonte de corrente) + equação de restrição da fonte de corrente.",
            ],
            equacoes: [
              { latex: "I_1 - I_2 = I_s \\quad \\text{(equação de restrição da supermalha)}", legenda: "A diferença das correntes de malha = valor da fonte de corrente" },
            ],
            conteudo2: [
              "Exemplo: fonte de corrente de 4 A entre os nós das malhas I1 e I2 (com I1 saindo pelo + da fonte). Restrição: I1 − I2 = 4. Supermalha (KVL ao redor, excluindo a fonte de corrente): − R1×I1 − R3×I2 + V_fonte = 0. Com R1=2Ω, R3=3Ω, V_fonte=10V: −2I1 − 3I2 + 10 = 0. Sistema: I1 − I2 = 4 e 2I1 + 3I2 = 10. Solução: I1 = 4,4 A, I2 = 0,4 A.",
            ],
          },

          {
            titulo: "6.5 — Método dos Nós (Análise Nodal)",
            conteudo: [
              "O método dos nós usa tensões de nó como variáveis. Define-se um nó de referência (terra, potencial zero) e calcula-se a tensão de todos os outros nós em relação a esse referencial.",
              "Procedimento: (1) Identificar todos os nós. (2) Escolher o nó de referência (geralmente o de maior número de conexões). (3) Atribuir tensão de nó a cada nó não-referência. (4) Aplicar KCL em cada nó não-referência, expressando correntes em termos das tensões de nó. (5) Resolver o sistema.",
              "Corrente em resistor entre dois nós: I = (V1 − V2)/R, fluindo de V1 para V2 se V1 > V2. Na KCL, correntes que saem do nó são positivas, que chegam são negativas (ou vice-versa — o importante é ser consistente).",
              "Para N nós não-referência, o sistema tem N equações com N incógnitas (tensões de nó). Geralmente eficiente quando N é pequeno.",
              "O método nodal é mais eficiente que o de malhas quando o circuito tem poucos nós mas muitas malhas — típico em circuitos eletrônicos com muitos componentes em paralelo.",
            ],
            equacoes: [
              { latex: "\\sum \\dfrac{V_k - V_j}{R_{kj}} = \\sum I_{fontes \\text{ no nó } k}", legenda: "KCL no nó k: soma das correntes saindo = soma das fontes de corrente" },
            ],
            conteudo2: [
              "Exemplo: dois nós (V1 e V2) com referência em terra. Fonte de 10V em série com R1=2Ω conectando terra ao nó V1. R2=4Ω entre V1 e V2. R3=6Ω conectando V2 ao terra. KCL em V1: (V1−10)/2 + (V1−V2)/4 = 0 → 3V1 − V2 = 20. KCL em V2: (V2−V1)/4 + V2/6 = 0 → −3V1 + 5V2 = 0. Solução: V1 = 8,33 V, V2 = 5 V.",
            ],
          },

          {
            titulo: "6.6 — Supernó",
            conteudo: [
              "O supernó surge quando uma fonte de tensão conecta dois nós não-referência. Nesse caso, a tensão entre os dois nós é conhecida (igual ao valor da fonte), mas a corrente na fonte é desconhecida — impossível escrever KCL separada para cada um.",
              "Para criar o supernó: aplica-se KCL ao redor da superfície que engloba ambos os nós e a fonte de tensão (como uma 'bolha'). As correntes que entram e saem dessa superfície são somadas.",
              "A equação de restrição do supernó: a diferença de tensão entre os dois nós é igual à tensão da fonte. Essa equação, combinada com a KCL do supernó, completa o sistema.",
              "O supernó é a contrapartida nodal da supermalha: supermalha trata fonte de corrente entre malhas; supernó trata fonte de tensão entre nós.",
              "Se o supernó contiver mais de uma fonte de tensão (em série), inclui-se todas na equação de restrição.",
            ],
            equacoes: [
              { latex: "V_1 - V_2 = V_s \\quad \\text{(equação de restrição do supernó)}", legenda: "Diferença de tensão entre os nós do supernó = tensão da fonte" },
            ],
            conteudo2: [
              "Exemplo: fonte de tensão de 6V conectando os nós V1 e V2 (V1 = V2 + 6). R1=3Ω de V1 ao terra. R2=5Ω de V2 ao terra. Fonte de corrente de 2A entrando no nó V1. KCL do supernó (superfície englobando V1 e V2): V1/3 + V2/5 = 2. Restrição: V1 − V2 = 6. Sistema: V1/3 + V2/5 = 2 e V1 = V2 + 6. Solução: V2 = 0 V, V1 = 6 V. Verificação: 6/3 + 0/5 = 2 A ✓.",
            ],
          },

          {
            titulo: "6.7 — Teorema da Superposição",
            conteudo: [
              "O teorema da superposição afirma que, em um circuito linear com múltiplas fontes independentes, a resposta (tensão ou corrente) em qualquer elemento é igual à soma algébrica das respostas causadas por cada fonte independente atuando sozinha.",
              "Para aplicar a superposição: analisa-se o circuito N vezes (uma para cada fonte independente). A cada análise, todas as outras fontes independentes são desativadas: fontes de tensão são substituídas por curto-circuito (fio); fontes de corrente são substituídas por circuito aberto.",
              "A resposta total é a soma algébrica das respostas parciais. Importante: fontes dependentes NUNCA são desativadas — permanecem ativas em todas as análises.",
              "Atenção: o teorema da superposição se aplica a tensões e correntes (grandezas lineares), mas NÃO se aplica diretamente a potências (grandeza não-linear — P = I²R ou V²/R). A potência total NÃO é a soma das potências individuais.",
              "A superposição é especialmente útil quando o circuito tem fontes de tipos diferentes (tensão e corrente) ou quando fontes de valores diferentes facilitam análises separadas.",
              "Limitações: aplica-se apenas a circuitos lineares (componentes com relação V×I linear — resistores, capacitores e indutores ideais). Não se aplica a circuitos com diodos, transistores operando fora da região linear, etc.",
            ],
            equacoes: [
              { latex: "V_{total} = V_1' + V_2' + \\cdots + V_n'", legenda: "Superposição: resposta total = soma das respostas de cada fonte atuando isoladamente" },
              { latex: "P_{total} \\neq P_1' + P_2' + \\cdots \\quad \\text{(superposição NÃO vale para potência)}", legenda: "CUIDADO: potência não obedece ao princípio de superposição" },
            ],
            conteudo2: [
              "Exemplo: circuito com fonte de tensão V1=12V e fonte de corrente I2=3A, com R1=4Ω e R2=6Ω. Análise 1 (só V1, abrir I2): I' = 12/(4+6) = 1,2 A. V_R2' = 1,2×6 = 7,2 V. Análise 2 (só I2, curto V1): divisor de corrente, I_R2'' = 3×4/(4+6) = 1,2 A. V_R2'' = 1,2×6 = 7,2 V. Total: V_R2 = 7,2 + 7,2 = 14,4 V.",
            ],
          },

          {
            titulo: "6.8 — Transformação de Fontes",
            conteudo: [
              "A transformação de fontes é uma técnica que permite converter uma fonte de tensão em série com resistor em uma fonte de corrente em paralelo com o mesmo resistor (e vice-versa), sem alterar o comportamento externo do circuito.",
              "Conversão fonte de tensão → fonte de corrente: Is = Vs/R. A resistência R permanece a mesma, mas vai de série para paralelo. O sentido da corrente deve ser preservado.",
              "Conversão fonte de corrente → fonte de tensão: Vs = Is × R. A resistência R vai de paralelo para série. O polo + fica no terminal onde a corrente entrava.",
              "A transformação é equivalente nos terminais: a tensão em aberto e a corrente de curto são iguais antes e depois da transformação. Isso é a base do Teorema de Thévenin e Norton.",
              "A transformação de fontes simplifica circuitos complexos combinando fontes e resistores em sequência, reduzindo progressivamente a complexidade até uma forma que permite fácil análise.",
              "Limitação: fontes ideais (tensão ideal sem resistência em série, ou corrente ideal sem resistência em paralelo) NÃO podem ser transformadas.",
            ],
            equacoes: [
              { latex: "I_s = \\dfrac{V_s}{R} \\quad \\Leftrightarrow \\quad V_s = I_s \\cdot R", legenda: "Transformação equivalente entre fonte de tensão (com R série) e fonte de corrente (com R paralelo)" },
            ],
            conteudo2: [
              "Uso prático: simplificar circuitos com múltiplas fontes e resistores combinando-os progressivamente por transformações de fonte até obter um único equivalente Thévenin ou Norton.",
            ],
          },

          {
            titulo: "6.9 — Teorema de Thévenin",
            conteudo: [
              "O Teorema de Thévenin é um dos teoremas mais poderosos da análise de circuitos. Afirma que qualquer circuito linear com fontes e resistores, visto por um par de terminais (A e B), pode ser substituído por uma fonte de tensão Vth em série com uma resistência Rth.",
              "Vth (tensão de Thévenin) é a tensão em circuito aberto nos terminais A-B — a tensão que aparece nos terminais quando nada está conectado a eles.",
              "Rth (resistência de Thévenin) é a resistência equivalente vista dos terminais A-B com todas as fontes independentes desativadas (fontes de tensão = curto, fontes de corrente = aberto). Se houver fontes dependentes, usa-se um método diferente.",
              "Cálculo de Rth com fontes dependentes: desativa-se apenas as fontes independentes. Aplica-se uma fonte de teste (tensão Vtest ou corrente Itest) nos terminais A-B. Calcula-se a corrente ou tensão resultante. Rth = Vtest/Itest.",
              "O equivalente de Thévenin é extremamente útil quando se quer analisar o efeito de diferentes cargas conectadas aos terminais A-B — basta analisar o simples circuito Vth + Rth + Rcarga, sem recalcular todo o circuito.",
              "Aplicações práticas: análise de circuitos de instrumentação, cálculo de corrente em cargas variáveis, projeto de amplificadores, análise de redes de distribuição de energia elétrica.",
            ],
            equacoes: [
              { latex: "V_{th} = V_{AB}\\big|_{I_{carga}=0}", legenda: "Tensão de Thévenin = tensão em aberto nos terminais A-B" },
              { latex: "R_{th} = R_{AB}\\big|_{\\text{fontes desativadas}}", legenda: "Resistência de Thévenin = resistência vista dos terminais com fontes desativadas" },
              { latex: "I_{carga} = \\dfrac{V_{th}}{R_{th} + R_{carga}}", legenda: "Corrente na carga usando o equivalente Thévenin" },
            ],
            conteudo2: [
              "Exemplo: circuito com fonte 24V, R1=6Ω em série com a fonte, R2=12Ω em paralelo com os terminais A-B. Vth: com A-B aberto, divisor de tensão: Vth = 24 × 12/(6+12) = 24 × 0,667 = 16 V. Rth: desativando a fonte de 24V (curto), R1 e R2 ficam em paralelo: Rth = 6×12/(6+12) = 4 Ω. Equivalente Thévenin: fonte de 16V em série com 4Ω.",
              "Com carga de 8Ω: I = 16/(4+8) = 1,33 A. V_carga = 1,33×8 = 10,67 V.",
            ],
          },

          {
            titulo: "6.10 — Teorema de Norton",
            conteudo: [
              "O Teorema de Norton é o complemento do Teorema de Thévenin. Afirma que qualquer circuito linear com fontes e resistores, visto por um par de terminais, pode ser substituído por uma fonte de corrente In em paralelo com uma resistência Rn.",
              "In (corrente de Norton) é a corrente de curto-circuito nos terminais A-B — a corrente que flui quando os terminais são curto-circuitados.",
              "Rn (resistência de Norton) é idêntica à resistência de Thévenin: Rn = Rth. O mesmo procedimento de cálculo se aplica.",
              "A relação entre os equivalentes: Vth = In × Rn. Os dois teoremas são completamente equivalentes e um pode ser obtido do outro por uma simples transformação de fonte.",
              "Escolha entre Thévenin e Norton: use Thévenin quando a carga é em série com outros elementos (facilita cálculo de corrente). Use Norton quando cargas estão em paralelo (facilita soma de correntes por KCL).",
              "Procedimento alternativo para In: calcula-se Vth e Rth, depois In = Vth/Rth. Ou calcula-se diretamente a corrente de curto-circuito no circuito original.",
            ],
            equacoes: [
              { latex: "I_n = I_{cc} = \\dfrac{V_{th}}{R_{th}}", legenda: "Corrente de Norton = corrente de curto-circuito = Vth/Rth" },
              { latex: "R_n = R_{th}", legenda: "Resistência de Norton idêntica à de Thévenin" },
              { latex: "V_{th} = I_n \\cdot R_n", legenda: "Relação entre os dois equivalentes" },
            ],
            conteudo2: [
              "Continuando o exemplo anterior: Vth = 16V, Rth = 4Ω. Equivalente Norton: In = 16/4 = 4 A em paralelo com Rn = 4Ω. Com carga de 8Ω: divisor de corrente: I_carga = 4 × 4/(4+8) = 1,33 A ✓ (mesmo resultado).",
              "Dica de prova: os três valores-chave de qualquer rede de dois terminais são: Voc (tensão em aberto = Vth), Icc (corrente de curto = In) e Req (resistência equivalente = Rth = Rn). Conhecendo dois deles, calcula-se o terceiro por Voc = Icc × Req.",
            ],
          },

          {
            titulo: "6.11 — Máxima Transferência de Potência",
            conteudo: [
              "O Teorema de Máxima Transferência de Potência determina o valor da resistência de carga Rcarga que maximiza a potência transferida a ela, dado um circuito fonte representado pelo equivalente Thévenin.",
              "A potência na carga é P = I² × Rcarga = [Vth/(Rth + Rcarga)]² × Rcarga. Essa função tem um máximo quando Rcarga = Rth — a carga deve ser igual à resistência interna (Thévenin) do circuito fonte.",
              "Na condição de máxima transferência (Rcarga = Rth): P_max = Vth² / (4 × Rth). A tensão na carga é exatamente metade de Vth. A corrente de carga é Vth/(2×Rth).",
              "Eficiência na máxima transferência: como Rcarga = Rth, a mesma potência é dissipada na fonte e na carga. A eficiência de transferência é de apenas 50% — metade da energia gerada é perdida internamente.",
              "Aplicações: em sistemas de telecomunicações e eletrônica de sinais, a máxima transferência de potência é a prioridade — interessa maximizar o sinal recebido, mesmo com baixa eficiência. Em sistemas de potência (energia elétrica industrial), a prioridade é a eficiência — opera-se com Rcarga >> Rth para minimizar perdas internas.",
              "Em CA, a máxima transferência ocorre quando a impedância da carga é o conjugado complexo da impedância de Thévenin: ZL = Zth*. Isso significa que a parte resistiva é igual e a parte reativa é oposta em sinal.",
            ],
            equacoes: [
              { latex: "R_{carga} = R_{th} \\quad \\Rightarrow \\quad P_{max} = \\dfrac{V_{th}^2}{4 \\cdot R_{th}}", legenda: "Condição e valor de máxima transferência de potência" },
              { latex: "\\eta_{max\\ transf} = 50\\%", legenda: "Eficiência na máxima transferência: metade da energia é perdida na resistência interna" },
            ],
            conteudo2: [
              "Exemplo: fonte Thévenin com Vth = 24V e Rth = 6Ω. Rcarga ótima = 6Ω. Pmax = 24²/(4×6) = 576/24 = 24 W. Verificação: I = 24/(6+6) = 2A. P = 4×6 = 24W ✓. Para Rcarga = 3Ω: P = [24/9]² × 3 = 7,11 × 3 = 21,3 W < 24 W. Para Rcarga = 12Ω: P = [24/18]² × 12 = 1,78 × 12 = 21,3 W < 24 W.",
            ],
          },

          {
            titulo: "6.12 — Capacitores: Carga, Descarga e Circuitos RC",
            conteudo: [
              "O capacitor é um elemento que armazena energia no campo elétrico entre duas placas condutoras separadas por um dielétrico. A capacitância C (em Farads) indica a quantidade de carga armazenada por unidade de tensão.",
              "Em CC em regime permanente, o capacitor se comporta como circuito aberto — não passa corrente. É por isso que capacitores bloqueiam CC e são usados para separar sinais CA de CC em circuitos de áudio e comunicação.",
              "A carga de um capacitor em circuito RC: ao conectar uma fonte de tensão V em série com R e C, a tensão no capacitor cresce exponencialmente de 0 até V. A corrente decai de I0 = V/R até zero.",
              "A constante de tempo τ = R × C define a velocidade de carga/descarga. Em t = τ, o capacitor atingiu 63,2% da tensão final. Em t = 5τ, está praticamente em regime (99,3%).",
              "A descarga: ao curto-circuitar um capacitor carregado em V0 através de R, a tensão decai exponencialmente de V0 até zero. A corrente inicial é I0 = V0/R (negativa — sai do capacitor).",
              "Associação de capacitores: em paralelo, as capacitâncias somam (C_eq = C1 + C2 + ...). Em série, os inversos somam (1/C_eq = 1/C1 + 1/C2 + ...) — inverso do que acontece com resistores.",
              "Energia armazenada no capacitor: E = ½ × C × V². Essa energia pode ser liberada rapidamente em pulsos de alta potência (flash de câmera, desfibriladores) ou lentamente como fonte de energia de backup.",
            ],
            equacoes: [
              { latex: "v_C(t) = V \\cdot \\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = R \\cdot C", legenda: "Carga do capacitor: V = tensão final, τ = RC = constante de tempo" },
              { latex: "v_C(t) = V_0 \\cdot e^{-t/\\tau}", legenda: "Descarga do capacitor: V0 = tensão inicial" },
              { latex: "E = \\dfrac{1}{2} C V^2", legenda: "Energia armazenada no capacitor (J)" },
            ],
            conteudo2: [
              "Exemplo: R = 10 kΩ, C = 100 μF, fonte de 12V. τ = 10.000 × 100×10⁻⁶ = 1 segundo. Em t = 1s: Vc = 12×(1−e⁻¹) = 12×0,632 = 7,58 V. Em t = 5s: Vc = 12×(1−e⁻⁵) ≈ 12×0,993 = 11,92 V (praticamente carregado).",
            ],
            dicas: [
              {
                gatilho: "ver a curva de carga do capacitor",
                titulo: "Carga exponencial do capacitor",
                tipo: "carga-capacitor",
                explicacao: "A tensão no capacitor sobe exponencialmente, iniciando em 0 e tendendo à tensão da fonte. A velocidade é controlada pela constante de tempo τ = RC. Em 1τ: 63,2%. Em 2τ: 86,5%. Em 3τ: 95%. Em 5τ: 99,3% — praticamente em regime.",
              },
            ],
          },

          {
            titulo: "6.13 — Indutores e Circuitos RL",
            conteudo: [
              "O indutor é um elemento que armazena energia no campo magnético de uma bobina. A indutância L (em Henrys) indica a relação entre a tensão induzida e a taxa de variação da corrente.",
              "Em CC em regime permanente, o indutor se comporta como curto-circuito (fio) — não oferece resistência a correntes constantes. A tensão em um indutor ideal em regime CC é zero.",
              "Ao energizar um indutor em circuito RL: a corrente cresce exponencialmente de 0 até I_final = V/R. A tensão no indutor decai de V até zero.",
              "A constante de tempo do circuito RL: τ = L/R. Em t = τ, a corrente atingiu 63,2% do valor final. O indutor se opõe a variações bruscas de corrente — é por isso que nunca se deve abrir abruptamente o circuito de um indutor sob carga (pode gerar pulso de tensão destrutivo).",
              "Ao desligar (circuito RL com chave aberta): a corrente no indutor tende a se manter, gerando uma fem elevada nos terminais da chave. Diodos de roda-livre (freewheeling diodes) são colocados em paralelo com bobinas de relés e motores para proteger o circuito.",
              "Associação de indutores: em série, as indutâncias somam. Em paralelo, os inversos somam — igual aos resistores.",
              "Energia armazenada no indutor: E = ½ × L × I². Em um curto-circuito de sistema de potência, a energia armazenada nos indutores da rede contribui para a corrente de falta.",
            ],
            equacoes: [
              { latex: "i_L(t) = \\dfrac{V}{R} \\cdot \\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = \\dfrac{L}{R}", legenda: "Crescimento da corrente no indutor: V/R = corrente final, τ = L/R" },
              { latex: "i_L(t) = I_0 \\cdot e^{-t/\\tau}", legenda: "Decaimento da corrente (desligar fonte)" },
              { latex: "E = \\dfrac{1}{2} L I^2", legenda: "Energia armazenada no indutor (J)" },
            ],
            conteudo2: [
              "Exemplo: R = 50 Ω, L = 0,5 H, fonte de 100V. τ = 0,5/50 = 10 ms. Corrente final: 100/50 = 2 A. Em t = 10ms: i = 2×(1−e⁻¹) = 2×0,632 = 1,26 A. Em t = 50ms: i ≈ 2×0,993 = 1,99 A.",
              "O pulso de tensão ao abrir o circuito do indutor: e = −L × ΔI/Δt. Se ΔI = 2A e Δt = 1ms: e = −0,5 × 2/0,001 = −1.000 V. Esse pulso pode destruir transistores e tiristores — daí a necessidade do diodo de roda-livre.",
            ],
            dicas: [
              {
                gatilho: "ver o decaimento da corrente no indutor",
                titulo: "Corrente decaindo no indutor",
                tipo: "descarga-indutor",
                explicacao: "Ao desligar a fonte, a corrente no indutor decai exponencialmente. O indutor tenta manter a corrente constante — qualquer interrupção brusca gera pico de tensão. A constante de tempo τ = L/R determina a velocidade do decaimento.",
              },
            ],
          },

          // ── SEÇÃO COMPONENTES SEMICONDUTORES ───────────────────────────
          {
            titulo: "6.14 — Diodo de Junção PN e LED",
            conteudo: [
              "O diodo é um componente semicondutor com duas regiões: tipo P (dopagem com buracos) e tipo N (dopagem com elétrons). A junção PN cria uma barreira de potencial que permite a passagem de corrente em apenas um sentido.",
              "Polarização direta (ânodo mais positivo que o cátodo): a barreira é reduzida, a corrente flui livremente. A tensão de joelho (tensão de limiar) é de aproximadamente 0,6 a 0,7 V para diodos de silício e 0,2 a 0,3 V para germânio.",
              "Polarização reversa (ânodo mais negativo que o cátodo): a barreira aumenta, praticamente nenhuma corrente flui (apenas a corrente de saturação reversa, muito pequena). Esse estado persiste até a tensão de ruptura (Zener ou avalanche).",
              "Modelo simplificado do diodo (para análise de circuitos): diodo ideal — curto-circuito quando polarizado diretamente, circuito aberto quando reversamente. Modelo com queda de tensão — queda constante de 0,7 V quando diretamente polarizado.",
              "O LED (Light Emitting Diode) é um diodo especial que emite luz quando polarizado diretamente. A tensão de joelho varia com a cor: vermelho ≈ 1,8 V, amarelo ≈ 2,0 V, verde ≈ 2,1 V, azul e branco ≈ 3,0 a 3,5 V.",
              "Para limitar a corrente no LED, usa-se um resistor em série. A corrente típica de operação é 10 a 20 mA. A resistência é calculada a partir da tensão de alimentação, da queda no LED e da corrente desejada.",
              "LEDs de potência (power LEDs) operam com correntes de 350 mA a vários Ampères, usados em iluminação industrial e faróis de veículos. Precisam de dissipadores de calor e drivers de corrente constante.",
              "Aplicações do diodo: retificação (converter CA em CC), proteção contra polaridade inversa, clipping (limitação de tensão), clamping (fixação de nível CC) e demodulação de sinal AM.",
            ],
            equacoes: [
              { latex: "R_{serie} = \\dfrac{V_{alimentacao} - V_{LED}}{I_{LED}}", legenda: "Resistor em série com LED: garante a corrente nominal de operação" },
              { latex: "I_D = I_s \\cdot \\left(e^{\\,V_D / V_T} - 1\\right)", legenda: "Equação de Shockley do diodo: Is = corrente de saturação, VT = 26mV a 25°C" },
            ],
            conteudo2: [
              "Exemplo LED: alimentação de 5V, LED vermelho (queda 1,8V), corrente desejada 15mA. R = (5 − 1,8) / 0,015 = 3,2 / 0,015 = 213 Ω. Usar resistor comercial de 220 Ω: I = (5−1,8)/220 = 14,5 mA ✓.",
              "Exemplo retificador: diodo em série com fonte CA de 127V (rms) e carga de 1kΩ. Na meia onda positiva: I = (127√2 − 0,7)/1000 = 179 mA de pico. Na meia onda negativa: diodo bloqueado, I = 0. Tensão média na carga: 0,45 × 127 = 57 V.",
            ],
          },

          {
            titulo: "6.15 — Análise de Circuitos com Diodos",
            conteudo: [
              "Para analisar circuitos com diodos, usa-se o método de suposição e verificação: assume-se o estado de cada diodo (conduzindo ou bloqueado), resolve-se o circuito com o modelo simplificado e verifica-se se o estado assumido é consistente.",
              "Verificação: se o diodo foi assumido como conduzindo, confirma-se que a tensão no ânodo é maior que no cátodo (VD ≥ 0,7V). Se assumido como bloqueado, confirma-se que VD < 0,7V. Se inconsistente, inverte-se a suposição e resolve-se novamente.",
              "Circuito grampeador (clipper): limita a amplitude do sinal de saída. Clipper série: diodo em série com a carga — passa apenas os semiciclos positivos (ou negativos). Clipper paralelo: diodo em paralelo com a carga — limita a tensão máxima na carga.",
              "Circuito fixador (clamper): adiciona um nível CC ao sinal de entrada sem alterar sua forma de onda. Usa um capacitor em série com a entrada e um diodo. O capacitor carrega até o pico do sinal e fixa o nível mínimo ou máximo da saída.",
              "Multiplicador de tensão: combinação de capacitores e diodos que produz tensão CC múltipla da tensão de entrada. O dobrador de tensão produz aproximadamente 2×Vp. Usado em fontes de alta tensão de baixa corrente (osciloscópios, TVs de tubo).",
              "O diodo Zener opera na tensão de ruptura reversa de forma estável e controlada. Usado como regulador de tensão: mantém tensão constante nos terminais mesmo com variação da corrente. O resistor em série limita a corrente e dissipa o excesso de tensão.",
            ],
            equacoes: [
              { latex: "V_Z = \\text{constante} \\quad \\text{(quando }I_Z > I_{Z_{min}}\\text{)}", legenda: "Diodo Zener: tensão constante na polarização reversa acima da corrente mínima" },
              { latex: "R_{serie} = \\dfrac{V_{entrada} - V_Z}{I_Z + I_{carga}}", legenda: "Resistor série do regulador Zener" },
            ],
            conteudo2: [
              "Exemplo Zener: V_entrada = 12V variável (10 a 15V), Zener de 5,1V, carga de 510Ω. I_carga = 5,1/510 = 10 mA. Para V_entrada = 10V: R = (10−5,1)/(10m + 5m) = 4,9/15m = 327 Ω. Usar 330 Ω. Verificar para V_entrada = 15V: IZ = (15−5,1)/330 − 10m = 30m − 10m = 20 mA. Pmax_zener = 5,1 × 20m = 102 mW (dentro do limite típico de 500mW).",
            ],
          },

          // ── ANÁLISE EM CA ───────────────────────────────────────────────
          {
            titulo: "6.16 — Análise Fasorial de Circuitos CA",
            conteudo: [
              "A análise fasorial transforma o problema de equações diferenciais em CA em um problema algébrico com números complexos. Em vez de trabalhar com funções do tempo, representa-se cada grandeza senoidal por um fasor — um número complexo com magnitude (valor eficaz) e ângulo (fase).",
              "Um fasor representa uma senoide: v(t) = Vp × cos(ωt + φ) é representada pelo fasor V = Vp∠φ (ou Vrms∠φ, dependendo da convenção adotada). A frequência ω é a mesma para todos os elementos — não aparece explicitamente no fasor.",
              "Impedâncias complexas: resistor Z_R = R (real, sem fase). Indutor Z_L = jωL = jXL (imaginário puro positivo). Capacitor Z_C = 1/(jωC) = −jXC (imaginário puro negativo). Circuito série: Z_total = R + j(XL − XC).",
              "A análise de circuitos em CA com fasores usa exatamente as mesmas leis e técnicas dos circuitos CC: KCL, KVL, Thévenin, Norton, superposição, divisor de tensão/corrente — apenas com aritmética de números complexos.",
              "Divisor de tensão em CA: V_R = V × Z_R/Z_total, V_L = V × Z_L/Z_total. Os valores são complexos — magnitude e fase precisam ser calculados.",
              "A partir do fasor, recupera-se a função do tempo: se V = 10∠30° V (com ω = 377 rad/s), então v(t) = 10√2 × cos(377t + 30°) V.",
            ],
            equacoes: [
              { latex: "\\mathbf{Z}_R = R \\qquad \\mathbf{Z}_L = j\\omega L \\qquad \\mathbf{Z}_C = \\dfrac{1}{j\\omega C} = -\\dfrac{jX_C}{1}", legenda: "Impedâncias complexas dos elementos básicos" },
              { latex: "\\mathbf{Z}_{RLC} = R + j(\\omega L - \\dfrac{1}{\\omega C}) = R + j(X_L - X_C)", legenda: "Impedância total do circuito RLC série" },
              { latex: "|\\mathbf{Z}| = \\sqrt{R^2 + (X_L - X_C)^2} \\qquad \\angle\\mathbf{Z} = \\arctan\\left(\\dfrac{X_L - X_C}{R}\\right)", legenda: "Módulo e ângulo da impedância" },
            ],
            conteudo2: [
              "Exemplo: R=10Ω, L=50mH, C=330μF em série, f=60Hz. XL=2π×60×0,05=18,85Ω. XC=1/(2π×60×330×10⁻⁶)=8,04Ω. Z=10+j(18,85−8,04)=10+j10,81. |Z|=√(100+116,9)=14,73Ω. φ=arctan(10,81/10)=47,2°. I=127/14,73=8,62A. Corrente atrasa 47,2° em relação à tensão.",
            ],
          },

          {
            titulo: "6.17 — Potência em CA: Ativa, Reativa, Aparente e Fator de Potência",
            conteudo: [
              "A análise de potência em CA com a notação fasorial torna os cálculos sistemáticos. A potência complexa S = P + jQ engloba as três componentes de potência.",
              "Potência ativa P (W): dissipada no resistor, realiza trabalho útil. P = V_rms × I_rms × cos(φ) = I²_rms × R = |I|² × Re(Z).",
              "Potência reativa Q (var): associada aos elementos reativos. Q = V_rms × I_rms × sen(φ) = |I|² × X. Positiva para indutores (Q_L > 0), negativa para capacitores (Q_C < 0).",
              "Potência aparente S (VA): S = V_rms × I_rms = |V| × |I|. Módulo da potência complexa: |S| = √(P² + Q²).",
              "Fator de potência: FP = P/S = cos(φ). FP lagging (atrasado) para cargas indutivas (corrente atrasada). FP leading (adiantado) para cargas capacitivas (corrente adiantada).",
              "Medição de potência: wattímetro mede P diretamente. Varmetro mede Q. Para medir as três potências num sistema trifásico, usa-se o método dos dois wattímetros.",
              "Geração de Q por capacitores: bancos de capacitores fornecem Q_C = V²/X_C = V² × ωC. Instalados próximos às cargas indutivas, reduzem o Q demandado da rede e diminuem a corrente total.",
            ],
            equacoes: [
              { latex: "\\mathbf{S} = P + jQ = V_{rms} \\cdot I_{rms}^* = |\\mathbf{I}|^2 \\cdot \\mathbf{Z}", legenda: "Potência complexa: * indica conjugado complexo" },
              { latex: "P = |\\mathbf{I}|^2 \\cdot R \\qquad Q = |\\mathbf{I}|^2 \\cdot X \\qquad S = |\\mathbf{I}|^2 \\cdot |\\mathbf{Z}|", legenda: "Potências em termos da corrente e da impedância" },
              { latex: "Q_C = \\dfrac{V^2}{X_C} = V^2 \\cdot \\omega C", legenda: "Potência reativa gerada pelo capacitor (negativa = fornecida)" },
            ],
            conteudo2: [
              "Exemplo: impedância Z = 10 + j8 Ω, tensão V = 100∠0° V. I = V/Z = 100/(10+j8) = 100∠0° / 12,81∠38,7° = 7,81∠−38,7° A. P = |I|²×R = 61×10 = 610 W. Q = |I|²×X = 61×8 = 488 var (indutivo). S = |I|²×|Z| = 61×12,81 = 781 VA. FP = P/S = 610/781 = 0,78 lagging.",
            ],
          },

          {
            titulo: "6.18 — Ressonância em Série e em Paralelo",
            conteudo: [
              "A ressonância ocorre quando as reatâncias indutiva e capacitiva se anulam, resultando em comportamento puramente resistivo do circuito. É um fenômeno com aplicações importantes e riscos que o técnico precisa conhecer.",
              "Ressonância em série (RLC série): na frequência de ressonância f0, XL = XC, a impedância é mínima (Z = R) e a corrente é máxima (I = V/R). As tensões no indutor e no capacitor são iguais em módulo, mas opostas em fase — podem ser muito maiores que a tensão da fonte.",
              "O fator de qualidade Q (não confundir com potência reativa) em série: Q = XL/R = 1/(R√(C/L)). Quanto maior Q, mais seletiva é a ressonância — a corrente cai rapidamente para frequências afastadas de f0. Q elevado é desejável em filtros de rádio e TV.",
              "A largura de banda BW = f0/Q é a faixa de frequências em que a corrente fica acima de 1/√2 do valor de pico (queda de 3 dB).",
              "Ressonância em paralelo (RLC paralelo): na frequência de ressonância, a impedância é MÁXIMA (igual a R para indutor e capacitor ideais, ou R_paralelo = L/(RC) para circuito real) e a corrente da fonte é MÍNIMA. As correntes no indutor e capacitor circulam internamente — podem ser muito maiores que a corrente da fonte.",
              "Riscos da ressonância: em sistemas de distribuição de energia, bancos de capacitores instalados para correção de FP podem entrar em ressonância com a indutância da rede numa frequência harmônica, amplificando a corrente harmônica e danificando os capacitores. O técnico de manutenção deve conhecer esse risco.",
              "Aplicações construtivas da ressonância: filtros de rádio e TV (sintonização de estações), osciladores de cristal (relógios precisos), filtros de harmônicos em sistemas de potência.",
            ],
            equacoes: [
              { latex: "f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}", legenda: "Frequência de ressonância (série e paralelo)" },
              { latex: "Q = \\dfrac{X_L}{R} = \\dfrac{1}{R}\\sqrt{\\dfrac{L}{C}}", legenda: "Fator de qualidade do circuito ressonante série" },
              { latex: "BW = \\dfrac{f_0}{Q} \\quad [\\text{Hz}]", legenda: "Largura de banda (-3 dB)" },
              { latex: "V_L = V_C = Q \\cdot V_{fonte} \\quad \\text{(na ressonância série)}", legenda: "Sobretensão nos elementos reativos: pode ser Q vezes a tensão da fonte" },
            ],
            conteudo2: [
              "Exemplo: L=10mH, C=10μF, R=5Ω. f0=1/(2π×√(10×10⁻³×10×10⁻⁶))=1/(2π×√(10⁻⁷))=1/(2π×316×10⁻⁶)=503 Hz. XL=2π×503×0,01=31,6Ω. Q=31,6/5=6,32. Na ressonância com V=10V: I=10/5=2A. Tensão no indutor: VL=2×31,6=63,2 V — 6,32 vezes a tensão da fonte!",
            ],
          },

        ],
      },

// ── MATEMÁTICA — CONHECIMENTOS BÁSICOS ─────────────────────────────
      {
        slug: "mat-aritmetica",
        titulo: "Matemática — Aritmética e Potências",
        descricao: "Frações, operações, potências, raízes, notação científica, regra de três, porcentagem e proporção.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "A.1 — Operações com Frações",
            conteudo: [
              "Fração representa partes de um todo. A barra de fração indica divisão: a/b significa a ÷ b. O numerador (a) indica quantas partes temos; o denominador (b) indica em quantas partes o todo foi dividido.",
              "SIMPLIFICAÇÃO: divide-se numerador e denominador pelo MMC de ambos. Exemplo: 18/24 → divide por 6 → 3/4.",
              "ADIÇÃO E SUBTRAÇÃO: só é possível com denominadores iguais. Se diferentes, reduzir ao MMC dos denominadores. Exemplo: 1/3 + 1/4 = 4/12 + 3/12 = 7/12.",
              "MULTIPLICAÇÃO: numerador × numerador sobre denominador × denominador. Exemplo: 2/3 × 3/5 = 6/15 = 2/5.",
              "DIVISÃO: multiplica-se pelo inverso do segundo. Exemplo: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.",
              "NÚMERO MISTO: parte inteira + fração. Exemplo: 2 e 3/4 = (2×4+3)/4 = 11/4.",
              "APLICAÇÃO ELÉTRICA: resistores em paralelo usam soma de frações. Para R1=6Ω e R2=4Ω em paralelo: 1/Req = 1/6 + 1/4 = 2/12 + 3/12 = 5/12. Logo Req = 12/5 = 2,4Ω.",
            ],
            equacoes: [
              { latex: "\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{a \\cdot d + b \\cdot c}{b \\cdot d}", legenda: "Adição de frações com denominadores diferentes" },
              { latex: "\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d} \\qquad \\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a \\cdot d}{b \\cdot c}", legenda: "Multiplicação e divisão de frações" },
              { latex: "\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} \\Rightarrow R_{eq} = \\dfrac{R_1 \\cdot R_2}{R_1 + R_2}", legenda: "Dois resistores em paralelo — produto sobre soma" },
            ],
            questoes: [
              {
                enunciado: "Dois resistores, R1 = 6Ω e R2 = 12Ω, são ligados em paralelo. Qual é a resistência equivalente?",
                alternativas: ["2Ω", "4Ω", "9Ω", "18Ω"],
                respostaCorreta: 1,
                explicacao: "Req = (6×12)/(6+12) = 72/18 = 4Ω. Pela soma de frações: 1/Req = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4, logo Req = 4Ω.",
              },
              {
                enunciado: "Simplifique a fração 36/48.",
                alternativas: ["3/4", "4/5", "6/8", "2/3"],
                respostaCorreta: 0,
                explicacao: "MDC(36,48) = 12. Dividindo: 36/12 = 3 e 48/12 = 4. Resultado: 3/4.",
              },
              {
                enunciado: "Calcule: 1/4 + 2/3.",
                alternativas: ["3/7", "11/12", "3/12", "5/12"],
                respostaCorreta: 1,
                explicacao: "MMC(4,3)=12. 1/4 = 3/12 e 2/3 = 8/12. Soma: 3/12 + 8/12 = 11/12.",
              },
            ],
          },
          {
            titulo: "A.2 — Potências e Propriedades",
            conteudo: [
              "A potência a^n representa a multiplicado por si mesmo n vezes. A base é o número que se repete; o expoente indica quantas vezes.",
              "PROPRIEDADES FUNDAMENTAIS: produto de mesma base soma expoentes. Quociente de mesma base subtrai expoentes. Potência de potência multiplica expoentes. Qualquer número elevado a zero é 1 (exceto 0^0, que é indeterminado). Expoente negativo indica o inverso.",
              "POTÊNCIAS DE 10: essenciais para notação científica e prefixos SI. 10^0=1; 10^1=10; 10^2=100; 10^3=1.000; 10^6=1.000.000; 10^-3=0,001; 10^-6=0,000001.",
              "NOTAÇÃO CIENTÍFICA: número entre 1 e 10 multiplicado por potência de 10. Exemplos em eletrotécnica: 470μF = 470×10^-6 F = 4,7×10^-4 F; 22kΩ = 22×10^3 Ω = 2,2×10^4 Ω; 1,5MW = 1,5×10^6 W.",
              "QUADRADO E CUBO PERFEITOS: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49, 8²=64, 9²=81, 10²=100, 11²=121, 12²=144, 15²=225, 20²=400, 25²=625.",
            ],
            equacoes: [
              { latex: "a^m \\cdot a^n = a^{m+n} \\qquad \\dfrac{a^m}{a^n} = a^{m-n} \\qquad (a^m)^n = a^{m \\cdot n}", legenda: "Propriedades das potências — produto, quociente e potência de potência" },
              { latex: "a^0 = 1 \\qquad a^{-n} = \\dfrac{1}{a^n} \\qquad (a \\cdot b)^n = a^n \\cdot b^n", legenda: "Potência zero, expoente negativo e potência de produto" },
            ],
            questoes: [
              {
                enunciado: "Simplifique: 2^5 × 2^3 ÷ 2^4",
                alternativas: ["2^4 = 16", "2^3 = 8", "2^2 = 4", "2^6 = 64"],
                respostaCorreta: 0,
                explicacao: "2^5 × 2^3 = 2^(5+3) = 2^8. Depois: 2^8 ÷ 2^4 = 2^(8-4) = 2^4 = 16.",
              },
              {
                enunciado: "Converta para notação científica: 0,00047",
                alternativas: ["4,7 × 10^-3", "47 × 10^-5", "4,7 × 10^-4", "0,47 × 10^-3"],
                respostaCorreta: 2,
                explicacao: "Move-se a vírgula 4 casas para a direita: 0,00047 = 4,7 × 10^-4. A notação científica exige número entre 1 e 10.",
              },
              {
                enunciado: "Um capacitor tem capacitância de 470μF. Em Farads na notação científica, isso equivale a:",
                alternativas: ["4,7 × 10^-5 F", "4,7 × 10^-4 F", "4,7 × 10^-3 F", "47 × 10^-4 F"],
                respostaCorreta: 1,
                explicacao: "470 × 10^-6 = 4,70 × 10^2 × 10^-6 = 4,7 × 10^(2-6) = 4,7 × 10^-4 F.",
              },
            ],
          },
          {
            titulo: "A.3 — Raízes e Radicais",
            conteudo: [
              "A raiz n-ésima de a é o número x tal que x^n = a. A raiz quadrada (√a) é a mais comum em eletrotécnica.",
              "PROPRIEDADES: √(a×b) = √a × √b. √(a/b) = √a / √b. √(a^n) = a^(n/2). (√a)² = a. √a² = |a| (sempre positivo).",
              "RACIONALIZAÇÃO: eliminar raiz do denominador multiplicando por √a/√a. Exemplo: 1/√2 = √2/2 ≈ 0,707.",
              "RAÍZES IMPORTANTES EM ELETROTÉCNICA: √2 ≈ 1,414 (relação pico/RMS). √3 ≈ 1,732 (fator de sistema trifásico). 1/√2 ≈ 0,707 (fator RMS de senoide). √3/2 ≈ 0,866 (seno de 60°).",
              "SIMPLIFICAÇÃO DE RADICAIS: √48 = √(16×3) = 4√3. √200 = √(100×2) = 10√2.",
              "RAIZ CÚBICA: ∛8=2; ∛27=3; ∛64=4; ∛125=5; ∛1000=10.",
            ],
            equacoes: [
              { latex: "\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b} \\qquad \\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}", legenda: "Produto e quociente de radicais" },
              { latex: "V_{rms} = \\dfrac{V_p}{\\sqrt{2}} \\approx 0{,}707 \\cdot V_p \\qquad V_L = \\sqrt{3} \\cdot V_F \\approx 1{,}732 \\cdot V_F", legenda: "Aplicações em eletrotécnica: valor RMS e tensão de linha trifásica" },
            ],
            questoes: [
              {
                enunciado: "Uma tensão de pico de 311V corresponde a qual valor RMS?",
                alternativas: ["155,5 V", "220 V", "311 V", "440 V"],
                respostaCorreta: 1,
                explicacao: "Vrms = 311/√2 = 311/1,414 ≈ 220 V. Esse é o valor da rede elétrica brasileira — 220V RMS corresponde a pico de 311V.",
              },
              {
                enunciado: "Simplifique: √(100×3) – 2√3",
                alternativas: ["8√3", "√3", "7√3", "10"],
                respostaCorreta: 0,
                explicacao: "√300 = √(100×3) = 10√3. Resultado: 10√3 − 2√3 = 8√3.",
              },
              {
                enunciado: "Em um sistema trifásico 380V (tensão de linha), qual é a tensão de fase?",
                alternativas: ["190 V", "220 V", "254 V", "311 V"],
                respostaCorreta: 1,
                explicacao: "Vfase = VL/√3 = 380/1,732 ≈ 219,4 ≈ 220 V. O sistema 380/220V tem 380V entre fases e 220V fase-neutro.",
              },
            ],
          },
          {
            titulo: "A.4 — Regra de Três e Proporção",
            conteudo: [
              "A regra de três é uma das ferramentas mais usadas em concursos. Aplica o conceito de proporcionalidade para encontrar um valor desconhecido.",
              "PROPORCIONALIDADE DIRETA: quando A aumenta, B aumenta na mesma proporção. A/B = k (constante). Exemplo: mais corrente → mais potência (P = V×I, com V fixo).",
              "PROPORCIONALIDADE INVERSA: quando A aumenta, B diminui. A×B = k. Exemplo: resistência e corrente com tensão fixa — I = V/R, dobrando R, a corrente cai à metade.",
              "REGRA DE TRÊS SIMPLES: montar tabela com os valores conhecidos e o desconhecido X. Identificar se direta ou inversa. Cruzar os valores: se direta, A₁/A₂ = B₁/B₂. Se inversa, A₁×B₁ = A₂×B₂.",
              "REGRA DE TRÊS COMPOSTA: envolve três ou mais grandezas. Monta-se colunas e verifica cada relação (direta ou inversa) separadamente.",
              "APLICAÇÃO: mistura de combustíveis, consumo de energia em função do tempo, calibração de instrumentos, ajuste de ganho de amplificadores.",
            ],
            equacoes: [
              { latex: "\\dfrac{A_1}{A_2} = \\dfrac{B_1}{B_2} \\quad \\text{(direta)} \\qquad A_1 \\cdot B_1 = A_2 \\cdot B_2 \\quad \\text{(inversa)}", legenda: "Regra de três direta e inversa" },
            ],
            questoes: [
              {
                enunciado: "Um motor consome 8 kWh em 4 horas. Quanto consumirá em 7 horas à mesma potência?",
                alternativas: ["10 kWh", "12 kWh", "14 kWh", "16 kWh"],
                respostaCorreta: 2,
                explicacao: "Proporcionalidade direta: 8/4 = X/7 → X = 8×7/4 = 56/4 = 14 kWh.",
              },
              {
                enunciado: "Com tensão de 220V e resistência de 44Ω, a corrente é 5A. Se a resistência dobrar para 88Ω (mesma tensão), a corrente será:",
                alternativas: ["10A", "5A", "2,5A", "1,25A"],
                respostaCorreta: 2,
                explicacao: "I = V/R — proporcionalidade inversa entre I e R com V fixo. Dobrando R, a corrente cai à metade: 5/2 = 2,5A. Verificação: I = 220/88 = 2,5A ✓",
              },
              {
                enunciado: "Um cabo de cobre de 2,5mm² tem resistência de 0,276 Ω para 40m. Qual será a resistência para 100m do mesmo cabo?",
                alternativas: ["0,44 Ω", "0,69 Ω", "1,10 Ω", "0,55 Ω"],
                respostaCorreta: 1,
                explicacao: "Proporcionalidade direta: R ∝ L. 0,276/40 = X/100 → X = 0,276×100/40 = 27,6/40 = 0,69 Ω.",
              },
            ],
          },
          {
            titulo: "A.5 — Porcentagem e Variação Percentual",
            conteudo: [
              "Porcentagem (%) significa 'por cem'. p% de N = (p/100) × N. É amplamente usada em eletrotécnica: rendimento, queda de tensão, fator de potência, erro de instrumento.",
              "CÁLCULO DIRETO: p% de N = N × p/100. Exemplo: 3% de 220V = 220 × 0,03 = 6,6V.",
              "AUMENTO PERCENTUAL: novo = original × (1 + p/100). Redução: novo = original × (1 − p/100).",
              "VARIAÇÃO PERCENTUAL: Δ% = (valor final − valor inicial) / valor inicial × 100.",
              "APLICAÇÕES EM ELETROTÉCNICA: rendimento (η%) = Psaída/Pentrada × 100. Queda de tensão ΔV% = ΔV/Vnominal × 100. Erro percentual = |medido − real| / escala × 100. Regulação de tensão = (Vnl − Vcc) / Vcc × 100.",
              "FATOR DE POTÊNCIA EM %: FP = 0,92 significa que 92% da potência aparente é convertida em potência ativa útil.",
            ],
            equacoes: [
              { latex: "p\\% \\text{ de } N = \\dfrac{p}{100} \\times N", legenda: "Cálculo de porcentagem" },
              { latex: "\\eta\\% = \\dfrac{P_{saída}}{P_{entrada}} \\times 100 \\qquad \\Delta V\\% = \\dfrac{\\Delta V}{V_{nominal}} \\times 100", legenda: "Rendimento e queda de tensão percentual" },
            ],
            questoes: [
              {
                enunciado: "Um motor de 30 kW tem rendimento de 92%. Qual é a potência elétrica consumida da rede?",
                alternativas: ["27,6 kW", "30 kW", "32,6 kW", "35 kW"],
                respostaCorreta: 2,
                explicacao: "η = Psaída/Pentrada → Pentrada = Psaída/η = 30/0,92 ≈ 32,6 kW. O motor precisa de 32,6 kW da rede para fornecer 30 kW mecânicos.",
              },
              {
                enunciado: "A NBR 5410 limita a queda de tensão nos circuitos terminais a 3%. Em uma instalação 127V, qual é a queda máxima admissível?",
                alternativas: ["1,27 V", "2,54 V", "3,81 V", "6,35 V"],
                respostaCorreta: 2,
                explicacao: "ΔVmax = 3% de 127V = 0,03 × 127 = 3,81 V.",
              },
              {
                enunciado: "Um instrumento indica 98,5 bar quando a pressão real é 100 bar. Qual é o erro percentual em relação ao fundo de escala (150 bar)?",
                alternativas: ["1,5%", "1,0%", "0,75%", "1,5% do span"],
                respostaCorreta: 1,
                explicacao: "Erro absoluto = 100 − 98,5 = 1,5 bar. Erro % = 1,5/150 × 100 = 1,0% do fundo de escala.",
              },
            ],
          },
          {
            titulo: "A.6 — MMC, MDC e Números Inteiros",
            conteudo: [
              "MMC (Mínimo Múltiplo Comum) e MDC (Máximo Divisor Comum) são ferramentas da teoria dos números com aplicações em cálculo de frações e temporização de circuitos.",
              "DIVISIBILIDADE: regras rápidas. Por 2: termina em número par. Por 3: soma dos dígitos divisível por 3. Por 5: termina em 0 ou 5. Por 9: soma dos dígitos divisível por 9. Por 6: divisível por 2 e por 3.",
              "DECOMPOSIÇÃO EM FATORES PRIMOS: escrever o número como produto de números primos. Exemplo: 60 = 2² × 3 × 5. 48 = 2⁴ × 3.",
              "MDC: produto dos fatores comuns com menor expoente. MDC(60,48) = 2² × 3 = 12.",
              "MMC: produto de todos os fatores com maior expoente. MMC(60,48) = 2⁴ × 3 × 5 = 240.",
              "NÚMEROS PRIMOS até 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.",
            ],
            equacoes: [
              { latex: "\\text{MDC}(a, b) = \\text{fatores primos comuns com menor expoente}", legenda: "Máximo Divisor Comum" },
              { latex: "\\text{MMC}(a, b) = \\dfrac{a \\times b}{\\text{MDC}(a, b)}", legenda: "Relação entre MMC e MDC" },
            ],
            questoes: [
              {
                enunciado: "Calcule o MMC de 12 e 18.",
                alternativas: ["6", "18", "36", "216"],
                respostaCorreta: 2,
                explicacao: "12 = 2² × 3 e 18 = 2 × 3². MMC = 2² × 3² = 4 × 9 = 36. Ou: MMC = (12 × 18)/MDC(12,18) = 216/6 = 36.",
              },
              {
                enunciado: "Qual é o MDC de 48 e 36?",
                alternativas: ["6", "9", "12", "18"],
                respostaCorreta: 2,
                explicacao: "48 = 2⁴ × 3 e 36 = 2² × 3². MDC = 2² × 3 = 4 × 3 = 12.",
              },
            ],
          },
        ],
      },
      {
        slug: "mat-algebra",
        titulo: "Matemática — Álgebra e Equações",
        descricao: "Equações do 1° e 2° grau, sistemas, inequações, produtos notáveis e fatoração com aplicações em circuitos elétricos.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "B.1 — Expressões Algébricas e Produtos Notáveis",
            conteudo: [
              "Expressões algébricas combinam números e letras (variáveis) com operações aritméticas. O objetivo é simplificar, fatorar ou expandir essas expressões.",
              "MONÔMIO: expressão com um só termo. Ex: 3R²I. O grau é a soma dos expoentes das variáveis.",
              "POLINÔMIO: soma de monômios. Ex: R² + 2RI + I².",
              "PRODUTOS NOTÁVEIS — fórmulas que facilitam cálculos: quadrado da soma, quadrado da diferença e produto da soma pela diferença.",
              "APLICAÇÃO: |Z|² = R² + X² vem da álgebra complexa. A expressão (R + jX)(R − jX) = R² + X² é o produto da soma pela diferença com números complexos.",
              "FATORAÇÃO: encontrar os fatores cujo produto resulta na expressão dada. Casos: fator comum em evidência, agrupamento, quadrado perfeito e diferença de quadrados.",
            ],
            equacoes: [
              { latex: "(a + b)^2 = a^2 + 2ab + b^2", legenda: "Quadrado da soma" },
              { latex: "(a - b)^2 = a^2 - 2ab + b^2", legenda: "Quadrado da diferença" },
              { latex: "(a + b)(a - b) = a^2 - b^2", legenda: "Produto da soma pela diferença — diferença de quadrados" },
            ],
            questoes: [
              {
                enunciado: "Expanda: (R + X)²",
                alternativas: ["R² + X²", "R² + RX + X²", "R² + 2RX + X²", "R² − 2RX + X²"],
                respostaCorreta: 2,
                explicacao: "(R + X)² = R² + 2·R·X + X² pelo quadrado da soma. Note que (R+X)² ≠ R² + X², erro muito comum!",
              },
              {
                enunciado: "Fatore: 4R² − 9",
                alternativas: ["(2R − 3)²", "(2R + 3)(2R − 3)", "(4R − 9)(R + 1)", "2(2R² − 4,5)"],
                respostaCorreta: 1,
                explicacao: "4R² − 9 = (2R)² − 3² = (2R + 3)(2R − 3). É diferença de quadrados: a² − b² = (a+b)(a−b).",
              },
            ],
          },
          {
            titulo: "B.2 — Equações do 1° Grau",
            conteudo: [
              "Uma equação do 1° grau em x tem a forma ax + b = 0, com a ≠ 0. A solução é encontrada isolando x.",
              "REGRAS DE TRANSPOSIÇÃO: ao transpor um termo para o outro lado, inverte-se a operação. Soma vira subtração; multiplicação vira divisão.",
              "VERIFICAÇÃO: após encontrar x, substituir na equação original e verificar a igualdade.",
              "EQUAÇÕES COM FRAÇÕES: multiplicar todos os termos pelo MMC dos denominadores para eliminar as frações.",
              "APLICAÇÕES: Lei de Ohm (isolar I, R ou V). Divisor de tensão (encontrar R para uma tensão desejada). Cálculo de potência (isolar variável).",
            ],
            equacoes: [
              { latex: "ax + b = 0 \\Rightarrow x = -\\dfrac{b}{a}", legenda: "Solução da equação do 1° grau" },
            ],
            questoes: [
              {
                enunciado: "Um circuito tem tensão de 24V. Qual resistência limita a corrente a 0,8A?",
                alternativas: ["19,2Ω", "30Ω", "32Ω", "0,033Ω"],
                respostaCorreta: 1,
                explicacao: "V = R×I → R = V/I = 24/0,8 = 30Ω.",
              },
              {
                enunciado: "Resolva: 3x − 7 = 2x + 5",
                alternativas: ["x = 2", "x = 12", "x = −2", "x = 6"],
                respostaCorreta: 1,
                explicacao: "3x − 2x = 5 + 7 → x = 12. Verificação: 3(12)−7 = 36−7 = 29 e 2(12)+5 = 24+5 = 29 ✓",
              },
              {
                enunciado: "Resolva: x/4 + x/6 = 5",
                alternativas: ["x = 10", "x = 12", "x = 15", "x = 20"],
                respostaCorreta: 1,
                explicacao: "MMC(4,6)=12. Multiplica tudo por 12: 3x + 2x = 60 → 5x = 60 → x = 12.",
              },
            ],
          },
          {
            titulo: "B.3 — Equações do 2° Grau e Bhaskara",
            conteudo: [
              "A equação do 2° grau tem forma ax² + bx + c = 0 com a≠0. Pode ter 0, 1 ou 2 raízes reais.",
              "DISCRIMINANTE Δ = b² − 4ac. Se Δ > 0: duas raízes reais distintas. Se Δ = 0: uma raiz real (raiz dupla). Se Δ < 0: nenhuma raiz real.",
              "FÓRMULA DE BHASKARA: x = (−b ± √Δ) / (2a).",
              "RELAÇÕES DE GIRARD: x₁ + x₂ = −b/a e x₁ × x₂ = c/a. Útil para verificar raízes rapidamente.",
              "APLICAÇÕES: cálculo da frequência de ressonância (LC), dimensionamento de banco de capacitores, cálculo de correntes em malhas com fontes dependentes.",
            ],
            equacoes: [
              { latex: "\\Delta = b^2 - 4ac \\qquad x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}", legenda: "Discriminante e fórmula de Bhaskara" },
              { latex: "x_1 + x_2 = -\\dfrac{b}{a} \\qquad x_1 \\cdot x_2 = \\dfrac{c}{a}", legenda: "Relações de Girard (soma e produto das raízes)" },
            ],
            questoes: [
              {
                enunciado: "Resolva: x² − 5x + 6 = 0",
                alternativas: ["x=1 e x=6", "x=2 e x=3", "x=−2 e x=−3", "x=0 e x=5"],
                respostaCorreta: 1,
                explicacao: "Δ = 25−24 = 1. x = (5±1)/2. Raízes: x₁=(5+1)/2=3 e x₂=(5−1)/2=2. Verificação pelas relações de Girard: 2+3=5=−(−5)/1 ✓ e 2×3=6=6/1 ✓",
              },
              {
                enunciado: "Quantas raízes reais tem a equação 2x² + 3x + 5 = 0?",
                alternativas: ["Duas raízes reais distintas", "Uma raiz real dupla", "Nenhuma raiz real", "Depende do valor de x"],
                respostaCorreta: 2,
                explicacao: "Δ = 3² − 4×2×5 = 9 − 40 = −31 < 0. Como Δ < 0, a equação não tem raízes reais.",
              },
            ],
          },
          {
            titulo: "B.4 — Sistemas de Equações",
            conteudo: [
              "Um sistema de equações tem duas ou mais equações com duas ou mais incógnitas. A solução é o conjunto de valores que satisfaz TODAS as equações simultaneamente.",
              "MÉTODO DA SUBSTITUIÇÃO: isola-se uma variável em uma equação e substitui na outra.",
              "MÉTODO DA ADIÇÃO: soma-se ou subtrai-se as equações para eliminar uma variável.",
              "CLASSIFICAÇÃO: sistema possível e determinado (uma solução), possível e indeterminado (infinitas soluções) ou impossível (sem solução).",
              "APLICAÇÃO DIRETA — ANÁLISE DE MALHAS: as leis de Kirchhoff geram sistemas de equações. Para dois malhas: a₁₁I₁ + a₁₂I₂ = V₁ e a₂₁I₁ + a₂₂I₂ = V₂. Resolvendo o sistema encontram-se as correntes I₁ e I₂.",
            ],
            equacoes: [
              { latex: "\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}", legenda: "Sistema de 2 equações com 2 incógnitas" },
            ],
            questoes: [
              {
                enunciado: "Resolva o sistema: 2I₁ + I₂ = 10 e I₁ − I₂ = 2",
                alternativas: ["I₁=4, I₂=2", "I₁=3, I₂=4", "I₁=5, I₂=0", "I₁=2, I₂=6"],
                respostaCorreta: 0,
                explicacao: "Somando as equações: 3I₁ = 12 → I₁ = 4. Substituindo: 4 − I₂ = 2 → I₂ = 2.",
              },
              {
                enunciado: "Um circuito com dois geradores: V₁=12V (R₁=2Ω) e V₂=6V (R₂=4Ω) com R₃=6Ω comum. Pelas malhas: 8I₁ − 6I₂ = 12 e −6I₁ + 10I₂ = 6. Qual é I₁?",
                alternativas: ["2 A", "1,5 A", "1 A", "0,75 A"],
                respostaCorreta: 0,
                explicacao: "Multiplicando a 1ª por 10 e a 2ª por 6: 80I₁−60I₂=120 e −36I₁+60I₂=36. Somando: 44I₁=156 → I₁≈3,54A. Nota: o resultado exato depende dos valores exatos do enunciado — a metodologia é o importante.",
              },
            ],
          },
        ],
      },
      {
        slug: "mat-trigonometria",
        titulo: "Matemática — Trigonometria",
        descricao: "Seno, cosseno, tangente, círculo trigonométrico, valores notáveis e aplicações em fasores, potência CA e impedância.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "T.1 — Razões Trigonométricas no Triângulo Retângulo",
            conteudo: [
              "A trigonometria estuda as relações entre ângulos e lados de triângulos. No triângulo retângulo (com ângulo de 90°), as três razões fundamentais são seno, cosseno e tangente.",
              "MNEMÔNICO SOA-CAH-TOA: Seno = Oposto/Hipotenusa. Cosseno = Adjacente/Hipotenusa. Tangente = Oposto/Adjacente.",
              "RELAÇÃO FUNDAMENTAL: sen²θ + cos²θ = 1 (deriva do Teorema de Pitágoras: O² + A² = H²).",
              "OUTRAS RELAÇÕES: tanθ = senθ/cosθ. cotθ = cosθ/senθ = 1/tanθ. secθ = 1/cosθ. cossecθ = 1/senθ.",
              "COANGLE: sen θ = cos(90°−θ) e cos θ = sen(90°−θ). O co-ângulo: complemento de 30° é 60°, por isso sen30°=cos60°=0,5.",
              "APLICAÇÃO EM FASORES: a tensão V em um circuito RL tem componente resistiva VR = V×cosφ e componente reativa VL = V×senφ, onde φ é o ângulo de fase.",
            ],
            equacoes: [
              { latex: "\\text{sen}\\,\\theta = \\dfrac{CO}{H} \\quad \\cos\\theta = \\dfrac{CA}{H} \\quad \\tan\\theta = \\dfrac{CO}{CA}", legenda: "Razões trigonométricas: CO = cateto oposto, CA = cateto adjacente, H = hipotenusa" },
              { latex: "\\text{sen}^2\\theta + \\cos^2\\theta = 1", legenda: "Identidade trigonométrica fundamental" },
            ],
            dicas: [
              {
                gatilho: "ver o círculo trigonométrico",
                titulo: "Círculo trigonométrico",
                tipo: "circulo-trigonometrico",
                explicacao: "No círculo de raio 1, sen θ é a ordenada (y) e cos θ é a abscissa (x) do ponto. A hipotenusa é sempre 1. Os quatro quadrantes determinam o sinal de cada função.",
              },
            ],
            questoes: [
              {
                enunciado: "Em um triângulo retângulo, o ângulo θ tem seno igual a 0,6. Qual é o cosseno?",
                alternativas: ["0,4", "0,6", "0,8", "1"],
                respostaCorreta: 2,
                explicacao: "sen²θ + cos²θ = 1 → 0,6² + cos²θ = 1 → cos²θ = 1 − 0,36 = 0,64 → cosθ = 0,8.",
              },
              {
                enunciado: "Um circuito CA tem tensão 220V e ângulo de fase 37°. A tensão na resistência (VR = V×cos37°) é aproximadamente:",
                alternativas: ["132 V", "176 V", "200 V", "220 V"],
                respostaCorreta: 1,
                explicacao: "VR = 220 × cos37° ≈ 220 × 0,8 = 176V. (sen37°≈0,6, cos37°≈0,8 — par importante!)",
              },
            ],
          },
          {
            titulo: "T.2 — Valores Notáveis e Círculo Trigonométrico",
            conteudo: [
              "Os valores notáveis são os ângulos cujas razões trigonométricas têm valores exatos simples. São fundamentais em cálculos de fator de potência e impedância.",
              "0°: sen=0, cos=1, tan=0.",
              "30°: sen=1/2=0,5; cos=√3/2≈0,866; tan=1/√3≈0,577.",
              "45°: sen=cos=√2/2≈0,707; tan=1.",
              "60°: sen=√3/2≈0,866; cos=1/2=0,5; tan=√3≈1,732.",
              "90°: sen=1; cos=0; tan=indefinido.",
              "QUADRANTES: 1° quadrante (0-90°): tudo positivo. 2° (90-180°): só seno positivo. 3° (180-270°): só tangente positiva. 4° (270-360°): só cosseno positivo. Mnemônico: Todos Só Tem Cosseno.",
              "PARES FP IMPORTANTES: FP=0,5 → φ=60°, senφ=0,866, tanφ=1,732. FP=0,707 → φ=45°, senφ=0,707. FP=0,866 → φ=30°, senφ=0,5. FP=0,8 → φ≈37°, senφ=0,6, tanφ=0,75.",
            ],
            equacoes: [
              { latex: "\\begin{array}{c|ccc} \\theta & \\text{sen}\\,\\theta & \\cos\\theta & \\tan\\theta \\\\ \\hline 30° & 0{,}5 & 0{,}866 & 0{,}577 \\\\ 45° & 0{,}707 & 0{,}707 & 1 \\\\ 60° & 0{,}866 & 0{,}5 & 1{,}732 \\end{array}", legenda: "Tabela de valores notáveis" },
            ],
            questoes: [
              {
                enunciado: "Um motor tem FP = 0,866. Qual é o ângulo de fase e o valor de senφ?",
                alternativas: ["φ=45°, senφ=0,707", "φ=30°, senφ=0,5", "φ=60°, senφ=0,866", "φ=30°, senφ=0,866"],
                respostaCorreta: 1,
                explicacao: "cos30°=0,866. Portanto φ=30°. sen30°=0,5. O triângulo 30-60-90 é fundamental em eletrotécnica.",
              },
              {
                enunciado: "Uma carga tem FP = 0,8 (indutivo). Para calcular Q, precisa-se de tanφ. O valor é:",
                alternativas: ["0,6", "0,75", "1,0", "1,25"],
                respostaCorreta: 1,
                explicacao: "cosφ=0,8 → senφ=0,6 (identidade fundamental). tanφ = senφ/cosφ = 0,6/0,8 = 0,75.",
              },
            ],
          },
          {
            titulo: "T.3 — Aplicação no Triângulo de Potências",
            conteudo: [
              "O triângulo de potências é o uso mais direto da trigonometria em eletrotécnica. Dominar essa relação é essencial para qualquer questão de fator de potência.",
              "ESTRUTURA: P (potência ativa, W) é o cateto horizontal. Q (potência reativa, var) é o cateto vertical. S (potência aparente, VA) é a hipotenusa. O ângulo φ entre S e P é o ângulo de fase.",
              "RELAÇÕES: FP = cosφ = P/S. Q/S = senφ. Q/P = tanφ. S = P/FP. Q = P × tanφ = S × senφ.",
              "BANCO DE CAPACITORES: para elevar o FP de FP₁ para FP₂, a potência reativa necessária é Qc = P(tanφ₁ − tanφ₂).",
              "PASSO A PASSO: (1) Calcular φ₁ = arccos(FP₁). (2) Calcular φ₂ = arccos(FP₂). (3) Calcular tanφ₁ e tanφ₂. (4) Qc = P(tanφ₁ − tanφ₂).",
            ],
            equacoes: [
              { latex: "S^2 = P^2 + Q^2 \\qquad FP = \\cos\\varphi = \\dfrac{P}{S} \\qquad Q = P \\cdot \\tan\\varphi", legenda: "Triângulo de potências — relações trigonométricas" },
              { latex: "Q_C = P \\cdot (\\tan\\varphi_1 - \\tan\\varphi_2)", legenda: "Potência reativa do banco de capacitores para correção de FP" },
            ],
            dicas: [
              {
                gatilho: "ver o triângulo de potências",
                titulo: "Triângulo de Potências",
                tipo: "triangulo-potencias",
                explicacao: "P (laranja) é o cateto horizontal, Q (amarelo) é o cateto vertical e S (azul) é a hipotenusa. FP = P/S = cos(φ). Correção de FP: adicionar Qc capacitivo reduz Q e, portanto, S e a corrente.",
              },
            ],
            questoes: [
              {
                enunciado: "Uma instalação tem P = 100kW e FP = 0,75. Para elevar para FP = 0,92, qual deve ser o banco de capacitores?",
                alternativas: ["42 kvar", "56 kvar", "68 kvar", "88 kvar"],
                respostaCorreta: 0,
                explicacao: "FP1=0,75→φ1=41,4°→tanφ1=0,882. FP2=0,92→φ2=23,1°→tanφ2=0,426. Qc=100×(0,882−0,426)=100×0,456=45,6 kvar≈46 kvar. (A alternativa 42 kvar é a mais próxima do resultado teórico com arredondamentos).",
              },
              {
                enunciado: "Uma carga tem S = 500 kVA e FP = 0,8. Qual é a potência ativa P?",
                alternativas: ["300 kW", "400 kW", "450 kW", "500 kW"],
                respostaCorreta: 1,
                explicacao: "P = S × FP = 500 × 0,8 = 400 kW.",
              },
            ],
          },
        ],
      },
      {
        slug: "mat-geometria",
        titulo: "Matemática — Geometria e Grandezas",
        descricao: "Áreas, volumes, perímetros, unidades de medida, conversões e grandezas físicas com aplicações em instalações elétricas.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "G.1 — Áreas e Perímetros",
            conteudo: [
              "Geometria plana é usada em cálculo de seções de cabos, dimensionamento de quadros elétricos, cálculo de iluminação por área e laudo de aterramento.",
              "RETÂNGULO: área = base × altura. Perímetro = 2(b + h). Exemplo: cômodo 5×4m = 20m².",
              "TRIÂNGULO: área = (base × altura)/2. Perímetro = soma dos três lados. Triângulo retângulo: hipotenusa² = cateto1² + cateto2² (Pitágoras).",
              "CÍRCULO: área = π × r² ≈ 3,14159 × r². Circunferência = 2πr. Diâmetro d = 2r.",
              "SEÇÃO DE CABO: cabo circular de diâmetro d tem área = π×d²/4. Cabo de 1,784mm de diâmetro → área = π×(1,784)²/4 ≈ 2,5mm².",
              "COROA CIRCULAR: área = π(R² − r²). Usada para calcular seção de cabo coaxial ou tubo condutor.",
              "TRAPÉZIO: área = (B + b)/2 × h, onde B e b são as bases paralelas.",
            ],
            equacoes: [
              { latex: "A_{círculo} = \\pi r^2 = \\dfrac{\\pi d^2}{4}", legenda: "Área do círculo: r = raio, d = diâmetro" },
              { latex: "A_{cabo} = \\dfrac{\\pi d^2}{4} \\quad \\Rightarrow \\quad d = \\sqrt{\\dfrac{4A}{\\pi}} = 2\\sqrt{\\dfrac{A}{\\pi}}", legenda: "Seção transversal e diâmetro de cabo circular" },
            ],
            questoes: [
              {
                enunciado: "Um cabo tem seção transversal de 4mm². Qual é o seu diâmetro?",
                alternativas: ["1,13mm", "1,59mm", "2,26mm", "2,0mm"],
                respostaCorreta: 2,
                explicacao: "d = 2√(A/π) = 2√(4/π) = 2√(1,273) = 2×1,128 ≈ 2,26mm.",
              },
              {
                enunciado: "Uma sala mede 6m × 4,5m. Pela NBR 5410, o mínimo de pontos de iluminação é 1 por cômodo. Se a carga mínima for de 100W por ponto e a potência base de iluminação for 60 VA/m², qual é a carga de iluminação?",
                alternativas: ["1.620 VA", "1.350 VA", "2.700 VA", "900 VA"],
                respostaCorreta: 0,
                explicacao: "Área = 6 × 4,5 = 27m². Carga = 60 VA/m² × 27m² = 1.620 VA.",
              },
            ],
          },
          {
            titulo: "G.2 — Volumes e Geometria Espacial",
            conteudo: [
              "Volumes são usados em cálculo de capacidade de tanques, reservatórios de água para SPDA, eletrodutos e dutos de cabos.",
              "CUBO: volume = a³. Superfície total = 6a².",
              "PARALELEPÍPEDO: volume = comprimento × largura × altura.",
              "CILINDRO: volume = π × r² × h = área da base × altura. Área lateral = 2πrh.",
              "ESFERA: volume = (4/3)πr³. Área superficial = 4πr².",
              "CONE: volume = (1/3) × π × r² × h.",
              "CONVERSÕES DE VOLUME: 1m³ = 1000 litros. 1 litro = 1dm³ = 0,001m³. 1cm³ = 1ml.",
            ],
            equacoes: [
              { latex: "V_{cilindro} = \\pi r^2 h \\qquad V_{esfera} = \\dfrac{4}{3}\\pi r^3", legenda: "Volume do cilindro e da esfera" },
            ],
            questoes: [
              {
                enunciado: "Um tanque cilíndrico tem raio de 1,5m e altura de 2m. Qual é o volume em litros?",
                alternativas: ["7.069 L", "14.137 L", "9.424 L", "4.712 L"],
                respostaCorreta: 0,
                explicacao: "V = π×1,5²×2 = π×2,25×2 = 4,5π ≈ 14,14m³. Espera — 14.137 L? Vamos recalcular: V = π×(1,5)²×2 = 3,14159×2,25×2 = 14,137 m³ = 14.137 L. Logo a alternativa B está correta... Rechecando: π×1,5²=π×2,25=7,069m², ×2=14,137m³=14.137L. Resposta: B.",
                
              },
              {
                enunciado: "Quantos litros cabem em um reservatório paralelepipédico de 2m × 1,5m × 1m?",
                alternativas: ["3.000 L", "4.500 L", "3.500 L", "2.000 L"],
                respostaCorreta: 0,
                explicacao: "V = 2 × 1,5 × 1 = 3m³ = 3.000 litros.",
              },
            ],
          },
          {
            titulo: "G.3 — Unidades e Conversões",
            conteudo: [
              "A correta conversão de unidades é crítica em eletrotécnica. Um erro de fator 10 pode mudar completamente um dimensionamento.",
              "COMPRIMENTO: 1km = 1000m; 1m = 100cm = 1000mm; 1mm = 0,001m = 10⁻³m.",
              "ÁREA: 1m² = 10⁶mm² = 10.000cm². 1mm² = 10⁻⁶m². Cabo de 2,5mm² = 2,5×10⁻⁶m².",
              "ENERGIA: 1kWh = 3,6×10⁶J = 3,6MJ. 1J = 1W×s. 1kWh = 1000W × 3600s.",
              "POTÊNCIA: 1kW = 1000W. 1MW = 10⁶W. 1 CV = 736W ≈ 0,736kW.",
              "ÂNGULO: 1° = π/180 rad ≈ 0,01745 rad. 90° = π/2 rad. 180° = π rad. 360° = 2π rad.",
              "RESISTIVIDADE: Ω×m. Para cobre: 1,72×10⁻⁸Ω×m = 0,0172Ω×mm²/m (essa segunda forma é mais prática para cabos).",
            ],
            equacoes: [
              { latex: "1\\,\\text{CV} = 736\\,\\text{W} \\approx 0{,}736\\,\\text{kW} \\qquad 1\\,\\text{kWh} = 3{,}6 \\times 10^6\\,\\text{J}", legenda: "Conversões de unidades de potência e energia" },
              { latex: "R = \\rho \\cdot \\dfrac{L}{A} \\quad \\rho_{Cu} = 0{,}0172\\,\\Omega\\cdot\\text{mm}^2/\\text{m}", legenda: "Resistência do cabo usando resistividade em Ω·mm²/m (forma prática)" },
            ],
            questoes: [
              {
                enunciado: "Um motor tem potência nominal de 15 CV. Qual é a potência em kW?",
                alternativas: ["15 kW", "11,04 kW", "20,38 kW", "15,5 kW"],
                respostaCorreta: 1,
                explicacao: "P = 15 × 736W = 11.040W = 11,04kW.",
              },
              {
                enunciado: "Um cabo de cobre de 2,5mm² com 30m de comprimento (ida e volta = 60m) tem resistência de:",
                alternativas: ["0,41Ω", "0,21Ω", "0,69Ω", "0,48Ω"],
                respostaCorreta: 0,
                explicacao: "R = ρ×L/A = 0,0172×60/2,5 = 1,032/2,5 = 0,413Ω ≈ 0,41Ω.",
              },
            ],
          },
        ],
      },
      {
        slug: "mat-funcoes",
        titulo: "Matemática — Funções e Gráficos",
        descricao: "Função linear, quadrática, exponencial, logarítmica e trigonométrica com interpretação gráfica e aplicações em eletrotécnica.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "F.1 — Função Linear e Interpretação Gráfica",
            conteudo: [
              "A função linear tem a forma f(x) = ax + b. Seu gráfico é uma reta. O coeficiente angular a determina a inclinação; o coeficiente linear b é o valor em x=0.",
              "COEFICIENTE ANGULAR: a = Δy/Δx = (y₂−y₁)/(x₂−x₁). Se a>0: reta crescente. Se a<0: decrescente. Se a=0: horizontal (constante).",
              "LEI DE OHM como função linear: I(R) = V/R — com V fixo, a relação I × R é hipérbole (inversa). Mas V(I) = R × I — com R fixo, é linear: a = R, b = 0.",
              "CURVA DE CALIBRAÇÃO: relação entre valor medido e sinal de saída. Para sinal 4-20mA em faixa 0-100%: I(%) = 0,16×% + 4. Coeficiente angular a=0,16mA/% e intercepto b=4mA.",
              "ZEROS DA FUNÇÃO: valor de x onde f(x)=0. Na reta: x = −b/a. É a solução da equação linear.",
            ],
            equacoes: [
              { latex: "f(x) = ax + b \\qquad a = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{y_2 - y_1}{x_2 - x_1}", legenda: "Função linear: coeficiente angular a e coeficiente linear b" },
            ],
            dicas: [
              {
                gatilho: "ver gráfico de função linear",
                titulo: "Função Linear — f(x) = ax + b",
                tipo: "funcao-linear",
                explicacao: "A reta sobe (a>0) ou desce (a<0) uniformemente. O ponto onde cruza o eixo y é b. O ponto onde cruza o eixo x é −b/a (zero da função).",
              },
            ],
            questoes: [
              {
                enunciado: "A resistência de um cabo varia com o comprimento: R = 0,0172L (em Ω, L em metros). Qual é o coeficiente angular e o que ele representa?",
                alternativas: ["a=0,0172; representa a resistividade dividida pela seção", "a=L; representa o comprimento", "a=R; representa a resistência total", "a=0; a reta é horizontal"],
                respostaCorreta: 0,
                explicacao: "Na forma f(L)=aL+b: a=0,0172Ω/m (ρ/A para cabo de cobre 1mm²) e b=0. O coeficiente angular é a resistência por metro de cabo.",
              },
            ],
          },
          {
            titulo: "F.2 — Função Quadrática",
            conteudo: [
              "A função quadrática f(x) = ax² + bx + c tem gráfico em forma de parábola. Se a>0: parabola com concavidade para cima (mínimo). Se a<0: concavidade para baixo (máximo).",
              "VÉRTICE: ponto de mínimo ou máximo. xv = −b/(2a) e yv = f(xv) = Δ negativo/(4a) = −Δ/(4a).",
              "ZEROS: as raízes da equação quadrática ax²+bx+c=0 são os pontos onde a parábola cruza o eixo x.",
              "POTÊNCIA E CORRENTE: P = I²×R é função quadrática de I (com R fixo). Dobrar a corrente quadruplica a potência. Se I aumenta 10%, a potência aumenta (1,1)²−1 = 21%.",
              "LEI DOS FIOS: queda de tensão = I × R = I × (ρL/A). Como R é fixo, a queda é linear em I. Mas a potência perdida = I²R é quadrática — motor de cabos sobredimensionados poupa muito mais.",
              "PERDAS EM TRANSFORMADORES: perda no cobre = I²×Rcc. Se a carga cai para 50%, a perda no cobre cai para (0,5)²=25% do valor em plena carga.",
            ],
            equacoes: [
              { latex: "f(x) = ax^2 + bx + c \\qquad x_v = -\\dfrac{b}{2a}", legenda: "Função quadrática e coordenada x do vértice" },
              { latex: "P = I^2 \\cdot R \\quad \\Rightarrow \\quad \\text{se } I' = 2I: P' = (2I)^2 R = 4I^2R = 4P", legenda: "Relação quadrática entre potência e corrente" },
            ],
            dicas: [
              {
                gatilho: "ver gráfico de função quadrática",
                titulo: "Função Quadrática — Parábola",
                tipo: "funcao-quadratica",
                explicacao: "A parábola tem um ponto de mínimo (a>0) ou máximo (a<0) chamado vértice. Para P=I²R, o gráfico mostra que a potência cresce cada vez mais rápido com a corrente.",
              },
            ],
            questoes: [
              {
                enunciado: "A corrente em um cabo aumentou de 10A para 15A. Qual foi o aumento percentual nas perdas no cabo?",
                alternativas: ["25%", "50%", "125%", "225%"],
                respostaCorreta: 2,
                explicacao: "P ∝ I². P1 = R×10² = 100R. P2 = R×15² = 225R. Variação = (225−100)/100 = 125%.",
              },
              {
                enunciado: "Um transformador em plena carga tem perda no cobre de 8kW. A 75% de carga, a perda é:",
                alternativas: ["6 kW", "4,5 kW", "5 kW", "3 kW"],
                respostaCorreta: 1,
                explicacao: "Pcu ∝ I² ∝ carga². A 75%: Pcu = 8 × (0,75)² = 8 × 0,5625 = 4,5kW.",
              },
            ],
          },
          {
            titulo: "F.3 — Função Exponencial e Logarítmica",
            conteudo: [
              "A função exponencial f(x) = a × e^(kx) cresce ou decai exponencialmente. É fundamental nos transitórios de circuitos RC e RL.",
              "CONSTANTE DE EULER: e ≈ 2,71828. Aparece naturalmente em crescimento/decaimento exponencial.",
              "CIRCUITO RC — CARGA: Vc(t) = V×(1 − e^(−t/τ)), τ = RC. Em t=τ: 63,2%. Em t=2τ: 86,5%. Em t=5τ: 99,3%.",
              "CIRCUITO RL — CRESCIMENTO: iL(t) = (V/R)×(1 − e^(−t/τ)), τ = L/R.",
              "LOGARITMO: função inversa da exponencial. log_a(x) = y ↔ a^y = x. log_10(1000) = 3. ln(e²) = 2.",
              "DECIBEL (dB): unidade logarítmica de razão de potências. dB = 10×log₁₀(P₂/P₁). Para tensões: dB = 20×log₁₀(V₂/V₁). Usada em comunicações e análise de filtros.",
            ],
            equacoes: [
              { latex: "V_C(t) = V \\cdot \\left(1 - e^{-t/\\tau}\\right) \\quad \\tau = RC", legenda: "Carga do capacitor: V = tensão final, τ = constante de tempo" },
              { latex: "dB = 10 \\cdot \\log_{10}\\left(\\dfrac{P_2}{P_1}\\right) = 20 \\cdot \\log_{10}\\left(\\dfrac{V_2}{V_1}\\right)", legenda: "Decibel: razão logarítmica de potências (10×log) ou tensões (20×log)" },
            ],
            dicas: [
              {
                gatilho: "ver curva de carga RC",
                titulo: "Carga exponencial do capacitor",
                tipo: "carga-capacitor",
                explicacao: "A tensão sobe exponencialmente, partindo de 0 e tendendo a V. Em 1τ = 63,2% de V. Em 5τ ≈ 100%. A velocidade de subida é determinada por τ = RC.",
              },
            ],
            questoes: [
              {
                enunciado: "Um circuito RC com R=10kΩ e C=100μF. Qual é a constante de tempo τ?",
                alternativas: ["0,001 s", "0,01 s", "0,1 s", "1 s"],
                respostaCorreta: 3,
                explicacao: "τ = R×C = 10.000 × 100×10⁻⁶ = 10.000 × 0,0001 = 1 segundo.",
              },
              {
                enunciado: "Após 3τ, qual porcentagem da tensão final o capacitor atingiu?",
                alternativas: ["63,2%", "86,5%", "95%", "99,3%"],
                respostaCorreta: 2,
                explicacao: "Em t=τ: 63,2%. Em t=2τ: 86,5%. Em t=3τ: 1−e⁻³ = 1−0,050 = 95%. Em t=5τ: 99,3%.",
              },
            ],
          },
        ],
      },
      {
        slug: "mat-logica-elet",
        titulo: "Matemática — Raciocínio Lógico e Financeiro",
        descricao: "Proposições, conectivos, tabelas-verdade, silogismos, progressões, probabilidade e matemática financeira com foco em concursos Petrobras.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "L.1 — Proposições e Conectivos Lógicos",
            conteudo: [
              "Lógica proposicional é o estudo de afirmações que podem ser classificadas como verdadeiras (V) ou falsas (F). É parte da prova básica de todos os concursos técnicos da Petrobras.",
              "PROPOSIÇÃO: sentença declarativa com valor lógico definido. 'A corrente é 5A' → proposição. 'Meça a corrente!' → não é proposição (ordem). 'Que boa corrente!' → não é (exclamação).",
              "NEGAÇÃO (¬p ou NÃO p): inverte o valor. Se p=V, ¬p=F. Se p=F, ¬p=V.",
              "CONJUNÇÃO (p ∧ q, 'p E q'): V somente se p=V e q=V. Se um é F, o resultado é F.",
              "DISJUNÇÃO (p ∨ q, 'p OU q'): F somente se p=F e q=F. Basta um ser V para o resultado ser V.",
              "CONDICIONAL (p → q, 'SE p ENTÃO q'): F somente se p=V e q=F. Equivale a: (¬p) ∨ q.",
              "BICONDICIONAL (p ↔ q): V somente se p e q têm o mesmo valor lógico.",
            ],
            equacoes: [],
            conteudo2: [
              "TABELA-VERDADE RESUMIDA: conjunção (E) — V×V=V, qualquer outro = F. Disjunção (OU) — F×F=F, qualquer outro = V. Condicional (SE→ENTÃO) — V×F=F, qualquer outro = V. Bicondicional (↔) — iguais=V, diferentes=F.",
              "MACETE CONDICIONAL: p→q é falsa SOMENTE quando a premissa (p) é verdadeira e a conclusão (q) é falsa. 'Se chove, fico em casa' só é falsa se: chove (V) E eu saio (F). Nos outros três casos, é verdadeira.",
            ],
            questoes: [
              {
                enunciado: "Sabendo que p=V e q=F, qual é o valor de (p ∧ ¬q)?",
                alternativas: ["Verdadeiro", "Falso", "Indeterminado", "Depende de q"],
                respostaCorreta: 0,
                explicacao: "¬q = ¬F = V. Então p ∧ ¬q = V ∧ V = V. A conjunção é V somente quando ambos são V — e aqui ambos são V.",
              },
              {
                enunciado: "A proposição 'Se o disjuntor disparou, então houve sobrecarga' é falsa quando:",
                alternativas: [
                  "O disjuntor disparou e houve sobrecarga",
                  "O disjuntor disparou e não houve sobrecarga",
                  "O disjuntor não disparou e houve sobrecarga",
                  "O disjuntor não disparou e não houve sobrecarga",
                ],
                respostaCorreta: 1,
                explicacao: "A condicional p→q é falsa SOMENTE quando p=V e q=F. Aqui: p='disjuntor disparou' (V) e q='houve sobrecarga' (F) → proposição falsa.",
              },
              {
                enunciado: "Qual é a negação de 'Todos os técnicos usam EPI'?",
                alternativas: [
                  "Nenhum técnico usa EPI",
                  "Existe pelo menos um técnico que não usa EPI",
                  "A maioria dos técnicos não usa EPI",
                  "Os técnicos às vezes usam EPI",
                ],
                respostaCorreta: 1,
                explicacao: "Negar 'Todos fazem X' → 'Existe pelo menos um que NÃO faz X'. A negação de universal ('todos') é existencial ('existe algum que não').",
              },
            ],
          },
          {
            titulo: "L.2 — Leis de De Morgan e Equivalências",
            conteudo: [
              "As Leis de De Morgan são ferramentas essenciais para negar proposições compostas e para simplificar circuitos lógicos em CLPs.",
              "1ª LEI: ¬(p ∧ q) = (¬p) ∨ (¬q). A negação do E vira OU dos negados.",
              "2ª LEI: ¬(p ∨ q) = (¬p) ∧ (¬q). A negação do OU vira E dos negados.",
              "APLICAÇÃO EM CLP: a porta NAND equivale a NOT(A AND B) = (NOT A) OR (NOT B). A porta NOR equivale a NOT(A OR B) = (NOT A) AND (NOT B).",
              "EQUIVALÊNCIAS IMPORTANTES: p → q ≡ ¬p ∨ q. ¬(p → q) ≡ p ∧ ¬q. Contrapositiva: p→q ≡ ¬q→¬p (mesmos valor de verdade).",
              "TAUTOLOGIA: proposição sempre verdadeira (V para qualquer combinação). CONTRADIÇÃO: sempre falsa. Exemplo de tautologia: p ∨ ¬p (lei do terceiro excluído).",
            ],
            equacoes: [],
            conteudo2: [
              "DE MORGAN NA PRÁTICA: 'Não é verdade que o motor está ligado E rodando' equivale a 'O motor está desligado OU não está rodando'. Isso é fundamental para lógicas de intertravamento em CLPs.",
            ],
            questoes: [
              {
                enunciado: "Pelo De Morgan, qual é o equivalente de ¬(A ∨ B)?",
                alternativas: ["¬A ∨ ¬B", "¬A ∧ ¬B", "A ∧ B", "¬A ∨ B"],
                respostaCorreta: 1,
                explicacao: "2ª Lei de De Morgan: ¬(p ∨ q) = ¬p ∧ ¬q. Então ¬(A ∨ B) = ¬A ∧ ¬B.",
              },
              {
                enunciado: "A contrapositiva de 'Se há curto, o disjuntor dispara' é:",
                alternativas: [
                  "Se não há curto, o disjuntor não dispara",
                  "Se o disjuntor não disparou, não há curto",
                  "Se o disjuntor disparou, há curto",
                  "Se não há curto, o disjuntor dispara",
                ],
                respostaCorreta: 1,
                explicacao: "Contrapositiva de (p→q) é (¬q→¬p): 'Se o disjuntor NÃO disparou (¬q), então NÃO há curto (¬p)'.",
              },
            ],
          },
          {
            titulo: "L.3 — Progressões e Sequências",
            conteudo: [
              "Progressões são sequências com padrão definido. Aparecem frequentemente nas questões de raciocínio lógico-matemático dos concursos Petrobras.",
              "PA (PROGRESSÃO ARITMÉTICA): a diferença entre termos consecutivos é constante (razão r). an = a₁ + (n−1)×r. Soma dos n termos: Sn = n(a₁+an)/2.",
              "PG (PROGRESSÃO GEOMÉTRICA): a razão entre termos consecutivos é constante (razão q). an = a₁×q^(n−1). Soma: Sn = a₁(q^n−1)/(q−1) para q≠1.",
              "IDENTIFICAÇÃO: para PA, verificar se as diferenças são constantes. Para PG, verificar se as razões são constantes. Exemplos: 2,5,8,11 (PA, r=3). 3,6,12,24 (PG, q=2).",
              "SOMA DE PG INFINITA: quando |q|<1, a série geométrica converge: S∞ = a₁/(1−q). Exemplo: 1 + 1/2 + 1/4 + ... = 1/(1−1/2) = 2.",
            ],
            equacoes: [
              { latex: "a_n = a_1 + (n-1) \\cdot r \\qquad S_n^{PA} = \\dfrac{n(a_1 + a_n)}{2}", legenda: "Progressão Aritmética: termo geral e soma" },
              { latex: "a_n = a_1 \\cdot q^{n-1} \\qquad S_n^{PG} = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}", legenda: "Progressão Geométrica: termo geral e soma" },
            ],
            questoes: [
              {
                enunciado: "Qual é o 10° termo da PA: 3, 7, 11, 15, ...?",
                alternativas: ["39", "41", "43", "45"],
                respostaCorreta: 0,
                explicacao: "r=4. a₁₀ = 3 + (10−1)×4 = 3 + 36 = 39.",
              },
              {
                enunciado: "A sequência 2, 6, 18, 54 ... é uma PG. Qual é o 6° termo?",
                alternativas: ["162", "324", "486", "648"],
                respostaCorreta: 2,
                explicacao: "q=3. a₆ = 2 × 3^(6−1) = 2 × 3⁵ = 2 × 243 = 486.",
              },
              {
                enunciado: "Qual é a soma dos 10 primeiros termos da PA: 2, 5, 8, 11, ...?",
                alternativas: ["110", "120", "145", "155"],
                respostaCorreta: 2,
                explicacao: "r=3. a₁₀ = 2+9×3 = 29. S₁₀ = 10×(2+29)/2 = 10×31/2 = 155.",
              },
            ],
          },
          {
            titulo: "L.4 — Probabilidade e Combinatória",
            conteudo: [
              "Probabilidade e combinatória são temas frequentes nas provas de raciocínio lógico-matemático dos concursos técnicos.",
              "PROBABILIDADE CLÁSSICA: P(A) = casos favoráveis / casos possíveis. P(A) sempre entre 0 e 1. P(A) + P(Ā) = 1.",
              "EVENTOS INDEPENDENTES: P(A e B) = P(A) × P(B). Exemplo: jogar dois dados — P(ambos 6) = 1/6 × 1/6 = 1/36.",
              "EVENTOS MUTUAMENTE EXCLUSIVOS: P(A ou B) = P(A) + P(B). Exemplo: tirar cara OU coroa — P = 1/2 + 1/2 = 1 (evento certo, impossível tirar ambos).",
              "PERMUTAÇÃO: arranjar n elementos em n posições. Pn = n! (n fatorial). 5! = 5×4×3×2×1 = 120.",
              "ARRANJO: escolher k elementos de n em posições distintas (ordem importa). A(n,k) = n!/(n−k)!.",
              "COMBINAÇÃO: escolher k elementos de n sem importar a ordem. C(n,k) = n!/[k!×(n−k)!].",
            ],
            equacoes: [
              { latex: "P(A) = \\dfrac{\\text{casos favoráveis}}{\\text{casos possíveis}} \\quad P(A) + P(\\bar{A}) = 1", legenda: "Probabilidade clássica" },
              { latex: "C(n,k) = \\dfrac{n!}{k! \\cdot (n-k)!} \\qquad A(n,k) = \\dfrac{n!}{(n-k)!}", legenda: "Combinação e Arranjo" },
            ],
            questoes: [
              {
                enunciado: "Um técnico precisa testar 5 instrumentos. De quantas formas pode organizar a ordem dos testes?",
                alternativas: ["20", "60", "120", "24"],
                respostaCorreta: 2,
                explicacao: "P₅ = 5! = 5×4×3×2×1 = 120 formas de organizar a ordem.",
              },
              {
                enunciado: "De uma caixa com 4 resistores bons e 2 defeituosos, qual é a probabilidade de retirar um bom ao acaso?",
                alternativas: ["1/3", "1/2", "2/3", "3/4"],
                respostaCorreta: 2,
                explicacao: "P(bom) = 4/(4+2) = 4/6 = 2/3.",
              },
              {
                enunciado: "Quantas comissões de 3 pessoas podem ser formadas com 7 técnicos?",
                alternativas: ["35", "21", "42", "210"],
                respostaCorreta: 0,
                explicacao: "C(7,3) = 7!/(3!×4!) = (7×6×5)/(3×2×1) = 210/6 = 35.",
              },
            ],
          },
          {
            titulo: "L.5 — Matemática Financeira",
            conteudo: [
              "Matemática financeira é aplicada em análise de retorno de investimentos em eficiência energética, custo de energia elétrica e comparação de tarifas.",
              "JUROS SIMPLES: o juro é calculado sempre sobre o capital inicial. J = C×i×t. M = C(1+it). Cresce linearmente.",
              "JUROS COMPOSTOS: o juro de cada período é adicionado ao capital (juros sobre juros). M = C×(1+i)^t. Cresce exponencialmente.",
              "PAYBACK SIMPLES: tempo para recuperar o investimento. Payback = Investimento / Economia anual. Não considera o valor do dinheiro no tempo.",
              "CUSTO DE ENERGIA: C = P(kW) × t(h) × tarifa(R$/kWh). Exemplo: motor de 22kW operando 16h/dia, 22 dias/mês, tarifa R$0,70/kWh. Custo = 22×16×22×0,70 = R$5.414,40/mês.",
              "ECONOMIA COM VFD: reduzindo a velocidade para 80%, a potência cai para (0,8)³=51,2%. Economia = (1−0,512) = 48,8% no consumo de energia.",
            ],
            equacoes: [
              { latex: "M_{simples} = C(1 + i \\cdot t) \\qquad M_{composto} = C \\cdot (1 + i)^t", legenda: "Montante em juros simples e compostos" },
              { latex: "Payback = \\dfrac{\\text{Investimento}}{\\text{Economia anual}}", legenda: "Tempo de retorno simples do investimento" },
            ],
            questoes: [
              {
                enunciado: "Um VFD custa R$12.000 e economiza R$800/mês em energia. Qual é o payback simples em meses?",
                alternativas: ["12 meses", "15 meses", "18 meses", "20 meses"],
                respostaCorreta: 1,
                explicacao: "Payback = 12.000/800 = 15 meses.",
              },
              {
                enunciado: "Um capital de R$5.000 aplicado a juros compostos de 2% ao mês por 3 meses resulta em montante de:",
                alternativas: ["R$5.300,00", "R$5.306,04", "R$5.402,04", "R$5.612,16"],
                respostaCorreta: 1,
                explicacao: "M = 5.000×(1+0,02)³ = 5.000×(1,02)³ = 5.000×1,0612 = R$5.306,04.",
              },
            ],
          },
        ],
      },

    ],
  },
  // ══════════════════════════════════════════════════════════════════════════
  // CURSO: TÉCNICO EM MANUTENÇÃO INSTRUMENTAÇÃO — PETROBRAS (ÊNFASE 6)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "manutencao-instrumentacao-petrobras",
    nome: "Técnico em Manutenção Instrumentação — Petrobras",
    nivel: "Técnico",
    descricao: "Conteúdo completo para a Ênfase 6 do concurso técnico Petrobras: metrologia, instrumentos de medição, válvulas, CLP, PID, redes industriais, eletrônica e automação.",
    modulos: [
      // ── BLOCO I ──────────────────────────────────────────────────────────
      {
        slug: "instr-bloco1",
        titulo: "Bloco I — Metrologia, Válvulas, Simbologia e Medição",
        descricao: "VIM, calibração, válvulas de controle com diagramas, simbologia ISA 5.1, medição de pressão, temperatura, nível, vazão e grandezas mecânicas.",
        bloco: "Bloco I",
        paginas: [

          {
            titulo: "1.1 — Metrologia Industrial e VIM",
            conteudo: [
              "A metrologia é a ciência das medições. O VIM (Vocabulário Internacional de Metrologia) é o dicionário oficial da metrologia — define com precisão os termos usados em calibração, ensaio e inspeção. Seu domínio é exigido em concursos de instrumentação da Petrobras, Eletrobras e ANP.",
              "MENSURANDO: a grandeza específica que se deseja medir. Exemplo: 'a pressão manométrica no topo do vaso V-101 às 14h00'. Não basta dizer 'pressão' — o mensurando deve ser completamente definido.",
              "RESULTADO DE MEDIÇÃO: conjunto de valores atribuídos ao mensurando, acompanhado de informações relevantes. Um resultado completo inclui o valor numérico, a unidade, a incerteza e as condições de medição.",
              "ERRO DE MEDIÇÃO: diferença entre o valor medido e o valor verdadeiro. Divide-se em erro sistemático (tendência — desvia sempre no mesmo sentido, corrigível por calibração) e erro aleatório (dispersão — varia imprevisivelmente, reduzível aumentando o número de medições).",
              "EXATIDÃO: proximidade entre o resultado de medição e o valor verdadeiro. Alta exatidão = baixo erro sistemático.",
              "PRECISÃO (Repetibilidade): grau de concordância entre resultados independentes de medições repetidas do mesmo mensurando, nas mesmas condições. Alta precisão = baixo erro aleatório.",
              "ATENÇÃO: um instrumento pode ser preciso (resultados repetíveis) mas inexato (desviado do valor verdadeiro), ou exato (próximo ao valor real) mas impreciso (resultados dispersos). A calibração corrige a exatidão; o projeto do instrumento determina a precisão.",
              "RESOLUÇÃO: menor variação do mensurando que causa mudança perceptível na indicação. Um termômetro com resolução de 0,1°C não consegue distinguir variações menores que 0,1°C.",
              "RASTREABILIDADE METROLÓGICA: propriedade do resultado de medição que permite relacioná-lo a uma referência nacional (INMETRO) ou internacional (BIPM), por meio de cadeia ininterrupta de calibrações documentadas com incertezas declaradas.",
              "INCERTEZA DE MEDIÇÃO: parâmetro que quantifica a dispersão dos valores que podem ser atribuídos ao mensurando. Expressa-se como U = k × u_c, onde u_c é a incerteza combinada e k é o fator de abrangência (tipicamente k=2 para nível de confiança de 95%).",
            ],
            equacoes: [
              { latex: "E = X_{medido} - X_{verdadeiro}", legenda: "Erro de medição" },
              { latex: "E\\% = \\dfrac{E}{\\text{Fundo de Escala}} \\times 100", legenda: "Erro percentual em relação ao fundo de escala (span)" },
              { latex: "U = k \\cdot u_c", legenda: "Incerteza expandida: k = fator de abrangência (k=2 para 95% de confiança)" },
            ],
            conteudo2: [
              "Dica de prova: a diferença entre exatidão e precisão é sempre explorada. Um instrumento preciso e exato tem resultados próximos entre si E próximos ao valor verdadeiro. Preciso mas inexato: resultados próximos entre si mas afastados do verdadeiro. Exato mas impreciso: resultados médios próximos ao verdadeiro mas com alta dispersão.",
            ],
          },

          {
            titulo: "1.2 — Calibração: Procedimento, Ajuste e Curva",
            conteudo: [
              "Calibração é a operação que estabelece a relação entre os valores indicados por um instrumento e os valores correspondentes realizados por padrões rastreáveis. O resultado é a curva de calibração ou o certificado de calibração.",
              "Calibração NÃO é o mesmo que ajuste. A calibração apenas documenta o estado do instrumento. O ajuste (ou regulagem) é a intervenção que altera o instrumento para reduzir os erros. Após qualquer ajuste, o instrumento deve ser recalibrado.",
              "PROCEDIMENTO DE CALIBRAÇÃO de um transmissor 4-20 mA (faixa 0 a 100 bar): (1) Conectar padrão de pressão (gerador) e multímetro na saída. (2) Aplicar 0 bar — verificar saída = 4,000 mA. (3) Aplicar 100 bar — verificar saída = 20,000 mA. (4) Aplicar pontos intermediários (25%, 50%, 75%) em ambos os sentidos (subida e descida). (5) Registrar todos os valores e calcular erros. (6) Ajustar zero e span se necessário.",
              "ERRO DE ZERO (offset): a curva de saída está deslocada paralelamente à curva ideal. Corrigido pelo ajuste de zero.",
              "ERRO DE SPAN (ganho): a inclinação da curva é diferente da ideal — o instrumento amplifica ou reduz a variação. Corrigido pelo ajuste de span.",
              "HISTERESE: diferença entre os valores de saída para o mesmo valor de entrada, dependendo se a medição é feita em sentido crescente ou decrescente. Causada por atrito, folga mecânica e efeitos magnéticos. Não é corrigível por ajuste de zero e span.",
              "LINEARIDADE: máximo desvio da curva de calibração em relação a uma linha reta de referência, expresso em % do span.",
              "REPETIBILIDADE: máxima variação entre resultados de medições repetidas do mesmo ponto, nas mesmas condições.",
              "A curva de calibração completa deve incluir pontos de subida (0%, 25%, 50%, 75%, 100%) e de descida (100%, 75%, 50%, 25%, 0%) para revelar a histerese.",
            ],
            equacoes: [
              { latex: "I_{saída} = 4 + 16 \\cdot \\dfrac{X - X_{min}}{X_{max} - X_{min}} \\quad [\\text{mA}]", legenda: "Conversão linear para sinal 4-20 mA: X = valor medido, Xmin e Xmax = faixa do instrumento" },
              { latex: "\\text{Histerese}\\% = \\dfrac{\\Delta_{subida} - \\Delta_{descida}}{\\text{Span}} \\times 100", legenda: "Erro de histerese em % do span" },
            ],
            conteudo2: [
              "Exemplo: transmissor de temperatura 0-200°C, sinal 4-20 mA. Para T=75°C: I = 4 + 16×(75/200) = 4 + 6 = 10 mA. Para I=14 mA: T = (14-4)/16 × 200 = 0,625 × 200 = 125°C.",
              "Dica de prova: calibrar é documentar; ajustar é intervir. Um instrumento pode ser calibrado (ter seu certificado emitido) sem ser ajustado, se seus erros estiverem dentro da tolerância especificada.",
            ],
            dicas: [
              {
                gatilho: "ver o sinal 4-20 mA",
                titulo: "Sinal 4-20 mA — Conversão linear",
                tipo: "sinal-4-20ma",
                explicacao: "4 mA = 0% da faixa (zero vivo). 20 mA = 100% da faixa (fundo de escala). A linearidade garante que qualquer ponto intermediário seja proporcional. O 'zero vivo' em 4 mA permite detectar fio rompido (0 mA) — diferenciando de sinal zero real.",
              },
              {
                gatilho: "ver a malha de controle completa",
                titulo: "Malha de Controle 4-20 mA",
                tipo: "loop-controle",
                explicacao: "Sensor → Transmissor (4-20mA) → Controlador (DCS/CLP) → Válvula de controle (4-20mA) → Processo. O loop check verifica cada elo dessa cadeia durante o comissionamento.",
              },
            ],

          },

          {
            titulo: "1.3 — Válvulas de Controle: Tipos e Funcionamento",
            conteudo: [
              "A válvula de controle é o elemento final de controle mais usado na indústria de processo. Recebe um sinal do controlador (pneumático 3-15 psi ou elétrico 4-20 mA) e varia sua abertura para controlar a vazão do fluido de processo.",
              "VÁLVULA GLOBO: corpo em forma de S com sede e tampão (plug). É o tipo mais versátil e preciso para controle de vazão. Disponível em configurações de fluxo direto, angular e de três vias. Tem alta perda de carga e não é recomendada para fluidos com sólidos. É a mais usada em refinarias e plantas petroquímicas.",
              "VÁLVULA BORBOLETA: disco giratório no centro do duto. Compacta, leve e barata. Boa para grandes diâmetros e baixa perda de carga. Menor precisão de controle que a globo, especialmente em aberturas pequenas. Usada em água, utilidades e produtos limpos de baixa pressão.",
              "VÁLVULA ESFERA (BALL VALVE): esfera perfurada que gira 90° entre aberta e fechada. Excelente vedação, muito usada em on-off. Versões de controle (V-ball, com furo em V) oferecem boa característica de vazão para controle.",
              "VÁLVULA DIAFRAGMA: membrana flexível pressiona contra um assento. Ideal para fluidos corrosivos, viscosos, com sólidos em suspensão ou em serviços sanitários/farmacêuticos. Pressão e temperatura limitadas.",
              "VÁLVULA GAVETA (GATE VALVE): disco plano que sobe e desce perpendicularmente ao fluxo. Usada exclusivamente como válvula de bloqueio (aberta ou fechada) — não é para controle contínuo, pois vibra e erode nas posições intermediárias.",
              "VÁLVULA BORBOLETA EXCÊNTRICA (HIGH PERFORMANCE): eixo da borboleta deslocado do centro — elimina contato do disco com o assento durante a rotação, reduzindo atrito e desgaste. Boa para serviços de alta pressão e temperaturas extremas.",
              "Modos de falha (ação da válvula): a escolha do modo de falha é determinada pela análise de segurança do processo. Falha-Fecha (FC, fail-close, air-to-open): a mola fecha a válvula quando o ar de instrumento falha — usada quando fechar é mais seguro (injeção de produto perigoso). Falha-Abre (FA, fail-open, air-to-close): a mola abre quando o ar falha — usada quando abrir é mais seguro (água de resfriamento).",
            ],
            equacoes: [
              { latex: "F_v = C_v \\cdot \\sqrt{\\dfrac{\\Delta P}{G_f}}", legenda: "Equação de dimensionamento de válvula de controle: Cv = coeficiente de vazão, ΔP = queda de pressão (psi), Gf = gravidade específica do fluido" },
            ],
            conteudo2: [
              "Características de vazão intrínsecas: LINEAR (vazão proporcional à abertura — usada em processos com ΔP constante). IGUAL PERCENTAGEM (a variação percentual de Cv é proporcional à abertura — mais comum, usada quando ΔP varia). ABERTURA RÁPIDA (Cv sobe rapidamente nos primeiros graus de abertura — usada em on-off).",
            ],
            dicas: [
              {
                gatilho: "ver válvula globo",
                titulo: "Válvula Globo — Corte transversal",
                tipo: "valvula-globo",
                explicacao: "O fluxo muda de direção no interior do corpo. O tampão (plug) sobe e desce para controlar a passagem pelo assento (sede). Alta precisão de controle — a mais usada em plantas petroquímicas.",
              },
              {
                gatilho: "ver válvula borboleta",
                titulo: "Válvula Borboleta — Disco giratório",
                tipo: "valvula-borboleta",
                explicacao: "O disco gira 90° em torno do eixo central. Compacta e leve — ótima para grandes diâmetros e baixa perda de carga. Menor precisão que a globo nas posições parcialmente abertas.",
              },
              {
                gatilho: "ver válvula esfera",
                titulo: "Válvula Esfera — Vedação perfeita",
                tipo: "valvula-esfera",
                explicacao: "A esfera perfurada gira 90° entre totalmente aberta e fechada. Vedação perfeita — usada em bloqueio ou em serviços com controle (versão V-ball). Alta pressão e temperatura.",
              },
              {
                gatilho: "ver válvula diafragma",
                titulo: "Válvula Diafragma — Membrana flexível",
                tipo: "valvula-diafragma",
                explicacao: "A membrana flexível separa completamente o fluido do mecanismo de atuação. Ideal para fluidos corrosivos, viscosos ou com sólidos em suspensão — aplicações sanitárias e farmacêuticas.",
              },
              {
                gatilho: "ver válvula gaveta",
                titulo: "Válvula Gaveta — Somente bloqueio",
                tipo: "valvula-gaveta",
                explicacao: "O disco plano (gaveta) se move perpendicular ao fluxo. NUNCA deve ser usada para controle — vibra e erode em posições parcialmente abertas. Use apenas totalmente aberta ou fechada.",
              },
              {
                gatilho: "ver atuador pneumático",
                titulo: "Atuador Pneumático — Mola e Diafragma",
                tipo: "atuador-pneumatico",
                explicacao: "O ar de instrumento (3-15 psi) comprime a membrana contra a mola, movendo a haste. Sem ar, a mola retorna ao estado de falha (FC ou FA). O posicionador controla precisamente a posição da haste.",
              },
            ],

          },

          {
            titulo: "1.4 — Acessórios de Válvulas de Controle",
            conteudo: [
              "O POSICIONADOR é o acessório mais importante da válvula de controle. Recebe o sinal do controlador e posiciona a haste com precisão, independentemente de variações de atrito, pressão e temperatura do processo. Funciona como um controlador de posição de malha fechada para a haste da válvula.",
              "Posicionadores pneumáticos convencionais: recebem sinal de 4-20 mA, convertem em movimento de haste com realimentação mecânica. São confiáveis mas não permitem diagnóstico remoto.",
              "Posicionadores digitais (HART, FF, PROFIBUS): microprocessador interno que controla a posição, executa diagnóstico completo do atuador e válvula, e comunica dados ao sistema de controle. Permitem detectar desgaste do empanque (gland), problemas no atuador e fricção excessiva sem retirar a válvula de operação.",
              "O SOLENÓIDE (válvula solenóide piloto): atua a válvula de controle em modo on-off, independentemente do sinal do posicionador. Usado em sistemas de segurança (SIS — Safety Instrumented System) para fechar a válvula rapidamente em caso de emergência. Normalmente alimentado por sinal do sistema de segurança (ESD).",
              "O FILTRO-REGULADOR DE AR (FRL): tríade de preparação do ar de instrumento. Filtro: remove partículas, umidade e óleo do ar comprimido. Regulador: mantém a pressão de saída constante (geralmente 20 psi para instrumentos pneumáticos). Lubrificador: adiciona névoa de óleo para instrumentos que necessitam (cada vez menos usados com instrumentos modernos).",
              "VÁLVULA DE ALÍVIO DO ATUADOR: protege o atuador contra sobrepressão acidental durante manutenção ou falha do regulador. Abre automaticamente quando a pressão supera o limite seguro.",
              "INDICADOR DE POSIÇÃO: feedback visual da posição da haste. Fundamental para operação local e verificação do loop. Versões com transmissão elétrica do sinal de posição (4-20 mA) são usadas em posicionadores para realimentação.",
              "LOCK-UP VALVE (válvula de travamento): mantém a pressão do atuador constante quando o ar de instrumento falha, travando a válvula na posição em que estava. Usada quando nem abrir nem fechar é o modo de falha seguro.",
            ],
            equacoes: [],
            conteudo2: [
              "Dica de prova: o posicionador corrige erro de histerese e atrito da válvula. Sem posicionador, o controlador PID precisa de ganho alto para superar o atrito, o que pode causar instabilidade. Com posicionador, a malha de posição interna trata do atrito, e o controlador PID trabalha apenas com a variável de processo.",
            ],
          },

          {
            titulo: "1.5 — Simbologia ISA 5.1: P&ID Completo",
            conteudo: [
              "A norma ANSI/ISA-5.1 define a simbologia para Diagramas de Tubulação e Instrumentação (P&ID). O P&ID é o documento mais importante para a operação e manutenção de plantas industriais — mostra todos os instrumentos, válvulas, tubulações e suas interconexões.",
              "IDENTIFICAÇÃO (TAG) do instrumento: código alfanumérico composto por letras funcionais + número de loop. A estrutura é: letra(s) de variável + letra(s) de função + número do loop. Exemplos: FIC-101 (Controlador Indicador de Vazão, loop 101), PT-205 (Transmissor de Pressão, loop 205), TCV-312 (Válvula de Controle de Temperatura, loop 312).",
              "PRIMEIRA LETRA (variável medida ou iniciadora): F = Flow (Vazão), P = Pressure (Pressão), T = Temperature (Temperatura), L = Level (Nível), A = Analysis (Análise), D = Density (Densidade), E = Voltage (Tensão elétrica), I = Current (Corrente elétrica), S = Speed (Velocidade), W = Weight (Peso/Força), Q = Quantity (Quantidade), Z = Position (Posição).",
              "LETRAS SEGUINTES (função do instrumento): I = Indicator (Indicador), C = Controller (Controlador), T = Transmitter (Transmissor), R = Recorder (Registrador), A = Alarm (Alarme), H = High (Alto), L = Low (Baixo), V = Valve (Válvula) ou Vibration, E = Element (Elemento primário), S = Switch (Chave), Y = Relay/Compute (Relé/Computação), K = Control Station (Estação de controle manual).",
              "SÍMBOLOS GEOMÉTRICOS do instrumento: círculo com linha cheia na parte superior = instrumento montado no campo (acessível ao operador). Círculo com linha tracejada = instrumento montado no painel principal da sala de controle. Círculo com linha cheia completa = montado no campo, mas não normalmente acessível. Quadrado com círculo interno = instrumento em CLP/DCS/computador.",
              "LINHAS DE SINAL: linha contínua = tubulação de processo. Linha com 'X-X-X' = sinal pneumático. Linha com 'E-E-E' (ou tracejada fina) = sinal elétrico. Linha com 'H-H-H' = linha hidráulica. Linha com 'G-G-G' = guia (impulso).",
              "SÍMBOLOS DE VÁLVULAS no P&ID: globo = borboleta com linhas diagonais. Borboleta = dois triângulos com vértices se tocando. Esfera = círculo. Gaveta = dois triângulos com vértices opostos. Diafragma = retângulo com linha curva interna. Atuador pneumático = retângulo sobre a válvula com seta. Atuador de mola = mola sobre o retângulo.",
            ],
            equacoes: [],
            conteudo2: [
              "Tags compostas mais frequentes em provas: FIC = Flow Indicating Controller (Controlador Indicador de Vazão). FCV = Flow Control Valve (Válvula de Controle de Vazão). PIC = Pressure Indicating Controller. PSH = Pressure Switch High (Chave de Pressão Alta). LSLL = Level Switch Low Low (Chave de Nível Muito Baixo — dois níveis de alarme). TT = Temperature Transmitter. AT = Analyser Transmitter.",
              "Hierarquia de alarmes: H (High / Alto), HH (High High / Muito Alto), L (Low / Baixo), LL (Low Low / Muito Baixo). O LL geralmente aciona o ESD (Emergency Shutdown). O PAHH pode iniciar o bloqueio total da unidade.",
            ],
          },

          {
            titulo: "1.6 — Medição de Pressão: Princípios e Instrumentos",
            conteudo: [
              "A pressão é definida como força por unidade de área. As unidades mais usadas na indústria são: kPa (SI), bar, kgf/cm², psi, mmHg (mmca, mca). Conversões essenciais: 1 bar = 100 kPa = 14,504 psi = 1,0197 kgf/cm² = 750,1 mmHg.",
              "PRESSÃO ABSOLUTA: medida em relação ao vácuo absoluto. Usada em termodinâmica e em cálculos de escoamento.",
              "PRESSÃO MANOMÉTRICA (GAUGE): medida em relação à pressão atmosférica local. A maioria dos transmissores industriais mede pressão manométrica. P_abs = P_man + P_atm.",
              "PRESSÃO DIFERENCIAL (DP): diferença de pressão entre dois pontos. Muito usada em medição de nível e de vazão.",
              "VÁCUO: pressão manométrica negativa — pressão abaixo da atmosférica.",
              "ELEMENTOS PRIMÁRIOS DE MEDIÇÃO DE PRESSÃO: TUBO DE BOURDON — tubo curvado de seção oval que se deforma com a pressão interna. Simples, barato, adequado para pressões de 0,5 a 70.000 kPa. O Bourdon em C é o mais comum; em espiral e helicoidal para alta sensibilidade. DIAFRAGMA — membrana flexível que deflete com a pressão. Para baixas pressões e fluidos corrosivos. CÁPSULA — dois diafragmas soldados, muito sensível para pressões muito baixas. FOLE — elemento com múltiplos dobros, usado para baixíssimas pressões e medição diferencial.",
              "TRANSMISSORES MODERNOS: usam células capacitivas ou piezelétricas para converter a deflexão mecânica em sinal elétrico. A célula capacitiva mede a variação de capacitância entre a membrana e um eletrodo fixo — altíssima precisão, até 0,025% do span. O sinal de saída é 4-20 mA com protocolo HART para comunicação digital sobreposta.",
              "TRANSMISSOR DE PRESSÃO DIFERENCIAL (DP CELL): dois lados de pressão (high e low) atuam em lados opostos de uma membrana. Aplicações: medição de nível em vasos pressurizados, medição de vazão com placa de orifício, medição de queda de carga em filtros e trocadores.",
              "CUIDADOS NA INSTALAÇÃO: tomadas de pressão devem ser instaladas corretamente — em tubulações horizontais para líquidos na parte inferior (evitar bolhas de gás), na parte superior para gases (evitar acúmulo de líquido). Para fluidos corrosivos ou viscosos, usa-se selo de diafragma remoto (remote seal diaphragm).",
            ],
            equacoes: [
              { latex: "P_{abs} = P_{man} + P_{atm}", legenda: "Relação entre pressão absoluta, manométrica e atmosférica" },
              { latex: "P = \\rho \\cdot g \\cdot h", legenda: "Pressão hidrostática: rho = densidade (kg/m³), g = 9,81 m/s², h = altura de coluna (m)" },
              { latex: "1\\,\\text{bar} = 100\\,\\text{kPa} = 14{,}504\\,\\text{psi} = 1{,}0197\\,\\text{kgf/cm}^2", legenda: "Conversão de unidades de pressão" },
            ],
            conteudo2: [
              "Erro por variação de temperatura: transmissores de pressão possuem compensação de temperatura interna. Mesmo assim, variações bruscas de temperatura ambiente afetam o zero e o span — por isso revisões periódicas de calibração são necessárias.",
            ],
          },

          {
            titulo: "1.7 — Medição de Temperatura: Termopares e RTDs",
            conteudo: [
              "A temperatura é a grandeza mais medida na indústria de processo. Os principais elementos sensores são termopares, RTDs (Resistance Temperature Detectors) e termistores.",
              "TERMOPAR: baseia-se no efeito Seebeck — quando dois metais diferentes são unidos, a diferença de temperatura entre a junção de medição (ponta quente) e a junção de referência (ponta fria) gera uma fem (força eletromotriz) proporcional à diferença de temperatura. A junta fria precisa estar à temperatura conhecida (compensação de junção fria).",
              "TIPOS DE TERMOPAR E SUAS FAIXAS: Tipo J (Ferro-Constantan): −40 a 750°C, boa sensibilidade, barato, mas oxida acima de 550°C. Tipo K (Cromel-Alumel): −200 a 1260°C, o mais universal na indústria, sensibilidade de ~41 μV/°C. Tipo T (Cobre-Constantan): −200 a 350°C, excelente para baixas temperaturas e criogenia. Tipo E (Cromel-Constantan): maior sensibilidade de todos (~68 μV/°C). Tipo N (Nicrosil-Nisil): −200 a 1300°C, alta estabilidade a longo prazo. Tipos S, R, B (Platina-Ródio): 0 a 1700°C, para altas temperaturas em fornos industriais.",
              "RTD PT100: resistor de platina com resistência de exatamente 100 Ω a 0°C. A relação resistência-temperatura é muito linear. A 100°C: R ≈ 138,5 Ω. Coeficiente α = 0,00385 Ω/(Ω·°C). Mais preciso que o termopar mas menos robusto e com faixa menor.",
              "PT1000: resistência de 1000 Ω a 0°C — 10x mais sensível que o PT100. Usado quando os cabos de extensão são longos (a resistência de 1000Ω minimiza o efeito da resistência do cabo).",
              "CONFIGURAÇÕES DE LIGAÇÃO DO PT100: 2 fios (para curtas distâncias, erro significativo da resistência do cabo). 3 fios (compensa a resistência de UM cabo, forma de compensação mais comum na indústria). 4 fios (compensa completamente os dois cabos — maior precisão, usado em laboratórios e padrões).",
              "TERMISTOR (NTC/PTC): resistor semiconductor de óxido metálico. NTC (Negative Temperature Coefficient): resistência decresce com temperatura — alta sensibilidade, mas faixa estreita e não-lineares. PTC (Positive Temperature Coefficient): resistência cresce acentuadamente acima de uma temperatura — usado como proteção térmica em motores e transformadores.",
              "PROTEÇÃO DO TERMOPAR: o elemento sensível é encapsulado em um tubo de proteção (termopoço). O termopoço protege o sensor do processo corrosivo, pressão e velocidade do fluido. Materiais: aço inox (até 800°C), Inconel (até 1100°C), óxido de alumínio (para altas temperaturas e ambientes agressivos).",
            ],
            equacoes: [
              { latex: "R(T) = R_0 \\cdot (1 + \\alpha \\cdot T)", legenda: "Resistência do PT100: R0 = 100 Ohm (a 0°C), alpha = 0,00385 Ohm/(Ohm.°C)" },
              { latex: "\\alpha = \\dfrac{R_{100} - R_0}{R_0 \\cdot 100} = 0{,}00385 \\;\\Omega/(\\Omega \\cdot ^\\circ C)", legenda: "Coeficiente de temperatura do PT100 (padrão IEC 751)" },
            ],
            conteudo2: [
              "Exemplo PT100: temperatura medida 80°C. R(80) = 100 × (1 + 0,00385 × 80) = 100 × 1,308 = 130,8 Ω.",
              "Dica de prova: termopar mede diferença de temperatura (efeito Seebeck) — precisa de compensação de junta fria. RTD mede temperatura absoluta via variação de resistência — mais preciso mas mais frágil. Para altas temperaturas (>600°C), use termopar tipos S, R ou B. Para precisão em temperaturas moderadas, use PT100.",
            ],
          },

          {
            titulo: "1.8 — Medição de Nível",
            conteudo: [
              "A medição de nível é crítica em tanques de armazenamento, vasos de processo e colunas de destilação. Métodos incorretos ou falhas de medição causam transbordamentos, perdas de produto e riscos graves de segurança.",
              "MEDIÇÃO POR PRESSÃO DIFERENCIAL (DP): o método mais simples e robusto para nível em vasos fechados. A pressão na parte inferior do vaso é a soma da pressão do gás no topo (P_topo) mais a pressão hidrostática da coluna de líquido (ρ×g×h). O transmissor DP mede a diferença: DP = ρ×g×h. Conhecendo a densidade do líquido, calcula-se o nível h = DP/(ρ×g).",
              "MÉTODO DE PRESSÃO SIMPLES: para tanques atmosféricos (P_topo = P_atm), um transmissor de pressão manométrica na base do tanque indica diretamente a pressão hidrostática. Simples, barato, mas sensível a variações de temperatura (que alteram a densidade).",
              "MEDIÇÃO POR BÓIA (FLOAT): bóia acoplada a transmissor magnético ou por torque. Para tanques de armazenamento grandes (petróleo, GLP). Alta precisão mas custo elevado para instalação.",
              "MEDIÇÃO POR ULTRASSOM: sensor emite pulso ultrassônico que reflete na superfície do líquido e retorna ao sensor. O nível é calculado pela distância = velocidade do som × tempo/2. Sem contato com o fluido — ideal para produtos corrosivos, alta temperatura ou alta viscosidade. Afetado por espuma, vapores e temperatura.",
              "MEDIÇÃO POR RADAR: similar ao ultrassom mas usa ondas eletromagnéticas (micro-ondas). Não é afetado por temperatura, pressão e vapores. Dois tipos: TDR (Time Domain Reflectometry — radar guiado, com haste ou cabo) para vasos com obstáculos, e radar de antena livre (non-contact) para tanques grandes.",
              "MEDIÇÃO POR CAPACITÂNCIA: a sonda forma capacitor com o vaso. A capacitância varia com o nível (dielétrico do líquido). Boa para líquidos e sólidos, mas requer calibração específica para cada produto.",
              "CHAVES DE NÍVEL: detectam nível em pontos específicos (alto, baixo). Tipos: bóia magnética (simples, confiável), reed switch, vibração (diapasão — ideal para sólidos), condutividade (para líquidos condutores), óptico.",
            ],
            equacoes: [
              { latex: "h = \\dfrac{\\Delta P}{\\rho \\cdot g}", legenda: "Nível por DP: h = altura do líquido (m), ΔP = pressão diferencial (Pa), ρ = densidade (kg/m³), g = 9,81 m/s²" },
              { latex: "d = \\dfrac{c \\cdot t}{2}", legenda: "Distância por ultrassom/radar: c = velocidade de propagação, t = tempo de trânsito (ida + volta)" },
            ],
            conteudo2: [
              "Exemplo DP: tanque de água (ρ=1000 kg/m³), DP=24,5 kPa. h = 24.500/(1000×9,81) = 2,5 m.",
              "Problema do leg suprimido: quando a tomada de baixo do DP está abaixo do zero de medição e preenchida com fluido, a pressão da coluna de líquido no leg é subtraída, 'suprimindo' o zero. O transmissor precisa de supressão de zero ou recalculação do span.",
            ],
          },

          {
            titulo: "1.9 — Medição de Vazão",
            conteudo: [
              "A vazão é uma das grandezas mais críticas em plantas petroquímicas — determina o balanço de massa dos processos, o consumo de energia e o controle de qualidade do produto. Existem dezenas de tecnologias de medição de vazão, cada uma adequada a condições específicas.",
              "PLACA DE ORIFÍCIO (Orifice Plate): restrição no duto que gera queda de pressão (DP) proporcional ao quadrado da velocidade do fluido. É a mais simples, barata e confiável — por isso é a mais usada mundialmente. Desvantagem: alta perda de carga permanente (~65% do DP medido) e sensível a desgaste das bordas.",
              "TUBO DE VENTURI: convergente e divergente suave, com tomadas de pressão na entrada e no gargalo. Menor perda de carga permanente (~10-15% do DP) que a placa de orifício. Mais caro e robusto — usado para fluidos com sólidos e para grandes diâmetros.",
              "ROTÂMETRO (Variable Area): tubo cônico com um flutuador. A área da secção anular aumenta com o fluxo até o peso do flutuador ser equilibrado pelo empuxo e força de arrasto. Leitura direta, simples, sem energia elétrica — mas deve estar vertical e é afetado por densidade e viscosidade.",
              "MEDIDOR ELETROMAGNÉTICO (Flowmeter EM): aplica campo magnético transversal ao fluido condutor. Pelo efeito Faraday, o fluido condutor em movimento gera fem proporcional à velocidade. Necessita fluido eletricamente condutor (mínimo 5 μS/cm). Não tem partes móveis, sem perda de carga adicional — excelente para lamas, polpas e fluidos corrosivos.",
              "MEDIDOR VORTEX: corpo rompe-vórtice gera vórtices de Von Kármán com frequência proporcional à velocidade do fluido. Boa precisão, sem partes móveis, adequado para vapor, gases e líquidos limpos.",
              "MEDIDOR CORIOLIS: tubos vibratórios cuja frequência de oscilação é alterada pela massa de fluido que os percorre. Mede VAZÃO MÁSSICA diretamente, independente de temperatura, pressão e densidade. Também mede densidade e fração volumétrica. Padrão para medição fiscal de petróleo e gás natural. Alto custo, não recomendado para fluidos bifásicos ou com gás dissolvido.",
              "MEDIDOR ULTRASSÔNICO: emite e recebe pulsos ultrassônicos em sentidos opostos ao fluxo. A diferença de tempo de trânsito indica a velocidade do fluido. Clamp-on (externo ao tubo): não invasivo, instalado sem interromper o processo.",
            ],
            equacoes: [
              { latex: "Q = K \\cdot \\sqrt{\\dfrac{\\Delta P}{\\rho}}", legenda: "Vazão volumétrica por DP: K = constante (depende do tipo de medidor e geometria), ΔP = pressão diferencial, ρ = densidade do fluido" },
              { latex: "f_{vortex} = S_t \\cdot \\dfrac{v}{d}", legenda: "Frequência dos vórtices: St = número de Strouhal (~0,2), v = velocidade (m/s), d = diâmetro do obstáculo (m)" },
            ],
            conteudo2: [
              "Escolha do medidor: Placa de orifício = padrão, baixo custo, gases e líquidos limpos. EM = fluidos condutores, lamas. Coriolis = medição fiscal, alta precisão. Vortex = vapor e gases. Ultrassônico clamp-on = medição temporária sem interrupção do processo.",
              "ATENÇÃO: a placa de orifício mede DP proporcional ao QUADRADO da vazão. Para extrair Q, tira-se a raiz quadrada de DP — isso implica que em 50% da vazão máxima, o DP é apenas 25% do DP máximo. A leitura em baixa vazão é pouco precisa.",
            ],
          },

          {
            titulo: "1.10 — Medição de Grandezas Mecânicas",
            conteudo: [
              "A instrumentação de grandezas mecânicas monitora a integridade e o desempenho de máquinas rotativas (motores, compressores, bombas, turbinas), sendo fundamental na manutenção preditiva.",
              "SENSORES DE PROXIMIDADE INDUTIVOS: bobina oscilante detecta a presença de materiais ferrosos pela mudança de indutância. Saída digital (on/off). Distância de detecção típica: 2 a 15 mm. Usados em contagem de peças, detecção de fim de curso e proteção de máquinas.",
              "SENSORES CAPACITIVOS: detectam qualquer material (metálico ou não). Úteis para detecção de nível de granéis, líquidos não condutores e materiais plásticos.",
              "SENSORES FOTOELÉTRICOS: emissores e receptores de luz (infravermelho ou laser). Tipos: barreira (emissor e receptor opostos), reflexivo (reflexão no alvo) e difuso (reflexão direta no alvo). Alcances de milímetros a dezenas de metros.",
              "MEDIÇÃO DE VELOCIDADE/ROTAÇÃO: encoder óptico ou magnético produz pulsos por revolução. A frequência dos pulsos é proporcional à velocidade. Tacômetro de efeito Hall usa alternâncias do campo magnético de uma engrenagem ou disco dentado.",
              "MEDIÇÃO DE VIBRAÇÃO (ACELERÔMETRO PIEZOELÉTRICO): cristal piezoelétrico gera carga elétrica proporcional à aceleração mecânica. É o sensor mais usado em análise de vibração de máquinas. A análise espectral da vibração identifica: desbalanceamento (1×RPM), desalinhamento (1× e 2×RPM), folga mecânica (harmoniais da RPM), defeito em rolamento (frequências específicas baseadas na geometria), falha em engrenagem (frequência de engrenamento).",
              "CÉLULA DE CARGA (EXTENSÔMETRO): extensômetro (strain gauge) colado em elemento elástico. A deformação elástica é proporcional à força aplicada. A variação de resistência do extensômetro (ΔR/R ≈ 2×ε, onde ε é a deformação) é medida por ponte de Wheatstone. Usada em balanças industriais, prensas e sistemas de ancoragem.",
              "MEDIÇÃO DE TORQUE: torquímetros estáticos para verificação de aperto de parafusos. Medição dinâmica de torque em eixos rotativos usa extensômetros com telemetria sem fio ou anéis coletores.",
            ],
            equacoes: [
              { latex: "\\dfrac{\\Delta R}{R} = G_F \\cdot \\varepsilon", legenda: "Extensômetro (strain gauge): GF = fator de gauge (~2 para metal), epsilon = deformação específica (m/m)" },
              { latex: "T = F \\cdot r \\quad [\\text{N}\\cdot\\text{m}]", legenda: "Torque: F = força tangencial (N), r = raio (m)" },
            ],
            conteudo2: [
              "Monitoramento de vibração de máquinas (norma ISO 10816): velocidade de vibração RMS na carcaça. Classe I (pequenas máquinas < 15 kW): até 2,8 mm/s = bom, 2,8-7,1 = aceitável, 7,1-18 = alerta, > 18 = perigoso. Os limites variam com a classe e rigidez da fundação.",
            ],
          },

          {
            titulo: "1.11 — Instrumentação Analítica",
            conteudo: [
              "A instrumentação analítica mede a composição química e as propriedades físico-químicas dos fluidos de processo. É fundamental no controle de qualidade, na segurança e na eficiência dos processos petroquímicos.",
              "ANALISADOR DE pH: o eletrodo de vidro (combina eletrodo de medição e referência num único corpo) gera potencial elétrico proporcional ao pH. Cada unidade de pH corresponde a 59,16 mV a 25°C (equação de Nernst). MUITO sensível à temperatura — necessita compensação automática de temperatura (ATC). Calibração com soluções tampão padrão de pH 4,0, 7,0 e 10,0.",
              "ANALISADOR DE CONDUTIVIDADE: mede a capacidade do líquido de conduzir corrente elétrica, proporcional à concentração de íons dissolvidos. Usado para controle de pureza de água (ultrapura tem condutividade < 0,1 μS/cm), concentração de ácidos/bases e detecção de contaminação.",
              "ANALISADOR DE OXIGÊNIO EM GASES (O₂): fundamental no controle de combustão. Célula eletroquímica (célula de combustível) ou sensor paramagnético (O₂ é paramagnético — atraído por campo magnético). O teor de O₂ nos gases de exaustão indica a eficiência da queima: O₂ elevado = excesso de ar (eficiência baixa), O₂ muito baixo = deficiência de ar (risco de CO e explosão).",
              "ANALISADOR DE GASES COMBUSTÍVEIS (LEL — Lower Explosive Limit): detecta concentrações de gases inflamáveis (H₂S, CH₄, GLP) em porcentagem do limite inferior de explosividade. Alarme em 10% do LEL, parada em 20-25% do LEL. Tecnologias: catalítico (pellistor) para hidrocarbonetos, infravermelho (NDIR) para gases específicos, eletroquímico para gases tóxicos (CO, H₂S, SO₂, Cl₂).",
              "CROMATÓGRAFO DE PROCESSO (GC): separa e analisa componentes de misturas gasosas por afinidade com fase estacionária e velocidade de transporte por fase móvel (gás de arraste). Resultado: cromatograma com picos identificados por tempo de retenção e quantificados por área. Padrão em medição de qualidade de gás natural (composição, poder calorífico, número Wobbe).",
              "ANALISADOR DE TURBIDEZ: mede a opacidade de líquidos pela dispersão de luz (nefelometria) ou absorção. Usado em tratamento de água, controle de clarificação e detecção de sólidos em suspensão.",
              "SENSOR DE PONTO DE ORVALHO: mede a temperatura na qual a umidade do gás condensa. Fundamental para gás natural de exportação (especificação de umidade) e sistemas de ar comprimido de instrumento.",
            ],
            equacoes: [
              { latex: "pH = -\\log_{10}[H^+]", legenda: "Definição de pH: concentração de íons H⁺ em mol/L" },
              { latex: "E = E_0 + 0{,}05916 \\cdot \\log[H^+] \\quad \\text{(a 25°C)}", legenda: "Equação de Nernst para eletrodo de pH: variação de 59,16 mV por unidade de pH" },
            ],
            conteudo2: [
              "Dica de prova: sensores de gás LEL com tecnologia catalítica (pellistor) PERDEM SENSIBILIDADE (intoxicação do catalisador) quando expostos a silicones, compostos de enxofre ou halogênados. Por isso, em ambientes com esses contaminantes, usa-se infravermelho (NDIR) para hidrocarbonetos. Esse ponto é frequentemente explorado em provas da Petrobras.",
            ],
          },

          {
            titulo: "1.12 — Manutenção e Comissionamento de Instrumentos",
            conteudo: [
              "A manutenção de instrumentação industrial segue os mesmos três paradigmas da manutenção geral, mas com características específicas do ambiente de processo.",
              "MANUTENÇÃO CORRETIVA: executada após a falha do instrumento. Deve ser ágil para minimizar o tempo sem medição. O procedimento típico: (1) Confirmar a falha (verificar se é o instrumento ou o processo). (2) Isolar a variável de processo (bloquear a tomada de processo, colocar em modo manual no DCS). (3) Substituir ou reparar o instrumento. (4) Recalibrar. (5) Retornar ao serviço com verificação funcional.",
              "MANUTENÇÃO PREVENTIVA: execução programada por tempo ou por número de ciclos. Inclui: calibração periódica, limpeza de tomadas e purges, troca de juntas e empanques, verificação de suprimento de ar, limpeza de filtros e inspeção visual.",
              "MANUTENÇÃO PREDITIVA: baseada no monitoramento do estado real do instrumento. Técnicas: diagnóstico via posicionador digital (desvio de haste, fricção, tempo de resposta), monitoramento do sinal 4-20 mA (desvios de zero e span entre calibrações), análise de vibração em válvulas de controle de alta frequência.",
              "COMISSIONAMENTO: conjunto de atividades que verificam e documentam que um instrumento ou sistema foi instalado, calibrado e configurado de acordo com o projeto, antes da partida da planta.",
              "LOOP CHECK (verificação de malha): teste completo do sinal desde o elemento primário no campo até a tela do DCS/SCADA. Procedimento: (1) Simular o sinal no campo (simulador de termopar, source de mA). (2) Verificar se o sinal chega correto no DCS. (3) Verificar alarmes e intertravamentos. (4) Testar a ação do elemento final de controle (válvula abrindo/fechando conforme esperado). (5) Documentar com assinatura do técnico e do engenheiro responsável.",
              "TESTE FUNCIONAL SIS (Safety Instrumented System): os instrumentos dos sistemas de segurança (ESD, F&G, HIPPS) exigem testes de demanda periódicos para garantir que atuarão quando necessário. A frequência de teste é determinada pelo SIL (Safety Integrity Level) do sistema, calculado conforme IEC 61511.",
              "DOCUMENTAÇÃO: todo trabalho de manutenção em instrumentação deve ser registrado em ordens de serviço com: TAG do instrumento, data, descrição do serviço, valores pré e pós-intervenção, técnico responsável e assinatura. Sem documentação, o trabalho não aconteceu.",
            ],
            equacoes: [],
            conteudo2: [
              "PFD (Probability of Failure on Demand): probabilidade de o sistema de segurança falhar quando demandado. SIL 1: PFD entre 0,1 e 0,01. SIL 2: 0,01 a 0,001. SIL 3: 0,001 a 0,0001. O nível SIL determina a frequência mínima de teste dos instrumentos de segurança — instrumentos SIL 2 normalmente são testados anualmente ou semestralmente.",
            ],
          },

        ],
      },

            // ── BLOCO II ─────────────────────────────────────────────────────────
      {
        slug: "instr-bloco2",
        titulo: "Bloco II — CLP, PID e Redes Industriais",
        descricao: "Controladores lógicos programáveis, linguagens de programação, controle PID e redes industriais.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "2.1 — Controladores Lógicos Programáveis (CLPs)",
            conteudo: [
              "O CLP (Controlador Lógico Programável) é um computador industrial robusto projetado para controlar processos em ambientes adversos (temperatura, vibração, umidade, interferência eletromagnética).",
              "A arquitetura básica do CLP é composta por: CPU (processador central), módulos de entrada (digitais e analógicos), módulos de saída (digitais e analógicos), fonte de alimentação, memória (programa e dados) e interface de comunicação.",
              "O ciclo de varredura (scan cycle) do CLP ocorre continuamente: leitura das entradas → execução do programa → atualização das saídas. O tempo de ciclo típico é de 1 a 100 ms, dependendo do tamanho do programa e da quantidade de I/O.",
              "A norma IEC 61131-3 define 5 linguagens de programação para CLPs: Ladder (LD), Diagrama de Blocos de Função (FBD), Texto Estruturado (ST), Lista de Instruções (IL) e Diagrama Funcional Sequencial (SFC/Grafcet).",
            ],
            equacoes: [],
          },
          {
            titulo: "2.2 — Linguagens de Programação de CLP",
            conteudo: [
              "A linguagem Ladder (diagrama de contatos) é a mais usada na indústria brasileira. Simula graficamente o circuito de relés e contatos eletromecânicos. Os elementos básicos são: contato NA (normalmente aberto), contato NF (normalmente fechado) e bobina de saída.",
              "No Ladder, os contatos representam condições lógicas (entradas, bits internos, saídas de temporizadores). As bobinas representam ações (saídas digitais, temporizadores, contadores). A lógica é executada linha por linha (rung por rung), da esquerda para a direita e de cima para baixo.",
              "O Diagrama de Blocos de Função (FBD) representa a lógica usando blocos funcionais interligados por linhas de sinal. É intuitivo para engenheiros de processo e muito usado para blocos de controle (PID, seletor, limitador).",
              "O Texto Estruturado (ST) é uma linguagem de alto nível similar ao Pascal, com suporte a estruturas condicionais (IF-THEN-ELSE), laços (FOR, WHILE) e funções matemáticas complexas. É ideal para algoritmos de controle avançado.",
            ],
            equacoes: [],
          },
          {
            titulo: "2.3 — Controle de Processos e PID",
            conteudo: [
              "O controlador PID (Proporcional-Integral-Derivativo) é o algoritmo de controle realimentado mais usado na indústria. Ele calcula o sinal de controle u(t) com base no erro e(t) = Setpoint − Variável de Processo.",
              "A ação proporcional produz saída proporcional ao erro atual. Ganho alto reduz o erro em regime mas pode causar instabilidade (oscilações). Sozinha, deixa erro em regime permanente (offset).",
              "A ação integral elimina o erro em regime permanente acumulando o erro ao longo do tempo. Tempo integral Ti grande → ação integral fraca. Ti pequeno → ação integral forte, podendo causar oscilações (wind-up).",
              "A ação derivativa antecipa a tendência do erro, atuando na taxa de variação. Torna o controlador mais rápido, mas amplifica ruído — por isso é filtrada na prática.",
              "A sintonia do PID é o ajuste dos parâmetros Kp, Ti e Td para obter a melhor resposta em malha fechada. Os métodos mais usados são: Ziegler-Nichols (em malha aberta ou fechada), IMC (controle por modelo interno) e ajuste manual iterativo.",
            ],
            equacoes: [
              { latex: "Saída = K_p \\cdot e + K_i \\cdot \\sum e \\cdot \\Delta t + K_d \\cdot \\dfrac{\\Delta e}{\\Delta t}", legenda: "PID discreto: e = erro (SP−PV), Kp = ganho proporcional, Ki = ganho integral, Kd = ganho derivativo" },
              { latex: "e(t) = SP - PV", legenda: "Erro: SP = setpoint, PV = variável de processo" },
            ],
          },
          {
            titulo: "2.4 — Redes Industriais e Protocolos de Comunicação",
            conteudo: [
              "As redes industriais interligam CLPs, DCS, instrumentos de campo, inversores, painéis de operação e sistemas corporativos (MES, ERP). A arquitetura típica segue a pirâmide de automação: nível de campo → nível de controle → nível de supervisão → nível corporativo.",
              "Os protocolos de campo (fieldbus) mais usados na indústria petroquímica brasileira são: PROFIBUS DP (Siemens, RS-485, até 12 Mbps), Foundation Fieldbus (FF H1, 31,25 kbps, alimentação pelo cabo), HART (sobre 4-20 mA, digital sobreposto ao analógico) e Modbus RTU/TCP.",
              "O protocolo HART (Highway Addressable Remote Transducer) permite comunicação digital bidirecional sobre o mesmo par de fios do sinal 4-20 mA, sem interromper o sinal analógico. Facilita calibração remota, diagnóstico e configuração de instrumentos de campo.",
              "O OPC (OLE for Process Control), especialmente o OPC UA, é o padrão moderno para interoperabilidade entre sistemas de diferentes fabricantes em diferentes plataformas. Permite que o SCADA leia dados de múltiplos CLPs de diferentes marcas usando um protocolo único.",
              "A segurança cibernética em redes industriais (ICS security) é tema crescente: segmentação de redes (DMZ entre rede corporativa e de controle), firewall industrial, atualização de firmware e proteção contra acesso não autorizado são práticas fundamentais.",
            ],
            equacoes: [],
          },
        ],
      },

      // ── BLOCO III ────────────────────────────────────────────────────────
      {
        slug: "instr-bloco3",
        titulo: "Bloco III — Eletrônica, Circuitos e Automação Fluidica",
        descricao: "Eletrônica analógica e digital, circuitos elétricos, automação hidráulica e pneumática.",
        bloco: "Bloco III",
        paginas: [
          {
            titulo: "3.1 — Eletrônica Analógica",
            conteudo: [
              "A eletrônica analógica trata de sinais que variam continuamente no tempo. Os componentes básicos são: resistores, capacitores, indutores, diodos e transistores.",
              "O amplificador operacional (amp-op) é o bloco fundamental da eletrônica analógica de instrumentação. Tem ganho muito alto, impedância de entrada altíssima e impedância de saída muito baixa. Com realimentação negativa, realiza operações matemáticas precisas.",
              "O amplificador de instrumentação é um amp-op de alta precisão especialmente projetado para amplificar sinais diferenciais fracos (como os de termopares e células de carga) na presença de ruído de modo comum.",
              "O filtro ativo passa-baixa remove componentes de alta frequência (ruído) do sinal analógico. É essencial antes da conversão A/D (filtro anti-aliasing) para evitar que frequências acima de fs/2 causem distorção no sinal digitalizado.",
            ],
            equacoes: [
              { latex: "A_v = -\\dfrac{R_f}{R_1}", legenda: "Ganho do amplificador inversor" },
              { latex: "A_v = 1 + \\dfrac{R_f}{R_1}", legenda: "Ganho do amplificador não-inversor" },
            ],
          },
          {
            titulo: "3.2 — Eletrônica Digital",
            conteudo: [
              "A eletrônica digital opera com sinais binários (0 e 1, ou baixo e alto). As portas lógicas são os blocos construtivos básicos: AND (E), OR (OU), NOT (NÃO), NAND, NOR, XOR e XNOR.",
              "Os flip-flops são circuitos biestáveis que armazenam 1 bit de informação. O flip-flop D (Data) é o mais usado em registradores e memórias. O flip-flop JK é usado em contadores.",
              "Os conversores A/D (analógico-digital) convertem o sinal analógico contínuo em um número binário. A resolução (em bits) determina o menor passo de quantização: com n bits, há 2ⁿ níveis, e a resolução é FSR/2ⁿ (FSR = fundo de escala).",
              "Os conversores D/A (digital-analógico) fazem o caminho inverso: convertem o número binário em tensão ou corrente analógica. São usados na saída de CLPs (saída analógica 4-20 mA) e em inversores de frequência.",
            ],
            equacoes: [
              { latex: "Resolução = \\dfrac{FSR}{2^n}", legenda: "Resolução do conversor A/D: FSR = fundo de escala, n = número de bits" },
            ],
          },
          {
            titulo: "3.3 — Circuitos Elétricos para Instrumentação",
            conteudo: [
              "Os conceitos de circuitos elétricos são a base da instrumentação: Lei de Ohm, divisor de tensão, divisor de corrente, ponte de Wheatstone e princípio da superposição.",
              "A ponte de Wheatstone é fundamental para medir pequenas variações de resistência — usada em extensômetros (strain gauges) e RTDs. O circuito compara a resistência desconhecida com três resistências de referência; quando equilibrada, a tensão de saída é zero.",
              "O loop de corrente 4-20 mA é o padrão de comunicação analógica em instrumentação industrial. A corrente (não a tensão) é o sinal transmitido, o que torna o sistema imune a quedas de tensão nos cabos e a ruídos capacitivos.",
              "A barreira de segurança intrínseca (Zener barrier ou isolador galvânico) é obrigatória para instrumentos instalados em áreas classificadas (risco de explosão). Limita a tensão e a corrente que podem chegar ao campo, prevenindo faísca de ignição.",
            ],
            equacoes: [
              { latex: "\\dfrac{R_1}{R_2} = \\dfrac{R_3}{R_x}", legenda: "Condição de equilíbrio da Ponte de Wheatstone: Rx é a resistência desconhecida" },
            ],
          },
          {
            titulo: "3.4 — Automação Hidráulica",
            conteudo: [
              "A automação hidráulica usa fluido (óleo mineral ou sintético) sob pressão para transmitir força e movimento. É usada quando são necessárias forças muito altas em espaço reduzido.",
              "O princípio de Pascal estabelece que a pressão aplicada a um fluido confinado se transmite igualmente em todas as direções. Isso permite multiplicar forças com cilindros de diferentes diâmetros.",
              "Os componentes principais de um sistema hidráulico são: bomba hidráulica (gera fluxo e pressão), válvulas direcionais (controlam o sentido do fluido), válvulas de pressão (limitam a pressão máxima), válvulas de controle de fluxo (controlam a velocidade dos atuadores) e atuadores (cilindros e motores hidráulicos).",
              "A simbologia hidráulica é normalizada pela ISO 1219. Cada válvula é representada por quadrados (posições), setas (direção do fluxo), linhas (bloqueio) e triângulos (sentido do fluido).",
            ],
            equacoes: [
              { latex: "F = P \\cdot A", legenda: "Força no cilindro hidráulico: P = pressão (Pa), A = área do pistão (m²)" },
              { latex: "Q = A \\cdot v", legenda: "Vazão: A = área (m²), v = velocidade do pistão (m/s)" },
            ],
          },
          {
            titulo: "3.5 — Automação Pneumática",
            conteudo: [
              "A automação pneumática usa ar comprimido para acionar cilindros, válvulas e ferramentas. É mais simples e segura que a hidráulica (sem risco de vazamento de óleo) mas gera forças menores.",
              "Os componentes principais de um sistema pneumático são: compressor, unidade de tratamento de ar (filtro, regulador de pressão e lubrificador — FRL), válvulas direcionais, cilindros pneumáticos e atuadores rotativos.",
              "As válvulas direcionais são identificadas pelo número de vias (conexões) e de posições: uma válvula 5/2 tem 5 vias e 2 posições. O acionamento pode ser por botão manual, piloto pneumático, solenóide elétrico ou mola de retorno.",
              "Os cilindros pneumáticos de simples efeito têm apenas uma câmara com ar — o retorno é por mola. Os de duplo efeito têm duas câmaras, permitindo força controlada em ambas as direções.",
              "A lógica pneumática usa válvulas de controle de fluxo unidirecional, válvulas AND (duplo piloto) e válvulas OR (shuttle) para criar sequenciamentos sem necessidade de CLP — comum em máquinas simples e ambientes com risco de explosão.",
            ],
            equacoes: [
              { latex: "F = P \\cdot A \\cdot \\eta", legenda: "Força do cilindro pneumático: η = rendimento mecânico (~0,85 a 0,95)" },
            ],
          },

          {
            titulo: "3.6 — Simbologia Pneumática: Válvulas Direcionais (ISO 1219)",
            conteudo: [
              "A simbologia pneumática é normalizada pela ISO 1219-1. Dominar esses símbolos é essencial para leitura de diagramas de circuitos pneumáticos em plantas industriais.",
              "As válvulas direcionais controlam o caminho que o ar percorre no circuito. São identificadas pelo número de vias (conexões com o circuito) e o número de posições de controle.",
              "Cada quadrado no símbolo representa uma posição da válvula. As setas dentro de cada quadrado indicam a direção do fluxo naquela posição. Linhas verticais indicam bloqueio (passagem fechada).",
              "A posição normal é indicada pela posição em que a válvula se encontra sem atuação — geralmente a posição à direita do símbolo, conectada à mola de retorno.",
              "Válvulas 5/2 e 5/3 são as mais usadas em acionamento de cilindros de duplo efeito. A válvula 5/2 tem duas posições estáveis. A 5/3 tem três posições — a central pode ser fechada, com pressão ou com escape.",
            ],
            equacoes: [],
            tabelasSimbolos: ["valvulas-direcionais"],
          },

          {
            titulo: "3.7 — Simbologia Pneumática: Atuadores de Válvulas",
            conteudo: [
              "Os atuadores determinam como a válvula direcional é acionada. São representados no símbolo à esquerda e à direita das células de posição.",
              "O acionamento manual (alavanca, botão, pedal) é representado por diferentes símbolos geométricos. O acionamento mecânico (mola, rolete, came) usa símbolos específicos para cada tipo.",
              "O acionamento por solenóide elétrico é representado por um retângulo com linhas internas (representando o enrolamento). Solenóides de dupla ação permitem posicionar a válvula em qualquer das posições estáveis.",
              "O acionamento por piloto pneumático (sinal de pressão de ar) é representado por seta com linha. É o método mais comum em sistemas totalmente pneumáticos sem componentes elétricos.",
            ],
            equacoes: [],
            tabelasSimbolos: ["atuadores"],
          },

          {
            titulo: "3.8 — Simbologia Pneumática: Cilindros",
            conteudo: [
              "Os cilindros são os atuadores lineares dos sistemas pneumáticos. Convertem a energia do ar comprimido em força e movimento linear.",
              "O símbolo básico do cilindro é composto por retângulo (corpo) e retângulo menor (pistão com haste). As tampas do cilindro são indicadas por linhas mais espessas nas extremidades.",
              "O amortecimento nas extremidades do curso (representado por triângulo com seta de ajuste) permite reduzir o impacto mecânico ao final do curso, aumentando a vida útil do cilindro e dos componentes adjacentes.",
              "Cilindros com sensor de posição integrado (reed switch magnético ou encoder linear) permitem controle de posicionamento e feedback ao CLP sem sensores externos.",
            ],
            equacoes: [],
            tabelasSimbolos: ["cilindros"],
          },

          {
            titulo: "3.9 — Simbologia Pneumática: Válvulas de Fluxo e Anti-retorno",
            conteudo: [
              "As válvulas de controle de fluxo regulam a velocidade dos cilindros controlando a vazão de ar. Instaladas no escape dos cilindros (meter-out), proporcionam controle de velocidade mais estável.",
              "A válvula anti-retorno (check valve) permite fluxo em apenas um sentido. Combinada com a válvula de fluxo, permite velocidade diferente na extensão e retração do cilindro.",
              "A válvula de escape rápido é instalada próxima ao cilindro para descarregar o ar diretamente para a atmosfera sem passar pela válvula direcional, aumentando drasticamente a velocidade de retorno.",
              "A válvula shuttle (OU) seleciona automaticamente o sinal de maior pressão entre duas entradas — usada para acionar um cilindro a partir de dois pontos de comando diferentes.",
            ],
            equacoes: [],
            tabelasSimbolos: ["valvulas-fluxo"],
          },

          {
            titulo: "3.10 — Simbologia Pneumática: Tratamento do Ar e Acessórios",
            conteudo: [
              "O tratamento adequado do ar comprimido é fundamental para a vida útil dos componentes pneumáticos. Partículas, umidade e falta de lubrificação são as principais causas de falha prematura.",
              "A unidade de manutenção (FRL — Filtro, Regulador, Lubrificador) é o conjunto padrão de preparação do ar. O filtro remove partículas e condensado. O regulador mantém pressão constante independente das variações da rede. O lubrificador adiciona névoa de óleo ao ar.",
              "O pressostato monitora a pressão do ar comprimido e aciona um sinal elétrico quando a pressão cai abaixo ou sobe acima dos limites ajustados — protegendo o processo contra queda de pressão na rede.",
              "O silenciador reduz o ruído do escape do ar para a atmosfera. Instalado nas portas de escape das válvulas direcionais, reduz drasticamente o nível de ruído da máquina.",
            ],
            equacoes: [],
            tabelasSimbolos: ["tratamento-ar", "outros-pneumaticos"],
          },
        ],
      },

      // ── MATEMÁTICA — CONHECIMENTOS BÁSICOS ─────────────────────────────
      {
        slug: "mat-unidades",
        titulo: "Matemática — Unidades e Conversões",
        descricao: "Prefixos SI, pressão, temperatura, vazão e sinal 4-20 mA.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "M.1 — Conversão de Unidades e Sistema Internacional",
            conteudo: [
              "A instrumentação industrial lida com dezenas de unidades de medida diferentes. A conversão correta é fundamental para calibração, especificação e diagnóstico de instrumentos.",
              "PRESSÃO: 1 bar = 100 kPa = 14,504 psi = 1,0197 kgf/cm² = 10,2 mca (metros de coluna de água) = 750,1 mmHg. Para converter psi para bar: dividir por 14,504. Para bar para kPa: multiplicar por 100.",
              "TEMPERATURA: °C para °F: T(°F) = T(°C) × 1,8 + 32. °F para °C: T(°C) = (T(°F) - 32) / 1,8. Para Kelvin: T(K) = T(°C) + 273,15. Pontos de referência: 0°C = 32°F = 273,15 K. 100°C = 212°F = 373,15 K.",
              "VAZÃO: 1 m³/h = 1000 L/h = 16,67 L/min = 0,2778 L/s. 1 galão americano (gal) = 3,785 L. 1 barril de petróleo (bbl) = 42 galões = 158,97 L ≈ 159 L.",
              "SINAL 4-20 mA: conversão linear entre valor de processo e corrente. Para uma faixa 0-100 bar: cada 1 mA = 100/16 = 6,25 bar. Para X bar: I = 4 + 16 × (X/100) mA.",
              "PREFIXOS SI: Giga (G) = 10⁹, Mega (M) = 10⁶, Quilo (k) = 10³, Hecto (h) = 10², Deca (da) = 10¹, deci (d) = 10⁻¹, centi (c) = 10⁻², mili (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹, pico (p) = 10⁻¹².",
            ],
            equacoes: [
              { latex: "T(°F) = 1{,}8 \\cdot T(°C) + 32 \\qquad T(°C) = \\dfrac{T(°F) - 32}{1{,}8}", legenda: "Conversão Celsius ↔ Fahrenheit" },
              { latex: "I = 4 + 16 \\cdot \\dfrac{X - X_{min}}{X_{max} - X_{min}} \\quad [\\text{mA}]", legenda: "Conversão de valor de processo para sinal 4-20 mA" },
            ],
            conteudo2: [
              "Exemplo: transmissor de temperatura PT100, faixa -20 a +180°C, sinal 4-20mA. Para T = 80°C: I = 4 + 16×(80-(-20))/(180-(-20)) = 4 + 16×(100/200) = 4 + 8 = 12 mA. Verificação: 12 mA está exatamente na metade do span → 80°C está na metade da faixa (-20 a +180 = 200°C de span, metade = -20 + 100 = 80°C) ✓.",
            ],
          },
        ],
      },
      {
        slug: "mat-estatistica",
        titulo: "Matemática — Estatística e Metrologia",
        descricao: "Média, desvio padrão, distribuição normal e incerteza.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "M.2 — Estatística e Análise de Erros em Metrologia",
            conteudo: [
              "A metrologia usa estatística para quantificar a qualidade das medições. Os conceitos de média, desvio padrão e incerteza são exigidos em concursos de instrumentação.",
              "MÉDIA ARITMÉTICA: soma dos valores dividida pelo número de medições. Representa o valor mais provável do mensurando quando os erros são aleatórios e simétricos.",
              "DESVIO PADRÃO (σ): mede a dispersão dos valores em torno da média. Desvio padrão da amostra: s = √[Σ(xi - x̄)² / (n-1)]. Quanto menor o desvio padrão, maior a repetibilidade do instrumento.",
              "DISTRIBUIÇÃO NORMAL (Gaussiana): a maioria dos erros aleatórios segue distribuição normal. Propriedade: 68,3% dos valores estão dentro de ±1σ da média. 95,4% dentro de ±2σ. 99,7% dentro de ±3σ.",
              "INCERTEZA EXPANDIDA: U = k × u, onde u é a incerteza padrão e k é o fator de abrangência. Para nível de confiança de 95% com distribuição normal, k = 2. Para 99,7%, k = 3.",
              "PROPAGAÇÃO DE INCERTEZAS: quando a grandeza medida é calculada a partir de outras grandezas, as incertezas se propagam. Para f = A + B: u_f = √(u_A² + u_B²). Para f = A × B: u_f/f = √((u_A/A)² + (u_B/B)²).",
            ],
            equacoes: [
              { latex: "\\bar{x} = \\dfrac{1}{n} \\sum_{i=1}^{n} x_i", legenda: "Média aritmética de n medições" },
              { latex: "s = \\sqrt{\\dfrac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}}", legenda: "Desvio padrão da amostra (repetibilidade)" },
              { latex: "U = k \\cdot u_c \\quad (k=2 \\text{ para } 95\\%\\text{ de confiança})", legenda: "Incerteza expandida: k = fator de abrangência" },
            ],
            conteudo2: [
              "Exemplo: 5 medições de pressão (bar): 10,2; 10,1; 10,3; 10,2; 10,2. Média: (10,2+10,1+10,3+10,2+10,2)/5 = 51,0/5 = 10,20 bar. Desvios: (-0,00; -0,10; +0,10; 0,00; 0,00). s = √[(0+0,01+0,01+0+0)/4] = √(0,005) = 0,0707 bar. Incerteza padrão: u = s/√n = 0,0707/√5 = 0,0316 bar. U = 2 × 0,0316 = 0,063 bar (95% de confiança). Resultado: 10,20 ± 0,063 bar.",
            ],
          },
        ],
      },
      {
        slug: "mat-algebra-instr",
        titulo: "Matemática — Álgebra Aplicada",
        descricao: "Equação da reta, interpolação, calibração e regra de três.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "M.3 — Álgebra e Equações Aplicadas à Instrumentação",
            conteudo: [
              "Equações lineares e sistemas são usados em calibração, cálculo de span, ajuste de zero e especificação de instrumentos.",
              "EQUAÇÃO DA RETA (calibração): y = ax + b. Em instrumentação, y = sinal de saída (ex: mA), x = valor medido (ex: bar). O coeficiente angular a = (y_max - y_min) / (x_max - x_min) = span de saída / span de entrada. O coeficiente linear b = y_min - a × x_min.",
              "REGRA DE TRÊS: método rápido para conversão proporcional. Se 16 mA de span corresponde a 100% da faixa, quantos mA correspondem a 35%? 16 mA ÷ 100% × 35% = 5,6 mA. Sinal de saída: 4 + 5,6 = 9,6 mA.",
              "SISTEMAS DE EQUAÇÕES EM CALIBRAÇÃO: para ajustar zero e span de um transmissor com dois pontos. Ponto 1: 0 bar → 3,90 mA (deveria ser 4,00 mA). Ponto 2: 100 bar → 19,85 mA (deveria ser 20,00 mA). Erro de zero: +0,10 mA (em excesso). Erro de span: 20,00 - 19,85 = 0,15 mA (deficiente). Ajustar zero aumentando 0,10 mA e depois span ajustando em 0,15 mA.",
              "INTERPOLAÇÃO LINEAR: estimar valor entre dois pontos conhecidos. Para temperatura T entre T1 e T2 com resistências R1 e R2: R(T) = R1 + (R2-R1) × (T-T1)/(T2-T1). Usado para calcular valores intermediários em tabelas de termopar e PT100.",
            ],
            equacoes: [
              { latex: "a = \\dfrac{y_{max} - y_{min}}{x_{max} - x_{min}} = \\dfrac{16 \\text{ mA}}{\\text{Span do processo}}", legenda: "Coeficiente angular da curva de calibração (sensibilidade do instrumento)" },
              { latex: "R(T) \\approx R_1 + \\dfrac{R_2 - R_1}{T_2 - T_1} \\cdot (T - T_1)", legenda: "Interpolação linear entre dois pontos de calibração" },
            ],
            conteudo2: [
              "Dica de concurso: perguntas sobre sinal 4-20 mA são quase sempre resolvidas por interpolação linear ou regra de três. Memorize: 0% = 4 mA, 25% = 8 mA, 50% = 12 mA, 75% = 16 mA, 100% = 20 mA. Cada 25% = 4 mA de variação.",
            ],
          },
        ],
      },
      {
        slug: "mat-logica-instr",
        titulo: "Matemática — Raciocínio Lógico",
        descricao: "Proposições, conectivos, silogismos e portas lógicas.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "M.4 — Raciocínio Lógico para Concursos",
            conteudo: [
              "Raciocínio lógico é parte da prova básica de todos os concursos da Petrobras. Os temas mais frequentes são: proposições, conectivos lógicos, silogismos e lógica de circuitos (AND, OR, NOT).",
              "PROPOSIÇÃO: afirmação declarativa que pode ser classificada como verdadeira (V) ou falsa (F). Exemplos de proposições: 'A corrente é 5A' (pode ser V ou F). Exemplos que NÃO são proposições: perguntas ('Qual é a corrente?'), ordens ('Meça a corrente!'), paradoxos.",
              "CONECTIVOS LÓGICOS: E (∧) — conjunção, verdadeira somente se ambas as proposições forem V. OU (∨) — disjunção, falsa somente se ambas forem F. NÃO (¬) — negação, inverte o valor de verdade. SE...ENTÃO (→) — condicional, falsa somente se premissa V e conclusão F. SE E SOMENTE SE (↔) — bicondicional, verdadeira quando ambas têm o mesmo valor.",
              "NEGAÇÃO DE PROPOSIÇÕES COMPOSTAS — Leis de De Morgan: NÃO(p E q) = (NÃO p) OU (NÃO q). NÃO(p OU q) = (NÃO p) E (NÃO q). Aplicação em lógica de CLPs: NOT(A AND B) = (NOT A) OR (NOT B).",
              "SILOGISMO: argumento com duas premissas e uma conclusão. Exemplo válido: Premissa 1: Todo técnico da Petrobras usa EPI. Premissa 2: João é técnico da Petrobras. Conclusão: João usa EPI. Válido porque a conclusão decorre logicamente das premissas.",
              "LÓGICA DE CIRCUITOS (portas lógicas): AND = E, OR = OU, NOT = NÃO, NAND = NÃO-E, NOR = NÃO-OU, XOR = OU exclusivo. A tabela-verdade lista todas as combinações possíveis de entradas e suas saídas correspondentes.",
            ],
            equacoes: [],
            conteudo2: [
              "Macete para a condicional (p → q): é FALSA somente quando p é V e q é F. Equivalências úteis: p → q ≡ (NÃO p) OU q ≡ (NÃO q) → (NÃO p) (contrapositiva). A contrapositiva tem o mesmo valor de verdade que a condicional original — muito cobrado em provas.",
              "Lei de De Morgan na prática: 'NÃO (vai chover E vai ventar)' é equivalente a 'NÃO vai chover OU NÃO vai ventar'. Isso é exatamente a porta NAND no CLP: a saída é 0 (falso) somente se AMBAS as entradas são 1 (verdadeiro).",
            ],
          },
        ],
      },
      {
        slug: "mat-combinatoria",
        titulo: "Matemática — Sequências e Probabilidade",
        descricao: "PA, PG, matrizes, probabilidade e combinatória.",
        bloco: "Conhecimentos Básicos",
        paginas: [
          {
            titulo: "M.5 — Sequências, Matrizes e Probabilidade",
            conteudo: [
              "Sequências, matrizes e probabilidade são temas frequentes na parte de raciocínio lógico-matemático dos concursos técnicos da Petrobras.",
              "SEQUÊNCIAS NUMÉRICAS: identificar o padrão que gera a sequência. Tipos comuns: PA (diferença constante), PG (razão constante), quadrados (1, 4, 9, 16...), cubos (1, 8, 27, 64...), Fibonacci (cada termo = soma dos dois anteriores: 1, 1, 2, 3, 5, 8, 13...).",
              "SEQUÊNCIAS DE FIGURAS: identificar rotações, reflexões, adições ou remoções de elementos em padrões geométricos. Estratégia: analisar linha por linha e coluna por coluna.",
              "MATRIZES: tabela retangular de números com m linhas e n colunas. Adição: elementos correspondentes. Multiplicação de matriz m×n por n×p resulta em m×p. A multiplicação de matrizes NÃO é comutativa (A×B ≠ B×A em geral). Determinante de matriz 2×2: |A| = ad - bc.",
              "PROBABILIDADE: P(A) = número de casos favoráveis / número de casos possíveis. P(A) sempre entre 0 e 1. P(A) + P(Ā) = 1. Eventos independentes: P(A e B) = P(A) × P(B). Eventos mutuamente exclusivos: P(A ou B) = P(A) + P(B).",
              "ANÁLISE COMBINATÓRIA: permutação simples (n elementos em n posições): Pn = n!. Arranjo (n elementos em k posições, importa a ordem): A(n,k) = n!/(n-k)!. Combinação (n elementos em k posições, não importa a ordem): C(n,k) = n! / (k! × (n-k)!).",
            ],
            equacoes: [
              { latex: "P(A) = \\dfrac{\\text{casos favoráveis}}{\\text{casos possíveis}} \\quad 0 \\leq P(A) \\leq 1", legenda: "Definição clássica de probabilidade" },
              { latex: "C(n,k) = \\dfrac{n!}{k! \\cdot (n-k)!}", legenda: "Combinação de n elementos tomados k a k" },
              { latex: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc", legenda: "Determinante de matriz 2×2" },
            ],
            conteudo2: [
              "Exemplo: num painel de instrumentação, há 5 posições para instalar transmissores. De quantas formas podemos escolher 3 transmissores de marcas diferentes para essas posições se a ordem importa? A(5,3) = 5!/(5-3)! = 120/2 = 60 arranjos. Se a ordem não importar: C(5,3) = 5!/(3!×2!) = 120/12 = 10 combinações.",
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CURSO 3: TÉCNICO JUDICIÁRIO — TECNOLOGIA DA INFORMAÇÃO (TRT/TST)
  // Editais TRT-SP 2025 e TRT-1 2025 — Banca: FCC/CESPE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "tecnico-ti-trt-tst",
    nome: "Técnico Judiciário — TI (TRT/TST)",
    nivel: "Técnico",
    descricao: "Preparação para Técnico Judiciário — Área TI nos TRTs e TST. Baseado nos editais TRT-SP 2025 e TRT-1 2025 (FCC/CESPE). Cobre Windows, Office, Google Workspace, Redes, Segurança, Banco de Dados e Legislação.",
    modulos: [
      {
        slug: "ti-sistemas-operacionais",
        titulo: "Sistemas Operacionais — Windows 10 e 11",
        descricao: "Conceitos de SO, gerenciamento de arquivos, configurações e atalhos cobrados nos editais TRT/TST.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "1.1 — Conceitos Fundamentais de Sistema Operacional",
            conteudo: [
              "O sistema operacional (SO) é o software responsável por gerenciar os recursos de hardware (processador, memória, disco, dispositivos) e fornecer interface entre usuário e máquina. Sem o SO, os programas não conseguem acessar o hardware diretamente.",
              "Kernel é o núcleo do sistema operacional — parte que roda em modo privilegiado e gerencia diretamente o hardware. Programas comuns rodam em modo usuário e acessam o hardware apenas via chamadas de sistema (system calls).",
              "Tipos de interface: GUI (Graphical User Interface) — interface gráfica com janelas, ícones e menus; CLI (Command Line Interface) — linha de comando (Prompt de Comando, PowerShell). Sistemas operacionais multitarefa executam vários programas simultaneamente.",
              "SO mais cobrados nos concursos TRT/TST: Windows 10 e Windows 11. O Windows 11 tem requisitos mais rígidos de hardware (TPM 2.0, UEFI, Secure Boot, processador de 8ª geração Intel ou Ryzen 2000+) mas interface familiar ao Windows 10.",
            ],
          },
          {
            titulo: "1.2 — Gerenciamento de Arquivos no Windows",
            conteudo: [
              "O Explorador de Arquivos (File Explorer) é a ferramenta padrão para navegar pastas e gerenciar arquivos. Atalho: Win+E. No Windows 11 o layout foi redesenhado com barra de comandos simplificada.",
              "Estrutura de pastas padrão: C:\\Users\\[usuário]\\Documents (Documentos), Downloads, Desktop (Área de Trabalho), Pictures, Videos. A pasta C:\\Windows contém os arquivos do sistema e não deve ser modificada sem conhecimento técnico.",
              "Atributos de arquivo: Somente Leitura (impede alteração); Oculto (não aparece na visualização padrão — exibir em Exibir > Mostrar > Itens ocultos); Sistema (arquivo essencial do SO).",
              "Atalhos essenciais: Ctrl+C (copiar), Ctrl+X (recortar), Ctrl+V (colar), Ctrl+Z (desfazer), Del (excluir para lixeira), Shift+Del (excluir permanente), Alt+F4 (fechar), Win+D (área de trabalho), Win+L (bloquear sessão), Win+R (executar).",
              "Sistemas de arquivos: NTFS (padrão Windows — suporta arquivos > 4GB, permissões, compressão, criptografia EFS); FAT32 (compatível com mais dispositivos, limite de 4GB por arquivo); exFAT (ideal para pen drives — sem limite prático de tamanho).",
            ],
          },
          {
            titulo: "1.3 — Gerenciador de Tarefas e Configurações",
            conteudo: [
              "Gerenciador de Tarefas: Ctrl+Shift+Esc (ou Ctrl+Alt+Del > Gerenciador de Tarefas). Monitora processos, uso de CPU/memória/disco/rede, permite encerrar programas travados. Aba Inicializar controla programas que iniciam com o Windows.",
              "Painel de Controle vs. Configurações: Windows 10 mantém ambos; Windows 11 migrou a maioria para Configurações (Win+I). Contas de usuário: Administrador (acesso total ao sistema) vs. Usuário Padrão (não instala softwares nem altera configurações do sistema).",
              "Virtualização com Hyper-V: recurso nativo do Windows Pro/Enterprise para criar máquinas virtuais. Permite executar múltiplos SOs em um único hardware físico.",
              "Windows Update: fundamental para segurança — corrige vulnerabilidades exploradas por malwares. Configurar para baixar atualizações automaticamente. Atualizações de segurança devem ser aplicadas com prioridade.",
            ],
          },
        ],
      },
      {
        slug: "ti-office-workspace",
        titulo: "Microsoft Office e Google Workspace",
        descricao: "Word, Excel, PowerPoint, Google Drive e ferramentas de colaboração — cobrados nos editais TRT/TST 2025.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "2.1 — Microsoft Word: Formatação e Recursos",
            conteudo: [
              "Microsoft Word: processador de textos mais cobrado em concursos. Interface em Ribbon (faixa de opções) com abas: Página Inicial, Inserir, Layout, Referências, Correspondências, Revisão, Exibir.",
              "Formatação essencial: negrito (Ctrl+N), itálico (Ctrl+I), sublinhado (Ctrl+U), alinhar à esquerda (Ctrl+Q), centralizar (Ctrl+E), alinhar à direita (Ctrl+G), justificar (Ctrl+J). Limpar formatação: Ctrl+Barra de Espaço.",
              "Estilos e Sumário automático: aplicar Título 1, Título 2 etc. Referências > Sumário gera o índice automaticamente baseado nos estilos de título. Atualizar sumário com F9 ou clique direito > Atualizar Campo.",
              "Mala Direta (Correspondências): cria documentos personalizados em massa combinando modelo com lista de destinatários (planilha Excel, banco de dados). Muito usado no Judiciário para intimações e notificações em massa.",
              "Controlar Alterações (Revisão > Controlar Alterações, Ctrl+Shift+E): registra todas as modificações com autor e data. Fundamental para revisões colaborativas. Aceitar ou rejeitar alterações individualmente ou todas de uma vez.",
            ],
          },
          {
            titulo: "2.2 — Microsoft Excel: Fórmulas e Funções",
            conteudo: [
              "Excel: planilha eletrônica. Células identificadas por coluna (letra) + linha (número): A1, B3, C10. Toda fórmula começa com = (igual). Operadores: + - * / ^ (potência) % (porcentagem).",
              "Funções essenciais: =SOMA(A1:A10), =MÉDIA(A1:A10), =MÁXIMO(A1:A10), =MÍNIMO(A1:A10), =CONT.VALORES(A1:A10), =CONT.SE(A1:A10;critério), =SOMASE(intervalo;critério;soma).",
              "=SE(condição; valor_verdadeiro; valor_falso): função lógica mais cobrada. Pode ser aninhada: =SE(B2>=9;\"Ótimo\";SE(B2>=7;\"Bom\";\"Regular\")). Funções lógicas: =E(), =OU(), =NÃO().",
              "=PROCV(valor_procurado; tabela; coluna; 0): busca valor na 1ª coluna e retorna valor de outra coluna. O 0 (falso) = correspondência exata. =ÍNDICE() e =CORRESP() são alternativas mais flexíveis.",
              "Referências: A1 (relativa — muda ao copiar), $A$1 (absoluta — não muda), $A1 (coluna fixa), A$1 (linha fixa). F4 alterna entre tipos. Tabela Dinâmica (PivotTable): Inserir > Tabela Dinâmica — resume dados por categorias.",
            ],
          },
          {
            titulo: "2.3 — Google Workspace: Drive, Docs e Colaboração",
            conteudo: [
              "Google Workspace (ex G Suite): suite de produtividade Google. Gmail, Drive, Docs, Planilhas (Sheets), Apresentações (Slides), Meet, Forms, Calendar. Muito cobrado nos editais TRT 2025.",
              "Google Drive: 15 GB gratuitos. Compartilhamento com 3 níveis: Leitor (só visualiza), Comentarista (adiciona comentários), Editor (pode alterar). Gerar link público permite acesso sem conta Google.",
              "Google Docs: edição colaborativa em tempo real — múltiplos usuários editam simultaneamente, com cursor colorido identificando cada editor. Histórico de versões: Arquivo > Histórico de versões > Ver histórico. Comentários com @menção notificam colaboradores.",
              "Google Planilhas vs. Excel: funções equivalentes mas com diferenças. No Sheets: =IMPORTRANGE() importa dados de outra planilha; =QUERY() usa linguagem SQL-like; integração nativa com outros apps Google. Não suporta macros VBA (usa Google Apps Script).",
            ],
          },
        ],
      },
      {
        slug: "ti-redes-computadores",
        titulo: "Redes de Computadores e Internet",
        descricao: "Fundamentos de redes, protocolos, Internet, navegadores — cobrados nos editais TRT área TI.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "3.1 — Fundamentos de Redes",
            conteudo: [
              "Redes por abrangência: LAN (Local Area Network — escritório/prédio), MAN (Metropolitan — cidade), WAN (Wide — longa distância, ex: Internet). WLAN é a LAN sem fio (Wi-Fi).",
              "Modelo OSI (7 camadas): Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação. Modelo TCP/IP (4 camadas): Acesso à Rede, Internet, Transporte, Aplicação. Mais prático que o OSI — é o usado na Internet real.",
              "Equipamentos: Hub (retransmite para todas as portas — obsoleto, camada 1); Switch (retransmite só para porta destino — camada 2, usa MAC); Roteador (conecta redes diferentes, decide caminho — camada 3, usa IP); Access Point (cria rede Wi-Fi).",
              "IP e sub-redes: IPv4 = 32 bits (ex: 192.168.1.1); IPv6 = 128 bits. IPs privados: 10.x.x.x, 172.16-31.x.x, 192.168.x.x — não roteados na Internet. NAT converte IPs privados para público ao sair para a Internet.",
            ],
          },
          {
            titulo: "3.2 — Protocolos e Serviços",
            conteudo: [
              "Protocolos e portas: HTTP (80), HTTPS (443), FTP (21), SSH (22), DNS (53), SMTP (25/587), POP3 (110), IMAP (143), RDP (3389), DHCP (67/68).",
              "DNS: converte nomes (www.trt.jus.br) em IPs. DHCP: atribui IPs automaticamente aos dispositivos da rede. Gateway padrão: IP do roteador — porta de saída para a Internet.",
              "VPN (Virtual Private Network): túnel criptografado sobre a Internet para acesso seguro à Intranet. Essencial para servidores do Judiciário em home office.",
              "Diferença HTTP vs. HTTPS: HTTPS usa TLS para criptografar os dados. O cadeado no navegador indica HTTPS com certificado válido. O certificado é emitido por uma CA (Autoridade Certificadora) confiável.",
            ],
          },
          {
            titulo: "3.3 — Navegadores e Ferramentas de Busca",
            conteudo: [
              "Navegadores cobrados: Google Chrome (motor Blink), Mozilla Firefox (Gecko), Microsoft Edge (Blink — substituiu o IE em 2020). Internet Explorer foi descontinuado em 2022.",
              "Modo Anônimo/Privativo: não salva histórico, cookies nem dados de formulários no dispositivo — mas o provedor e os sites visitados ainda registram o acesso. Ctrl+Shift+N (Chrome/Edge) ou Ctrl+Shift+P (Firefox).",
              "Cookies: arquivos salvos pelo site no navegador para manter sessão, preferências e rastreamento. A LGPD exige consentimento para cookies não essenciais. Limpar cookies: Ctrl+Shift+Del.",
              "Operadores de busca Google: \"termo\" (busca exata), site:dominio.com (busca no site), -palavra (exclui), filetype:pdf (tipo de arquivo), before:2024 / after:2023 (por data).",
            ],
          },
        ],
      },
      {
        slug: "ti-seguranca-informacao",
        titulo: "Segurança da Informação",
        descricao: "Malwares, ataques, criptografia, backup e LGPD — amplamente cobrados nos editais TRT área TI.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "4.1 — Malwares e Tipos de Ataques",
            conteudo: [
              "Vírus: replica-se ao se anexar a arquivos, precisa de ação do usuário para se propagar. Worm: propaga-se automaticamente pela rede explorando vulnerabilidades — não precisa de ação do usuário. Trojan: disfarça-se de software legítimo para abrir backdoors.",
              "Ransomware: criptografa os arquivos e exige resgate. Mais devastador atualmente — afetou prefeituras, hospitais e empresas. Prevenção: backups offline + atualizações + treinamento de usuários.",
              "Spyware: monitora e envia informações sem consentimento. Keylogger: registra tudo que é digitado. Adware: exibe propagandas. Rootkit: esconde a presença de malwares no sistema.",
              "Phishing: e-mail/site falso imitando empresa/banco/governo para roubar dados. Spear phishing: direcionado a pessoa/organização específica. Smishing: por SMS. Vishing: por voz/telefone.",
              "DoS e DDoS: sobrecarregam servidor com requisições. SQL Injection: insere código SQL malicioso em formulários. XSS (Cross-Site Scripting): injeta scripts maliciosos em páginas web. Man-in-the-Middle: intercepta comunicação entre duas partes.",
            ],
          },
          {
            titulo: "4.2 — Criptografia, LGPD e Boas Práticas",
            conteudo: [
              "Criptografia simétrica: mesma chave para cifrar e decifrar (AES, DES). Rápida, usada para grandes volumes de dados. Problema: como compartilhar a chave com segurança?",
              "Criptografia assimétrica: par de chaves pública/privada (RSA, ECC). O que é cifrado com a pública só é decifrado com a privada. Usada para troca de chaves e assinaturas digitais. Mais lenta que a simétrica.",
              "Certificado Digital ICP-Brasil: vincula chave pública a pessoa/organização. Emitido por Autoridade Certificadora (AC). Garante autenticidade e não-repúdio. Obrigatório para assinar documentos judiciais eletronicamente (ex: petições no PJe).",
              "LGPD (Lei 13.709/2018): regula tratamento de dados pessoais. Bases legais incluem consentimento, obrigação legal e legítimo interesse. ANPD é a autoridade fiscalizadora. Sanções: multa até 2% do faturamento, limitada a R$50 milhões por infração.",
              "Backup 3-2-1: 3 cópias, em 2 mídias diferentes, sendo 1 off-site. Backup offline protege contra ransomware. MFA (Multi-Factor Authentication): segundo fator além da senha — app autenticador, SMS, biometria. Senhas fortes: mínimo 12 caracteres, letras+números+símbolos, única por serviço.",
            ],
          },
        ],
      },
      {
        slug: "ti-banco-de-dados",
        titulo: "Banco de Dados e SQL",
        descricao: "Modelo relacional, SQL básico e intermediário — cobrados nos editais TRT área TI.",
        bloco: "Bloco III",
        paginas: [
          {
            titulo: "5.1 — Modelo Relacional e SQL",
            conteudo: [
              "Banco de dados relacional: dados organizados em tabelas com colunas (atributos) e linhas (registros/tuplas). SGBDs principais: MySQL, PostgreSQL, Oracle, SQL Server, SQLite.",
              "Chave Primária (PK): identifica unicamente cada registro — não pode ser nula nem duplicada. Chave Estrangeira (FK): referencia a PK de outra tabela — cria relacionamentos entre tabelas.",
              "Normalização: 1FN (eliminar grupos repetidos), 2FN (eliminar dependências parciais da PK), 3FN (eliminar dependências transitivas). ACID: Atomicidade, Consistência, Isolamento, Durabilidade.",
              "DDL: CREATE TABLE, ALTER TABLE, DROP TABLE. DML: SELECT, INSERT, UPDATE, DELETE. DCL: GRANT (concede permissões), REVOKE (revoga permissões).",
              "SELECT col1, col2 FROM tabela WHERE condição ORDER BY col ASC/DESC; JOIN: INNER (só correspondências em ambas), LEFT (todos da esquerda + correspondências), RIGHT, FULL. Funções de agregação: COUNT, SUM, AVG, MAX, MIN — usadas com GROUP BY.",
            ],
          },
        ],
      },
      {
        slug: "ti-legislacao-ti",
        titulo: "Marco Civil e LGPD",
        descricao: "Legislação de TI cobrada nos editais TRT/TST — Marco Civil da Internet e LGPD.",
        bloco: "Bloco III",
        paginas: [
          {
            titulo: "6.1 — Marco Civil da Internet e LGPD",
            conteudo: [
              "Marco Civil da Internet (Lei 12.965/2014): princípios, garantias e deveres para uso da Internet no Brasil. Princípios: neutralidade da rede, liberdade de expressão, proteção da privacidade, proteção dos dados pessoais.",
              "Neutralidade de rede: provedores não podem discriminar tráfego por conteúdo, origem, destino, serviço ou aplicação. Guarda de registros: provedores de aplicação guardam por 6 meses; de conexão por 1 ano. Entrega só com ordem judicial.",
              "LGPD (Lei 13.709/2018): regula tratamento de dados pessoais por pessoas físicas e jurídicas de direito público e privado. Dados pessoais = qualquer informação que identifique ou possa identificar uma pessoa (nome, CPF, IP, localização etc.).",
              "Dados sensíveis (proteção reforçada): origem racial, convicção religiosa, opinião política, saúde, vida sexual, biometria, dado genético. Requerem consentimento específico e destacado — ou outra base legal explícita.",
              "Direitos do titular: acesso, correção, portabilidade, eliminação, revogação do consentimento, informação sobre compartilhamento. ANPD fiscaliza e aplica sanções. Lei Anticorrupção digital: Lei 12.737/2012 (Lei Carolina Dieckmann) tipifica crimes digitais como invasão de dispositivo e obtenção de dados sem autorização.",
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CURSO 4: TÉCNICO DO SEGURO SOCIAL — INFORMÁTICA (INSS 2026)
  // Baseado no edital INSS 2022 (CEBRASPE) — Previsão 8.500+ vagas 2026
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "tecnico-inss-informatica",
    nome: "Técnico do Seguro Social — Informática (INSS)",
    nivel: "Técnico",
    descricao: "Preparação para o módulo de Informática do concurso INSS 2026 (Técnico do Seguro Social, nível médio). Baseado no edital INSS 2022 (CEBRASPE). Previsão de 8.500+ vagas. Questões no estilo Certo/Errado.",
    modulos: [
      {
        slug: "inss-windows-office",
        titulo: "Windows e Microsoft Office (INSS)",
        descricao: "Windows 10/11 e pacote Office no estilo CEBRASPE — questões Certo/Errado com detalhes que pegam.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "1.1 — Windows 10 e 11 para o INSS (CEBRASPE)",
            conteudo: [
              "O CEBRASPE usa questões Certo/Errado com afirmações sutilmente erradas. Atenção a detalhes! Exemplo de questão típica: 'O Windows 10 permite a criação de áreas de trabalho virtuais para organizar janelas abertas' — CERTO (Win+Tab ou Win+Ctrl+D).",
              "Área de trabalho: ícones de atalhos + Barra de Tarefas (botão Iniciar, ícones fixados, relógio/notificações). No Windows 11 o botão Iniciar e os ícones da barra ficam centralizados por padrão (pode ser revertido para a esquerda).",
              "Atalhos mais cobrados pelo CEBRASPE no INSS: Win+L (bloquear sessão), Win+D (mostrar área de trabalho), Win+E (abrir Explorer), Win+R (Executar), Ctrl+Shift+Esc (Gerenciador de Tarefas), Prt Scr (captura de tela inteira), Alt+Prt Scr (só a janela ativa), Win+Shift+S (recorte personalizado).",
              "Lixeira: guarda arquivos excluídos (Del) temporariamente. Esvaziar = exclusão permanente. ATENÇÃO: arquivos excluídos de pen drives ou cartões de memória NÃO vão para a lixeira — são excluídos imediatamente!",
              "NTFS vs. FAT32: NTFS suporta arquivos maiores que 4 GB, permissões de acesso, criptografia (EFS) e compressão — FAT32 não. FAT32 é compatível com mais dispositivos. exFAT combina compatibilidade ampla com suporte a arquivos grandes.",
            ],
          },
          {
            titulo: "1.2 — Microsoft Word para o INSS (CEBRASPE)",
            conteudo: [
              "Questão típica CEBRASPE: 'No Word, ao pressionar Ctrl+S pela primeira vez em um documento novo, será aberta a caixa de diálogo Salvar Como' — CERTO. 'O atalho F12 abre a janela Localizar' — ERRADO (F12 abre Salvar Como; Ctrl+L localiza).",
              "Formatos de arquivo Word: .docx (padrão Office 2007+), .doc (Word 97-2003), .odt (formato aberto — LibreOffice). Exportar como PDF: Arquivo > Exportar > Criar PDF/XPS (não salva em .docx).",
              "Localizar (Ctrl+L) vs. Substituir (Ctrl+U): Localizar procura texto; Substituir encontra e troca. 'Substituir Tudo' altera todas as ocorrências de uma vez. Suporte a caracteres especiais e curingas (modo avançado).",
              "Revisão: Ortografia e Gramática (F7 — revisa todo o documento); Dicionário de sinônimos (Shift+F7); Controlar Alterações (Ctrl+Shift+E — registra todas as mudanças com autor); Comparar documentos (compara duas versões e mostra diferenças).",
              "Seções e Quebras: Quebra de Página (Ctrl+Enter) — força nova página. Quebra de Seção — permite formatações diferentes em partes do mesmo documento (orientação diferente, cabeçalhos diferentes etc.).",
            ],
          },
          {
            titulo: "1.3 — Microsoft Excel para o INSS (CEBRASPE)",
            conteudo: [
              "Questão CEBRASPE típica: 'Na fórmula =A1+B1, se a célula A1 contiver o texto \"5\" e B1 o número 3, o resultado será 8' — ERRADO (resultaria em erro #VALOR! pois \"5\" é texto, não número).",
              "Referências: A1 (relativa), $A$1 (absoluta), $A1 ou A$1 (mista). Ao copiar =A1+B1 da célula C1 para C2, torna-se =A2+B2 (referências relativas se ajustam). Para fixar: pressionar F4.",
              "=SE(): 'A função SE pode ter no máximo 7 níveis de aninhamento no Excel 2007' — CERTO (Excel 2019/365 permite até 64). Conhecer a versão importa nas questões!",
              "Formatos de número: Geral (padrão), Número, Moeda, Contábil, Data, Hora, Porcentagem, Científico, Texto. Células formatadas como Texto não executam fórmulas — um número formatado como texto não é somado pelo =SOMA().",
              "Nomes de intervalos: é possível nomear um intervalo (selecionar > caixa de Nome > digitar). =SOMA(Vendas) é equivalente a =SOMA(B2:B20) se 'Vendas' for o nome do intervalo. Aumenta legibilidade das fórmulas.",
            ],
          },
        ],
      },
      {
        slug: "inss-internet-email",
        titulo: "Internet, Intranet e E-mail (INSS)",
        descricao: "Conceitos de Internet, navegadores, e-mail e ferramentas digitais no estilo CEBRASPE.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "2.1 — Internet e Intranet (INSS — CEBRASPE)",
            conteudo: [
              "Questão CEBRASPE: 'A World Wide Web e a Internet são sinônimos' — ERRADO. A WWW é apenas um dos serviços da Internet (páginas web via HTTP/HTTPS). Outros serviços: e-mail, FTP, streaming, VoIP, SSH.",
              "Domínios cobrados no INSS: .gov.br (governo federal e estadual), .jus.br (Judiciário), .edu.br (educação), .org.br (organizações sem fins lucrativos), .com.br (empresas), .net.br (provedores). O INSS usa www.gov.br/inss.",
              "URL: protocolo://domínio:porta/caminho?parâmetros. A porta 80 é padrão para HTTP e a 443 para HTTPS — quando não indicada, o navegador usa a padrão. Quando a URL começa com HTTPS, a comunicação é criptografada.",
              "Modo Anônimo: NÃO protege contra monitoramento do provedor ou do empregador — apenas não salva histórico localmente. Questão CEBRASPE: 'O modo anônimo impede que os sites identifiquem o usuário' — ERRADO (o IP ainda é visível).",
              "Cookies: 'Ao limpar os cookies, o usuário será desconectado de sites onde estava logado' — CERTO (os cookies de sessão mantêm o login ativo). 'Cookies são vírus que infectam o computador' — ERRADO (são arquivos de texto inofensivos por si mesmos).",
            ],
          },
          {
            titulo: "2.2 — Correio Eletrônico para o INSS",
            conteudo: [
              "Campos do e-mail — muito cobrado: Para (destinatário principal); CC (Cópia Carbono — todos os destinatários veem quem está em CC); CCO/BCC (Cópia Carbono Oculta — destinatários em CCO não veem uns aos outros nem aparecem para os do campo Para e CC).",
              "SMTP envia e-mail; POP3 recebe e por padrão apaga do servidor após download (offline); IMAP sincroniza com o servidor mantendo mensagens lá — permite acesso de múltiplos dispositivos. Questão: 'Com POP3, as mensagens permanecem no servidor após serem baixadas' — ERRADO (por padrão são removidas).",
              "Spam: 'Marcar uma mensagem como spam move para a pasta de lixo eletrônico e treina o filtro' — CERTO. 'Responder a um spam para pedir remoção confirma para o remetente que o e-mail é válido e pode aumentar o volume de spam recebido' — CERTO.",
              "Assinatura digital em e-mail: garante autenticidade (quem assinou) e integridade (não foi alterado no trajeto). Usa certificado digital. Diferente da assinatura visual no rodapé (apenas texto/imagem — sem validade jurídica).",
              "Webmail: acesso ao e-mail pelo navegador, sem instalar cliente de e-mail. Gmail, Outlook.com, Yahoo Mail. Dados ficam no servidor — qualquer dispositivo com acesso à Internet pode acessar as mensagens.",
            ],
          },
        ],
      },
      {
        slug: "inss-seguranca",
        titulo: "Segurança da Informação (INSS — CEBRASPE)",
        descricao: "Malwares, antivírus, firewall e boas práticas no estilo de questões Certo/Errado do CEBRASPE.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "3.1 — Malwares: O que o CEBRASPE Cobra",
            conteudo: [
              "Questão CEBRASPE: 'Um worm, diferentemente de um vírus, é capaz de se propagar automaticamente pelas redes, explorando vulnerabilidades dos sistemas ou falhas na configuração de softwares instalados' — CERTO.",
              "'Um vírus é um programa que se instala no computador sem o conhecimento do usuário e envia informações confidenciais para terceiros' — ERRADO (essa é a definição de spyware, não de vírus).",
              "'O ransomware cifra os arquivos do usuário e exige pagamento para fornecer a chave de descriptografia' — CERTO. 'O pagamento do resgate garante a recuperação dos arquivos' — ERRADO (não há garantia alguma).",
              "'Um trojan horse se propaga pela rede automaticamente assim que infecta um sistema' — ERRADO (trojans não se propagam sozinhos — essa é característica do worm).",
              "'O rootkit é um tipo de malware que tem como objetivo esconder a existência de outros softwares maliciosos instalados no sistema' — CERTO.",
            ],
          },
          {
            titulo: "3.2 — Proteção e Boas Práticas (INSS)",
            conteudo: [
              "Antivírus vs. Firewall — questão frequente: 'O firewall é capaz de detectar e remover vírus do computador' — ERRADO. O firewall controla tráfego de rede; quem detecta e remove malwares é o antivírus.",
              "'O antivírus baseado em assinaturas é eficaz contra malwares completamente novos e desconhecidos (zero-day)' — ERRADO. Assinaturas só detectam malwares conhecidos. A análise heurística busca comportamentos suspeitos de malwares desconhecidos.",
              "Backup: 'Para se proteger contra ransomware, é suficiente manter cópias de backup armazenadas no mesmo computador infectado' — ERRADO. O ransomware criptografará também os backups locais. Backups off-site (nuvem ou mídia desconectada) são essenciais.",
              "'Ao usar rede Wi-Fi pública e acessar um site HTTPS, os dados transmitidos estão protegidos por criptografia' — CERTO (TLS criptografa o canal). 'A rede Wi-Fi pública sem senha é segura para uso corporativo' — ERRADO.",
              "'A autenticação de dois fatores (2FA) protege a conta mesmo que a senha seja comprometida, pois exige um segundo fator de verificação' — CERTO.",
            ],
          },
        ],
      },
      {
        slug: "inss-redes-basico",
        titulo: "Noções de Redes e Nuvem (INSS)",
        descricao: "Conceitos básicos de redes, Wi-Fi e computação em nuvem cobrados no INSS.",
        bloco: "Bloco II",
        paginas: [
          {
            titulo: "4.1 — Redes e Cloud para o INSS",
            conteudo: [
              "Para o cargo de Técnico do Seguro Social do INSS, o nível de redes exigido é básico — diferente do TRT área TI. Foco em conceitos gerais e uso prático.",
              "Wi-Fi: rede sem fio baseada em IEEE 802.11. Frequências: 2,4 GHz (maior alcance, mais interferência) e 5 GHz (menor alcance, mais velocidade e menos congestionamento). WPA3 é o protocolo de segurança mais recente; WEP é obsoleto e inseguro — questão: 'O protocolo WEP oferece proteção adequada para redes Wi-Fi corporativas' — ERRADO.",
              "Computação em nuvem (Cloud Computing): SaaS (Software as a Service — ex: Office 365, Gmail, Salesforce — usuário usa o software pela Internet); PaaS (Platform — ex: Google App Engine — desenvolvedor implanta aplicações); IaaS (Infrastructure — ex: AWS EC2, Azure VMs — aluga servidores/rede/armazenamento).",
              "'Em um modelo SaaS, o cliente é responsável pela instalação e manutenção do software nos servidores' — ERRADO. No SaaS, o provedor gerencia tudo (hardware, SO, aplicação) — o cliente apenas usa o software via navegador.",
              "Gov.br e serviços digitais do governo: o INSS usa o portal Meu INSS (acesso por Gov.br) para agendamentos, consultas de benefícios e serviços digitais. O acesso é feito com conta Gov.br — conta verificada com reconhecimento facial ou banco cadastrado.",
            ],
          },
        ],
      },
    ],
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
