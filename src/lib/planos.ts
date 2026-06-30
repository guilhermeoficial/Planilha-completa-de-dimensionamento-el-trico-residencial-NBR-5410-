/**
 * Controle central de acesso por plano.
 *
 * Planos disponíveis:
 *   free     — até 5 questões/dia, gabarito comentado só na 1ª, só Módulo 1 de cada curso
 *   questoes — questões ilimitadas + gabarito completo (sem acesso ao Ensino)
 *   ensino   — todos os módulos (sem acesso ao banco de questões)
 *   combo    — tudo: questões ilimitadas + todos os módulos
 */

export type Plano = "free" | "questoes" | "ensino" | "combo";

export const LIMITE_QUESTOES_FREE = 5;   // questões por dia
export const GABARITO_FREE_MAX    = 1;   // gabaritos comentados completos por dia

/** Usuário pode acessar o banco de questões completo? */
export function podeAcessarQuestoes(plano: Plano): boolean {
  return plano === "questoes" || plano === "combo";
}

/** Usuário pode acessar os módulos de ensino completos? */
export function podeAcessarEnsino(plano: Plano): boolean {
  return plano === "ensino" || plano === "combo";
}

/** Usuário pode ver gabarito comentado nessa questão (dado quantas já viu hoje)? */
export function podeVerGabarito(plano: Plano, gabaritoVistoHoje: number): boolean {
  if (podeAcessarQuestoes(plano)) return true;               // plano pago: sempre
  return gabaritoVistoHoje < GABARITO_FREE_MAX;              // free: só o primeiro
}

/** Usuário pode responder mais questões hoje? */
export function podeResponderQuestao(plano: Plano, questoesHoje: number): boolean {
  if (podeAcessarQuestoes(plano)) return true;
  return questoesHoje < LIMITE_QUESTOES_FREE;
}

/** Módulo está liberado para o usuário? */
export function moduloLiberado(plano: Plano, numeroModulo: number): boolean {
  if (podeAcessarEnsino(plano)) return true;
  return numeroModulo === 1;   // free: só Módulo 1
}

/** Texto do CTA de upgrade para cada contexto */
export function ctaUpgrade(contexto: "questoes" | "ensino" | "combo"): string {
  if (contexto === "questoes") return "Assinar Voltis Questões — R$19,90/mês";
  if (contexto === "ensino")   return "Assinar Voltis Ensino — R$39,90/mês";
  return "Assinar Combo Questões + Ensino — R$39,90/mês";
}

/** URL de assinatura com plano pré-selecionado */
export function urlAssinar(plano: "questoes" | "ensino" | "combo"): string {
  return `/assinar?plano=${plano}`;
}
