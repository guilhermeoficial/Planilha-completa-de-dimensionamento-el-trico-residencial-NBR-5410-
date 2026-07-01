import Link from "next/link";
import { BookOpen, GraduationCap, Wrench, ArrowRight, Zap, Target, BarChart3, Sparkles } from "lucide-react";
import TemaToggle from "@/components/tema-toggle";

export default function Home() {
  return (
    <main className="min-h-screen blueprint-grid">

      {/* ── Header ── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </div>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <TemaToggle />
          <Link href="/login" className="hover:text-text transition-colors">Entrar</Link>
          <Link href="/assinar" className="rounded-md bg-accent px-4 py-2 font-medium text-bg hover:opacity-90 transition-opacity">
            Começar grátis
          </Link>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Plataforma completa para Eletrotécnica
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Estude. Pratique.
          <br />
          <span className="text-accent">Passe.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          A Voltis reúne banco de questões inéditas, módulos de ensino interativos e ferramentas
          de dimensionamento elétrico — tudo em um só lugar, feito para quem quer aprovação.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/assinar" className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90 transition-opacity">
            <Zap size={16} /> Começar grátis
          </Link>
          <Link href="/login" className="flex items-center gap-2 rounded-md border border-panel-border px-6 py-3 font-medium text-muted hover:text-text transition-colors">
            Já tenho conta <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Dois produtos em destaque ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Voltis Questões */}
          <div className="group relative overflow-hidden rounded-2xl border border-panel-border bg-panel shadow-2xl shadow-black/30 transition-transform hover:-translate-y-1">
            {/* faixa de cor no topo */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent" />
            <div className="p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                  <BookOpen size={22} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">Voltis</p>
                  <h2 className="font-display text-xl font-bold">Questões</h2>
                </div>
              </div>

              <p className="mb-6 text-muted leading-relaxed">
                Banco com questões inéditas e exclusivas de Eletrotécnica, Eletrônica e mais —
                com gabarito comentado, filtros por banca, ano e dificuldade, caderno de erros e estatísticas.
              </p>

              <ul className="mb-8 space-y-2.5 text-sm">
                {[
                  { icon: Sparkles, text: "Questões inéditas — você não acha em outro lugar" },
                  { icon: Target,   text: "Gabarito comentado com explicação completa" },
                  { icon: BarChart3,text: "Estatísticas de desempenho e caderno de erros" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-muted">
                    <Icon size={14} className="shrink-0 text-accent" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted">A partir de</p>
                  <p className="font-display text-2xl font-bold">
                    R$19,90<span className="text-sm font-normal text-muted">/mês</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted">ou grátis com 5 questões/dia</p>
                </div>
                <Link
                  href="/assinar?plano=questoes"
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg hover:opacity-90 transition-opacity"
                >
                  Acessar <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Voltis Ensino */}
          <div className="group relative overflow-hidden rounded-2xl border border-panel-border bg-panel shadow-2xl shadow-black/30 transition-transform hover:-translate-y-1">
            <div className="h-1.5 w-full bg-gradient-to-r from-phase-t via-phase-t/60 to-transparent" />
            <div className="p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-phase-t/15">
                  <GraduationCap size={22} className="text-phase-t" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">Voltis</p>
                  <h2 className="font-display text-xl font-bold">Ensino</h2>
                </div>
              </div>

              <p className="mb-6 text-muted leading-relaxed">
                Módulos completos de Eletrotécnica, Eletrônica e Instrumentação — com conteúdo
                extenso, equações renderizadas e dicas interativas que mostram gráficos ao passar o mouse.
              </p>

              <ul className="mb-8 space-y-2.5 text-sm">
                {[
                  { icon: GraduationCap, text: "5 módulos por área — do básico ao avançado" },
                  { icon: Sparkles,      text: "Dicas interativas com gráficos ao passar o mouse" },
                  { icon: BookOpen,      text: "Equações, exemplos resolvidos e memoriais" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-muted">
                    <Icon size={14} className="shrink-0 text-phase-t" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted">A partir de</p>
                  <p className="font-display text-2xl font-bold">
                    R$39,90<span className="text-sm font-normal text-muted">/mês</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted">ou grátis com Módulo 1 de cada curso</p>
                </div>
                <Link
                  href="/assinar?plano=ensino"
                  className="flex items-center gap-1.5 rounded-lg border border-phase-t bg-phase-t/10 px-5 py-2.5 font-semibold text-phase-t hover:bg-phase-t/20 transition-colors"
                >
                  Acessar <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Banner combo */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 px-8 py-5 md:flex-row">
          <div className="flex items-center gap-3">
            <Zap size={20} className="shrink-0 text-accent" />
            <div>
              <p className="font-semibold">Combo Questões + Ensino</p>
              <p className="text-sm text-muted">Leva os dois pelo preço do Ensino — Questões entra de brinde.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-display text-2xl font-bold whitespace-nowrap">
              R$39,90<span className="text-sm font-normal text-muted">/mês</span>
            </p>
            <Link
              href="/assinar?plano=combo"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Quero o combo <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ferramentas (destaque menor) ── */}
      <section className="border-t border-panel-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-s/15">
                <Wrench size={18} className="text-phase-s" />
              </div>
              <div>
                <p className="font-semibold">Voltis Ferramentas</p>
                <p className="text-sm text-muted">
                  Dimensionamento NBR 5410, balanceamento de fases, correção de fator de potência e muito mais.
                  Para o profissional de campo.
                </p>
              </div>
            </div>
            <Link
              href="https://ferramentas.voltis.net.br"
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-phase-s/40 px-5 py-2.5 font-medium text-phase-s hover:bg-phase-s/10 transition-colors"
            >
              Acessar Ferramentas <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-panel-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted">
          <p>© 2025 Voltis. Todos os direitos reservados.</p>
          <p>Feito para quem quer aprovação.</p>
        </div>
      </footer>
    </main>
  );
}
