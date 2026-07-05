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
  tipo: "senoide-fase" | "atraso-indutivo" | "avanco-capacitivo" | "triangulo-potencias" | "carga-capacitor" | "descarga-indutor" | "comparacao-corrente" | "curva-bh" | "torque-velocidade-inducao" | "curva-disjuntor";
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
        descricao: "Eletromagnetismo, transformadores, máquinas síncronas/CC, motores de indução, proteção de baixa tensão e comandos.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "3.1 — Eletromagnetismo: a base de toda máquina elétrica",
            conteudo: [
              "Toda máquina elétrica girante (motores e geradores) e todo transformador funcionam a partir do mesmo princípio físico: a relação entre corrente elétrica e campo magnético, descrita pelas leis do eletromagnetismo.",
              "Dois fenômenos sustentam praticamente tudo que vem a seguir neste módulo:",
              "• Lei de Ampère: toda corrente elétrica gera, ao seu redor, um campo magnético.",
              "• Lei de Faraday-Lenz: todo campo magnético variável, ao atravessar um condutor (ou espira), induz nele uma força eletromotriz (fem) — é a indução eletromagnética.",
            ],
            equacoes: [
              { latex: "e = N \\cdot \\dfrac{\\Delta\\Phi}{\\Delta t}", legenda: "Lei de Faraday: fem induzida N = espiras, ΔΦ = variação do fluxo (Wb), Δt = intervalo de tempo (s)" },
            ],
            conteudo2: [
              "O sinal negativo (Lei de Lenz) indica que a fem induzida sempre se opõe à causa que a gerou — é a natureza tentando \"resistir\" à mudança. Esse princípio explica, por exemplo, por que um motor desenvolve uma força contraeletromotriz que se opõe à tensão aplicada conforme ele acelera.",
            ],
          },
          {
            titulo: "3.2 — Circuito magnético e relutância",
            conteudo: [
              "Assim como um circuito elétrico tem resistência à passagem de corrente, um circuito magnético (o caminho que o fluxo magnético percorre, geralmente dentro de um núcleo de ferro) tem relutância — a oposição à passagem do fluxo magnético.",
            ],
            equacoes: [
              { latex: "\\mathcal{R} = \\dfrac{l}{\\mu \\, A}", legenda: "relutância: l = comprimento do caminho magnético, μ = permeabilidade do material, A = área da seção" },
              { latex: "\\Phi = \\dfrac{N \\, I}{\\mathcal{R}}", legenda: "fluxo magnético, em analogia direta com a Lei de Ohm (V = R×I)" },
            ],
            conteudo2: [
              "Note a analogia: N×I (força magnetomotriz) faz o papel da tensão, e a relutância faz o papel da resistência. Núcleos de ferro têm permeabilidade muito maior que o ar — por isso, qualquer entreferro (gap de ar) no circuito magnético aumenta MUITO a relutância total, mesmo sendo fisicamente pequeno.",
            ],
            dicas: [
              { gatilho: "ver a curva de magnetização", titulo: "Curva B-H e saturação do núcleo", tipo: "curva-bh",
                explicacao: "O fluxo magnético (B) cresce quase linearmente com a corrente de excitação (H) no início, mas a partir de certo ponto o núcleo satura — aumentar muito a corrente já não aumenta o fluxo na mesma proporção. Esse é o motivo de transformadores e motores terem um limite de tensão/corrente de operação." },
            ],
          },
          {
            titulo: "3.3 — Transformadores: princípio de funcionamento",
            conteudo: [
              "Um transformador é uma máquina elétrica estática (sem partes girantes) que transfere energia elétrica entre dois ou mais circuitos por meio de indução eletromagnética, normalmente alterando o nível de tensão.",
              "O enrolamento primário, ao ser energizado em CA, cria um fluxo magnético variável no núcleo; esse fluxo induz uma tensão no enrolamento secundário, proporcional à razão entre o número de espiras de cada lado.",
            ],
            equacoes: [
              { latex: "\\dfrac{V_1}{V_2} = \\dfrac{N_1}{N_2} = a", legenda: "relação de transformação (a)" },
              { latex: "\\dfrac{I_1}{I_2} = \\dfrac{N_2}{N_1} = \\dfrac{1}{a}", legenda: "as correntes se relacionam de forma inversa às tensões" },
            ],
            conteudo2: [
              "Quando N1 > N2 (mais espiras no primário), o transformador é abaixador (V2 < V1). Quando N1 < N2, é elevador. Em ambos os casos, a potência aparente é praticamente conservada (desprezando perdas): S1 ≈ S2.",
            ],
          },
          {
            titulo: "3.4 — Ligações trifásicas de transformadores",
            conteudo: [
              "Transformadores trifásicos podem ter seus enrolamentos primário e secundário ligados em estrela (Y) ou triângulo (Δ), em qualquer combinação: Yy, Yd, Dy, Dd — sendo Dy (delta no primário, estrela no secundário) uma das combinações mais comuns em subestações de distribuição, pois fornece o ponto neutro no secundário.",
              "A defasagem angular entre primário e secundário (indicada por números como Dyn11) é importante para o paralelismo de transformadores e não deve ser ignorada em provas mais avançadas.",
            ],
            conteudo2: [
              "Lembrando do Módulo 2: na ligação delta, V_fase = V_linha; na estrela, V_linha = √3 × V_fase. Isso é o que você usa para calcular a tensão em cada lado de um transformador Dy a partir da relação de espiras.",
            ],
          },
          {
            titulo: "3.5 — Perdas, rendimento e ensaios de transformadores",
            conteudo: [
              "Um transformador real apresenta duas categorias principais de perdas:",
              "• Perdas no núcleo (perdas em vazio ou perdas no ferro): por histerese e correntes parasitas (Foucault), praticamente constantes para uma dada tensão, independente da carga.",
              "• Perdas no cobre (perdas em carga): por efeito Joule nos enrolamentos, proporcionais ao quadrado da corrente de carga.",
            ],
            equacoes: [
              { latex: "\\eta = \\dfrac{P_{saida}}{P_{saida} + P_{nucleo} + P_{cobre}} \\times 100\\%" },
            ],
            conteudo2: [
              "Essas perdas são determinadas, na prática, por dois ensaios padronizados: o ensaio em vazio (a vazio, mede perdas no núcleo) e o ensaio de curto-circuito (mede perdas no cobre e a impedância percentual Zcc%, usada para estimar a corrente de curto-circuito do transformador).",
              "Como as perdas no cobre escalam com o quadrado da corrente, o rendimento de um transformador normalmente é maior a uma fração da carga nominal (não necessariamente a 100%) — outro ponto clássico de prova.",
            ],
          },
          {
            titulo: "3.6 — Autotransformadores",
            conteudo: [
              "O autotransformador é um caso particular de transformador com um único enrolamento, parte dele compartilhada entre primário e secundário. Parte da energia é transferida por condução elétrica direta (sem passar pela transformação eletromagnética), e só a outra parte é efetivamente \"transformada\".",
              "Vantagens: menor custo, menor peso e dimensões mais compactas para uma mesma potência — por isso é muito usado em chaves de partida compensadoras de motores e em ajustes finos de tensão entre níveis próximos.",
              "Desvantagem importante: por não ter isolação galvânica entre primário e secundário, não pode ser usado quando segurança de isolamento elétrico entre os dois lados é exigida.",
            ],
          },
          {
            titulo: "3.7 — Máquinas síncronas: o gerador síncrono",
            conteudo: [
              "O gerador síncrono (alternador) é a máquina que converte a maior parte da energia elétrica do planeta, sendo o coração das usinas hidrelétricas, termelétricas e eólicas de grande porte.",
              "Seu princípio: uma corrente contínua circula pelo enrolamento de campo do rotor, criando um campo magnético fixo em relação ao rotor. Ao girar (movido por uma turbina), esse campo \"varre\" os enrolamentos do estator, induzindo nele uma tensão alternada — pela Lei de Faraday.",
              "A velocidade do rotor (síncrona) está diretamente ligada à frequência gerada e ao número de polos da máquina:",
            ],
            equacoes: [
              { latex: "N_s = \\dfrac{120 \\, f}{p}", legenda: "Ns em rpm, f = frequência em Hz, p = número de polos" },
            ],
          },
          {
            titulo: "3.8 — Regulação de tensão e paralelismo de geradores síncronos",
            conteudo: [
              "A regulação de tensão (RT) de um gerador mede o quanto a tensão terminal varia entre a condição a vazio (sem carga) e a plena carga:",
            ],
            equacoes: [
              { latex: "RT(\\%) = \\dfrac{V_{vazio} - V_{carga}}{V_{carga}} \\times 100" },
            ],
            conteudo2: [
              "Para conectar dois (ou mais) geradores síncronos a um mesmo barramento, alimentando a mesma carga, é preciso satisfazer as condições de sincronismo: mesma tensão eficaz, mesma frequência, mesma sequência de fase e ângulos de fase coincidentes no instante do fechamento da chave. Sem essas condições, o paralelismo pode causar correntes de curto-circuito internas severas entre os geradores.",
            ],
          },
          {
            titulo: "3.9 — Máquinas de corrente contínua: princípio e tipos",
            conteudo: [
              "Motores e geradores CC têm a mesma estrutura básica: um enrolamento de campo (estator, que cria o campo magnético principal) e uma armadura (rotor, onde a tensão é gerada ou onde o torque é desenvolvido), conectados por meio do comutador e das escovas — que mantêm a corrente sempre fluindo no mesmo sentido na armadura, apesar da rotação.",
              "As máquinas CC são classificadas pela forma como o enrolamento de campo é conectado:",
              "• Excitação independente: o campo é alimentado por uma fonte externa separada.",
              "• Em derivação (shunt): o campo está em paralelo com a armadura.",
              "• Série: o campo está em série com a armadura (mesma corrente passa por ambos).",
              "• Composto (cumulativo ou diferencial): combina campo série e campo shunt.",
            ],
          },
          {
            titulo: "3.10 — Motor CC série: por que é usado em cargas pesadas",
            conteudo: [
              "No motor CC série, o fluxo de campo é diretamente proporcional à corrente de armadura (já que é o mesmo enrolamento, em série). Isso gera um comportamento bem característico: torque elevado em baixa velocidade (alta corrente → alto fluxo → alto torque) e velocidade muito alta quando a carga é leve (baixa corrente → baixo fluxo).",
              "Por essa característica, o motor série é tradicionalmente usado em aplicações de partida pesada, como guindastes, guinchos e tração elétrica (trens, bondes) — porém nunca deve ser ligado sem carga mecânica nenhuma, pois pode acelerar descontroladamente (\"fugir\") até se danificar.",
            ],
          },
          {
            titulo: "3.11 — Motores de indução trifásicos: o campo girante",
            conteudo: [
              "O motor de indução é, de longe, o motor mais usado na indústria — robusto, barato e de manutenção simples, pois o rotor não precisa de nenhuma conexão elétrica externa (nem escovas, nem comutador).",
              "Quando uma corrente trifásica equilibrada percorre os três enrolamentos do estator (espaçados 120° entre si no espaço), gera-se um campo magnético girante, de intensidade constante e velocidade síncrona Ns. Esse campo girante \"arrasta\" o rotor por indução — daí o nome do motor.",
              "Importante: o rotor NUNCA gira exatamente na velocidade síncrona; sempre há um pequeno atraso (escorregamento), pois é justamente essa diferença de velocidade relativa que induz corrente no rotor e gera o torque.",
            ],
            equacoes: [
              { latex: "s = \\dfrac{N_s - N}{N_s}", legenda: "escorregamento (s): Ns = velocidade síncrona, N = velocidade real do rotor" },
              { latex: "f_{rotor} = s \\times f", legenda: "frequência das correntes induzidas no rotor" },
            ],
          },
          {
            titulo: "3.12 — Curva de torque x velocidade do motor de indução",
            conteudo: [
              "O comportamento do motor de indução é melhor visualizado por sua curva de conjugado (torque) em função da velocidade (ou do escorregamento):",
              "• Na partida (rotor parado, s = 1), o torque é o conjugado de partida — geralmente entre 150% e 250% do nominal, mas acompanhado de uma corrente de partida muito alta (de 5 a 8 vezes a nominal).",
              "• Conforme acelera, o torque sobe até um pico (conjugado máximo, ou de breakdown) e depois cai até a velocidade de operação nominal, próxima da síncrona, onde o torque se equilibra com a carga.",
            ],
            dicas: [
              { gatilho: "ver a curva torque × velocidade", titulo: "Conjugado x velocidade do motor de indução", tipo: "torque-velocidade-inducao",
                explicacao: "O torque parte de um valor relativamente alto (partida), sobe até um pico (conjugado máximo) e cai até zero na velocidade síncrona, onde não há mais escorregamento e, portanto, não há mais corrente induzida no rotor — e sem corrente induzida, não há torque." },
            ],
          },
          {
            titulo: "3.13 — Métodos de partida de motores de indução",
            conteudo: [
              "Como a corrente de partida direta pode causar quedas de tensão significativas na rede (e exigir disjuntores e cabos sobredimensionados só para suportar um pico de poucos segundos), métodos de partida indireta são usados em motores de maior potência:",
              "• Partida direta: liga o motor diretamente na tensão nominal — simples, mas com pico de corrente máximo (5-8× a nominal). Indicada apenas para motores pequenos ou redes robustas.",
              "• Partida estrela-triângulo: o motor liga inicialmente em estrela (menor tensão por fase, menor corrente) e comuta para triângulo após alguns segundos, na tensão/corrente nominal. Reduz a corrente de partida para cerca de 1/3 da partida direta — mas também reduz o torque de partida na mesma proporção.",
              "• Chave compensadora (autotransformador de partida): parte com tensão reduzida por um autotransformador, com taps típicos de 50%, 65% e 80% — permite um ajuste mais fino do compromisso entre corrente e torque de partida.",
              "• Soft-starter: dispositivo eletrônico que eleva a tensão gradualmente (rampa), suavizando a partida tanto eletricamente quanto mecanicamente; muito usado em bombas e esteiras, para evitar golpes de carga.",
              "• Inversor de frequência: além de partir o motor com torque controlado, permite variar a velocidade continuamente após a partida — é a solução mais flexível, mas a de maior custo.",
            ],
          },
          {
            titulo: "3.14 — Motores de indução monofásicos",
            conteudo: [
              "Diferente do trifásico, um único enrolamento monofásico não cria um campo girante por si só — cria apenas um campo pulsante (que não tem capacidade de gerar torque de partida sozinho, embora consiga manter a rotação uma vez que o motor já esteja girando).",
              "Por isso, motores monofásicos são classificados pelo método usado para gerar o torque de partida:",
              "• Fase dividida (split-phase): usa um enrolamento auxiliar de partida, desligado por uma chave centrífuga após o motor atingir certa velocidade.",
              "• Capacitor de partida: usa um capacitor em série com o enrolamento auxiliar, aumentando o torque de partida — muito comum em compressores e bombas.",
              "• Capacitor permanente: o capacitor fica permanentemente em série com o enrolamento auxiliar, melhorando o fator de potência e a eficiência durante toda a operação.",
              "• Polos sombreados (shaded-pole): um anel de cobre em parte do polo cria a defasagem necessária para a partida — sistema simples e barato, mas com baixo torque de partida, usado em ventiladores pequenos.",
            ],
          },
          {
            titulo: "3.15 — Dispositivos de proteção de baixa tensão",
            conteudo: [
              "A proteção de circuitos de baixa tensão se apoia em três frentes principais:",
              "• Fusíveis: elemento metálico que se funde (interrompendo o circuito) quando a corrente excede um valor por tempo suficiente. Simples e confiável, mas precisa ser substituído após atuar.",
              "• Disjuntores termomagnéticos: combinam um elemento térmico (bimetálico, para sobrecargas — atuação lenta) e um elemento magnético (solenoide, para curto-circuitos — atuação quase instantânea). Podem ser religados após atuar, sem substituição de peças.",
              "• Dispositivo DR (diferencial-residual): mede a diferença entre a corrente que entra e a que sai do circuito protegido; se essa diferença (corrente de fuga, geralmente para a terra) superar um limite (tipicamente 30 mA para proteção de pessoas), o DR desarma. Protege contra choques elétricos por contato indireto — não substitui o disjuntor, que protege contra sobrecarga/curto.",
            ],
            dicas: [
              { gatilho: "ver a curva tempo × corrente do disjuntor", titulo: "Curva de atuação do disjuntor termomagnético", tipo: "curva-disjuntor",
                explicacao: "Para correntes pouco acima da nominal, a atuação é lenta (zona térmica, sobrecarga — segundos a minutos). Para correntes muito elevadas, a atuação é quase instantânea (zona magnética, curto-circuito — milissegundos)." },
            ],
          },
          {
            titulo: "3.16 — Seletividade e comandos elétricos",
            conteudo: [
              "Seletividade é a capacidade de um sistema de proteção fazer apenas o disjuntor mais próximo da falta atuar, mantendo o restante da instalação energizado — essencial em instalações com vários níveis de disjuntores em série (geral, distribuição, ramal).",
              "Já os comandos elétricos automatizam o acionamento de motores e cargas a partir de sinais de baixa potência:",
              "• Contator: uma \"chave\" eletromagnética operada por uma bobina, que liga/desliga o circuito de força.",
              "• Relé térmico: protege o motor contra sobrecarga, monitorando a corrente e atuando se ela ficar elevada por tempo prolongado.",
              "• CLP (Controlador Lógico Programável): substitui a lógica de relés/contatores tradicional por um programa executado eletronicamente, com lógicas como a Ladder (diagrama de contatos) — padronizada pela IEC 61131-3 — permitindo automatizar sequências complexas de forma muito mais flexível que o comando a relés puro.",
              "Esse é o fechamento do Bloco I do edital verticalizado — o próximo módulo (Medidas Elétricas e Instalações) avança para instrumentação, retificadores/baterias e instalações de baixa e média tensão.",
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
        descricao: "Simbologia elétrica, circuitos CC e CA, potência, máquinas elétricas, proteção, acionamentos e NR-10.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "1.1 — Simbologia e Diagramas Elétricos",
            conteudo: [
              "A comunicação técnica em instalações e manutenção elétrica é feita por diagramas e esquemas normalizados. Dominar a leitura desses documentos é exigência fundamental para o técnico de manutenção elétrica da Petrobras.",
              "No Brasil, a NBR 5444 define os símbolos gráficos para instalações elétricas prediais. Para instalações industriais, a referência é a IEC 60617, adotada pela Petrobras e por todas as grandes indústrias do setor de petróleo e gás.",
              "O diagrama unifilar representa o sistema elétrico de forma simplificada, usando uma única linha para representar os três condutores de fase de um sistema trifásico. É o documento de maior nível de abstração: mostra a topologia geral do sistema, os equipamentos principais (transformadores, disjuntores, chaves), os barramentos e as proteções, sem detalhar a fiação individual. É o principal documento de uma subestação.",
              "O diagrama trifilar representa cada condutor individualmente — as três fases (R, S, T), o neutro (N) e o condutor de proteção (PE). É essencial durante a execução de obras e a manutenção, pois permite rastrear cada fio em cada ponto da instalação. Em painéis de controle industrial, é o documento de referência da equipe de manutenção.",
              "Os esquemas de acionamento mostram como os dispositivos de comando e controle (contatores, relés, temporizadores, botões, sensores, chaves de posição) são interligados para controlar motores e outras cargas. Todo esquema é dividido em: circuito de potência (condutores de força, nas tensões e correntes de trabalho do motor) e circuito de comando (tensões menores, geralmente 24V CC ou 110V CA, que controlam as bobinas dos contatores).",
              "Os principais símbolos que o técnico deve memorizar: resistor (retângulo), capacitor (duas barras paralelas), indutor (semicírculos), contato NA normalmente aberto (traços paralelos com abertura), contato NF normalmente fechado (idem com barra diagonal de bloqueio), bobina de relé ou contator (círculo), motor (M em círculo), transformador (dois espirais acoplados), fusível (retângulo com fio), disjuntor (quadrado com traço), símbolos de terra e neutro.",
              "Ponto de atenção para concursos: um contato normalmente aberto (NA) de um contator está ABERTO quando o contator está desenergizado e FECHADO quando a bobina é acionada. O estado 'normal' é sempre o estado de repouso, sem energia na bobina. Isso é frequentemente explorado em questões de prova.",
              "Na leitura de diagramas de potência trifásicos, as fases são identificadas por L1, L2, L3 (padrão IEC) ou R, S, T (padrão brasileiro antigo). Invertendo duas fases, o campo girante do motor inverte e o motor gira no sentido contrário — base do acionamento reversível.",
            ],
            equacoes: [],
            conteudo2: [
              "Dica de prova: diagramas unifilares são usados para documentação e visão geral do sistema. Diagramas trifilares são usados para manutenção e execução. Esquemas funcionais são usados para entender a lógica de comando e controle.",
            ],
          },
          {
            titulo: "1.2 — Circuitos de Corrente Contínua",
            conteudo: [
              "A corrente contínua (CC) é aquela em que os elétrons fluem sempre no mesmo sentido, com magnitude constante ao longo do tempo. É produzida por baterias, retificadores, células fotovoltaicas e geradores CC. Na Petrobras, os circuitos CC alimentam sistemas de proteção e controle de subestações, sistemas de no-break e painéis de instrumentação.",
              "A corrente elétrica (I) é o fluxo de carga por unidade de tempo. A unidade é o Ampère (A). A tensão elétrica (V) é a diferença de potencial entre dois pontos, medida em Volts. A resistência (R) é a oposição do material ao fluxo de corrente, medida em Ohms.",
              "A Lei de Ohm, estabelecida em 1827, é a relação mais fundamental dos circuitos resistivos: a tensão em um resistor ideal é diretamente proporcional à corrente que o atravessa. Esta lei é válida para materiais ôhmicos — aqueles cuja resistência não varia com a tensão ou a corrente.",
              "A resistividade (ρ) é uma propriedade intrínseca do material. O cobre tem ρ = 1,72×10⁻⁸ Ω·m a 20°C; o alumínio tem 2,82×10⁻⁸ Ω·m. Por isso condutores de alumínio precisam ter seção maior que os de cobre para conduzir a mesma corrente com a mesma queda de tensão.",
              "A resistência aumenta com a temperatura em metais (coeficiente positivo). O cobre tem coeficiente α = 0,00393/°C. Isso significa que motores, transformadores e condutores ficam mais resistivos quando aquecem, aumentando as perdas em regime de sobrecarga.",
              "Na associação em série, todos os componentes são percorridos pela mesma corrente e as tensões se somam. Na associação em paralelo, todos os componentes têm a mesma tensão e as correntes se somam. Em circuitos mistos, simplifica-se progressivamente.",
              "A 1ª Lei de Kirchhoff (lei dos nós): a soma algébrica das correntes em qualquer nó de um circuito é zero. É a conservação de carga elétrica no nó.",
              "A 2ª Lei de Kirchhoff (lei das malhas): a soma algébrica das tensões em qualquer malha fechada é zero. É a conservação de energia ao longo de qualquer caminho fechado.",
              "O divisor de tensão é uma configuração série muito usada em instrumentação: dois resistores R1 e R2 em série, com Vout = V × R2/(R1+R2). É o princípio dos potenciômetros e dos circuitos de referência de tensão.",
              "A potência dissipada por um resistor é P = V × I. Combinando com a Lei de Ohm: P = I²R (útil quando se conhece a corrente — cálculo de perdas em condutores) e P = V²/R (útil quando se conhece a tensão).",
            ],
            equacoes: [
              { latex: "V = R \\cdot I \\quad R = \\dfrac{V}{I} \\quad I = \\dfrac{V}{R}", legenda: "Lei de Ohm — três formas" },
              { latex: "R = \\rho \\cdot \\dfrac{L}{A}", legenda: "Resistência do condutor: ρ = resistividade (Ω·m), L = comprimento (m), A = seção (m²)" },
              { latex: "R_{série} = R_1 + R_2 + \\cdots + R_n", legenda: "Resistência equivalente em série" },
              { latex: "\\dfrac{1}{R_{par}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots", legenda: "Resistência equivalente em paralelo" },
              { latex: "P = V \\cdot I = I^2 \\cdot R = \\dfrac{V^2}{R}", legenda: "Potência elétrica — três formas" },
            ],
            conteudo2: [
              "Exemplo: condutor de cobre 2,5 mm², 30 m de comprimento (ida+volta = 60 m), conduzindo 20 A. R = 1,72×10⁻⁸ × 60 / (2,5×10⁻⁶) = 0,413 Ω. Queda de tensão: ΔV = 0,413 × 20 ≈ 8,26 V — representa 6,5% sobre 127 V, acima do limite de 3% da NBR 5410 para circuitos terminais.",
            ],
          },
          {
            titulo: "1.3 — Circuitos de Corrente Alternada",
            conteudo: [
              "A corrente alternada (CA) varia periodicamente no tempo, invertendo seu sentido a cada meio ciclo. É o padrão de geração, transmissão e distribuição de energia elétrica por permitir a transformação fácil de níveis de tensão por meio de transformadores.",
              "A grandeza CA mais comum tem forma senoidal: v(t) = Vp × sen(ωt + φ), onde Vp é o valor de pico, ω = 2πf é a frequência angular em rad/s, f é a frequência em Hz e φ é o ângulo de fase inicial. No Brasil, f = 60 Hz e ω ≈ 377 rad/s.",
              "O período T é o tempo de um ciclo completo: T = 1/f. Em 60 Hz, T ≈ 16,67 ms.",
              "O valor eficaz (RMS) é o valor de CC equivalente em potência. Para senoide pura: Vrms = Vp/√2 ≈ 0,707 Vp. A tomada de 127 V (eficaz) tem pico de 127√2 ≈ 179,6 V. Os multímetros em CA medem o valor eficaz.",
              "Indutores e capacitores apresentam reatância em CA. A reatância indutiva XL é proporcional à frequência: quanto maior f, maior XL e menor corrente. A reatância capacitiva XC é inversamente proporcional à frequência: quanto maior f, menor XC e maior corrente.",
              "A fase entre tensão e corrente em elementos reativos: no indutor, corrente atrasa 90° da tensão. No capacitor, corrente adianta 90° da tensão. No resistor, tensão e corrente estão em fase. Mnemônico: ELI the ICE man — ELI (tensão E antes da corrente I em indutor L); ICE (corrente I antes da tensão E em capacitor C).",
              "A impedância Z é a oposição total (resistiva + reativa) de um circuito CA. No plano complexo, R é a parte real e a reatância é a parte imaginária. O módulo |Z| relaciona valores eficazes: Vrms = |Z| × Irms.",
              "O ângulo de fase φ é o ângulo entre os fasores de tensão e corrente. FP = cos(φ). Para circuito RL série: φ = arctan(XL/R), corrente atrasada. Para RC série: φ = arctan(-XC/R), corrente adiantada.",
              "A ressonância em série ocorre quando XL = XC, tornando a impedância mínima (= R) e a corrente máxima. A frequência de ressonância é f₀ = 1/(2π√LC). Em ressonância, a tensão nos componentes reativos pode ser muito maior que a tensão da fonte — fenômeno de sobretensão.",
            ],
            equacoes: [
              { latex: "v(t) = V_p \\cdot \\sen(\\omega t + \\varphi)", legenda: "Tensão senoidal instantânea" },
              { latex: "V_{rms} = \\dfrac{V_p}{\\sqrt{2}} \\approx 0{,}707\\,V_p", legenda: "Valor eficaz de tensão senoidal" },
              { latex: "X_L = 2\\pi f L \\quad (\\Omega)", legenda: "Reatância indutiva — aumenta com a frequência" },
              { latex: "X_C = \\dfrac{1}{2\\pi f C} \\quad (\\Omega)", legenda: "Reatância capacitiva — diminui com a frequência" },
              { latex: "Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad \\varphi = \\arctan\\!\\left(\\dfrac{X_L - X_C}{R}\\right)", legenda: "Impedância e ângulo de fase do circuito RLC série" },
              { latex: "f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}", legenda: "Frequência de ressonância em série" },
            ],
            conteudo2: [
              "Exemplo: circuito RL série com R = 30 Ω, L = 0,1 H, alimentado por 127 V / 60 Hz. XL = 2π×60×0,1 ≈ 37,7 Ω. |Z| = √(30²+37,7²) ≈ 48,1 Ω. I = 127/48,1 ≈ 2,64 A. φ = arctan(37,7/30) ≈ 51,5°. FP = cos(51,5°) ≈ 0,624 indutivo.",
              "Dica de prova: motores elétricos são cargas RL — corrente sempre atrasada, FP indutivo, sempre menor que 1. Entender isso é fundamental para compreender a necessidade de correção de fator de potência.",
            ],
          },
          {
            titulo: "1.4 — Potência e Energia em Circuitos CA",
            conteudo: [
              "Em circuitos CA com cargas reativas (indutivas ou capacitivas), a potência se desdobra em três componentes. Dominar o triângulo das potências é essencial para qualquer técnico de manutenção elétrica.",
              "A potência ativa (P), em Watts (W) ou kW, é a potência efetivamente convertida em trabalho útil — calor em resistências, movimento em motores, luz em lâmpadas. É a que aparece na conta de energia e no wattímetro.",
              "A potência reativa (Q), em var ou kvar, é a energia que oscila entre a fonte e os elementos reativos sem ser convertida em trabalho. Não aparece na conta de energia, mas circula nos condutores e transformadores, aquecendo-os e reduzindo sua capacidade útil.",
              "A potência aparente (S), em VA ou kVA, é a potência total fornecida pela fonte — o produto dos valores eficazes de tensão e corrente. Representa a capacidade total que geradores, transformadores e cabos precisam ter. É o valor de referência no dimensionamento desses equipamentos.",
              "O triângulo das potências: P é o cateto horizontal (potência útil), Q é o cateto vertical (potência reativa) e S é a hipotenusa (potência aparente). O ângulo φ entre S e P é o ângulo de fase da carga.",
              "O fator de potência (FP = cos φ) indica a eficiência do uso da energia. FP = 1 (carga puramente resistiva): toda energia vira trabalho. FP = 0 (carga puramente reativa): nenhum trabalho, máxima corrente.",
              "Os motores elétricos industriais operam tipicamente com FP entre 0,7 e 0,92. A ANEEL exige FP mínimo de 0,92 indutivo para consumidores de MT e AT. Abaixo disso, há cobrança de energia reativa excedente na fatura.",
              "A correção do FP é feita por bancos de capacitores em paralelo com as cargas indutivas. Capacitores geram potência reativa capacitiva (Q negativo), compensando a potência reativa indutiva dos motores. A corrente demandada da rede cai, as perdas nos cabos diminuem e a tensão nas cargas melhora.",
              "Para calcular a potência reativa do banco de capacitores para elevar o FP de cos φ₁ para cos φ₂: Qc = P × (tan φ₁ − tan φ₂). Exemplo: carga 100 kW, FP 0,7 (tan φ₁ = 1,02), elevar para FP 0,92 (tan φ₂ = 0,426): Qc = 100 × (1,02 − 0,426) = 59,4 kvar.",
              "A energia elétrica (E) é a potência integrada no tempo. Na prática comercial, usa-se o quilowatt-hora (kWh): 1 kWh = 3,6 × 10⁶ J = 3,6 MJ.",
            ],
            equacoes: [
              { latex: "P = V\\,I\\cos\\varphi \\quad (\\text{W})", legenda: "Potência ativa" },
              { latex: "Q = V\\,I\\sen\\varphi \\quad (\\text{var})", legenda: "Potência reativa (+ indutiva, − capacitiva)" },
              { latex: "S = V\\,I = \\sqrt{P^2 + Q^2} \\quad (\\text{VA})", legenda: "Potência aparente" },
              { latex: "FP = \\cos\\varphi = \\dfrac{P}{S}", legenda: "Fator de potência" },
              { latex: "Q_C = P\\,(\\tan\\varphi_1 - \\tan\\varphi_2)", legenda: "Potência reativa do banco de capacitores para correção do FP" },
            ],
          },
          {
            titulo: "1.5 — Circuitos Trifásicos: Estrela e Triângulo",
            conteudo: [
              "O sistema trifásico é composto por três tensões senoidais de mesma amplitude e frequência, defasadas 120° entre si. É o padrão mundial para geração, transmissão e distribuição de energia elétrica, por ser mais eficiente que o monofásico para a mesma quantidade de material.",
              "As vantagens do sistema trifásico sobre o monofásico: potência constante (a soma instantânea das três potências é constante, sem pulsações — motores trifásicos operam mais suavemente); transmissão mais eficiente (usa 75% do cobre do sistema monofásico equivalente); e permite dois níveis de tensão (fase e linha) com os mesmos condutores.",
              "Na ligação em estrela (Y), os três enrolamentos têm um ponto comum chamado neutro (N). A tensão de fase (Vf) é medida entre qualquer fase e o neutro. A tensão de linha (VL) é medida entre duas fases. VL = √3 × Vf ≈ 1,732 × Vf. No Brasil, o sistema baixa tensão mais comum: 127 V (fase-neutro) e 220 V (linha-linha). Em instalações industriais de BT: 220 V (fase) e 380 V (linha).",
              "Em estrela, a corrente de linha é igual à corrente de fase: IL = If. O neutro conduz a corrente de desequilíbrio entre as três fases. Em sistema equilibrado (cargas iguais nas três fases), a corrente de neutro é zero.",
              "Na ligação em triângulo (Δ), não existe ponto neutro. A tensão de linha é igual à tensão de fase: VL = Vf. A corrente de linha é √3 vezes a corrente de fase: IL = √3 × If.",
              "A partida estrela-triângulo de motores explora a diferença entre as ligações: na partida em estrela, cada enrolamento recebe VL/√3 (tensão reduzida). Na operação em triângulo, cada enrolamento recebe VL (tensão plena). A transição é automática após alguns segundos.",
              "Para cargas trifásicas equilibradas, a potência ativa total é três vezes a potência de uma fase, expressa em função das grandezas de linha para facilitar as medições com voltímetro e amperímetro.",
              "O método dos dois wattímetros mede a potência ativa total de um sistema trifásico a 3 fios com apenas dois wattímetros: P_total = W1 + W2 (as leituras podem ser positivas ou negativas dependendo do FP).",
            ],
            equacoes: [
              { latex: "\\text{Estrela: }\\; V_L = \\sqrt{3}\\,V_f \\approx 1{,}732\\,V_f \\;,\\quad I_L = I_f", legenda: "Relações em estrela" },
              { latex: "\\text{Triângulo: }\\; V_L = V_f \\;,\\quad I_L = \\sqrt{3}\\,I_f \\approx 1{,}732\\,I_f", legenda: "Relações em triângulo" },
              { latex: "P_{total} = \\sqrt{3}\\,V_L\\,I_L\\,\\cos\\varphi", legenda: "Potência ativa trifásica total" },
              { latex: "S_{total} = \\sqrt{3}\\,V_L\\,I_L \\;,\\quad Q_{total} = \\sqrt{3}\\,V_L\\,I_L\\,\\sen\\varphi", legenda: "Potências aparente e reativa trifásicas" },
            ],
            conteudo2: [
              "Exemplo: motor trifásico 380 V (linha), FP 0,85, I = 20 A. P = √3 × 380 × 20 × 0,85 ≈ 11.186 W. S = √3 × 380 × 20 ≈ 13.160 VA. Q = √(S²−P²) ≈ 6.936 var.",
              "Dica de prova: em sistemas 380/220 V — 380 V é tensão de linha (entre fases), 220 V é tensão de fase (entre fase e neutro). Em sistemas 220/127 V — 220 V é linha, 127 V é fase. Confundir os dois é o erro mais comum em questões trifásicas.",
            ],
          },
          {
            titulo: "1.6 — Eletromagnetismo Aplicado a Máquinas",
            conteudo: [
              "O eletromagnetismo descreve a relação entre campos elétricos e magnéticos. É a base de funcionamento de todos os motores, geradores, transformadores e solenóides. Compreender esses princípios é fundamental para entender como as máquinas funcionam e como diagnosticar falhas.",
              "O campo magnético é criado por correntes elétricas. Em um condutor reto, o campo envolve o condutor em círculos concêntricos — regra da mão direita. Em uma bobina (solenóide), os campos dos espiros se somam, criando um campo axial similar ao de um ímã permanente.",
              "O fluxo magnético (Φ) mede a quantidade de linhas de campo que atravessam uma superfície, em Webers (Wb). A indução magnética ou densidade de fluxo (B) é o fluxo por unidade de área: B = Φ/A, em Tesla (T).",
              "A Lei de Faraday: qualquer variação do fluxo magnético em um circuito induz uma tensão (fem) nesse circuito, proporcional à taxa de variação e ao número de espiras N. É o princípio do transformador, do gerador e dos sensores indutivos.",
              "A Lei de Lenz: a corrente induzida sempre tem sentido que se opõe à variação de fluxo que a originou. Consequência: quando o fluxo aumenta, a corrente induzida cria campo contrário. Quando diminui, cria campo favorável. Isso explica o torque de frenagem em geradores e o torque motor nos motores.",
              "As correntes de Foucault (parasitas) são correntes induzidas que circulam no próprio núcleo metálico, causando perdas por efeito Joule e aquecimento. Para minimizá-las, os núcleos são laminados — finas chapas de aço isoladas entre si que dividem os caminhos das correntes parasitas.",
              "A histerese magnética é a tendência do material ferromagnético de manter a magnetização anterior. A cada ciclo de magnetização (60 vezes por segundo em 60 Hz), o material dissipa energia em forma de calor. O aço-silício tem perdas muito menores que o aço comum — por isso é usado em transformadores e motores.",
              "A permeabilidade magnética relativa (μr) indica quão mais fácil é magnetizar um material em comparação ao vácuo (μr = 1). O aço-silício tem μr ≈ 5.000 a 10.000. Quanto maior μr, menor a corrente de excitação necessária.",
              "A força de Lorentz é a força sobre um condutor percorrido por corrente dentro de um campo magnético: F = B × I × L × sen(θ). Esta é a força que impulsiona o rotor do motor elétrico — a interação entre o campo girante do estator e as correntes no rotor produz o torque.",
            ],
            equacoes: [
              { latex: "e = N \\cdot \\dfrac{\\Delta\\Phi}{\\Delta t}", legenda: "Lei de Faraday: fem induzida: N = espiras, ΔΦ = variação do fluxo (Wb), Δt = intervalo de tempo (s)" },
              { latex: "B = \\dfrac{\\Phi}{A} \\quad (\\text{Tesla})", legenda: "Indução magnética" },
              { latex: "B = \\mu_0\\,\\mu_r\\,H", legenda: "Relação B-H: μ₀ = 4π×10⁻⁷ H/m" },
              { latex: "F = B\\,I\\,L\\,\\sen\\theta \\quad (\\text{N})", legenda: "Força de Lorentz sobre condutor em campo magnético" },
            ],
          },
          {
            titulo: "1.7 — Transformadores de Potência",
            conteudo: [
              "O transformador é a máquina elétrica mais simples e mais eficiente existente — estático, sem partes móveis, transfere energia entre circuitos por indução eletromagnética alterando tensão e corrente sem alterar a frequência. Eficiências acima de 98% são comuns em grandes transformadores.",
              "A construção básica consiste em dois ou mais enrolamentos de cobre enrolados em um núcleo ferromagnético laminado. O enrolamento ligado à fonte é o primário; o que alimenta a carga é o secundário. A energia flui do primário ao secundário via fluxo magnético no núcleo — sem contato elétrico (isolamento galvânico).",
              "A relação de transformação (a) relaciona espiras, tensões e correntes. No transformador ideal (sem perdas), potência de entrada igual à de saída: V1×I1 = V2×I2. Se o transformador eleva a tensão (V2>V1), a corrente cai proporcionalmente (I2<I1).",
              "As perdas no ferro (Pfe) ocorrem no núcleo por histerese e correntes de Foucault. São praticamente constantes independentemente da carga — dependem da tensão e frequência. As perdas no cobre (Pcu) ocorrem nos enrolamentos por efeito Joule e são proporcionais ao quadrado da corrente: variam com o quadrado da carga.",
              "O rendimento máximo ocorre quando Pfe = Pcu — geralmente entre 50% e 75% da carga nominal, porque a maioria dos transformadores opera com carga variável ao longo do dia.",
              "O ensaio em vazio (secundário aberto, tensão nominal no primário) mede as perdas no ferro (Pfe = V1 × I0 × cos φ0), a corrente de excitação I0 (tipicamente 1 a 5% da nominal) e o FP de excitação (tipicamente 0,1 a 0,3).",
              "O ensaio em curto-circuito (secundário em curto, tensão reduzida no primário até circular a corrente nominal) mede as perdas no cobre (Pcu), a tensão de curto-circuito (Vcc em % da nominal — tipicamente 4% a 12%) e a impedância percentual Zcc%. O Zcc% é fundamental para calcular a corrente de curto-circuito no barramento de BT.",
              "A corrente de curto-circuito no secundário do transformador é Icc = In / (Zcc%/100). Exemplo: transformador 500 kVA, 13.800/380 V, Zcc% = 5%. In_BT = 500.000/(√3×380) ≈ 760 A. Icc = 760/0,05 = 15.200 A. Os disjuntores do quadro de BT devem ter Icu ≥ 15.200 A.",
              "O grupo de ligação indica as conexões dos enrolamentos e o ângulo de defasagem. O mais comum no Brasil: Dyn11 (triângulo no primário de 13,8 kV, estrela aterrada no secundário de 380/220 V, 30° de defasagem).",
              "A proteção do transformador inclui: relé de Buchholz (detecta gases de falhas internas no óleo), termômetro com alarme e desligamento, relé diferencial (proteção contra curto interno), fusíveis de AT e disjuntores de BT.",
            ],
            equacoes: [
              { latex: "a = \\dfrac{N_1}{N_2} = \\dfrac{V_1}{V_2} = \\dfrac{I_2}{I_1}", legenda: "Relação de transformação (transformador ideal)" },
              { latex: "\\eta = \\dfrac{P_2}{P_2 + P_{fe} + P_{cu}}", legenda: "Rendimento do transformador" },
              { latex: "Z_{cc}\\% = \\dfrac{V_{cc}}{V_{nominal}} \\times 100", legenda: "Impedância percentual de curto-circuito" },
              { latex: "I_{cc} = \\dfrac{I_{nominal}}{Z_{cc}\\%/100}", legenda: "Corrente de curto-circuito no barramento de BT" },
            ],
            conteudo2: [
              "Dica de prova: Zcc% baixo → corrente de curto maior, mais exigente para os disjuntores, melhor regulação de tensão. Zcc% alto → limita mais o curto, mas regulação de tensão pior (maior queda com a carga). Transformadores de distribuição residencial têm Zcc% entre 4% e 6%.",
            ],
          },
          {
            titulo: "1.8 — Motor de Indução Trifásico",
            conteudo: [
              "O motor de indução trifásico (MIT) é a máquina elétrica rotativa mais utilizada na indústria em todo o mundo — estima-se que responda por mais de 70% do consumo elétrico industrial. Sua popularidade decorre da robustez (rotor de gaiola não tem escovas nem contatos deslizantes), simplicidade de manutenção, custo reduzido e longa vida útil.",
              "O princípio de funcionamento baseia-se no campo girante: as três correntes trifásicas defasadas 120° alimentando os enrolamentos distribuídos no estator criam um campo magnético resultante que gira na velocidade síncrona Ns. Esse campo corta os condutores do rotor, induzindo correntes rotóricas (Lei de Faraday). As correntes rotóricas interagem com o campo girante, produzindo torque que impulsiona o rotor.",
              "O rotor de gaiola de esquilo (o mais comum) consiste em barras condutoras de alumínio (ou cobre nos rotores de alta eficiência) curto-circuitadas nas extremidades por anéis. Não há contato elétrico externo com o rotor — toda a energia é transferida por indução.",
              "O escorregamento (s) é a diferença relativa entre a velocidade síncrona e a velocidade real do rotor. Em vazio ideal, s ≈ 0. Com carga nominal, s está tipicamente entre 1% e 5%. No torque máximo (ponto de tombamento), s é o escorregamento crítico sc (tipicamente 10% a 20%). Para s > sc, o motor é instável.",
              "A frequência das correntes rotóricas depende do escorregamento: fr = s × frede. Em vazio (s≈0), fr ≈ 0 (quase CC no rotor). A plena carga (s=3%), fr = 1,8 Hz. Por isso o rotor aquece menos próximo à velocidade síncrona.",
              "As perdas do MIT incluem: perdas no ferro do estator (histerese + Foucault), perdas no cobre do estator (I²R), perdas no cobre do rotor (proporcionais ao escorregamento: Pr = s × Pentrefer), perdas mecânicas (mancais + ventilador) e perdas adicionais.",
              "A corrente de partida direta é 5 a 8 vezes a corrente nominal, porque na partida (s=1) a reatância rotórica é máxima e o circuito equivalente do rotor se comporta como curto-circuito. Essa corrente alta cria queda de tensão na rede, afetando outros equipamentos.",
              "Métodos de partida: (a) Estrela-triângulo: tensão de fase = VL/√3 na partida, corrente = 1/3 e torque = 1/3 da partida direta. Para cargas leves na partida. (b) Soft-starter: eleva a tensão gradualmente com SCRs, sem transiente de comutação. (c) Inversor de frequência (VFD): controla frequência e tensão — partida suavíssima com corrente constante, além de controle contínuo de velocidade.",
              "A placa de identificação (nameplate) contém: potência nominal (kW/cv), tensão nominal (V), corrente nominal (A), velocidade nominal (rpm), rendimento (%), FP, classe de isolamento (A, B, F, H), grau de proteção (IP) e esquema de ligação.",
              "Diagnóstico de falhas em motores: desequilíbrio de corrente (problema de isolamento ou conexão), vibração excessiva (desbalanceamento ou rolamento desgastado), temperatura acima do normal (sobrecarga, má ventilação ou falha de isolamento), ruído incomum (rolamento danificado), corrente acima da nominal (sobrecarga mecânica ou tensão abaixo do nominal).",
            ],
            equacoes: [
              { latex: "N_s = \\dfrac{120\\,f}{p} \\quad (\\text{rpm})", legenda: "Velocidade síncrona: f = frequência (Hz), p = número de polos" },
              { latex: "s = \\dfrac{N_s - N_r}{N_s}", legenda: "Escorregamento" },
              { latex: "N_r = N_s\\,(1-s)", legenda: "Velocidade do rotor" },
              { latex: "f_{rotor} = s\\,f_{rede}", legenda: "Frequência das correntes rotóricas" },
            ],
            conteudo2: [
              "Exemplo: motor 4 polos, 60 Hz, 1740 rpm. Ns = 120×60/4 = 1800 rpm. s = (1800−1740)/1800 = 3,33%. fr = 0,0333×60 = 2 Hz.",
              "Dica de prova: 2 polos/60 Hz → 3600 rpm. 4 polos → 1800 rpm. 6 polos → 1200 rpm. 8 polos → 900 rpm. A velocidade real é sempre menor que a síncrona (exceto em gerador de indução). 'Motor 1745 rpm em 60 Hz' → 4 polos, s ≈ 3%.",
            ],
          },
          {
            titulo: "1.9 — Máquinas Síncronas e Motores CC",
            conteudo: [
              "As máquinas síncronas operam exatamente na velocidade síncrona — sem escorregamento. O rotor gira na mesma velocidade do campo girante do estator. São usadas em geração de energia (todas as usinas) e em acionamentos de alta potência com FP controlável.",
              "O gerador síncrono (alternador) é usado em termelétricas, hidrelétricas, nucleares e eólicas (exceto turbinas de velocidade variável). O rotor (campo de excitação CC) é acionado mecanicamente pela turbina; o estator (enrolamentos trifásicos) produz a tensão de saída.",
              "Controlando a corrente de campo (If) via AVR (regulador automático de tensão), controla-se a tensão terminal e o fator de potência. Sobreexcitado → fornece potência reativa indutiva. Subexcitado → absorve potência reativa.",
              "O motor síncrono opera na velocidade síncrona independentemente da carga (dentro dos limites de torque). É usado onde se exige velocidade constante precisa e em compressores de grande porte. Sobreexcitado, funciona como compensador de potência reativa.",
              "A partida do motor síncrono é a principal dificuldade: não pode partir sozinho na velocidade síncrona. Métodos: partida assíncrona (barras auxiliares de gaiola no rotor para partir como motor de indução) ou partida por inversor de frequência.",
              "Os motores de corrente contínua (CC) permitem controle preciso de velocidade e torque. São usados em laminadores, guindastes e servas de posicionamento. A principal desvantagem é o comutador (coletor) com escovas de grafite — componentes de desgaste que exigem manutenção periódica.",
              "A fem contraeletromotriz (E) é gerada pela rotação da armadura no campo magnético, opondo-se à tensão aplicada. Em regime: E = V − Ra × Ia. Na partida, n=0 → E=0 → corrente muito alta. Por isso usam-se resistores de partida em série com a armadura.",
              "Tipos de motores CC por excitação: (a) Independente — campo alimentado separadamente; melhor controle. (b) Shunt (derivação) — campo em paralelo; velocidade quase constante. (c) Série — campo em série; altíssimo torque na partida, mas nunca operar sem carga (risco de disparo por velocidade excessiva). (d) Composta — série + derivação; equilíbrio entre torque e regulação.",
              "A velocidade do motor CC shunt é controlada por: variação da tensão de armadura V (abaixo da velocidade base — método mais eficiente), resistência em série com a armadura (ineficiente), ou enfraquecimento do campo (acima da velocidade base).",
            ],
            equacoes: [
              { latex: "N_s = \\dfrac{120\\,f}{p} \\quad \\text{(rotor síncrono gira nesta velocidade)}", legenda: "Velocidade síncrona" },
              { latex: "E = V - R_a\\,I_a", legenda: "Fem contraeletromotriz do motor CC" },
              { latex: "n = \\dfrac{V - R_a\\,I_a}{K\\,\\Phi}", legenda: "Velocidade do motor CC excitação independente/shunt" },
              { latex: "T = K_T\\,\\Phi\\,I_a", legenda: "Torque do motor CC" },
            ],
          },
          {
            titulo: "1.10 — Dispositivos de Proteção de Baixa Tensão",
            conteudo: [
              "Os dispositivos de proteção elétrica detectam condições anormais (sobrecarga, curto-circuito, fuga à terra) e interrompem o circuito de forma rápida e seletiva, protegendo condutores, equipamentos e pessoas. Para o técnico de manutenção, é fundamental conhecer o princípio de funcionamento, as características de atuação e os critérios de seleção de cada dispositivo.",
              "O disjuntor termomagnético combina dois mecanismos: bimetal (proteção térmica contra sobrecarga — aquece com a corrente, deforma-se e aciona o disparo após tempo inversamente proporcional à sobrecarga) e eletroímã (proteção magnética contra curto — atua instantaneamente quando a corrente de curto gera campo suficiente para atrair a armadura).",
              "As curvas de disparo: Curva B (disparo entre 3 e 5×In) — para iluminação e tomadas residenciais. Curva C (5 a 10×In) — cargas mistas, uso geral. Curva D (10 a 20×In) — motores e transformadores com alta corrente de partida. A curva correta evita disparos desnecessários na partida.",
              "A capacidade de interrupção (Icu ou Ics) é a corrente de curto-circuito máxima que o disjuntor consegue interromper com segurança, em kA eficazes. O disjuntor instalado deve ter Icu maior que a corrente de curto-circuito máxima calculada no ponto de instalação.",
              "O fusível é um elemento sacrificial — funde quando a corrente ultrapassa o valor calibrado por tempo suficiente. Fusíveis NH (gG) têm alta capacidade de interrupção para painéis industriais. Fusíveis gG protegem cabos contra sobrecarga e curto. Fusíveis aM suportam a corrente de partida de motores sem fundir.",
              "O dispositivo DR (diferencial-residual) compara a corrente que entra pelo fase com a que retorna pelo neutro usando um núcleo toroidal. Em condições normais, a diferença é zero. Se houver fuga (toque em parte viva, isolamento deteriorado), a diferença é detectada e o relé desliga o circuito.",
              "Sensibilidades dos DRs: 30 mA — proteção de pessoas contra choque elétrico (obrigatório em banheiros, cozinhas, áreas externas pela NBR 5410). 300 mA — proteção contra incêndio. 1 A ou mais — proteção de equipamentos e instalações industriais.",
              "O relé de sobrecarga térmico protege motores contra sobrecargas persistentes. É ajustado para a corrente nominal do motor. Possui compensação automática de temperatura ambiente. Não protege contra curto-circuito — essa proteção é feita pelo disjuntor ou pelos fusíveis aM do circuito.",
              "A seletividade (coordenação de proteções) é a propriedade do sistema de isolar apenas o trecho em falta, sem desligar o restante da instalação. O dispositivo mais próximo da falta deve atuar antes do dispositivo geral. A coordenação é obtida ajustando corretamente as curvas de disparo e tempos de retardo dos dispositivos em série.",
            ],
            equacoes: [
              { latex: "I_{cc} \\leq I_{cu} \\quad \\text{(requisito do disjuntor no ponto de instalação)}", legenda: "Capacidade de interrupção deve superar o curto máximo" },
              { latex: "\\Delta I = I_{fase} - I_{neutro} \\geq I_{\\Delta n} \\Rightarrow \\text{DR atua}", legenda: "Princípio do dispositivo DR" },
            ],
          },
          {
            titulo: "1.11 — Acionamento e Comando de Motores",
            conteudo: [
              "O sistema de acionamento é composto pelo circuito de potência (que conduz a energia do motor) e pelo circuito de comando (que controla quando e como o motor opera). O técnico de manutenção precisa interpretar, montar e manter esses dois circuitos com segurança.",
              "O contator é o coração do acionamento eletromecânico. É composto por: bobina eletromagnética (recebe o sinal de comando em baixa potência), núcleo e armadura (que se atrai quando a bobina é energizada), contatos principais (suportam a corrente do motor — NA, fecham com a bobina energizada) e contatos auxiliares (para lógicas de retenção, sinalização e intertravamento).",
              "O acionamento direto simples: botão de emergência (NF) em série → botão de desligamento (NF) em série → botão de partida (NA) em paralelo com contato auxiliar NA do contator (retenção) → bobina do contator K1. A retenção mantém K1 energizado após soltar o botão de partida. Para desligar, pressiona-se o botão NF de desligamento.",
              "O intertravamento elétrico é obrigatório em comandos de inversão. Dois contatores K1 (sentido direto) e K2 (sentido inverso) nunca podem estar energizados ao mesmo tempo — causaria curto entre duas fases. O intertravamento insere um contato NF de K2 em série com a bobina de K1 e vice-versa.",
              "O relé temporizador é usado quando se precisa de retardo de tempo. TON (on-delay): contato só fecha após o tempo ajustado da bobina ser energizada. TOF (off-delay): contato permanece fechado por tempo ajustado após a bobina ser desenergizada. Essencial na partida estrela-triângulo.",
              "A partida estrela-triângulo usa três contatores: KM (principal, sempre ativo), KY (estrela, para partida) e KΔ (triângulo, para operação). KM + KY energizam juntos → motor parte em estrela (VL/√3 por enrolamento, corrente e torque = 1/3 da partida direta) → após o tempo do temporizador, KY desenerga e KΔ energiza → motor opera em triângulo. Intertravamento entre KY e KΔ é obrigatório.",
              "O soft-starter usa tiristores (SCRs) para elevar gradualmente a tensão durante a partida, controlando a corrente e o torque. Elimina o transiente de comutação da estrela-triângulo. Após a partida, um contator de by-pass curto-circuita o soft-starter, eliminando perdas em regime.",
              "O inversor de frequência (VFD) converte CA da rede em CC (retificador), depois reconverte em CA de frequência e tensão variáveis (inversor IGBT com modulação PWM). Permite partida e parada suaves, controle preciso de velocidade em toda a faixa, operação regenerativa e proteções integradas.",
              "A economia com inversores é expressiva em bombas centrífugas e ventiladores: a potência varia com o cubo da velocidade. Reduzir a rotação para 80% reduz a potência para 51,2% — cerca de 50% de economia versus controle por válvula ou damper.",
            ],
            equacoes: [],
            conteudo2: [
              "Dica de prova: sempre distinguir circuito de potência (alta tensão/corrente, protegido por fusíveis aM ou disjuntor + relé térmico) do circuito de comando (baixa tensão, 24V CC ou 110V CA, protegido por fusíveis menores). Questões de concurso frequentemente pedem a identificação de elementos em cada circuito.",
            ],
          },
          {
            titulo: "1.12 — NR-10: Segurança em Instalações Elétricas",
            conteudo: [
              "A Norma Regulamentadora nº 10 (NR-10) do Ministério do Trabalho estabelece os requisitos mínimos de segurança e saúde para trabalhadores que interagem direta ou indiretamente com instalações elétricas. Sua observância é obrigatória em todo o Brasil e é tema recorrente em concursos da área elétrica.",
              "O escopo abrange: trabalhadores que projetam, constroem, montam, operam, mantêm, reformam, ampliam ou reparam instalações elétricas (exposição direta); e trabalhadores que exercem atividades nas vizinhanças (exposição indireta — por exemplo, um pintor perto de quadros energizados).",
              "Classificação das tensões pela NR-10: Extra-baixa tensão (EBT) — até 50 V CA ou 120 V CC. Baixa tensão (BT) — superior a EBT até 1.000 V CA ou 1.500 V CC. Alta tensão (AT) — superior a 1.000 V CA ou 1.500 V CC. Essa classificação determina as medidas de proteção exigidas.",
              "Habilitação e capacitação: Curso Básico de NR-10 — mínimo 40 horas, para trabalhadores em instalações de BT energizadas. Complementar SEP (Sistemas Elétricos de Potência) — mínimo 40 horas adicionais, obrigatório para trabalhos em AT. A reciclagem é obrigatória a cada 2 anos.",
              "Hierarquia das medidas de controle: (1) Eliminação do risco — desligar e trabalhar sem tensão. (2) Proteção coletiva — barreiras isolantes, bloqueios físicos, aterramento temporário, sinalização. (3) Proteção individual — EPIs, que apenas reduzem o risco residual após as coletivas.",
              "O procedimento LOTO (Lockout/Tagout) é o mais importante da NR-10 para manutenção. Etapas: (1) Identificar todos os pontos de energia. (2) Notificar os afetados. (3) Desligar pelo procedimento normal. (4) Isolar as fontes de energia. (5) Aplicar bloqueio físico (cadeado) em cada ponto. (6) Etiquetar com nome, data e descrição. (7) Dissipar energia armazenada (capacitores, pressão residual, molas). (8) Verificar a ausência de tensão com instrumento calibrado antes de iniciar.",
              "EPIs para eletricidade: luvas de borracha isolante (classes 0 a 4 para tensões crescentes: classe 0 até 500 V; classe 1 até 7.500 V; classe 2 até 17.000 V; classe 3 até 26.500 V; classe 4 até 36.000 V); capacete classe B (não condutor, até 20.000 V); óculos e protetor facial contra arco; vestimenta antichama classificada em cal/cm²; calçado dielétrico; tapete isolante.",
              "O trabalho em instalações energizadas só pode ser realizado quando tecnicamente justificado, após análise de risco, com PTE (Procedimento de Trabalho Específico) aprovado por profissional habilitado, equipe capacitada e todos os EPIs e EPCs adequados. A regra geral da NR-10 é trabalhar SEM tensão — o trabalho energizado é a exceção.",
              "O arco elétrico é uma das situações mais perigosas. Pode liberar energia de dezenas de kJ em milissegundos, gerando temperatura superior a 20.000°C — superior à superfície do sol. Causa queimaduras graves a vários metros. A análise de arc flash (IEEE 1584) determina a categoria de proteção dos EPIs para cada ponto da instalação.",
            ],
            equacoes: [],
            conteudo2: [
              "Dica de prova: os pontos mais cobrados da NR-10 em concursos são: classificação de tensões (EBT/BT/AT), habilitação (40h básico + 40h SEP), procedimento LOTO, trabalho sem tensão como regra geral, e distinção entre EPI (proteção individual) e EPC (proteção coletiva, com prioridade sobre o EPI).",
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
        titulo: "Bloco I — Metrologia, Instrumentos e Manutenção",
        descricao: "Metrologia industrial, calibração, válvulas de controle, simbologia ISA, medição de grandezas e manutenção de instrumentos.",
        bloco: "Bloco I",
        paginas: [
          {
            titulo: "1.1 — Metrologia Industrial e VIM",
            conteudo: [
              "A metrologia é a ciência das medições e suas aplicações. O Vocabulário Internacional de Metrologia (VIM) define os termos e conceitos fundamentais usados em todos os campos de medição.",
              "Os principais conceitos do VIM que caem em concursos são: mensurando (grandeza que se deseja medir), resultado de medição, incerteza de medição, exatidão (proximidade ao valor verdadeiro), precisão (repetibilidade das medições), erro (diferença entre resultado e valor verdadeiro), resolução (menor variação detectável) e rastreabilidade (cadeia de calibrações até padrões nacionais).",
              "A incerteza de medição é um parâmetro que caracteriza a dispersão dos valores que podem ser razoavelmente atribuídos ao mensurando. Não é o mesmo que erro — a incerteza quantifica a dúvida sobre o resultado.",
              "A rastreabilidade metrológica é a propriedade do resultado de uma medição pela qual ele pode ser relacionado a uma referência (padrão nacional ou internacional) através de uma cadeia ininterrupta de calibrações documentadas.",
            ],
            equacoes: [
              { latex: "E = X_{medido} - X_{verdadeiro}", legenda: "Erro de medição" },
              { latex: "E\\% = \\dfrac{E}{Fundo\\ de\\ Escala} \\times 100", legenda: "Erro percentual em relação ao fundo de escala" },
            ],
          },
          {
            titulo: "1.2 — Calibração de Instrumentos",
            conteudo: [
              "Calibração é a operação que, sob condições especificadas, estabelece a relação entre os valores indicados por um instrumento de medição e os valores correspondentes realizados por padrões.",
              "O procedimento de calibração de um transmissor 4-20 mA envolve: ajuste do zero (0% da faixa → 4 mA) e do span (100% da faixa → 20 mA). Erros de zero (offset) e de span (ganho) são ajustados independentemente.",
              "A histerese é o fenômeno pelo qual o instrumento apresenta leituras diferentes para o mesmo valor do mensurando, dependendo se a medição é feita em sentido crescente ou decrescente. É causada por folgas mecânicas, atrito e efeitos magnéticos.",
              "A curva de calibração é o resultado gráfico ou tabular que relaciona o sinal de entrada com o sinal de saída do instrumento. Idealmente é uma linha reta (instrumento linear) entre os pontos de ajuste de zero e de span.",
              "O intervalo de calibração define com que frequência um instrumento deve ser recalibrado. Depende da criticidade da medição, do histórico de deriva e das especificações do fabricante.",
            ],
            equacoes: [
              { latex: "I_{saída} = 4 + 16 \\cdot \\dfrac{X - X_{min}}{X_{max} - X_{min}} \\text{ (mA)}", legenda: "Conversão linear para sinal 4-20 mA" },
            ],
          },
          {
            titulo: "1.3 — Válvulas de Controle e Acessórios",
            conteudo: [
              "A válvula de controle é o elemento final de controle mais usado na indústria de processo. Recebe um sinal de controle (pneumático 3-15 psi ou elétrico 4-20 mA) e varia a abertura para controlar a vazão do fluido.",
              "Os tipos principais de válvulas de controle são: globo (controle preciso de vazão), borboleta (grandes diâmetros, baixa perda de carga), esfera (corte on-off ou controle em 3 vias) e diafragma (fluidos corrosivos ou viscosos).",
              "O posicionador é o acessório mais importante da válvula de controle. Recebe o sinal do controlador e posiciona com precisão a haste da válvula, corrigindo erros de histerese e atrito. Posicionadores modernos são digitais (HART, Foundation Fieldbus).",
              "O solenóide (válvula solenóide) opera em modo todo-ou-nada: aberta ou fechada. É acionada eletricamente e usada em sistemas de bloqueio (shutdown) e em válvulas de alívio.",
              "Os filtros reguladores de ar são obrigatórios na alimentação pneumática das válvulas de controle: filtram impurezas e regulam a pressão de ar de instrumento (geralmente 20 psi).",
            ],
            equacoes: [
              { latex: "F_v = C_v \\cdot \\sqrt{\\dfrac{\\Delta P}{G_f}}", legenda: "Fórmula de vazão da válvula: Cv = coeficiente de vazão, ΔP = queda de pressão, Gf = gravidade específica do fluido" },
            ],
          },
          {
            titulo: "1.4 — Simbologia ISA 5.1",
            conteudo: [
              "A norma ANSI/ISA 5.1 define a simbologia para instrumentação e automação de processos industriais. É usada nos Diagramas de Tubulação e Instrumentação (P&ID — Piping and Instrumentation Diagram).",
              "Cada instrumento no P&ID é representado por um símbolo geométrico (círculo, quadrado, losango) que indica sua localização (campo, painel, CLP) e por uma tag alfanumérica que identifica a grandeza e a função.",
              "A tag de instrumento é composta por letras funcionais: a primeira letra indica a grandeza medida (P = pressão, T = temperatura, F = vazão, L = nível, A = análise) e as letras seguintes indicam a função (I = indicação, C = controle, T = transmissão, R = registro, A = alarme, V = válvula).",
              "Exemplos de tags: FIC = Controlador Indicador de Vazão; PCV = Válvula de Controle de Pressão; TT = Transmissor de Temperatura; LSH = Chave de Nível Alto; PAHH = Alarme de Alta-Alta Pressão.",
            ],
            equacoes: [],
          },
          {
            titulo: "1.5 — Medição de Pressão",
            conteudo: [
              "A pressão é definida como força por unidade de área. As principais unidades são: Pa (Pascal), bar, kgf/cm², psi e mmHg. Conversão: 1 bar = 100 kPa = 14,5 psi = 1,02 kgf/cm².",
              "Pressão manométrica é medida em relação à pressão atmosférica local. Pressão absoluta inclui a pressão atmosférica. Pressão diferencial é a diferença entre dois pontos do processo.",
              "Os principais elementos primários de medição de pressão são: tubo de Bourdon (mecânico, molas em C, espiral ou hélix), diafragma, cápsula e fole — todos convertem pressão em deslocamento mecânico.",
              "Os transmissores de pressão modernos usam células capacitivas ou piezelétricas para converter o deslocamento em sinal elétrico 4-20 mA. São altamente precisos e podem medir pressão absoluta, manométrica ou diferencial.",
              "A medição de nível por pressão diferencial (DP) usa a coluna de líquido acima do sensor: a pressão medida é proporcional ao nível. É o método mais simples e robusto para nível em vasos fechados.",
            ],
            equacoes: [
              { latex: "P = \\rho \\cdot g \\cdot h", legenda: "Pressão hidrostática: ρ = densidade (kg/m³), g = 9,81 m/s², h = altura (m)" },
            ],
          },
          {
            titulo: "1.6 — Medição de Temperatura",
            conteudo: [
              "A temperatura é a grandeza mais medida na indústria de processo. Os principais elementos de medição são: termopares, RTDs (PT100, PT1000) e termistores.",
              "O termopar é baseado no efeito Seebeck: a junção de dois metais diferentes gera uma tensão (fem) proporcional à diferença de temperatura entre a junção de medição e a junção de referência (junta fria). São robustos, baratos e cobrem ampla faixa de temperatura.",
              "Os principais tipos de termopar são: J (ferro-constantan, -40 a 750°C), K (cromel-alumel, -200 a 1260°C, mais comum na indústria), T (cobre-constantan, -200 a 350°C), E (alta sensibilidade) e S/R/B (platina, alta temperatura).",
              "O RTD PT100 é um resistor de platina cuja resistência varia linearmente com a temperatura. A 0°C, a resistência é exatamente 100 Ω; a 100°C, é aproximadamente 138,5 Ω. O PT100 é mais preciso que o termopar mas menos robusto.",
              "A configuração de 3 fios para PT100 é a mais usada em campo: compensa a resistência dos cabos de ligação, eliminando o erro de medição causado pela resistência do cabo (crítico em medições de longa distância).",
            ],
            equacoes: [
              { latex: "R(T) = R_0 \\cdot (1 + \\alpha \\cdot T)", legenda: "Resistência do PT100: R0 = 100Ω (a 0°C), α = 0,00385 Ω/(Ω·°C)" },
            ],
          },
          {
            titulo: "1.7 — Medição de Nível e Vazão",
            conteudo: [
              "A medição de nível usa princípios variados: pressão diferencial (DP), bóia, ultrassom, radar, capacitância e laser. A escolha depende do fluido (líquido, sólido, corrosivo), das condições do processo (pressão, temperatura) e da precisão exigida.",
              "A medição de vazão é uma das mais críticas na indústria de petróleo. Os principais tipos de medidores são: placa de orifício (DP), tubo de Venturi, rotâmetro, turbina, eletromagnético, Coriolis (massa) e ultrassônico.",
              "A placa de orifício é o medidor de vazão mais simples e barato. Cria uma restrição no duto, gerando uma queda de pressão (DP) proporcional ao quadrado da vazão. A raiz quadrada do DP é proporcional à vazão volumétrica.",
              "O medidor Coriolis mede a vazão mássica diretamente, sem depender da densidade ou viscosidade do fluido. É o mais preciso disponível (±0,1% ou melhor) e é usado em medição fiscal de petróleo e gás.",
            ],
            equacoes: [
              { latex: "Q = K \\cdot \\sqrt{\\Delta P}", legenda: "Vazão volumétrica por DP: K = constante que depende da geometria e do fluido" },
            ],
          },
          {
            titulo: "1.8 — Medição de Grandezas Mecânicas",
            conteudo: [
              "A medição de grandezas mecânicas inclui: proximidade, posição, velocidade, aceleração, vibração, força, torque, massa e densidade.",
              "Sensores de proximidade indutivos detectam objetos metálicos sem contato físico, por variação de campo eletromagnético. Sensores capacitivos detectam qualquer material (metálico ou não). Sensores fotoeléctricos usam feixe de luz.",
              "Os acelerômetros piezoelétricos são usados para medição de vibração em máquinas rotativas. A vibração excessiva indica problemas como desbalanceamento, desalinhamento, folga mecânica ou falha em rolamentos.",
              "A célula de carga é o sensor mais usado para medição de força e massa (pesagem). Funciona com extensômetros (strain gauges) colados em elemento elástico: a deformação elástica é proporcional à força aplicada.",
              "O torque é medido com torquímetros (estáticos) ou com medidores de torque rotativos (com telemetria). Em processos contínuos, o torque de um eixo é calculado indiretamente pela corrente e pela tensão do motor elétrico de acionamento.",
            ],
            equacoes: [
              { latex: "a = \\dfrac{\\Delta v}{\\Delta t}", legenda: "Aceleração: variação da velocidade no tempo (m/s²)" },
              { latex: "T = F \\cdot r", legenda: "Torque: F = força (N), r = raio do braço de alavanca (m)" },
            ],
          },
          {
            titulo: "1.9 — Instrumentação Analítica",
            conteudo: [
              "A instrumentação analítica mede a composição química de fluidos de processo: pH, condutividade, oxigênio dissolvido, turbidez, concentração de gases (CO, CO₂, H₂S, O₂) e análise cromatográfica.",
              "O analisador de pH mede a concentração de íons H⁺ na solução usando um eletrodo de vidro. O pH varia de 0 (ácido forte) a 14 (base forte), com pH 7 sendo neutro. É altamente sensível à temperatura — requer compensação.",
              "O analisador de O₂ (oxigênio) em gases de combustão é fundamental para o controle de eficiência de fornos e caldeiras. O teor de O₂ indica se a combustão está com excesso de ar (O₂ alto) ou deficiência de ar (O₂ baixo, risco de CO).",
              "O cromatógrafo de processo analisa a composição de misturas gasosas ou líquidas separando os componentes por afinidade com uma fase estacionária. É o padrão em medição de qualidade de gás natural.",
            ],
            equacoes: [
              { latex: "pH = -\\log_{10}[H^+]", legenda: "Definição de pH" },
            ],
          },
          {
            titulo: "1.10 — Manutenção Corretiva, Preventiva, Preditiva e Comissionamento",
            conteudo: [
              "A manutenção corretiva atua após a ocorrência da falha, restaurando o instrumento à condição operacional. Pode ser planejada (falha prevista) ou não planejada (falha inesperada).",
              "A manutenção preventiva é realizada em intervalos de tempo predeterminados, independentemente das condições do instrumento. Inclui limpeza, calibração, troca de consumíveis e inspeção visual.",
              "A manutenção preditiva monitora parâmetros do instrumento (sinal de saída, pressão de suprimento de ar, consumo de energia) para detectar degradação antes da falha. Permite otimizar o intervalo de manutenção.",
              "O comissionamento é o processo de verificação, ajuste e documentação de instrumentos e sistemas de controle novos ou após grande revisão, garantindo que funcionem conforme o projeto antes da partida da planta.",
              "O loop check (verificação de malha) é parte essencial do comissionamento: testa todo o caminho do sinal desde o sensor de campo, passando pela fiação, pela barreira de segurança intrínseca e pelo cartão de entrada do CLP ou DCS, verificando calibração, faixa e alarmes.",
            ],
            equacoes: [],
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
