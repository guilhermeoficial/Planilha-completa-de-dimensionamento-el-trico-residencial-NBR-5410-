import Link from "next/link";
import {
  BookOpen, GraduationCap, Wrench, ArrowRight, Landmark, Target, BarChart3,
  CheckCircle2, Users, Trophy, Clock, ShieldCheck, ScrollText,
} from "lucide-react";
import TemaToggle from "@/components/tema-toggle";

export default function Home() {
  return (
    <main className="min-h-screen blueprint-grid">

      {/* ── Header institucional ── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-md border-b border-panel-border bg-bg/85">
        <div className="flex items-center gap-2.5">
          <span className="selo h-8 w-8 shrink-0 text-accent">
            <Landmark size={15} />
          </span>
          <div className="leading-none">
            <div className="font-display text-lg font-semibold tracking-tight">Voltis</div>
            <div className="text-[10px] uppercase tracking-widest text-muted">Preparação para concursos</div>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <TemaToggle />
          <Link href="/login" className="hover:text-text transition-colors">Entrar</Link>
          <Link href="/assinar" className="rounded-md bg-accent px-4 py-2 font-semibold text-accent-ink hover:opacity-90 transition-opacity text-sm">
            Começar agora
          </Link>
        </nav>
      </header>

      {/* ── Faixa de edital vigente ── */}
      <div className="border-b border-panel-border bg-bg-elevated/60">
        <p className="mx-auto max-w-6xl px-6 py-2 text-center text-xs font-semibold uppercase tracking-widest text-muted">
          Edital vigente — <span className="text-accent">Petrobras</span> · Transpetro · TRT/TST · INSS 2025
        </p>
      </div>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 text-center">
        <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl mb-6">
          Preparação séria para quem
          leva o concurso a sério
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted leading-relaxed mb-9">
          Cursos completos, banco de questões fiel às bancas CESGRANRIO e CEBRASPE,
          dimensionamento conforme a NBR 5410 e simulados — em uma única plataforma
          voltada à Eletrotécnica.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link href="/assinar" className="flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 font-semibold text-accent-ink hover:opacity-90 transition-opacity text-base">
            Começar agora <ArrowRight size={18} />
          </Link>
          <Link href="/login" className="flex items-center gap-2 rounded-md border border-panel-border px-7 py-3.5 font-semibold text-text hover:border-accent transition-colors text-base">
            Já tenho conta
          </Link>
        </div>

        {/* Quadro de indicadores, estilo boletim oficial */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 divide-y divide-panel-border rounded-lg border border-panel-border bg-panel sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          {[
            { icon: BookOpen, valor: "517+", label: "Questões comentadas" },
            { icon: GraduationCap, valor: "8", label: "Cursos completos" },
            { icon: Target, valor: "CESGRANRIO", label: "Fiel ao estilo da banca" },
            { icon: Users, valor: "ByteVolt", label: "Quiz ao vivo para turmas" },
          ].map(({ icon: Icon, valor, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 px-4 py-5">
              <Icon size={16} className="text-accent" />
              <span className="font-display text-lg font-semibold text-text">{valor}</span>
              <span className="text-xs text-muted text-center leading-tight">{label}</span>
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
            { nome: "Petrobras", ênfase: "Ênfase 5 — Manutenção Elétrica", badge: "Edital 2024" },
            { nome: "Transpetro", ênfase: "Técnico de Manutenção", badge: "Edital 2025" },
            { nome: "TRT / TST", ênfase: "Técnico em TI", badge: "Em andamento" },
            { nome: "INSS 2026", ênfase: "Informática — CEBRASPE", badge: "Previsto 2026" },
          ].map(({ nome, ênfase, badge }) => (
            <div key={nome} className="rounded-lg border border-panel-border bg-panel p-4">
              <div className="text-[10px] font-bold uppercase tracking-wide text-accent mb-1">{badge}</div>
              <div className="font-display font-semibold text-sm">{nome}</div>
              <div className="text-xs text-muted mt-1">{ênfase}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Módulos/Produtos ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-center font-display text-2xl font-semibold mb-2">
          Tudo que você precisa para passar
        </h2>
        <p className="text-center text-sm text-muted mb-10">
          Cada recurso foi desenvolvido especificamente para os editais das maiores bancas do Brasil
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              titulo: "Cursos estruturados",
              desc: "Módulos completos com teoria, fórmulas em LaTeX, exemplos resolvidos e quiz ao final de cada página. Petrobras, Transpetro, TRT e INSS.",
              items: ["Eletrotécnica básica ao avançado", "Instrumentação e automação industrial", "NR-10, NR-35 e segurança do trabalho"],
            },
            {
              icon: Target,
              titulo: "Banco de questões",
              desc: "Questões fiel ao estilo CESGRANRIO e CEBRASPE, com gabarito e explicação passo a passo. Filtre por assunto, banca e dificuldade.",
              items: ["517+ questões comentadas", "Estilo CESGRANRIO e CEBRASPE", "Pontos fracos identificados automaticamente"],
            },
            {
              icon: Wrench,
              titulo: "Dimensionamento elétrico",
              desc: "Calculadora de projetos elétricos residenciais conforme NBR 5410, com memorial de cálculo e critérios da COSERN e outras concessionárias.",
              items: ["Dimensionamento automático NBR 5410", "Memorial de cálculo completo", "Critérios COSERN, CELPE, CEMIG"],
            },
            {
              icon: Trophy,
              titulo: "ByteVolt — Quiz ao vivo",
              desc: "Quiz multiplayer em tempo real com PIN para turmas. Professor cria a sala, alunos entram pelo celular, ranking ao vivo na tela.",
              items: ["PIN para turmas em tempo real", "Ranking animado estilo Kahoot", "Gratuito para todos os usuários"],
            },
            {
              icon: BarChart3,
              titulo: "Análise de desempenho",
              desc: "Acompanhe seu progresso por assunto. Identifique automaticamente os pontos fracos e saiba onde concentrar os estudos.",
              items: ["Percentual de acertos por assunto", "Pontos fracos e fortes identificados", "Histórico de questões respondidas"],
            },
            {
              icon: Clock,
              titulo: "Simulados cronometrados",
              desc: "Em breve: simulados no padrão real das provas, com cronômetro, gabarito e ranking de desempenho entre os alunos.",
              items: ["Padrão CESGRANRIO e CEBRASPE", "Cronômetro por questão", "Gabarito comentado ao final"],
              breve: true,
            },
          ].map(({ icon: Icon, titulo, desc, items, breve }) => (
            <div key={titulo} className={`rounded-lg border border-panel-border bg-panel p-5 ${breve ? "opacity-60" : ""}`}>
              <div className="mb-3 flex items-center gap-2 text-accent">
                <Icon size={17} />
                <span className="font-display font-semibold text-sm text-text">{titulo}</span>
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

      {/* ── Conteúdo programático, no formato de edital verticalizado ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-lg border border-panel-border bg-panel p-8">
          <div className="flex items-start gap-3 mb-1">
            <ScrollText size={18} className="text-accent mt-1 shrink-0" />
            <h2 className="font-display text-xl font-semibold">
              Conteúdo programático — Técnico de Manutenção Elétrica (Petrobras/Transpetro)
            </h2>
          </div>
          <p className="text-sm text-muted mb-6 ml-[27px]">Cobertura integral do edital CESGRANRIO, conforme prova de 2024</p>
          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 text-sm">
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
            ].map((item, i) => (
              <div key={item} className="flex items-baseline gap-3 text-muted py-2 border-b border-panel-border">
                <span className="font-mono tabular text-[11px] text-accent shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <div className="rounded-lg border border-panel-border bg-panel p-10">
          <span className="selo mx-auto mb-5 h-12 w-12 text-accent">
            <ShieldCheck size={20} />
          </span>
          <h2 className="font-display text-2xl font-semibold mb-3">
            Pronto para começar sua preparação?
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            Crie sua conta gratuitamente. Acesse o ByteVolt sem custo e assine
            para ter acesso completo aos cursos e ao banco de questões.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assinar" className="flex items-center justify-center gap-2 rounded-md bg-accent px-8 py-3.5 font-semibold text-accent-ink hover:opacity-90 transition-opacity">
              Assinar agora <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-2 rounded-md border border-panel-border px-8 py-3.5 font-semibold text-muted hover:text-text hover:border-accent transition-colors">
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
