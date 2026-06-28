// Banco de questões — questões de prática ORIGINAIS, escritas no estilo e
// nível dos concursos técnicos Petrobras (banca CESGRANRIO), cobrindo o
// formato real do edital: Conhecimentos Básicos (Português, Matemática/
// Raciocínio Lógico) + Conhecimentos Específicos (Eletrotécnica).
//
// IMPORTANTE: estas NÃO são questões reproduzidas de provas reais (questões
// de banca têm direitos autorais da organizadora) — são questões de prática
// inéditas, no mesmo padrão e dificuldade. Quando houver acesso a um banco de
// questões licenciado ou provas oficiais liberadas, substituímos por elas.

export type AreaGrande = "Português" | "Matemática/Raciocínio Lógico" | "Informática" | "Eletrotécnica";
export type Dificuldade = "Fácil" | "Médio" | "Difícil";

export interface Questao {
  id: string;
  areaGrande: AreaGrande;
  assunto: string;
  banca: string;
  ano: number;
  dificuldade: Dificuldade;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  diagrama?: "resistores-serie" | "resistores-paralelo" | "divisor-tensao" | "transformador" | "wattimetros" | "estrela-triangulo" | "curva-disjuntor";
}

export const QUESTOES: Questao[] = [
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
    explicacao: "Req = (8×12)/(8+12) = 96/20 = 4,8 Ω." , diagrama: "resistores-paralelo" },
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
    explicacao: "Relação 10:1 significa que o secundário tem 1/10 da tensão do primário: 2200/10 = 220 V." , diagrama: "transformador" },
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
    explicacao: "V_R2 = R2/(R1+R2) × V = 3R1/(R1+3R1) × V = 3/4 × V — afirmativa correta." , diagrama: "divisor-tensao" },
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
    explicacao: "Na ligação estrela, a corrente de linha é igual à corrente de fase (diferente da ligação triângulo, onde a tensão de linha é igual à de fase)." , diagrama: "estrela-triangulo" },
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
    explicacao: "Relação de espiras 400:100 = 4:1. A corrente se relaciona de forma inversa à tensão: I1/I2 = N2/N1 = 1/4. Logo I1 = I2/4 = 3/4 = 0,75 A — afirmativa CORRETA." , diagrama: "transformador" },
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
    explicacao: "A potência ativa total é a soma das duas leituras (independente do sinal de cada uma): 900 + 500 = 1.400 W — afirmativa correta." , diagrama: "wattimetros" },
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
    explicacao: "Partida direta: 120×6 = 720 A. Estrela-triângulo: a corrente de linha em estrela é 1/3 da corrente em triângulo: 720/3 = 240 A — afirmativa correta." , diagrama: "estrela-triangulo" },
  { id: "n5", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",
    enunciado: "Um transformador ideal com relação de espiras 20:1 tem, no primário, tensão de 4.400 V e corrente de 8 A. A potência aparente desse transformador é igual a 35,2 kVA, e a corrente no secundário é de 160 A.",
    alternativas: ["Certo", "Errado"], respostaCorreta: 0,
    explicacao: "S = V1×I1 = 4400×8 = 35.200 VA = 35,2 kVA. Pela relação de transformação, I2 = I1×(N1/N2) = 8×20 = 160 A — afirmativa correta." , diagrama: "transformador" },
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
    explicacao: "A seletividade depende da relação específica entre as curvas dos dois disjuntores em cada faixa de corrente — não é uma garantia automática e universal; em algumas faixas de corrente elevada, as curvas podem se sobrepor, comprometendo a seletividade. Afirmativa ERRADA (generalização indevida)." , diagrama: "curva-disjuntor" },
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
];

export const AREAS_GRANDES: AreaGrande[] = ["Português", "Matemática/Raciocínio Lógico", "Informática", "Eletrotécnica"];
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
