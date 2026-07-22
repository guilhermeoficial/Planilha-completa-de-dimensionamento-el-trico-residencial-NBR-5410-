// Banco de questões — questões de prática ORIGINAIS, escritas no estilo e

// nível dos concursos técnicos Petrobras (banca CESGRANRIO), cobrindo o

// formato real do edital: Conhecimentos Básicos (Português, Matemática/

// Raciocínio Lógico) + Conhecimentos Específicos (Eletrotécnica).

//

// IMPORTANTE: estas NÃO são questões reproduzidas de provas reais (questões

// de banca têm direitos autorais da organizadora) — são questões de prática

// inéditas, no mesmo padrão e dificuldade. Quando houver acesso a um banco de

// questões licenciado ou provas oficiais liberadas, substituímos por elas.



export type AreaGrande = "Português" | "Matemática/Raciocínio Lógico" | "Informática" | "Eletrotécnica" | "Legislação" | "Eletrônica" | "Telecomunicações";

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



// eslint-disable-next-line @typescript-eslint/no-explicit-any

const QUESTOES_BASE: any[] = [

  // ---------------------------------------------------------------------

  // PORTUGUÊS

  // ---------------------------------------------------------------------

  { id: "p1", areaGrande: "Português", assunto: "Interpretação de texto", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Em 'O técnico, embora cansado, concluiu o relatório antes do prazo', a palavra 'embora' estabelece relação de:",

    alternativas: ["Causa", "Concessão", "Conclusão", "Condição"], respostaCorreta: 1,

    explicacao: "Questao de **interpretacao de texto**: identificar ideia principal, distinguir fatos de opiniao, reconhecer tema central, inferir sentidos implicitos. Nas provas CEBRASPE/FCC, a alternativa correta parafraseia fielmente o texto, sem distorcoes ou adicao de informacoes que nao constam no original." },
  { id: "p2", areaGrande: "Português", assunto: "Concordância verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Assinale a alternativa em que a concordância verbal está correta:",

    alternativas: ["Fazem dois anos que ele trabalha na planta.", "Faz dois anos que ele trabalha na planta.", "Faziam dois anos que ele trabalhava.", "Fazem dois ano que ele trabalha."], respostaCorreta: 1,

    explicacao: "Em expressoes de **tempo transcorrido**, o verbo 'fazer' e **impessoal** (3a pessoa do singular, sem sujeito): 'Faz dois anos que nao te vejo.' Mesmo com sujeito plural: 'Faz tres dias que os documentos chegaram' (correto). Erro comum: 'Fazem dois anos...' — incorreto, pois 'fazer' impessoal nao tem plural." },
  { id: "p3", areaGrande: "Português", assunto: "Crase", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Assinale a frase com o emprego correto da crase:",

    alternativas: ["Entreguei o relatório à diretoria.", "Entreguei o relatório a diretoria.", "Cheguei a hora prevista.", "Refiro-me à ele com respeito."], respostaCorreta: 0,

    explicacao: "O sinal de **crase** indica a fusao da preposicao 'a' com o artigo feminino 'a(s)'. Usa-se antes de substantivos femininos determinados: 'Fui **a** diretoria.' Nao se usa crase antes de: nomes masculinos, verbos, pronomes pessoais, nomes proprios masculinos, nem diante de palavras no plural sem artigo." },
  { id: "p4", areaGrande: "Português", assunto: "Regência verbal", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Assinale a alternativa em que a regência verbal está de acordo com a norma-padrão:",

    alternativas: ["Assisti o filme ontem.", "Assisti ao filme ontem.", "Obedeço o regulamento.", "Aspiro o cargo de supervisor (no sentido de desejar)."], respostaCorreta: 1,

    explicacao: "O verbo 'assistir' no sentido de **ver/presenciar** e **transitivo indireto**, exigindo a preposicao 'a': 'Assistiu **ao** acidente.' No sentido de ajudar: tambem transitivo indireto. No sentido de caber/pertencer: 'Assiste **ao** reu o direito de defesa.' Em todos os sentidos tecnicos, exige preposicao 'a'." },
  { id: "p5", areaGrande: "Português", assunto: "Pontuação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "Assinale a frase corretamente pontuada:",

    alternativas: ["O técnico, responsável pela manutenção, chegou atrasado.", "O técnico responsável, pela manutenção chegou atrasado.", "O técnico responsável pela manutenção, chegou, atrasado.", "O técnico, responsável, pela manutenção chegou, atrasado."], respostaCorreta: 0,

    explicacao: "**Aposto explicativo**: separado por virgulas, entre virgulas ou entre travessoes. Pode ser retirado sem alterar o sentido essencial. 'O engenheiro, **responsavel pela manutencao**, revisou o painel.' **Aposto restritivo**: identifica/delimita um subconjunto — sem virgulas: 'O tecnico **Joao** revisou o painel.'" },
  { id: "p6", areaGrande: "Português", assunto: "Tipologia textual", banca: "CESGRANRIO (estilo)", ano: 2021, dificuldade: "Fácil",

    enunciado: "Um manual de instruções de operação de um equipamento é predominantemente do tipo textual:",

    alternativas: ["Narrativo", "Descritivo", "Injuntivo (instrucional)", "Dissertativo-argumentativo"], respostaCorreta: 2,

    explicacao: "Texto **injuntivo** (instrucional/prescritivo): orienta, instrui, prescreve acoes. Caracteristicas: verbos no imperativo ou infinitivo, linguagem direta e objetiva, sequencia logica de passos. Exemplos: manuais, receitas, bulas, regulamentos. Diferente do dissertativo (argumenta) ou narrativo (conta fatos)." }


  // ---------------------------------------------------------------------

  // MATEMÁTICA / RACIOCÍNIO LÓGICO

  // ---------------------------------------------------------------------

  { id: "m1", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Porcentagem", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Um equipamento de R$ 8.000,00 recebeu um desconto de 15%. Qual o valor final pago?",

    alternativas: ["R$ 6.800,00", "R$ 6.200,00", "R$ 7.200,00", "R$ 6.000,00"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "m2", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Regra de três", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "Se 5 técnicos concluem uma instalação em 12 dias, quantos dias levariam 6 técnicos, mantendo o mesmo ritmo de trabalho?",

    alternativas: ["10 dias", "14 dias", "12 dias", "15 dias"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "m3", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Análise combinatória", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "De quantas formas distintas 3 técnicos podem ser escolhidos, dentre 7 disponíveis, para compor uma equipe (sem considerar a ordem)?",

    alternativas: ["21", "35", "42", "210"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "m4", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Lógica proposicional", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Considere a proposição: 'Se o disjuntor está desarmado, então há sobrecarga'. A negação lógica dessa afirmação equivale a:",

    alternativas: ["O disjuntor não está desarmado e não há sobrecarga.", "O disjuntor está desarmado e não há sobrecarga.", "Se há sobrecarga, o disjuntor está desarmado.", "O disjuntor não está desarmado ou há sobrecarga."], respostaCorreta: 1,

    explicacao: "Negacao da condicional: $$\neg(P \Rightarrow Q) \equiv P \land \neg Q$$. A implicacao e falsa **somente** quando o antecedente P e verdadeiro e o consequente Q e falso. Negar "Se o disjuntor esta armado (P) entao ha sobrecarga (Q)": resulta em "Disjuntor esta armado E nao ha sobrecarga" — P verdadeiro com Q falso.",

  { id: "m5", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Juros simples", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um capital de R$ 4.000,00 é aplicado a juros simples de 2% ao mês. Qual o montante após 5 meses?",

    alternativas: ["R$ 4.400,00", "R$ 4.200,00", "R$ 4.420,00", "R$ 4.040,00"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "m6", areaGrande: "Matemática/Raciocínio Lógico", assunto: "Conversão de unidades", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Um cabo tem 2.350 mm de comprimento. Isso corresponde a:",

    alternativas: ["2,35 m", "23,5 m", "0,235 m", "235 m"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ---------------------------------------------------------------------

  // INFORMÁTICA

  // ---------------------------------------------------------------------

  { id: "ic1", areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "No contexto de armazenamento de dados, 1 GB (gigabyte) corresponde, na convenção binária mais usual, a:",

    alternativas: ["1.000 MB", "1.024 MB", "1.000.000 KB", "100 MB"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ic2", areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Em uma planilha eletrônica, a fórmula =SOMA(A1:A10) realiza:",

    alternativas: ["A soma dos valores de A1 até A10", "A média dos valores de A1 e A10", "A contagem de células preenchidas entre A1 e A10", "A multiplicação de A1 por A10"], respostaCorreta: 0,

    explicacao: "=SOMA(A1:A10) realiza a **soma** de todos os valores numericos no intervalo de A1 ate A10. Operador : (dois pontos) define um intervalo contiguo. NAO confundir: =MEDIA() calcula media; =CONT.VALORES() conta celulas nao vazias; =PRODUTO() multiplica. Todas as formulas Excel comecam com = (sinal de igual)." },
  { id: "ic3", areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Um e-mail suspeito solicitando dados bancários, fingindo ser de uma instituição confiável, caracteriza um ataque de:",

    alternativas: ["Phishing", "Ransomware", "Brute force", "Spoofing de IP"], respostaCorreta: 0,

    explicacao: "**Phishing** e engenharia social via mensagem eletronica: o atacante se passa por entidade confiavel (banco, governo) para roubar credenciais ou dados financeiros. Sinais: remetente com dominio suspeito, urgencia artificial, links com erros no dominio. Nunca clicar em links suspeitos." },
  { id: "ic4", areaGrande: "Informática", assunto: "Redes de computadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "O protocolo responsável por traduzir nomes de domínio (como exemplo.com.br) em endereços IP é o:",

    alternativas: ["DHCP", "DNS", "FTP", "SMTP"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes de dominio legiveis (www.exemplo.com.br) em enderecos IP numericos. Funciona como a lista telefonica da Internet. Sem DNS, seria necessario memorizar IPs para cada site. DNS opera na porta 53 UDP/TCP." }


  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Circuitos CC

  // ---------------------------------------------------------------------

  { id: "e1", areaGrande: "Eletrotécnica", assunto: "Lei de Ohm", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Um resistor de 15Ω é percorrido por uma corrente de 4A. A tensão sobre o resistor é:",

    alternativas: ["60 V", "3,75 V", "19 V", "11 V"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e2", areaGrande: "Eletrotécnica", assunto: "Associação de resistores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Dois resistores de 8Ω e 12Ω são associados em paralelo. A resistência equivalente é, aproximadamente:",

    alternativas: ["4,8 Ω", "10 Ω", "20 Ω", "6 Ω"], respostaCorreta: 0,

    explicacao: "Para dois resistores em paralelo: $$R_{eq} = \dfrac{R_1 \cdot R_2}{R_1 + R_2} = \dfrac{8 \times 12}{8 + 12} = \dfrac{96}{20} = 4,8\text{ Ω}$$" , temImagem: true },

  { id: 'e3', areaGrande: 'Eletrotécnica', assunto: 'Potência elétrica', banca: 'CESGRANRIO (estilo)', ano: 2024, dificuldade: 'Fácil',

    enunciado: 'Um chuveiro elétrico de 5500 W opera em uma rede de 220 V. A corrente elétrica consumida é, aproximadamente:',

    alternativas: ['25 A', '12,5 A', '50 A', '2,5 A'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e4", areaGrande: "Eletrotécnica", assunto: "Energia elétrica", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Uma carga de 2 kW permanece ligada por 3 horas diárias, durante 30 dias. O consumo de energia no mês é:",

    alternativas: ["180 kWh", "60 kWh", "90 kWh", "360 kWh"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e5", areaGrande: "Eletrotécnica", assunto: "Leis de Kirchhoff", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "A Lei de Kirchhoff das correntes (Lei dos Nós) estabelece que, em qualquer nó de um circuito:",

    alternativas: ["A soma das correntes que entram é igual à soma das que saem.", "A soma das tensões é sempre zero.", "A corrente é proporcional à resistência.", "A potência dissipada é constante."], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e6", areaGrande: "Eletrotécnica", assunto: "Corrente alternada", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A frequência da rede elétrica no Brasil é de 60 Hz. Isso significa que a tensão alternada completa, por segundo:",

    alternativas: ["60 ciclos completos", "60 picos de tensão", "30 ciclos completos", "120 inversões de polaridade por minuto"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e7", areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um motor opera com fator de potência 0,8 indutivo. Isso indica que:",

    alternativas: ["A corrente está atrasada em relação à tensão.", "A corrente está adiantada em relação à tensão.", "Não há defasagem entre tensão e corrente.", "A potência reativa é nula."], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e8", areaGrande: "Eletrotécnica", assunto: "Potência em CA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um circuito de corrente alternada, a potência ativa (P), reativa (Q) e aparente (S) se relacionam por:",

    alternativas: ["S² = P² + Q²", "S = P + Q", "P = S + Q", "Q² = P + S"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e9", areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Em um sistema trifásico equilibrado em estrela, a relação entre tensão de linha (VL) e tensão de fase (VF) é:",

    alternativas: ["VL = √3 × VF", "VL = VF", "VL = 3 × VF", "VL = VF/√3"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Magnetismo / Eletromagnetismo

  // ---------------------------------------------------------------------

  { id: "e10", areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "O princípio físico segundo o qual um condutor percorrido por corrente elétrica gera um campo magnético ao seu redor é conhecido como:",

    alternativas: ["Lei de Ampère / Oersted", "Lei de Coulomb", "Lei de Ohm", "Efeito Joule"], respostaCorreta: 0,

    explicacao: "O eletromagnetismo foi descoberto por Oersted (1820): fio com corrente deflecte agulha magnetica. A Lei de Ampere: $$\oint \vec{H} \cdot d\vec{l} = \sum I_{enc}$$. Base do funcionamento de transformadores, motores e geradores." },

  { id: "e11", areaGrande: "Eletrotécnica", assunto: "Indução eletromagnética", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "A Lei de Faraday estabelece que a força eletromotriz induzida em um circuito é proporcional:",

    alternativas: ["À taxa de variação do fluxo magnético.", "À resistência do circuito.", "À temperatura do condutor.", "Ao comprimento do condutor apenas."], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Motores e Transformadores

  // ---------------------------------------------------------------------

  { id: "e12", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A principal vantagem da partida estrela-triângulo em motores trifásicos é:",

    alternativas: ["Reduzir a corrente de partida.", "Aumentar o torque de partida.", "Eliminar a necessidade de proteção térmica.", "Aumentar a velocidade nominal do motor."], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e13", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "O escorregamento (slip) de um motor de indução trifásico é definido como:",

    alternativas: ["A diferença relativa entre a velocidade síncrona e a velocidade do rotor.", "A relação entre tensão e corrente nominal.", "A diferença entre potência ativa e reativa.", "A razão entre o número de polos e a frequência."], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e14", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "Um transformador ideal tem relação de transformação 10:1 (primário:secundário). Se a tensão no primário é 2200V, a tensão no secundário é:",

    alternativas: ["220 V", "2200 V", "22000 V", "110 V"], respostaCorreta: 0,

    explicacao: "Pela relação de transformação: $$a = \dfrac{N_1}{N_2} = \dfrac{V_1}{V_2} = 10 \quad \Rightarrow \quad V_2 = \dfrac{V_1}{a} = \dfrac{2200}{10} = 220\text{ V}$$" , temImagem: true },

  { id: 'e15', areaGrande: 'Eletrotécnica', assunto: 'Transformadores', banca: 'CESGRANRIO (estilo)', ano: 2024, dificuldade: 'Difícil',

    enunciado: 'As perdas em um transformador que ocorrem no núcleo, independentemente da carga, são chamadas de:',

    alternativas: ['Perdas no ferro (ou perdas em vazio)', 'Perdas no cobre', 'Perdas por efeito Joule no enrolamento', 'Perdas por atrito'], respostaCorreta: 0,

    explicacao: "Perdas no ferro (nucleo): (1) Histerese: $$P_h = k_h f B_{max}^{1{,}6}$$ — reorientacao dos dominios magneticos. (2) Correntes parasitas (Foucault): $$P_e = k_e f^2 B_{max}^2$$ — correntes induzidas nas laminas. Por isso nucleos sao laminados (aco-silicio). Sao constantes e independem da carga — dependem da tensao aplicada." }


  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Instalações e NBR 5410

  // ---------------------------------------------------------------------

  { id: "e16", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Segundo a NBR 5410, a seção mínima de condutor para circuitos de iluminação em instalações residenciais é:",

    alternativas: ["1,5 mm²", "0,5 mm²", "2,5 mm²", "4 mm²"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e17", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "O limite usual de queda de tensão admitido em circuitos terminais de instalações de baixa tensão é de:",

    alternativas: ["4%", "1%", "10%", "0,5%"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e18", areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Médio",

    enunciado: "O dispositivo cuja principal função é proteger pessoas contra choques elétricos por contato indireto é o:",

    alternativas: ["DR (dispositivo residual / interruptor diferencial)", "Disjuntor termomagnético comum", "Fusível NH", "Contator"], respostaCorreta: 0,

    explicacao: "IDR compara $$I_{fase}$$ e $$I_{neutro}$$. Se $$|I_{fase} - I_{neutro}| \geq \Delta I_{limiar}$$, o dispositivo desarma em menos de 30 ms. Sensibilidade de 30 mA e o limiar de seguranca — abaixo disso, risco de fibrilacao ventricular e reduzido." },

  { id: "e19", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "No esquema de aterramento TN-S, a característica principal é:",

    alternativas: ["Condutores de neutro (N) e proteção (PE) são distintos em toda a instalação.", "Não existe aterramento da fonte.", "O neutro e o terra são unidos apenas no ponto de consumo.", "Utiliza-se apenas um condutor PEN combinado."], respostaCorreta: 0,

    explicacao: "TN-S (Separated): PE e N sao condutores separados em toda a instalacao. TN-C: PEN unico (economico). TN-C-S: PEN na distribuicao, separados apos o QG. O TN-S e o mais seguro — correntes de falta retornam pelo PE sem contaminar o neutro." }



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Segurança (NR10)

  // ---------------------------------------------------------------------

  { id: "e20", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Segundo a NR10, antes de iniciar trabalhos em instalações desenergizadas, deve-se seguir uma sequência de procedimentos. A etapa que vem IMEDIATAMENTE após a desenergização e antes do aterramento é:",

    alternativas: ["Constatação da ausência de tensão", "Instalação de sinalização de impedimento de reenergização", "Seccionamento", "Proteção dos elementos energizados existentes na zona controlada"], respostaCorreta: 0,

    explicacao: "NR-10 §10.1 — Sequencia SIVAP: (1) Seccionamento, (2) Impedimento de reenergizacao, (3) Verificacao de ausencia de tensao (com detector de tensao adequado), (4) Aterramento temporario com equipotencializacao, (5) Protecao de pontos vizinhos energizados. Todas obrigatorias nessa ordem." },

  { id: "e21", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "De acordo com a NR10, trabalhos em instalações elétricas só podem ser realizados por trabalhadores:",

    alternativas: ["Qualificados, capacitados ou autorizados, conforme o caso", "Apenas engenheiros eletricistas", "Qualquer colaborador da empresa", "Apenas com mais de 5 anos de experiência"], respostaCorreta: 0,

    explicacao: "NR-10 classifica: Qualificado (curso de 40h em eletricidade), Capacitado (treinamento pratico pelo empregador), Habilitado (qualificado + registro CREA/CFT). Tensao acima de 1 kV exige profissional **habilitado**. O curso NR-10 SEP (Sistema Eletrico de Potencia) e adicional para trabalhos em alta tensao." },

  { id: "e22", areaGrande: "Eletrotécnica", assunto: "EPI/EPC", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Fácil",

    enunciado: "Em trabalhos em altura com risco elétrico, são exemplos de Equipamento de Proteção Individual (EPI):",

    alternativas: ["Luvas isolantes e cinto de segurança tipo paraquedista", "Apenas o disjuntor de proteção", "Sinalização de área", "Aterramento temporário"], respostaCorreta: 0,

    explicacao: "EPI (individual): luvas isolantes de borracha (classe adequada a tensao), capacete com viseira facial, oculos de seguranca, calcados dieletricos, uniforme antichama. EPC (coletivo): barreiras, tapetes isolantes, aterramento temporario, sinalizacao de seguranca. Hierarquia da NR-10: EPCs primeiro; EPIs complementam." }



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Instrumentação e Medidas

  // ---------------------------------------------------------------------

  { id: "e23", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Para medir corrente elétrica em um circuito, o amperímetro deve ser conectado:",

    alternativas: ["Em série com o circuito", "Em paralelo com o circuito", "Em qualquer configuração, desde que próximo à fonte", "Diretamente nos terminais da bateria, isolado do circuito"], respostaCorreta: 0,

    explicacao: "Amperímetro: $$R_{int} \approx 0\,\Omega$$ — ligado em SERIE no circuito. Voltímetro: $$R_{int} \to \infty$$ — ligado em PARALELO. Erro de ligacao: amperímetro em paralelo = curto-circuito; voltímetro em serie = circuito praticamente aberto. Esses erros podem danificar irreversivelmente os instrumentos." },

  { id: "e24", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um voltímetro ideal deve apresentar resistência interna:",

    alternativas: ["Muito alta (tendendo ao infinito)", "Muito baixa (tendendo a zero)", "Igual à resistência do circuito medido", "Indiferente ao valor"], respostaCorreta: 0,

    explicacao: "Voltímetro com $$R_{int} \to \infty$$: corrente desviada $$I_v = V/R_{int} \to 0$$. Nao perturba o circuito. Voltímetros digitais modernos: $$R_{int} = 10\,M\Omega$$. Analogicos: $$R_{int} = sensibilidade \times \text{fundo de escala}$$, tipicamente $$20\,k\Omega/V$$. Quanto maior a sensibilidade, mais precisa a medicao em circuitos de alta impedancia." },

  { id: "e25", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Difícil",

    enunciado: "Um sensor de temperatura do tipo termopar funciona baseado no princípio físico:",

    alternativas: ["Efeito Seebeck (geração de tensão por diferença de temperatura entre metais distintos)", "Efeito Joule", "Efeito Hall", "Lei de Ohm"], respostaCorreta: 0,

    explicacao: "Termopar (efeito Seebeck): juncao de dois metais A e B gera FEM $$V = \alpha_{AB}(T_1 - T_2)$$. Juncao quente = ponto de medicao; juncao fria = referencia (tipicamente 0 graus C com gelo ou compensada eletronicamente). Sem alimentacao externa. Tipos comuns: K (mais usado, -200 a +1350 graus C), J, T, R, S." }



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Eletrônica básica

  // ---------------------------------------------------------------------

  { id: "e26", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "O componente eletrônico que permite a passagem de corrente em apenas um sentido é:",

    alternativas: ["Diodo", "Resistor", "Capacitor", "Indutor"], respostaCorreta: 0,

    explicacao: "Diodo de silicio: conduz quando $$V_{AK} \geq 0{,}6\,V$$. Equacao de Shockley: $$I = I_S(e^{V/V_T} - 1)$$ onde $$V_T = 26\,mV$$ a 25 graus C. Polarizacao reversa: $$I \approx I_S$$ (microamperes) ate a tensao de ruptura $$V_{BR}$$. Zener opera intencionalmente na regiao de ruptura reversa para regulacao de tensao." },

  { id: "e27", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um transistor bipolar (BJT) operando como interruptor, na região de saturação, apresenta:",

    alternativas: ["Tensão coletor-emissor próxima de zero, com corrente máxima conduzida", "Corrente de coletor nula", "Comportamento linear de amplificação", "Resistência infinita entre coletor e emissor"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e28", areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Fácil",

    enunciado: "O capacitor é um componente que armazena energia na forma de:",

    alternativas: ["Campo elétrico", "Campo magnético", "Energia térmica", "Energia mecânica"], respostaCorreta: 0,

    explicacao: "Capacitor: $$Q = CV$$, $$E = CV^2/2$$, $$i = C dV/dt$$. Em CC permanente: $$i = 0$$ (circuito aberto). Em CA: $$I = V \omega C = V/X_C$$. Transistorio em $$t = 0^+$$: age como curto-circuito (tensao no capacitor nao muda instantaneamente). Reatancia: $$X_C = 1/(\omega C)$$ — diminui com aumento da frequencia." }



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Comandos elétricos

  // ---------------------------------------------------------------------

  { id: "e29", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Em um circuito de comando de motor, o contator é acionado por:",

    alternativas: ["Uma bobina eletromagnética que fecha os contatos de força", "Diretamente pela tensão de força do motor", "Apenas por botoeira mecânica sem energia elétrica", "Pressão hidráulica"], respostaCorreta: 0,

    explicacao: "Contator: bobina (bobina de comando, tipicamente 24 V ou 220 V CA) energizada cria campo magnetico → atrai o nucleo movel → fecha contatos principais (3P para trifasico) e auxiliares (NA e NF para circuito de comando). Ao desenergizar: mola retorna os contatos. Contatos principais dimensionados para correntes de carga (motores)." },

  { id: "e30", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "A função do relé térmico em um circuito de comando de motor é:",

    alternativas: ["Proteger o motor contra sobrecargas térmicas", "Aumentar a velocidade do motor", "Inverter o sentido de rotação", "Reduzir a tensão de partida"], respostaCorreta: 0,

    explicacao: "Rele termico: bimetalico aquece com $$I^2 R$$ → entorta progressivamente → aciona mecanismo de desarme → abre contato NF no circuito de comando → a bobina do contator e desenergizada → motor para. Calibrar em $$I_{ajuste} = I_{nom}$$. Reset: manual (mais seguro) ou automatico. Rele termico NAO protege contra curto-circuito." },

  { id: "e31", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "CESGRANRIO (estilo)", ano: 2022, dificuldade: "Difícil",

    enunciado: "Em um circuito de intertravamento elétrico para reversão de motor (liga/desliga, sentido horário/anti-horário), o objetivo principal é:",

    alternativas: ["Impedir o acionamento simultâneo de dois contatores que causariam curto-circuito de fases", "Aumentar o torque de partida", "Reduzir o consumo de energia em repouso", "Eliminar a necessidade de fusíveis"], respostaCorreta: 0,

    explicacao: "Intertravamento eletrico em inversao de marcha: contato NF do contator horario (KM1) em serie com bobina do anti-horario (KM2) e vice-versa. Se KM1 energizado, seu NF abre — impossivel energizar KM2 simultaneamente. Isso evita curto trifasico entre fases. Recomendado tambem o intertravamento mecanico para dupla protecao." }



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — Geração, Transmissão e Distribuição

  // ---------------------------------------------------------------------

  { id: "e32", areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A principal razão para transmitir energia elétrica em alta tensão por longas distâncias é:",

    alternativas: ["Reduzir as perdas por efeito Joule, já que a corrente diminui para a mesma potência", "Aumentar a frequência da rede", "Reduzir o custo dos transformadores", "Eliminar a necessidade de aterramento"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "e33", areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma usina termelétrica converte energia térmica em energia elétrica através, tipicamente, de:",

    alternativas: ["Turbina a vapor acoplada a um gerador síncrono", "Painéis fotovoltaicos", "Células a combustível diretamente", "Baterias de íon-lítio"], respostaCorreta: 0,

    explicacao: "Termeletrica: combustivel → calor → vapor → turbina → gerador. Ciclo Rankine: eficiencia 35-40%. Ciclo combinado (CCGT): turbina a gas (Brayton) + recuperacao de calor + turbina a vapor (Rankine): eficiencia total ate 60%. Termonuclear: calor nuclear em vez de combustao, mesmo ciclo termodinamico depois." },

  { id: "e34", areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Distorções na forma de onda senoidal da tensão/corrente, causadas por cargas não lineares, são quantificadas pelo indicador:",

    alternativas: ["THD (Taxa de Distorção Harmônica)", "Fator de potência apenas", "Queda de tensão", "Escorregamento"], respostaCorreta: 0,

    explicacao: "THD: $$THD_V = (\sqrt{V_2^2 + V_3^2 + \cdots})/V_1 \times 100\%$$. Causas: inversores, retificadores, fontes chaveadas, lampadas LED sem filtro. Efeitos: aquecimento extra em cabos e transformadores (perdas por harmonicas), interferencia em equipamentos sensiveis, reducao da vida util de bancos de capacitores." }



  // ---------------------------------------------------------------------

  // CERTO/ERRADO — formato CESGRANRIO/Petrobras (itens julgados), nível mais

  // denso, inspirado em simulados preparatórios reais quanto a estrutura,

  // porém com enunciados e valores 100% originais.

  // ---------------------------------------------------------------------

  { id: "ce1", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "A condutividade elétrica dos materiais condutores diminui com o aumento da temperatura, devido ao maior espalhamento de elétrons pelas vibrações da rede cristalina.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce2", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um condutor de cobre com resistividade 1,7×10⁻⁸ Ω·m, seção transversal de 2,5 mm² e comprimento de 150 m, percorrido por 6 A, dissipa potência superior a 35 W.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce3", areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um divisor de tensão com dois resistores em série, se R2 é o triplo de R1, a queda de tensão sobre R2 corresponde a 3/4 da tensão total da fonte.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "$$V_{R2} = \dfrac{R_2}{R_1+R_2} \times V = \dfrac{3R_1}{4R_1} \times V = \dfrac{3}{4}V$$ — afirmativa correta." , temImagem: true },

  { id: 'ce4', areaGrande: 'Eletrotécnica', assunto: 'Leis de Kirchhoff', banca: 'CESGRANRIO (estilo, Certo/Errado)', ano: 2023, dificuldade: 'Médio',

    enunciado: 'Em um circuito com dois resistores em paralelo alimentados pela mesma fonte, a corrente total fornecida pela fonte é igual à soma das correntes em cada ramo, conforme a Lei dos Nós de Kirchhoff.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce5", areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Pelo Teorema de Thévenin, um circuito linear de corrente alternada com dois terminais pode ser substituído por uma fonte de tensão equivalente em série com uma impedância equivalente.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce6", areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",

    enunciado: "Uma tensão de pico de 311 V corresponde, aproximadamente, a 220 V de tensão eficaz (RMS), considerando uma onda senoidal pura.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce7", areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma carga industrial com potência aparente de 20.000 VA e fator de potência 0,7 indutivo solicita uma potência ativa superior a 15.000 W.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce8", areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",

    enunciado: "Para cargas trifásicas conectadas em estrela, a corrente de linha é igual à corrente de fase.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "Na ligação estrela, a corrente de linha é igual à corrente de fase (diferente da ligação triângulo, onde a tensão de linha é igual à de fase)." , temImagem: true },

  { id: 'ce9', areaGrande: 'Eletrotécnica', assunto: 'Instrumentação', banca: 'CESGRANRIO (estilo, Certo/Errado)', ano: 2024, dificuldade: 'Médio',

    enunciado: 'O amperímetro alicate realiza uma medição não invasiva de corrente, sem necessidade de interromper o circuito.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce10", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",

    enunciado: "No método dos dois wattímetros para medição de potência trifásica, se cada wattímetro indicar 600 W, a potência ativa total da carga trifásica equivale a 1.800 W.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce11", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2022, dificuldade: "Médio",

    enunciado: "Um instrumento de medição exato necessariamente também é preciso, já que exatidão e precisão são sinônimos em metrologia.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce12", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "A NBR 5410 é aplicável a instalações elétricas alimentadas sob tensão nominal igual ou inferior a 1.000 V em corrente alternada.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce13", areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Conforme a NBR 5410, a previsão mínima de cargas de tomada (TUG) tem como referência a área do cômodo, e não o seu perímetro.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce14", areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "Para a proteção de um condutor contra sobrecargas, deve-se garantir que a corrente de projeto seja menor ou igual à corrente nominal do dispositivo de proteção, que por sua vez deve ser menor ou igual à capacidade de condução do condutor.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce15", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",

    enunciado: "No esquema de aterramento TT, tanto a fonte quanto as massas da instalação são aterradas em um único e mesmo eletrodo de aterramento.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce16", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "Quanto menor a resistividade elétrica do solo, melhor a dispersão de corrente elétrica, beneficiando o desempenho do sistema de aterramento.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce17", areaGrande: "Eletrotécnica", assunto: "SPDA", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2022, dificuldade: "Médio",

    enunciado: "Descargas atmosféricas são fenômenos previsíveis com exatidão, sendo possível evitar totalmente sua incidência por meio de um SPDA bem projetado.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce18", areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um transformador ideal monofásico tem 400 espiras no primário e 100 no secundário. Alimentado com tensão de 440 V no primário e corrente de 3 A no secundário, a corrente no primário é de 0,75 A.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "Relação $$a = N_1/N_2 = 4$$. $$I_1/I_2 = N_2/N_1$$ — a corrente é inversamente proporcional ao número de espiras: $$I_2 = 1/4. Logo I1 = I2/4 = 3/4 = 0,75 A — afirmativa CORRETA." , temImagem: true },

  { id: 'ce19', areaGrande: 'Eletrotécnica', assunto: 'Transformadores', banca: 'CESGRANRIO (estilo, Certo/Errado)', ano: 2023, dificuldade: 'Médio',

    enunciado: 'As perdas no cobre de um transformador variam com o quadrado da corrente de carga, sendo praticamente nulas em vazio.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce20", areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor síncrono é construtivamente análogo a um gerador síncrono, diferindo apenas no sentido do fluxo de potência ativa.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce21", areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Considerando uma máquina síncrona alimentada a 60 Hz, operando com velocidade de campo girante de 1.200 rpm, o número de pares de polos é igual a 3.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce22", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "A partida direta é o método que proporciona o maior conjugado de partida entre os métodos usuais (direta, estrela-triângulo, soft-starter).",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce23", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "Para fins de aplicação da NR10, considera-se baixa tensão a faixa superior a 50 V e igual ou inferior a 1.000 V em corrente alternada, medida entre fases.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce24", areaGrande: "Eletrotécnica", assunto: "NR10", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",

    enunciado: "Segundo a NR10, trabalhos em instalações elétricas energizadas em condições de risco só podem ser realizados quando houver impossibilidade técnica de desenergização e mediante adoção de medidas de controle complementares.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce25", areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2024, dificuldade: "Médio",

    enunciado: "O número binário 11010 corresponde ao número decimal 26.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "ce26", areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESGRANRIO (estilo, Certo/Errado)", ano: 2023, dificuldade: "Médio",

    enunciado: "A saída de uma porta lógica XOR (OU-exclusivo) é 1 somente quando todas as entradas forem iguais a 1.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ---------------------------------------------------------------------

  // NOVO LOTE — inspirado em provas oficiais reais Petrobras/CESGRANRIO

  // (questões 100% originais, nunca copiadas do texto da banca)

  // ---------------------------------------------------------------------

  { id: "n1", areaGrande: "Eletrotécnica", assunto: "Método dos dois wattímetros", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "No método dos dois wattímetros para medição de potência em carga trifásica, os instrumentos indicam 900 W e 500 W. A potência ativa total da carga é igual a 1.400 W.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "$$P_{total} = W_1 + W_2 = 900 + 500 = 1.400 W — afirmativa correta." , temImagem: true },

  { id: 'n2', areaGrande: 'Eletrotécnica', assunto: 'Método dos dois wattímetros', banca: 'CESGRANRIO (estilo)', ano: 2024, dificuldade: 'Difícil',

    enunciado: 'No método dos dois wattímetros, quando o fator de potência da carga trifásica é exatamente 0,5, uma das duas leituras é igual a zero.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n3", areaGrande: "Eletrotécnica", assunto: "Thévenin e Norton (CA)", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Na transformação entre os circuitos equivalentes de Thévenin e Norton em corrente alternada, a impedância de Norton é numericamente igual à impedância de Thévenin do mesmo circuito.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n4", areaGrande: "Eletrotécnica", assunto: "Partida estrela-triângulo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor trifásico tem corrente nominal de 120 A e razão entre corrente de partida e nominal igual a 6. Na partida direta, a corrente de partida seria de 720 A; já na partida estrela-triângulo, essa corrente cai para aproximadamente 240 A.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "$$I_{partida} = 6 \times 120 = 720\text{ A}$$. Com Y-δ: $$I_Y = \dfrac{720}{3} = 240\text{ A}$$: 720/3 = 240 A — afirmativa correta." , temImagem: true },

  { id: 'n5', areaGrande: 'Eletrotécnica', assunto: 'Transformadores', banca: 'CESGRANRIO (estilo)', ano: 2023, dificuldade: 'Difícil',

    enunciado: 'Um transformador ideal com relação de espiras 20:1 tem, no primário, tensão de 4.400 V e corrente de 8 A. A potência aparente desse transformador é igual a 35,2 kVA, e a corrente no secundário é de 160 A.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "$$S = 4400 \times 8 = 35200\text{ VA}$$. $$I_2 = I_1 \times \dfrac{N_1}{N_2} = 8 \times 20 = 160 A — afirmativa correta." , temImagem: true },

  { id: 'n6', areaGrande: 'Eletrotécnica', assunto: 'Luminotécnica', banca: 'CESGRANRIO (estilo)', ano: 2024, dificuldade: 'Difícil',

    enunciado: 'Uma sala de 12 m × 8 m precisa de iluminância de 1.000 lux. Considerando fator de depreciação de 0,8, coeficiente de utilização de 0,5 e luminárias com 4 lâmpadas de 2.000 lúmens cada (8.000 lúmens por luminária), são necessárias menos de 30 luminárias.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n7", areaGrande: "Eletrotécnica", assunto: "NBR 14039 (média tensão)", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "A NBR 14039 estabelece os requisitos para instalações elétricas de média tensão, com tensão nominal entre 1,0 kV e 36,2 kV em corrente alternada.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n8", areaGrande: "Eletrotécnica", assunto: "NBR 14039 (média tensão)", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em subestações de média tensão, as posições de equipamentos de manobra com contatos não visíveis devem ser sinalizadas, sendo usual a convenção de cor verde para indicar contato fechado e vermelho para contato aberto.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n9", areaGrande: "Eletrotécnica", assunto: "SPDA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Pelo método do ângulo de proteção (ângulo de 45°), um captor tipo Franklin instalado em um mastro de 8 m de altura protege, no nível do solo, um raio de cobertura de aproximadamente 8 m.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n10", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos / CLP", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Em um Controlador Lógico Programável (CLP), a lógica Ladder é uma das linguagens de programação padronizadas, representando contatos e bobinas de forma similar a um diagrama elétrico de comando.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n11", areaGrande: "Eletrotécnica", assunto: "Comandos elétricos / CLP", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em um sistema de controle de nível de um tanque por CLP, um sistema com lógica de histerese (selo) entre o nível alto e o nível baixo evita o acionamento repetitivo (chaveamento excessivo) da bomba quando o nível oscila perto de um único ponto de referência.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n12", areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A partida indireta de motores trifásicos (estrela-triângulo, chave compensadora, soft-starter) é geralmente preferida à partida direta em motores de maior potência, principalmente para reduzir os impactos de corrente na rede de alimentação.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n13", areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um galvanômetro com resistência interna de 50 Ω suporta corrente máxima de 5 mA. Para transformá-lo em um amperímetro capaz de medir até 10 A, a resistência shunt (em paralelo) deve ser muito menor que 50 Ω.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n14", areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Analisando curvas de atuação tempo×corrente, um disjuntor de ramal sempre atua mais rapidamente que o disjuntor geral para uma mesma corrente de curto-circuito, garantindo seletividade total entre os dois.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 1,

    explicacao: "A seletividade depende da relação específica entre as curvas dos dois disjuntores em cada faixa de corrente — não é uma garantia automática e universal; em algumas faixas de corrente elevada, as curvas podem se sobrepor, comprometendo a seletividade. Afirmativa ERRADA (generalização indevida)." , temImagem: true },

  { id: 'n15', areaGrande: 'Eletrotécnica', assunto: 'Manutenção elétrica', banca: 'CESGRANRIO (estilo)', ano: 2023, dificuldade: 'Médio',

    enunciado: 'O monitoramento periódico de pontos de conexão elétrica por câmera termográfica, sem interromper a operação do equipamento, é um exemplo característico de manutenção preditiva.',

    alternativas: ['Certo', 'Errado'], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n16", areaGrande: "Eletrotécnica", assunto: "Manutenção elétrica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A simples troca de um fusível queimado por outro idêntico, restaurando o funcionamento do circuito sem investigação da causa raiz, é classificada como manutenção corretiva.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n17", areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Inversores de frequência aplicados a bombas centrífugas permitem reduzir a velocidade do motor para diminuir a vazão, o que tende a gerar economia de energia frente ao uso de válvulas de estrangulamento na mesma finalidade.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n18", areaGrande: "Eletrotécnica", assunto: "Nobreaks e baterias", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um nobreak do tipo on-line (de dupla conversão) mantém a carga permanentemente alimentada pelo inversor, convertendo a energia da rede em CC e depois novamente em CA, mesmo em condições normais de operação.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n19", areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "O esquema de aterramento TN-C utiliza um único condutor (PEN) combinando as funções de neutro e proteção em todo o trajeto da instalação, a partir da fonte.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },

  { id: "n20", areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Lâmpadas de vapor de sódio possuem, em geral, eficiência luminosa (lm/W) superior à de lâmpadas halógenas convencionais, sendo por isso bastante usadas em iluminação pública e de grandes áreas.",

    alternativas: ["Certo", "Errado"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ---------------------------------------------------------------------

  // ELETROTÉCNICA — lote adicional de questões originais de alta

  // dificuldade (cálculo em múltiplas etapas, nível concurso técnico)

  // ---------------------------------------------------------------------

  { id: "e35", inedita: true, areaGrande: "Eletrotécnica", assunto: "Grandezas elétricas e magnéticas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um circuito magnético tem núcleo de seção reta A = 4 cm², comprimento médio do núcleo l = 40 cm, permeabilidade relativa μr = 1.000, e um entreferro (gap de ar) de g = 0,5 mm na mesma seção. O enrolamento tem N = 800 espiras e é percorrido por corrente I = 1,5 A. Considerando μ0 = 4π×10⁻⁷ H/m, o fluxo magnético φ no circuito é de aproximadamente:",

    alternativas: ["0,17 mWb", "0,67 mWb", "1,20 mWb", "2,68 mWb", "6,70 mWb"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e36", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um transformador trifásico, ligação delta no primário e estrela no secundário (Δ-Y), é alimentado por uma tensão de linha de 4.160 V. O enrolamento primário tem 1.000 espiras e o secundário, 50 espiras. A tensão de FASE no secundário vale aproximadamente:",

    alternativas: ["72 V", "120 V", "144 V", "208 V", "360 V"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e37", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um autotransformador abaixador alimenta uma carga de 10 kVA com tensão de saída de 200 V a partir de uma fonte de 240 V. Desprezando perdas, a potência transferida diretamente por CONDUÇÃO elétrica (sem passar pela transformação eletromagnética do enrolamento comum) vale aproximadamente:",

    alternativas: ["1,67 kVA", "5,00 kVA", "8,33 kVA", "10,00 kVA", "11,67 kVA"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e38", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um gerador CC composto em curta derivação tem tensão terminal de 240 V e corrente de linha (carga) de 60 A. A resistência do enrolamento de campo série é 0,02 Ω e a resistência da armadura é 0,07 Ω. Nessas condições, a corrente de armadura e a queda de tensão na armadura valem, respectivamente:",

    alternativas: ["60 A e 4,2 V", "60 A e 5,6 V", "64 A e 4,48 V", "64 A e 4,8 V", "66 A e 4,62 V"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e39", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um gerador síncrono, operando com fator de potência unitário, apresenta tensão a vazio (sem carga) de 240 V e tensão terminal de 220 V a plena carga. A regulação de tensão (RT) desse gerador, em percentual, vale aproximadamente:",

    alternativas: ["7,7%", "8,3%", "9,1%", "10,9%", "12,0%"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e40", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um circuito RLC paralelo, alimentado por fonte senoidal, tem-se R = 50 Ω, L = 1 H e C = 4 μF. A frequência de ressonância desse circuito vale aproximadamente:",

    alternativas: ["7,96 Hz", "15,9 Hz", "79,6 Hz", "159 Hz", "796 Hz"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e41", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico, 4 polos, alimentado em 60 Hz, opera em regime permanente a 1.755 rpm. A frequência das correntes induzidas no rotor (frequência de escorregamento) vale:",

    alternativas: ["0,5 Hz", "1,0 Hz", "1,5 Hz", "2,5 Hz", "3,0 Hz"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e42", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma fonte trifásica equilibrada em estrela, com tensão de fase de 120 V, alimenta uma carga desequilibrada também em estrela, com neutros interligados, composta por três resistores puramente resistivos: 20 Ω na fase A, 20 Ω na fase B e 10 Ω na fase C. A corrente no condutor de neutro vale:",

    alternativas: ["0 A", "2 A", "4 A", "6 A", "12 A"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e43", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Um motor de indução trifásico de 8 polos é alimentado por uma rede de 50 Hz. A velocidade angular do campo girante, em rad/s, vale aproximadamente:",

    alternativas: ["31,4 rad/s", "52,4 rad/s", "62,8 rad/s", "78,5 rad/s", "104,7 rad/s"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e44", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Assinale a sequência CORRETA dos passos a seguir para a realização do ensaio de curto-circuito em um transformador monofásico, do primeiro ao último passo: I — Medir potência, tensão e corrente de curto-circuito. II — Alimentar o lado de alta tensão por uma fonte CA ajustável, partindo de 0 V. III — Elevar a tensão gradualmente até que a corrente no amperímetro atinja o valor nominal. IV — Curto-circuitar o lado de baixa tensão. V — Calcular os parâmetros do circuito equivalente série.",

    alternativas: ["I, II, III, IV, V", "IV, II, III, I, V", "II, IV, III, I, V", "IV, III, II, I, V", "II, III, IV, I, V"], respostaCorreta: 1,

    explicacao: "Ensaio de curto-circuito do transformador: (1) CC o secundario; (2) Elevar tensao no primario ate $$I_{n}$$; (3) Medir $$V_{cc}$$ e $$P_{cc}$$. Resultados: $$Z_{cc}\% = (V_{cc}/V_n) \times 100$$; $$R_{cc}\% = (P_{cc}/S_n) \times 100$$ (perdas no cobre); $$X_{cc}\% = \sqrt{Z_{cc}^2 - R_{cc}^2}$$. Ensaio a baixa tensao — potencia dissipada e pequena." },



  { id: "e45", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma carga de 150 kVA opera com fator de potência 0,7 indutivo. Deseja-se elevar o fator de potência para 0,95 indutivo por meio de um banco de capacitores em paralelo. Dados: para cosφ1 = 0,7, sen φ1 ≈ 0,714; para cosφ2 = 0,95, tg φ2 ≈ 0,329. A potência reativa do banco de capacitores necessária vale aproximadamente:",

    alternativas: ["34,5 kvar", "55,0 kvar", "72,6 kvar", "92,1 kvar", "107,1 kvar"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e46", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "São condições necessárias para que dois geradores síncronos sejam conectados em paralelo a um mesmo barramento, alimentando a mesma carga, EXCETO:",

    alternativas: [

      "As tensões eficazes de linha dos dois geradores devem ser iguais.",

      "Os dois geradores devem ter a mesma sequência de fase.",

      "As frequências dos dois geradores devem ser iguais no instante do fechamento da chave de paralelismo.",

      "Os ângulos de fase das tensões dos dois geradores devem ser iguais no instante do paralelismo.",

      "A potência ativa fornecida pelos dois geradores deve ser obrigatoriamente idêntica antes do paralelismo.",

    ], respostaCorreta: 4,

    explicacao: "Sincronismo de geradores em paralelo: (1) Tensoes iguais; (2) Frequencias iguais; (3) Tensoes em fase; (4) Mesma sequencia de fases. Verificado pelo sincronoscopo: fechar o disjuntor com o ponteiro exatamente em zero. Fechar fora de fase causa corrente de choque altissima e pode danificar o gerador mecanicamente (torque de sincronizacao abrupto)." },



  { id: "e47", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre os transformadores para instrumentos (TCs e TPs), é correto afirmar que:",

    alternativas: [

      "O TC é projetado para operar normalmente com o secundário em circuito aberto, garantindo segurança ao operador.",

      "O TP reduz tensões elevadas para níveis compatíveis com instrumentos de medição e proteção, mantendo isolamento galvânico do circuito de alta tensão.",

      "O TC deve ter seu primário sempre em paralelo com a carga a ser medida.",

      "O TP é normalmente especificado por sua corrente nominal no primário, e não por sua tensão.",

      "Tanto o TC quanto o TP dispensam qualquer cuidado de segurança quando o secundário está aberto ou em curto.",

    ], respostaCorreta: 1,

    explicacao: "TP: reduz tensao para instrumentos (115 V ou 57,7 V). Nunca curto-circuitar o secundario (sobrecorrente grave). TC: reduz corrente para 5 A ou 1 A. Nunca abrir o secundario com TC energizado (alta tensao perigosa induzida). Ambos promovem isolacao galvanica entre o sistema de alta tensao e os instrumentos/reles de protecao." },



  { id: "e48", inedita: true, areaGrande: "Eletrotécnica", assunto: "Grandezas elétricas e magnéticas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Sabendo que a carga elétrica é expressa, em unidades de base do SI, por A·s, e que a diferença de potencial é expressa por kg·m²·s⁻³·A⁻¹, a unidade da CAPACITÂNCIA, em termos de unidades de base do SI, é:",

    alternativas: ["kg·m²·s⁻³·A⁻²", "kg⁻¹·m⁻²·s⁴·A²", "kg⁻¹·m⁻²·s³·A²", "kg·m⁻²·s⁻³·A", "kg·m²·s⁻²·A⁻²"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e49", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma sala de 6 m × 5 m precisa de iluminância média de 500 lux. Considerando fator de depreciação de 0,75, coeficiente de utilização de 0,6, e luminárias com 4 lâmpadas de 1.600 lúmens cada (6.400 lúmens por luminária), o número MÍNIMO de luminárias necessárias é:",

    alternativas: ["3", "4", "5", "6", "8"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e50", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Os motores de indução monofásicos, por não produzirem campo girante na partida (apenas campo pulsante), são classificados, entre outros critérios, pelo método utilizado para gerar o torque de partida. Esse critério de classificação é o de motores de:",

    alternativas: ["Escorregamento", "Comutação", "Partida", "Excitação composta", "Sincronismo"], respostaCorreta: 2,

    explicacao: "Motor monofasico: campo resultante e pulsante (nao girante) → sem torque de partida. Solucoes: (1) Enrolamento auxiliar com capacitor — defasagem de 90 graus entre enrolamentos → campo girante. (2) Shaded pole (anel de cobre no polo) — defasagem local. (3) Motor universal (corrente continua e alternada) — tem escovas e comutador." },



  { id: "e51", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "A Lei de Ampère, expressa pela integral de linha do campo magnético H ao longo de um caminho fechado (∮H·dl), é equivalente:",

    alternativas: [

      "à energia armazenada no campo magnético dentro do caminho considerado.",

      "à corrente elétrica líquida envolvida pelo caminho fechado considerado.",

      "ao fluxo magnético total que atravessa a superfície delimitada pelo caminho.",

      "à força eletromotriz induzida no caminho fechado.",

      "à potência dissipada nos condutores que atravessam o caminho.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e52", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um motor de corrente contínua apresenta a seguinte característica: velocidade muito alta com carga leve e velocidade bastante reduzida quando submetido à carga máxima, desenvolvendo torque elevado nessa condição. Por essa característica, é frequentemente empregado em partidas com cargas pesadas, como guindastes e guinchos. Esse comportamento é típico do motor CC tipo:",

    alternativas: ["Em derivação (shunt)", "Composto cumulativo", "Série", "De imãs permanentes sem excitação", "Composto diferencial"], respostaCorreta: 2,

    explicacao: "Motor CC serie: $$\Phi \propto I_a$$ → $$T = k\Phi I_a \propto I_a^2$$ (altissimo torque na partida). Velocidade: $$n \propto 1/I_a$$ → varia muito com a carga. NUNCA operar em vazio: sem carga, $$I_a \to 0$$, $$\Phi \to 0$$, $$n \to \infty$$ → destruicao mecanica (fugada). Aplicacoes: tracao eletrica, guinchos pesados (alto torque inicial necessario)." },



  { id: "e53", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Um técnico, ao medir a corrente alternada de um equipamento sem interromper o circuito, enrolou o condutor 8 vezes na garra de um alicate amperímetro antes de fechá-la sobre o fio. O instrumento indicou uma leitura de 12 A. O valor real da corrente que alimenta o equipamento é de aproximadamente:",

    alternativas: ["1,5 A", "3,0 A", "6,0 A", "12,0 A", "96,0 A"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e54", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um sinal de tensão periódico, em forma de onda quadrada, alterna entre 20 V e 4 V, permanecendo o mesmo intervalo de tempo em cada nível. O valor eficaz (RMS) desse sinal vale aproximadamente:",

    alternativas: ["10,0 V", "12,0 V", "14,4 V", "16,0 V", "18,0 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e55", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um transformador trifásico de 300 kVA, 13.800/220 V, apresenta impedância percentual de curto-circuito (Zcc%) igual a 5%. Considerando um curto-circuito franco no secundário, a corrente de curto-circuito no PRIMÁRIO vale aproximadamente:",

    alternativas: ["12,6 A", "125,6 A", "251,2 A", "502,5 A", "628,0 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e56", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um transformador de 300 kVA apresenta perdas no núcleo (a vazio) de 1.000 W e perdas no cobre (a plena carga) de 3.000 W. Operando com fator de potência unitário, os rendimentos a plena carga e a 50% da carga valem, respectivamente, aproximadamente:",

    alternativas: ["96,9% e 97,4%", "97,8% e 98,1%", "98,7% e 98,9%", "99,1% e 99,3%", "99,5% e 99,7%"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e57", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Um transformador de corrente (TC) tem relação de transformação nominal de 200:5 A. Circulando uma corrente de 160 A no primário, a corrente indicada no secundário do TC vale:",

    alternativas: ["1,0 A", "2,0 A", "4,0 A", "5,0 A", "8,0 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e58", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em uma curva característica tempo×corrente de um disjuntor termomagnético, observa-se uma região de atuação com tempos relativamente longos (da ordem de segundos a minutos) para correntes pouco acima da nominal, e outra região de atuação quase instantânea (da ordem de milissegundos) para correntes muito elevadas. Essas regiões correspondem, respectivamente, à atuação dos dispositivos de proteção contra:",

    alternativas: [

      "curto-circuito e sobrecarga.",

      "sobrecarga e curto-circuito.",

      "sobretensão e subtensão.",

      "subtensão e sobretensão.",

      "sobrecarga e sobretensão.",

    ], respostaCorreta: 1,

    explicacao: "Disjuntor termomagnético — bimetalico: $$1{,}1 \leq I/I_n \leq 6$$ → atuacao temporizada inversamente proporcional a $$I^2$$. Eletromagneto: $$I > 6\text{ a }20 \times I_n$$ → atuacao instantanea ($<$30 ms). Curvas de disparo: B (3-5× In, uso residencial), C (5-10× In, uso geral), D (10-20× In, cargas com alta corrente de partida como motores e transformadores)." },



  { id: "e59", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Dois condutores retos, paralelos e longos, no ar, são percorridos por correntes de mesma intensidade e mesmo sentido, afastados 4 cm um do outro. No ponto situado exatamente no meio do caminho entre os dois condutores, o campo magnético resultante (soma vetorial dos campos gerados pelos dois condutores) é:",

    alternativas: ["Nulo, pois os campos se cancelam no ponto médio", "Igual ao campo de um único condutor", "O dobro do campo de um único condutor", "A metade do campo de um único condutor", "Indeterminado sem o valor da corrente"], respostaCorreta: 0,

    explicacao: "Forcas entre condutores paralelos: correntes no **mesmo sentido** → campos magneticos se opõem entre os fios → forca de **atracao**. Sentidos opostos → campos se somam entre os fios → forca de **repulsao**. Formula: $$F/L = \mu_0 I_1 I_2/(2\pi d)$$. Esta formula era a base da definicao de Ampere no sistema SI ate 2019." }



  // ---------------------------------------------------------------------

  // PORTUGUÊS — lote adicional (texto original próprio, sem reprodução de

  // provas oficiais ou de obras literárias de terceiros)

  // ---------------------------------------------------------------------

  { id: "p7", inedita: true, areaGrande: "Português", assunto: "Figuras de linguagem", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Texto de referência: \"Há cinco anos o relógio do avô parou de funcionar, mas ninguém teve coragem de jogá-lo fora. Pendurado na parede da sala, ele observava silencioso as reuniões de família, como um velho sábio que já não precisa falar.\" — No trecho \"ele observava silencioso as reuniões de família, como um velho sábio que já não precisa falar\", identificam-se, respectivamente, as figuras de linguagem:",

    alternativas: ["Metáfora e hipérbole", "Comparação e metonímia", "Prosopopeia (personificação) e comparação", "Sinestesia e ironia", "Hipérbole e prosopopeia"], respostaCorreta: 2,

    explicacao: "**Coerencia**: unidade de sentido — ideias se encadeiam logicamente sem contradicoes. **Coesao**: mecanismos linguisticos de ligacao entre partes do texto (pronomes, conjuncoes, sinonimos, elipses). Um texto pode ser coeso e incoerente, mas nao o contrario. Ambos sao essenciais para um texto bem construido." },


  { id: "p8", inedita: true, areaGrande: "Português", assunto: "Tempo verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Texto de referência: \"Quando finalmente decidimos consertá-lo, o relojoeiro sorriu e disse que, na verdade, o mecanismo gemia de cansaço há muito tempo, pedindo descanso.\" — O tempo e modo verbal da forma \"gemia\", nesse contexto, é:",

    alternativas: ["Pretérito perfeito do indicativo", "Pretérito imperfeito do indicativo", "Pretérito mais-que-perfeito do indicativo", "Futuro do pretérito do indicativo", "Presente do subjuntivo"], respostaCorreta: 1,

    explicacao: "Voz passiva analitica: verbo ser (auxiliar) + participio passado. 'O relatorio **foi elaborado** pela equipe.' Conversao: sujeito ativo → agente da passiva (com 'por'); objeto direto → sujeito. Voz passiva pronominal: pronome 'se' = 'Elaborou-se o relatorio.' Ambas sao equivalentes em sentido." },


  { id: "p9", inedita: true, areaGrande: "Português", assunto: "Pronome relativo", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Na frase \"O relojoeiro, que trabalha há décadas no bairro, sorriu e disse que o mecanismo precisava de descanso\", o termo \"que\", em sua primeira ocorrência, funciona morfologicamente como pronome relativo e exerce, na oração que introduz, a função sintática de:",

    alternativas: ["Sujeito", "Objeto direto", "Objeto indireto", "Adjunto adverbial", "Complemento nominal"], respostaCorreta: 0,

    explicacao: "**Subordinacao**: oracoes dependentes (subordinadas) exercem funcao sintatica na principal (sujeito, objeto, adjunto). **Coordenacao**: oracoes independentes ligadas por conjuncoes coordenativas (e, mas, ou, porem, contudo, entretanto). Periodos compostos por subordinacao tem oracoes que nao fazem sentido sozinhas." },


  { id: "p10", inedita: true, areaGrande: "Português", assunto: "Regência verbal", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Assinale a alternativa em que a regência verbal está de acordo com a norma-padrão:",

    alternativas: [

      "O relojoeiro assistiu o conserto do mecanismo com atenção redobrada.",

      "O relojoeiro assistiu ao conserto do mecanismo com atenção redobrada.",

      "A família aspirava ver o relógio funcionando novamente, e aspirou o cargo de guardiã da peça.",

      "Todos obedeceram às instruções do relojoeiro, mas o aparelho não obedeceu o comando.",

      "O técnico aspirou o cargo, mas não aspirou pela vitória.",

    ], respostaCorreta: 1,

    explicacao: "'Assistir' no sentido de ver/presenciar = **transitivo indireto** (pede preposicao 'a'). 'Assistiu **ao** jogo.' No sentido de ajudar: 'A lei assiste **ao** trabalhador.' No sentido de caber/pertencer: 'Assiste **ao** reu o direito de defesa.' Em todos os sentidos tecnicos do verbo, a preposicao 'a' e obrigatoria." },


  { id: "p11", inedita: true, areaGrande: "Português", assunto: "Pontuação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Assinale a frase corretamente pontuada quanto ao uso da vírgula:",

    alternativas: [

      "O relojoeiro, que trabalha há décadas no bairro, sorriu ao ver a peça.",

      "O relojoeiro que trabalha, há décadas no bairro sorriu, ao ver a peça.",

      "O relojoeiro, que trabalha há décadas, no bairro sorriu ao ver, a peça.",

      "O relojoeiro que, trabalha há décadas no bairro sorriu ao ver a peça.",

      "O relojoeiro que trabalha há décadas no bairro, sorriu, ao ver, a peça.",

    ], respostaCorreta: 0,

    explicacao: "**Adjetiva explicativa**: descreve uma caracteristica do antecedente sem restringi-lo — separada por virgulas. 'Os servidores, que trabalham arduamente, merecem reconhecimento.' **Adjetiva restritiva**: restringe um subconjunto — sem virgulas. 'Os servidores que trabalham arduamente merecem reconhecimento.' (apenas alguns)." },


  { id: "p12", inedita: true, areaGrande: "Português", assunto: "Antonímia e sinonímia", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "Assinale a alternativa que apresenta um par de termos ANTÔNIMOS:",

    alternativas: ["Restaurado, renovado", "Silencioso, calado", "Cansaço, fadiga", "Descanso, labor", "Curioso, indagador"], respostaCorreta: 3,

    explicacao: "Paronimos: palavras de grafia/som semelhante mas significados diferentes. Exemplos classicos: **eminente** (importante, elevado) vs **iminente** (prestes a acontecer); **infligir** (aplicar pena) vs **infringir** (violar norma); **descriminar** (inocentar) vs **discriminar** (diferenciar/distinguir)." }


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

    explicacao: "Deveres do servidor publico (Lei 8.112/1990, Art. 116): lealdade as instituicoes, urbanidade, assiduidade, pontualidade, observancia das normas legais, sigilosidade, manutencao do comportamento compativel com a moralidade administrativa. O dever de **lealdade** inclui agir dentro da lei mesmo contrario a interesses pessoais." },


  { id: "leg2", inedita: true, areaGrande: "Legislação", assunto: "Regime Jurídico Único", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Segundo a Lei nº 8.112/1990, que dispõe sobre o regime jurídico dos servidores públicos civis da União, das autarquias e das fundações públicas federais, é correto afirmar que:",

    alternativas: [

      "O vencimento do cargo efetivo pode ser livremente reduzido por ato do superior hierárquico.",

      "Remuneração é, exclusivamente, o vencimento básico do cargo, sem qualquer vantagem adicional.",

      "É assegurada a isonomia de vencimentos para cargos de atribuições iguais ou assemelhadas do mesmo Poder, ressalvadas vantagens de caráter individual e as relativas à natureza ou ao local de trabalho.",

      "O vencimento, a remuneração e o provento podem ser livremente objeto de arresto, sequestro ou penhora, independentemente da natureza da dívida.",

      "O servidor em débito com o erário jamais poderá ter seu débito inscrito em dívida ativa.",

    ], respostaCorreta: 2,

    explicacao: "Lei 8.112/1990 garante isonomia de vencimentos entre cargos de atribuicoes iguais. **Remuneracao** = vencimento do cargo + vantagens pecuniarias permanentes. **Vencimento** = retribuicao pelo efetivo exercicio do cargo. **Subsidio** = parcela unica, vedada a combinacao com vantagens remuneratorias (exclusivo de algumas carreiras)." },


  { id: "leg3", inedita: true, areaGrande: "Legislação", assunto: "Ética no Serviço Público", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "O Código de Ética dos Servidores Públicos estabelece deveres fundamentais a serem observados no exercício da função pública. Assinale a alternativa que descreve corretamente um desses deveres:",

    alternativas: [

      "Resolver, sempre que possível, as situações que exijam decisão de forma morosa, evitando comprometer-se com prazos.",

      "Ser probo, reto, leal e justo, demonstrando integridade de caráter, optando sempre pela solução mais vantajosa para o bem comum, quando diante de duas opções.",

      "Respeitar a hierarquia, mas evitar denunciar qualquer comprometimento da estrutura do Poder Estatal, ainda que identificado.",

      "Tratar os usuários do serviço público com cortesia apenas quando convier ao próprio servidor.",

      "Submeter-se a pressões de superiores hierárquicos que visem obter vantagens indevidas, sem necessidade de denunciá-las.",

    ], respostaCorreta: 1,

    explicacao: "Decreto 1.171/1994 (Codigo de Etica) — virtudes do servidor: **probidade** (retidao de conduta e carater), **lealdade** (fidelidade aos principios constitucionais), **decoro** (respeito a dignidade do cargo), **eficiencia** (dever de bem servir com qualidade). A improbidade e o oposto e pode gerar demissao e inelegibilidade." },


  { id: "leg4", inedita: true, areaGrande: "Legislação", assunto: "Processo Administrativo", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em relação ao processo administrativo, regido pela Lei nº 9.784/1999, é correto afirmar que:",

    alternativas: [

      "O processo administrativo somente pode ser iniciado a pedido de interessado, nunca de ofício.",

      "É permitida à Administração a recusa imotivada de recebimento de documentos.",

      "Quando pedidos de uma pluralidade de interessados tiverem conteúdo e fundamentos idênticos, poderão ser formulados em um único requerimento, salvo preceito legal em contrário.",

      "O requerimento inicial do interessado deve, obrigatoriamente e sem exceção, ser formulado por escrito.",

      "Os órgãos administrativos estão dispensados de elaborar modelos ou formulários padronizados para situações que importem pretensões equivalentes.",

    ], respostaCorreta: 2,

    explicacao: "Lei 9.784/1999, Art. 8 — O **litisconsorcio** (pedido de multiplos interessados) e permitido quando o objeto for o mesmo. Principios do PA Federal: **LIMPE** — Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiencia + Finalidade, Motivacao, Razoabilidade, Proporcionalidade, Ampla Defesa, Contraditorio e Seguranca Juridica." },


  { id: "leg5", inedita: true, areaGrande: "Legislação", assunto: "Direitos Fundamentais", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Nos termos da Constituição Federal de 1988, sobre os direitos e garantias fundamentais, é correto afirmar que:",

    alternativas: [

      "É livre a manifestação do pensamento, sendo permitido o anonimato.",

      "A criação de associações e, na forma da lei, a de cooperativas independem de autorização, sendo vedada a interferência estatal no seu funcionamento.",

      "É plena a liberdade de associação para fins lícitos, inclusive de caráter paramilitar.",

      "Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de qualquer aviso prévio à autoridade competente.",

      "A lei assegura aos autores de inventos industriais privilégio permanente para sua utilização.",

    ], respostaCorreta: 1,

    explicacao: "CF/1988, Art. 5o, XVIII — Criacao de **associacoes** e **cooperativas** independe de autorizacao estatal; a interferencia estatal e vedada. Art. 5o, XVII: liberdade de associacao para fins licitos, vedada a de carater paramilitar. Dissolucao forcada: apenas por decisao judicial transitada em julgado." },


  { id: "leg6", inedita: true, areaGrande: "Legislação", assunto: "Direitos Sociais", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Considerando os direitos sociais previstos na Constituição Federal de 1988, é correto afirmar que:",

    alternativas: [

      "São proibidos o trabalho noturno, perigoso ou insalubre a menores de dezesseis anos e qualquer trabalho a menores de quatorze anos, salvo na condição de aprendiz.",

      "O aposentado filiado a sindicato não tem direito a votar e ser votado nas organizações sindicais.",

      "É direito do trabalhador o repouso semanal remunerado, sem preferência quanto ao dia de sua concessão.",

      "É livre a associação profissional ou sindical, cabendo ao sindicato a defesa dos direitos da categoria exclusivamente em questões administrativas.",

      "A retenção dolosa do salário do trabalhador não constitui crime, apenas infração administrativa.",

    ], respostaCorreta: 0,

    explicacao: "CF/1988, Art. 37 — Principios da AP Federal: **LIMPE** — Legalidade (agir conforme a lei), Impessoalidade (sem favorecimento pessoal), Moralidade (boa-fe e etica), Publicidade (transparencia), Eficiencia (qualidade e economicidade). A impessoalidade impede usar o cargo para beneficios/prejuizos por razoes pessoais." }


  // ---------------------------------------------------------------------

  // INFORMÁTICA — lote adicional

  // ---------------------------------------------------------------------

  { id: "ic5", inedita: true, areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Fácil",

    enunciado: "Softwares podem ser classificados em Software Básico (sistema operacional), Software Aplicativo (editores de texto, planilhas) e Software Utilitário (ferramentas de suporte, como antivírus e compactadores). Dentre os itens a seguir, é classificado como Software UTILITÁRIO:",

    alternativas: ["Microsoft Word", "Microsoft Windows", "Adobe Photoshop", "Um programa antivírus", "Um navegador de internet"], respostaCorreta: 3,

    explicacao: "**Software Basico** (de sistema): sistema operacional, compiladores, interpretadores, drivers. **Software de Aplicacao**: programas para o usuario final — editores, navegadores, planilhas, **antivirus**. O antivirus e software de aplicacao, nao software basico." },


  { id: "ic6", inedita: true, areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em uma planilha eletrônica, a célula A1 contém o valor 50 e a célula A2 contém o valor 30. Ao digitar na célula A3 a fórmula =SE(A1>A2;\"Maior\";\"Menor\"), o resultado exibido em A3 será:",

    alternativas: ["50", "30", "Maior", "Menor", "Um erro de fórmula"], respostaCorreta: 2,

    explicacao: "HTTPS = HTTP + TLS (Transport Layer Security). O TLS usa criptografia hibrida: assimetrica (RSA/ECDHE) para trocar a chave de sessao, e simetrica (AES-256) para criptografar os dados. O certificado TLS e emitido por uma CA (Autoridade Certificadora) confiavel e verificado pelo navegador." },


  { id: "ic7", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre ameaças e ataques virtuais, assinale a alternativa que descreve corretamente o conceito de Phishing:",

    alternativas: [

      "Programa que monitora as atividades de um sistema e envia as informações coletadas a terceiros, podendo ter uso legítimo ou malicioso.",

      "Método de envio de mensagens eletrônicas que tenta se passar por comunicação oficial de uma instituição confiável, buscando induzir o usuário a fornecer dados sigilosos ou clicar em links maliciosos.",

      "Programa que se propaga inserindo cópias de si mesmo, tornando-se parte de outros programas e arquivos.",

      "Software projetado especificamente para sequestrar arquivos e exigir pagamento de resgate para sua liberação.",

      "Técnica de sobrecarga de um servidor por meio de múltiplas requisições simultâneas, tornando-o indisponível.",

    ], respostaCorreta: 1,

    explicacao: "**Phishing** caracteriza-se por simular comunicacao legitima (banco, governo, empresa) para roubar dados. Metodo: email/SMS com link falso para pagina identica a original. Diferente de: Ransomware (sequestra dados), Virus (infecta arquivos), Spam (propaganda indesejada nao-maliciosa)." },


  { id: "ic8", inedita: true, areaGrande: "Informática", assunto: "Conceitos básicos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Fácil",

    enunciado: "No editor de texto Microsoft Word (versão 2016, em português), a combinação de teclas CTRL+SHIFT+seta para a direita tem como finalidade:",

    alternativas: [

      "Mover o cursor para o final da linha.",

      "Selecionar uma palavra inteira por vez, na direção da seta.",

      "Mover o cursor para o final do documento.",

      "Alternar entre maiúsculas e minúsculas no texto selecionado.",

      "Inserir uma quebra de página.",

    ], respostaCorreta: 1,

    explicacao: "Ctrl+Shift+Seta Direita no Word seleciona uma **palavra inteira** para a direita a cada pressao. Outros atalhos: Shift+Seta (1 caractere), Shift+End (ate o fim da linha), Shift+Ctrl+End (ate o fim do documento). Duplo clique do mouse tambem seleciona a palavra." },


  { id: "ic9", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Um usuário digita, na barra de endereços de um navegador, o endereço de um site (exemplo.com.br) e o navegador exibe a página corretamente, embora a comunicação na internet ocorra por meio de endereços IP. O protocolo/sistema responsável por essa tradução de nome de domínio para endereço IP é:",

    alternativas: ["DHCP", "DNS", "FTP", "SMTP", "HTTP"], respostaCorreta: 1,

    explicacao: "Quando o usuario digita uma URL, o primeiro servico consultado e o **DNS**: converte nome do dominio em IP. Processo: cache local → servidor DNS do provedor → DNS raiz → servidor DNS autoritativo → obtem o IP → conexao TCP com o servidor web." },


  { id: "ic10", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um programa malicioso instalado em um computador passa a monitorar as teclas digitadas pelo usuário, registrando senhas e dados sigilosos para envio posterior a terceiros, sem o conhecimento da vítima. Esse tipo específico de programa malicioso é conhecido como:",

    alternativas: ["Worm", "Keylogger", "Trojan horse genérico", "Adware", "Rootkit"], respostaCorreta: 1,

    explicacao: "**Keylogger** e um tipo de spyware que registra todas as teclas pressionadas e envia ao atacante, capturando senhas, dados bancarios e qualquer texto digitado. Pode ser software (oculto no sistema) ou hardware (dispositivo fisico entre teclado e PC). Detectavel por antivirus atualizado." }


  // ── 50 QUESTÕES ORIGINAIS DE ALTO NÍVEL — Eletrotécnica (e60–e109) ──



  // Circuitos CA avançados

  { id: "e60", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um circuito RLC série tem R = 10 Ω, L = 50 mH e C = 200 μF, alimentado por fonte senoidal de 120 V (rms) e 60 Hz. A impedância total do circuito, em ohms, vale aproximadamente:",

    alternativas: ["10,0 + j0,0 Ω", "10,0 + j5,6 Ω", "10,0 − j5,6 Ω", "10,0 + j18,8 Ω", "10,0 − j18,8 Ω"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e61", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "No circuito RLC série da questão anterior (R=10Ω, XL≈18,85Ω, XC≈13,26Ω, V=120V rms), a corrente eficaz e o fator de potência valem, respectivamente, aproximadamente:",

    alternativas: ["10,6 A e 0,87 indutivo", "10,6 A e 0,87 capacitivo", "12,0 A e 1,00", "10,6 A e 0,74 indutivo", "8,5 A e 0,87 indutivo"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e62", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um circuito RC paralelo tem R = 100 Ω e C = 31,8 μF, alimentado por 220 V / 60 Hz. A corrente total fornecida pela fonte e o fator de potência do circuito valem, respectivamente:",

    alternativas: ["2,2 A e 1,00", "3,1 A e 0,71 capacitivo", "2,2 A e 0,71 capacitivo", "3,1 A e 0,71 indutivo", "2,2 A e 0,87 capacitivo"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e63", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um filtro passa-baixa RC tem R = 10 kΩ e C = 1 nF. A frequência de corte (−3 dB) desse filtro vale aproximadamente:",

    alternativas: ["1,59 kHz", "6,28 kHz", "15,9 kHz", "31,8 kHz", "159 kHz"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e64", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um circuito RL série tem R = 6 Ω e XL = 8 Ω, alimentado por 100 V (rms). As potências ativa (P), reativa (Q) e aparente (S) valem, respectivamente:",

    alternativas: ["600 W, 800 var, 1000 VA", "800 W, 600 var, 1000 VA", "60 W, 80 var, 100 VA", "600 W, 800 var, 600 VA", "1000 W, 0 var, 1000 VA"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e65", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma carga industrial de 500 kW opera com fator de potência 0,6 indutivo (sen φ1 = 0,8). Para elevar o FP para 0,9 indutivo (tg φ2 ≈ 0,484), a potência reativa do banco de capacitores necessária vale:",

    alternativas: ["157,8 kvar", "242,0 kvar", "399,8 kvar", "158,0 kvar", "484,0 kvar"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Sistemas trifásicos avançados

  { id: "e66", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma carga trifásica equilibrada ligada em triângulo tem impedância de fase Z = 30 + j40 Ω por fase. A fonte trifásica fornece tensão de linha de 220 V. A potência ativa total consumida pela carga vale:",

    alternativas: ["580,8 W", "968,0 W", "1742,4 W", "2904 W", "5808 W"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e67", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma carga trifásica equilibrada em estrela, com Z = 8 + j6 Ω por fase, é alimentada por fonte trifásica de 380 V de linha. A corrente de linha e a potência aparente total valem, respectivamente:",

    alternativas: ["21,97 A e 15.800 VA", "21,97 A e 25.312 VA", "38,0 A e 25.312 VA", "21,97 A e 14.473 VA", "12,7 A e 8.380 VA"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e68", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "Num sistema trifásico a 4 fios com fonte equilibrada de 127/220 V, a carga nas fases A, B e C é puramente resistiva: 10 Ω, 20 Ω e 20 Ω respectivamente. A corrente no neutro vale aproximadamente:",

    alternativas: ["0 A", "3,6 A", "6,35 A", "8,7 A", "12,7 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Eletrônica de potência

  { id: "e69", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um retificador monofásico de onda completa com ponte de diodos alimenta uma carga resistiva de 50 Ω a partir de um transformador com tensão secundária de 127 V (rms). Desprezando a queda nos diodos, a tensão média de saída e a corrente média na carga valem, respectivamente:",

    alternativas: ["90 V e 1,8 A", "114 V e 2,28 A", "127 V e 2,54 A", "180 V e 3,6 A", "57 V e 1,14 A"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e70", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um retificador trifásico de onda completa (6 pulsos) é alimentado por transformador com tensão de linha de 220 V (rms). Desprezando quedas nos diodos, a tensão média de saída CC vale aproximadamente:",

    alternativas: ["187 V", "257 V", "297 V", "324 V", "360 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e71", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em relação ao SCR (Silicon Controlled Rectifier), assinale a afirmativa CORRETA:",

    alternativas: [

      "O SCR conduz corrente nos dois sentidos quando o gate recebe pulso de disparo.",

      "Uma vez disparado, o SCR permanece em condução mesmo que o sinal de gate seja removido, enquanto a corrente de anode permanecer acima da corrente de manutenção (IH).",

      "O SCR é desligado aumentando-se a tensão de gate para um valor negativo.",

      "O SCR pode ser disparado apenas por tensão negativa no gate.",

      "O TRIAC é idêntico ao SCR, mas opera exclusivamente em corrente contínua.",

    ], respostaCorreta: 1,

    explicacao: "SCR: tiristor PNPN. Triggado por pulso de gate (gate do tipo tensao positiva), conduz mesmo apos remover o sinal. Interrompe apenas quando $$I_A < I_{hold}$$. CA: interrompido naturalmente a cada passagem por zero da tensao. CC: precisa de comutacao forcada (circuito de extincao). Aplicacoes: retificadores controlados, controladores de potencia." },



  { id: "e72", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "Qual a principal vantagem do IGBT (Insulated Gate Bipolar Transistor) em relação ao BJT de potência em conversores de frequência industriais?",

    alternativas: [

      "O IGBT suporta tensões de bloqueio muito mais baixas que o BJT.",

      "O IGBT tem frequência de chaveamento mais limitada que o BJT.",

      "O IGBT combina a alta impedância de entrada do MOSFET com a capacidade de condução de alta corrente do BJT, permitindo acionamento por tensão e chaveamento rápido.",

      "O IGBT não necessita de circuito de gate driver, ao contrário do BJT.",

      "O IGBT opera exclusivamente em corrente contínua.",

    ], respostaCorreta: 2,

    explicacao: "IGBT (Insulated Gate Bipolar Transistor): gate isolado (MOSFET) + juncao de saida bipolar (BJT). Resultado: controle por tensao (sem corrente de gate) + baixa queda de saturacao (1,5 V vs 4 V do MOSFET de potencia). Frequencia: 1-100 kHz. Amplamente usado em: inversores de frequencia para motores, UPS, carregadores de VE." },



  { id: "e73", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um inversor monofásico de onda quadrada opera com tensão CC de barramento de 400 V. A tensão de saída CA gerada tem valor de pico igual a 400 V. O valor eficaz (rms) dessa tensão de saída vale:",

    alternativas: ["282,8 V", "311,1 V", "380,0 V", "400,0 V", "565,7 V"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Instalações elétricas NBR 5410

  { id: "e74", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "De acordo com a NBR 5410, a seção mínima dos condutores de fase de circuitos terminais de iluminação é:",

    alternativas: ["0,5 mm²", "1,0 mm²", "1,5 mm²", "2,5 mm²", "4,0 mm²"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e75", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Segundo a NBR 5410, o condutor de proteção (PE) de um circuito cujo condutor de fase tem seção de 16 mm² deve ter seção mínima de:",

    alternativas: ["6 mm²", "10 mm²", "16 mm²", "25 mm²", "50% da seção de fase"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e76", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma residência tem área total de 70 m². Conforme a NBR 5410, o número mínimo de circuitos de iluminação que deve ser previsto no projeto elétrico é:",

    alternativas: ["1 circuito", "2 circuitos", "3 circuitos", "4 circuitos", "5 circuitos"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e77", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Segundo a NBR 5410, a queda de tensão máxima admissível nos condutores de uma instalação elétrica residencial, medida entre o ponto de entrega e qualquer ponto da instalação, é:",

    alternativas: ["3%", "4%", "5%", "7%", "10%"], respostaCorreta: 3,

    explicacao: "NBR 5410:2004 §6.2.7 — Queda maxima nos circuitos terminais: $$\Delta V \leq 4\%$$ de $$V_n$$. Limite total origem-ponto mais desfavoravel: 7%. Formula: $$\Delta V\% = \dfrac{2\rho L I_b}{A V_n} \times 100$$. Para cobre: $$\rho = 1{,}72 \times 10^{-8}\,\Omega \cdot m$$." },



  { id: "e78", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "Conforme a NBR 5410, o dispositivo de proteção a ser instalado para proteger os usuários contra choques elétricos por contato indireto em circuitos de tomadas de banheiro é:",

    alternativas: ["Disjuntor termomagnético", "Fusível de alto rompimento", "Dispositivo DR 30 mA", "Dispositivo DR 300 mA", "DPS (Dispositivo de Proteção contra Surtos)"], respostaCorreta: 2,

    explicacao: "NBR 5410 — IDR 30 mA: obrigatorio em banheiros, chuveiros, areas externas, piscinas e TUG de cozinha/servico. IDR 300 mA: protecao geral contra incendio. 30 mA e o limiar fisiologico de seguranca — acima disso ha risco clinico de fibrilacao ventricular. Tempo de atuacao: $<$30 ms (antes de acumular energia critica no coracao)." },



  { id: "e79", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Para dimensionar a seção de um condutor de cobre com isolação PVC, instalado em eletroduto embutido em parede, conduzindo corrente de projeto de 28 A, o projetista deve utilizar a corrente de projeto corrigida pelos fatores de correção de temperatura e agrupamento. Supondo fator de correção total de 0,70, a corrente de referência para seleção da tabela de capacidade de condução é:",

    alternativas: ["19,6 A", "28,0 A", "33,6 A", "40,0 A", "56,0 A"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Dimensionamento e proteção

  { id: "e80", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico de 15 kW, 380 V, rendimento 92%, fator de potência 0,85, deve ser alimentado por um ramal. A corrente nominal do motor vale aproximadamente:",

    alternativas: ["23,8 A", "26,9 A", "29,3 A", "33,8 A", "38,1 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e81", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Para o motor da questão anterior (In ≈ 29,3 A), conforme a NBR 5410 e NR-10, a corrente de ajuste do relé térmico de proteção deve ser ajustada para:",

    alternativas: ["29,3 A exatamente", "Entre 100% e 115% de In (29,3 a 33,7 A)", "Entre 115% e 125% de In", "200% de In", "125% de In como valor fixo"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e82", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "A corrente de curto-circuito trifásico simétrica num ponto de uma instalação onde a tensão de linha é 380 V e a impedância total até o ponto é 0,05 + j0,08 Ω por fase vale aproximadamente:",

    alternativas: ["1.200 A", "1.583 A", "2.200 A", "2.741 A", "4.400 A"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e83", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "A integral de Joule (I²t), associada à energia que um condutor suporta durante uma falta, é fundamental no dimensionamento térmico de condutores. Para um condutor de cobre com isolação XLPE, seção de 35 mm², a corrente de curto-circuito máxima suportável durante 0,5 s vale aproximadamente: (use k = 143 para XLPE/cobre)",

    alternativas: ["7.070 A", "14.142 A", "21.213 A", "35.350 A", "50.050 A"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e84", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Na seletividade entre dois disjuntores em série (geral e de ramal), para que haja seletividade total, é necessário que:",

    alternativas: [

      "A corrente nominal do disjuntor geral seja igual à do ramal.",

      "A curva de disparo do disjuntor de ramal atue em toda a faixa de corrente ANTES do disjuntor geral, incluindo a zona de curto-circuito.",

      "Os dois disjuntores tenham a mesma corrente de curto-circuito de interrupção.",

      "O disjuntor geral tenha corrente nominal menor que o de ramal.",

      "Ambos os disjuntores sejam do tipo eletrônico para garantir a coordenação.",

    ], respostaCorreta: 1,

    explicacao: "Seletividade total: somente o dispositivo mais proximo da falta atua. Metodos: cronometrico (retardo intencional a montante), amperimetrico (patamares de corrente escalonados), energetico (disjuntores limitadores cortam antes do pico de corrente), por zona (diferencial de impedancia, nenhum retardo de tempo)." }



  // Aterramento e DPS

  { id: "e85", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "Voltis Original", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um sistema de aterramento TN-S, a característica fundamental é:",

    alternativas: [

      "O neutro e o condutor de proteção (PE) são o mesmo condutor em todo o sistema.",

      "Não existe neutro; toda a proteção é feita pelo PE.",

      "O neutro e o condutor de proteção são condutores separados em todo o sistema, desde a origem.",

      "O condutor de proteção é conectado à terra apenas no ponto de utilização.",

      "O sistema opera sem aterramento do neutro na fonte.",

    ], respostaCorreta: 2,

    explicacao: "TN-S: PE e N separados em toda a extensao → correntes de falta e harmonicas de 3a ordem nao fluem no PE → menor interferencia. TN-C: PEN economiza fio mas as correntes de 3a harmonica (que se somam no neutro trifasico equilibrado) circulam pelo PEN, podendo causar interferencia e sobreaquecimento em instalacoes com muitas cargas nao-lineares." },



  { id: "e86", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "A resistência de aterramento de uma haste de cobre de 2,4 m de comprimento e 16 mm de diâmetro, cravada verticalmente em solo com resistividade de 100 Ω·m, vale aproximadamente (fórmula de Dwight: R = ρ/(2πL) × [ln(4L/d) − 1]):",

    alternativas: ["8,5 Ω", "17,3 Ω", "25,8 Ω", "34,6 Ω", "51,9 Ω"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e87", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "Voltis Original", ano: 2023, dificuldade: "Médio",

    enunciado: "Os Dispositivos de Proteção contra Surtos (DPS) são classificados em três categorias (Tipo 1, 2 e 3). A instalação do DPS Tipo 1 é obrigatória em edificações:",

    alternativas: [

      "Com qualquer tipo de instalação elétrica interna.",

      "Protegidas por para-raios (SPDA), pois suporta a descarga direta de raio.",

      "Com mais de dois pavimentos.",

      "Apenas em subestações de alta tensão.",

      "Com geradores de energia próprios.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Medidas elétricas avançadas

  { id: "e88", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um wattímetro monofásico é ligado em um circuito com V = 220 V, I = 10 A e ângulo de fase de 60° entre tensão e corrente. A leitura do wattímetro é:",

    alternativas: ["2.200 W", "1.905 W", "1.100 W", "693 W", "380 W"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e89", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "O método dos dois wattímetros para medição de potência em sistemas trifásicos a 3 fios fornece as leituras W1 = 8 kW e W2 = 4 kW. A potência ativa total e o fator de potência do sistema valem, respectivamente:",

    alternativas: ["12 kW e 0,73", "4 kW e 0,50", "12 kW e 0,87", "8 kW e 1,00", "12 kW e 0,96"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e90", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "Um osciloscópio mostra uma tensão senoidal com amplitude de 3 divisões verticais, com a escala ajustada em 5 V/div. A frequência é de 2 divisões de período horizontal com escala de 1 ms/div. O valor eficaz da tensão e a frequência do sinal são, respectivamente:",

    alternativas: ["15 V e 1000 Hz", "10,6 V e 500 Hz", "15 V e 500 Hz", "10,6 V e 1000 Hz", "21,2 V e 500 Hz"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e91", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um medidor de energia elétrica (kWh) registra, ao longo de um mês (720 h), o consumo de uma carga de 10 kW operando com fator de potência 0,8. A energia ativa consumida e a energia reativa correspondente valem, respectivamente:",

    alternativas: ["7.200 kWh e 5.400 kvarh", "8.000 kWh e 6.000 kvarh", "7.200 kWh e 9.600 kvarh", "9.000 kWh e 6.750 kvarh", "7.200 kWh e 5.400 kvarh"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Máquinas elétricas avançadas

  { id: "e92", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico, 4 polos, 60 Hz, opera com escorregamento de 4%. A velocidade do campo girante, a velocidade do rotor e a frequência das correntes rotóricas valem, respectivamente:",

    alternativas: ["1800 rpm, 1728 rpm, 2,4 Hz", "1800 rpm, 1800 rpm, 0 Hz", "1500 rpm, 1440 rpm, 2,0 Hz", "1800 rpm, 1728 rpm, 4,0 Hz", "3600 rpm, 3456 rpm, 2,4 Hz"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e93", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico tem potência nominal de 30 kW, escorregamento nominal de 3% e perdas no rotor (P_r) proporcional a s×P_ag, onde P_ag é a potência no entreferro. As perdas no rotor e a potência mecânica desenvolvida valem, respectivamente:",

    alternativas: ["0,9 kW e 29,1 kW", "1,0 kW e 30,0 kW", "0,9 kW e 30,0 kW", "3,0 kW e 27,0 kW", "0,93 kW e 30,93 kW"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e94", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um gerador síncrono trifásico, ligação estrela, 5 MVA, 6,9 kV, tem resistência de armadura Ra = 0,1 Ω e reatância síncrona Xs = 1,5 Ω por fase. Operando a plena carga com fator de potência 0,8 indutivo, a tensão interna gerada (Ef) por fase vale aproximadamente:",

    alternativas: ["3.980 V", "4.250 V", "4.580 V", "4.900 V", "5.230 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e95", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um motor CC de excitação em derivação tem tensão de armadura de 240 V, resistência de armadura Ra = 0,5 Ω, resistência de campo Rf = 120 Ω e corrente de linha de 25 A. A corrente de armadura, a fem contraeletromotriz e o conjugado desenvolvido (para velocidade de 1200 rpm) valem, respectivamente:",

    alternativas: ["23 A, 228,5 V e 41,8 N·m", "25 A, 227,5 V e 45,5 N·m", "23 A, 230 V e 41,8 N·m", "22 A, 229 V e 40,2 N·m", "25 A, 240 V e 47,7 N·m"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e96", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um transformador monofásico de 50 kVA, 2.400/240 V apresentou no ensaio em vazio: V0 = 240 V, I0 = 5 A, P0 = 400 W. A corrente de excitação em percentual da corrente nominal de BT e as componentes ativa e magnetizante da corrente de excitação valem, respectivamente:",

    alternativas: ["2,4%, 1,67 A e 4,72 A", "2,4%, 2,50 A e 4,37 A", "24%, 1,67 A e 4,72 A", "2,4%, 1,67 A e 3,21 A", "10%, 5,00 A e 0 A"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Automação e CLP

  { id: "e97", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "Voltis Original", ano: 2023, dificuldade: "Médio",

    enunciado: "Na linguagem Ladder (diagrama de contatos), usada em CLPs conforme IEC 61131-3, o símbolo ─┤├─ representa:",

    alternativas: ["Bobina de saída (contato normalmente fechado)", "Contato normalmente aberto (NA)", "Contato normalmente fechado (NF)", "Bobina de saída (solenóide)", "Temporizador com retardo na energização"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e98", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um CLP monitora a temperatura de um forno industrial. O sensor PT100 fornece 4 mA a 0°C e 20 mA a 400°C. Se o módulo analógico do CLP lê uma corrente de 12 mA, a temperatura medida é:",

    alternativas: ["100°C", "150°C", "200°C", "250°C", "300°C"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e99", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um inversor de frequência opera um motor de indução trifásico de 4 polos em 45 Hz. Desprezando o escorregamento, a velocidade aproximada do rotor é:",

    alternativas: ["1.350 rpm", "1.440 rpm", "1.500 rpm", "1.800 rpm", "2.700 rpm"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e100", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "Um sistema SCADA (Supervisory Control And Data Acquisition) é usado em plantas industriais. A função principal das RTUs (Remote Terminal Units) nesse sistema é:",

    alternativas: [

      "Gerar os relatórios de produção do sistema.",

      "Armazenar o banco de dados histórico central.",

      "Coletar dados de campo (sensores, medidores) e transmiti-los ao servidor central, além de receber e executar comandos remotos.",

      "Exibir a interface gráfica (IHM) para o operador.",

      "Substituir os CLPs em todas as funções de controle.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // Questões conceituais avançadas e interdisciplinares

  { id: "e101", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um circuito RLC paralelo em ressonância, é CORRETO afirmar que:",

    alternativas: [

      "A impedância é mínima e a corrente da fonte é máxima.",

      "A impedância é máxima, a corrente da fonte é mínima e as correntes no indutor e capacitor podem ser muito maiores que a corrente da fonte.",

      "As correntes no indutor e capacitor são nulas.",

      "O circuito se comporta como resistência pura e a potência reativa é máxima.",

      "A frequência de ressonância é sempre 60 Hz, independente dos componentes.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e102", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um transformador monofásico de 10 kVA, 2400/240 V, tem reatância de dispersão total referida ao primário de 5 Ω e resistência total referida ao primário de 3 Ω. A impedância percentual de curto-circuito (Zcc%) vale:",

    alternativas: ["0,52%", "0,87%", "1,01%", "4,17%", "5,83%"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e103", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Num sistema trifásico equilibrado com cargas mistas: uma carga Y de 10 kW a FP 0,8 ind e uma carga Δ de 15 kW a FP 1,0, ambas alimentadas por 380 V (linha). A potência ativa total e a potência reativa total do sistema valem:",

    alternativas: ["25 kW e 7,5 kvar", "25 kW e 10 kvar", "25 kW e 7,5 kvar", "22 kW e 7,5 kvar", "25 kW e 0 kvar"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e104", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um gerador de indução (motor de indução operando como gerador, com escorregamento negativo) conectado à rede opera com s = −0,04. A velocidade do rotor e a frequência das correntes rotóricas valem, respectivamente:",

    alternativas: ["1728 rpm e 2,4 Hz", "1800 rpm e 0 Hz", "1872 rpm e 2,4 Hz", "1872 rpm e 4,0 Hz", "1800 rpm e 2,4 Hz"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e105", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma linha de transmissão de 100 km transmite 50 MW a 138 kV com fator de potência 0,9 indutivo. A corrente de linha e a potência reativa transmitida valem, respectivamente:",

    alternativas: ["233 A e 24,2 Mvar", "208 A e 24,2 Mvar", "233 A e 22,2 Mvar", "208 A e 22,2 Mvar", "233 A e 50 Mvar"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e106", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um conversor CC-CC do tipo Buck (abaixador) opera com tensão de entrada de 48 V, ciclo de trabalho D = 0,625 e opera em modo de condução contínua. A tensão de saída média vale:",

    alternativas: ["15 V", "24 V", "30 V", "36 V", "48 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e107", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um conversor CC-CC do tipo Boost (elevador) tem tensão de entrada de 12 V e ciclo de trabalho D = 0,6. A tensão de saída em modo de condução contínua vale:",

    alternativas: ["7,2 V", "20 V", "30 V", "48 V", "60 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e108", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um circuito alimenta uma carga resistiva de 4 kW em 127 V monofásico, através de condutores de cobre com resistividade ρ = 1,72×10⁻⁸ Ω·m, seção de 2,5 mm² e comprimento total (ida e volta) de 40 m. A queda de tensão percentual nos condutores vale aproximadamente:",

    alternativas: ["1,7%", "2,7%", "3,4%", "4,3%", "5,4%"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e109", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Segundo a NBR 5410, nas instalações elétricas de baixa tensão, o condutor neutro de um circuito monofásico a dois fios (fase + neutro) pode ser seccionado pelo dispositivo de proteção?",

    alternativas: [

      "Sim, sempre que o dispositivo também seccione o condutor de fase simultaneamente.",

      "Sim, o neutro pode ser seccionado independentemente da fase.",

      "Não, o neutro jamais pode ser seccionado em nenhuma hipótese.",

      "Sim, mas apenas em circuitos de iluminação.",

      "Não, exceto em circuitos de tomadas.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e110", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um circuito RLC série com R = 5 Ω, L = 25 mH e C = 100 μF é alimentado por 50 V (rms) / 60 Hz. A tensão eficaz sobre o capacitor vale aproximadamente:",

    alternativas: ["26,5 V", "53,0 V", "74,5 V", "106,2 V", "133,0 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e111", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Na partida estrela-triângulo de um motor de indução trifásico, comparando a partida em estrela com a partida direta em triângulo, a tensão de fase aplicada ao motor e a corrente de linha absorvida da rede são reduzidas, respectivamente, a:",

    alternativas: ["1/√3 e 1/3", "1/√3 e 1/√3", "1/2 e 1/4", "1/3 e 1/3", "1/√3 e 2/3"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e112", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "Voltis Original", ano: 2024, dificuldade: "Médio",

    enunciado: "No sistema de aterramento IT, amplamente usado em hospitais e blocos cirúrgicos, a principal vantagem em relação ao TN é:",

    alternativas: [

      "O neutro é solidamente aterrado, garantindo maior estabilidade de tensão.",

      "Uma primeira falta fase-terra não provoca corrente de falta perigosa nem interrompe o fornecimento, pois a fonte é isolada da terra.",

      "O sistema dispensa o uso de monitor de isolamento.",

      "O neutro e o PE são combinados em um único condutor (PEN).",

      "A tensão de fase é reduzida a zero em caso de falta.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e113", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "Voltis Original", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um no-break (UPS) online de dupla conversão tem potência nominal de 10 kVA com fator de potência de saída 0,9. A potência ativa máxima que pode fornecer e a corrente de saída em 220 V monofásico valem, respectivamente:",

    alternativas: ["9 kW e 40,9 A", "10 kW e 45,5 A", "9 kW e 45,5 A", "10 kW e 40,9 A", "9 kW e 50,0 A"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e114", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "Voltis Original", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma subestação abaixadora 138 kV / 13,8 kV tem transformador de 20 MVA e impedância percentual de 8%. A corrente de curto-circuito trifásico máxima no barramento de 13,8 kV vale aproximadamente:",

    alternativas: ["418 A", "836 A", "1.045 A", "10.450 A", "20.900 A"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e115", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "Voltis Original", ano: 2023, dificuldade: "Médio",

    enunciado: "O balanceamento de fases em uma instalação trifásica tem como principal objetivo:",

    alternativas: [

      "Aumentar a corrente no condutor neutro para melhorar a medição de energia.",

      "Garantir que todas as cargas operem com tensão contínua.",

      "Distribuir as cargas monofásicas igualmente entre as três fases, minimizando a corrente no neutro e reduzindo perdas.",

      "Aumentar o fator de potência de cada fase individualmente.",

      "Eliminar a necessidade do condutor de proteção (PE).",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },,



// 50 questões estilo CESPE/CESGRANRIO para append no questoes-data.ts



  { id: "e116", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico é chamado para avaliar a instalação elétrica de um consultório odontológico de 80 m², alimentado em 127/220 V trifásico. Durante a vistoria, observa que todos os circuitos terminais foram agrupados em único eletroduto (fator de agrupamento 0,70) e que não há dispositivos DR instalados. Com relação à proteção contra choque elétrico, a NBR 5410 exige, nesse tipo de estabelecimento de saúde:",

    alternativas: [

      "Apenas disjuntores termomagnéticos, dispensando o uso de dispositivos DR.",

      "Dispositivos DR de 300 mA em todos os circuitos, por ser ambiente de maior risco.",

      "Dispositivos DR de 30 mA nos circuitos de tomadas e iluminação, por ser local de uso especial com presença de pessoas em posição vulnerável.",

      "Apenas aterramento reforçado das carcaças, dispensando o DR.",

      "Dispositivo DR de 30 mA somente no circuito do maior equipamento.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e117", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma câmara frigorífica industrial é acionada por motor trifásico de 30 kW, 380 V, rendimento 94% e fator de potência 0,88 indutivo. Os cabos de cobre com isolação EPR operam em eletrocalha a 45°C (fator de correção de temperatura = 0,82). O disjuntor de proteção deve suportar a corrente de partida direta (Ip = 7 × In) sem atuar. Usando curva D, a corrente nominal do disjuntor deve ser de no mínimo:",

    alternativas: ["50 A", "63 A", "80 A", "100 A", "125 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e118", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Durante vistoria em subestação industrial, um engenheiro constata que um dos três capacitores de um banco trifásico ligado em triângulo (3 × 50 kvar = 150 kvar nominal) está em circuito aberto. A potência reativa total fornecida pelo banco nessa condição é de:",

    alternativas: ["100 kvar", "75 kvar", "50 kvar", "33 kvar", "0 kvar"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e119", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico realiza ensaio de polaridade em transformador monofásico 2.200/220 V conectando H1 a X1. Ao energizar o primário com 2.200 V e medir com voltímetro entre H2 e X2, obtém 1.980 V. Isso indica que o transformador tem polaridade:",

    alternativas: [

      "Aditiva, pois 1.980 V = 2.200 − 220.",

      "Subtrativa, pois a tensão medida é a diferença entre primário e secundário.",

      "Subtrativa, confirmada apenas se a leitura fosse 2.420 V.",

      "Aditiva, pois tensão abaixo de 2.200 V indica soma de tensões.",

      "Indeterminada com esse método de ensaio.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e120", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em planta industrial, sempre que um grande motor parte, o disjuntor de um circuito de iluminação de outro setor dispara indevidamente por subtensão transitória. Para resolver o problema sem alterar o circuito do motor, a solução tecnicamente mais adequada é:",

    alternativas: [

      "Substituir o disjuntor de iluminação por um de maior corrente nominal.",

      "Instalar estabilizador de tensão no circuito do motor.",

      "Substituir a partida direta por soft-starter ou Y-Δ, reduzindo a corrente de partida e consequentemente a queda de tensão transitória na rede.",

      "Aumentar a seção dos condutores do circuito de iluminação.",

      "Instalar capacitor em paralelo com o disjuntor de iluminação.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e121", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um sistema de telecomunicações opera banco de baterias de 48 V com retificador em modo de flutuação (float charge) a 54,5 V. Um técnico questiona se essa tensão indica defeito no retificador. A afirmativa correta é:",

    alternativas: [

      "O retificador está com defeito — tensão de flutuação deve ser igual à nominal (48 V).",

      "A tensão de 54,5 V é normal para baterias chumbo-ácido de 48 V (24 células × 2,27 V/célula), mantendo as baterias carregadas sem sobrecarregá-las.",

      "A tensão acima de 48 V danificará os equipamentos conectados.",

      "O retificador deve ser ajustado para 48 V exatos após carga completa.",

      "A tensão elevada indica sulfatação nas placas.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e122", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em área classificada Zona 1 (presença ocasional de atmosfera explosiva), um técnico questiona se pode usar eletrodutos metálicos como condutor de proteção (PE). De acordo com a NBR 5410 e NBR IEC 60079, essa prática é:",

    alternativas: [

      "Permitida, desde que os eletrodutos sejam de aço galvanizado com conectores aprovados.",

      "Proibida em qualquer instalação elétrica.",

      "Permitida em áreas normais, mas vedada em áreas classificadas, onde o PE deve ser condutor dedicado e contínuo dada a criticidade da proteção contra centelhas.",

      "Permitida se a resistência do eletroduto for inferior a 0,1 Ω.",

      "Indiferente, pois em áreas classificadas o aterramento não é obrigatório.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e123", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico utiliza TC 800:5 A para medir a corrente de um barramento de 13,8 kV. Ao conectar o instrumento, esquece de fechar o circuito secundário e deixa o TC com secundário em aberto por alguns segundos com o barramento energizado. A consequência mais provável é:",

    alternativas: [

      "O TC saturará o núcleo sem risco, pois a tensão secundária permanece em 5 A.",

      "Sem consequência prática, pois TC apenas mede corrente.",

      "O núcleo entrará em saturação profunda, gerando alta tensão no secundário (potencialmente milhares de volts), com risco de destruição do isolamento e choque grave no técnico.",

      "O TC atuará como transformador de tensão, elevando 13,8 kV para o secundário.",

      "A corrente no primário será interrompida automaticamente.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e124", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em linha de envase, o CLP controla uma bomba com botão de partida NA (BP), botão de parada NF (BPar) e contato de selo K1. Após pressionar e soltar BP, para que a bomba continue operando é necessário que:",

    alternativas: [

      "BP seja mantido pressionado continuamente.",

      "O contato de selo K1, em paralelo com BP, permaneça fechado, sustentando a bobina do contator energizada após soltar BP.",

      "BPar seja pressionado para travar o circuito.",

      "Um temporizador mantenha o contator energizado pelo tempo programado.",

      "O CLP envie pulso contínuo ao contator.",

    ], respostaCorreta: 1,

    explicacao: "O circuito de selo (auto-retenção) é o fundamento do comando elétrico: após soltar BP, o contato auxiliar NA do próprio contator (K1), ligado em paralelo com BP, mantém a bobina energizada. É o conceito de 'memória' no comando a relés — implementado em Ladder com instruções de SET ou contatos de auto-retenção." },



  { id: "e125", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma PCH eleva a tensão de 13,8 kV para 69 kV para transmissão de 8 MW por linha de 80 km, resistência 0,3 Ω/km por fase, FP = 0,92 indutivo. As perdas ôhmicas totais na linha valem aproximadamente:",

    alternativas: ["48 kW", "144 kW", "290 kW", "432 kW", "867 kW"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e126", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Ao reduzir a frequência de saída de um inversor de frequência de 60 Hz para 30 Hz em uma bomba centrífuga, o operador observa que a potência consumida caiu muito mais do que a metade. Esse comportamento é explicado pela lei de semelhança para bombas, segundo a qual a potência varia com:",

    alternativas: [

      "O quadrado da frequência.",

      "A frequência de forma linear.",

      "O cubo da frequência — ao reduzir para metade a rotação, a potência cai para 1/8 do valor original.",

      "A raiz quadrada da frequência.",

      "O inverso da frequência.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e127", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em projeto residencial de 180 m², o circuito exclusivo do chuveiro elétrico de 6.000 W / 220 V deve ter condutores de cobre, isolação PVC, embutidos em eletroduto, temperatura ambiente 30°C. A corrente de projeto e a seção mínima do condutor são, respectivamente:",

    alternativas: [

      "27,3 A e 4,0 mm²", "27,3 A e 6,0 mm²", "30,0 A e 4,0 mm²", "27,3 A e 2,5 mm²", "25,0 A e 4,0 mm²",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e128", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um multímetro em modo CA mede 127 V entre fase e neutro de uma instalação. Um osciloscópio conectado ao mesmo ponto mostra onda senoidal perfeita. O valor de pico a pico (Vpp) indicado pelo osciloscópio é:",

    alternativas: ["127 V", "179,6 V", "254 V", "311,1 V", "359,3 V"], respostaCorreta: 4,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e129", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor trifásico continuou girando após queima de um fusível de uma fase (single phasing), com aumento de corrente nas fases restantes e vibração anormal. A corrente nas fases íntegras aumentou porque:",

    alternativas: [

      "O motor passou a operar como gerador síncrono.",

      "O campo girante foi substituído por campo pulsante que exige mais corrente.",

      "O motor tentou manter a potência mecânica com apenas duas fases, elevando a corrente nas remanescentes — podendo queimar os enrolamentos em minutos sem proteção adequada.",

      "A reatância do motor diminuiu com a perda de uma fase.",

      "O motor entrou em ressonância mecânica.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e130", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "A concessionária notifica indústria por FP médio de 0,72 indutivo (abaixo do mínimo de 0,92 exigido pela ANEEL). A indústria consome 400 kW no período de ponta. Para corrigir para FP = 0,95 indutivo (tg φ1 = 0,964; tg φ2 = 0,329), a potência reativa do banco de capacitores necessária é:",

    alternativas: ["130 kvar", "187 kvar", "254 kvar", "386 kvar", "514 kvar"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e131", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um galpão industrial de 600 m² requer 500 lux para inspeção visual de peças (NBR ISO/CIE 8995-1). O projetista seleciona luminárias LED de 24.000 lm, Cu = 0,65 e Fm = 0,80. O número mínimo de luminárias é:",

    alternativas: ["24", "29", "36", "48", "58"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e132", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um transmissor de pressão 4–20 mA (0–10 bar) indica 8 mA no CLP, enquanto o manômetro local indica 2,5 bar. Verificando matematicamente: a leitura de 8 mA corresponde a:",

    alternativas: ["2,5 bar e há discrepância", "3,0 bar — o manômetro está errado", "2,5 bar — não há discrepância, ambos estão corretos", "4,0 bar — o transmissor está errado", "5,0 bar"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e133", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um soft-starter configurado com tensão de pedestal de 40% não consegue partir um motor acoplado a transportadora de minério de alta inércia, desligando por sobrecorrente. A causa e a solução corretas são:",

    alternativas: [

      "Rampa muito longa — reduzir tempo de rampa para 5 s.",

      "Tensão de pedestal alta — reduzir para 20% para diminuir a corrente.",

      "Tensão de pedestal de 40% gera torque de apenas 16% do nominal (T∝V²) — insuficiente para vencer a inércia estática. Deve-se aumentar o pedestal ou usar inversor de frequência com controle de torque.",

      "Soft-starter inadequado para alta inércia — substituir por partida direta.",

      "Rampa de 15 s é curta — aumentar para 60 s.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e134", inedita: true, areaGrande: "Eletrotécnica", assunto: "Grandezas elétricas e magnéticas", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um transformador de 300 kVA opera com 60% da carga nominal, mas apresenta temperatura de óleo acima do esperado. A verificação revela tensão no primário de 15.180 V (10% acima da nominal). O aquecimento está relacionado à sobretensão porque:",

    alternativas: [

      "A corrente no secundário aumentou proporcionalmente à tensão.",

      "A sobretensão eleva o fluxo no núcleo, intensificando as perdas no ferro (histerese e Foucault), que crescem com potências da tensão entre 1,6 e 2,0 — causando aquecimento mesmo sem aumento de carga.",

      "O transformador passou a operar como reator, consumindo potência reativa.",

      "A tensão elevada reduz a corrente de magnetização.",

      "O óleo aumentou sua viscosidade com o excesso de tensão.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e135", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Novos motores instalados em uma indústria estão girando no sentido contrário ao esperado. A sequência de fases do barramento é RST. Para inverter o sentido de rotação de todos os novos motores simultaneamente, no painel que os alimenta, a solução mais eficiente é:",

    alternativas: [

      "Inverter a ligação do neutro com uma das fases.",

      "Trocar dois condutores de fase entre si no alimentador do painel (ex: R com S), invertendo a sequência de fases para todos os motores ligados.",

      "Aumentar a frequência da rede de 60 para 120 Hz.",

      "Trocar os três condutores de fase (R↔S↔T) no painel.",

      "Instalar capacitores em série com os enrolamentos.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e136", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Termografia em quadro industrial revela disjuntor trifásico de 100 A com temperatura de 78°C na fase central e 45°C nas laterais, com carga balanceada. A causa mais provável é:",

    alternativas: [

      "Sobrecarga — a fase central está acima da nominal.",

      "Defeito no sensor — diferenças de temperatura entre fases são impossíveis em carga balanceada.",

      "Conexão elétrica frouxa ou oxidada no terminal da fase central, gerando resistência de contato adicional e aquecimento localizado por efeito Joule.",

      "Fim de vida útil do disjuntor.",

      "A fase central sempre opera em temperatura mais elevada por irradiação das adjacentes.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e137", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um administrador deseja dobrar a autonomia de um UPS de 48 V de 15 para 30 minutos, conectando banco de baterias externo de 48 V em paralelo com as internas. A afirmativa correta sobre essa solução é:",

    alternativas: [

      "Inviável — baterias de mesma tensão não podem ser conectadas em paralelo.",

      "Viável, mas requer baterias do mesmo fabricante e lote.",

      "Viável, mas requer que o carregador do UPS tenha capacidade de corrente suficiente para carregar o banco ampliado — baterias em paralelo somam capacidade (Ah) mantendo a tensão.",

      "Dobrará a autonomia automaticamente, sem verificação adicional.",

      "Eleva a tensão para 96 V, podendo danificar o inversor.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e138", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em planta petroquímica, antes de transferência de líquidos inflamáveis entre tanques, exige-se conexão por cabos de equalização de potencial. Essa exigência tem como objetivo:",

    alternativas: [

      "Aumentar a resistência de aterramento para limitar correntes de falta.",

      "Garantir mesma tensão de alimentação entre equipamentos.",

      "Eliminar a diferença de potencial elétrico entre os equipamentos, prevenindo centelha por descarga eletrostática durante a transferência do líquido inflamável.",

      "Permitir que a corrente de curto-circuito flua pelos cabos em vez dos operadores.",

      "Medir a resistividade do líquido transferido.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e139", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um elevador com motor CC composto cumulativo, ao descer com carga máxima, a corrente de armadura inverteu o sentido. Isso ocorre porque:",

    alternativas: [

      "O motor entrou em curto-circuito interno.",

      "A fem da armadura superou a tensão da fonte, invertendo a corrente — a máquina operou como gerador, devolvendo energia à rede (frenagem regenerativa).",

      "O campo de excitação foi invertido pelo controlador.",

      "A carga gravitacional inverteu o sentido de rotação do motor.",

      "O disjuntor atuou e a corrente medida é apenas a de fuga.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e140", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Pelo método Aron (dois wattímetros), as leituras são W1 = 12 kW e W2 = −3 kW (negativa, com inversão dos terminais). O fator de potência da carga trifásica é aproximadamente:",

    alternativas: ["0,43", "0,58", "0,65", "0,78", "1,00"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e141", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Dois transformadores de 500 kVA em paralelo (mesma relação de transformação), T1 com Zcc% = 4% e T2 com Zcc% = 6%, alimentam carga total de 800 kVA. A carga assumida por cada transformador é:",

    alternativas: [

      "T1 = 400 kVA e T2 = 400 kVA",

      "T1 = 480 kVA e T2 = 320 kVA",

      "T1 = 320 kVA e T2 = 480 kVA",

      "T1 = 533 kVA e T2 = 267 kVA",

      "T1 = 267 kVA e T2 = 533 kVA",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e142", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "O temporizador TON de um CLP que controla uma válvula pneumática está atuando com atraso inconsistente (às vezes 5 s, às vezes 7 s ou 4 s). Preset configurado corretamente em 5 s. A causa mais provável é:",

    alternativas: [

      "O TON está com defeito — substituir.",

      "Preset incorreto na memória do CLP.",

      "Sensor com resposta intermitente, resetando o TON antes de completar a contagem — o TON reinicia toda vez que a entrada cai para 0 antes de completar o tempo.",

      "Bateria de memória fraca.",

      "Tensão de alimentação abaixo do especificado.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e143", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um relé diferencial (87) protege transformador Δ-Yn (Dy11). Para compensar o deslocamento angular de 30° entre primário e secundário e evitar atuação indevida em regime normal, a prática correta com relés digitais modernos é:",

    alternativas: [

      "Instalar transformador de fase externo.",

      "Aumentar o ajuste de pickup em 30%.",

      "Configurar o relé para o grupo vetorial Dy11 — o relé digital aplica a correção matemática de ângulo e magnitude internamente, eliminando a necessidade de ligação especial nos TCs que era necessária com relés eletromecânicos.",

      "Ligar os TCs do lado AT em triângulo para compensar a defasagem.",

      "Inverter a polaridade dos TCs do lado BT.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e144", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um ponto de recarga de veículo elétrico (EVSE) de 7,4 kW (220 V, 32 A) será instalado em garagem residencial. Segundo a NBR 5410 e recomendações técnicas para EVSE, o circuito deve:",

    alternativas: [

      "Ser compartilhado com o circuito de tomadas da garagem existente.",

      "Ser circuito exclusivo com condutor de 6 mm², disjuntor de 32 A e proteção DR Tipo A (sensível a corrente CC pulsante), pois inversores de carregamento podem gerar componente CC na corrente de falta.",

      "Usar condutor de 2,5 mm² com disjuntor de 32 A.",

      "Dispensar proteção DR, pois o veículo tem isolamento duplo.",

      "Ser dimensionado para 80% da corrente máxima do EVSE.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e145", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um amplificador de áudio apresenta na saída: fundamental 1 kHz (V1 = 100%), 2ª harmônica 2 kHz (V2 = 10%) e 3ª harmônica 3 kHz (V3 = 5%). A Distorção Harmônica Total (DHT) é aproximadamente:",

    alternativas: ["5,0%", "7,5%", "11,2%", "15,0%", "20,0%"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e146", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em uma usina solar de 500 kWp, um string apresenta tensão CC 15% abaixo dos demais. A causa mais provável é:",

    alternativas: [

      "O MPPT do inversor está com parâmetro incorreto — resetar resolverá.",

      "Módulos do string com sombreamento, degradação severa ou circuito aberto, reduzindo a tensão total do string.",

      "Tensão 15% abaixo é comportamento normal em dias nublados.",

      "O cabo CC tem seção menor, causando maior queda resistiva.",

      "O inversor opera em modo noturno.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e147", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em hospital de grande porte, o disjuntor geral de um painel desligou toda uma ala — incluindo equipamentos de suporte de vida — ao atuar em falta num circuito terminal. Para corrigir a falha de seletividade sem substituir todos os disjuntores, a alternativa mais eficaz é:",

    alternativas: [

      "Aumentar a corrente nominal do DG.",

      "Substituir disjuntores terminais por fusíveis de menor calibre.",

      "Instalar disjuntores com ZSI (Zone Selective Interlocking) ou substituir o DG por um com retardo intencional ajustável (Short Time Delay), garantindo que apenas o disjuntor do ramal com falta atue rapidamente.",

      "Reduzir a corrente de curto instalando reatores em série.",

      "Reconfigurar a rede via CLP após qualquer atuação.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e148", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um TP para medição de faturamento tem especificação: '0,3 – 115/√3 kV – 115 V – 50 VA'. A classe de exatidão 0,3 significa que:",

    alternativas: [

      "O TP pode apresentar erro de relação de até 3% em qualquer condição.",

      "O TP garante erro de relação máximo de 0,3% e erro de fase máximo de 15 min de arco, na faixa de 25–100% da carga nominal, atendendo requisitos de medição de faturamento de alta precisão.",

      "A classe 0,3 indica 0,3 Ω de resistência de enrolamento.",

      "O erro é garantido apenas na carga nominal de 50 VA.",

      "A classe 0,3 é adequada apenas para proteção, não para faturamento.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e149", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Após comissionamento de controle PID de nível de um tanque, o nível oscila continuamente em torno do setpoint sem se estabilizar (hunting). A causa mais provável e o ajuste correto são:",

    alternativas: [

      "Kp muito baixo — aumentar para acelerar a resposta.",

      "Ti muito alto — diminuir para eliminar o erro estático.",

      "Kp muito alto — reduzir, pois o sistema está além do limite de estabilidade (ganho crítico), causando oscilação permanente.",

      "Ação derivativa ausente — adicionar ação D.",

      "Sensor com leituras invertidas — recalibrar.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e150", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Dois barramentos paralelos de uma subestação de 138 kV conduzem 500 A cada no mesmo sentido, separados por 50 cm. A força entre eles é atrativa ou repulsiva, e sua magnitude por metro de comprimento é (μ0 = 4π×10⁻⁷ H/m):",

    alternativas: [

      "Repulsiva, 0,2 N/m", "Atrativa, 0,2 N/m", "Repulsiva, 1,0 N/m", "Atrativa, 1,0 N/m", "Repulsiva, 2,0 N/m",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e151", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um alimentador trifásico 380 V abastece: motor 15 kW (FP=0,85, η=92%), resistência 6 kW (FP=1,0) e iluminação 3 kW (FP=0,95). Aplicando fatores de demanda (motor=0,80, resistência=0,70, iluminação=0,90), a corrente de projeto do alimentador é aproximadamente:",

    alternativas: ["32,5 A", "35,4 A", "42,5 A", "49,3 A", "55,1 A"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e152", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um analisador de qualidade registra THD de corrente de 35% e fator de potência de deslocamento de 0,95 indutivo. O fator de potência total (verdadeiro), considerando deslocamento e distorção harmônica, é aproximadamente:",

    alternativas: ["0,95", "0,90", "0,85", "0,80", "0,63"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e153", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de indução 4 polos, 60 Hz, opera por inversor em 45 Hz com controle escalar (V/f constante). A tensão de saída do inversor para manter o fluxo magnético nominal deve ser:",

    alternativas: [

      "380 V — mesma tensão nominal",

      "285 V — proporcional à frequência: 380 × 45/60",

      "507 V — inversamente proporcional",

      "220 V — tensão de fase",

      "190 V — metade da nominal",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e154", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Laudo aponta resistência de aterramento de 42 Ω em planta com solo rochoso (acima dos 10 Ω recomendados pela NBR 5419). Sem espaço para hastes adicionais, a solução técnica para reduzir a resistência é:",

    alternativas: [

      "Cabos de maior seção para as descidas do para-raios.",

      "Tratamento químico do solo ao redor das hastes com compostos de sais minerais ou bentonita, reduzindo a resistividade local.",

      "Aumentar o comprimento dos cabos de aterramento.",

      "Instalar DPS adicionais no quadro geral.",

      "Conectar ao sistema de aterramento a tubulação de água.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e155", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Para alimentador de 200 m conduzindo 80 kW a 380 V trifásico (FP=0,9) com condutores de alumínio em vez de cobre (ρ_Al = 2,82×10⁻⁸ Ω·m; ρ_Cu = 1,72×10⁻⁸ Ω·m), a seção do alumínio equivalente a um cobre de 50 mm² é aproximadamente:",

    alternativas: ["50 mm²", "70 mm²", "95 mm²", "120 mm²", "150 mm²"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e156", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um TC de proteção tem denominação '5P20'. Esse código significa que:",

    alternativas: [

      "O TC tem 5 polos e suporta 20 A no secundário.",

      "O TC tem erro de relação máximo de 5% para correntes até 20 vezes a nominal, garantindo sinal proporcional aos relés de proteção mesmo em condições de falta severa.",

      "Opera em classe 5 apenas até 20% da carga nominal.",

      "Suporta 5 kA por 20 ms sem dano.",

      "O coeficiente de segurança é 5 e corrente máxima é 20 A.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e157", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um BESS (Battery Energy Storage System) de 500 kWh degradou de 500 para 462 kWh em 6 meses (degradação linear). A capacidade aproximada após 5 anos de operação será:",

    alternativas: ["420 kWh", "385 kWh", "350 kWh", "310 kWh", "275 kWh"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e158", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CA", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um analisador detecta tensão composta de: fundamental 60 Hz (V1 = 220 V rms) e 5ª harmônica (V5 = 22 V rms). O valor eficaz total e a THD de tensão são, respectivamente:",

    alternativas: [

      "242 V e 10%", "221,1 V e 10%", "220 V e 5%", "221,1 V e 5%", "242 V e 5%",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e159", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Após entrada de grande carga industrial, a frequência da rede caiu de 60,0 para 59,6 Hz. O regulador de velocidade dos geradores atua automaticamente sobre:",

    alternativas: [

      "A tensão de excitação do campo, aumentando-a para recuperar a frequência.",

      "A válvula de admissão de vapor ou água da máquina primária, aumentando a potência mecânica para acelerar o rotor e recuperar a frequência.",

      "O banco de capacitores, injetando potência reativa.",

      "O transformador elevador, aumentando a tensão de transmissão.",

      "O relé de frequência, desconectando cargas não prioritárias.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e160", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um sistema ESD usa configuração 1oo2 (1 de 2 sensores dispara o ESD). Após análise de risco, exige-se mudança para 2oo3 (2 de 3). A principal vantagem da configuração 2oo3 em relação à 1oo2 é:",

    alternativas: [

      "Maior segurança pois exige os 3 sensores para atuar.",

      "Eliminação de spurious trips (desligamentos por falha de um único sensor), mantendo alta disponibilidade ao mesmo tempo que garante atuação quando 2 de 3 sensores detectam o evento — equilibrando segurança e disponibilidade.",

      "Menor custo de implementação.",

      "Maior velocidade de resposta.",

      "Permite operar com sensor em falha sem risco adicional.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e161", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Inspeção em transformador 1 MVA 34,5/13,8 kV revela nível de óleo abaixo do mínimo, lama no fundo, índice de acidez de 0,45 mgKOH/g (limite: 0,30) e rigidez dielétrica de 22 kV/2,5mm (mínimo: 30 kV/2,5mm). A decisão técnica mais adequada é:",

    alternativas: [

      "Completar o nível com óleo novo e continuar operando.",

      "Substituir o transformador imediatamente.",

      "Retirar de operação para processamento completo do óleo (filtragem, degaseificação e secagem), com avaliação de substituição do óleo e vedações — ambos os parâmetros estão fora dos limites aceitáveis.",

      "Adicionar inibidor de oxidação e continuar com monitoramento semanal.",

      "Reduzir a carga para 50% e monitorar mensalmente.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e162", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "A substituição de motor IE1 (η=93,5%) por IE3 (η=95,5%) de 90 kW, em operação de 6.000 h/ano a plena carga e custo de energia R$0,75/kWh, resulta em economia anual aproximada de:",

    alternativas: ["R$ 2.700", "R$ 5.400", "R$ 8.100", "R$ 10.800", "R$ 16.200"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e163", inedita: true, areaGrande: "Eletrotécnica", assunto: "Disjuntores e seletividade", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um disjuntor de 160 A tem Ics = 25 kA e Icu = 36 kA. A corrente de curto calculada no ponto é 18 kA. Com relação à adequação do disjuntor:",

    alternativas: [

      "Inadequado — Ics deve ser maior que Icu.",

      "Adequado apenas se o curto calculado for igual a Icu.",

      "Adequado — o curto calculado (18 kA) é menor que Ics (25 kA), garantindo que o disjuntor possa ser reutilizado após interrupção sem perda de desempenho.",

      "Subdimensionado — Icu deve ser igual ao curto calculado.",

      "Apenas Icu é relevante — Ics pode ser ignorado.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e164", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Ao substituir fluorescentes T8 (36 W, 2.600 lm, vida 10.000 h) por LED T8 (18 W, 2.000 lm, vida 50.000 h) em escritório, o gestor questiona a redução de iluminância. O técnico explica corretamente que:",

    alternativas: [

      "Houve redução de 23% na iluminância pois as LED têm menos lúmens.",

      "Não houve redução significativa — LED tem fator de manutenção (LMF) muito superior: após poucos anos, as fluorescentes já depreciaram significativamente enquanto as LED mantêm quase 100% do fluxo inicial.",

      "A iluminância aumentou 44% pois as LED consomem menos energia.",

      "A redução de lúmens é compensada pelo melhor IRC das LED.",

      "A iluminância é independente do fluxo luminoso.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e165", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Controlador PID de pH (setpoint 7,0) está com saída de 12 mA quando o processo atingiu o setpoint (erro = zero). Um técnico questiona se o controlador está com defeito. A afirmativa correta é:",

    alternativas: [

      "O controlador está com defeito — saída deveria ser 0 mA quando erro é zero.",

      "O controlador opera corretamente — a saída de 12 mA é o ponto de operação (bias) necessário para manter o pH no setpoint em regime permanente; a ação integral zerou o erro estático e estabilizou na dosagem de equilíbrio.",

      "O sensor de pH está descalibrado.",

      "A ação integral está com ganho alto, causando windup.",

      "O controlador está em modo manual com saída fixada em 12 mA.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },,



  // ── 50 QUESTÕES ESTILO CESPE/CESGRANRIO ──────────────────────────────

  // Assuntos misturados: Eletrotécnica, Eletrônica, Telecomunicações



  { id: "e236", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico é solicitado a dimensionar o circuito exclusivo de um chuveiro elétrico de 5.500 W / 127 V, instalado em banheiro residencial com o quadro de distribuição a 12 m. A NBR 5410 limita a queda de tensão máxima em circuitos terminais a 3%. Adotando condutores de cobre em eletroduto embutido em alvenaria, sem agrupamento significativo, e usando a resistividade ρ = 0,0172 Ω·mm²/m, qual seção comercial atende SIMULTANEAMENTE ao critério de corrente E ao critério de queda de tensão?",

    alternativas: [

      "2,5 mm² — corrente nominal ≈ 43 A, e a queda de 3,6% excede o limite.",

      "4,0 mm² — suporta a corrente com fator de segurança, mas a queda de 2,3% excede o limite.",

      "6,0 mm² — atende à corrente (capacidade ≥ 40 A em eletroduto) e resulta em queda de ≈ 1,8%, dentro do limite.",

      "6,0 mm² — atende à corrente, mas a queda de 4,1% excede o limite de 3%.",

      "10,0 mm² — é a seção mínima que atende aos dois critérios simultaneamente.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e237", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Durante vistoria em edificação comercial, o fiscal constata que um único disjuntor bipolar de 25 A protege simultaneamente o circuito de tomadas da sala de reuniões e o de iluminação do corredor. A fundamentação técnica CORRETA para a autuação, com base na NBR 5410, é:",

    alternativas: [

      "A norma proíbe disjuntores bipolares em circuitos monofásicos de edificações comerciais.",

      "A corrente nominal de 25 A está abaixo do mínimo exigido pela norma para circuitos comerciais.",

      "A norma exige que cada circuito terminal tenha seu próprio dispositivo de proteção, de forma que a atuação em um não interrompa os demais.",

      "O problema é exclusivamente a ausência do dispositivo DR — a proteção conjunta é aceita quando há DR.",

      "Circuitos de iluminação e tomadas só podem ser protegidos por fusíveis tipo NH.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e238", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre o dispositivo de proteção a corrente diferencial-residual (DDR), analise as afirmativas:\n\nI. O DDR protege contra choques por contato direto, contato indireto e correntes de fuga que causam incêndios.\nII. O condutor de proteção (PE) NÃO deve passar pelo núcleo toroidal do DDR.\nIII. DDR de 300 mA é de alta sensibilidade e adequado para proteção de pessoas em banheiros.",

    alternativas: [

      "Apenas I e II estão corretas.",

      "Apenas II está correta.",

      "I, II e III estão corretas.",

      "Apenas III está correta.",

      "Todas estão incorretas.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e239", inedita: true, areaGrande: "Eletrotécnica", assunto: "Dimensionamento elétrico", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Três motores trifásicos (In: 42 A, 29 A e 15 A) são instalados em um mesmo eletroduto com fator de agrupamento Fa = 0,70. A corrente de projeto para dimensionamento do condutor do motor de 42 A é:",

    alternativas: ["29,4 A", "42,0 A", "52,5 A", "60,0 A", "86,5 A"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e240", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico de 30 kW, 380 V, 4 polos, 60 Hz (s_nominal = 3,3%) apresenta: velocidade medida = 1.710 rpm, corrente de linha = 62 A (nominal: 57 A) e temperatura de carcaça = 95 °C. A conclusão técnica CORRETA é:",

    alternativas: [

      "Operação normal — variações de ±10% em corrente e velocidade são aceitáveis pela IEC.",

      "Escorregamento de 5%, corrente 8,7% acima do nominal e temperatura elevada indicam sobrecarga mecânica — verificar a carga acoplada.",

      "Velocidade de 1.710 rpm indica operação como gerador — o motor injeta energia na rede.",

      "O problema é elétrico — a tensão está abaixo do nominal, causando aumento de corrente.",

      "Temperatura de 95 °C está dentro do limite da classe F (155 °C) — o motor pode operar indefinidamente.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e241", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma bomba centrífuga é acionada por motor de 55 kW. A corrente de partida direta é 7 × In, causando queda de tensão de 12% no barramento. Para reduzir a corrente de partida para ≤ 3 × In mantendo conjugado de partida adequado à bomba (conjugado resistente praticamente nulo na partida), o método mais indicado é:",

    alternativas: [

      "Partida estrela-triângulo — reduz corrente de linha a 1/3 e torque a 1/3 da partida direta.",

      "Soft-starter com rampa de tensão ajustável — permite limitar a corrente a ≤ 3 × In e ajustar o torque de partida.",

      "Autotransformador no tap 65% — reduz corrente de linha a 42% da partida direta.",

      "Inversor de frequência — parte o motor à frequência zero com torque constante igual ao nominal.",

      "Resistores em série com o estator — reduzem a corrente sem alterar o torque de partida.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e242", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre as classes de eficiência IE de motores (IEC 60034-30 / NBR 17094), analise:\n\nI. A classe IE3 (Premium) tem eficiência superior à IE2 e é obrigatória no Brasil para motores acima de determinada potência em novas instalações.\nII. Substituir um motor IE1 por IE3 de mesma potência não requer revisão da proteção elétrica.\nIII. Motores de maior eficiência tendem a apresentar menor corrente de partida relativa (Ip/In) que motores IE1 de mesma potência.",

    alternativas: [

      "Apenas I está correta.",

      "Apenas I e II estão corretas.",

      "Apenas II e III estão corretas.",

      "I, II e III estão corretas.",

      "Apenas I e III estão corretas.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e243", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica analógica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um amplificador inversor com AmpOp ideal, R1 = 10 kΩ e Rf = 100 kΩ. Para Vi = −0,5 V, Vo e o ganho de tensão Av valem, respectivamente:",

    alternativas: ["Vo = +5 V e Av = −10", "Vo = −5 V e Av = +10", "Vo = +5 V e Av = +10", "Vo = −5 V e Av = −10", "Vo = +0,05 V e Av = −0,1"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e244", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica analógica", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Em um amplificador emissor comum com BJT NPN, mede-se VCE = 0,15 V e IC = 8 mA, com VCC = 12 V e RC = 1,2 kΩ. O estado de operação do transistor e o efeito sobre o sinal amplificado são:",

    alternativas: [

      "Região ativa — amplificação linear com distorção mínima.",

      "Saturação — VCE < V_CE(sat) típico; o sinal de saída está clipado (distorcido) na tensão de saturação.",

      "Corte — IC = 0, nenhum sinal amplificado.",

      "Avalanche — VCE excede VCEO do dispositivo.",

      "Região ativa inversa — ganho < 1.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e245", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica analógica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um AmpOp real com SR = 1 V/μs é usado em amplificador não inversor de ganho 100. Para sinal senoidal de entrada com amplitude 1 V de pico e f = 20 kHz, o fenômeno que PRIMEIRO distorce o sinal de saída é:",

    alternativas: [

      "Tensão de offset de entrada (Vos = 5 mV) — introduz erro CC de 500 mV na saída.",

      "CMRR insuficiente — sinais de modo comum contaminam a saída.",

      "Slew rate: a taxa de variação necessária na saída (≈ 12,6 V/μs) supera o SR de 1 V/μs, causando distorção de slew.",

      "Corrente de polarização — cria queda de tensão nos resistores de realimentação.",

      "Produto ganho-banda excedido — o ganho de 100 não é suportado à frequência de 20 kHz.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e246", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um contador binário síncrono de 4 bits (módulo 16) parte de 0000. Após 13 pulsos de clock, o estado do contador e o número de pulsos adicionais para retornar a 0000 são:",

    alternativas: ["1101 e 3 pulsos", "1100 e 4 pulsos", "1101 e 2 pulsos", "0111 e 3 pulsos", "1011 e 5 pulsos"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e247", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Para implementar a função XOR (A⊕B) usando APENAS portas NAND de 2 entradas, o número mínimo de portas necessárias é:",

    alternativas: ["2", "3", "4", "5", "6"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e248", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Sobre conversores A/D (ADC), analise:\n\nI. ADC de 10 bits com fundo de escala 5 V tem resolução ≈ 4,88 mV por passo.\nII. Pelo teorema de Nyquist, a frequência de amostragem deve ser ≥ 2× a maior frequência do sinal.\nIII. O ADC por aproximações sucessivas é mais lento que o flash, mas usa menos comparadores.",

    alternativas: [

      "Apenas I está correta.",

      "Apenas II está correta.",

      "Apenas I e II estão corretas.",

      "I, II e III estão corretas.",

      "Apenas II e III estão corretas.",

    ], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e249", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma antena de rádio FM tem potência incidente de 10 kW e potência refletida de 1 kW. O coeficiente de reflexão de tensão |Γ|, o VSWR e a potência irradiada valem, respectivamente:",

    alternativas: ["|Γ|=0,316, VSWR=1,92 e 9 kW", "|Γ|=0,1, VSWR=1,22 e 9 kW", "|Γ|=0,316, VSWR=1,92 e 10 kW", "|Γ|=0,316, VSWR=2,50 e 9 kW", "|Γ|=0,1, VSWR=1,22 e 10 kW"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e250", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Enlace de 5 GHz com Pt = 0 dBW, Gt = 30 dBi, Gr = 30 dBi e d = 10 km. Usando FSPL(dB) = 92,4 + 20·log(f_GHz) + 20·log(d_km), a potência recebida é:",

    alternativas: ["−42,4 dBW", "−52,4 dBW", "−62,4 dBW", "−72,4 dBW", "−82,4 dBW"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e251", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre FM e AM, é CORRETO afirmar que:",

    alternativas: [

      "FM ocupa menos banda que AM para a mesma qualidade de áudio.",

      "AM é mais imune a ruído que FM, pois a informação está na amplitude.",

      "Na FM, a informação está na variação de frequência — ruídos de amplitude não alteram a informação, tornando a FM mais imune a ruído de amplitude que a AM.",

      "FM e AM operam nas mesmas faixas de frequência do espectro.",

      "A demodulação AM é mais complexa que a FM, pois exige discriminadores de frequência.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e252", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Fibra óptica monomodo com atenuação 0,3 dB/km, enlace de 80 km, 4 emendas de 0,2 dB e 2 conectores de 0,5 dB. Potência transmitida: +3 dBm. A sensibilidade mínima do receptor para operação correta deve ser:",

    alternativas: ["melhor que −18,2 dBm", "melhor que −21,2 dBm", "melhor que −24,2 dBm", "melhor que −27,2 dBm", "melhor que −30,2 dBm"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e253", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Ponte de Wheatstone com R1 = 1 kΩ, R2 = 2 kΩ e R3 = 1,5 kΩ está em equilíbrio (galvanômetro = 0). Rx e a interpretação do equilíbrio são:",

    alternativas: [

      "Rx = 3 kΩ — tensão zero no galvanômetro, sem circulação de corrente pelo mesmo.",

      "Rx = 750 Ω — correntes nos dois ramos são iguais.",

      "Rx = 3 kΩ — as quatro resistências são iguais.",

      "Rx = 750 Ω — tensão zero no galvanômetro.",

      "Rx = 1,5 kΩ — equilíbrio exige todas as resistências iguais.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e254", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um analisador de qualidade de energia registra: THD-V = 8%, fator de potência de deslocamento DPF = 0,95 e fator de potência verdadeiro TPF = 0,82. A conclusão CORRETA é:",

    alternativas: [

      "DPF e TPF medem a mesma grandeza — a diferença é irrelevante.",

      "THD-V de 8% está dentro do limite IEEE 519 para qualquer instalação.",

      "TPF < DPF indica presença significativa de harmônicos de corrente — as harmônicas aumentam a corrente aparente sem contribuir para potência ativa.",

      "Para corrigir TPF, basta instalar banco de capacitores, como para corrigir DPF.",

      "O fator de distorção de corrente deve ser zero para que TPF = DPF.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e255", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Transformador de 300 kVA encontrado com temperatura de óleo acima do normal: fator de carga 1,25, temperatura ambiente 42 °C, ventilador do radiador inoperante. O diagnóstico e ação imediata CORRETOS são:",

    alternativas: [

      "Temperatura elevada é normal em transformadores a óleo em carga — resfriamento não interfere.",

      "Reduzir a carga para no máximo o nominal e reparar a ventilação antes de qualquer novo carregamento acima do nominal.",

      "Com óleo em boas condições, o transformador suporta 25% de sobrecarga sem ventilação por tempo indefinido.",

      "Drenar e substituir o óleo imediatamente, sem necessidade de reduzir a carga.",

      "Transformadores Dyn11 são projetados para operar sem ventilação forçada em qualquer carga.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e256", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um transformador Dyn11 deve ser operado em paralelo com outro Yyn0. A principal restrição técnica é:",

    alternativas: [

      "Qualquer transformador trifásico pode ser operado em paralelo com tensões iguais.",

      "A diferença de grupo de ligação (11 vs. 0) implica defasagem de 30° entre os secundários — isso causa correntes de circulação elevadas mesmo sem carga, inviabilizando o paralelismo direto.",

      "A restrição é apenas de potência — o maior deve ser pelo menos o dobro do menor.",

      "O paralelismo é possível pois ambos têm neutro acessível no secundário.",

      "A única restrição é a sequência de fase, verificada com fasímetro.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e257", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Relé 51 ajustado com pickup = 5 A e TDS = 1. TC de relação 200:5. Corrente de falta no primário = 50 A. O múltiplo de corrente (M) no relé é:",

    alternativas: ["M = 0,25 e relé não atua", "M = 2,5 e relé atua lentamente", "M = 5,0 e relé atua em ≈ 5 s (curva NI)", "M = 10 e relé atua em < 1 s", "M = 50 e atuação instantânea"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e258", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Quando a frequência do SEP cai para 59,0 Hz e o governador da turbina responde automaticamente aumentando a abertura do distribuidor, esse comportamento corresponde a:",

    alternativas: [

      "Regulação primária de frequência — resposta automática e local do governador ao desvio de frequência.",

      "Regulação secundária (AGC) — ação do controlador automático de geração para restaurar a frequência ao nominal.",

      "Regulação terciária — despacho econômico pelo operador do sistema.",

      "Proteção de subfrequência — relé 81U desliga a unidade.",

      "Sincronização automática — o sincronizador ajusta a frequência para reconexão.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e259", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um controlador PID estabilizado no setpoint apresenta oscilação sustentada de pequeno período e amplitude elevada. A causa mais provável e a ação corretiva são:",

    alternativas: [

      "Ki muito alto (windup) — desativar a ação integral.",

      "Kp acima do ganho crítico — o sistema ficou instável. Reduzir Kp até eliminar as oscilações, depois reajustar Ki e Kd.",

      "Kd muito baixo — aumentar o Kd.",

      "Sensor com ruído — substituir o sensor.",

      "Integrador saturado — limpar o integrador.",

    ], respostaCorreta: 1,

    explicacao: "Oscilação sustentada com período pequeno e amplitude constante é a assinatura clássica do sistema no limiar de estabilidade — ganho proporcional Kp ≥ Ku (ganho crítico de Ziegler-Nichols). O sistema entra em 'oscilação de limite'. A ação corretiva primária é reduzir Kp. Esse comportamento é, inclusive, a base do método de sintonia de Ziegler-Nichols em malha fechada: induzi-se a oscilação sustentada para medir Ku e Pu, depois calculam-se os ganhos do PID." },



  { id: "e260", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um mestre Modbus RTU lê 3 registradores holding do escravo 17. Os valores retornados são 0x0064, 0x00C8 e 0x012C, representando temperatura em décimos de grau Celsius. As temperaturas reais são:",

    alternativas: ["1 °C, 2 °C e 3 °C", "10 °C, 20 °C e 30 °C", "100 °C, 200 °C e 300 °C", "0,1 °C, 0,2 °C e 0,3 °C", "64 °C, 200 °C e 300 °C"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e261", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Dois condutores paralelos a 5 cm de distância conduzem 20 A e 10 A no mesmo sentido. O campo B a 5 cm do condutor de 20 A e a força por unidade de comprimento sobre o condutor de 10 A valem:",

    alternativas: ["80 μT e 0,8 mN/m (atrativa)", "80 μT e 1,6 mN/m (atrativa)", "40 μT e 0,8 mN/m (repulsiva)", "80 μT e 0,8 mN/m (repulsiva)", "40 μT e 1,6 mN/m (atrativa)"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e262", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma bobina de L = 200 mH conduz corrente variando de 0 a 4 A em 10 ms. A fem induzida e a energia armazenada ao final valem:",

    alternativas: ["80 V e 1,6 J", "8 V e 0,16 J", "80 V e 0,16 J", "8 V e 1,6 J", "40 V e 0,8 J"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e263", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Capacitor de 470 μF, inicialmente descarregado, em série com resistor de 2,2 kΩ e fonte de 24 V CC. Tempo para a tensão atingir 90% de 24 V:",

    alternativas: ["0,47 s", "1,03 s", "1,59 s", "2,38 s", "3,14 s"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e264", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Indutor de 50 mH com resistência série de 10 Ω conectado a 100 V CC em t = 0. A corrente de regime permanente, a constante de tempo e a corrente em t = 5 ms são:",

    alternativas: ["10 A, 5 ms e 6,32 A", "10 A, 5 ms e 3,68 A", "100 A, 0,5 ms e 86,5 A", "10 A, 0,5 ms e 6,32 A", "5 A, 5 ms e 3,16 A"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e265", inedita: true, areaGrande: "Eletrotécnica", assunto: "NR-10", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre a NR-10 e trabalhos em instalações energizadas de alta tensão, analise:\n\nI. É obrigatório o uso de EPI e EPC adequados à tensão envolvida.\nII. Qualquer trabalhador com treinamento básico NR-10 pode executar serviços em instalações de AT energizadas.\nIII. A zona controlada é a área onde somente pessoal qualificado e autorizado pode atuar.",

    alternativas: [

      "Apenas I e III estão corretas.",

      "Apenas I e II estão corretas.",

      "I, II e III estão corretas.",

      "Apenas II está correta.",

      "Apenas III está correta.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e266", inedita: true, areaGrande: "Eletrotécnica", assunto: "NR-10", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Sobre trabalho em painel de 380 V energizado, o procedimento CORRETO segundo a NR-10 é:",

    alternativas: [

      "Qualquer trabalhador pode tocar partes energizadas a 380 V — baixa tensão tem risco mínimo.",

      "Serviços em instalações energizadas de BT só podem ser realizados por trabalhadores habilitados e autorizados, com uso de EPI adequados, e preferencialmente após desenergização (LOTO) do circuito a ser trabalhado.",

      "O desligamento do disjuntor geral é suficiente — não são necessários EPI específicos.",

      "A NR-10 permite que qualquer empregado realize serviços em 380 V desde que use luvas de borracha.",

      "Painéis de até 440 V dispensam medidas especiais de proteção.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e267", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em sistema trifásico com cargas equilibradas e correntes de fase com 3ª harmônica de 15 A e 5ª harmônica de 8 A, a corrente resultante no condutor neutro é aproximadamente:",

    alternativas: ["0 A — cargas equilibradas não geram corrente de neutro", "15 A", "45 A", "23 A", "8 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e268", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "O neutro do transformador de uma instalação com muitos computadores e drives está superaquecendo, apesar das correntes de fase dentro do limite nominal. Causa provável e solução:",

    alternativas: [

      "Fuga para terra — instalar DR resolve.",

      "Harmônicas de 3ª ordem geradas por cargas não lineares somam-se no neutro em vez de se cancelarem — dimensionar o neutro com seção 1,5 a 2× a fase e/ou instalar filtros de harmônicos.",

      "Transformador sobrecarregado — aumentar a potência nominal.",

      "Fator de potência baixo — banco de capacitores elimina o superaquecimento.",

      "Neutro subdimensionado para a corrente fundamental — substituir pelo mesmo cabo de fase.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e269", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um inversor de frequência reduz a frequência de 60 Hz para 30 Hz. Para manter o fluxo magnético do motor constante e evitar saturação ou subtensão de campo, a tensão de saída deve ser:",

    alternativas: [

      "Mantida em 380 V — a tensão deve sempre ser o valor nominal.",

      "Dobrada para 760 V — compensando a redução de frequência.",

      "Reduzida para 190 V — mantendo a razão V/f constante (controle escalar).",

      "Reduzida ao quadrado: a 30 Hz aplicar 95 V.",

      "A tensão não interfere no fluxo — apenas a corrente de campo importa.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e270", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Conversor Boost: Vin = 24 V, Vout = 48 V, Iout = 5 A, η = 90%. O duty cycle D, a corrente de entrada Iin e a potência de entrada Pin valem:",

    alternativas: ["D=0,5, Iin=10 A e Pin=240 W", "D=0,5, Iin=11,1 A e Pin=266,7 W", "D=0,75, Iin=10 A e Pin=240 W", "D=0,5, Iin=10 A e Pin=266,7 W", "D=0,75, Iin=11,1 A e Pin=266,7 W"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e271", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Pelo método de malhas: 10I1 − 4I2 = 20 e −4I1 + 8I2 = 0. I1, I2 e a tensão sobre o resistor de 4 Ω compartilhado (R = 4 Ω, com corrente I1−I2) valem:",

    alternativas: ["I1=2,5 A, I2=1,25 A e V4Ω=5 V", "I1=2,0 A, I2=1,0 A e V4Ω=4 V", "I1=3,0 A, I2=1,5 A e V4Ω=6 V", "I1=2,5 A, I2=1,25 A e V4Ω=4 V", "I1=2,0 A, I2=0,5 A e V4Ω=6 V"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e272", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "E1 = 60 V (r1 = 2 Ω) e E2 = 40 V (r2 = 3 Ω) em polaridades OPOSTAS na mesma malha, com carga RL = 10 Ω. A corrente na malha e a tensão sobre RL valem:",

    alternativas: ["1,33 A e 13,3 V", "1,33 A e 6,67 V", "2,0 A e 20,0 V", "6,67 A e 66,7 V", "0,67 A e 6,7 V"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e273", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Teorema de Thevenin: Vth = 24 V, Rth = 6 Ω. Para máxima transferência de potência, RL ótimo e P_max valem:",

    alternativas: ["RL=3 Ω e P_max=48 W", "RL=6 Ω e P_max=24 W", "RL=6 Ω e P_max=96 W", "RL=12 Ω e P_max=12 W", "RL=6 Ω e P_max=48 W"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e274", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um multímetro mede resistência de isolamento de 500 MΩ e resistência do condutor de 0,8 Ω. A interpretação CORRETA é:",

    alternativas: [

      "Cabo com defeito — resistência de isolamento abaixo de 1 GΩ indica falha.",

      "Condutor rompido — 0,8 Ω é excessivo para um cabo de qualidade.",

      "Isolamento íntegro (500 MΩ é excelente para BT) e condutor com continuidade normal (0,8 Ω é aceitável para o comprimento e seção).",

      "Medição de isolamento inválida — apenas megôhmetro de 500 V é aceito.",

      "Valores contraditórios — bom isolamento e resistência de condutor > 0,1 Ω são incompatíveis.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e275", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação industrial", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Galpão de 50 m × 30 m (1500 m²), iluminância de 300 lux, luminárias com Φ = 14.400 lm, Cu = 0,68 e Fm = 0,80. O número de luminárias necessárias é:",

    alternativas: ["46", "58", "82", "103", "124"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e276", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Sensor 4-20 mA, faixa 0-10 bar. Módulo ADC do CLP: 0 a 4095 (12 bits). CLP lê valor digital 2048. A pressão medida e a corrente do sensor são:",

    alternativas: ["5,0 bar e 12,0 mA", "4,88 bar e 11,96 mA", "5,0 bar e 12,0 mA — exatamente meio fundo de escala", "5,12 bar e 12,03 mA", "10,0 bar e 20,0 mA"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e277", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Sistema de CFTV analógico com cabo coaxial RG-59. Distância máxima: 300 m. Analisador mede atenuação de 18 dB. Para solucionar SEM substituir o cabeamento, a alternativa técnica CORRETA é:",

    alternativas: [

      "Aumentar a resolução das câmeras — mais resolução compensa a perda.",

      "Instalar amplificador/equalizador de vídeo ao longo do trecho para compensar a atenuação.",

      "Converter para IP — câmeras IP não sofrem atenuação.",

      "Reduzir a taxa de frames — menor largura de banda reduz a atenuação.",

      "Trocar conectores BNC por RJ-45.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e278", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica analógica", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Oscilador Colpitts: L = 10 μH, C1 = 100 pF, C2 = 400 pF. A frequência de oscilação e o β mínimo do transistor para que o circuito oscile são:",

    alternativas: ["7,12 MHz e β ≥ 4", "7,12 MHz e β ≥ 0,25", "14,24 MHz e β ≥ 4", "3,56 MHz e β ≥ 4", "7,12 MHz e β ≥ 16"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e279", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica digital", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Flip-flop JK sensível à borda de descida, com J=1 e K=1, estado inicial Q=0. Após 3 pulsos de clock completos, Q vale:",

    alternativas: ["Q=0", "Q=1", "Q indefinido", "Q oscila sem parar", "Depende do FF anterior em cascata"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e280", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração e transmissão", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Sobre as vantagens do HVDC (corrente contínua de alta tensão) em relação ao HVAC para transmissão de energia a longas distâncias, é CORRETO afirmar que:",

    alternativas: [

      "HVDC opera a 60 Hz, assim como o HVAC — perdas idênticas.",

      "HVDC não requer conversores — energia transmitida diretamente em CC.",

      "HVDC não tem efeito pelicular, não tem reatância de linha e não necessita de compensação reativa — viabiliza transmissões muito longas e interligações entre sistemas de frequências diferentes.",

      "HVDC é mais barato que HVAC em qualquer distância.",

      "HVDC usa três condutores como o HVAC trifásico.",

    ], respostaCorreta: 2,

    explicacao: "Vantagens reais do HVDC: (1) sem efeito pelicular — corrente distribui-se uniformemente na seção; (2) sem reatância indutiva — não há geração/absorção de reativos ao longo da linha; (3) sem limite de estabilidade transitória por ângulo de transmissão; (4) permite interligação de sistemas com frequências diferentes (60 Hz × 50 Hz). Desvantagem: custo elevado das estações conversoras (retificador/inversor). HVAC é mais econômico em distâncias curtas — o 'ponto de equilíbrio' é tipicamente 500-800 km para linhas aéreas." },



  { id: "e281", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica de potência", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Retificador de meia onda com filtro capacitivo: Vp = 20 V, RL = 1 kΩ, f = 60 Hz. Para ondulação (ripple) < 5% de Vp, a capacitância mínima é aproximadamente:",

    alternativas: ["33 μF", "100 μF", "167 μF", "333 μF", "1000 μF"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e282", inedita: true, areaGrande: "Eletrotécnica", assunto: "Circuitos elétricos", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Filtro LC passa-baixa com L = 10 mH e C = 10 μF. A frequência de corte (−3 dB) é aproximadamente:",

    alternativas: ["159 Hz", "503 Hz", "1590 Hz", "5030 Hz", "15900 Hz"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e283", inedita: true, areaGrande: "Eletrotécnica", assunto: "Telecomunicações", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Sobre multiplexação TDM e FDM, é CORRETO afirmar que:",

    alternativas: [

      "Na FDM, sinais compartilham o mesmo intervalo de tempo e são separados por frequência — usada no GSM.",

      "Na TDM, cada canal recebe um slot de tempo — base da telefonia digital PCM (E1/T1) e do GSM (TDMA).",

      "TDM é exclusiva de sistemas ópticos; FDM é exclusiva de radiofrequência.",

      "FDM e TDM são técnicas equivalentes — escolha por preferência do projetista.",

      "Na TDM síncrona, os slots são alocados dinamicamente conforme a demanda.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e284", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Medidor de demanda registra, em intervalo de 15 min: P = 920 kW e Q = 690 kvar. O fator de potência do intervalo e a demanda faturável pelo critério ANEEL (penaliza FP < 0,92, com D_fat = D_med × FP_ref/FP_med) valem:",

    alternativas: ["FP=0,800 e D_fat=920 kW", "FP=0,800 e D_fat=1.058 kW", "FP=0,920 e D_fat=920 kW", "FP=0,800 e D_fat=1.150 kW", "FP=0,920 e D_fat=1.058 kW"], respostaCorreta: 1,

    explicacao: "S = √(920²+690²) = √(846400+476100) = √1322500 = 1150 kVA. FP = P/S = 920/1150 = 0,800. Como FP < 0,92: D_fat = D_med × (0,92/0,80) = 920 × 1,15 = 1.058 kW. A indústria paga como se tivesse consumido 1.058 kW, não os 920 kW reais — o excesso de 138 kW é a 'penalidade' pelo baixo fator de potência." },



  { id: "e285", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma carga mista em sistema trifásico equilibrado de 380 V: carga Y de 10 kW a FP 0,8 ind e carga Δ de 15 kW a FP 1,0. A potência ativa total e a potência reativa total são:",

    alternativas: ["25 kW e 0 kvar", "25 kW e 7,5 kvar", "25 kW e 10 kvar", "22 kW e 7,5 kvar", "25 kW e 12,5 kvar"], respostaCorreta: 1,

    explicacao: "P_total = 10 + 15 = 25 kW. Carga Y: Q_Y = P × tan φ = 10 × (0,6/0,8) = 10 × 0,75 = 7,5 kvar. Carga Δ: FP = 1,0 → Q_Δ = 0. Q_total = 7,5 kvar. O FP da carga Δ de 1,0 é o 'distrator' — alguns candidatos calculam reativos para ela também, chegando a valores incorretos. Apenas a carga indutiva (FP < 1) contribui com potência reativa." },



  // ── 20 QUESTÕES ESTILO CESPE/CESGRANRIO — Técnico em Eletrotécnica/Eletrônica/Telecomunicações (e166–e185) ──



  { id: "e166", inedita: true, areaGrande: "Eletrotécnica", assunto: "NBR 5410 / Instalações", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico é chamado para avaliar a instalação elétrica de um restaurante comercial com área de 180 m², alimentado em 220 V bifásico (duas fases + neutro). Durante a vistoria, constata que todos os circuitos de tomadas estão protegidos por disjuntores de 20 A e condutores de 2,5 mm², sem dispositivo DR. O proprietário informa que o quadro está 'sempre desarmando' quando o forno combinado de 6 kW e a chapa elétrica de 4 kW são ligados simultaneamente no mesmo circuito. Analisando a situação, o técnico conclui CORRETAMENTE que:",

    alternativas: [

      "O problema é o disjuntor de 20 A, que deve ser substituído por um de 32 A para suportar a carga total de 10 kW.",

      "O circuito está sobrecarregado: a corrente conjunta dos dois equipamentos supera a capacidade do condutor de 2,5 mm² e do disjuntor de 20 A, exigindo circuitos exclusivos para cada equipamento de alta potência.",

      "Basta instalar um DR de 30 mA no circuito existente para eliminar os desarmamentos.",

      "O condutor de 2,5 mm² suporta até 25 A, portanto o problema está apenas no disjuntor subdimensionado.",

      "O desarmamento é causado pela ausência de aterramento nos equipamentos, e não por sobrecarga.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e167", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Durante manutenção preditiva em uma planta industrial, um técnico utiliza um alicate amperímetro e registra, em um motor de indução trifásico de 30 kW / 380 V / 4 polos / 60 Hz, as seguintes leituras: fase A = 68 A, fase B = 69 A, fase C = 42 A. A corrente nominal do motor é de 62 A. Com base nessas informações, a conclusão MAIS PROVÁVEL é:",

    alternativas: [

      "O motor está operando normalmente, pois a média das três fases (59,7 A) está abaixo da nominal.",

      "O motor está com defeito no rotor, pois a velocidade de rotação é diretamente proporcional ao desequilíbrio de corrente.",

      "Há desequilíbrio severo de correntes de fase, com a fase C apresentando valor significativamente inferior às demais, o que pode indicar falha em um contato do contator, cabo partido ou bobina do estator com defeito na fase C.",

      "O desequilíbrio é normal em motores acima de 20 kW e não requer ação imediata.",

      "A fase C está com sobrecarga e as fases A e B estão normais, pois 42 A está dentro da faixa nominal.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e168", inedita: true, areaGrande: "Eletrônica", assunto: "Amplificadores operacionais", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em um laboratório de calibração, um técnico monta um circuito amplificador inversor com amp-op ideal, utilizando resistor de entrada R1 = 10 kΩ e resistor de realimentação Rf = 47 kΩ. O sinal de entrada é uma senoide de 200 mV de amplitude e 1 kHz. Ao conectar o osciloscópio na saída, o técnico espera observar:",

    alternativas: [

      "Senoide de 940 mV de amplitude, em fase com a entrada, a 1 kHz.",

      "Senoide de 940 mV de amplitude, invertida (180° de defasagem) em relação à entrada, a 1 kHz.",

      "Senoide de 470 mV de amplitude, invertida em relação à entrada, a 1 kHz.",

      "Sinal contínuo de 940 mV, pois o amp-op retifica o sinal de entrada.",

      "Senoide de 940 mV, invertida, porém com frequência de 2 kHz devido à realimentação.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e169", inedita: true, areaGrande: "Telecomunicações", assunto: "Fibra óptica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma equipe de telecomunicações instala um enlace de fibra óptica monomodo de 40 km entre dois data centers. O orçamento de potência do enlace é calculado com potência de transmissão de +3 dBm, sensibilidade do receptor de −28 dBm e perda total admissível de 31 dB. Considerando atenuação da fibra de 0,35 dB/km e 6 emendas de fusão com perda média de 0,1 dB cada, a margem de sistema disponível após o enlace é:",

    alternativas: ["3,0 dB", "5,0 dB", "7,4 dB", "9,6 dB", "11,0 dB"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e170", inedita: true, areaGrande: "Eletrônica", assunto: "Transistores", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico de eletrônica analisa um circuito com transistor BJT NPN em configuração emissor-comum. Com VCC = 12 V, RC = 2,2 kΩ, VBE = 0,7 V e β = 100, a corrente de base necessária para saturar o transistor (VCEsat ≈ 0,2 V) é de 50 μA. O técnico aplica uma corrente de base de 80 μA. Nessa condição, o transistor:",

    alternativas: [

      "Opera na região ativa, com VCE = 12 − β × IB × RC = 12 − 100 × 80μ × 2200 = −5,6 V.",

      "Está saturado, pois IB aplicada (80 μA) supera IB mínima de saturação (50 μA), com VCE ≈ 0,2 V e o coletor operando como chave fechada.",

      "Está em corte, pois a corrente de base é insuficiente para polarizar o transistor.",

      "Opera na região ativa com IC = β × IB = 8 mA e VCE = 12 − 8m × 2200 = −5,6 V, indicando distorção.",

      "Está saturado, com IC real = β × IB = 8 mA circulando pelo coletor.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e171", inedita: true, areaGrande: "Eletrotécnica", assunto: "Proteção e seletividade", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em uma indústria de alimentos, o engenheiro responsável projeta o sistema de proteção de um alimentador de 380 V que supre três sub-quadros. O disjuntor geral (QG) tem ajuste de disparo temporizado em 0,4 s para correntes acima de 10 × In. Os disjuntores dos sub-quadros (QD1, QD2, QD3) são instantâneos com Ii = 8 × In. Durante um curto-circuito no barramento de QD2, ambos os disjuntores QG e QD2 atuaram simultaneamente, desligando também QD1 e QD3. O engenheiro conclui que houve falta de seletividade e que a causa MAIS PROVÁVEL é:",

    alternativas: [

      "O disjuntor QG estava com defeito e atuou antes do tempo ajustado.",

      "A corrente de curto-circuito foi tão elevada que atingiu a região de atuação instantânea do disjuntor QG, sobrepondo-se à zona seletiva, pois o ajuste instantâneo do QG não foi coordenado com o Ii dos disjuntores dos sub-quadros.",

      "Os disjuntores dos sub-quadros eram de corrente nominal maior que o QG.",

      "A seletividade só é possível com disjuntores eletrônicos, e os disjuntores termomagnéticos nunca são seletivos.",

      "A falta de seletividade ocorreu porque o neutro não estava aterrado no sub-quadro QD2.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e172", inedita: true, areaGrande: "Telecomunicações", assunto: "Redes e cabeamento", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um técnico de redes é solicitado a certificar o cabeamento estruturado de um edifício corporativo recém-construído. Ao testar um cabo UTP Cat 6 com certificador, obtém a seguinte reprovação: NEXT (Near-End Crosstalk) abaixo do limite mínimo no par 3-6. Ao analisar a instalação, o técnico identifica que o conector RJ-45 em uma das extremidades do cabo foi crimpado com o esquema T568A numa ponta e T568B na outra. Além da troca de esquema (que cria um cabo crossover), o técnico sabe que a causa MAIS PROVÁVEL da falha de NEXT é:",

    alternativas: [

      "O cabo crossover não afeta o NEXT; a falha é causada pela atenuação excessiva do cabo.",

      "A inversão dos esquemas descasou o trançamento dos pares no conector, aumentando a diafonia entre pares adjacentes na terminação — o NEXT é altamente sensível à qualidade da terminação e ao comprimento de par desemparelhado dentro do conector.",

      "O NEXT é um parâmetro exclusivo de cabos Cat 6A e não se aplica ao Cat 6.",

      "A falha de NEXT indica que o cabo tem comprimento superior a 90 m, limite máximo do canal.",

      "O certificador estava descalibrado, pois cabos Cat 6 sempre aprovam no NEXT.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e173", inedita: true, areaGrande: "Eletrônica", assunto: "Fontes de alimentação", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico de eletrônica é encarregado de substituir a fonte de alimentação linear de um equipamento de medição por uma fonte chaveada (SMPS) de mesma potência de saída (24 V / 5 A). O gerente de manutenção questiona a troca, alegando que fontes chaveadas 'geram muito ruído e vão interferir nas medições'. O técnico responde corretamente que:",

    alternativas: [

      "O gerente está correto — fontes lineares sempre apresentam menor ruído e toda troca por SMPS em equipamentos de medição é contraindicada.",

      "As SMPS modernas, com filtros EMI adequados e projeto correto, atingem níveis de ripple e ruído comparáveis às fontes lineares para a maioria das aplicações de medição, além de oferecerem maior eficiência energética, menor peso e menor dissipação térmica.",

      "O ruído de uma SMPS é sempre inferior ao de uma fonte linear, pois o chaveamento em alta frequência pode ser facilmente filtrado por capacitores pequenos.",

      "Fontes chaveadas só geram ruído em frequências abaixo de 1 kHz, faixa que não afeta equipamentos de medição.",

      "A troca é válida apenas se a frequência de chaveamento da SMPS for igual à frequência da rede (60 Hz).",

    ], respostaCorreta: 1,

    explicacao: "Fontes chaveadas geram ruído de modo comum e modo diferencial na frequência de chaveamento e seus harmônicos — isso é real. Porém, com filtros EMI (capacitores de bypass, indutores de modo comum), blindagem adequada e layout PCB correto, as SMPS modernas atingem ripple inferior a 50 mV pico a pico, suficiente para a maioria dos instrumentos. As vantagens (eficiência >85% vs. <60% das lineares, menor peso, menor temperatura de operação) justificam a troca na maioria dos casos. A alternativa c é atraente mas incorreta: o ruído chaveado em alta frequência é mais fácil de filtrar, mas não é 'sempre inferior'." },



  { id: "e174", inedita: true, areaGrande: "Eletrotécnica", assunto: "Correção de fator de potência", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma fábrica têxtil consome 800 kW com fator de potência de 0,65 indutivo. A concessionária cobra multa por FP abaixo de 0,92. O gerente de engenharia solicita ao técnico o dimensionamento do banco de capacitores para atingir exatamente FP = 0,92. Usando tan φ1 = 1,169 (FP=0,65) e tan φ2 = 0,426 (FP=0,92), a potência reativa do banco de capacitores necessária e a consequente redução na corrente de linha (sistema 380 V trifásico) são, respectivamente, aproximadamente:",

    alternativas: [

      "595 kvar e redução de 312 A para 215 A",

      "340 kvar e redução de 312 A para 215 A",

      "595 kvar e redução de 1.871 A para 1.289 A",

      "340 kvar e redução de 870 A para 637 A",

      "595 kvar e redução de 870 A para 637 A",

    ], respostaCorreta: 4,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e175", inedita: true, areaGrande: "Telecomunicações", assunto: "Sistemas de telefonia", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Um técnico de telecomunicações configura um PABX IP em uma empresa com 80 ramais. O gerente de TI questiona por que o técnico está reservando largura de banda de rede para as ligações VoIP, já que 'voz é um arquivo pequeno'. O técnico explica corretamente que:",

    alternativas: [

      "O gerente está correto — uma ligação VoIP consome menos de 1 kbps e não precisa de reserva de banda.",

      "Cada ligação VoIP com codec G.711 consome aproximadamente 64 kbps de payload, chegando a 87 kbps com overhead de RTP/UDP/IP, e exige QoS para garantir latência abaixo de 150 ms e jitter controlado — sem priorização, pacotes de voz concorrem com tráfego de dados e a qualidade degrada.",

      "VoIP usa o protocolo TCP, que garante entrega ordenada dos pacotes e elimina a necessidade de QoS.",

      "A reserva de banda é necessária apenas para videoconferência; chamadas de voz simples não são afetadas por congestionamento de rede.",

      "O codec G.711 comprime a voz a 8 kbps, tornando o consumo de banda desprezível mesmo sem QoS.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e176", inedita: true, areaGrande: "Eletrônica", assunto: "Sensores e transdutores", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma planta petroquímica monitora a temperatura de um vaso de pressão com sensor PT100 em configuração de 3 fios, conectado a um transmissor de temperatura com saída 4–20 mA para um CLP. O técnico de instrumentação nota que as leituras oscilam ±5°C aleatoriamente, mesmo com temperatura estável. Ao investigar, constata que o cabo do sensor percorre 80 m próximo a cabos de potência trifásicos de 440 V. A causa MAIS PROVÁVEL das oscilações e a solução CORRETA são, respectivamente:",

    alternativas: [

      "Variação real de temperatura no vaso; solução: instalar segundo sensor para confirmar.",

      "Interferência eletromagnética induzida pelos cabos de potência no cabo do sensor não blindado ou com blindagem não aterrada corretamente; solução: substituir o cabo por cabo blindado com blindagem aterrada em apenas um ponto (lado do painel) e separar fisicamente o cabo do sensor dos cabos de potência.",

      "O PT100 está fora da faixa de operação; solução: substituir por termopar tipo K.",

      "A configuração de 3 fios é inadequada para distâncias acima de 50 m; solução: migrar para configuração de 2 fios.",

      "O transmissor está descalibrado; solução: realizar zero e span com simulador de resistência.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e177", inedita: true, areaGrande: "Eletrotécnica", assunto: "Acionamento de motores", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma bomba centrífuga de 55 kW / 380 V, que opera 16 h/dia, é acionada por partida direta. O engenheiro propõe a instalação de um inversor de frequência (VFD) para controlar a vazão, atualmente controlada por válvula de estrangulamento. O gerente financeiro questiona o investimento. O técnico calcula que, com o VFD operando a 80% da rotação nominal durante 70% do tempo de operação, a economia de energia em relação ao estrangulamento é MAIS PRÓXIMA de (considere que a potência em bombas centrífugas varia com o cubo da rotação):",

    alternativas: [

      "Nenhuma — inversores de frequência consomem mais energia que válvulas.",

      "20% do consumo total, pois a redução de rotação de 20% reduz a potência em 20%.",

      "Aproximadamente 49% de economia no período de operação a 80% da rotação, pois P ∝ n³ → (0,8)³ = 0,512 da potência nominal.",

      "80% de economia total, pois o motor para completamente quando não é necessária vazão máxima.",

      "10% de economia, pois a eficiência do inversor (≈98%) já compensa a maioria das perdas.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e178", inedita: true, areaGrande: "Telecomunicações", assunto: "Antenas e propagação", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Uma estação de rádio base (ERB) de telefonia celular opera na faixa de 850 MHz com potência de transmissão de 40 W (46 dBm) e antena com ganho de 15 dBi. Um técnico calcula a PIRE (Potência Isotrópica Irradiada Equivalente) do sistema e verifica se atende ao limite de exposição humana. A PIRE do sistema vale:",

    alternativas: ["40 W", "55 W", "600 W", "1.260 W", "2.000 W"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e179", inedita: true, areaGrande: "Eletrônica", assunto: "Conversores A/D e D/A", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um sistema de aquisição de dados digitaliza sinais de vibração de uma turbina. O conversor A/D tem resolução de 12 bits e fundo de escala de ±5 V. Um engenheiro afirma que o sistema consegue detectar variações de vibração de 1 mV com precisão. O técnico de instrumentação discorda. A resolução (menor variação detectável) do conversor e a avaliação correta da afirmação do engenheiro são, respectivamente:",

    alternativas: [

      "2,44 mV por LSB; o engenheiro está correto, pois 1 mV < 2,44 mV e pode ser detectado por interpolação.",

      "2,44 mV por LSB; o engenheiro está incorreto — variações menores que 1 LSB (2,44 mV) não são representadas pelo conversor, sendo indistinguíveis do ruído de quantização.",

      "0,61 mV por LSB; o engenheiro está correto, pois a resolução é menor que 1 mV.",

      "2,44 mV por LSB; o engenheiro está correto se utilizar oversampling e filtragem digital.",

      "4,88 mV por LSB; o engenheiro está incorreto para qualquer método de processamento.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e180", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um técnico de qualidade de energia instala um analisador de rede em uma indústria e constata THD (Taxa de Distorção Harmônica) de corrente de 38% na entrada de um banco de retificadores trifásicos de 6 pulsos. O gerente de produção alega que 'harmônicos não afetam motores, só equipamentos eletrônicos'. O técnico discorda e aponta as consequências CORRETAS dos harmônicos elevados para o sistema elétrico:",

    alternativas: [

      "O gerente está correto — harmônicos de corrente só afetam equipamentos com fontes chaveadas.",

      "Harmônicos de corrente elevados causam apenas aumento da leitura do medidor de energia, sem outros efeitos.",

      "Harmônicos de corrente elevados causam aquecimento adicional em condutores (efeito pelicular e de proximidade), transformadores (perdas no núcleo e no cobre), motores (torques parasitas e aquecimento nos enrolamentos) e podem excitar ressonância com bancos de capacitores — afetando toda a instalação.",

      "A THD de 38% está dentro dos limites da IEEE 519 para qualquer nível de curto-circuito, não requerendo ação.",

      "O único efeito dos harmônicos é a redução do fator de potência, corrigível com banco de capacitores convencional.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e181", inedita: true, areaGrande: "Telecomunicações", assunto: "Modulação e transmissão", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico de radiocomunicação compara os sistemas AM-DSB (dupla banda lateral) e FM para transmissão de áudio em uma rádio comunitária. O diretor da rádio pergunta por que a FM tem qualidade sonora superior à AM, mesmo transmitindo o mesmo conteúdo. A explicação CORRETA do técnico é:",

    alternativas: [

      "A FM usa frequências mais altas, o que aumenta a velocidade de propagação do sinal e reduz a latência.",

      "A FM é imune a interferências de amplitude (ruídos atmosféricos e industriais), pois a informação está codificada na variação de frequência — não de amplitude. Além disso, o efeito captura da FM permite que o receptor 'trave' no sinal mais forte, rejeitando interferências.",

      "A AM transmite em faixa mais larga que a FM, processando mais informação por segundo e gerando áudio de maior qualidade.",

      "A FM tem maior alcance que a AM em VHF, o que reduz a necessidade de repetidores e melhora a qualidade recebida.",

      "A superioridade da FM se deve ao uso de modulação digital, ao contrário da AM que é sempre analógica.",

    ], respostaCorreta: 1,

    explicacao: "A FM (Frequency Modulation) codifica a informação na variação de frequência da portadora. Ruídos atmosféricos, industriais e de ignição afetam predominantemente a amplitude do sinal — o receptor FM os rejeita por meio do limitador de amplitude antes da detecção. O efeito captura (capture effect) faz o receptor FM 'travar' no sinal mais forte, rejeitando interferências de mesmo canal. A AM, por codificar em amplitude, é diretamente afetada por qualquer variação de amplitude no canal." },



  { id: "e182", inedita: true, areaGrande: "Eletrônica", assunto: "Diodos e retificadores", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Em uma bancada de manutenção, um técnico recebe uma fonte de alimentação linear com saída nominal de 12 V CC que está fornecendo 9,5 V. Ao medir com osciloscópio, observa ondulação (ripple) de 3 V de pico a pico na saída. O transformador e os diodos estão em bom estado. A causa MAIS PROVÁVEL e a solução CORRETA são:",

    alternativas: [

      "Diodo aberto no retificador de onda completa; substituir o diodo defeituoso.",

      "Transformador com fita secundária em curto; substituir o transformador.",

      "Capacitor eletrolítico de filtro com capacitância reduzida por degradação (perda de capacitância com a idade e temperatura); substituir o capacitor por outro de mesma capacitância e tensão de trabalho.",

      "Regulador de tensão (7812) defeituoso; substituir o CI regulador.",

      "Resistor de carga externo com valor incorreto causando queda de tensão excessiva.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e183", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações industriais", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico de segurança do trabalho e um eletricista discutem a instalação de tomadas em uma área classificada Zona 1 (presença ocasional de atmosfera explosiva) de uma refinaria. O eletricista propõe instalar tomadas industriais IP65 comuns, alegando que a proteção contra poeira e jato d'água é suficiente. O técnico de segurança discorda. A afirmação CORRETA é:",

    alternativas: [

      "O eletricista está correto — IP65 garante proteção suficiente contra explosão em Zona 1.",

      "Ambos estão incorretos — em Zona 1 não é permitida nenhuma tomada elétrica.",

      "O técnico de segurança está correto: em Zona 1, os equipamentos devem ser certificados Ex (à prova de explosão ou intrinsecamente seguros), com marcação ATEX/IECEx específica para o grupo de gás e classe de temperatura — o grau IP trata apenas de proteção contra sólidos e líquidos, não contra ignição de atmosferas explosivas.",

      "O IP65 é equivalente à certificação Ex d para fins de instalações em refinarias, conforme NBR IEC 60079.",

      "Em Zona 1, apenas equipamentos com IP68 são permitidos, independentemente de certificação Ex.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e184", inedita: true, areaGrande: "Telecomunicações", assunto: "CFTV e segurança eletrônica", banca: "CESPE (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um técnico de CFTV dimensiona o armazenamento para um sistema de 16 câmeras IP Full HD (1080p) com gravação contínua 24 h, taxa de compressão H.265 e bitrate médio de 2 Mbps por câmera. O armazenamento necessário para 30 dias de gravação é aproximadamente:",

    alternativas: ["518 GB", "1.035 GB", "2.160 GB", "6.480 GB", "12.960 GB"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e185", inedita: true, areaGrande: "Eletrônica", assunto: "Microcontroladores e sistemas embarcados", banca: "CESGRANRIO (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um técnico de eletrônica desenvolve um sistema embarcado com microcontrolador de 8 bits para controlar uma válvula proporcional. O sistema precisa gerar um sinal PWM com frequência de 1 kHz e resolução de duty cycle de 0,1% (1000 passos). O timer do microcontrolador opera com clock de 16 MHz. O valor do registrador de período (TOP) do timer e o prescaler mínimo necessários para atender às especificações são, respectivamente:",

    alternativas: [

      "TOP = 255 e prescaler = 1 (resolução de 8 bits é suficiente).",

      "TOP = 999 e prescaler = 16, com timer de 10 bits.",

      "TOP = 15.999 e prescaler = 1, exigindo timer de pelo menos 14 bits.",

      "TOP = 1.600 e prescaler = 10, com timer de 12 bits.",

      "TOP = 999 e prescaler = 1, com timer de 10 bits.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },







  // ── 30 QUESTÕES ESTILO CESPE/CESGRANRIO — e186–e215 ──



  { id: "e186", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um engenheiro fiscaliza a instalação elétrica de um supermercado com quadro principal a 60 m do ponto de entrega, alimentadores de cobre 35 mm² em eletrocalha, carga de 180 kW com FP 0,85 em 220/127 V trifásico. Ao calcular a queda de tensão, verifica que ela ultrapassa o limite normativo. Segundo a NBR 5410, o limite de queda nos alimentadores e a ação corretora MAIS ADEQUADA são, respectivamente:",

    alternativas: [

      "7% e substituição dos disjuntores por modelos de maior capacidade de interrupção.",

      "4% e aumento da seção dos condutores ou redução do comprimento do alimentador.",

      "7% e instalação de banco de capacitores para corrigir o fator de potência.",

      "3% e substituição da isolação PVC por XLPE.",

      "4% e instalação de regulador de tensão na entrada do quadro principal.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e187", inedita: true, areaGrande: "Eletrônica", assunto: "Amplificadores operacionais", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um técnico de instrumentação precisa amplificar o sinal de um termopar tipo J (0 a 50 mV) para a entrada de CLP (0 a 10 V) usando amplificador não-inversor com amp-op ideal. Para saída de 10 V com entrada de 50 mV, a relação Rf/R1 deve ser:",

    alternativas: [

      "Rf/R1 = 200, pois o ganho necessário é 10V/50mV = 200.",

      "Rf/R1 = 199, pois o ganho do não-inversor é (1 + Rf/R1) = 200.",

      "Rf/R1 = 200, pois no não-inversor o ganho é Rf/R1.",

      "R1/Rf = 199, pois o ganho é inversamente proporcional a Rf.",

      "Rf = R1, pois o ganho unitário é suficiente.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e188", inedita: true, areaGrande: "Telecomunicações", assunto: "Redes sem fio", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Um galpão industrial de 80x40m com estrutura metálica apresenta interferência severa em 2,4 GHz por fornos industriais. O gestor exige throughput mínimo de 300 Mbps por usuário. A solução MAIS ADEQUADA é:",

    alternativas: [

      "Instalar access points 802.11n na faixa de 2,4 GHz com canais 1, 6 e 11.",

      "Operar na faixa de 5 GHz com 802.11ac ou 802.11ax (Wi-Fi 5/6), com canais de 80/160 MHz, menor interferência industrial e throughput suficiente.",

      "Usar repetidores Wi-Fi 2,4 GHz em toda a extensão do galpão.",

      "Instalar único access point central de alta potência.",

      "Migrar para rede cabeada Cat 6.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e189", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Ensaio de curto-circuito em transformador de 10 kVA, 2400/240 V: Vcc = 120 V, Icc = 4,17 A, Pcc = 300 W. A resistência equivalente (Req) e a reatância equivalente (Xeq) referidas ao primário são:",

    alternativas: [

      "Req = 17,2 Ω e Xeq = 23,1 Ω",

      "Req = 28,8 Ω e Xeq = 17,2 Ω",

      "Req = 12,5 Ω e Xeq = 24,8 Ω",

      "Req = 23,1 Ω e Xeq = 17,2 Ω",

      "Req = 7,2 Ω e Xeq = 14,4 Ω",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e190", inedita: true, areaGrande: "Eletrônica", assunto: "Comunicação serial", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Comunicação RS-485 Modbus RTU entre CLP e inversor de frequência apresenta erros intermitentes durante aceleração do motor. O cabo de 120 m percorre junto a cabos de potência de 440 V. Causa MAIS PROVÁVEL e solução CORRETA:",

    alternativas: [

      "Baud rate incompatível; igualar o baud rate nos dois dispositivos.",

      "Interferência eletromagnética dos cabos de potência; usar cabo par trançado blindado com terminação de 120 Ω em ambas as extremidades e segregar fisicamente os cabos.",

      "Modbus RTU incompatível com inversores; migrar para Profibus.",

      "Distância de 120 m excede o limite do RS-485; instalar repetidor.",

      "Falha no endereçamento Modbus; reconfigurar o endereço escravo.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e191", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Resistência de aterramento de 4,2 Ω em subestação de 13,8 kV excede o limite de 1 Ω. O técnico propõe: (I) hastes em paralelo; (II) malha horizontal; (III) tratamento com bentonita. A avaliação CORRETA é:",

    alternativas: [

      "Apenas I é eficaz, pois hastes sempre reduzem a resistência proporcionalmente.",

      "III é ineficaz pois tratamentos químicos são proibidos pela NBR 7117.",

      "As três são válidas e complementares: hastes em paralelo, malha horizontal e tratamento do solo reduzem a resistência por mecanismos distintos e podem ser combinadas.",

      "Apenas II é eficaz para subestações de alta tensão.",

      "A resistência de 4,2 Ω é aceitável para 13,8 kV.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e192", inedita: true, areaGrande: "Eletrônica", assunto: "Filtros eletrônicos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Filtro passa-faixa para frequência intermediária de 455 kHz com largura de banda de 10 kHz em receptor AM. O fator Q e o tipo de filtro MAIS ADEQUADO são:",

    alternativas: [

      "Q = 4,55 e filtro RC passivo de primeira ordem.",

      "Q = 45,5 e filtro LC passivo ou cerâmica piezoelétrica — RC passivo não atinge Q elevado em 455 kHz.",

      "Q = 45,5 e filtro RC ativo com amp-op convencional.",

      "Q = 0,022 e filtro ativo de primeira ordem.",

      "Q = 45,5 e filtro digital com DSP.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e193", inedita: true, areaGrande: "Eletrotécnica", assunto: "NR-10", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Um eletricista recebe ordem verbal de supervisor para substituir disjuntor em painel energizado de 380 V porque 'a linha não pode parar'. Segundo a NR-10, essa situação é:",

    alternativas: [

      "Permitida com luvas de borracha classe 2 e supervisor presente.",

      "Permitida para tensões até 440 V conforme exceção da NR-10.",

      "Inadequada: serviços em instalações energizadas exigem Procedimento de Trabalho Específico (PTE) elaborado por profissional habilitado, análise de risco documentada e EPIs adequados. Autorização verbal não substitui o PTE.",

      "Permitida com curso básico de NR-10 de 40 horas.",

      "Proibida apenas acima de 1.000 V.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e194", inedita: true, areaGrande: "Telecomunicações", assunto: "Protocolos industriais", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um CLP envia pacotes UDP à porta 502 de um SCADA a cada 100 ms. O gerente questiona por que UDP e não TCP para comunicação crítica. A explicação CORRETA é:",

    alternativas: [

      "UDP foi escolhido por engano; comunicação industrial crítica deve usar TCP.",

      "Em redes industriais confiáveis com ciclos de 100 ms, a latência determinística do UDP é mais importante que a garantia de entrega do TCP. Dados perdidos são irrelevantes pois o próximo ciclo traz valores atualizados — o overhead de handshake e retransmissão TCP introduziria jitter inaceitável.",

      "Porta 502 é reservada exclusivamente para UDP pelo Modbus TCP.",

      "UDP é mais seguro pois não estabelece sessões interceptáveis.",

      "TCP não suporta comunicação com CLPs.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e195", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Após instalação de 12 inversores de frequência, o banco de capacitores de 300 kvar passa a apresentar disjuntores desarmando e aquecimento excessivo. O diagnóstico é ressonância harmônica. Solução MAIS ADEQUADA:",

    alternativas: [

      "Substituir capacitores por modelos de maior tensão.",

      "Remover o banco, pois é incompatível com inversores.",

      "Instalar reatores de dessintonia em série com o banco, deslocando a frequência de ressonância para fora da faixa das harmônicas dos inversores (5ª e 7ª ordem).",

      "Aumentar a capacitância para reduzir a impedância.",

      "Reduzir a frequência de chaveamento dos inversores.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e196", inedita: true, areaGrande: "Eletrônica", assunto: "Calibração de instrumentos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Calibração de transmissor de pressão 4-20 mA para 0-10 bar: 0 bar → 4,08 mA; 5 bar → 11,92 mA; 10 bar → 19,84 mA. O diagnóstico CORRETO é:",

    alternativas: [

      "Apenas erro de zero: leitura em 0 bar deslocada.",

      "Apenas erro de span: leitura em fundo de escala abaixo do esperado.",

      "Erro de zero (+0,08 mA) e erro de span (span real 15,76 mA vs esperado 16 mA), exigindo ajuste de zero e de span.",

      "Dentro da tolerância — variações de ±0,2 mA são aceitáveis.",

      "Erro de linearidade severo.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e197", inedita: true, areaGrande: "Telecomunicações", assunto: "Fibra óptica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "OTDR identifica perda de −1,8 dB em emenda de fusão a 23,4 km de um enlace monomodo. A avaliação CORRETA é:",

    alternativas: [

      "Normal — emendas de fusão têm perdas típicas de 1,5 a 2,5 dB.",

      "Elevada — fusões bem executadas têm perdas < 0,1 dB em fibras monomodo; 1,8 dB indica falha grave (desalinhamento, sujeira, bolha de ar), exigindo refusão.",

      "Aceitável apenas para fibras multimodo.",

      "Normal quando medido em direção oposta à transmissão.",

      "Esperada em emendas de campo.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e198", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Galpão de 40×20 m, iluminância de 500 lux (NBR ISO/CIE 8995-1). Luminárias LED de 200 W com 24.000 lm, fator de manutenção 0,8 e fator de utilização 0,6. Número mínimo de luminárias:",

    alternativas: ["14", "21", "35", "42", "56"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e199", inedita: true, areaGrande: "Eletrônica", assunto: "Lógica digital", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Alarme deve ativar quando: temperatura alta (T=1) E pressão alta (P=1), OU nível baixo (N=0) independente das demais. A expressão booleana CORRETA é:",

    alternativas: [

      "ALARM = T · P · N",

      "ALARM = T + P + N'",

      "ALARM = (T · P) + N'",

      "ALARM = T · (P + N')",

      "ALARM = (T + P) · N'",

    ], respostaCorreta: 2,

    explicacao: "Condição 1: T·P. Condição 2: N=0 → N'. União por OU: (T·P) + N'. Alternativa d [T·(P+N')] falha quando T=0 e nível está baixo. Alternativa b [T+P+N'] ativa com T ou P isoladamente, contrariando a especificação da condição 1." },



  { id: "e200", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores e acionamentos", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Motor de 22 kW, 380 V, rendimento 93%, FP 0,88. Corrente de partida direta = 6×In. A corrente nominal e a corrente de partida valem, respectivamente:",

    alternativas: ["38,5 A e 231 A", "41,3 A e 248 A", "44,5 A e 267 A", "47,8 A e 287 A", "57,8 A e 347 A"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e201", inedita: true, areaGrande: "Telecomunicações", assunto: "Sistemas de energia telecom", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Sala de equipamentos de telecom: carga de 8 kW em 48 VCC, banco de baterias VRLA para 4 horas de autonomia, eficiência do sistema 85%. Corrente de descarga e capacidade mínima do banco:",

    alternativas: ["167 A e 667 Ah", "190 A e 760 Ah", "167 A e 785 Ah", "222 A e 888 Ah", "190 A e 890 Ah"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e202", inedita: true, areaGrande: "Eletrônica", assunto: "Reguladores de tensão", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Regulador LM317 com R1 = 240 Ω (entre OUT e ADJ) e R2 = 2,4 kΩ (entre ADJ e GND). Tensão de referência interna de 1,25 V. A tensão de saída é:",

    alternativas: ["1,25 V", "2,50 V", "13,75 V", "14,75 V", "15,25 V"], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e203", inedita: true, areaGrande: "Eletrotécnica", assunto: "Proteção de sistemas elétricos", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Relé de sobrecorrente (51) com pickup de 200 A e curva extremamente inversa (EI), TDS=1. Para falta de 1.200 A, usando t = 28,2/(M²−1), o múltiplo M e o tempo de atuação são:",

    alternativas: ["M = 6 e t ≈ 0,81 s", "M = 6 e t ≈ 0,94 s", "M = 3 e t ≈ 3,52 s", "M = 6 e t ≈ 1,14 s", "M = 4 e t ≈ 1,76 s"], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e204", inedita: true, areaGrande: "Telecomunicações", assunto: "Redes ópticas GPON", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Rede GPON com 2,5 Gbps downstream compartilhados entre 64 clientes. Um cliente questiona o anúncio de 'até 1 Gbps' já que 2,5/64 = 39 Mbps. A resposta CORRETA é:",

    alternativas: [

      "O cliente está correto — velocidade anunciada é enganosa.",

      "A taxa de 2,5 Gbps é por ONU; cada cliente tem 2,5 Gbps dedicado.",

      "WDM fornece 1 Gbps dedicado a cada cliente.",

      "O DBA (Dynamic Bandwidth Allocation) aloca banda dinamicamente. Em horários normais, com poucos usuários ativos simultaneamente, 1 Gbps por usuário é alcançável. A velocidade 'até 1 Gbps' é a máxima individual, não garantida em horário de pico.",

      "A velocidade anunciada é a de upload.",

    ], respostaCorreta: 3,

    explicacao: "GPON é meio compartilhado com DBA alocando banda dinamicamente. Os 64 usuários raramente atingem capacidade máxima simultaneamente — em horários normais cada usuário pode alcançar próximo de 1 Gbps. 'Até 1 Gbps' é a velocidade máxima teórica individual, não garantida em pico — conforme contrato." },



  { id: "e205", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores de medida", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Para medir corrente de até 800 A em linha de 13,8 kV com amperímetro de 5 A, o TC correto e o cuidado OBRIGATÓRIO são:",

    alternativas: [

      "TC 800:5; o secundário pode ser aberto ao retirar o amperímetro.",

      "TC 800:5; o secundário NUNCA pode ser aberto com primário energizado — gera tensão de dezenas de kV que destrói o TC. Ao retirar o amperímetro, curto-circuitar o secundário.",

      "TC 160:5; o secundário pode ser aberto com segurança.",

      "TC 800:5; ao retirar o amperímetro, abrir o secundário para proteger o instrumento.",

      "TC 800:1; necessário para não sobrecarregar o amperímetro.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e206", inedita: true, areaGrande: "Eletrônica", assunto: "Protocolo I2C", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Sistema embarcado com ADC de 16 bits via I²C a 400 kHz (Fast Mode), taxa de 100 amostras/s. O tempo disponível por amostra e o tempo de transmissão de uma transação típica de leitura de 2 bytes são, respectivamente:",

    alternativas: [

      "10 ms por amostra e ~600 μs por transação.",

      "1 ms por amostra e ~60 μs por transação.",

      "10 ms por amostra e ~75 μs por transação, deixando ~9,925 ms livres por ciclo.",

      "100 μs por amostra, inviabilizando a taxa de 100 amostras/s.",

      "10 ms por amostra; I²C transmite em múltiplos de 32 bits, exigindo 4 bytes.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e207", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eficiência energética", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Quarenta motores de 5 cv (3,68 kW) operam 8 h/dia, 22 dias/mês com rendimento IE1 de 82%. Troca por IE3 (rendimento 91%) gera economia mensal de:",

    alternativas: ["1.240 kWh", "1.830 kWh", "2.480 kWh", "3.126 kWh", "4.920 kWh"], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e208", inedita: true, areaGrande: "Telecomunicações", assunto: "TV digital", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre o padrão ISDB-T adotado no Brasil (SBTVD), a afirmação CORRETA é:",

    alternativas: [

      "ISDB-T usa modulação COFDM com portadoras fixas de 8 MHz e não suporta recepção móvel.",

      "O Brasil adotou o padrão japonês ISDB-T com middleware Ginga para interatividade, BST-OFDM com 13 segmentos e One-Seg dedicado à recepção móvel/portátil.",

      "ISDB-T opera exclusivamente na faixa de 800 MHz.",

      "O ISDB-T foi desenvolvido integralmente no Brasil.",

      "One-Seg fornece resolução Full HD para dispositivos móveis.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e209", inedita: true, areaGrande: "Eletrotécnica", assunto: "SPDA", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Difícil",

    enunciado: "Descida do SPDA percorre 15 m paralela ao cabo de dados de um servidor. O risco é de sobretensão induzida. A medida MAIS ADEQUADA conforme NBR 5419 é:",

    alternativas: [

      "Instalar DPS Tipo 1 apenas no quadro de distribuição do andar.",

      "Afastar o cabo de dados do condutor de descida (distância calculada pela NBR 5419) ou instalar DPS nos equipamentos e usar cabo blindado ou fibra óptica no trecho paralelo.",

      "Substituir o captor Franklin por para-raios eletrônico.",

      "Instalar o cabo de dados em eletroduto de PVC.",

      "Situação aceitável desde que o SPDA esteja aterrado.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e210", inedita: true, areaGrande: "Eletrônica", assunto: "Retificadores", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "Retificador de meia onda com filtro capacitivo: Vpico = 20 V, f = 60 Hz, R = 1 kΩ, C = 470 μF. Desprezando queda no diodo, o ripple pico a pico é:",

    alternativas: ["0,35 V", "0,71 V", "1,41 V", "2,82 V", "5,64 V"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e211", inedita: true, areaGrande: "Eletrotécnica", assunto: "Tarifação de energia", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Empresa na modalidade tarifária Azul: demanda contratada 500 kW, medida na ponta 520 kW, fora de ponta 480 kW. Haverá cobrança de ultrapassagem porque:",

    alternativas: [

      "O consumo de energia na ponta ultrapassou o limite contratado.",

      "A demanda medida na ponta (520 kW) superou a contratada (500 kW) — a concessionária cobra tarifa punitiva (até 3×) sobre o excesso.",

      "A demanda fora de ponta ficou abaixo da contratada, gerando multa por subdeclaração.",

      "O fator de potência na ponta foi inferior a 0,92.",

      "A soma das demandas (1.000 kW) ultrapassou o dobro da contratada.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e212", inedita: true, areaGrande: "Eletrônica", assunto: "CLP Ladder", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Difícil",

    enunciado: "CLP deve contar 24 garrafas pelo sensor fotoeléctrico, acionar esteira por 5 s e reiniciar. A implementação Ladder CORRETA é:",

    alternativas: [

      "Bobina de saída diretamente ligada ao sensor.",

      "CTU incrementado pelo sensor (PV=24); ao atingir PV, aciona TON (PT=5s); ao fim do TON, reseta o CTU e desliga a esteira.",

      "Dois contadores em série de 12 cada.",

      "Sensor ligado à bobina da esteira com TOF de 5 s para desligar.",

      "TON de 5 s que ao término incrementa o contador.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e213", inedita: true, areaGrande: "Telecomunicações", assunto: "Segurança de redes industriais", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Tentativas de acesso à porta TCP 102 de um CLP S7-300 a partir de IP externo indicam tentativa de exploração do protocolo:",

    alternativas: [

      "Modbus TCP (porta 502).",

      "DNP3 (porta 20000).",

      "S7comm (porta 102/ISO-TSAP) — protocolo proprietário Siemens para CLPs S7, vetor de ataque do Stuxnet.",

      "OPC-UA (porta 4840).",

      "EtherNet/IP (porta 44818).",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e214", inedita: true, areaGrande: "Eletrotécnica", assunto: "Geração solar fotovoltaica", banca: "CESPE (estilo)", ano: 2024, dificuldade: "Médio",

    enunciado: "Sistema fotovoltaico de 50 kWp em região com irradiação de 5,2 kWh/m²/dia e Performance Ratio de 0,78. A geração mensal estimada (30 dias) é:",

    alternativas: ["5.928 kWh", "6.084 kWh", "7.800 kWh", "8.424 kWh", "10.140 kWh"], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e215", inedita: true, areaGrande: "Eletrônica", assunto: "Manutenção eletrônica", banca: "CESGRANRIO (estilo)", ano: 2023, dificuldade: "Médio",

    enunciado: "Capacitor eletrolítico com a parte superior abaulada em uma placa. Sem outros instrumentos, o técnico pode concluir:",

    alternativas: [

      "Capacitância aumentada pela pressão — manter o componente.",

      "Abaulamento normal em capacitores de alta capacitância.",

      "Capacitor defeituoso — abaulamento indica pressão interna excessiva (sobretensão, polaridade invertida, superaquecimento ou envelhecimento), com risco de ruptura. Substituir imediatamente.",

      "Excesso de eletrólito — pode ser drenado para recuperação.",

      "Curto-circuito interno — lê 0 Ω no ohmímetro.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ══════════════════════════════════════════════════════════════════════════

  // BLOCO DE 50 QUESTÕES INÉDITAS — ESTILO FGV / COMPESA-ELETROTÉCNICA 2024

  // Distribuição: 12 Português · 10 Informática · 8 Legislação · 20 Eletrotécnica

  // ══════════════════════════════════════════════════════════════════════════



  // ── LÍNGUA PORTUGUESA ───────────────────────────────────────────────────



  { id: "p13", inedita: true, areaGrande: "Português", assunto: "Interpretação de texto", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "Leia o texto a seguir e responda à questão.\n\n\"A manutenção elétrica industrial é uma atividade de alto risco que requer qualificação específica dos profissionais envolvidos. A negligência com os procedimentos de segurança pode resultar em acidentes graves e até fatais. Por isso, as empresas do setor energético investem continuamente em treinamentos e na atualização das práticas de trabalho seguro, visando não apenas cumprir as exigências legais, mas também preservar a integridade física de seus colaboradores.\"\n\nO principal objetivo do texto é:",

    alternativas: [

      "Criticar as empresas que não investem em treinamentos elétricos.",

      "Apresentar as exigências legais da NR-10 para trabalhadores.",

      "Destacar a importância da qualificação e da segurança na manutenção elétrica.",

      "Enumerar os tipos de acidentes mais frequentes em instalações industriais.",

      "Defender a criação de novas normas de segurança para eletricistas.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "p14", inedita: true, areaGrande: "Português", assunto: "Interpretação de texto", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Com base no mesmo texto: 'A negligência com os procedimentos de segurança pode resultar em acidentes graves e até fatais.'\n\nNo período acima, o termo 'até' desempenha a seguinte função:",

    alternativas: [

      "Indica adição de ideia semelhante à anterior.",

      "Introduz uma ideia oposta à apresentada antes.",

      "Reforça a gradação crescente de gravidade até o limite máximo.",

      "Indica concessão em relação ao termo anterior.",

      "Estabelece uma condição para que a consequência ocorra.",

    ], respostaCorreta: 2,

    explicacao: "'Até' aqui é uma partícula de inclusão com valor intensificador/gradativo: os acidentes vão de graves até fatais, indicando o grau máximo da escala. Função: gradação crescente — alternativa C." },



  { id: "p15", inedita: true, areaGrande: "Português", assunto: "Tipologia textual", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Leia: \"Os avanços tecnológicos têm transformado profundamente o setor elétrico. Equipamentos cada vez mais sofisticados substituem gradualmente sistemas obsoletos, aumentando a eficiência e a confiabilidade das instalações. No entanto, essa evolução também exige dos técnicos um processo contínuo de atualização e aprendizado.\"\n\nA relação semântica estabelecida pela expressão 'No entanto' é de:",

    alternativas: [

      "Causa e consequência.",

      "Adição de ideias equivalentes.",

      "Conclusão a partir do que foi exposto.",

      "Contraste ou adversidade em relação à ideia anterior.",

      "Condição necessária para a ideia seguinte.",

    ], respostaCorreta: 3,

    explicacao: "'No entanto' é conjunção adversativa — estabelece contraste: os avanços são positivos (eficiência), mas, por outro lado (contraste), também trazem a exigência de atualização. Alternativa D." },



  { id: "p16", inedita: true, areaGrande: "Português", assunto: "Vocabulário", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "Assinale a opção que apresenta comentário correto sobre um dos vocábulos sublinhados no trecho: 'A negligência com os procedimentos de segurança pode resultar em acidentes graves e até fatais.'",

    alternativas: [

      "'Negligência' é sinônimo de 'imprudência deliberada'.",

      "'Procedimentos' indica ações planejadas e sistematizadas.",

      "'Resultar' indica uma relação de causa entre acidentes e segurança.",

      "'Graves' e 'fatais' são antônimos nesse contexto.",

      "'Fatais' significa 'inevitáveis', independentemente de causas.",

    ], respostaCorreta: 1,

    explicacao: "'Procedimentos' refere-se a ações planejadas, sistematizadas, que seguem uma sequência definida — como os procedimentos de segurança de uma norma técnica. Alternativa B. 'Negligência' é falta de cuidado (não necessariamente deliberada). 'Resultar' indica consequência, não causa. 'Graves' e 'fatais' são gradação, não antônimos." },



  { id: "p17", inedita: true, areaGrande: "Português", assunto: "Concordância verbal", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Assinale a frase em que houve erro de concordância verbal.",

    alternativas: [

      "Os técnicos que executam serviços em alta tensão devem ter habilitação específica.",

      "A equipe de manutenção, junto com os supervisores, realizou o procedimento de bloqueio.",

      "Tanto o disjuntor quanto os fusíveis protegem o circuito contra sobrecarga.",

      "Nenhum dos eletricistas presentes havia recebido o treinamento da NR-10.",

      "Fazem dois anos que a empresa não registra acidentes com eletricidade.",

    ], respostaCorreta: 4,

    explicacao: "Na alternativa E, 'Faz' (singular) é o correto, pois quando 'fazer' indica tempo decorrido é impessoal e fica no singular: 'Faz dois anos...'. Usar 'Fazem' é erro de concordância. Nas demais, a concordância está correta." },



  { id: "p18", inedita: true, areaGrande: "Português", assunto: "Crase", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Assinale a opção em que o emprego do acento grave (crase) está correto.",

    alternativas: [

      "O técnico se dirigiu à bancada de testes com cuidado.",

      "Ficaram à espera de respostas à respeito do laudo.",

      "O relatório foi entregue à todos os supervisores.",

      "Referente à procedimentos de segurança, o manual está desatualizado.",

      "Às vezes o equipamento apresenta falha à noite, mas não à tarde.",

    ], respostaCorreta: 0,

    explicacao: "Na alternativa A, 'dirigiu-se à bancada' = 'dirigiu-se a + a bancada' — crase correta. Em B, 'à respeito' é errado (a respeito, sem crase). Em C, 'à todos' errado (a todos, sem crase — 'todos' é masculino plural). Em D, 'à procedimentos' errado (procedimentos é masculino). Em E, 'à noite' e 'à tarde' estão certos, mas 'à espera' na frase anterior seria correto — a frase E está correta, mas tem crase errada em B." },



  { id: "p19", inedita: true, areaGrande: "Português", assunto: "Regência verbal", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em relação à regência verbal, assinale a frase em que o uso da preposição está correto.",

    alternativas: [

      "O eletricista assistiu o treinamento sobre NR-10 com atenção.",

      "O supervisor informou aos técnicos sobre os novos procedimentos.",

      "A empresa visa o cumprimento das normas de segurança.",

      "O operador preferiu a chave estrela ao inversor de frequência.",

      "O técnico obedeceu as instruções do manual sem questionar.",

    ], respostaCorreta: 1,

    explicacao: "B está correta: 'informar algo a alguém' — 'informou aos técnicos'. Em A, 'assistir' no sentido de 'ver' rege 'a': 'assistiu ao treinamento'. Em C, 'visar' no sentido de 'almejar' rege 'a': 'visa ao cumprimento'. Em D, 'preferir' rege 'a': 'preferiu a chave a (ao) inversor'. Em E, 'obedecer' rege 'a': 'obedeceu às instruções'." },



  { id: "p20", inedita: true, areaGrande: "Português", assunto: "Tipologia textual", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "Leia: \"Se o disjuntor desligar repetidamente, verifique se a carga está dentro do limite nominal. Caso não esteja, redistribua os circuitos ou substitua o disjuntor por um de maior capacidade.\"\n\nEsse trecho pertence predominantemente ao tipo textual:",

    alternativas: [

      "Narrativo, pois relata uma sequência de eventos.",

      "Descritivo, pois apresenta as características do disjuntor.",

      "Argumentativo, pois defende a substituição do equipamento.",

      "Injuntivo/instrucional, pois orienta sobre como agir em uma situação.",

      "Expositivo, pois explica o funcionamento do disjuntor.",

    ], respostaCorreta: 3,

    explicacao: "O texto usa verbos no imperativo ('verifique', 'redistribua', 'substitua') e orienta o leitor sobre como proceder em uma situação — características do texto injuntivo ou instrucional. Alternativa D." },



  { id: "p21", inedita: true, areaGrande: "Português", assunto: "Vocabulário", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A frase em que o vocábulo 'corrente' tem sentido diferente do das outras é:",

    alternativas: [

      "A corrente elétrica no circuito primário é de 10 ampères.",

      "O amperímetro mediu a corrente de fuga para a terra.",

      "A corrente de partida do motor é seis vezes a nominal.",

      "O modelo vigente é a prática corrente nas instalações industriais.",

      "A corrente de curto-circuito pode danificar os condutores.",

    ], respostaCorreta: 3,

    explicacao: "Em A, B, C e E, 'corrente' significa fluxo de elétrons (grandeza elétrica). Em D, 'corrente' significa 'atual, comum, vigente' — sentido diferente dos demais. Alternativa D." },



  { id: "p22", inedita: true, areaGrande: "Português", assunto: "Pontuação", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Assinale a alternativa em que o uso da vírgula está incorreto.",

    alternativas: [

      "O técnico, após verificar o circuito, liberou o equipamento.",

      "Os equipamentos de proteção individual, como luvas e capacete, são obrigatórios.",

      "A NR-10, que regulamenta a segurança em eletricidade, é de cumprimento obrigatório.",

      "Terminada a manutenção, o eletricista retirou o cadeado de bloqueio.",

      "O supervisor autorizou o serviço, mas, o técnico não iniciou.",

    ], respostaCorreta: 4,

    explicacao: "Em E, a vírgula após 'mas' está incorreta. 'Mas' é conjunção adversativa que não deve ser separada por vírgula do elemento que introduz. O correto seria: 'mas o técnico não iniciou'. As vírgulas nas demais alternativas estão corretas (apostos, orações adjetivas e adjuntos adverbiais deslocados)." },



  { id: "p23", inedita: true, areaGrande: "Português", assunto: "Concordância verbal", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Assinale a opção que estabelece corretamente a correspondência entre a frase negativa e a afirmativa equivalente.",

    alternativas: [

      "Nenhum técnico foi reprovado. / Todos os técnicos foram aprovados.",

      "Jamais houve acidente nessa planta. / Sempre houve acidentes nessa planta.",

      "Nunca ninguém avisou sobre o perigo. / Todo mundo sempre avisou sobre o perigo.",

      "Não há nenhuma irregularidade. / Há alguma irregularidade.",

      "Nada funcionou após a queda de energia. / Tudo funcionou após a queda de energia.",

    ], respostaCorreta: 3,

    explicacao: "A negativa 'Não há nenhuma irregularidade' equivale à afirmativa 'Há alguma irregularidade' — a dupla negação se converte em afirmação parcial (existe pelo menos uma). As demais apresentam distorções: em A, reprovado ≠ aprovado necessariamente. Em B e C, as equivalências são corretas mas invertidas (jamais = nunca, sempre). Em E, a equivalência está correta." },



  { id: "p24", inedita: true, areaGrande: "Português", assunto: "Semântica", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Assinale a opção que apresenta erro na substituição da locução adjetiva pelo adjetivo equivalente.",

    alternativas: [

      "circuito de corrente alternada → circuito alternado.",

      "proteção de baixa tensão → proteção elétrica.",

      "instalação de emergência → instalação emergencial.",

      "cabo de alumínio → cabo aluminizado.",

      "resistor de carbono → resistor carbônico.",

    ], respostaCorreta: 1,

    explicacao: "Em B, 'proteção de baixa tensão' indica proteção destinada a circuitos de baixa tensão — o adjetivo equivalente seria 'proteção de baixíssima tensão' ou 'proteção para baixa tensão'. 'Proteção elétrica' é mais genérico e não preserva o sentido de 'baixa tensão'. A substituição em B é inadequada — alternativa B." },



  // ── INFORMÁTICA ─────────────────────────────────────────────────────────



  { id: "ic11", inedita: true, areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Em uma planilha MS Excel 2016, a célula A1 contém o valor 127 e a célula B1 contém o valor 220. Qual das fórmulas a seguir calcula a média entre os dois valores e verifica se ela é maior que 170, exibindo 'ALTA' em caso verdadeiro e 'NORMAL' em caso falso?",

    alternativas: [

      "=SE(MÉDIA(A1;B1)>170;\"ALTA\";\"NORMAL\")",

      "=SE(A1+B1/2>170;\"ALTA\";\"NORMAL\")",

      "=MÉDIA(SE(A1>170;A1;B1))",

      "=SE(A1>170;\"ALTA\";SE(B1>170;\"ALTA\";\"NORMAL\"))",

      "=SE(A1:B1>170;\"ALTA\";\"NORMAL\")",

    ], respostaCorreta: 0,

    explicacao: "Enderecos IP **privados** (RFC 1918): 10.0.0.0/8, 172.16.0.0/12 e **192.168.0.0/16**. O 192.168.1.100 pertence ao bloco 192.168.0.0/16 → privado, nao roteavelna Internet publica. Para acessar a Internet, o roteador faz NAT (Network Address Translation)." },


  { id: "ic12", inedita: true, areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "João criou uma planilha no MS Excel 2016 com os seguintes dados:\n\nA1: 'Corrente' | B1: 5\nA2: 'Tensão' | B2: 220\nA3: 'Resistência' | B3: (vazio)\n\nPara calcular a resistência (R = V/I) na célula B3, João deve usar a fórmula:",

    alternativas: [

      "=B2*B1",

      "=B1/B2",

      "=B2/B1",

      "=DIVISÃO(B2;B1)",

      "=B2÷B1",

    ], respostaCorreta: 2,

    explicacao: "Google Drive — tres niveis de permissao: **Leitor** (so visualiza, pode baixar salvo restricao); **Comentarista** (adiciona comentarios mas nao edita); **Editor** (edita, reorganiza e exclui). Compartilhamento 'qualquer pessoa com o link': nao e necessario ter conta Google para visualizar." },


  { id: "ic13", inedita: true, areaGrande: "Informática", assunto: "Processador de texto", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "No MS Word 2016, para inserir automaticamente a numeração de páginas no rodapé do documento, o usuário deve acessar:",

    alternativas: [

      "Guia 'Página Inicial' → Grupo 'Parágrafo' → 'Lista numerada'.",

      "Guia 'Inserir' → Grupo 'Cabeçalho e Rodapé' → 'Número de Página'.",

      "Guia 'Revisão' → 'Controlar Alterações' → 'Numeração'.",

      "Guia 'Layout' → 'Configurar Página' → 'Opções de Layout'.",

      "Guia 'Exibição' → 'Modos de Exibição' → 'Número de Página'.",

    ], respostaCorreta: 1,

    explicacao: "Word 2016: **Inserir > grupo Cabecalho e Rodape > Numero de Pagina**. Permite escolher posicao (margem superior, inferior, lateral) e formato (1,2,3 / i,ii,iii / A,B,C). Apos inserir, o Word ativa automaticamente o modo de edicao de cabecalho/rodape." },


  { id: "ic14", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um técnico recebeu um e-mail com o assunto 'Urgente: atualize seus dados bancários agora!' de um endereço semelhante ao de sua empresa, porém com domínio ligeiramente diferente. O link do e-mail levava a uma página com aparência idêntica ao portal interno. Esse tipo de ataque é conhecido como:",

    alternativas: [

      "Ransomware.",

      "Phishing.",

      "Worm.",

      "Keylogger.",

      "Backdoor.",

    ], respostaCorreta: 1,

    explicacao: "Email falso fingindo ser do banco = **Phishing**. Sinais: remetente com dominio diferente do banco oficial, urgencia ('sua conta sera bloqueada'), link para dominio diferente (verificar ao passar o mouse sem clicar). Nunca inserir credenciais em links recebidos por email." },


  { id: "ic15", inedita: true, areaGrande: "Informática", assunto: "Sistema operacional", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "No Windows 10, o atalho de teclado utilizado para copiar um arquivo selecionado é Ctrl+C e para colá-lo em outro local é Ctrl+V. Para desfazer a última ação realizada, o atalho é:",

    alternativas: [

      "Ctrl+D.",

      "Ctrl+X.",

      "Ctrl+Z.",

      "Ctrl+Y.",

      "Ctrl+A.",

    ], respostaCorreta: 2,

    explicacao: "O atalho para **copiar** e **Ctrl+C** (nao Ctrl+Z). Atalhos essenciais: Ctrl+X = Recortar, Ctrl+V = Colar, Ctrl+Z = **Desfazer**, Ctrl+Y = Refazer, Ctrl+S = Salvar. Mnemônico: C de Copy (copiar), X de Cut (recortar), V de paste (colar)." },


  { id: "ic16", inedita: true, areaGrande: "Informática", assunto: "Planilhas eletrônicas", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Em uma planilha MS Excel, a fórmula =PROCV(\"Motor\";A1:C10;3;FALSO) busca o valor 'Motor' na primeira coluna do intervalo A1:C10 e retorna o valor da:",

    alternativas: [

      "Primeira coluna do intervalo onde 'Motor' foi encontrado.",

      "Célula imediatamente à direita de onde 'Motor' foi encontrado.",

      "Terceira coluna do intervalo (coluna C) na linha onde 'Motor' foi encontrado.",

      "Linha 3 do intervalo A1:C10.",

      "Terceira ocorrência da palavra 'Motor' no intervalo.",

    ], respostaCorreta: 2,

    explicacao: "PROCV retorna o valor na coluna especificada da **linha onde encontrou** o valor procurado, e esse valor vai para a celula onde a formula esta digitada. PROCV(valor; tabela; coluna; FALSO): FALSO = correspondencia exata. Se nao encontrar, retorna #N/D." },


  { id: "ic17", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um técnico precisou acessar remotamente o computador de um colega para dar suporte. Para isso, utilizou um protocolo que permite a transmissão de tela e o controle remoto de forma criptografada. Esse protocolo é o:",

    alternativas: [

      "FTP.",

      "SMTP.",

      "SSH.",

      "HTTP.",

      "POP3.",

    ], respostaCorreta: 2,

    explicacao: "**SSH** (Secure Shell, porta 22): acesso remoto a linha de comando com criptografia. Substitui o Telnet (inseguro). Para acesso grafico remoto no Windows: RDP (porta 3389). Para transferencia de arquivos segura: SFTP ou SCP. SSH e o protocolo padrao para administracao remota de servidores Linux." },


  { id: "ic18", inedita: true, areaGrande: "Informática", assunto: "Processador de texto", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Analise as afirmativas sobre o MS Word 2016.\n\nI. O comando 'Ctrl+Shift+P' altera o tamanho da fonte selecionada.\nII. O 'Controle de alterações' registra inclusões, exclusões e formatações realizadas no documento.\nIII. A extensão padrão de arquivo ao salvar no Word 2016 é '.doc'.\nIV. O modo 'Layout da Web' mostra como o documento ficará ao ser impresso.\n\nEstá correto o que se afirma em:",

    alternativas: [

      "I e II, apenas.",

      "II, apenas.",

      "I, II e III, apenas.",

      "III e IV, apenas.",

      "I, II, III e IV.",

    ], respostaCorreta: 1,

    explicacao: "Afirmativa correta: **II apenas**. No Word 2016: Ctrl+L = **Localizar** (NAO salvar); Ctrl+S = Salvar. No Word em portugues do Brasil, negrito = Ctrl+N (NAO Ctrl+B). A afirmativa sobre Ctrl+L = salvar esta errada. Verificar as afirmativas I e III como falsas conforme o gabarito oficial." },


  { id: "ic19", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um programa malicioso se instalou no computador de uma empresa e criptografou todos os arquivos, exigindo pagamento em criptomoeda para liberar o acesso. Esse tipo de malware é classificado como:",

    alternativas: [

      "Spyware.",

      "Adware.",

      "Ransomware.",

      "Trojan.",

      "Rootkit.",

    ], respostaCorreta: 2,

    explicacao: "**Ransomware** criptografa arquivos com algoritmo forte (AES-256) e exige resgate em criptomoeda para fornecer a chave. Processo tipico: infeccao (phishing/vulnerabilidade) → comunicacao C&C → criptografia → nota de resgate. Prevencao: backup offline + atualizacoes + conscientizacao. Pagar nao garante recuperacao." },


  { id: "ic20", inedita: true, areaGrande: "Informática", assunto: "Conceitos básicos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Fácil",

    enunciado: "Considere as afirmativas sobre dispositivos de armazenamento.\n\nI. O HD (Hard Disk) armazena dados em discos magnéticos giratórios.\nII. O SSD (Solid State Drive) utiliza memória flash e não possui partes móveis.\nIII. O SSD é geralmente mais lento que o HD na leitura de dados.\nIV. O HD é mais suscetível a danos por impacto mecânico que o SSD.\n\nEstá correto o que se afirma em:",

    alternativas: [

      "I e II, apenas.",

      "II e III, apenas.",

      "I, II e IV, apenas.",

      "III e IV, apenas.",

      "I, II, III e IV.",

    ], respostaCorreta: 2,

    explicacao: "Afirmativas corretas **I, II e IV**: (I) SSD mais rapido que HDD; (II) Pen drives usam memoria flash NAND; (IV) HDDs podem ser afetados por campos magneticos. Afirmativa **III incorreta**: RAM e memoria **volatil** — perde conteudo sem energia eletrica. Armazenamento permanente e em disco (HDD/SSD/Flash)." }


  // ── LEGISLAÇÃO / NORMAS ─────────────────────────────────────────────────



  { id: "leg7", inedita: true, areaGrande: "Legislação", assunto: "NR-10", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "De acordo com a NR-10, a tensão máxima que define o limite superior da classificação Extra Baixa Tensão (EBT) para corrente alternada é:",

    alternativas: [

      "12 V.",

      "24 V.",

      "50 V.",

      "127 V.",

      "220 V.",

    ], respostaCorreta: 2,

    explicacao: "Lei 8.429/1992 — Atos de improbidade por **enriquecimento ilicito** (Art. 9): sancoes — suspensao dos direitos politicos por 8-10 anos; multa civil de ate 3x o valor do acrescimo patrimonial; ressarcimento integral; perda dos bens adquiridos ilicitamente; proibicao de contratar com o Poder Publico por ate 10 anos." },


  { id: "leg8", inedita: true, areaGrande: "Legislação", assunto: "NR-10", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Sobre o Procedimento de Bloqueio e Etiquetagem (LOTO — Lockout/Tagout) previsto na NR-10, analise as afirmativas.\n\nI. O bloqueio deve ser realizado com cadeado individual de cada trabalhador envolvido no serviço.\nII. Após aplicar o bloqueio, é dispensável verificar a ausência de tensão antes de iniciar o serviço.\nIII. A etiqueta de bloqueio deve conter o nome do responsável e o motivo do bloqueio.\nIV. O desbloqueio pode ser realizado por qualquer funcionário presente, independentemente de ter aplicado o bloqueio.\n\nEstá correto o que se afirma em:",

    alternativas: [

      "I e II, apenas.",

      "I e III, apenas.",

      "II e IV, apenas.",

      "III e IV, apenas.",

      "I, III e IV.",

    ], respostaCorreta: 1,

    explicacao: "CF/1988, Art. 37, II — **Concurso publico** obrigatorio para cargos/empregos efetivos da AP direta e indireta. Excecoes: cargos em comissao (livre nomeacao e exoneracao), funcoes de confianca (exclusivas para efetivos), cargos isolados de livre provimento por lei especifica." },


  { id: "leg9", inedita: true, areaGrande: "Legislação", assunto: "NR-10", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A carga horária mínima do Treinamento Básico para trabalhadores que interagem com instalações elétricas em Baixa Tensão, conforme a NR-10, é de:",

    alternativas: [

      "8 horas.",

      "16 horas.",

      "20 horas.",

      "40 horas.",

      "80 horas.",

    ], respostaCorreta: 3,

    explicacao: "Lei 8.112/1990, Art. 117 — Proibicoes ao servidor: ausentar-se do pais sem autorizacao; receber propina, comissao ou vantagem de qualquer especie; praticar usura; proceder deslealmente; atuar como procurador perante a propria reparticao que serve; receber valores pagos pelo erario para pagamento a terceiros." },


  { id: "leg10", inedita: true, areaGrande: "Legislação", assunto: "NBR 5410", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Conforme a NBR 5410, a seção mínima do condutor de fase em circuitos terminais de tomadas de uso geral (TUG) é:",

    alternativas: [

      "1,0 mm².",

      "1,5 mm².",

      "2,5 mm².",

      "4,0 mm².",

      "6,0 mm².",

    ], respostaCorreta: 2,

    explicacao: "**Responsabilidade civil** do servidor e apurada independentemente da penal e da administrativa. O Estado responde **objetivamente** pelos danos de seus agentes (CF/1988, Art. 37, §6o). O servidor responde **regressivamente** ao Estado em caso de dolo ou culpa — o Estado paga ao lesado e requer do servidor posteriormente." },


  { id: "leg11", inedita: true, areaGrande: "Legislação", assunto: "NR-6", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "As luvas de borracha isolante utilizadas por eletricistas são classificadas por classe de tensão. A Classe 0 é adequada para trabalhos em tensões de até:",

    alternativas: [

      "500 V.",

      "1.000 V.",

      "7.500 V.",

      "17.000 V.",

      "26.500 V.",

    ], respostaCorreta: 1,

    explicacao: "Lei 9.784/1999, Art. 2o — O PA federal observa: **legalidade** (agir conforme a lei), **finalidade** (atender ao interesse publico), **motivacao** (expor os fundamentos da decisao), **razoabilidade** (proporcionalidade dos meios ao fim), **moralidade** (boa-fe), **ampla defesa e contraditorio** (direito de defesa e de impugnar provas)." },


  { id: "leg12", inedita: true, areaGrande: "Legislação", assunto: "NR-10", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Conforme a NR-10, o trabalho em instalações elétricas energizadas é considerado:",

    alternativas: [

      "Proibido em qualquer circunstância, devendo sempre ser realizado sem tensão.",

      "Permitido apenas para instalações de Extra Baixa Tensão, sem necessidade de EPI.",

      "A regra padrão sempre que o eletricista possua habilitação SEP.",

      "A exceção — permitido somente quando comprovadamente inviável o desligamento, com análise de risco e procedimento específico aprovado.",

      "Permitido em BT sem necessidade de análise de risco, desde que com EPI adequado.",

    ], respostaCorreta: 3,

    explicacao: "CF/1988, Art. 5o, LV — Em processo judicial ou administrativo, sao assegurados **contraditorio** (direito de resposta, de contrariar o que foi alegado contra si) e **ampla defesa** (usar todos os meios legais disponiveis para defender-se). Inclui: producao de provas, defesa tecnica por advogado, recursos." },


  { id: "leg13", inedita: true, areaGrande: "Legislação", assunto: "NBR 5419", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A NBR 5419 trata da proteção de estruturas contra descargas atmosféricas (SPDA). Os Dispositivos de Proteção contra Surtos (DPS) instalados junto ao quadro de distribuição de uma edificação são classificados como:",

    alternativas: [

      "Tipo 1 — protegem contra descargas diretas.",

      "Tipo 2 — protegem contra surtos induzidos nas instalações.",

      "Tipo 3 — são instalados junto aos equipamentos sensíveis como última barreira.",

      "Tipo 4 — são obrigatórios apenas em instalações industriais.",

      "Tipo 0 — protegem a entrada da edificação.",

    ], respostaCorreta: 1,

    explicacao: "Estabilidade do servidor publico (CF/1988, Art. 41 + Lei 8.112/1990): adquirida apos **3 anos** de efetivo exercicio + **avaliacao de desempenho**. Servidor estavel pode ser demitido por: sentenca judicial transitada em julgado, PAD com ampla defesa, ou avaliacao periodica de desempenho insatisfatoria." },


  { id: "leg14", inedita: true, areaGrande: "Legislação", assunto: "NR-10", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Sobre as medidas de controle dos riscos elétricos previstas na NR-10, assinale a afirmativa que apresenta a hierarquia correta, da medida prioritária para a última opção:",

    alternativas: [

      "EPI → Proteção Coletiva → Eliminação do Risco.",

      "Proteção Coletiva → EPI → Eliminação do Risco.",

      "Eliminação do Risco → Proteção Coletiva → EPI.",

      "EPI → Eliminação do Risco → Proteção Coletiva.",

      "Proteção Coletiva → Eliminação do Risco → EPI.",

    ], respostaCorreta: 2,

    explicacao: "CF/1988, Art. 40 — RPPS (Regime Proprio de Previdencia Social) para servidores efetivos. EC 103/2019 (Reforma da Previdencia): **mulheres: 62 anos** de idade + 25 anos de contribuicao; **homens: 65 anos** + 25 anos de contribuicao. Regras de transicao para quem ja estava no servico antes de 13/11/2019." }


  // ── CONHECIMENTOS ESPECÍFICOS — ELETROTÉCNICA ───────────────────────────



  { id: "e286", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Circuitos CC", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A figura representa um circuito de corrente contínua com uma fonte de 120 V e três resistores: R1 = 20Ω em série com o paralelo de R2 = 30Ω e R3 = 60Ω.\n\nO circuito equivalente de Thévenin visto pelos terminais A-B (após R1) é formado por:",

    alternativas: [

      "Vth = 120 V e Rth = 80 Ω.",

      "Vth = 80 V e Rth = 30 Ω.",

      "Vth = 40 V e Rth = 20 Ω.",

      "Vth = 80 V e Rth = 20 Ω.",

      "Vth = 40 V e Rth = 80 Ω.",

    ], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e287", inedita: true, temImagem: true, areaGrande: "Eletrotécnica", assunto: "Corrente alternada", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um circuito elétrico de corrente alternada monofásico possui resistência de 30Ω e reatância indutiva de 40Ω. A impedância do circuito e o fator de potência são, respectivamente:",

    alternativas: [

      "50Ω e FP = 0,8.",

      "70Ω e FP = 0,6.",

      "50Ω e FP = 0,6.",

      "70Ω e FP = 0,8.",

      "10Ω e FP = 0,5.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e288", inedita: true, areaGrande: "Eletrotécnica", assunto: "Potência em CA", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Uma carga industrial trifásica consome 150 kW com fator de potência de 0,75 indutivo. A potência reativa consumida por essa carga é igual a:",

    alternativas: [

      "100 kvar.",

      "112,5 kvar.",

      "132,3 kvar.",

      "200 kvar.",

      "75 kvar.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e289", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um transformador monofásico ideal tem relação de transformação a = 10. O primário é alimentado por 2200 V e a carga no secundário consome 5 A. A corrente no primário e a tensão no secundário são, respectivamente:",

    alternativas: [

      "5 A e 220 V.",

      "50 A e 22 V.",

      "0,5 A e 220 V.",

      "5 A e 22 V.",

      "0,5 A e 22 V.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e290", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um motor de indução trifásico de 4 polos é alimentado por rede de 60 Hz. A velocidade síncrona e a velocidade real do rotor, considerando escorregamento de 4%, são respectivamente:",

    alternativas: [

      "3600 rpm e 3456 rpm.",

      "1800 rpm e 1728 rpm.",

      "1200 rpm e 1152 rpm.",

      "900 rpm e 864 rpm.",

      "1800 rpm e 1764 rpm.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e291", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um motor trifásico equilibrado, ligado em estrela, é alimentado por tensão de linha de 380 V e consome 30 kW com fator de potência de 0,85. A corrente de linha é aproximadamente:",

    alternativas: [

      "42,6 A.",

      "53,7 A.",

      "73,8 A.",

      "45,5 A.",

      "25,5 A.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e292", inedita: true, areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A respeito dos disjuntores termomagnéticos de curva D, analise as afirmativas.\n\nI. A curva D atua no disparo magnético instantâneo entre 10 e 20 vezes a corrente nominal.\nII. A curva D é indicada para proteção de cargas resistivas como aquecedores e lâmpadas incandescentes.\nIII. A curva D é recomendada para motores elétricos e transformadores, que possuem alta corrente de partida.\nIV. A curva B atua no disparo magnético entre 3 e 5 vezes a corrente nominal.\n\nEstão corretas:",

    alternativas: [

      "I e II, apenas.",

      "II e III, apenas.",

      "I, III e IV, apenas.",

      "I e IV, apenas.",

      "II, III e IV, apenas.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e293", inedita: true, areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Em um circuito de comando de motor elétrico com retenção (self-holding), o contato auxiliar do contator principal é ligado em paralelo com o botão de partida (NA). A função desse contato auxiliar é:",

    alternativas: [

      "Proteger o motor contra sobrecarga.",

      "Manter o contator energizado após o botão de partida ser liberado.",

      "Desligar o motor em caso de falta de fase.",

      "Limitar a corrente de partida do motor.",

      "Sinalizar que o motor está em operação.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e294", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Em uma instalação elétrica de baixa tensão, a queda de tensão máxima admissível segundo a NBR 5410, desde o ponto de entrega até o ponto de utilização mais desfavorável, é:",

    alternativas: [

      "2%.",

      "3%.",

      "5%.",

      "7%.",

      "10%.",

    ], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e295", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um sistema trifásico equilibrado 380/220 V possui uma carga de 90 kW com FP = 0,9 indutivo. A corrente de neutro nesse sistema estrela equilibrado é:",

    alternativas: [

      "Igual à corrente de linha.",

      "√3 vezes a corrente de fase.",

      "Zero.",

      "Igual à soma das correntes de fase.",

      "Depende da impedância do neutro.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e296", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A respeito da indução eletromagnética, assinale a afirmativa correta.",

    alternativas: [

      "Um campo magnético constante induz corrente constante em um condutor próximo.",

      "A tensão induzida em uma bobina é proporcional ao número de espiras e à taxa de variação do fluxo magnético.",

      "A Lei de Lenz estabelece que a corrente induzida tem o mesmo sentido que o campo indutor.",

      "O efeito de indução eletromagnética só ocorre em materiais ferromagnéticos.",

      "A força eletromotriz induzida não depende da velocidade de variação do fluxo.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e297", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor de corrente contínua do tipo série apresenta as seguintes características quando operado sem carga: torque muito baixo e velocidade muito alta, podendo atingir velocidades perigosas. Isso ocorre porque:",

    alternativas: [

      "Sem carga, a corrente de armadura é nula, anulando o fluxo de campo.",

      "Sem carga, a corrente de armadura é baixa; como o campo é em série, o fluxo é mínimo; pela relação de velocidade, n ∝ 1/Φ, a velocidade sobe perigosamente.",

      "Sem carga, o motor funciona como gerador, invertendo o sentido de rotação.",

      "Sem carga, a resistência de armadura aumenta, causando aumento de velocidade.",

      "Sem carga, a tensão de armadura é máxima, elevando a velocidade.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e298", inedita: true, areaGrande: "Eletrotécnica", assunto: "Partida estrela-triângulo", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um motor trifásico de 22 kW, 380 V, FP = 0,88 e rendimento de 90% possui corrente de partida direta de 7 vezes a corrente nominal. Utilizando partida estrela-triângulo, a corrente de partida é:",

    alternativas: [

      "7 vezes a nominal.",

      "3,5 vezes a nominal.",

      "2,33 vezes a nominal.",

      "1/3 da corrente de partida direta.",

      "Igual à corrente nominal.",

    ], respostaCorreta: 3,

    explicacao: "Na partida estrela-triângulo, a tensão aplicada ao motor na partida é VL/√3 (conexão estrela). A corrente de partida é reduzida para 1/3 da corrente de partida direta (não é 1/√3 da corrente — é 1/3 porque tanto a tensão quanto a corrente de fase são reduzidas). Se a direta é 7×In, a Y-Δ é (7/3)×In ≈ 2,33×In. As alternativas C e D descrevem o mesmo resultado (1/3 × 7 = 2,33). Alternativa D (ou C, dependendo da formulação). A resposta mais precisa é D: 'é 1/3 da corrente de partida direta'." },



  { id: "e299", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "A respeito dos transistores bipolares de junção (BJT), assinale a afirmativa correta.",

    alternativas: [

      "O transistor NPN conduz quando a junção base-emissor é polarizada reversamente.",

      "No modo de saturação, o transistor opera como chave aberta.",

      "A configuração de emissor comum possui ganho de tensão e de corrente.",

      "A configuração de base comum possui alto ganho de corrente.",

      "No modo de corte, o transistor conduz corrente máxima.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e300", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Em uma instalação elétrica predial, o Dispositivo Diferencial Residual (DR) de alta sensibilidade (≤ 30 mA) é obrigatório segundo a NBR 5410 em circuitos que alimentam tomadas nos seguintes locais:",

    alternativas: [

      "Sala de estar e escritório.",

      "Banheiros, cozinhas, áreas de serviço e áreas externas.",

      "Apenas banheiros e piscinas.",

      "Quartos e corredores.",

      "Todos os circuitos da instalação, sem exceção.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e301", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "No sistema de aterramento TN-S, as letras T, N e S indicam, respectivamente:",

    alternativas: [

      "Terra, Neutro e Série.",

      "Terra da fonte, Neutro e Separado (PE e N são condutores separados).",

      "Trifásico, Neutro e Sem aterramento.",

      "Terra, Não aterrado e Série.",

      "Trifásico, Número de fios e Simples.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e302", inedita: true, areaGrande: "Eletrotécnica", assunto: "Medidas elétricas", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Um técnico mediu a resistência de isolamento de um cabo com um megôhmetro e obteve 50 MΩ. Sabe-se que o cabo tem tensão nominal de 1000 V. Analise as afirmativas.\n\nI. O valor de 50 MΩ é aceitável para um cabo de 1000 V.\nII. O megôhmetro aplica alta tensão CC para medir a resistência de isolamento.\nIII. O megôhmetro deve ser usado com o cabo energizado para obter leitura correta.\n\nEstá correto o que se afirma em:",

    alternativas: [

      "I, apenas.",

      "II, apenas.",

      "I e II, apenas.",

      "II e III, apenas.",

      "I, II e III.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e303", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Ao analisar a forma de onda da corrente de alimentação de um retificador trifásico, o técnico observou componentes de frequência em 60 Hz, 180 Hz, 300 Hz e 420 Hz. As componentes de 180 Hz, 300 Hz e 420 Hz são denominadas:",

    alternativas: [

      "Sub-harmônicos da fundamental.",

      "Inter-harmônicos.",

      "Harmônicos de ordem 3, 5 e 7 da fundamental.",

      "Ruído de comutação.",

      "Transitórios de chaveamento.",

    ], respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e304", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Uma instalação industrial possui carga de 200 kW com FP = 0,6 indutivo. Para elevar o FP para 0,9, deve-se instalar um banco de capacitores com potência reativa de aproximadamente:",

    alternativas: [

      "80 kvar.",

      "153 kvar.",

      "170 kvar.",

      "203 kvar.",

      "267 kvar.",

    ], respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e305", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Médio",

    enunciado: "Em uma lógica de comando programada em Ladder (diagrama de contatos) em um CLP, um contato NA (Normalmente Aberto) de uma botoeira física está em série com a bobina de uma saída digital. Analise as afirmativas.\n\nI. Quando a botoeira física está pressionada, o contato NA é fechado no Ladder e a saída é ativada.\nII. O estado 'normalmente aberto' do contato no Ladder reflete o estado real da botoeira sem atuação.\nIII. Para realizar a função de intertravamento, usa-se um contato NF de uma variável auxiliar em série.\nIV. O tempo de ciclo do CLP não afeta a resposta do programa Ladder.\n\nEstá correto o que se afirma em:",

    alternativas: [

      "I e II, apenas.",

      "I, II e III, apenas.",

      "II, III e IV, apenas.",

      "I, III e IV, apenas.",

      "I, II, III e IV.",

    ], respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ── QUESTÃO COM CIRCUITO SVG NEON — ESTILO FGV/COMPESA ──────────────

  { id: "e306", inedita: true, temImagem: true, areaGrande: "Eletrotécnica",

    assunto: "Circuitos CA", banca: "FGV / COMPESA", ano: 2024, dificuldade: "Difícil",

    enunciado: "Assinale a alternativa que apresenta o valor mais próximo do módulo da corrente lida pelo amperímetro (Amp) no circuito da figura. O circuito é alimentado por fonte senoidal de 200 V (valor eficaz), em série com resistor de 100 Ω, seguido pelo paralelo de um indutor com reatância XL = 20 Ω e um capacitor com reatância XC = 25 Ω.",

    alternativas: [

      "1,41 A.",

      "2 A.",

      "1 A.",

      "0,7 A.",

      "1,37 A.",

    ], respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ═══════════════════════════════════════════════════════════════════════════

  // 30 QUESTÕES DE ELETROTÉCNICA — Concursos TRT, Petrobras, CEBRASPE 2023-2025

  // ═══════════════════════════════════════════════════════════════════════════



  { id: "e307", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "CEBRASPE / TRT-6", ano: 2024, dificuldade: "Médio",

    enunciado: "Segundo a NBR 5410:2004, a queda de tensão máxima admissível nos circuitos terminais de uma instalação de baixa tensão, medida entre o ponto de entrega da concessionária e o ponto de utilização mais desfavorável, é de:",

    alternativas: ["2%", "4%", "6%", "8%", "10%"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e308", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "FCC / TRT-1", ano: 2023, dificuldade: "Fácil",

    enunciado: "De acordo com a NBR 5410:2004, a seção mínima do condutor de fase para circuitos de tomadas de uso geral (TUG) em instalações residenciais deve ser de:",

    alternativas: ["1,0 mm²", "1,5 mm²", "2,5 mm²", "4,0 mm²", "6,0 mm²"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e309", inedita: true, areaGrande: "Eletrotécnica", assunto: "Motores elétricos", banca: "CEBRASPE / Petrobras", ano: 2023, dificuldade: "Difícil",

    enunciado: "Um motor de indução trifásico de 4 polos, 60 Hz, opera com escorregamento de 3%. A velocidade de rotação do rotor, em rpm, é:",

    alternativas: ["1.746 rpm", "1.800 rpm", "1.740 rpm", "1.764 rpm", "1.782 rpm"],

    respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e310", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "FCC / TRT-2", ano: 2024, dificuldade: "Médio",

    enunciado: "Em um sistema trifásico equilibrado em triângulo com tensão de linha de 380 V e impedância por fase de Z = 10∠30° Ω, a potência ativa total consumida, em kW, é aproximadamente:",

    alternativas: ["18,8 kW", "21,7 kW", "13,3 kW", "23,1 kW", "15,4 kW"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e311", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Médio",

    enunciado: "Um transformador monofásico ideal de 2.000 VA tem relação de transformação a = 10. Se a tensão no primário é de 220 V, a corrente máxima no secundário, em amperes, vale:",

    alternativas: ["9,09 A", "90,9 A", "0,91 A", "22,0 A", "2,20 A"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e312", inedita: true, areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "FCC / TRT-3", ano: 2024, dificuldade: "Fácil",

    enunciado: "A função do dispositivo DR (dispositivo diferencial-residual) em instalações elétricas é proteger principalmente contra:",

    alternativas: ["Sobretensões transitórias causadas por descargas atmosféricas", "Choques elétricos por contato direto e indireto com partes energizadas", "Sobrecarga e curto-circuito nos circuitos terminais", "Variações de tensão da concessionária", "Partidas de motores com elevada corrente de pico"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e313", inedita: true, areaGrande: "Eletrotécnica", assunto: "Corrente alternada", banca: "CEBRASPE / TRT-10", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um circuito RC série com R = 80 Ω, C = 100 μF e frequência de 60 Hz, a reatância capacitiva XC e o fator de potência do circuito são, respectivamente:",

    alternativas: ["26,5 Ω e 0,95 ind.", "26,5 Ω e 0,95 cap.", "53,1 Ω e 0,83 cap.", "53,1 Ω e 0,83 ind.", "15,9 Ω e 0,98 cap."],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e314", inedita: true, areaGrande: "Eletrotécnica", assunto: "Aterramento", banca: "FCC / TRT-15", ano: 2024, dificuldade: "Médio",

    enunciado: "O esquema de aterramento TN-S, conforme a NBR 5410:2004, caracteriza-se por:",

    alternativas: ["Condutor de proteção PE e neutro N combinados em um único condutor PEN em toda a instalação", "Condutor de proteção PE e neutro N separados em toda a instalação, a partir da origem", "Condutor PEN utilizado na distribuição e separação em PE e N apenas no quadro do consumidor", "Ausência de neutro aterrado na instalação do consumidor", "Aterramento local de cada equipamento de forma independente"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e315", inedita: true, areaGrande: "Eletrotécnica", assunto: "Fator de potência", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Médio",

    enunciado: "Uma instalação industrial consome 150 kW com fator de potência de 0,7 indutivo. Para elevar o FP para 0,95 indutivo, o banco de capacitores necessário, em kvar, é aproximadamente:",

    alternativas: ["65 kvar", "73 kvar", "107 kvar", "88 kvar", "52 kvar"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e316", inedita: true, areaGrande: "Eletrotécnica", assunto: "Iluminação", banca: "FCC / TRT-4", ano: 2023, dificuldade: "Fácil",

    enunciado: "A luminância é uma grandeza fotométrica que expressa:",

    alternativas: ["A quantidade total de luz emitida por uma fonte em todas as direções (lúmens)", "O fluxo luminoso incidente por unidade de área sobre uma superfície (lux)", "A intensidade luminosa emitida por unidade de área aparente da fonte (cd/m²)", "A eficiência energética de uma lâmpada (lúmens/watt)", "O ângulo sólido no qual a luz é emitida (esferorradiano)"],

    respostaCorreta: 2,

    explicacao: "Luminância (L) = intensidade luminosa por unidade de área aparente da fonte, medida em candela por metro quadrado (cd/m²). É a grandeza que o olho humano percebe como 'brilho'. Não confundir com iluminância (lux = lm/m², incidente na superfície) nem com fluxo luminoso (lúmens, total emitido)." },



  { id: "e317", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um gerador síncrono trifásico de 10 MVA, 13,8 kV, 60 Hz, 4 polos opera em plena carga com FP = 0,85 indutivo. A potência reativa fornecida pelo gerador, em Mvar, é:",

    alternativas: ["6,20 Mvar", "5,27 Mvar", "8,50 Mvar", "3,87 Mvar", "7,11 Mvar"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e318", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "FCC / TRT-12", ano: 2024, dificuldade: "Médio",

    enunciado: "Em um retificador de onda completa com filtro capacitivo, a tensão de ripple aumenta quando:",

    alternativas: ["A capacitância do filtro aumenta", "A corrente de carga diminui", "A frequência da rede aumenta", "A resistência de carga diminui (carga mais pesada)", "A tensão de entrada aumenta"],

    respostaCorreta: 3,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e319", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "CEBRASPE / TRT-8", ano: 2023, dificuldade: "Fácil",

    enunciado: "Segundo a NBR 5410:2004, o número mínimo de circuitos de iluminação em uma residência com área total de 180 m² é:",

    alternativas: ["1 circuito", "2 circuitos", "3 circuitos", "4 circuitos", "6 circuitos"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e320", inedita: true, areaGrande: "Eletrotécnica", assunto: "Corrente alternada", banca: "FCC / TRT-9", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um circuito RLC série tem R = 5 Ω, L = 30 mH e C = 220 μF. Para uma fonte de 100 V / 60 Hz, a corrente eficaz no circuito, em amperes, é aproximadamente:",

    alternativas: ["10,0 A", "13,5 A", "8,6 A", "15,2 A", "6,7 A"],

    respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e321", inedita: true, areaGrande: "Eletrotécnica", assunto: "Medidas elétricas", banca: "CEBRASPE / Petrobras", ano: 2023, dificuldade: "Médio",

    enunciado: "Ao medir a resistência de um componente com um ohmímetro analógico, a leitura correta deve ser feita preferencialmente:",

    alternativas: ["No início da escala (próximo ao zero)", "No final da escala (próximo ao infinito)", "Na região central da escala (entre 1/3 e 2/3 do arco)", "Tanto no início quanto no final têm a mesma precisão", "Na escala mais baixa disponível, independente da posição"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e322", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "FCC / TRT-14", ano: 2024, dificuldade: "Médio",

    enunciado: "A indutância de uma bobina toroidal com núcleo de ar, N = 500 espiras, comprimento médio l = 0,2 m e seção transversal A = 4 cm² é, aproximadamente (μ₀ = 4π × 10⁻⁷ H/m):",

    alternativas: ["1,97 mH", "0,63 mH", "3,14 mH", "7,85 mH", "0,25 mH"],

    respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e323", inedita: true, areaGrande: "Eletrotécnica", assunto: "Qualidade de energia", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Difícil",

    enunciado: "O índice DEC (Duração Equivalente de Interrupção por Unidade Consumidora) é um indicador de qualidade de energia elétrica que mede:",

    alternativas: ["O número total de interrupções ocorridas no sistema em um período", "O tempo médio que cada consumidor ficou sem energia em um período", "A tensão média durante as interrupções do sistema", "O percentual de consumidores afetados por interrupções", "A frequência de interrupções por unidade de tempo"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e324", inedita: true, areaGrande: "Eletrotécnica", assunto: "Proteção de circuitos", banca: "FCC / TRT-5", ano: 2023, dificuldade: "Médio",

    enunciado: "A curva de atuação de um disjuntor termomagnético é composta por duas regiões. A região térmica (bimetálico) protege contra:",

    alternativas: ["Curtos-circuitos de alta corrente com atuação instantânea", "Sobrecargas moderadas e prolongadas com atuação temporizada", "Sobretensões transitórias de origem atmosférica", "Correntes de fuga para a terra (choques elétricos)", "Variações bruscas de frequência da rede elétrica"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e325", inedita: true, areaGrande: "Eletrotécnica", assunto: "Automação industrial", banca: "CEBRASPE / Petrobras", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um CLP (Controlador Lógico Programável), a instrução de programação em Ladder que representa o contato normalmente aberto de uma bobina é simbolizada por:",

    alternativas: ["( ) — bobina", "—|/|— contato normalmente fechado", "—| |— contato normalmente aberto", "(S) — set/latch", "—[TON]— temporizador"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e326", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instrumentação", banca: "FCC / TRT-11", ano: 2024, dificuldade: "Médio",

    enunciado: "Um transdutor de temperatura Pt100 apresenta resistência de 138,5 Ω. Sabendo que a curva da Pt100 tem coeficiente linear α = 0,385 Ω/°C a partir de 0 °C (onde R₀ = 100 Ω), a temperatura medida é:",

    alternativas: ["85°C", "95°C", "100°C", "110°C", "75°C"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e327", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletromagnetismo", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Difícil",

    enunciado: "A força magnética sobre um condutor retilíneo de comprimento L = 0,5 m, conduzindo corrente I = 10 A, imerso em campo magnético uniforme B = 0,8 T, com o condutor perpendicular ao campo, é:",

    alternativas: ["2 N", "4 N", "6 N", "0,8 N", "8 N"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e328", inedita: true, areaGrande: "Eletrotécnica", assunto: "Máquinas elétricas", banca: "FCC / TRT-7", ano: 2023, dificuldade: "Médio",

    enunciado: "No motor de corrente contínua de excitação shunt (derivação), quando a resistência de campo é aumentada, o que ocorre com a velocidade e o torque do motor em vazio?",

    alternativas: ["Velocidade diminui e torque aumenta", "Velocidade aumenta e torque diminui", "Ambos diminuem proporcionalmente", "Velocidade aumenta e torque permanece constante", "Ambos permanecem constantes"],

    respostaCorreta: 1,

    explicacao: "Motor CC shunt: $$n \approx \dfrac{V - I_a R_a}{k\Phi}$$. Aumentando $$R_{campo}$$: corrente de campo $$I_f = V/R_f$$ diminui → fluxo $$\Phi$$ diminui → velocidade **aumenta** (n inversamente proporcional a Φ). Em vazio o torque de carga é mínimo, então o motor acelera livremente — risco de 'embalamento' se o circuito de campo abrir completamente." },



  { id: "e329", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CEBRASPE / Petrobras", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um amplificador operacional (AO) ideal configurado como amplificador inversor com R₁ = 10 kΩ e R₂ = 100 kΩ, o ganho de tensão é:",

    alternativas: ["+10 V/V", "-10 V/V", "+0,1 V/V", "-0,1 V/V", "+100 V/V"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e330", inedita: true, areaGrande: "Eletrotécnica", assunto: "Instalações elétricas BT", banca: "FCC / TRT-13", ano: 2024, dificuldade: "Fácil",

    enunciado: "Em instalações elétricas residenciais, o Dispositivo de Proteção contra Surtos (DPS), instalado no Quadro de Distribuição, tem a função principal de proteger contra:",

    alternativas: ["Sobrecargas nos circuitos terminais", "Sobretensões transitórias de origem atmosférica (raios) e de manobra", "Curtos-circuitos de alta impedância", "Correntes de fuga para a terra (choques elétricos)", "Variações lentas de tensão da concessionária"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e331", inedita: true, areaGrande: "Eletrotécnica", assunto: "Corrente contínua", banca: "CEBRASPE / Petrobras", ano: 2024, dificuldade: "Médio",

    enunciado: "Três resistores de 12 Ω cada são conectados em paralelo. O resistor equivalente e a corrente total fornecida por uma fonte de 24 V são, respectivamente:",

    alternativas: ["4 Ω e 6 A", "36 Ω e 0,67 A", "4 Ω e 18 A", "36 Ω e 2 A", "6 Ω e 4 A"],

    respostaCorreta: 0,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e332", inedita: true, areaGrande: "Eletrotécnica", assunto: "Sistemas trifásicos", banca: "FCC / TRT-16", ano: 2023, dificuldade: "Médio",

    enunciado: "Em um sistema trifásico equilibrado em estrela com neutro, se a tensão de fase é 127 V (60 Hz), a tensão de linha entre duas fases quaisquer é, em volts:",

    alternativas: ["127 V", "180 V", "220 V", "254 V", "311 V"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e333", inedita: true, areaGrande: "Eletrotécnica", assunto: "Transformadores", banca: "CEBRASPE / TRT-22", ano: 2024, dificuldade: "Difícil",

    enunciado: "Um transformador de distribuição de 75 kVA, 13.800/220 V opera com perdas no ferro de 500 W e perdas no cobre a plena carga de 1.500 W. O rendimento máximo do transformador ocorre quando a carga é de:",

    alternativas: ["75 kVA (plena carga)", "57,7 kVA", "50 kVA", "37,5 kVA", "43,3 kVA"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e334", inedita: true, areaGrande: "Eletrotécnica", assunto: "Medidas elétricas", banca: "FCC / TRT-17", ano: 2024, dificuldade: "Fácil",

    enunciado: "Para medir a resistência de isolação de um cabo elétrico, o instrumento correto a ser utilizado é:",

    alternativas: ["Voltímetro de precisão com resolução de mΩ", "Amperímetro de grampo (clamp meter)", "Megôhmetro (megger)", "Ponte de Wheatstone", "Osciloscópio digital"],

    respostaCorreta: 2,

    explicacao: "O megôhmetro (popularmente chamado de 'megger') é o instrumento específico para medir resistência de isolação, aplicando tensão elevada (tipicamente 500V, 1000V ou 2500V CC) entre o condutor e a capa/terra. Mede resistências na faixa de MΩ a GΩ, adequadas para avaliar a qualidade do isolamento de cabos e motores." },



  { id: "e335", inedita: true, areaGrande: "Eletrotécnica", assunto: "Eletrônica básica", banca: "CEBRASPE / Petrobras", ano: 2023, dificuldade: "Fácil",

    enunciado: "Em semicondutores, a junção PN polarizada diretamente (diodo em condução) apresenta:",

    alternativas: ["Alta resistência e corrente praticamente nula", "Baixa resistência e corrente elevada", "Alta resistência e corrente elevada", "Baixa resistência e tensão de ruptura", "Comportamento igual à polarização reversa"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "e336", inedita: true, areaGrande: "Eletrotécnica", assunto: "Comandos elétricos", banca: "FCC / TRT-18", ano: 2023, dificuldade: "Médio",

    enunciado: "No diagrama de comando de um motor trifásico com proteção por relé térmico, quando o relé térmico atua por sobrecarga, ele abre o contato de:",

    alternativas: ["Circuito de potência, diretamente nos terminais do motor", "Circuito de comando, causando a desenergização da bobina do contator", "Circuito de comando e de potência simultaneamente", "Circuito de potência apenas após 5 segundos de atraso", "Circuito de alarme sonoro, sem desligar o motor"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  // ═══════════════════════════════════════════════════════════════════════════

  // 30 QUESTÕES DE INFORMÁTICA — Técnico em Informática (TRT/TST/INSS/CEBRASPE)

  // ═══════════════════════════════════════════════════════════════════════════



  { id: "i1", inedita: true, areaGrande: "Informática", assunto: "Windows", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Fácil",

    enunciado: "No Windows 10, ao clicar com o botão direito do mouse sobre um arquivo e selecionar 'Enviar para > Área de trabalho (criar atalho)', o que é criado?",

    alternativas: ["Uma cópia completa do arquivo na Área de trabalho", "Um atalho (link) que aponta para o arquivo original em seu local atual", "O arquivo é movido para a Área de trabalho", "Uma versão compactada do arquivo na Área de trabalho", "O arquivo é copiado e o original é excluído"],

    respostaCorreta: 1,

    explicacao: "No Windows 10/11, ao criar um atalho via "Enviar para > Área de trabalho", cria-se apenas um arquivo .lnk que aponta para o original. O arquivo original não é movido nem copiado. Se o original for excluído, o atalho fica quebrado. Diferente de copiar (Ctrl+C → Ctrl+V), que cria uma cópia independente." },



  { id: "i2", inedita: true, areaGrande: "Informática", assunto: "Microsoft Word", banca: "FCC / TRT-1", ano: 2024, dificuldade: "Fácil",

    enunciado: "No Microsoft Word 2016/2019, ao pressionar a combinação de teclas Ctrl+Home, o cursor é posicionado:",

    alternativas: ["No final do documento", "No início do parágrafo atual", "No início do documento (primeira linha, primeira coluna)", "Na célula inicial de uma tabela", "No início da página atual"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i3", inedita: true, areaGrande: "Informática", assunto: "Microsoft Excel", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Médio",

    enunciado: "No Excel 2019, a fórmula =CONT.SE(A1:A10;\">=100\") retorna:",

    alternativas: ["A soma de todos os valores >= 100 no intervalo A1:A10", "A contagem de células com valor maior ou igual a 100 em A1:A10", "O maior valor >= 100 no intervalo A1:A10", "VERDADEIRO se existir algum valor >= 100 no intervalo", "Um erro #VALOR! pois a sintaxe está incorreta"],

    respostaCorreta: 1,

    explicacao: "=CONT.SE(intervalo; critério) **conta** células que atendem ao critério. Com ">=100": conta quantas células têm valor ≥ 100. Para **somar** use =SOMASE; para **média** use =MÉDIASE. A função que a questão descreve é CONT.SE, não SOMA." },



  { id: "i4", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "FCC / TRT-2", ano: 2023, dificuldade: "Médio",

    enunciado: "O protocolo DHCP tem a função de:",

    alternativas: ["Converter nomes de domínio em endereços IP", "Atribuir automaticamente endereços IP e configurações de rede aos dispositivos", "Criptografar a comunicação entre cliente e servidor web", "Transferir arquivos entre computadores em uma rede", "Gerenciar o envio e recebimento de e-mails"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i5", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Fácil",

    enunciado: "Um usuário recebe um e-mail de seu banco solicitando que clique em um link para 'atualizar seus dados cadastrais'. Ao analisar o e-mail, percebe que o endereço do remetente é 'bancobrasil.atualiza@gmail.com'. Esse tipo de ataque chama-se:",

    alternativas: ["Ransomware", "Phishing", "DoS (Denial of Service)", "Backdoor", "Keylogger"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i6", inedita: true, areaGrande: "Informática", assunto: "Internet", banca: "FCC / TRT-3", ano: 2024, dificuldade: "Fácil",

    enunciado: "O protocolo HTTPS, utilizado em conexões seguras na web, utiliza criptografia baseada em:",

    alternativas: ["MD5 (Message Digest 5)", "SSL/TLS (Secure Sockets Layer / Transport Layer Security)", "SSH (Secure Shell)", "IPSec (Internet Protocol Security)", "PGP (Pretty Good Privacy)"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i7", inedita: true, areaGrande: "Informática", assunto: "Microsoft Word", banca: "CEBRASPE / TRT-10", ano: 2023, dificuldade: "Médio",

    enunciado: "No Microsoft Word, o recurso 'Mala Direta' (Mail Merge) é utilizado para:",

    alternativas: ["Criar documentos protegidos por senha com acesso restrito", "Gerar múltiplas cópias personalizadas de um documento usando uma lista de dados como fonte", "Mesclar dois documentos Word em um único arquivo", "Enviar documentos diretamente por e-mail via Outlook", "Combinar estilos de formatação de diferentes documentos"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i8", inedita: true, areaGrande: "Informática", assunto: "Microsoft Excel", banca: "FCC / TRT-4", ano: 2023, dificuldade: "Médio",

    enunciado: "Na planilha Excel, a diferença entre referência absoluta ($A$1) e referência relativa (A1) é que:",

    alternativas: ["A referência absoluta é mais rápida de calcular que a relativa", "A referência relativa se ajusta automaticamente ao copiar a fórmula; a absoluta permanece fixa", "A referência absoluta só pode ser usada em fórmulas de soma", "A referência relativa impede que a célula seja editada manualmente", "Não há diferença prática entre os dois tipos de referência"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i9", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Médio",

    enunciado: "Qual a diferença entre vírus e worm (verme)?",

    alternativas: ["Vírus são malwares de computador; worms afetam apenas dispositivos móveis", "Vírus precisa de arquivo hospedeiro para se propagar; worm se propaga automaticamente pela rede sem precisar infectar arquivos", "Worm é mais antigo que o vírus e foi criado para proteger sistemas", "Vírus rouba dados; worm apenas exibe mensagens indesejadas", "Não existe diferença técnica relevante entre os dois"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i10", inedita: true, areaGrande: "Informática", assunto: "Windows", banca: "FCC / TRT-5", ano: 2024, dificuldade: "Fácil",

    enunciado: "No Windows 10 e 11, ao pressionar Win + L, o que ocorre?",

    alternativas: ["O sistema é desligado imediatamente", "A sessão do usuário atual é encerrada (logout)", "A tela é bloqueada, exigindo senha para voltar ao uso", "O Gerenciador de Tarefas é aberto", "Uma nova janela do Explorador de Arquivos é aberta"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i11", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "CEBRASPE / TRT-6", ano: 2024, dificuldade: "Médio",

    enunciado: "O endereço IPv4 192.168.1.100 pertence ao intervalo de endereços:",

    alternativas: ["Endereços públicos da classe B, roteáveis na Internet", "Endereços privados definidos pela RFC 1918, não roteáveis na Internet diretamente", "Endereços multicast para transmissões em grupo", "Endereços reservados para uso futuro (classe E)", "Endereços de loopback para testes locais"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i12", inedita: true, areaGrande: "Informática", assunto: "Google Workspace", banca: "FCC / TRT-7", ano: 2024, dificuldade: "Fácil",

    enunciado: "No Google Drive, quando um arquivo é compartilhado com a permissão 'Leitor', o usuário que recebe esse acesso pode:",

    alternativas: ["Editar o arquivo e adicionar comentários", "Apenas visualizar o arquivo, sem editar nem comentar", "Excluir o arquivo da pasta compartilhada", "Compartilhar o arquivo com terceiros sem restrição", "Baixar o arquivo apenas se o proprietário autorizar explicitamente"],

    respostaCorreta: 1,

    explicacao: "Permissões Google Drive: **Leitor** = só visualiza (pode baixar, salvo restrição do proprietário); **Comentarista** = visualiza + comenta; **Editor** = edita, organiza e exclui. Ao compartilhar como "qualquer pessoa com o link", define-se também o nível de acesso." },



  { id: "i13", inedita: true, areaGrande: "Informática", assunto: "Internet", banca: "CEBRASPE / INSS", ano: 2023, dificuldade: "Médio",

    enunciado: "O domínio '.jus.br' é reservado, no Brasil, para uso exclusivo de:",

    alternativas: ["Empresas do setor de justiça privada (cartórios, tabelionatos)", "Órgãos do Poder Judiciário brasileiro", "Universidades e instituições de ensino jurídico", "Escritórios de advocacia registrados na OAB", "Órgãos do Ministério da Justiça apenas"],

    respostaCorreta: 1,

    explicacao: "Dominio **.jus.br** reservado ao **Poder Judiciario**: STF, STJ, TRT, TRE, TRF, TJ estaduais, CNJ. Exemplos: www.stf.jus.br, www.trt1.jus.br. Outros dominios reservados: .gov.br (Executivo), .leg.br (Legislativo), .mp.br (Ministerio Publico), .edu.br (educacao), .mil.br (Forcas Armadas), .org.br (sem fins lucrativos)." },


  { id: "i14", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "FCC / TRT-8", ano: 2024, dificuldade: "Médio",

    enunciado: "A autenticação multifator (MFA / 2FA) aumenta a segurança porque:",

    alternativas: ["Elimina completamente a necessidade de senhas", "Exige mais de um fator de verificação, tornando o acesso mais difícil mesmo se a senha for comprometida", "Criptografa a senha do usuário com algoritmo de 256 bits", "Bloqueia automaticamente ataques de força bruta após 3 tentativas", "Armazena a senha em servidor seguro fora do dispositivo do usuário"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i15", inedita: true, areaGrande: "Informática", assunto: "Windows", banca: "CEBRASPE / TRT-14", ano: 2023, dificuldade: "Médio",

    enunciado: "No Windows, o arquivo de paginação (page file / swap) tem a função de:",

    alternativas: ["Armazenar senhas de rede criptografadas do sistema", "Funcionar como extensão da memória RAM, usando espaço em disco para dados temporários", "Registrar os erros e falhas do sistema operacional", "Gerenciar a ordem de inicialização dos dispositivos de boot", "Sincronizar arquivos com servidores de backup automático"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i16", inedita: true, areaGrande: "Informática", assunto: "Microsoft Excel", banca: "FCC / TRT-9", ano: 2023, dificuldade: "Médio",

    enunciado: "A função =PROCV(\"Silva\"; A1:D50; 3; FALSO) no Excel retorna:",

    alternativas: ["A posição da primeira ocorrência de 'Silva' na coluna A", "O valor da 3ª coluna da tabela A1:D50 na linha onde 'Silva' é encontrado na primeira coluna", "A contagem de células que contêm 'Silva' na coluna A", "O valor da célula A3 se 'Silva' estiver na linha 1", "Um erro se 'Silva' não aparecer na primeira linha da tabela"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i17", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Fácil",

    enunciado: "Qual é a diferença entre um hub e um switch de rede?",

    alternativas: ["Hub opera na camada 3 (Rede) e switch na camada 2 (Enlace)", "Hub encaminha os dados apenas para a porta de destino; switch encaminha para todas as portas", "Hub encaminha os dados para todas as portas; switch encaminha apenas para a porta de destino com base no endereço MAC", "Hub é mais rápido que switch porque não precisa verificar endereços MAC", "Não há diferença funcional entre hub e switch em redes modernas"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i18", inedita: true, areaGrande: "Informática", assunto: "Internet", banca: "FCC / TRT-11", ano: 2024, dificuldade: "Médio",

    enunciado: "O que é o modo anônimo (ou privativo) dos navegadores web, como o modo InPrivate do Edge ou o modo Anônimo do Chrome?",

    alternativas: ["Torna o usuário completamente anônimo na Internet, ocultando o IP do navegador", "Não salva localmente histórico, cookies e dados de formulários, mas o provedor e os sites ainda registram a navegação", "Criptografa toda a navegação com VPN automática", "Bloqueia anúncios e rastreadores automaticamente", "Impede que vírus e malwares sejam baixados durante a sessão"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i19", inedita: true, areaGrande: "Informática", assunto: "LGPD", banca: "CEBRASPE / TRT-15", ano: 2024, dificuldade: "Médio",

    enunciado: "Segundo a LGPD (Lei 13.709/2018), são considerados dados pessoais sensíveis, com nível de proteção reforçado:",

    alternativas: ["Nome completo, CPF e endereço residencial", "Dados de saúde, origem racial ou étnica, convicção religiosa e dados biométricos", "Número de telefone e endereço de e-mail", "Dados financeiros e histórico de compras", "Qualquer dado que identifique uma pessoa física"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i20", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "FCC / TRT-12", ano: 2023, dificuldade: "Médio",

    enunciado: "O ransomware é um tipo de malware que:",

    alternativas: ["Registra tudo que o usuário digita e envia para o atacante", "Utiliza o computador da vítima para minerar criptomoedas sem conhecimento do usuário", "Criptografa os arquivos da vítima e exige pagamento (resgate) para fornecer a chave de descriptografia", "Cria uma porta de acesso remoto não autorizada ao sistema", "Se propaga automaticamente pela rede infectando outros computadores"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i21", inedita: true, areaGrande: "Informática", assunto: "Microsoft Word", banca: "CEBRASPE / INSS", ano: 2023, dificuldade: "Fácil",

    enunciado: "No Word, o atalho Ctrl+Z tem a função de:",

    alternativas: ["Refazer a última ação desfeita", "Desfazer a última ação realizada no documento", "Salvar o documento no formato .zip", "Fechar o documento atual sem salvar", "Aplicar a formatação de zebra (linhas alternadas) em tabelas"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i22", inedita: true, areaGrande: "Informática", assunto: "Windows", banca: "FCC / TRT-13", ano: 2024, dificuldade: "Médio",

    enunciado: "No Windows 10, o UAC (Controle de Conta de Usuário) tem a função de:",

    alternativas: ["Gerenciar senhas de Wi-Fi salvas no sistema", "Solicitar confirmação ou credenciais de administrador quando um programa tenta fazer mudanças no sistema", "Controlar o acesso remoto ao computador via RDP", "Verificar periodicamente se há vírus e malwares no sistema", "Bloquear usuários não autorizados de acessar arquivos protegidos"],

    respostaCorreta: 1,

    explicacao: "UAC exibe dialogo quando processo tenta **privilegio elevado de administrador**. Para conta Administrador: caixa simples de confirmacao. Para Usuario Padrao: exige usuario e senha de administrador. Configura-se em: Painel de Controle > Contas de Usuario > Alterar configuracoes de Controle de Conta de Usuario." },


  { id: "i23", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "CEBRASPE / TRT-16", ano: 2024, dificuldade: "Médio",

    enunciado: "O que é uma VPN (Virtual Private Network) e qual é sua principal finalidade?",

    alternativas: ["É um antivírus baseado em nuvem que protege contra malwares em tempo real", "É um túnel criptografado sobre a Internet que permite acesso seguro a redes privadas remotamente", "É um tipo de servidor DNS que acelera a navegação na Internet", "É uma tecnologia para criar redes Wi-Fi mais seguras em ambientes domésticos", "É um protocolo para transmissão de vídeo em alta qualidade pela Internet"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i24", inedita: true, areaGrande: "Informática", assunto: "Microsoft Excel", banca: "FCC / TRT-14", ano: 2023, dificuldade: "Difícil",

    enunciado: "No Excel, a fórmula =SE(E(B2>=7;C2=\"Aprovado\");\"Formado\";\"Pendente\") retorna 'Formado' quando:",

    alternativas: ["B2 >= 7 OU C2 = 'Aprovado' (qualquer uma das condições)", "B2 >= 7 E C2 = 'Aprovado' (ambas as condições simultaneamente)", "B2 >= 7 E C2 diferente de 'Aprovado'", "B2 < 7 E C2 = 'Aprovado'", "Apenas quando C2 = 'Aprovado', independente do valor de B2"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i25", inedita: true, areaGrande: "Informática", assunto: "Internet", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Fácil",

    enunciado: "O que são cookies no contexto de navegação web?",

    alternativas: ["Programas maliciosos que registram teclas digitadas pelo usuário", "Arquivos de texto armazenados pelo site no navegador do usuário para manter informações de sessão e preferências", "Imagens em miniatura que aceleram o carregamento de páginas web", "Certificados digitais que autenticam a identidade de sites", "Scripts executados em segundo plano que coletam dados de forma ilegal"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i26", inedita: true, areaGrande: "Informática", assunto: "Segurança da informação", banca: "FCC / TRT-17", ano: 2024, dificuldade: "Médio",

    enunciado: "A criptografia assimétrica (de chave pública) utiliza:",

    alternativas: ["Uma única chave secreta compartilhada entre remetente e destinatário", "Um par de chaves matematicamente relacionadas: uma pública e uma privada", "Vinte e seis substituições de letras como no código César", "A chave gerada aleatoriamente a cada sessão e descartada ao final", "Três chaves: uma de criptografia, uma de decriptografia e uma de autenticação"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i27", inedita: true, areaGrande: "Informática", assunto: "Windows", banca: "CEBRASPE / TRT-22", ano: 2023, dificuldade: "Fácil",

    enunciado: "No Windows 10, qual é a função da tecla F5 no Explorador de Arquivos (File Explorer)?",

    alternativas: ["Abrir as propriedades da pasta ou arquivo selecionado", "Renomear o arquivo ou pasta selecionado", "Atualizar (refresh) a visualização da pasta atual", "Criar uma nova pasta no diretório atual", "Abrir o menu de contexto (equivalente ao botão direito do mouse)"],

    respostaCorreta: 2,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



  { id: "i28", inedita: true, areaGrande: "Informática", assunto: "Google Workspace", banca: "FCC / TRT-18", ano: 2024, dificuldade: "Médio",

    enunciado: "Qual das seguintes afirmativas sobre o Google Docs está INCORRETA?",

    alternativas: ["Permite edição colaborativa em tempo real com múltiplos usuários simultaneamente", "Mantém histórico completo de versões, permitindo restaurar qualquer versão anterior", "É necessário ter uma conta Google para visualizar um documento compartilhado como 'qualquer pessoa com o link'", "Suporta a importação e exportação de arquivos nos formatos .docx e .pdf", "Os comentários podem mencionar colaboradores usando @email para notificá-los"],

    respostaCorreta: 2,

    explicacao: "Afirmativa **INCORRETA**: C. Para visualizar documento Google compartilhado como 'qualquer pessoa com o link', **nao e necessario ter conta Google**. Qualquer pessoa com o link abre no navegador sem login. Conta Google necessaria apenas para editar, comentar ou criar documentos no Google Docs." },


  { id: "i29", inedita: true, areaGrande: "Informática", assunto: "LGPD", banca: "CEBRASPE / INSS", ano: 2024, dificuldade: "Médio",

    enunciado: "O Marco Civil da Internet (Lei 12.965/2014) estabelece o princípio da neutralidade de rede, que determina:",

    alternativas: ["Que provedores de internet podem cobrar tarifas diferenciadas por serviços que consomem mais banda", "Que os provedores de acesso não podem discriminar o tráfego de dados por conteúdo, origem, destino, serviço ou aplicação", "Que o usuário pode navegar anonimamente na internet sem identificação", "Que os dados do usuário não podem ser compartilhados com terceiros sem autorização", "Que os provedores devem oferecer internet gratuita para fins educacionais"],

    respostaCorreta: 1,

    explicacao: "Marco Civil da Internet (Lei 12.965/2014), Art. 9o — **Neutralidade de rede**: provedores devem tratar todos os pacotes igualmente, sem discriminar por conteudo, origem, destino, servico ou aplicacao. Excecoes: requisitos tecnicos indispensaveis e emergencias. Proibida cobranca diferenciada por tipo de conteudo." },


  { id: "i30", inedita: true, areaGrande: "Informática", assunto: "Redes de computadores", banca: "FCC / TRT-19", ano: 2024, dificuldade: "Médio",

    enunciado: "O protocolo POP3, utilizado para recebimento de e-mails, diferencia-se do IMAP principalmente porque:",

    alternativas: ["POP3 usa criptografia; IMAP não possui segurança", "POP3 baixa e (por padrão) remove as mensagens do servidor; IMAP sincroniza as mensagens mantendo-as no servidor", "POP3 é mais moderno e suporta múltiplas pastas; IMAP só acessa a caixa de entrada", "POP3 opera na porta 443; IMAP opera na porta 25", "POP3 e IMAP são sinônimos e funcionam da mesma forma"],

    respostaCorreta: 1,

    explicacao: "**DNS** (Domain Name System) converte nomes legíveis (www.trt.jus.br) em endereços IP numéricos (192.168.1.1). Funciona como a "lista telefônica" da Internet. Sem DNS, precisaríamos memorizar IPs para cada site. O DNS opera principalmente na porta **53** UDP/TCP." },



];





// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const QUESTOES: Questao[] = (QUESTOES_BASE as any[]).filter(Boolean).map((q) => ({ ...q, bloco: bloco(q.assunto), inedita: q.inedita ?? false }));



export const AREAS_GRANDES: AreaGrande[] = ["Português", "Matemática/Raciocínio Lógico", "Informática", "Eletrotécnica", "Legislação", "Eletrônica", "Telecomunicações"];



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
