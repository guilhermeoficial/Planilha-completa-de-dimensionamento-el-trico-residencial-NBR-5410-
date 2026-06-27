import Link from "next/link";
import { ArrowLeft, GraduationCap, Lock, HelpCircle, BookOpen } from "lucide-react";
import { AREAS, type Nivel } from "@/lib/cursos-data";

export default function CursosPage() {
  const niveis: Nivel[] = ["Técnico", "Superior"];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Projetos
      </Link>

      <h1 className="font-display text-2xl font-bold">Cursos</h1>
      <p className="mt-1 text-sm text-muted">Conteúdo técnico em elétrica e eletrônica, organizado por módulos e voltado também para concursos.</p>

      <Link
        href="/dashboard/cursos/questoes"
        className="mt-6 flex items-center gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4 transition-colors hover:border-accent"
      >
        <HelpCircle size={20} className="text-accent" />
        <div>
          <p className="font-display font-semibold text-accent">Banco de Questões</p>
          <p className="text-sm text-muted">Pratique com questões de concursos anteriores, com gabarito comentado.</p>
        </div>
      </Link>

      {niveis.map((nivel) => {
        const areasDoNivel = AREAS.filter((a) => a.nivel === nivel);
        return (
          <div key={nivel} className="mt-8">
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted">Nível {nivel}</h2>
            {areasDoNivel.length === 0 ? (
              <div className="relative max-w-sm rounded-lg border border-dashed border-panel-border bg-bg-elevated/40 p-5 opacity-70">
                <Lock size={14} className="absolute right-4 top-4 text-muted" />
                <GraduationCap size={20} className="text-muted" />
                <h3 className="mt-3 font-display font-semibold text-muted">Em breve</h3>
                <p className="mt-1.5 text-sm text-muted">Conteúdo de nível {nivel.toLowerCase()} chegando em breve.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {areasDoNivel.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/dashboard/cursos/${area.slug}`}
                    className="group rounded-lg border border-panel-border bg-panel p-5 transition-colors hover:border-accent"
                  >
                    <BookOpen size={20} className="text-accent" />
                    <h3 className="mt-3 font-display font-semibold">{area.nome}</h3>
                    <p className="mt-1.5 text-sm text-muted">{area.descricao}</p>
                    <p className="mt-3 text-xs text-muted">
                      {area.modulos.length > 0 ? `${area.modulos.length} módulo(s) disponível(is)` : "Conteúdo em preparação"}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
