// Banco de questões — questões de prática ORIGINAIS, escritas no estilo e
// nível dos concursos técnicos Petrobras (banca CESGRANRIO), cobrindo o
// formato real do edital: Conhecimentos Básicos (Português, Matemática/
// Raciocínio Lógico) + Conhecimentos Específicos (Eletrotécnica).
//
// IMPORTANTE: estas NÃO são questões reproduzidas de provas reais (questões
// de banca têm direitos autorais da organizadora) — são questões de prática
// inéditas, no mesmo padrão e dificuldade. Quando houver acesso a um banco de
// questões licenciado ou provas oficiais liberadas, substituímos por elas.

export type AreaGrande = "Português" | "Matemática/Raciocínio Lógico" | "Informática" | "Eletrotécnica" | "Legislação";
export type Dificuldade = "Fácil" | "Médio" | "Difícil";

export type Bloco = "Básicos" | "Bloco I" | "Bloco II" | "Bloco III";

export interface Questao {
  id: string;
  areaGrande: AreaGrande;
  assunto: string;
  bloco: Bloco;
  banca: string;
  ano: number;
  dificuldade: Dificuldade;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  /** Quando true, esta questão foi escrita do zero internamente para o Voltis
   * (não reaproveita nem se baseia diretamente em nenhuma prova específica
   * já publicada). Padrão é false — só marcar true questão por questão,
   * deliberadamente. */
  inedita?: boolean;
  /** Quando true, esta questão faz referência a uma figura/circuito — a imagem
   * original deve ser colocada em /public/questoes-imagens/{id}.png */
  temImagem?: boolean;
}

export const BLOCOS: Bloco[] = ["Básicos", "Bloco I", "Bloco II", "Bloco III"];

/** Mapa de assunto → bloco, seguindo o edital verticalizado real da Petrobras
 * (Aprova Concursos) para Manutenção Elétrica:
 * Bloco I — circuitos, máquinas, proteção BT, comandos, segurança, projetos
 * Bloco II — medidas, instrumentos, retificadores/baterias, instalações BT e MT
 * Bloco III — grandezas/SI, aterramento, SPDA, NBR5410, manutenção, eletrônica,
 *             diagramas lógicos, automação industrial, materiais/ferramentas, NR10 */
const MAPA_BLOCO: Record<string, Bloco> = {
  "Interpretação de texto": "Básicos", "Concordância verbal": "Básicos", "Crase": "Básicos",
  "Regência verbal": "Básicos", "Pontuação": "Básicos", "Tipologia textual": "Básicos",
  "Porcentagem": "Básicos", "Regra de três": "Básicos", "Análise combinatória": "Básicos",
  "Lógica proposicional": "Básicos", "Juros simples": "Básicos", "Conversão de unidades": "Básicos",
  "Conceitos básicos": "Básicos", "Planilhas eletrônicas": "Básicos", "Segurança da informação": "Básicos",
  "Redes de computadores": "Básicos",
  "Lei de Ohm": "Bloco I", "Associação de resistores": "Bloco I", "Potência elétrica": "Bloco I",
  "Energia elétrica": "Bloco I", "Leis de Kirchhoff": "Bloco I", "Corrente alternada": "Bloco I",
  "Fator de potência": "Bloco I", "Potência em CA": "Bloco I", "Sistemas trifásicos": "Bloco I",
  "Eletromagnetismo": "Bloco I", "Indução eletromagnética": "Bloco I", "Motores elétricos": "Bloco I",
  "Transformadores": "Bloco I", "Comandos elétricos": "Bloco I", "Eletrônica básica": "Bloco I",
  "Proteção de circuitos": "Bloco I", "Circuitos CC": "Bloco I", "Circuitos CA": "Bloco I",
  "Thévenin e Norton (CA)": "Bloco I", "Partida estrela-triângulo": "Bloco I",
  "Máquinas elétricas": "Bloco I", "Geração e transmissão": "Bloco I", "Qualidade de energia": "Bloco I",
  "Instrumentação": "Bloco II", "Método dos dois wattímetros": "Bloco II",
  "Nobreaks e baterias": "Bloco II",
  "Grandezas elétricas e magnéticas": "Bloco III", "Aterramento": "Bloco III", "SPDA": "Bloco III",
  "NBR 5410": "Bloco III", "NBR 14039 (média tensão)": "Bloco III", "Manutenção elétrica": "Bloco III",
  "Eletrônica digital": "Bloco III", "Eletrônica de potência": "Bloco III",
  "Comandos elétricos / CLP": "Bloco III", "NR10": "Bloco III",
  "Disjuntores e seletividade": "Bloco III", "Seletividade": "Bloco III",
  "Iluminação industrial": "Bloco III",
  "Figuras de linguagem": "Básicos", "Tempo verbal": "Básicos", "Pronome relativo": "Básicos",
  "Antonímia e sinonímia": "Básicos",
  "Lei de Improbidade Administrativa": "Básicos", "Regime Jurídico Único": "Básicos",
  "Ética no Serviço Público": "Básicos", "Processo Administrativo": "Básicos",
  "Direitos Fundamentais": "Básicos", "Direitos Sociais": "Básicos",
};

function bloco(assunto: string): Bloco {
  return MAPA_BLOCO[assunto] ?? "Bloco I";
}

