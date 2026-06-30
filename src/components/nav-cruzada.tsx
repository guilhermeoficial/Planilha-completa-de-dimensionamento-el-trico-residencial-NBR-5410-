"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import type { Plano } from "@/lib/planos";

const URL_ENSINO   = process.env.NEXT_PUBLIC_URL_ENSINO   ?? "https://ensino.voltis.net.br";
const URL_QUESTOES = process.env.NEXT_PUBLIC_URL_QUESTOES ?? "https://voltis.net.br";

interface Props {
  siteAtual: "questoes" | "ensino";
  plano: Plano;
}

/**
 * Barra de navegação cruzada exibida no topo do dashboard.
 * Mostra o site irmão e, se o usuário não tiver acesso, exibe CTA de upgrade.
 */
export default function NavCruzada({ siteAtual, plano }: Props) {
  const temCombo   = plano === "combo";
  const temQuestoes = plano === "questoes" || plano === "combo";
  const temEnsino  = plano === "ensino"   || plano === "combo";

  if (siteAtual === "questoes") {
    return (
      <div className="flex items-center gap-3 border-b border-panel-border bg-bg-elevated px-6 py-2 text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-accent">
          <BookOpen size={13} /> Voltis Questões
        </span>
        <span className="text-panel-border">|</span>
        {temEnsino || temCombo ? (
          <a
            href={URL_ENSINO}
            className="flex items-center gap-1 text-muted transition-colors hover:text-text"
          >
            <GraduationCap size={13} /> Ir para Voltis Ensino
            <ArrowRight size={11} />
          </a>
        ) : (
          <Link
            href="/assinar?plano=combo"
            className="flex items-center gap-1 text-muted transition-colors hover:text-accent"
          >
            <GraduationCap size={13} />
            Acessar Voltis Ensino
            <span className="ml-1 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-accent">
              Combo R$39,90
            </span>
          </Link>
        )}
      </div>
    );
  }

  // siteAtual === "ensino"
  return (
    <div className="flex items-center gap-3 border-b border-panel-border bg-bg-elevated px-6 py-2 text-xs">
      <span className="flex items-center gap-1.5 font-semibold text-accent">
        <GraduationCap size={13} /> Voltis Ensino
      </span>
      <span className="text-panel-border">|</span>
      {temQuestoes || temCombo ? (
        <a
          href={URL_QUESTOES}
          className="flex items-center gap-1 text-muted transition-colors hover:text-text"
        >
          <BookOpen size={13} /> Ir para Voltis Questões
          <ArrowRight size={11} />
        </a>
      ) : (
        <Link
          href="/assinar?plano=combo"
          className="flex items-center gap-1 text-muted transition-colors hover:text-accent"
        >
          <BookOpen size={13} />
          Acessar Voltis Questões
          <span className="ml-1 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-accent">
            Combo R$39,90
          </span>
        </Link>
      )}
    </div>
  );
}
