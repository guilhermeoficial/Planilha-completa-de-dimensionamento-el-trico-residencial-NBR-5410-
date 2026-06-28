"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, Filter, RotateCcw } from "lucide-react";
import {
  QUESTOES, AREAS_GRANDES, DIFICULDADES, bancasDisponiveis, anosDisponiveis, assuntosDisponiveis,
  type AreaGrande, type Dificuldade,
} from "@/lib/questoes-data";

export default function QuestoesPage() {
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [areaGrande, setAreaGrande] = useState<AreaGrande | "Todas">("Todas");
  const [assunto, setAssunto] = useState<string>("Todos");
  const [banca, setBanca] = useState<string>("Todas");
  const [ano, setAno] = useState<string>("Todos");
  const [dificuldade, setDificuldade] = useState<Dificuldade | "Todas">("Todas");

  const assuntos = useMemo(() => assuntosDisponiveis(areaGrande === "Todas" ? undefined : areaGrande), [areaGrande]);
  const bancas = bancasDisponiveis();
  const anos = anosDisponiveis();

  const filtradas = useMemo(() => {
    return QUESTOES.filter((q) => {
      if (areaGrande !== "Todas" && q.areaGrande !== areaGrande) return false;
      if (assunto !== "Todos" && q.assunto !== assunto) return false;
      if (banca !== "Todas" && q.banca !== banca) return false;
      if (ano !== "Todos" && q.ano !== Number(ano)) return false;
      if (dificuldade !== "Todas" && q.dificuldade !== dificuldade) return false;
      return true;
    });
  }, [areaGrande, assunto, banca, ano, dificuldade]);

  function responder(questaoId: string, alternativaIdx: number) {
    if (respostas[questaoId] != null) return;
    setRespostas((r) => ({ ...r, [questaoId]: alternativaIdx }));
  }

  function limparFiltros() {
    setAreaGrande("Todas");
    setAssunto("Todos");
    setBanca("Todas");
    setAno("Todos");
    setDificuldade("Todas");
  }

  const acertos = filtradas.filter((q) => respostas[q.id] === q.respostaCorreta).length;
  const respondidas = filtradas.filter((q) => respostas[q.id] != null).length;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/dashboard/cursos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Cursos
      </Link>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Banco de Questões</h1>
          <p className="mt-1 text-sm text-muted">
            Questões de prática originais, no padrão e formato do concurso Petrobras (banca CESGRANRIO).
          </p>
        </div>
        {respondidas > 0 && (
          <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-semibold text-accent">
            {acertos}/{respondidas} acertos
          </span>
        )}
      </div>

      <div className="mb-6 rounded-lg border border-panel-border bg-panel p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <Filter size={13} /> Filtros
          </p>
          <button onClick={limparFiltros} className="flex items-center gap-1 text-xs text-muted hover:text-text">
            <RotateCcw size={12} /> Limpar
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <select value={areaGrande} onChange={(e) => { setAreaGrande(e.target.value as AreaGrande | "Todas"); setAssunto("Todos"); }} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todas">Área: Todas</option>
            {AREAS_GRANDES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={assunto} onChange={(e) => setAssunto(e.target.value)} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todos">Assunto: Todos</option>
            {assuntos.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={banca} onChange={(e) => setBanca(e.target.value)} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todas">Banca: Todas</option>
            {bancas.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={ano} onChange={(e) => setAno(e.target.value)} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todos">Ano: Todos</option>
            {anos.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value as Dificuldade | "Todas")} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todas">Dificuldade: Todas</option>
            {DIFICULDADES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <p className="mt-2 text-xs text-muted">{filtradas.length} questão(ões) encontrada(s)</p>
      </div>

      <div className="space-y-5">
        {filtradas.map((q) => {
          const respondida = respostas[q.id];
          return (
            <div key={q.id} className="rounded-lg border border-panel-border bg-panel p-5">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
                <span className="rounded bg-bg-elevated px-1.5 py-0.5">{q.areaGrande}</span>
                <span className="rounded bg-bg-elevated px-1.5 py-0.5">{q.assunto}</span>
                <span>{q.banca} · {q.ano}</span>
                <span
                  className={`ml-auto rounded px-1.5 py-0.5 ${
                    q.dificuldade === "Fácil" ? "bg-ok/15 text-ok" : q.dificuldade === "Médio" ? "bg-warn/15 text-warn" : "bg-danger/15 text-danger"
                  }`}
                >
                  {q.dificuldade}
                </span>
              </div>
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
        {filtradas.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">Nenhuma questão encontrada para esses filtros.</p>
        )}
      </div>
    </div>
  );
}
