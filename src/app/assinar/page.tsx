"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

export default function AssinarPage() {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function assinar() {
    setCarregando(true);
    setErro(null);
    try {
      const resp = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await resp.json();
      if (data.url) window.location.href = data.url;
      else setErro(data.error ?? "Não foi possível iniciar o pagamento.");
    } catch {
      setErro("Não foi possível conectar ao Stripe. Tente novamente.");
    }
    setCarregando(false);
  }

  return (
    <main className="flex flex-1 items-center justify-center blueprint-grid px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>

        <div className="rounded-xl border border-panel-border bg-panel p-7 shadow-2xl shadow-black/40">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            Oferta de lançamento
          </span>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Plano único</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-base text-muted line-through">R$ 39,90</span>
            <span className="font-display text-3xl font-bold">R$ 19,90</span>
            <span className="text-base font-normal text-muted">/mês</span>
          </p>
          <p className="mt-1 text-sm text-muted">Cancele quando quiser, sem multa.</p>

          <ul className="mt-6 space-y-2.5 text-sm">
            {[
              "Projetos ilimitados",
              "Geração automática de circuitos",
              "Balanceamento automático de fases",
              "Orçamento estimado de materiais",
              "Módulo industrial / correção de FP",
              "Exportação em Excel e PDF",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-ok" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={assinar}
            disabled={carregando}
            className="mt-7 flex w-full items-center justify-center gap-1.5 rounded-md bg-accent py-2.5 font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Zap size={16} /> {carregando ? "Abrindo pagamento..." : "Assinar agora"}
          </button>
          {erro && <p className="mt-3 text-sm text-danger">{erro}</p>}

          <p className="mt-4 text-center text-xs text-muted">
            Pagamento processado de forma segura pelo Stripe. Aceita cartão de crédito e Pix.
          </p>
        </div>
      </div>
    </main>
  );
}
