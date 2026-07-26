import Link from "next/link";
import { BookOpen, GraduationCap, Wrench, ArrowRight, Zap, Target, BarChart3, Sparkles, CheckCircle2, Users, Trophy, Clock } from "lucide-react";
import TemaToggle from "@/components/tema-toggle";

export default function Home() {
  return (
    <main className="min-h-screen blueprint-grid">

      {/* ── Header ── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sticky top-0 z-50 backdrop-blur-md border-b border-panel-border bg-bg/80">
        <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
          Voltis
        </div>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <TemaToggle />
          <Link href="/login" className="hover:text-text transition-colors">Entrar</Link>
          <Link href="/assinar" className="rounded-lg bg-accent px-4 py-2 font-semibold text-bg hover:opacity-90 transition-opacity text-sm">
            Começar agora
          </Link>
        </nav>
      </header>

      {/* ── Badge de urgência ── */}
      <div className="flex justify-center pt-8 pb-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent tracking-wide">
          <Zap size={12} className="animate-pulse" />
          EDITAL VIGENTE — PETROBRAS · TRANSPETRO · TRT/TST · INSS 2025
        </span>
      </div>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-16 text-center">
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl mb-6">
          A plataforma que{" "}
          <span className="text-accent">aprova</span>{" "}
          técnicos em eletrotécnica
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted leading-relaxed mb-8">
          Cursos completos, banco de questões das bancas CESGRANRIO e CEBRASPE,
          dimensionamento NBR 5410 e quiz ao vivo para turmas. Tudo em uma plataforma.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link href="/assinar" className="flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 font-bold text-bg hover:opacity-90 transition-opacity text-base">
            Começar agora <ArrowRight size={18} />
          </Link>
          <Link href="/login" className="flex items-center gap-2 rounded-xl border border-panel-border px-7 py-3.5 font-semibold text-text hover:border-accent transition-colors text-base">
            Já tenho conta
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {[
            { icon: BookOpen, valor: "456+", label: "Questões comentadas" },
            { icon: GraduationCap, valor: "8", label: "Cursos completos" },
            { icon: Target, valor: "CESGRANRIO", label: "Questões fiel às bancas" },
            { icon: Users, valor: "ByteVolt", label: "Quiz ao vivo para turmas" },
          ].map(({ icon: Icon, valor, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted">
              <Icon size={15} className="text-accent" />
              <span className="font-bold text-text">{valor}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Concursos em destaque ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-6">
          Prepare-se para os concursos mais disputados
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { nome: "Petrobras", ênfase: "Ênfase 5 — Manutenção Elétrica", cor: "bg-accent/10 border-accent/30 text-accent", badge: "Edital 2024" },
            { nome: "Transpetro", ênfase: "Técnico de Manutenção", cor: "bg-phase-s/10 border-phase-s/30 text-phase-s", badge: "Edital 2025" },
            { nome: "TRT / TST", ênfase: "Técnico em TI", cor: "bg-ok/10 border-ok/30 text-ok", badge: "Em andamento" },
            { nome: "INSS 2026", ênfase: "Informática — CEBRASPE", cor: "bg-warn/10 border-warn/30 text-warn", badge: "Previsto 2026" },
          ].map(({ nome, ênfase, cor, badge }) => (
            <div key={nome} className={`rounded-xl border p-4 ${cor}`}>
              <div className="text-[10px] font-bold uppercase tracking-wide opacity-70 mb-1">{badge}</div>
              <div className="font-bold text-sm">{nome}</div>
              <div className="text-xs opacity-80 mt-1">{ênfase}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Módulos/Produtos ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-center font-display text-2xl font-bold mb-2">
          Tudo que você precisa para passar
        </h2>
        <p className="text-center text-sm text-muted mb-10">
          Cada recurso foi desenvolvido especificamente para os editais das maiores bancas do Brasil
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              titulo: "Cursos Estruturados",
              desc: "Módulos completos com teoria, fórmulas em LaTeX, exemplos resolvidos e quiz ao final de cada página. Petrobras, Transpetro, TRT e INSS.",
              cor: "text-accent",
              items: ["Eletrotécnica básica ao avançado", "Instrumentação e automação industrial", "NR-10, NR-35 e segurança do trabalho"],
            },
            {
              icon: Target,
              titulo: "Banco de Questões",
              desc: "Questões fiel ao estilo CESGRANRIO e CEBRASPE, com gabarito e explicação passo a passo. Filtre por assunto, banca e dificuldade.",
              cor: "text-phase-s",
              items: ["456+ questões comentadas", "Estilo CESGRANRIO e CEBRASPE", "Pontos fracos identificados automaticamente"],
            },
            {
              icon: Wrench,
              titulo: "Dimensionamento Elétrico",
              desc: "Calculadora de projetos elétricos residenciais conforme NBR 5410, com memorial de cálculo e critérios da COSERN e outras concessionárias.",
              cor: "text-ok",
              items: ["Dimensionamento automático NBR 5410", "Memorial de cálculo completo", "Critérios COSERN, CELPE, CEMIG"],
            },
            {
              icon: Trophy,
              titulo: "ByteVolt — Quiz ao Vivo",
              desc: "Quiz multiplayer em tempo real com PIN para turmas. Professor cria a sala, alunos entram pelo celular, ranking ao vivo na tela.",
              cor: "text-warn",
              items: ["PIN para turmas em tempo real", "Ranking animado estilo Kahoot", "GRATUITO para todos os usuários"],
            },
            {
              icon: BarChart3,
              titulo: "Análise de Desempenho",
              desc: "Acompanhe seu progresso por assunto. Identifique automaticamente os pontos fracos e saiba onde concentrar os estudos.",
              cor: "text-accent",
              items: ["Percentual de acertos por assunto", "Pontos fracos e fortes identificados", "Histórico de questões respondidas"],
            },
            {
              icon: Clock,
              titulo: "Simulados Cronometrados",
              desc: "Em breve: simulados no padrão real das provas, com cronômetro, gabarito e ranking de desempenho entre os alunos.",
              cor: "text-muted",
              items: ["Padrão CESGRANRIO e CEBRASPE", "Cronômetro por questão", "Gabarito comentado ao final"],
              breve: true,
            },
          ].map(({ icon: Icon, titulo, desc, cor, items, breve }) => (
            <div key={titulo} className={`rounded-xl border border-panel-border bg-panel p-5 ${breve ? "opacity-60" : ""}`}>
              <div className={`mb-3 flex items-center gap-2 ${cor}`}>
                <Icon size={18} />
                <span className="font-bold text-sm">{titulo}</span>
                {breve && <span className="ml-auto rounded-full bg-muted/20 px-2 py-0.5 text-[10px] font-bold text-muted">EM BREVE</span>}
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">{desc}</p>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 size={11} className="text-ok shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conteúdo programático destacado ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
          <h2 className="font-display text-xl font-bold mb-1">
            Conteúdo programático — Técnico Manutenção Elétrica (Petrobras/Transpetro)
          </h2>
          <p className="text-sm text-muted mb-6">Cobertura total do edital CESGRANRIO, conforme prova de 2024</p>
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {[
              "Circuitos CC e CA — Lei de Ohm e Kirchhoff",
              "Fator de potência e correção de FP",
              "Motores de indução trifásicos",
              "Transformadores de potência",
              "Partida de motores (DOL, Y-Δ, Soft-starter, VFD)",
              "NR-10 — Segurança em instalações elétricas",
              "NBR 5410 — Instalações de baixa tensão",
              "Aterramento e proteção contra choques",
              "Disjuntores, fusíveis, DRs e DPS",
              "Máquinas de corrente contínua",
              "Redes de distribuição (MT e BT)",
              "Qualidade de energia e harmônicos",
              "CLP e automação industrial básica",
              "Instrumentação e medidas elétricas",
              "NR-35 — Trabalho em altura",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-muted py-1 border-b border-panel-border/50">
                <CheckCircle2 size={12} className="text-accent shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <div className="rounded-2xl border border-panel-border bg-panel p-10">
          <Sparkles size={32} className="mx-auto mb-4 text-accent" />
          <h2 className="font-display text-3xl font-bold mb-3">
            Pronto para começar?
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            Crie sua conta gratuitamente. Acesse o ByteVolt de graça e assine
            para ter acesso completo aos cursos e ao banco de questões.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assinar" className="flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-bg hover:opacity-90 transition-opacity">
              Assinar agora <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-2 rounded-xl border border-panel-border px-8 py-3.5 font-semibold text-muted hover:text-text hover:border-accent transition-colors">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-panel-border py-6 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} Voltis — Plataforma de estudos para Eletrotécnica</p>
        <p className="mt-1">Desenvolvido para concursos Petrobras · Transpetro · TRT · TST · INSS</p>
      </footer>
    </main>
  );
}
