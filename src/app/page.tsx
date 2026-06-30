"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, BookOpen, Wrench, X } from "lucide-react";

type Plano = "questoes" | "ensino" | "combo";

const PLANOS = [
  {
    id: "questoes" as Plano,
    nome: "Voltis Questões",
    preco: "R$ 19,90",
    periodo: "/mês",
    descricao: "Para quem quer arrasar nas provas.",
    icone: BookOpen,
    destaque: false,
    itens: [
      "Questões ilimitadas por dia",
      "Gabarito comentado em todas",
      "Filtros por banca, ano e dificuldade",
      "Questões inéditas exclusivas",
      "Estatísticas e caderno de erros",
      "Anotações por questão",
    ],
    nao: ["Módulos de ensino em vídeo", "Materiais didáticos"],
  },
  {
    id: "combo" as Plano,
    nome: "Voltis Combo",
    preco: "R$ 39,90",
    periodo: "/mês",
    descricao: "Questões + Ensino. Questões entra de brinde.",
    icone: Zap,
    destaque: true,
    badge: "Melhor custo-benefício",
    itens: [
      "Tudo do plano Questões",
      "Todos os módulos de ensino",
      "Videoaulas e materiais didáticos",
      "Dicas interativas com gráficos",
      "Navegação entre Questões e Ensino",
      "Acesso aos dois sites com um login",
    ],
    nao: [],
  },
  {
    id: "ensino" as Plano,
    nome: "Voltis Ensino",
    preco: "R$ 39,90",
    periodo: "/mês",
    descricao: "Para quem quer aprender do zero.",
    icone: Wrench,
    destaque: false,
    itens: [
      "Todos os módulos de ensino",
      "Videoaulas e materiais didáticos",
      "Dicas interativas com gráficos",
      "Eletrotécnica, Eletrônica e mais",
    ],
    nao: ["Banco de questões", "Gabarito comentado"],
  },
];

export default function AssinarPage() {
  const [carregando, setCarregando] = useState<Plano | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function assinar(plano: Plano) {
    setCarregando(plano);
    setErro(null);
    try {
      const resp = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plano }),
      });
      const data = await resp.json();
      if (data.url) window.location.href = data.url;
      else setErro(data.error ?? "Não foi possível iniciar o pagamento.");
    } catch {
      setErro("Não foi possível conectar ao Stripe. Tente novamente.");
    }
    setCarregando(null);
  }

  return (
    <main className="min-h-screen blueprint-grid px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>

        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold">Escolha seu plano</h1>
          <p className="mt-2 text-muted">
            Comece grátis — 5 questões por dia e Módulo 1 de cada curso sem precisar de cartão.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANOS.map((p) => {
            const Icone = p.icone;
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-xl border p-7 shadow-2xl shadow-black/30 ${
                  p.destaque
                    ? "border-accent bg-panel ring-2 ring-accent/30"
                    : "border-panel-border bg-panel"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-bg">
                    {p.badge}
                  </span>
                )}

                <div className="mb-4 flex items-center gap-2">
                  <Icone size={18} className={p.destaque ? "text-accent" : "text-muted"} />
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">{p.nome}</span>
                </div>

                <p className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold">{p.preco}</span>
                  <span className="text-sm text-muted">{p.periodo}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{p.descricao}</p>

                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {p.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-ok" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {p.nao.map((item) => (
                    <li key={item} className="flex items-start gap-2 opacity-40">
                      <X size={15} className="mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => assinar(p.id)}
                  disabled={carregando !== null}
                  className={`mt-8 flex w-full items-center justify-center gap-1.5 rounded-md py-2.5 font-medium transition-opacity disabled:opacity-50 ${
                    p.destaque
                      ? "bg-accent text-bg hover:opacity-90"
                      : "border border-panel-border bg-bg-elevated hover:bg-panel-border"
                  }`}
                >
                  <Zap size={15} />
                  {carregando === p.id ? "Abrindo pagamento..." : "Assinar agora"}
                </button>
              </div>
            );
          })}
        </div>

        {erro && <p className="mt-6 text-center text-sm text-danger">{erro}</p>}

        <p className="mt-8 text-center text-xs text-muted">
          Pagamento seguro via Stripe. Aceita cartão e Pix. Cancele quando quiser, sem multa.
        </p>
      </div>
    </main>
  );
}