const QUESTOES_BASE: Omit<Questao, "bloco">[] = [
  // ---------------------------------------------------------------------
  // PORTUGUÊS
  // ---------------------------------------------------------------------
  { id: "p1", areaGrande: "Português", assunto: "Interpretação de texto", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Em 'O técnico, embora cansado, concluiu o relatório antes do prazo', a palavra 'embora' estabelece relação de:",
    alternativas: ["Causa", "Concessão", "Conclusão", "Condição"], respostaCorreta: 1,
    explicacao: "'Embora' introduz uma oração concessiva, indicando um fato que poderia impedir a ação principal, mas não impede." },
  { id: "p2", areaGrande: "Português", assunto: "Concordância verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Assinale a alternativa em que a concordância verbal está correta:",
    alternativas: ["Fazem dois anos que ele trabalha na planta.", "Faz dois anos que ele trabalha na planta.", "Faziam dois anos que ele trabalhava.", "Fazem dois ano que ele trabalha."], respostaCorreta: 1,
    explicacao: "Na indicação de tempo transcorrido, o verbo 'fazer' fica na 3ª pessoa do singular: 'Faz dois anos...'." },
  { id: "p3", areaGrande: "Português", assunto: "Crase", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Assinale a frase com o emprego correto da crase:",
    alternativas: ["Entreguei o relatório à diretoria.", "Entreguei o relatório a diretoria.", "Cheguei a hora prevista.", "Refiro-me à ele com respeito."], respostaCorreta: 0,
    explicacao: "Antes de substantivo feminino determinado, usa-se crase: 'à diretoria'." },
  { id: "p4", areaGrande: "Português", assunto: "Regência verbal", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Assinale a alternativa em que a regência verbal está de acordo com a norma-padrão:",
    alternativas: ["Assisti o filme ontem.", "Assisti ao filme ontem.", "Obedeço o regulamento.", "Aspiro o cargo de supervisor (no sentido de desejar)."], respostaCorreta: 1,
    explicacao: "'Assistir' no sentido de 'ver' é transitivo indireto, exigindo a preposição 'a': 'assisti ao filme'." },
  { id: "p5", areaGrande: "Português", assunto: "Pontuação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "Assinale a frase corretamente pontuada:",
    alternativas: ["O técnico, responsável pela manutenção, chegou atrasado.", "O técnico responsável, pela manutenção chegou atrasado.", "O técnico responsável pela manutenção, chegou, atrasado.", "O técnico, responsável, pela manutenção chegou, atrasado."], respostaCorreta: 0,
    explicacao: "O aposto explicativo 'responsável pela manutenção' deve ser isolado por vírgulas." },
  { id: "p6", areaGrande: "Português", assunto: "Tipologia textual", banca: "CESGRANRIO (estilo)", ano: 2021, dificuldade: "Fácil",
    enunciado: "Um manual de instruções de operação de um equipamento é predominantemente do tipo textual:",
    alternativas: ["Narrativo", "Descritivo", "Injuntivo (instrucional)", "Dissertativo-argumentativo"], respostaCorreta: 2,
    explicacao: "Manuais de instrução orientam ações passo a passo, característica do tipo textual injuntivo/instrucional." },

  // ---------------------------------------------------------------------
  // MATEMÁTICA / RACIOCÍNIO LÓGICO
  // ---------------------------------------------------------------------
  { id: "m1", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Porcentagem", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Um equipamento de R$ 8.000,00 recebeu um desconto de 15%. Qual o valor final pago?",
    alternativas: ["R$ 6.800,00", "R$ 6.200,00", "R$ 7.200,00", "R$ 6.000,00"], respostaCorreta: 0,
    explicacao: "15% de 8.000 = 1.200. 8.000 − 1.200 = R$ 6.800,00." },
  { id: "m2", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Regra de três", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "Se 5 técnicos concluem uma instalação em 12 dias, quantos dias levariam 6 técnicos, mantendo o mesmo ritmo de trabalho?",
    alternativas: ["10 dias", "14 dias", "12 dias", "15 dias"], respostaCorreta: 0,
    explicacao: "Regra de três inversa: 5×12 = 6×x → x = 60/6 = 10 dias." },
  { id: "m3", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Análise combinatória", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "De quantas formas distintas 3 técnicos podem ser escolhidos, dentre 7 disponíveis, para compor uma equipe (sem considerar a ordem)?",
    alternativas: ["21", "35", "42", "210"], respostaCorreta: 1,
    explicacao: "Combinação C(7,3) = 7!/(3!×4!) = 35." },
  { id: "m4", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Lógica proposicional", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Considere a proposição: 'Se o disjuntor está desarmado, então há sobrecarga'. A negação lógica dessa afirmação equivale a:",
    alternativas: ["O disjuntor não está desarmado e não há sobrecarga.", "O disjuntor está desarmado e não há sobrecarga.", "Se há sobrecarga, o disjuntor está desarmado.", "O disjuntor não está desarmado ou há sobrecarga."], respostaCorreta: 1,
    explicacao: "A negação de 'se P então Q' é 'P e não Q': o disjuntor está desarmado e não há sobrecarga." },
  { id: "m5", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Juros simples", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um capital de R$ 4.000,00 é aplicado a juros simples de 2% ao mês. Qual o montante após 5 meses?",
    alternativas: ["R$ 4.400,00", "R$ 4.200,00", "R$ 4.420,00", "R$ 4.040,00"], respostaCorreta: 0,
    explicacao: "Juros = 4000 × 0,02 × 5 = 400. Montante = 4000 + 400 = R$ 4.400,00." },
  { id: "m6", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Conversão de unidades", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Um cabo tem 2.350 mm de comprimento. Isso corresponde a:",
    alternativas: ["2,35 m", "23,5 m", "0,235 m", "235 m"], respostaCorreta: 0,
    explicacao: "1 m = 1000 mm, então 2.350 mm = 2,35 m." },

  // ---------------------------------------------------------------------
  // INFORMÁTICA
  // ---------------------------------------------------------------------
  { id: "i1", areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "No contexto de armazenamento de dados, 1 GB (gigabyte) corresponde, na convenção binária mais usual, a:",
    alternativas: ["1.000 MB", "1.024 MB", "1.000.000 KB", "100 MB"], respostaCorreta: 1,
    explicacao: "Na convenção binária, 1 GB = 1.024 MB (2^10)." },
  { id: "i2", areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Em uma planilha eletrônica, a fórmula =SOMA(A1:A10) realiza:",
    alternativas: ["A soma dos valores de A1 até A10", "A média dos valores de A1 e A10", "A contagem de células preenchidas entre A1 e A10", "A multiplicação de A1 por A10"], respostaCorreta: 0,
    explicacao: "A função SOMA com um intervalo soma todos os valores numéricos contidos nele." },
  { id: "i3", areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Um e-mail suspeito solicitando dados bancários, fingindo ser de uma instituição confiável, caracteriza um ataque de:",
    alternativas: ["Phishing", "Ransomware", "Brute force", "Spoofing de IP"], respostaCorreta: 0,
    explicacao: "Phishing é a técnica de engenharia social que finge ser uma fonte confiável para obter dados sigilosos." },
  { id: "i4", areaGrande: "Informática", assunto: "Redes de computadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "O protocolo responsável por traduzir nomes de domínio (como exemplo.com.br) em endereços IP é o:",
    alternativas: ["DHCP", "DNS", "FTP", "SMTP"], respostaCorreta: 1,
    explicacao: "O DNS (Domain Name System) faz a tradução de nomes de domínio para endereços IP." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Circuitos CC
  // ---------------------------------------------------------------------
  { id: "e1", areaGrande: "Eletrotécnica", assunto: "Lei de Ohm", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Um resistor de 15Ω é percorrido por uma corrente de 4A. A tensão sobre o resistor é:",
    alternativas: ["60 V", "3,75 V", "19 V", "11 V"], respostaCorreta: 0,
    explicacao: "V = R×I = 15×4 = 60 V." },
  { id: "e2", areaGrande: "Eletrotécnica", assunto: "Associação de resistores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Dois resistores de 8Ω e 12Ω são associados em paralelo. A resistência equivalente é, aproximadamente:",
    alternativas: ["4,8 Ω", "10 Ω", "20 Ω", "6 Ω"], respostaCorreta: 0,
    explicacao: "Req = (8×12)/(8+12) = 96/20 = 4,8 Ω." , temImagem: true },
  { id: "e3", areaGrande: "Eletrotécnica", assunto: "Potência elétrica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Um chuveiro elétrico de 5500 W opera em uma rede de 220 V. A corrente elétrica consumida é, aproximadamente:",
    alternativas: ["25 A", "12,5 A", "50 A", "2,5 A"], respostaCorreta: 0,
    explicacao: "I = P/V = 5500/220 = 25 A." },
  { id: "e4", areaGrande: "Eletrotécnica", assunto: "Energia elétrica", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Uma carga de 2 kW permanece ligada por 3 horas diárias, durante 30 dias. O consumo de energia no mês é:",
    alternativas: ["180 kWh", "60 kWh", "90 kWh", "360 kWh"], respostaCorreta: 0,
    explicacao: "E = P×t = 2 kW × 3h × 30 dias = 180 kWh." },
  { id: "e5", areaGrande: "Eletrotécnica", assunto: "Leis de Kirchhoff", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "A Lei de Kirchhoff das correntes (Lei dos Nós) estabelece que, em qualquer nó de um circuito:",
    alternativas: ["A soma das correntes que entram é igual à soma das que saem.", "A soma das tensões é sempre zero.", "A corrente é proporcional à resistência.", "A potência dissipada é constante."], respostaCorreta: 0,
    explicacao: "A Lei dos Nós (1ª Lei de Kirchhoff) decorre da conservação da carga: o que entra em um nó deve sair." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Circuitos CA
  // ---------------------------------------------------------------------
  { id: "e6", areaGrande: "Eletrotécnica", assunto: "Corrente alternada", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A frequência da rede elétrica no Brasil é de 60 Hz. Isso significa que a tensão alternada completa, por segundo:",
    alternativas: ["60 ciclos completos", "60 picos de tensão", "30 ciclos completos", "120 inversões de polaridade por minuto"], respostaCorreta: 0,
    explicacao: "Frequência de 60 Hz significa 60 ciclos completos (senoide completa) por segundo." },
  { id: "e7", areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um motor opera com fator de potência 0,8 indutivo. Isso indica que:",
    alternativas: ["A corrente está atrasada em relação à tensão.", "A corrente está adiantada em relação à tensão.", "Não há defasagem entre tensão e corrente.", "A potência reativa é nula."], respostaCorreta: 0,
    explicacao: "Em cargas indutivas (motores), a corrente fica atrasada em relação à tensão, gerando fator de potência indutivo." },
  { id: "e8", areaGrande: "Eletrotécnica", assunto: "Potência em CA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Em um circuito de corrente alternada, a potência ativa (P), reativa (Q) e aparente (S) se relacionam por:",
    alternativas: ["S² = P² + Q²", "S = P + Q", "P = S + Q", "Q² = P + S"], respostaCorreta: 0,
    explicacao: "As três potências formam o 'triângulo de potências': S é a hipotenusa, P e Q os catetos — S² = P² + Q²." },
  { id: "e9", areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Em um sistema trifásico equilibrado em estrela, a relação entre tensão de linha (VL) e tensão de fase (VF) é:",
    alternativas: ["VL = √3 × VF", "VL = VF", "VL = 3 × VF", "VL = VF/√3"], respostaCorreta: 0,
    explicacao: "Na ligação estrela, a tensão de linha é √3 vezes a tensão de fase." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Magnetismo / Eletromagnetismo
  // ---------------------------------------------------------------------
  { id: "e10", areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "O princípio físico segundo o qual um condutor percorrido por corrente elétrica gera um campo magnético ao seu redor é conhecido como:",
    alternativas: ["Lei de Ampère / Oersted", "Lei de Coulomb", "Lei de Ohm", "Efeito Joule"], respostaCorreta: 0,
    explicacao: "Foi Oersted quem observou esse fenômeno, formalizado posteriormente pela Lei de Ampère." },
  { id: "e11", areaGrande: "Eletrotécnica", assunto: "Indução eletromagnética", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "A Lei de Faraday estabelece que a força eletromotriz induzida em um circuito é proporcional:",
    alternativas: ["À taxa de variação do fluxo magnético.", "À resistência do circuito.", "À temperatura do condutor.", "Ao comprimento do condutor apenas."], respostaCorreta: 0,
    explicacao: "A fem induzida é proporcional à taxa de variação do fluxo magnético no tempo (e = −dΦ/dt)." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Motores e Transformadores
  // ---------------------------------------------------------------------
  { id: "e12", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A principal vantagem da partida estrela-triângulo em motores trifásicos é:",
    alternativas: ["Reduzir a corrente de partida.", "Aumentar o torque de partida.", "Eliminar a necessidade de proteção térmica.", "Aumentar a velocidade nominal do motor."], respostaCorreta: 0,
    explicacao: "Na ligação estrela durante a partida, a corrente de linha cai a 1/3 da partida direta em triângulo." },
  { id: "e13", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "O escorregamento (slip) de um motor de indução trifásico é definido como:",
    alternativas: ["A diferença relativa entre a velocidade síncrona e a velocidade do rotor.", "A relação entre tensão e corrente nominal.", "A diferença entre potência ativa e reativa.", "A razão entre o número de polos e a frequência."], respostaCorreta: 0,
    explicacao: "Escorregamento s = (Ns − Nr)/Ns, onde Ns é a velocidade síncrona e Nr a velocidade do rotor." },
  { id: "e14", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "Um transformador ideal tem relação de transformação 10:1 (primário:secundário). Se a tensão no primário é 2200V, a tensão no secundário é:",
    alternativas: ["220 V", "2200 V", "22000 V", "110 V"], respostaCorreta: 0,
    explicacao: "Relação 10:1 significa que o secundário tem 1/10 da tensão do primário: 2200/10 = 220 V." , temImagem: true },
  { id: "e15", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "As perdas em um transformador que ocorrem no núcleo, independentemente da carga, são chamadas de:",
    alternativas: ["Perdas no ferro (ou perdas em vazio)", "Perdas no cobre", "Perdas por efeito Joule no enrolamento", "Perdas por atrito"], respostaCorreta: 0,
    explicacao: "As perdas no ferro (histerese e correntes parasitas) ocorrem no núcleo magnético e são praticamente constantes, independentes da carga." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Instalações e NBR 5410
  // ---------------------------------------------------------------------
  { id: "e16", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Segundo a NBR 5410, a seção mínima de condutor para circuitos de iluminação em instalações residenciais é:",
    alternativas: ["1,5 mm²", "0,5 mm²", "2,5 mm²", "4 mm²"], respostaCorreta: 0,
    explicacao: "A NBR 5410 estabelece 1,5 mm² como seção mínima para circuitos de iluminação." },
  { id: "e17", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "O limite usual de queda de tensão admitido em circuitos terminais de instalações de baixa tensão é de:",
    alternativas: ["4%", "1%", "10%", "0,5%"], respostaCorreta: 0,
    explicacao: "A NBR 5410 recomenda queda de tensão máxima de 4% em circuitos terminais (instalações alimentadas diretamente por subestação de baixa tensão)." },
  { id: "e18", areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",
    enunciado: "O dispositivo cuja principal função é proteger pessoas contra choques elétricos por contato indireto é o:",
    alternativas: ["DR (dispositivo residual / interruptor diferencial)", "Disjuntor termomagnético comum", "Fusível NH", "Contator"], respostaCorreta: 0,
    explicacao: "O DR detecta correntes de fuga e desarma rapidamente, protegendo contra choques por contato indireto." },
  { id: "e19", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "No esquema de aterramento TN-S, a característica principal é:",
    alternativas: ["Condutores de neutro (N) e proteção (PE) são distintos em toda a instalação.", "Não existe aterramento da fonte.", "O neutro e o terra são unidos apenas no ponto de consumo.", "Utiliza-se apenas um condutor PEN combinado."], respostaCorreta: 0,
    explicacao: "No esquema TN-S, os condutores neutro e de proteção são totalmente separados, da fonte até a carga." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Segurança (NR10)
  // ---------------------------------------------------------------------
  { id: "e20", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Segundo a NR10, antes de iniciar trabalhos em instalações desenergizadas, deve-se seguir uma sequência de procedimentos. A etapa que vem IMEDIATAMENTE após a desenergização e antes do aterramento é:",
    alternativas: ["Constatação da ausência de tensão", "Instalação de sinalização de impedimento de reenergização", "Seccionamento", "Proteção dos elementos energizados existentes na zona controlada"], respostaCorreta: 0,
    explicacao: "A sequência da NR10 é: seccionamento → impedimento de reenergização → constatação de ausência de tensão → aterramento → proteção dos elementos energizados → sinalização." },
  { id: "e21", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "De acordo com a NR10, trabalhos em instalações elétricas só podem ser realizados por trabalhadores:",
    alternativas: ["Qualificados, capacitados ou autorizados, conforme o caso", "Apenas engenheiros eletricistas", "Qualquer colaborador da empresa", "Apenas com mais de 5 anos de experiência"], respostaCorreta: 0,
    explicacao: "A NR10 exige que o trabalhador seja qualificado, capacitado ou autorizado, conforme a natureza da atividade." },
  { id: "e22", areaGrande: "Eletrotécnica", assunto: "EPI/EPC", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Fácil",
    enunciado: "Em trabalhos em altura com risco elétrico, são exemplos de Equipamento de Proteção Individual (EPI):",
    alternativas: ["Luvas isolantes e cinto de segurança tipo paraquedista", "Apenas o disjuntor de proteção", "Sinalização de área", "Aterramento temporário"], respostaCorreta: 0,
    explicacao: "EPIs são equipamentos de uso individual, como luvas isolantes e cinto de segurança — diferente de EPCs (proteção coletiva, como sinalização e aterramento temporário)." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Instrumentação e Medidas
  // ---------------------------------------------------------------------
  { id: "e23", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Para medir corrente elétrica em um circuito, o amperímetro deve ser conectado:",
    alternativas: ["Em série com o circuito", "Em paralelo com o circuito", "Em qualquer configuração, desde que próximo à fonte", "Diretamente nos terminais da bateria, isolado do circuito"], respostaCorreta: 0,
    explicacao: "O amperímetro mede a corrente que o atravessa, por isso deve ser inserido em série no caminho da corrente." },
  { id: "e24", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um voltímetro ideal deve apresentar resistência interna:",
    alternativas: ["Muito alta (tendendo ao infinito)", "Muito baixa (tendendo a zero)", "Igual à resistência do circuito medido", "Indiferente ao valor"], respostaCorreta: 0,
    explicacao: "Resistência interna alta minimiza a corrente desviada pelo instrumento, reduzindo o erro de medição (efeito de carga)." },
  { id: "e25", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Difícil",
    enunciado: "Um sensor de temperatura do tipo termopar funciona baseado no princípio físico:",
    alternativas: ["Efeito Seebeck (geração de tensão por diferença de temperatura entre metais distintos)", "Efeito Joule", "Efeito Hall", "Lei de Ohm"], respostaCorreta: 0,
    explicacao: "O termopar gera uma pequena tensão proporcional à diferença de temperatura entre suas junções, fenômeno conhecido como Efeito Seebeck." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Eletrônica básica
  // ---------------------------------------------------------------------
  { id: "e26", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "O componente eletrônico que permite a passagem de corrente em apenas um sentido é:",
    alternativas: ["Diodo", "Resistor", "Capacitor", "Indutor"], respostaCorreta: 0,
    explicacao: "O diodo é um semicondutor que conduz corrente predominantemente em um único sentido (polarização direta)." },
  { id: "e27", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um transistor bipolar (BJT) operando como interruptor, na região de saturação, apresenta:",
    alternativas: ["Tensão coletor-emissor próxima de zero, com corrente máxima conduzida", "Corrente de coletor nula", "Comportamento linear de amplificação", "Resistência infinita entre coletor e emissor"], respostaCorreta: 0,
    explicacao: "Na saturação, o transistor se comporta como uma chave fechada: Vce ≈ 0 e a corrente é limitada apenas pelo circuito externo." },
  { id: "e28", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Fácil",
    enunciado: "O capacitor é um componente que armazena energia na forma de:",
    alternativas: ["Campo elétrico", "Campo magnético", "Energia térmica", "Energia mecânica"], respostaCorreta: 0,
    explicacao: "O capacitor armazena energia elétrica na forma de campo elétrico entre suas placas." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Comandos elétricos
  // ---------------------------------------------------------------------
  { id: "e29", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Em um circuito de comando de motor, o contator é acionado por:",
    alternativas: ["Uma bobina eletromagnética que fecha os contatos de força", "Diretamente pela tensão de força do motor", "Apenas por botoeira mecânica sem energia elétrica", "Pressão hidráulica"], respostaCorreta: 0,
    explicacao: "O contator possui uma bobina que, energizada, cria um campo magnético que fecha os contatos principais (de força)." },
  { id: "e30", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "A função do relé térmico em um circuito de comando de motor é:",
    alternativas: ["Proteger o motor contra sobrecargas térmicas", "Aumentar a velocidade do motor", "Inverter o sentido de rotação", "Reduzir a tensão de partida"], respostaCorreta: 0,
    explicacao: "O relé térmico monitora a corrente do motor e desarma o circuito em caso de sobrecarga prolongada, evitando danos térmicos." },
  { id: "e31", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Difícil",
    enunciado: "Em um circuito de intertravamento elétrico para reversão de motor (liga/desliga, sentido horário/anti-horário), o objetivo principal é:",
    alternativas: ["Impedir o acionamento simultâneo de dois contatores que causariam curto-circuito de fases", "Aumentar o torque de partida", "Reduzir o consumo de energia em repouso", "Eliminar a necessidade de fusíveis"], respostaCorreta: 0,
    explicacao: "O intertravamento evita que os contatores de sentido horário e anti-horário sejam acionados ao mesmo tempo, o que causaria curto-circuito entre fases." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — Geração, Transmissão e Distribuição
  // ---------------------------------------------------------------------
  { id: "e32", areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A principal razão para transmitir energia elétrica em alta tensão por longas distâncias é:",
    alternativas: ["Reduzir as perdas por efeito Joule, já que a corrente diminui para a mesma potência", "Aumentar a frequência da rede", "Reduzir o custo dos transformadores", "Eliminar a necessidade de aterramento"], respostaCorreta: 0,
    explicacao: "Para uma mesma potência transmitida (P = V×I), elevar a tensão reduz a corrente, e como as perdas (I²R) dependem do quadrado da corrente, isso reduz drasticamente as perdas." },
  { id: "e33", areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Uma usina termelétrica converte energia térmica em energia elétrica através, tipicamente, de:",
    alternativas: ["Turbina a vapor acoplada a um gerador síncrono", "Painéis fotovoltaicos", "Células a combustível diretamente", "Baterias de íon-lítio"], respostaCorreta: 0,
    explicacao: "Em usinas termelétricas convencionais, o calor gera vapor que move uma turbina, que por sua vez aciona o eixo de um gerador síncrono." },
  { id: "e34", areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Distorções na forma de onda senoidal da tensão/corrente, causadas por cargas não lineares, são quantificadas pelo indicador:",
    alternativas: ["THD (Taxa de Distorção Harmônica)", "Fator de potência apenas", "Queda de tensão", "Escorregamento"], respostaCorreta: 0,
    explicacao: "O THD (Total Harmonic Distortion) mede o quanto a forma de onda real se desvia de uma senoide pura, devido a harmônicos gerados por cargas não lineares." },

  // ---------------------------------------------------------------------
  // CERTO/ERRADO — formato CESGRANRIO/Petrobras (itens julgados), nível mais
  // denso, inspirado em simulados preparatórios reais quanto a estrutura,
  // porém com enunciados e valores 100% originais.
  // ---------------------------------------------------------------------
  { id: "ce1", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "A condutividade elétrica dos materiais condutores diminui com o aumento da temperatura, devido ao maior espalhamento de elétrons pelas vibrações da rede cristalina.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Em condutores metálicos, o aumento de temperatura intensifica as vibrações atômicas, aumentando a resistividade e reduzindo a condutividade — afirmativa correta." },
  { id: "ce2", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um condutor de cobre com resistividade 1,7×10⁻⁸ Ω·m, seção transversal de 2,5 mm² e comprimento de 150 m, percorrido por 6 A, dissipa potência superior a 35 W.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "R = ρL/A = 1,7×10⁻⁸ × 150 / (2,5×10⁻⁶) ≈ 1,02 Ω. P = I²R = 36 × 1,02 ≈ 36,7 W, que é superior a 35 W — afirmativa CORRETA." },
  { id: "ce3", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "Em um divisor de tensão com dois resistores em série, se R2 é o triplo de R1, a queda de tensão sobre R2 corresponde a 3/4 da tensão total da fonte.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "V_R2 = R2/(R1+R2) × V = 3R1/(R1+3R1) × V = 3/4 × V — afirmativa correta." , temImagem: true },
  { id: "ce4", areaGrande: "Eletrotécnica", assunto: "Leis de Kirchhoff", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "Em um circuito com dois resistores em paralelo alimentados pela mesma fonte, a corrente total fornecida pela fonte é igual à soma das correntes em cada ramo, conforme a Lei dos Nós de Kirchhoff.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Pela 1ª Lei de Kirchhoff (Lei dos Nós), a corrente que entra em um nó é igual à soma das correntes que saem — afirmativa correta." },
  { id: "ce5", areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Pelo Teorema de Thévenin, um circuito linear de corrente alternada com dois terminais pode ser substituído por uma fonte de tensão equivalente em série com uma impedância equivalente.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "O Teorema de Thévenin define justamente essa equivalência: fonte de tensão + impedância em série (diferente de Norton, que usa fonte de corrente em paralelo)." },
  { id: "ce6", areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "Uma tensão de pico de 311 V corresponde, aproximadamente, a 220 V de tensão eficaz (RMS), considerando uma onda senoidal pura.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "V_rms = V_pico/√2 = 311/1,414 ≈ 220 V — afirmativa correta." },
  { id: "ce7", areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Uma carga industrial com potência aparente de 20.000 VA e fator de potência 0,7 indutivo solicita uma potência ativa superior a 15.000 W.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "P = S × cos(φ) = 20.000 × 0,7 = 14.000 W, que é inferior a 15.000 W — a afirmativa está ERRADA." },
  { id: "ce8", areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "Para cargas trifásicas conectadas em estrela, a corrente de linha é igual à corrente de fase.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Na ligação estrela, a corrente de linha é igual à corrente de fase (diferente da ligação triângulo, onde a tensão de linha é igual à de fase)." , temImagem: true },
  { id: "ce9", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "O amperímetro alicate realiza uma medição não invasiva de corrente, sem necessidade de interromper o circuito.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "O alicate amperímetro mede a corrente por indução eletromagnética, sem necessidade de abrir o circuito — diferente do amperímetro convencional, que precisa ser inserido em série." },
  { id: "ce10", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",
    enunciado: "No método dos dois wattímetros para medição de potência trifásica, se cada wattímetro indicar 600 W, a potência ativa total da carga trifásica equivale a 1.800 W.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "No método dos dois wattímetros, a potência ativa total é a SOMA das duas leituras: 600 + 600 = 1.200 W, não 1.800 W — a afirmativa está ERRADA." },
  { id: "ce11", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2022, dificuldade: "Médio",
    enunciado: "Um instrumento de medição exato necessariamente também é preciso, já que exatidão e precisão são sinônimos em metrologia.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "Exatidão (proximidade do valor verdadeiro) e precisão (repetibilidade das medições) são conceitos distintos — um instrumento pode ser preciso (resultados consistentes) sem ser exato (próximo do valor real), e vice-versa." },
  { id: "ce12", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "A NBR 5410 é aplicável a instalações elétricas alimentadas sob tensão nominal igual ou inferior a 1.000 V em corrente alternada.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A NBR 5410 abrange instalações de baixa tensão, definida como até 1.000 V em CA (ou 1.500 V em CC) — afirmativa correta." },
  { id: "ce13", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Conforme a NBR 5410, a previsão mínima de cargas de tomada (TUG) tem como referência a área do cômodo, e não o seu perímetro.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "A previsão de TUG é baseada no PERÍMETRO do cômodo (uma tomada a cada X metros de perímetro ou fração), não na área — afirmativa ERRADA." },
  { id: "ce14", areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "Para a proteção de um condutor contra sobrecargas, deve-se garantir que a corrente de projeto seja menor ou igual à corrente nominal do dispositivo de proteção, que por sua vez deve ser menor ou igual à capacidade de condução do condutor.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Essa é exatamente a regra de coordenação Ib ≤ In ≤ Iz estabelecida pela NBR 5410 — afirmativa correta." },
  { id: "ce15", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",
    enunciado: "No esquema de aterramento TT, tanto a fonte quanto as massas da instalação são aterradas em um único e mesmo eletrodo de aterramento.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "No esquema TT, a fonte e as massas são aterradas em eletrodos ELETRICAMENTE DISTINTOS — afirmativa ERRADA." },
  { id: "ce16", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "Quanto menor a resistividade elétrica do solo, melhor a dispersão de corrente elétrica, beneficiando o desempenho do sistema de aterramento.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Solos com baixa resistividade dispersam melhor a corrente de falta, resultando em resistências de aterramento mais baixas — afirmativa correta." },
  { id: "ce17", areaGrande: "Eletrotécnica", assunto: "SPDA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2022, dificuldade: "Médio",
    enunciado: "Descargas atmosféricas são fenômenos previsíveis com exatidão, sendo possível evitar totalmente sua incidência por meio de um SPDA bem projetado.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "Descargas atmosféricas não são previsíveis com exatidão, e o SPDA não impede a ocorrência do raio — ele apenas oferece um caminho preferencial seguro para a corrente, minimizando danos. Afirmativa ERRADA." },
  { id: "ce18", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um transformador ideal monofásico tem 400 espiras no primário e 100 no secundário. Alimentado com tensão de 440 V no primário e corrente de 3 A no secundário, a corrente no primário é de 0,75 A.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Relação de espiras 400:100 = 4:1. A corrente se relaciona de forma inversa à tensão: I1/I2 = N2/N1 = 1/4. Logo I1 = I2/4 = 3/4 = 0,75 A — afirmativa CORRETA." , temImagem: true },
  { id: "ce19", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "As perdas no cobre de um transformador variam com o quadrado da corrente de carga, sendo praticamente nulas em vazio.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "As perdas no cobre (efeito Joule nos enrolamentos) seguem P = I²R, dependendo da carga — em vazio (sem corrente de carga), são praticamente nulas. Afirmativa correta." },
  { id: "ce20", areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um motor síncrono é construtivamente análogo a um gerador síncrono, diferindo apenas no sentido do fluxo de potência ativa.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Motores e geradores síncronos compartilham a mesma estrutura básica — a diferença está em a máquina receber energia elétrica e fornecer mecânica (motor) ou o inverso (gerador). Afirmativa correta." },
  { id: "ce21", areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Considerando uma máquina síncrona alimentada a 60 Hz, operando com velocidade de campo girante de 1.200 rpm, o número de pares de polos é igual a 3.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Ns = 120×f/p (p = número de polos) → 1200 = 120×60/p → p = 7200/1200 = 6 polos = 3 pares de polos. Afirmativa correta." },
  { id: "ce22", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "A partida direta é o método que proporciona o maior conjugado de partida entre os métodos usuais (direta, estrela-triângulo, soft-starter).",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Apesar de também ter a maior corrente de partida, a partida direta proporciona o maior conjugado (torque) de partida, já que a tensão plena é aplicada desde o início. Afirmativa correta." },
  { id: "ce23", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "Para fins de aplicação da NR10, considera-se baixa tensão a faixa superior a 50 V e igual ou inferior a 1.000 V em corrente alternada, medida entre fases.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A NR10 define baixa tensão como a faixa de tensão superior a 50V e igual ou inferior a 1000V em corrente alternada — afirmativa correta." },
  { id: "ce24", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "Segundo a NR10, trabalhos em instalações elétricas energizadas em condições de risco só podem ser realizados quando houver impossibilidade técnica de desenergização e mediante adoção de medidas de controle complementares.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A NR10 estabelece que a regra geral é trabalhar desenergizado; trabalhos energizados só são admitidos em situações específicas de impossibilidade técnica, com medidas de controle adicionais — afirmativa correta." },
  { id: "ce25", areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",
    enunciado: "O número binário 11010 corresponde ao número decimal 26.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "11010₂ = 1×16 + 1×8 + 0×4 + 1×2 + 0×1 = 16+8+0+2+0 = 26. Afirmativa correta." },
  { id: "ce26", areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",
    enunciado: "A saída de uma porta lógica XOR (OU-exclusivo) é 1 somente quando todas as entradas forem iguais a 1.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "A porta XOR tem saída 1 quando as entradas são DIFERENTES entre si (uma é 0 e outra é 1), não quando todas são 1 (isso descreveria a porta AND). Afirmativa ERRADA." },

  // ---------------------------------------------------------------------
  // NOVO LOTE — inspirado em provas oficiais reais Petrobras/CESGRANRIO
  // (questões 100% originais, nunca copiadas do texto da banca)
  // ---------------------------------------------------------------------
  { id: "n1", areaGrande: "Eletrotécnica", assunto: "Método dos dois wattímetros", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "No método dos dois wattímetros para medição de potência em carga trifásica, os instrumentos indicam 900 W e 500 W. A potência ativa total da carga é igual a 1.400 W.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A potência ativa total é a soma das duas leituras (independente do sinal de cada uma): 900 + 500 = 1.400 W — afirmativa correta." , temImagem: true },
  { id: "n2", areaGrande: "Eletrotécnica", assunto: "Método dos dois wattímetros", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "No método dos dois wattímetros, quando o fator de potência da carga trifásica é exatamente 0,5, uma das duas leituras é igual a zero.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Para FP = 0,5 (ângulo de 60°), uma das leituras do método dos dois wattímetros é nula — esse é um dos pontos de referência clássicos do método." },
  { id: "n3", areaGrande: "Eletrotécnica", assunto: "Thévenin e Norton (CA)", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Na transformação entre os circuitos equivalentes de Thévenin e Norton em corrente alternada, a impedância de Norton é numericamente igual à impedância de Thévenin do mesmo circuito.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A impedância equivalente é a mesma nos dois modelos — o que muda é a fonte (tensão em série, no caso de Thévenin; corrente em paralelo, no caso de Norton). Afirmativa correta." },
  { id: "n4", areaGrande: "Eletrotécnica", assunto: "Partida estrela-triângulo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um motor trifásico tem corrente nominal de 120 A e razão entre corrente de partida e nominal igual a 6. Na partida direta, a corrente de partida seria de 720 A; já na partida estrela-triângulo, essa corrente cai para aproximadamente 240 A.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Partida direta: 120×6 = 720 A. Estrela-triângulo: a corrente de linha em estrela é 1/3 da corrente em triângulo: 720/3 = 240 A — afirmativa correta." , temImagem: true },
  { id: "n5", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um transformador ideal com relação de espiras 20:1 tem, no primário, tensão de 4.400 V e corrente de 8 A. A potência aparente desse transformador é igual a 35,2 kVA, e a corrente no secundário é de 160 A.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "S = V1×I1 = 4400×8 = 35.200 VA = 35,2 kVA. Pela relação de transformação, I2 = I1×(N1/N2) = 8×20 = 160 A — afirmativa correta." , temImagem: true },
  { id: "n6", areaGrande: "Eletrotécnica", assunto: "Luminotécnica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Uma sala de 12 m × 8 m precisa de iluminância de 1.000 lux. Considerando fator de depreciação de 0,8, coeficiente de utilização de 0,5 e luminárias com 4 lâmpadas de 2.000 lúmens cada (8.000 lúmens por luminária), são necessárias menos de 30 luminárias.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "Fluxo total necessário = (E×A)/(Fd×Cu) = (1000×96)/(0,8×0,5) = 96000/0,4 = 240.000 lm. Nº luminárias = 240.000/8.000 = 30 — não é MENOS que 30, é exatamente 30. Afirmativa ERRADA." },
  { id: "n7", areaGrande: "Eletrotécnica", assunto: "NBR 14039 (média tensão)", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "A NBR 14039 estabelece os requisitos para instalações elétricas de média tensão, com tensão nominal entre 1,0 kV e 36,2 kV em corrente alternada.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A NBR 14039 abrange exatamente essa faixa de tensão (1,0 kV a 36,2 kV) — afirmativa correta." },
  { id: "n8", areaGrande: "Eletrotécnica", assunto: "NBR 14039 (média tensão)", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Em subestações de média tensão, as posições de equipamentos de manobra com contatos não visíveis devem ser sinalizadas, sendo usual a convenção de cor verde para indicar contato fechado e vermelho para contato aberto.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Essa é a convenção usual prevista pela norma de média tensão para sinalização de posição de equipamentos de manobra — afirmativa correta." },
  { id: "n9", areaGrande: "Eletrotécnica", assunto: "SPDA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Pelo método do ângulo de proteção (ângulo de 45°), um captor tipo Franklin instalado em um mastro de 8 m de altura protege, no nível do solo, um raio de cobertura de aproximadamente 8 m.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Para ângulo de proteção de 45°, o raio de cobertura no solo é igual à altura do captor (tan 45° = 1, então raio = altura × tan(45°) = altura) — afirmativa correta." },
  { id: "n10", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos / CLP", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Em um Controlador Lógico Programável (CLP), a lógica Ladder é uma das linguagens de programação padronizadas, representando contatos e bobinas de forma similar a um diagrama elétrico de comando.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A linguagem Ladder (diagrama de contatos) é uma das 5 linguagens padronizadas pela IEC 61131-3, com representação visual inspirada em circuitos de comando a relés — afirmativa correta." },
  { id: "n11", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos / CLP", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Em um sistema de controle de nível de um tanque por CLP, um sistema com lógica de histerese (selo) entre o nível alto e o nível baixo evita o acionamento repetitivo (chaveamento excessivo) da bomba quando o nível oscila perto de um único ponto de referência.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Usar dois pontos de referência distintos (alto e baixo) com lógica de selo (set/reset) é justamente a estratégia para evitar o chaveamento repetitivo que ocorreria com um único set-point — afirmativa correta." },
  { id: "n12", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A partida indireta de motores trifásicos (estrela-triângulo, chave compensadora, soft-starter) é geralmente preferida à partida direta em motores de maior potência, principalmente para reduzir os impactos de corrente na rede de alimentação.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Motores de maior potência, ao partirem diretamente, podem causar quedas de tensão significativas na rede — por isso a partida indireta é preferida nesses casos. Afirmativa correta." },
  { id: "n13", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um galvanômetro com resistência interna de 50 Ω suporta corrente máxima de 5 mA. Para transformá-lo em um amperímetro capaz de medir até 10 A, a resistência shunt (em paralelo) deve ser muito menor que 50 Ω.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Como o shunt precisa desviar a maior parte da corrente (9,995 A de 10 A), ele precisa ter uma resistência bem menor que a do galvanômetro, para que a divisão de corrente favoreça amplamente o shunt — afirmativa correta." },
  { id: "n14", areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Analisando curvas de atuação tempo×corrente, um disjuntor de ramal sempre atua mais rapidamente que o disjuntor geral para uma mesma corrente de curto-circuito, garantindo seletividade total entre os dois.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 1,
    explicacao: "A seletividade depende da relação específica entre as curvas dos dois disjuntores em cada faixa de corrente — não é uma garantia automática e universal; em algumas faixas de corrente elevada, as curvas podem se sobrepor, comprometendo a seletividade. Afirmativa ERRADA (generalização indevida)." , temImagem: true },
  { id: "n15", areaGrande: "Eletrotécnica", assunto: "Manutenção elétrica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "O monitoramento periódico de pontos de conexão elétrica por câmera termográfica, sem interromper a operação do equipamento, é um exemplo característico de manutenção preditiva.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "A termografia é uma técnica clássica de manutenção preditiva: monitora uma condição (temperatura) para prever falhas antes que ocorram, sem necessidade de parar o equipamento — afirmativa correta." },
  { id: "n16", areaGrande: "Eletrotécnica", assunto: "Manutenção elétrica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A simples troca de um fusível queimado por outro idêntico, restaurando o funcionamento do circuito sem investigação da causa raiz, é classificada como manutenção corretiva.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Substituir um componente danificado após a falha ocorrer caracteriza manutenção corretiva (reativa, após o problema já ter se manifestado) — afirmativa correta." },
  { id: "n17", areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Inversores de frequência aplicados a bombas centrífugas permitem reduzir a velocidade do motor para diminuir a vazão, o que tende a gerar economia de energia frente ao uso de válvulas de estrangulamento na mesma finalidade.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Reduzir a velocidade da bomba via inversor consome significativamente menos energia que manter a bomba a plena velocidade e restringir o fluxo por válvula (que desperdiça energia em perda de carga) — afirmativa correta." },
  { id: "n18", areaGrande: "Eletrotécnica", assunto: "Nobreaks e baterias", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um nobreak do tipo on-line (de dupla conversão) mantém a carga permanentemente alimentada pelo inversor, convertendo a energia da rede em CC e depois novamente em CA, mesmo em condições normais de operação.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "No nobreak on-line de dupla conversão, a carga é sempre alimentada pelo inversor (CA-CC-CA contínuo), diferente do tipo linha interativa, que só aciona o inversor na falta de energia — afirmativa correta." },
  { id: "n19", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "O esquema de aterramento TN-C utiliza um único condutor (PEN) combinando as funções de neutro e proteção em todo o trajeto da instalação, a partir da fonte.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "No esquema TN-C, o condutor PEN combina as funções de neutro (N) e proteção (PE) em um único condutor — afirmativa correta." },
  { id: "n20", areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Lâmpadas de vapor de sódio possuem, em geral, eficiência luminosa (lm/W) superior à de lâmpadas halógenas convencionais, sendo por isso bastante usadas em iluminação pública e de grandes áreas.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "Lâmpadas de vapor de sódio têm eficiência luminosa bem mais alta (até ~150 lm/W) que halógenas (~20 lm/W), justificando seu uso amplo em áreas extensas — afirmativa correta." },

  // ---------------------------------------------------------------------
  // ELETROTÉCNICA — lote adicional de questões originais de alta
  // dificuldade (cálculo em múltiplas etapas, nível concurso técnico)
  // ---------------------------------------------------------------------
  { id: "e35", inedita: true, areaGrande: "Eletrotécnica", assunto: "Grandezas elétricas e magnéticas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um circuito magnético tem núcleo de seção reta A = 4 cm², comprimento médio do núcleo l = 40 cm, permeabilidade relativa μr = 1.000, e um entreferro (gap de ar) de g = 0,5 mm na mesma seção. O enrolamento tem N = 800 espiras e é percorrido por corrente I = 1,5 A. Considerando μ0 = 4π×10⁻⁷ H/m, o fluxo magnético φ no circuito é de aproximadamente:",
    alternativas: ["0,17 mWb", "0,67 mWb", "1,20 mWb", "2,68 mWb", "6,70 mWb"], respostaCorreta: 1,
    explicacao: "Relutância do núcleo: Rn = l/(μ0·μr·A) = 0,4/(4π×10⁻⁷×1000×4×10⁻⁴) ≈ 7,96×10⁵ A·e/Wb. Relutância do entreferro: Rg = g/(μ0·A) = 5×10⁻⁴/(4π×10⁻⁷×4×10⁻⁴) ≈ 9,95×10⁵ A·e/Wb. Relutância total ≈ 1,79×10⁶ A·e/Wb. φ = N·I/Rtotal = 1200/1,79×10⁶ ≈ 0,67×10⁻³ Wb." },

  { id: "e36", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um transformador trifásico, ligação delta no primário e estrela no secundário (Δ-Y), é alimentado por uma tensão de linha de 4.160 V. O enrolamento primário tem 1.000 espiras e o secundário, 50 espiras. A tensão de FASE no secundário vale aproximadamente:",
    alternativas: ["72 V", "120 V", "144 V", "208 V", "360 V"], respostaCorreta: 3,
    explicacao: "Em ligação delta, a tensão de fase do primário é igual à tensão de linha: 4.160 V. Relação de transformação a = N1/N2 = 1000/50 = 20. Tensão de fase do secundário (estrela) = 4160/20 = 208 V." },

  { id: "e37", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um autotransformador abaixador alimenta uma carga de 10 kVA com tensão de saída de 200 V a partir de uma fonte de 240 V. Desprezando perdas, a potência transferida diretamente por CONDUÇÃO elétrica (sem passar pela transformação eletromagnética do enrolamento comum) vale aproximadamente:",
    alternativas: ["1,67 kVA", "5,00 kVA", "8,33 kVA", "10,00 kVA", "11,67 kVA"], respostaCorreta: 2,
    explicacao: "Corrente de carga: Iout = 10.000/200 = 50 A. Corrente de entrada: Iin = 10.000/240 ≈ 41,67 A. A potência conduzida diretamente é Vout×Iin = 200×41,67 ≈ 8.333 VA ≈ 8,33 kVA; o restante (≈1,67 kVA) é transferido por transformação no enrolamento comum." },

  { id: "e38", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um gerador CC composto em curta derivação tem tensão terminal de 240 V e corrente de linha (carga) de 60 A. A resistência do enrolamento de campo série é 0,02 Ω e a resistência da armadura é 0,07 Ω. Nessas condições, a corrente de armadura e a queda de tensão na armadura valem, respectivamente:",
    alternativas: ["60 A e 4,2 V", "60 A e 5,6 V", "64 A e 4,48 V", "64 A e 4,8 V", "66 A e 4,62 V"], respostaCorreta: 0,
    explicacao: "Em ligação curta derivação, o campo shunt está em paralelo apenas com o terminal (após o campo série), mas a corrente de armadura, na ausência de dados de corrente de excitação shunt informados, é tomada igual à corrente de linha: Ia = 60 A. Queda na armadura = Ia×Ra = 60×0,07 = 4,2 V." },

  { id: "e39", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um gerador síncrono, operando com fator de potência unitário, apresenta tensão a vazio (sem carga) de 240 V e tensão terminal de 220 V a plena carga. A regulação de tensão (RT) desse gerador, em percentual, vale aproximadamente:",
    alternativas: ["7,7%", "8,3%", "9,1%", "10,9%", "12,0%"], respostaCorreta: 2,
    explicacao: "RT = [(Vvazio − Vcarga)/Vcarga] × 100 = [(240−220)/220] × 100 ≈ 9,1%." },

  { id: "e40", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Em um circuito RLC paralelo, alimentado por fonte senoidal, tem-se R = 50 Ω, L = 1 H e C = 4 μF. A frequência de ressonância desse circuito vale aproximadamente:",
    alternativas: ["7,96 Hz", "15,9 Hz", "79,6 Hz", "159 Hz", "796 Hz"], respostaCorreta: 2,
    explicacao: "f0 = 1/(2π√(LC)) = 1/(2π√(1×4×10⁻⁶)) = 1/(2π×2×10⁻³) ≈ 1/0,01257 ≈ 79,6 Hz." },

  { id: "e41", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um motor de indução trifásico, 4 polos, alimentado em 60 Hz, opera em regime permanente a 1.755 rpm. A frequência das correntes induzidas no rotor (frequência de escorregamento) vale:",
    alternativas: ["0,5 Hz", "1,0 Hz", "1,5 Hz", "2,5 Hz", "3,0 Hz"], respostaCorreta: 2,
    explicacao: "Ns = 120×f/p = 120×60/4 = 1.800 rpm. Escorregamento s = (1800−1755)/1800 ≈ 0,025. Frequência rotórica = s×f = 0,025×60 = 1,5 Hz." },

  { id: "e42", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Uma fonte trifásica equilibrada em estrela, com tensão de fase de 120 V, alimenta uma carga desequilibrada também em estrela, com neutros interligados, composta por três resistores puramente resistivos: 20 Ω na fase A, 20 Ω na fase B e 10 Ω na fase C. A corrente no condutor de neutro vale:",
    alternativas: ["0 A", "2 A", "4 A", "6 A", "12 A"], respostaCorreta: 3,
    explicacao: "IA = 120/20 = 6∠0° A; IB = 6∠−120° A; IC = 12∠120° A. Somando os fasores: componente real = 6 + 6cos(−120°) + 12cos(120°) = 6 − 3 − 6 = −3; componente imaginária = 6sen(−120°)+12sen(120°) = −5,196+10,392 = 5,196. Módulo = √(3²+5,196²) = √36 = 6 A." },

  { id: "e43", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Um motor de indução trifásico de 8 polos é alimentado por uma rede de 50 Hz. A velocidade angular do campo girante, em rad/s, vale aproximadamente:",
    alternativas: ["31,4 rad/s", "52,4 rad/s", "62,8 rad/s", "78,5 rad/s", "104,7 rad/s"], respostaCorreta: 3,
    explicacao: "Ns = 120×f/p = 120×50/8 = 750 rpm. ω = 2π×Ns/60 = 2π×750/60 ≈ 78,5 rad/s." },

  { id: "e44", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Assinale a sequência CORRETA dos passos a seguir para a realização do ensaio de curto-circuito em um transformador monofásico, do primeiro ao último passo: I — Medir potência, tensão e corrente de curto-circuito. II — Alimentar o lado de alta tensão por uma fonte CA ajustável, partindo de 0 V. III — Elevar a tensão gradualmente até que a corrente no amperímetro atinja o valor nominal. IV — Curto-circuitar o lado de baixa tensão. V — Calcular os parâmetros do circuito equivalente série.",
    alternativas: ["I, II, III, IV, V", "IV, II, III, I, V", "II, IV, III, I, V", "IV, III, II, I, V", "II, III, IV, I, V"], respostaCorreta: 1,
    explicacao: "Primeiro curto-circuita-se o lado de BT (IV); em seguida, alimenta-se o lado de AT a partir de 0 V (II); eleva-se a tensão até a corrente nominal (III); medem-se os valores de ensaio (I); por fim, calculam-se os parâmetros do circuito equivalente (V)." },

  { id: "e45", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Uma carga de 150 kVA opera com fator de potência 0,7 indutivo. Deseja-se elevar o fator de potência para 0,95 indutivo por meio de um banco de capacitores em paralelo. Dados: para cosφ1 = 0,7, sen φ1 ≈ 0,714; para cosφ2 = 0,95, tg φ2 ≈ 0,329. A potência reativa do banco de capacitores necessária vale aproximadamente:",
    alternativas: ["34,5 kvar", "55,0 kvar", "72,6 kvar", "92,1 kvar", "107,1 kvar"], respostaCorreta: 2,
    explicacao: "P = S×cosφ1 = 150×0,7 = 105 kW. Q1 = S×senφ1 = 150×0,714 ≈ 107,1 kvar. Q2 = P×tgφ2 = 105×0,329 ≈ 34,5 kvar. Qc = Q1 − Q2 ≈ 107,1 − 34,5 ≈ 72,6 kvar." },

  { id: "e46", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "São condições necessárias para que dois geradores síncronos sejam conectados em paralelo a um mesmo barramento, alimentando a mesma carga, EXCETO:",
    alternativas: [
      "As tensões eficazes de linha dos dois geradores devem ser iguais.",
      "Os dois geradores devem ter a mesma sequência de fase.",
      "As frequências dos dois geradores devem ser iguais no instante do fechamento da chave de paralelismo.",
      "Os ângulos de fase das tensões dos dois geradores devem ser iguais no instante do paralelismo.",
      "A potência ativa fornecida pelos dois geradores deve ser obrigatoriamente idêntica antes do paralelismo.",
    ], respostaCorreta: 4,
    explicacao: "As condições clássicas de sincronismo são: tensões iguais, mesma sequência de fase, mesma frequência e ângulos de fase coincidentes no instante do fechamento. A potência ativa fornecida por cada gerador antes do paralelismo NÃO precisa ser igual — essa não é uma condição de sincronismo." },

  { id: "e47", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Sobre os transformadores para instrumentos (TCs e TPs), é correto afirmar que:",
    alternativas: [
      "O TC é projetado para operar normalmente com o secundário em circuito aberto, garantindo segurança ao operador.",
      "O TP reduz tensões elevadas para níveis compatíveis com instrumentos de medição e proteção, mantendo isolamento galvânico do circuito de alta tensão.",
      "O TC deve ter seu primário sempre em paralelo com a carga a ser medida.",
      "O TP é normalmente especificado por sua corrente nominal no primário, e não por sua tensão.",
      "Tanto o TC quanto o TP dispensam qualquer cuidado de segurança quando o secundário está aberto ou em curto.",
    ], respostaCorreta: 1,
    explicacao: "O transformador de potencial (TP) isola galvanicamente o circuito de medição da alta tensão do primário, reduzindo a tensão a um valor padronizado e seguro para os instrumentos. (Já o TC deve ter o secundário sempre em curto ou conectado a uma carga durante a operação, nunca aberto, pois isso gera sobretensões perigosas — o que torna as demais alternativas incorretas.)" },

  { id: "e48", inedita: true, areaGrande: "Eletrotécnica", assunto: "Grandezas elétricas e magnéticas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Sabendo que a carga elétrica é expressa, em unidades de base do SI, por A·s, e que a diferença de potencial é expressa por kg·m²·s⁻³·A⁻¹, a unidade da CAPACITÂNCIA, em termos de unidades de base do SI, é:",
    alternativas: ["kg·m²·s⁻³·A⁻²", "kg⁻¹·m⁻²·s⁴·A²", "kg⁻¹·m⁻²·s³·A²", "kg·m⁻²·s⁻³·A", "kg·m²·s⁻²·A⁻²"], respostaCorreta: 1,
    explicacao: "C = q/V. Substituindo as unidades: (A·s)/(kg·m²·s⁻³·A⁻¹) = A²·s⁴·kg⁻¹·m⁻², ou seja, kg⁻¹·m⁻²·s⁴·A²." },

  { id: "e49", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Uma sala de 6 m × 5 m precisa de iluminância média de 500 lux. Considerando fator de depreciação de 0,75, coeficiente de utilização de 0,6, e luminárias com 4 lâmpadas de 1.600 lúmens cada (6.400 lúmens por luminária), o número MÍNIMO de luminárias necessárias é:",
    alternativas: ["3", "4", "5", "6", "8"], respostaCorreta: 3,
    explicacao: "Fluxo total necessário = (E×A)/(Fd×Cu) = (500×30)/(0,75×0,6) = 15.000/0,45 ≈ 33.333 lm. Número de luminárias = 33.333/6.400 ≈ 5,2 → arredonda para 6 luminárias (sempre para cima, para garantir a iluminância mínima)." },

  { id: "e50", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Os motores de indução monofásicos, por não produzirem campo girante na partida (apenas campo pulsante), são classificados, entre outros critérios, pelo método utilizado para gerar o torque de partida. Esse critério de classificação é o de motores de:",
    alternativas: ["Escorregamento", "Comutação", "Partida", "Excitação composta", "Sincronismo"], respostaCorreta: 2,
    explicacao: "Como o motor monofásico não gera campo girante sozinho na partida, ele é classificado justamente pelo método de partida empregado (fase dividida, capacitor de partida, capacitor permanente, polos sombreados etc.)." },

  { id: "e51", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "A Lei de Ampère, expressa pela integral de linha do campo magnético H ao longo de um caminho fechado (∮H·dl), é equivalente:",
    alternativas: [
      "à energia armazenada no campo magnético dentro do caminho considerado.",
      "à corrente elétrica líquida envolvida pelo caminho fechado considerado.",
      "ao fluxo magnético total que atravessa a superfície delimitada pelo caminho.",
      "à força eletromotriz induzida no caminho fechado.",
      "à potência dissipada nos condutores que atravessam o caminho.",
    ], respostaCorreta: 1,
    explicacao: "A Lei de Ampère estabelece que a integral de linha de H em um caminho fechado é igual à corrente líquida (livre) envolvida por esse caminho: ∮H·dl = I." },

  { id: "e52", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Um motor de corrente contínua apresenta a seguinte característica: velocidade muito alta com carga leve e velocidade bastante reduzida quando submetido à carga máxima, desenvolvendo torque elevado nessa condição. Por essa característica, é frequentemente empregado em partidas com cargas pesadas, como guindastes e guinchos. Esse comportamento é típico do motor CC tipo:",
    alternativas: ["Em derivação (shunt)", "Composto cumulativo", "Série", "De imãs permanentes sem excitação", "Composto diferencial"], respostaCorreta: 2,
    explicacao: "O motor CC série tem fluxo de campo proporcional à corrente de armadura: em carga leve, baixa corrente reduz o fluxo e a velocidade dispara; em carga pesada, alta corrente produz fluxo elevado e torque elevado, à custa de baixa velocidade — por isso é indicado para partidas pesadas." },

  { id: "e53", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Um técnico, ao medir a corrente alternada de um equipamento sem interromper o circuito, enrolou o condutor 8 vezes na garra de um alicate amperímetro antes de fechá-la sobre o fio. O instrumento indicou uma leitura de 12 A. O valor real da corrente que alimenta o equipamento é de aproximadamente:",
    alternativas: ["1,5 A", "3,0 A", "6,0 A", "12,0 A", "96,0 A"], respostaCorreta: 0,
    explicacao: "Ao enrolar n voltas no condutor antes de fechar a garra, a leitura é multiplicada por n. Logo, a corrente real é I = Ilido/n = 12/8 = 1,5 A." },

  { id: "e54", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um sinal de tensão periódico, em forma de onda quadrada, alterna entre 20 V e 4 V, permanecendo o mesmo intervalo de tempo em cada nível. O valor eficaz (RMS) desse sinal vale aproximadamente:",
    alternativas: ["10,0 V", "12,0 V", "14,4 V", "16,0 V", "18,0 V"], respostaCorreta: 2,
    explicacao: "Para uma onda quadrada com dois níveis e mesma duração em cada um, Vrms = √[(V1²+V2²)/2] = √[(400+16)/2] = √208 ≈ 14,4 V." },

  { id: "e55", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Um transformador trifásico de 300 kVA, 13.800/220 V, apresenta impedância percentual de curto-circuito (Zcc%) igual a 5%. Considerando um curto-circuito franco no secundário, a corrente de curto-circuito no PRIMÁRIO vale aproximadamente:",
    alternativas: ["12,6 A", "125,6 A", "251,2 A", "502,5 A", "628,0 A"], respostaCorreta: 2,
    explicacao: "Corrente nominal no primário: In = S/(√3×V) = 300.000/(1,732×13.800) ≈ 12,56 A. Corrente de curto-circuito = In/Zcc% = 12,56/0,05 ≈ 251,2 A." },

  { id: "e56", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um transformador de 300 kVA apresenta perdas no núcleo (a vazio) de 1.000 W e perdas no cobre (a plena carga) de 3.000 W. Operando com fator de potência unitário, os rendimentos a plena carga e a 50% da carga valem, respectivamente, aproximadamente:",
    alternativas: ["96,9% e 97,4%", "97,8% e 98,1%", "98,7% e 98,9%", "99,1% e 99,3%", "99,5% e 99,7%"], respostaCorreta: 2,
    explicacao: "Plena carga: perdas totais = 1000+3000 = 4000 W. η = 300.000/304.000 ≈ 98,68%. A 50% de carga: perdas no cobre escalam com o quadrado da corrente: 3000×(0,5)² = 750 W; perdas totais = 1750 W; potência de saída = 150.000 W. η = 150.000/151.750 ≈ 98,85%." },

  { id: "e57", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Um transformador de corrente (TC) tem relação de transformação nominal de 200:5 A. Circulando uma corrente de 160 A no primário, a corrente indicada no secundário do TC vale:",
    alternativas: ["1,0 A", "2,0 A", "4,0 A", "5,0 A", "8,0 A"], respostaCorreta: 2,
    explicacao: "Relação de transformação 200:5 = 40:1. Corrente secundária = 160/40 = 4,0 A." },

  { id: "e58", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Em uma curva característica tempo×corrente de um disjuntor termomagnético, observa-se uma região de atuação com tempos relativamente longos (da ordem de segundos a minutos) para correntes pouco acima da nominal, e outra região de atuação quase instantânea (da ordem de milissegundos) para correntes muito elevadas. Essas regiões correspondem, respectivamente, à atuação dos dispositivos de proteção contra:",
    alternativas: [
      "curto-circuito e sobrecarga.",
      "sobrecarga e curto-circuito.",
      "sobretensão e subtensão.",
      "subtensão e sobretensão.",
      "sobrecarga e sobretensão.",
    ], respostaCorreta: 1,
    explicacao: "A região de atuação lenta, para correntes moderadamente acima da nominal, corresponde ao disparo térmico (sobrecarga); a região de atuação muito rápida, para correntes elevadas, corresponde ao disparo magnético (curto-circuito)." },

  { id: "e59", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Dois condutores retos, paralelos e longos, no ar, são percorridos por correntes de mesma intensidade e mesmo sentido, afastados 4 cm um do outro. No ponto situado exatamente no meio do caminho entre os dois condutores, o campo magnético resultante (soma vetorial dos campos gerados pelos dois condutores) é:",
    alternativas: ["Nulo, pois os campos se cancelam no ponto médio", "Igual ao campo de um único condutor", "O dobro do campo de um único condutor", "A metade do campo de um único condutor", "Indeterminado sem o valor da corrente"], respostaCorreta: 0,
    explicacao: "Para correntes de mesmo sentido, no ponto exatamente entre os dois condutores os campos gerados por cada um têm mesma intensidade, mas sentidos opostos (regra da mão direita aplicada a cada condutor), cancelando-se mutuamente: campo resultante nulo." },

  // ---------------------------------------------------------------------
  // PORTUGUÊS — lote adicional (texto original próprio, sem reprodução de
  // provas oficiais ou de obras literárias de terceiros)
  // ---------------------------------------------------------------------
  { id: "p7", inedita: true, areaGrande: "Português", assunto: "Figuras de linguagem", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Texto de referência: \"Há cinco anos o relógio do avô parou de funcionar, mas ninguém teve coragem de jogá-lo fora. Pendurado na parede da sala, ele observava silencioso as reuniões de família, como um velho sábio que já não precisa falar.\" — No trecho \"ele observava silencioso as reuniões de família, como um velho sábio que já não precisa falar\", identificam-se, respectivamente, as figuras de linguagem:",
    alternativas: ["Metáfora e hipérbole", "Comparação e metonímia", "Prosopopeia (personificação) e comparação", "Sinestesia e ironia", "Hipérbole e prosopopeia"], respostaCorreta: 2,
    explicacao: "Atribuir ao relógio a ação de \"observar\" (um verbo próprio de seres animados) é prosopopeia/personificação; já a comparação explícita, marcada pelo conectivo \"como\", entre o relógio e \"um velho sábio\", caracteriza o símile (comparação)." },

  { id: "p8", inedita: true, areaGrande: "Português", assunto: "Tempo verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Texto de referência: \"Quando finalmente decidimos consertá-lo, o relojoeiro sorriu e disse que, na verdade, o mecanismo gemia de cansaço há muito tempo, pedindo descanso.\" — O tempo e modo verbal da forma \"gemia\", nesse contexto, é:",
    alternativas: ["Pretérito perfeito do indicativo", "Pretérito imperfeito do indicativo", "Pretérito mais-que-perfeito do indicativo", "Futuro do pretérito do indicativo", "Presente do subjuntivo"], respostaCorreta: 1,
    explicacao: "\"Gemia\" expressa uma ação contínua e duradoura no passado (\"há muito tempo\"), sem indicar um ponto definido de início ou fim — característica clássica do pretérito imperfeito do indicativo." },

  { id: "p9", inedita: true, areaGrande: "Português", assunto: "Pronome relativo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",
    enunciado: "Na frase \"O relojoeiro, que trabalha há décadas no bairro, sorriu e disse que o mecanismo precisava de descanso\", o termo \"que\", em sua primeira ocorrência, funciona morfologicamente como pronome relativo e exerce, na oração que introduz, a função sintática de:",
    alternativas: ["Sujeito", "Objeto direto", "Objeto indireto", "Adjunto adverbial", "Complemento nominal"], respostaCorreta: 0,
    explicacao: "\"Que\" retoma \"o relojoeiro\" e é o sujeito do verbo \"trabalha\" na oração subordinada adjetiva \"que trabalha há décadas no bairro\"." },

  { id: "p10", inedita: true, areaGrande: "Português", assunto: "Regência verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Assinale a alternativa em que a regência verbal está de acordo com a norma-padrão:",
    alternativas: [
      "O relojoeiro assistiu o conserto do mecanismo com atenção redobrada.",
      "O relojoeiro assistiu ao conserto do mecanismo com atenção redobrada.",
      "A família aspirava ver o relógio funcionando novamente, e aspirou o cargo de guardiã da peça.",
      "Todos obedeceram às instruções do relojoeiro, mas o aparelho não obedeceu o comando.",
      "O técnico aspirou o cargo, mas não aspirou pela vitória.",
    ], respostaCorreta: 1,
    explicacao: "No sentido de \"ver/presenciar\", \"assistir\" é transitivo indireto e exige a preposição \"a\": \"assistiu AO conserto\". As demais alternativas misturam, de forma incorreta, os sentidos e regências de \"aspirar\" (desejar = transitivo indireto, com \"a\"; inspirar ar = transitivo direto) e de \"obedecer\" (sempre transitivo indireto, com \"a\")." },

  { id: "p11", inedita: true, areaGrande: "Português", assunto: "Pontuação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Assinale a frase corretamente pontuada quanto ao uso da vírgula:",
    alternativas: [
      "O relojoeiro, que trabalha há décadas no bairro, sorriu ao ver a peça.",
      "O relojoeiro que trabalha, há décadas no bairro sorriu, ao ver a peça.",
      "O relojoeiro, que trabalha há décadas, no bairro sorriu ao ver, a peça.",
      "O relojoeiro que, trabalha há décadas no bairro sorriu ao ver a peça.",
      "O relojoeiro que trabalha há décadas no bairro, sorriu, ao ver, a peça.",
    ], respostaCorreta: 0,
    explicacao: "A oração adjetiva explicativa \"que trabalha há décadas no bairro\" deve ser isolada por vírgulas, pois acrescenta uma informação não essencial à identificação do sujeito \"o relojoeiro\"." },

  { id: "p12", inedita: true, areaGrande: "Português", assunto: "Antonímia e sinonímia", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "Assinale a alternativa que apresenta um par de termos ANTÔNIMOS:",
    alternativas: ["Restaurado, renovado", "Silencioso, calado", "Cansaço, fadiga", "Descanso, labor", "Curioso, indagador"], respostaCorreta: 3,
    explicacao: "\"Descanso\" (repouso, ausência de atividade) e \"labor\" (trabalho, esforço) são termos de sentido oposto — um par de antônimos. Os demais pares são formados por sinônimos ou quase-sinônimos." },

  // ---------------------------------------------------------------------
  // LEGISLAÇÃO APLICADA À ADMINISTRAÇÃO PÚBLICA — questões originais
  // sobre o conteúdo de leis e normas de domínio público (Lei 8.429/1992,
  // Lei 8.112/1990, Lei 9.784/1999, Constituição Federal de 1988)
  // ---------------------------------------------------------------------
  { id: "leg1", inedita: true, areaGrande: "Legislação", assunto: "Lei de Improbidade Administrativa", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "De acordo com a Lei nº 8.429/1992 (Lei de Improbidade Administrativa), constitui ato de improbidade administrativa que atenta contra os princípios da administração pública qualquer ação ou omissão que viole os deveres de honestidade, imparcialidade, legalidade e lealdade às instituições. Configura, EXCETO, uma dessas violações:",
    alternativas: [
      "Revelar fato de que o agente público tem ciência em razão do cargo e que deva permanecer em segredo.",
      "Frustrar a licitude de processo licitatório ou de concurso público.",
      "Praticar ato visando a fim diverso daquele previsto na regra de competência.",
      "Exercer as atribuições do cargo com zelo, eficiência e dentro dos prazos regulamentares estabelecidos.",
      "Permitir que terceiro tome conhecimento, antes da divulgação oficial, de medida econômica capaz de afetar o preço de determinada mercadoria.",
    ], respostaCorreta: 3,
    explicacao: "Exercer as atribuições do cargo com zelo, eficiência e dentro dos prazos é, justamente, o comportamento esperado e desejável do agente público — o oposto de um ato de improbidade. As demais alternativas descrevem condutas típicas de violação aos princípios da administração pública previstas na Lei 8.429/1992." },

  { id: "leg2", inedita: true, areaGrande: "Legislação", assunto: "Regime Jurídico Único", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Segundo a Lei nº 8.112/1990, que dispõe sobre o regime jurídico dos servidores públicos civis da União, das autarquias e das fundações públicas federais, é correto afirmar que:",
    alternativas: [
      "O vencimento do cargo efetivo pode ser livremente reduzido por ato do superior hierárquico.",
      "Remuneração é, exclusivamente, o vencimento básico do cargo, sem qualquer vantagem adicional.",
      "É assegurada a isonomia de vencimentos para cargos de atribuições iguais ou assemelhadas do mesmo Poder, ressalvadas vantagens de caráter individual e as relativas à natureza ou ao local de trabalho.",
      "O vencimento, a remuneração e o provento podem ser livremente objeto de arresto, sequestro ou penhora, independentemente da natureza da dívida.",
      "O servidor em débito com o erário jamais poderá ter seu débito inscrito em dívida ativa.",
    ], respostaCorreta: 2,
    explicacao: "A Lei 8.112/1990 assegura a isonomia de vencimentos entre cargos de atribuições iguais ou assemelhadas do mesmo Poder, ressalvando as vantagens de caráter individual e as relativas à natureza ou ao local de trabalho. O vencimento é, em regra, irredutível, e via de regra não pode ser objeto de arresto, sequestro ou penhora, salvo exceções legais." },

  { id: "leg3", inedita: true, areaGrande: "Legislação", assunto: "Ética no Serviço Público", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "O Código de Ética dos Servidores Públicos estabelece deveres fundamentais a serem observados no exercício da função pública. Assinale a alternativa que descreve corretamente um desses deveres:",
    alternativas: [
      "Resolver, sempre que possível, as situações que exijam decisão de forma morosa, evitando comprometer-se com prazos.",
      "Ser probo, reto, leal e justo, demonstrando integridade de caráter, optando sempre pela solução mais vantajosa para o bem comum, quando diante de duas opções.",
      "Respeitar a hierarquia, mas evitar denunciar qualquer comprometimento da estrutura do Poder Estatal, ainda que identificado.",
      "Tratar os usuários do serviço público com cortesia apenas quando convier ao próprio servidor.",
      "Submeter-se a pressões de superiores hierárquicos que visem obter vantagens indevidas, sem necessidade de denunciá-las.",
    ], respostaCorreta: 1,
    explicacao: "O dever de probidade — ser probo, reto, leal e justo — é um dos pilares do Código de Ética do Servidor Público, que orienta a escolha pela solução mais vantajosa ao bem comum diante de opções concorrentes. As demais alternativas descrevem condutas contrárias aos deveres éticos esperados." },

  { id: "leg4", inedita: true, areaGrande: "Legislação", assunto: "Processo Administrativo", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Em relação ao processo administrativo, regido pela Lei nº 9.784/1999, é correto afirmar que:",
    alternativas: [
      "O processo administrativo somente pode ser iniciado a pedido de interessado, nunca de ofício.",
      "É permitida à Administração a recusa imotivada de recebimento de documentos.",
      "Quando pedidos de uma pluralidade de interessados tiverem conteúdo e fundamentos idênticos, poderão ser formulados em um único requerimento, salvo preceito legal em contrário.",
      "O requerimento inicial do interessado deve, obrigatoriamente e sem exceção, ser formulado por escrito.",
      "Os órgãos administrativos estão dispensados de elaborar modelos ou formulários padronizados para situações que importem pretensões equivalentes.",
    ], respostaCorreta: 2,
    explicacao: "A Lei 9.784/1999 permite que pedidos de múltiplos interessados, com conteúdo e fundamentos idênticos, sejam reunidos em um único requerimento, salvo se a lei dispuser de forma diversa — medida de economia processual. O processo administrativo pode iniciar-se de ofício ou a pedido; a recusa de documentos deve ser motivada; e o requerimento pode, em certos casos, ser formulado oralmente, sendo reduzido a termo." },

  { id: "leg5", inedita: true, areaGrande: "Legislação", assunto: "Direitos Fundamentais", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Nos termos da Constituição Federal de 1988, sobre os direitos e garantias fundamentais, é correto afirmar que:",
    alternativas: [
      "É livre a manifestação do pensamento, sendo permitido o anonimato.",
      "A criação de associações e, na forma da lei, a de cooperativas independem de autorização, sendo vedada a interferência estatal no seu funcionamento.",
      "É plena a liberdade de associação para fins lícitos, inclusive de caráter paramilitar.",
      "Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de qualquer aviso prévio à autoridade competente.",
      "A lei assegura aos autores de inventos industriais privilégio permanente para sua utilização.",
    ], respostaCorreta: 1,
    explicacao: "O art. 5º, XVIII, da CF/1988 estabelece que a criação de associações e cooperativas independe de autorização, sendo vedada a interferência estatal em seu funcionamento. A manifestação do pensamento é livre, mas o anonimato é vedado; a liberdade de associação não admite fins paramilitares; o direito de reunião exige aviso prévio à autoridade; e a proteção a inventos industriais é temporária, não permanente." },

  { id: "leg6", inedita: true, areaGrande: "Legislação", assunto: "Direitos Sociais", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Considerando os direitos sociais previstos na Constituição Federal de 1988, é correto afirmar que:",
    alternativas: [
      "São proibidos o trabalho noturno, perigoso ou insalubre a menores de dezesseis anos e qualquer trabalho a menores de quatorze anos, salvo na condição de aprendiz.",
      "O aposentado filiado a sindicato não tem direito a votar e ser votado nas organizações sindicais.",
      "É direito do trabalhador o repouso semanal remunerado, sem preferência quanto ao dia de sua concessão.",
      "É livre a associação profissional ou sindical, cabendo ao sindicato a defesa dos direitos da categoria exclusivamente em questões administrativas.",
      "A retenção dolosa do salário do trabalhador não constitui crime, apenas infração administrativa.",
    ], respostaCorreta: 0,
    explicacao: "O art. 7º, XXXIII, da CF/1988 proíbe trabalho noturno, perigoso ou insalubre a menores de 16 anos e qualquer trabalho a menores de 14 anos, salvo na condição de aprendiz. As demais alternativas contrariam o texto constitucional: o aposentado filiado tem direito a votar e ser votado; há preferência pelo domingo no repouso semanal; a atuação sindical não se limita a questões administrativas; e a retenção dolosa de salário constitui crime." },

  // ---------------------------------------------------------------------
  // INFORMÁTICA — lote adicional
  // ---------------------------------------------------------------------
  { id: "i5", inedita: true, areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",
    enunciado: "Softwares podem ser classificados em Software Básico (sistema operacional), Software Aplicativo (editores de texto, planilhas) e Software Utilitário (ferramentas de suporte, como antivírus e compactadores). Dentre os itens a seguir, é classificado como Software UTILITÁRIO:",
    alternativas: ["Microsoft Word", "Microsoft Windows", "Adobe Photoshop", "Um programa antivírus", "Um navegador de internet"], respostaCorreta: 3,
    explicacao: "Um antivírus é uma ferramenta de suporte/manutenção do sistema, classificada como software utilitário — diferente de aplicativos voltados à produção de conteúdo (Word, Photoshop) ou do sistema operacional (Windows)." },

  { id: "i6", inedita: true, areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",
    enunciado: "Em uma planilha eletrônica, a célula A1 contém o valor 50 e a célula A2 contém o valor 30. Ao digitar na célula A3 a fórmula =SE(A1>A2;\"Maior\";\"Menor\"), o resultado exibido em A3 será:",
    alternativas: ["50", "30", "Maior", "Menor", "Um erro de fórmula"], respostaCorreta: 2,
    explicacao: "A função SE testa a condição A1>A2 (50>30, verdadeira) e retorna o valor do segundo argumento (\"Maior\") quando a condição é verdadeira." },

  { id: "i7", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Sobre ameaças e ataques virtuais, assinale a alternativa que descreve corretamente o conceito de Phishing:",
    alternativas: [
      "Programa que monitora as atividades de um sistema e envia as informações coletadas a terceiros, podendo ter uso legítimo ou malicioso.",
      "Método de envio de mensagens eletrônicas que tenta se passar por comunicação oficial de uma instituição confiável, buscando induzir o usuário a fornecer dados sigilosos ou clicar em links maliciosos.",
      "Programa que se propaga inserindo cópias de si mesmo, tornando-se parte de outros programas e arquivos.",
      "Software projetado especificamente para sequestrar arquivos e exigir pagamento de resgate para sua liberação.",
      "Técnica de sobrecarga de um servidor por meio de múltiplas requisições simultâneas, tornando-o indisponível.",
    ], respostaCorreta: 1,
    explicacao: "Phishing é a técnica de engenharia social em que o atacante se disfarça de fonte confiável (banco, empresa, site popular) para induzir a vítima a revelar dados sigilosos ou a clicar em links/anexos maliciosos." },

  { id: "i8", inedita: true, areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",
    enunciado: "No editor de texto Microsoft Word (versão 2016, em português), a combinação de teclas CTRL+SHIFT+seta para a direita tem como finalidade:",
    alternativas: [
      "Mover o cursor para o final da linha.",
      "Selecionar uma palavra inteira por vez, na direção da seta.",
      "Mover o cursor para o final do documento.",
      "Alternar entre maiúsculas e minúsculas no texto selecionado.",
      "Inserir uma quebra de página.",
    ], respostaCorreta: 1,
    explicacao: "No Word, CTRL+seta move o cursor palavra a palavra; ao adicionar SHIFT, a seleção de texto acompanha esse deslocamento — ou seja, seleciona uma palavra inteira por vez na direção indicada." },

  { id: "i9", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",
    enunciado: "Um usuário digita, na barra de endereços de um navegador, o endereço de um site (exemplo.com.br) e o navegador exibe a página corretamente, embora a comunicação na internet ocorra por meio de endereços IP. O protocolo/sistema responsável por essa tradução de nome de domínio para endereço IP é:",
    alternativas: ["DHCP", "DNS", "FTP", "SMTP", "HTTP"], respostaCorreta: 1,
    explicacao: "O DNS (Domain Name System) é o sistema responsável por traduzir nomes de domínio legíveis por humanos em endereços IP utilizados pelos computadores na comunicação em rede." },

  { id: "i10", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um programa malicioso instalado em um computador passa a monitorar as teclas digitadas pelo usuário, registrando senhas e dados sigilosos para envio posterior a terceiros, sem o conhecimento da vítima. Esse tipo específico de programa malicioso é conhecido como:",
    alternativas: ["Worm", "Keylogger", "Trojan horse genérico", "Adware", "Rootkit"], respostaCorreta: 1,
    explicacao: "O Keylogger é o tipo de malware especializado em capturar e registrar as teclas digitadas pelo usuário, sendo frequentemente usado para roubo de senhas e dados sigilosos." },
];

export const QUESTOES: Questao[] = QUESTOES_BASE.map((q) => ({ ...q, bloco: bloco(q.assunto), inedita: q.inedita ?? false }));

export const AREAS_GRANDES: AreaGrande[] = ["Português", "Matemática/Raciocínio Lógico", "Informática", "Eletrotécnica", "Legislação"];
export const DIFICULDADES: Dificuldade[] = ["Fácil", "Médio", "Difícil"];

export function bancasDisponiveis(): string[] {
  return Array.from(new Set(QUESTOES.map((q) => q.banca)));
}

export function anosDisponiveis(): number[] {
  return Array.from(new Set(QUESTOES.map((q) => q.ano))).sort((a, b) => b - a);
}

export function assuntosDisponiveis(areaGrande?: AreaGrande): string[] {
  const filtradas = areaGrande ? QUESTOES.filter((q) => q.areaGrande === areaGrande) : QUESTOES;
  return Array.from(new Set(filtradas.map((q) => q.assunto)));
}
