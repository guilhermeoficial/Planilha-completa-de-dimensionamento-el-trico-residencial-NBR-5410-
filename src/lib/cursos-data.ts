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
              { latex: "V_{term} = V_{oc} - R_{int} \\\\cdot I", legenda: "Tensão nos terminais de fonte real: Voc = tensão em aberto, Rint = resistência interna" },
              { latex: "P_{max\\ resistor} = I^2 \\\\cdot R = \\\\dfrac{V^2}{R}", legenda: "Potência dissipada no resistor — não exceder a potência nominal" },
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
              { latex: "\\\\sum_{k} I_k = 0 \\\\quad \\\\text{(em qualquer nó)}", legenda: "KCL: soma das correntes no nó = zero" },
              { latex: "\\\\sum_{k} V_k = 0 \\\\quad \\\\text{(em qualquer malha fechada)}", legenda: "KVL: soma das tensões na malha = zero" },
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
              { latex: "\\\\sum R_{kk} \\\\cdot I_k - \\\\sum R_{kj} \\\\cdot I_j = \\\\sum V_{fontes}", legenda: "Equação de malha k: Rkk = soma das resistências da malha k, Rkj = resistências compartilhadas" },
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
              { latex: "I_1 - I_2 = I_s \\\\quad \\\\text{(equação de restrição da supermalha)}", legenda: "A diferença das correntes de malha = valor da fonte de corrente" },
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
              { latex: "\\\\sum \\\\dfrac{V_k - V_j}{R_{kj}} = \\\\sum I_{fontes \\text{ no nó } k}", legenda: "KCL no nó k: soma das correntes saindo = soma das fontes de corrente" },
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
              { latex: "V_1 - V_2 = V_s \\\\quad \\\\text{(equação de restrição do supernó)}", legenda: "Diferença de tensão entre os nós do supernó = tensão da fonte" },
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
              { latex: "V_{total} = V_1' + V_2' + \\\\cdots + V_n'", legenda: "Superposição: resposta total = soma das respostas de cada fonte atuando isoladamente" },
              { latex: "P_{total} \\\\neq P_1' + P_2' + \\\\cdots \\\\quad \\\\text{(superposição NÃO vale para potência)}", legenda: "CUIDADO: potência não obedece ao princípio de superposição" },
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
              { latex: "I_s = \\\\dfrac{V_s}{R} \\\\quad \\\\Leftrightarrow \\\\quad V_s = I_s \\\\cdot R", legenda: "Transformação equivalente entre fonte de tensão (com R série) e fonte de corrente (com R paralelo)" },
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
              { latex: "V_{th} = V_{AB}\\\\big|_{I_{carga}=0}", legenda: "Tensão de Thévenin = tensão em aberto nos terminais A-B" },
              { latex: "R_{th} = R_{AB}\\\\big|_{\\\\text{fontes desativadas}}", legenda: "Resistência de Thévenin = resistência vista dos terminais com fontes desativadas" },
              { latex: "I_{carga} = \\\\dfrac{V_{th}}{R_{th} + R_{carga}}", legenda: "Corrente na carga usando o equivalente Thévenin" },
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
              { latex: "I_n = I_{cc} = \\\\dfrac{V_{th}}{R_{th}}", legenda: "Corrente de Norton = corrente de curto-circuito = Vth/Rth" },
              { latex: "R_n = R_{th}", legenda: "Resistência de Norton idêntica à de Thévenin" },
              { latex: "V_{th} = I_n \\\\cdot R_n", legenda: "Relação entre os dois equivalentes" },
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
              { latex: "R_{carga} = R_{th} \\\\quad \\\\Rightarrow \\\\quad P_{max} = \\\\dfrac{V_{th}^2}{4 \\\\cdot R_{th}}", legenda: "Condição e valor de máxima transferência de potência" },
              { latex: "\\\\eta_{max\\ transf} = 50\\\\%", legenda: "Eficiência na máxima transferência: metade da energia é perdida na resistência interna" },
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
              { latex: "v_C(t) = V \\\\cdot \\\\left(1 - e^{-t/\\\\tau}\\\\right) \\\\qquad \\\\tau = R \\\\cdot C", legenda: "Carga do capacitor: V = tensão final, τ = RC = constante de tempo" },
              { latex: "v_C(t) = V_0 \\\\cdot e^{-t/\\\\tau}", legenda: "Descarga do capacitor: V0 = tensão inicial" },
              { latex: "E = \\\\dfrac{1}{2} C V^2", legenda: "Energia armazenada no capacitor (J)" },
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
              { latex: "i_L(t) = \\\\dfrac{V}{R} \\\\cdot \\\\left(1 - e^{-t/\\\\tau}\\\\right) \\\\qquad \\\\tau = \\\\dfrac{L}{R}", legenda: "Crescimento da corrente no indutor: V/R = corrente final, τ = L/R" },
              { latex: "i_L(t) = I_0 \\\\cdot e^{-t/\\\\tau}", legenda: "Decaimento da corrente (desligar fonte)" },
              { latex: "E = \\\\dfrac{1}{2} L I^2", legenda: "Energia armazenada no indutor (J)" },
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
              { latex: "R_{serie} = \\\\dfrac{V_{alimentacao} - V_{LED}}{I_{LED}}", legenda: "Resistor em série com LED: garante a corrente nominal de operação" },
              { latex: "I_D = I_s \\\\cdot \\\\left(e^{\\\\,V_D / V_T} - 1\\\\right)", legenda: "Equação de Shockley do diodo: Is = corrente de saturação, VT = 26mV a 25°C" },
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
              { latex: "V_Z = \\\\text{constante} \\\\quad \\\\text{(quando }I_Z > I_{Z_{min}}\\\\text{)}", legenda: "Diodo Zener: tensão constante na polarização reversa acima da corrente mínima" },
              { latex: "R_{serie} = \\\\dfrac{V_{entrada} - V_Z}{I_Z + I_{carga}}", legenda: "Resistor série do regulador Zener" },
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
              { latex: "\\\\mathbf{Z}_R = R \\\\qquad \\\\mathbf{Z}_L = j\\\\omega L \\\\qquad \\\\mathbf{Z}_C = \\\\dfrac{1}{j\\\\omega C} = -\\\\dfrac{jX_C}{1}", legenda: "Impedâncias complexas dos elementos básicos" },
              { latex: "\\\\mathbf{Z}_{RLC} = R + j(\\\\omega L - \\\\dfrac{1}{\\\\omega C}) = R + j(X_L - X_C)", legenda: "Impedância total do circuito RLC série" },
              { latex: "|\\\\mathbf{Z}| = \\\\sqrt{R^2 + (X_L - X_C)^2} \\\\qquad \\\\angle\\\\mathbf{Z} = \\\\arctan\\\\left(\\\\dfrac{X_L - X_C}{R}\\\\right)", legenda: "Módulo e ângulo da impedância" },
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
              { latex: "\\\\mathbf{S} = P + jQ = V_{rms} \\\\cdot I_{rms}^* = |\\\\mathbf{I}|^2 \\\\cdot \\\\mathbf{Z}", legenda: "Potência complexa: * indica conjugado complexo" },
              { latex: "P = |\\\\mathbf{I}|^2 \\\\cdot R \\\\qquad Q = |\\\\mathbf{I}|^2 \\\\cdot X \\\\qquad S = |\\\\mathbf{I}|^2 \\\\cdot |\\\\mathbf{Z}|", legenda: "Potências em termos da corrente e da impedância" },
              { latex: "Q_C = \\\\dfrac{V^2}{X_C} = V^2 \\\\cdot \\\\omega C", legenda: "Potência reativa gerada pelo capacitor (negativa = fornecida)" },
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
              { latex: "f_0 = \\\\dfrac{1}{2\\\\pi\\\\sqrt{LC}}", legenda: "Frequência de ressonância (série e paralelo)" },
              { latex: "Q = \\\\dfrac{X_L}{R} = \\\\dfrac{1}{R}\\\\sqrt{\\\\dfrac{L}{C}}", legenda: "Fator de qualidade do circuito ressonante série" },
              { latex: "BW = \\\\dfrac{f_0}{Q} \\\\quad [\\\\text{Hz}]", legenda: "Largura de banda (-3 dB)" },
              { latex: "V_L = V_C = Q \\\\cdot V_{fonte} \\\\quad \\\\text{(na ressonância série)}", legenda: "Sobretensão nos elementos reativos: pode ser Q vezes a tensão da fonte" },
            ],
            conteudo2: [
              "Exemplo: L=10mH, C=10μF, R=5Ω. f0=1/(2π×√(10×10⁻³×10×10⁻⁶))=1/(2π×√(10⁻⁷))=1/(2π×316×10⁻⁶)=503 Hz. XL=2π×503×0,01=31,6Ω. Q=31,6/5=6,32. Na ressonância com V=10V: I=10/5=2A. Tensão no indutor: VL=2×31,6=63,2 V — 6,32 vezes a tensão da fonte!",
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
              { latex: "E\\\\% = \\\\dfrac{E}{\\\\text{Fundo de Escala}} \\\\times 100", legenda: "Erro percentual em relação ao fundo de escala (span)" },
              { latex: "U = k \\\\cdot u_c", legenda: "Incerteza expandida: k = fator de abrangência (k=2 para 95% de confiança)" },
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
              { latex: "I_{saída} = 4 + 16 \\\\cdot \\\\dfrac{X - X_{min}}{X_{max} - X_{min}} \\\\quad [\\\\text{mA}]", legenda: "Conversão linear para sinal 4-20 mA: X = valor medido, Xmin e Xmax = faixa do instrumento" },
              { latex: "\\\\text{Histerese}\\\\% = \\\\dfrac{\\\\Delta_{subida} - \\\\Delta_{descida}}{\\\\text{Span}} \\\\times 100", legenda: "Erro de histerese em % do span" },
            ],
            conteudo2: [
              "Exemplo: transmissor de temperatura 0-200°C, sinal 4-20 mA. Para T=75°C: I = 4 + 16×(75/200) = 4 + 6 = 10 mA. Para I=14 mA: T = (14-4)/16 × 200 = 0,625 × 200 = 125°C.",
              "Dica de prova: calibrar é documentar; ajustar é intervir. Um instrumento pode ser calibrado (ter seu certificado emitido) sem ser ajustado, se seus erros estiverem dentro da tolerância especificada.",
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
              { latex: "F_v = C_v \\\\cdot \\\\sqrt{\\\\dfrac{\\\\Delta P}{G_f}}", legenda: "Equação de dimensionamento de válvula de controle: Cv = coeficiente de vazão, ΔP = queda de pressão (psi), Gf = gravidade específica do fluido" },
            ],
            conteudo2: [
              "Características de vazão intrínsecas: LINEAR (vazão proporcional à abertura — usada em processos com ΔP constante). IGUAL PERCENTAGEM (a variação percentual de Cv é proporcional à abertura — mais comum, usada quando ΔP varia). ABERTURA RÁPIDA (Cv sobe rapidamente nos primeiros graus de abertura — usada em on-off).",
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
              { latex: "P = \\\\rho \\\\cdot g \\\\cdot h", legenda: "Pressão hidrostática: rho = densidade (kg/m³), g = 9,81 m/s², h = altura de coluna (m)" },
              { latex: "1\\\\,\\\\text{bar} = 100\\\\,\\\\text{kPa} = 14{,}504\\\\,\\\\text{psi} = 1{,}0197\\\\,\\\\text{kgf/cm}^2", legenda: "Conversão de unidades de pressão" },
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
              { latex: "R(T) = R_0 \\\\cdot (1 + \\\\alpha \\\\cdot T)", legenda: "Resistência do PT100: R0 = 100 Ohm (a 0°C), alpha = 0,00385 Ohm/(Ohm.°C)" },
              { latex: "\\\\alpha = \\\\dfrac{R_{100} - R_0}{R_0 \\\\cdot 100} = 0{,}00385 \\\\;\\\\Omega/(\\\\Omega \\\\cdot ^\\\\circ C)", legenda: "Coeficiente de temperatura do PT100 (padrão IEC 751)" },
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
              { latex: "h = \\\\dfrac{\\\\Delta P}{\\\\rho \\\\cdot g}", legenda: "Nível por DP: h = altura do líquido (m), ΔP = pressão diferencial (Pa), ρ = densidade (kg/m³), g = 9,81 m/s²" },
              { latex: "d = \\\\dfrac{c \\\\cdot t}{2}", legenda: "Distância por ultrassom/radar: c = velocidade de propagação, t = tempo de trânsito (ida + volta)" },
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
              { latex: "Q = K \\\\cdot \\\\sqrt{\\\\dfrac{\\\\Delta P}{\\\\rho}}", legenda: "Vazão volumétrica por DP: K = constante (depende do tipo de medidor e geometria), ΔP = pressão diferencial, ρ = densidade do fluido" },
              { latex: "f_{vortex} = S_t \\\\cdot \\\\dfrac{v}{d}", legenda: "Frequência dos vórtices: St = número de Strouhal (~0,2), v = velocidade (m/s), d = diâmetro do obstáculo (m)" },
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
              { latex: "\\\\dfrac{\\\\Delta R}{R} = G_F \\\\cdot \\\\varepsilon", legenda: "Extensômetro (strain gauge): GF = fator de gauge (~2 para metal), epsilon = deformação específica (m/m)" },
              { latex: "T = F \\\\cdot r \\\\quad [\\\\text{N}\\\\cdot\\\\text{m}]", legenda: "Torque: F = força tangencial (N), r = raio (m)" },
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
              { latex: "pH = -\\\\log_{10}[H^+]", legenda: "Definição de pH: concentração de íons H⁺ em mol/L" },
              { latex: "E = E_0 + 0{,}05916 \\\\cdot \\\\log[H^+] \\\\quad \\\\text{(a 25°C)}", legenda: "Equação de Nernst para eletrodo de pH: variação de 59,16 mV por unidade de pH" },
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
