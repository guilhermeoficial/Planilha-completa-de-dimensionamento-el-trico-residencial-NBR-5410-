import Link from "next/link";
import { calcularBalanco } from "@/lib/nbr5410";

export default function Home() {
  const demo = calcularBalanco([
    { fase: "R", potenciaW: 15100 },
    { fase: "S", potenciaW: 16900 },
    { fase: "T", potenciaW: 4600 },
  ]);
  const demoBalanceado = calcularBalanco([
    { fase: "R", potenciaW: 12200 },
    { fase: "S", potenciaW: 12100 },
    { fase: "T", potenciaW: 12300 },
  ]);

  return (
    <main className="flex-1 blueprint-grid">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </div>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <Link href="/login" className="hover:text-text transition-colors">Entrar</Link>
          <Link
            href="/login"
            className="rounded-md bg-accent px-4 py-2 font-medium text-bg hover:opacity-90 transition-opacity"
          >
            Criar conta
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">NBR 5410 · circuitos residenciais</p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Levante a carga.
            <br />
            Equilibre as fases.
            <br />
            <span className="text-accent">Em um clique.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted">
            Cadastre os ambientes do projeto, vincule os equipamentos e deixe o motor de cálculo
            dimensionar cabos, disjuntores e redistribuir os circuitos entre as fases R, S e T —
            seguindo a previsão de carga da NBR 5410, item 9.5.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/login"
              className="rounded-md bg-accent px-5 py-3 font-medium text-bg hover:opacity-90 transition-opacity"
            >
              Começar um projeto
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-panel-border bg-panel p-6 shadow-2xl shadow-black/40">
          <p className="mb-4 font-display text-sm font-semibold text-muted">Balanceamento de fases</p>
          <div className="space-y-3">
            <PhaseDemo label="Antes" data={demo} />
            <div className="flex items-center gap-2 py-1 text-xs text-muted">
              <span>↓ botão "Balancear fases automaticamente" ↓</span>
            </div>
            <PhaseDemo label="Depois" data={demoBalanceado} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Previsão de carga", desc: "Iluminação e TUG calculados por ambiente conforme NBR 5410 9.5, a partir de área e perímetro." },
            { title: "Memorial de circuitos", desc: "Corrente de projeto, seção do cabo, queda de tensão e disjuntor — calculados automaticamente." },
            { title: "Balanceamento de fases", desc: "Algoritmo guloso redistribui os circuitos entre R, S e T para minimizar o desbalanceamento." },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border border-panel-border bg-bg-elevated p-5">
              <h3 className="font-display text-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function PhaseDemo({ label, data }: { label: string; data: ReturnType<typeof calcularBalanco> }) {
  const max = Math.max(data.R, data.S, data.T, 1);
  const bars: { fase: "R" | "S" | "T"; valor: number; color: string }[] = [
    { fase: "R", valor: data.R, color: "var(--phase-r)" },
    { fase: "S", valor: data.S, color: "var(--phase-s)" },
    { fase: "T", valor: data.T, color: "var(--phase-t)" },
  ];
  return (
    <div className="rounded-md border border-panel-border bg-bg p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-muted">{label}</span>
        <span
          className={`tabular text-xs ${
            data.status === "ok" ? "text-ok" : data.status === "atencao" ? "text-warn" : "text-danger"
          }`}
        >
          {data.desbalanceamentoPercent.toFixed(1)}% desbalanço
        </span>
      </div>
      <div className="space-y-1.5">
        {bars.map((b) => (
          <div key={b.fase} className="flex items-center gap-2">
            <span className="w-3 font-mono text-xs text-muted">{b.fase}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(b.valor / max) * 100}%`, background: b.color }}
              />
            </div>
            <span className="tabular w-16 text-right text-xs text-muted">{b.valor.toLocaleString("pt-BR")} W</span>
          </div>
        ))}
      </div>
    </div>
  );
}
