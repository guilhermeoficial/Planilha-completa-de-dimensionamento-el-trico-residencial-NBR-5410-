"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { QUESTOES } from "@/lib/cursos-data";

export default function QuestoesPage() {
  const [respostas, setRespostas] = useState<Record<string, number>>({});

  function responder(questaoId: string, alternativaIdx: number) {
    if (respostas[questaoId] != null) return; // já respondida
    setRespostas((r) => ({ ...r, [questaoId]: alternativaIdx }));
  }

  const acertos = QUESTOES.filter((q) => respostas[q.id] === q.respostaCorreta).length;
  const respondidas = Object.keys(respostas).length;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/dashboard/cursos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Cursos
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Banco de Questões</h1>
          <p className="mt-1 text-sm text-muted">Questões de exemplo — em breve, questões reais de concursos anteriores.</p>
        </div>
        {respondidas > 0 && (
          <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-semibold text-accent">
            {acertos}/{respondidas} acertos
          </span>
        )}
      </div>

      <div className="space-y-5">
        {QUESTOES.map((q) => {
          const respondida = respostas[q.id];
          return (
            <div key={q.id} className="rounded-lg border border-panel-border bg-panel p-5">
              <p className="font-mono text-xs text-muted">{q.area} · {q.banca} {q.ano}</p>
              <p className="mt-2 text-sm font-medium">{q.enunciado}</p>
              <div className="mt-3 space-y-1.5">
                {q.alternativas.map((alt, i) => {
                  const selecionada = respondida === i;
                  const correta = i === q.respostaCorreta;
                  const mostrar = respondida != null;
                  return (
                    <button
                      key={i}
                      onClick={() => responder(q.id, i)}
                      disabled={respondida != null}
                      className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                        mostrar && correta
                          ? "border-ok bg-ok/10 text-ok"
                          : mostrar && selecionada
                          ? "border-danger bg-danger/10 text-danger"
                          : "border-panel-border hover:border-accent"
                      }`}
                    >
                      {mostrar && correta && <Check size={14} />}
                      {mostrar && selecionada && !correta && <X size={14} />}
                      <span>{alt}</span>
                    </button>
                  );
                })}
              </div>
              {respondida != null && (
                <p className="mt-3 rounded-md bg-bg-elevated p-3 text-xs text-muted">
                  <strong className="text-text">Explicação: </strong>{q.explicacao}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
