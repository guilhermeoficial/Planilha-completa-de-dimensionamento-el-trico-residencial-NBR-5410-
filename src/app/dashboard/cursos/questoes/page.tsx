"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Check, X, Filter, RotateCcw, ImageOff, Scissors, Flag, BarChart3, Target,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  QUESTOES, AREAS_GRANDES, DIFICULDADES, BLOCOS, bancasDisponiveis, anosDisponiveis, assuntosDisponiveis,
  type AreaGrande, type Dificuldade, type Bloco,
} from "@/lib/questoes-data";

type Confianca = "alta" | "media" | "baixa" | "chute";
const CONFIANCAS: { valor: Confianca; label: string }[] = [
  { valor: "alta", label: "Certeza" },
  { valor: "media", label: "~50%" },
  { valor: "baixa", label: "~25%" },
  { valor: "chute", label: "Chute" },
];

interface RegistroResposta {
  alternativa_index: number;
  correta: boolean;
  confianca: Confianca;
}

type FiltroMinhasQuestoes = "todas" | "resolvidas" | "nao-resolvidas" | "acertei" | "errei";

export default function QuestoesPage() {
  const supabase = createClient();

  const [respostas, setRespostas] = useState<Record<string, RegistroResposta>>({});
  const [carregandoRespostas, setCarregandoRespostas] = useState(true);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const [selecaoAtual, setSelecaoAtual] = useState<Record<string, number>>({});
  const [confiancaAtual, setConfiancaAtual] = useState<Record<string, Confianca>>({});
  const [eliminadas, setEliminadas] = useState<Record<string, Set<number>>>({});

  const [filtroMinhas, setFiltroMinhas] = useState<FiltroMinhasQuestoes>("todas");
  const [busca, setBusca] = useState("");
  const [areaGrande, setAreaGrande] = useState<AreaGrande | "Todas">("Todas");
  const [blocoSel, setBlocoSel] = useState<Bloco | "Todos">("Todos");
  const [assunto, setAssunto] = useState<string>("Todos");
  const [banca, setBanca] = useState<string>("Todas");
  const [ano, setAno] = useState<string>("Todos");
  const [dificuldade, setDificuldade] = useState<Dificuldade | "Todas">("Todas");
  const [pagina, setPagina] = useState(1);
  const PORPAGINA = 10;

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setCarregandoRespostas(false);
        return;
      }
      setUsuarioId(userData.user.id);
      const { data } = await supabase
        .from("respostas_questoes")
        .select("questao_id, alternativa_index, correta, confianca")
        .eq("user_id", userData.user.id);

      const mapa: Record<string, RegistroResposta> = {};
      for (const r of data ?? []) {
        mapa[r.questao_id] = { alternativa_index: r.alternativa_index, correta: r.correta, confianca: r.confianca as Confianca };
      }
      setRespostas(mapa);
      setCarregandoRespostas(false);
    })();
  }, [supabase]);

  const assuntos = useMemo(() => assuntosDisponiveis(areaGrande === "Todas" ? undefined : areaGrande), [areaGrande]);
  const bancas = bancasDisponiveis();
  const anos = anosDisponiveis();

  const filtradas = useMemo(() => {
    return QUESTOES.filter((q) => {
      if (areaGrande !== "Todas" && q.areaGrande !== areaGrande) return false;
      if (blocoSel !== "Todos" && q.bloco !== blocoSel) return false;
      if (assunto !== "Todos" && q.assunto !== assunto) return false;
      if (banca !== "Todas" && q.banca !== banca) return false;
      if (ano !== "Todos" && q.ano !== Number(ano)) return false;
      if (dificuldade !== "Todas" && q.dificuldade !== dificuldade) return false;
      if (busca.trim() && !q.enunciado.toLowerCase().includes(busca.trim().toLowerCase())) return false;

      const resp = respostas[q.id];
      if (filtroMinhas === "resolvidas" && !resp) return false;
      if (filtroMinhas === "nao-resolvidas" && resp) return false;
      if (filtroMinhas === "acertei" && !resp?.correta) return false;
      if (filtroMinhas === "errei" && (!resp || resp.correta)) return false;
      return true;
    });
  }, [areaGrande, blocoSel, assunto, banca, ano, dificuldade, busca, filtroMinhas, respostas]);

  useEffect(() => {
    setPagina(1);
  }, [areaGrande, blocoSel, assunto, banca, ano, dificuldade, busca, filtroMinhas]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / PORPAGINA));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const paginadas = filtradas.slice((paginaSegura - 1) * PORPAGINA, paginaSegura * PORPAGINA);

  function limparFiltros() {
    setAreaGrande("Todas");
    setBlocoSel("Todos");
    setAssunto("Todos");
    setBanca("Todas");
    setAno("Todos");
    setDificuldade("Todas");
    setBusca("");
    setPagina(1);
  }

  function alternarEliminada(questaoId: string, idx: number) {
    setEliminadas((prev) => {
      const atual = new Set(prev[questaoId] ?? []);
      if (atual.has(idx)) atual.delete(idx);
      else atual.add(idx);
      return { ...prev, [questaoId]: atual };
    });
  }

  async function confirmarResposta(questaoId: string) {
    const idx = selecaoAtual[questaoId];
    if (idx == null) return;
    const questao = QUESTOES.find((q) => q.id === questaoId);
    if (!questao) return;
    const confianca = confiancaAtual[questaoId] ?? "media";
    const correta = idx === questao.respostaCorreta;

    setRespostas((r) => ({ ...r, [questaoId]: { alternativa_index: idx, correta, confianca } }));

    if (usuarioId) {
      await supabase.from("respostas_questoes").upsert(
        { user_id: usuarioId, questao_id: questaoId, alternativa_index: idx, correta, confianca },
        { onConflict: "user_id,questao_id" }
      );
    }
  }

  const totalRespondidas = Object.keys(respostas).length;
  const totalAcertos = Object.values(respostas).filter((r) => r.correta).length;
  const percentualAcerto = totalRespondidas > 0 ? (totalAcertos / totalRespondidas) * 100 : 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/dashboard/cursos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Cursos
      </Link>

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Banco de Questões</h1>
          <p className="mt-1 text-sm text-muted">
            Questões de prática originais, organizadas pelo edital verticalizado (Básicos, Bloco I, II e III).
          </p>
        </div>
        {!carregandoRespostas && totalRespondidas > 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-panel-border bg-panel px-4 py-2.5">
            <Target size={18} className="text-accent" />
            <div>
              <p className="font-mono text-xs text-muted">Índice de acertos</p>
              <p className="font-display text-base font-bold">
                {percentualAcerto.toFixed(0)}%{" "}
                <span className="font-mono text-xs font-normal text-muted">({totalAcertos}/{totalRespondidas})</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {([
          ["todas", "Todas"], ["resolvidas", "Resolvidas"], ["nao-resolvidas", "Não resolvidas"],
          ["acertei", "Acertei"], ["errei", "Errei"],
        ] as [FiltroMinhasQuestoes, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFiltroMinhas(key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filtroMinhas === key ? "bg-accent text-bg" : "border border-panel-border text-muted hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
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
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por palavra-chave no enunciado..."
          className="mb-2 w-full rounded-md border border-panel-border bg-bg px-3 py-1.5 text-xs text-text"
        />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <select value={areaGrande} onChange={(e) => { setAreaGrande(e.target.value as AreaGrande | "Todas"); setAssunto("Todos"); }} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todas">Área: Todas</option>
            {AREAS_GRANDES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={blocoSel} onChange={(e) => setBlocoSel(e.target.value as Bloco | "Todos")} className="rounded-md border border-panel-border bg-bg px-2.5 py-1.5 text-xs text-text">
            <option value="Todos">Bloco do edital: Todos</option>
            {BLOCOS.map((b) => <option key={b} value={b}>{b}</option>)}
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
        <p className="mt-2 text-xs text-muted">
          {filtradas.length} questão(ões) encontrada(s)
          {filtradas.length > 0 && ` — mostrando ${(paginaSegura - 1) * PORPAGINA + 1}-${Math.min(paginaSegura * PORPAGINA, filtradas.length)}`}
        </p>
      </div>

      <div className="space-y-5">
        {paginadas.map((q, idxPagina) => {
          const idx = (paginaSegura - 1) * PORPAGINA + idxPagina;
          const resp = respostas[q.id];
          const selecaoPendente = selecaoAtual[q.id];
          const respondida = resp != null;
          const elimSet = eliminadas[q.id] ?? new Set<number>();

          return (
            <div key={q.id} className="overflow-hidden rounded-lg border border-panel-border bg-panel">
              <div className="flex items-center gap-2 border-b border-panel-border bg-bg-elevated px-4 py-2.5 font-mono text-xs text-muted">
                <span className="rounded bg-panel px-1.5 py-0.5 font-semibold text-text">{idx + 1}</span>
                <span className="rounded bg-panel px-1.5 py-0.5">{q.id.toUpperCase()}</span>
                <span>{q.areaGrande} › {q.assunto}</span>
                <span
                  className={`ml-auto rounded px-1.5 py-0.5 ${
                    q.dificuldade === "Fácil" ? "bg-ok/15 text-ok" : q.dificuldade === "Médio" ? "bg-warn/15 text-warn" : "bg-danger/15 text-danger"
                  }`}
                >
                  {q.dificuldade}
                </span>
              </div>

              <div className="p-5">
                <p className="mb-3 font-mono text-xs text-muted">
                  <strong className="text-text">Bloco:</strong> {q.bloco} &nbsp;
                  <strong className="text-text">Banca:</strong> {q.banca} &nbsp;
                  <strong className="text-text">Ano:</strong> {q.ano} &nbsp;
                  <strong className="text-text">Órgão:</strong> Petrobras
                </p>

                {q.temImagem && <ImagemQuestao id={q.id} />}

                <p className="text-sm font-medium">{q.enunciado}</p>

                <div className="mt-3 space-y-1.5">
                  {q.alternativas.map((alt, i) => {
                    const correta = i === q.respostaCorreta;
                    const eliminada = elimSet.has(i);
                    const estaSelecionada = respondida ? resp.alternativa_index === i : selecaoPendente === i;

                    let estilo = "border-panel-border hover:border-accent";
                    if (respondida) {
                      if (correta) estilo = "border-ok bg-ok/10 text-ok";
                      else if (estaSelecionada) estilo = "border-danger bg-danger/10 text-danger";
                    } else if (estaSelecionada) {
                      estilo = "border-accent bg-accent/10";
                    }

                    return (
                      <div key={i} className="flex items-center gap-1.5">
                        <button
                          onClick={() => !respondida && !eliminada && setSelecaoAtual((s) => ({ ...s, [q.id]: i }))}
                          disabled={respondida || eliminada}
                          className={`flex flex-1 items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${estilo} ${
                            eliminada ? "opacity-40" : ""
                          }`}
                        >
                          {respondida && correta && <Check size={14} className="shrink-0" />}
                          {respondida && estaSelecionada && !correta && <X size={14} className="shrink-0" />}
                          <span className={eliminada ? "line-through" : ""}>{alt}</span>
                        </button>
                        {!respondida && (
                          <button
                            onClick={() => alternarEliminada(q.id, i)}
                            title="Marcar como errada (eliminar alternativa)"
                            className={`shrink-0 rounded-md border p-2 transition-colors ${
                              eliminada ? "border-danger bg-danger/10 text-danger" : "border-panel-border text-muted hover:border-danger hover:text-danger"
                            }`}
                          >
                            <Scissors size={14} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!respondida && selecaoPendente != null && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md bg-bg-elevated p-2.5">
                    <span className="text-xs text-muted">Qual sua confiança nessa resposta?</span>
                    <div className="flex gap-1">
                      {CONFIANCAS.map((c) => (
                        <button
                          key={c.valor}
                          onClick={() => setConfiancaAtual((s) => ({ ...s, [q.id]: c.valor }))}
                          className={`rounded-md border px-2 py-1 text-xs transition-colors ${
                            (confiancaAtual[q.id] ?? "media") === c.valor
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-panel-border text-muted hover:text-text"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => confirmarResposta(q.id)}
                      className="ml-auto rounded-md bg-accent px-4 py-1.5 text-xs font-medium text-bg hover:opacity-90"
                    >
                      Responder
                    </button>
                  </div>
                )}

                {respondida && (
                  <p className="mt-3 rounded-md bg-bg-elevated p-3 text-xs text-muted">
                    <strong className="text-text">Explicação: </strong>{q.explicacao}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-panel-border bg-bg-elevated px-4 py-2 text-xs text-muted">
                {respondida && (
                  <span className="flex items-center gap-1">
                    <BarChart3 size={13} />
                    {resp.correta ? "Você acertou" : "Você errou"} · confiança: {CONFIANCAS.find((c) => c.valor === resp.confianca)?.label}
                  </span>
                )}
                <button
                  onClick={() => alert("Obrigado! Sua notificação foi registrada — vamos revisar essa questão.")}
                  className="ml-auto flex items-center gap-1 hover:text-text"
                >
                  <Flag size={13} /> Notificar erro
                </button>
              </div>
            </div>
          );
        })}
        {filtradas.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">Nenhuma questão encontrada para esses filtros.</p>
        )}
      </div>

      {filtradas.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={paginaSegura === 1}
            className="rounded-md border border-panel-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-text disabled:opacity-30"
          >
            ← Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPaginas || Math.abs(p - paginaSegura) <= 1)
            .map((p, i, arr) => (
              <span key={p} className="flex items-center gap-1">
                {i > 0 && arr[i - 1] !== p - 1 && <span className="text-muted">…</span>}
                <button
                  onClick={() => setPagina(p)}
                  className={`rounded-md px-3 py-1.5 text-sm font-mono transition-colors ${
                    p === paginaSegura ? "bg-accent text-bg" : "border border-panel-border text-muted hover:text-text"
                  }`}
                >
                  {p}
                </button>
              </span>
            ))}
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaSegura === totalPaginas}
            className="rounded-md border border-panel-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-text disabled:opacity-30"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}

function ImagemQuestao({ id }: { id: string }) {
  const [erro, setErro] = useState(false);
  const [extensaoIdx, setExtensaoIdx] = useState(0);
  const extensoes = ["png", "jpg", "jpeg", "webp"];

  if (erro && extensaoIdx >= extensoes.length - 1) {
    return (
      <div className="mb-3 flex flex-col items-center justify-center rounded-md border border-dashed border-panel-border bg-bg-elevated/50 px-4 py-6 text-center">
        <ImageOff size={20} className="mb-2 text-muted" />
        <p className="text-xs text-muted">Imagem original pendente — adicione o arquivo em:</p>
        <p className="tabular mt-1 text-xs text-accent">/public/questoes-imagens/{id}.png</p>
      </div>
    );
  }

  return (
    <img
      src={`/questoes-imagens/${id}.${extensoes[extensaoIdx]}`}
      alt={`Figura da questão ${id}`}
      className="mb-3 max-h-80 w-full rounded-md border border-panel-border bg-white object-contain p-2"
      onError={() => {
        if (extensaoIdx < extensoes.length - 1) setExtensaoIdx((i) => i + 1);
        else setErro(true);
      }}
    />
  );
}
