"use client";

import { Printer } from "lucide-react";
import type { DossieJson, DossieSecao } from "@/lib/types";

const TAG_COR: Record<string, string> = {
  PENDENTE: "text-warn border-warn/40 bg-warn/10",
  RISCO: "text-danger border-danger/40 bg-danger/10",
  RECOMENDAÇÃO: "text-accent border-accent/40 bg-accent/10",
};

function Secao({ s }: { s: DossieSecao }) {
  return (
    <section className="rounded-lg border border-panel-border bg-panel p-5 print:break-inside-avoid">
      <h3 className="font-display text-sm font-semibold">{s.titulo}</h3>
      {s.descricao && <p className="mt-1 text-xs text-muted">{s.descricao}</p>}

      {s.tipo === "kv" && (
        <dl className="mt-3 divide-y divide-panel-border text-sm">
          {s.itens.map((i) => (
            <div key={i.k} className="grid gap-1 py-2 sm:grid-cols-[14rem_1fr]">
              <dt className="text-muted">{i.k}</dt>
              <dd>{i.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {s.tipo === "tabela" && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-panel-border text-muted">
                {s.colunas.map((c, i) => (
                  <th key={c} className={`whitespace-nowrap px-2 py-1.5 font-medium ${s.alinharDireita?.includes(i) ? "text-right" : ""}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.linhas.map((l, ri) => {
                const ultima = s.destacarUltima && ri === s.linhas.length - 1;
                return (
                  <tr key={ri} className={`border-b border-panel-border/60 ${ultima ? "font-semibold text-accent" : ""}`}>
                    {l.map((c, ci) => (
                      <td key={ci} className={`px-2 py-1.5 align-top ${s.alinharDireita?.includes(ci) ? "tabular whitespace-nowrap text-right" : ""}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {s.tipo === "lista" && (
        <ul className="mt-3 space-y-2.5">
          {s.itens.map((i, idx) => (
            <li key={idx} className="flex gap-3 text-sm">
              {i.tag && (
                <span className={`mt-0.5 h-fit shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${TAG_COR[i.tag] ?? "text-muted border-panel-border"}`}>
                  {i.tag}
                </span>
              )}
              <div>
                <p>{i.texto}</p>
                {i.detalhe && <p className="mt-0.5 text-xs text-muted">{i.detalhe}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function DossieTab({ dossie }: { dossie: DossieJson }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            {[dossie.documento, dossie.revisao && `Revisão ${dossie.revisao}`, dossie.data].filter(Boolean).join(" · ")}
          </p>
          {dossie.subtitulo && <p className="mt-1 max-w-2xl text-sm text-muted">{dossie.subtitulo}</p>}
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-md border border-panel-border px-3 py-1.5 text-xs text-muted hover:text-text print:hidden"
        >
          <Printer size={13} /> Imprimir / salvar PDF
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dossie.kpis.map((k) => (
          <div key={k.rotulo} className="rounded-lg border border-panel-border bg-panel p-4">
            <div className="text-[11px] uppercase tracking-widest text-muted">{k.rotulo}</div>
            <div className="mt-1 font-display text-xl font-semibold text-accent">{k.valor}</div>
            {k.nota && <div className="mt-0.5 text-xs text-muted">{k.nota}</div>}
          </div>
        ))}
      </div>

      {dossie.secoes.map((s) => (
        <Secao key={s.titulo} s={s} />
      ))}

      <p className="text-xs text-muted">
        Preços e produtividades são ESTIMADOS (precisão de ±25% até a cotação). Quantidades levantadas por leitura visual das pranchas: conferir no DWG.
      </p>
    </div>
  );
}
