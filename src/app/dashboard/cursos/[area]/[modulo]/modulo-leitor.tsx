"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, Video, CheckCircle2, XCircle, HelpCircle, Lightbulb, Calculator } from "lucide-react";
import type { Modulo, QuestaoInterativa } from "@/lib/cursos-data";
import Formula from "../../formula";
import AnimacaoLeiDeOhm from "./animacao-lei-de-ohm";
import DicaGrafico from "../../dica-grafico";
import TabelaSimbolos from "@/components/tabela-simbolos";
import type { TabelaSimbolosId } from "@/components/tabela-simbolos";

// ── Mini-quiz interativo ───────────────────────────────────────────────────
function MiniQuiz({ questoes }: { questoes: QuestaoInterativa[] }) {
  const [atual, setAtual] = useState(0);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [mostrarExp, setMostrarExp] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const q = questoes[atual];

  function responder(idx: number) {
    if (selecionada !== null) return;
    setSelecionada(idx);
    if (idx === q.respostaCorreta) setAcertos((a: number) => a + 1);
    setMostrarExp(true);
  }

  function proxima() {
    if (atual + 1 >= questoes.length) { setFinalizado(true); return; }
    setAtual((a: number) => a + 1);
    setSelecionada(null);
    setMostrarExp(false);
  }

  if (finalizado) return (
    <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
      <p className="text-2xl font-bold text-accent">{acertos}/{questoes.length}</p>
      <p className="mt-1 text-sm text-muted">
        {acertos === questoes.length ? "🏆 Perfeito! Você domina este conteúdo." : acertos >= questoes.length / 2 ? "👍 Bom resultado! Revise os erros." : "📚 Revise o conteúdo antes de avançar."}
      </p>
      <button onClick={() => { setAtual(0); setSelecionada(null); setMostrarExp(false); setFinalizado(false); setAcertos(0); }}
        className="mt-3 rounded-lg border border-accent/40 px-4 py-1.5 text-xs text-accent hover:bg-accent/10">
        Refazer quiz
      </button>
    </div>
  );

  return (
    <div className="mt-6 rounded-xl border border-panel-border bg-bg-elevated p-5">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle size={15} className="text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">Mini-Quiz · {atual + 1}/{questoes.length}</span>
      </div>
      <p className="mb-4 text-sm font-medium">{q.enunciado}</p>
      <div className="space-y-2">
        {q.alternativas.map((alt, i) => {
          let cls = "w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ";
          if (selecionada === null) cls += "border-panel-border hover:border-accent hover:bg-accent/5";
          else if (i === q.respostaCorreta) cls += "border-ok/50 bg-ok/10 text-ok font-medium";
          else if (i === selecionada) cls += "border-danger/50 bg-danger/10 text-danger";
          else cls += "border-panel-border opacity-50";
          return (
            <button key={i} className={cls} onClick={() => responder(i)}>
              <span className="mr-2 font-mono text-xs">{String.fromCharCode(65+i)})</span>{alt}
            </button>
          );
        })}
      </div>
      {mostrarExp && (
        <div className="mt-4">
          <div className={`flex items-start gap-2 rounded-lg p-3 ${selecionada === q.respostaCorreta ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"}`}>
            {selecionada === q.respostaCorreta ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <XCircle size={15} className="mt-0.5 shrink-0" />}
            <p className="text-xs">{q.explicacao}</p>
          </div>
          <button onClick={proxima} className="mt-3 w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
            {atual + 1 < questoes.length ? "Próxima questão →" : "Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Gadget: calculadora simples embutida ──────────────────────────────────
function GadgetCalc() {
  const [display, setDisplay] = useState("0");
  const [op, setOp] = useState<string | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  const [reset, setReset] = useState(false);

  function digit(d: string) {
    if (display === "0" || reset) { setDisplay(d); setReset(false); }
    else setDisplay(display + d);
  }
  function dot() { if (!display.includes(".")) setDisplay(display + "."); }
  function operation(o: string) {
    setPrev(parseFloat(display)); setOp(o); setReset(true);
  }
  function equals() {
    if (!op || prev === null) return;
    const cur = parseFloat(display);
    let res = 0;
    if (op === "+") res = prev + cur;
    else if (op === "-") res = prev - cur;
    else if (op === "×") res = prev * cur;
    else if (op === "÷") res = cur !== 0 ? prev / cur : 0;
    else if (op === "xⁿ") res = Math.pow(prev, cur);
    else if (op === "√") res = Math.sqrt(cur);
    setDisplay(String(parseFloat(res.toFixed(8))));
    setOp(null); setPrev(null); setReset(true);
  }
  function clear() { setDisplay("0"); setOp(null); setPrev(null); setReset(false); }
  function sqrt() { setDisplay(String(parseFloat(Math.sqrt(parseFloat(display)).toFixed(8)))); }
  function square() { const v = parseFloat(display); setDisplay(String(v * v)); }
  function inv() { const v = parseFloat(display); if (v !== 0) setDisplay(String(parseFloat((1/v).toFixed(8)))); }

  const btn = (label: string, action: () => void, cls = "") =>
    <button onClick={action} className={`rounded-lg py-2 text-sm font-medium transition-colors active:scale-95 ${cls || "border border-panel-border bg-bg-elevated hover:bg-panel-border"}`}>{label}</button>;

  return (
    <div className="mt-6 rounded-xl border border-panel-border bg-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <Calculator size={15} className="text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">Calculadora Científica</span>
      </div>
      <div className="mb-3 rounded-lg border border-panel-border bg-bg px-4 py-3 text-right font-mono text-xl text-text">
        {op && prev !== null && <span className="mr-2 text-xs text-muted">{prev} {op}</span>}
        {display}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {btn("C", clear, "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20")}
        {btn("√x", sqrt, "border border-accent/40 bg-accent/10 text-accent")}
        {btn("x²", square, "border border-accent/40 bg-accent/10 text-accent")}
        {btn("1/x", inv, "border border-accent/40 bg-accent/10 text-accent")}
        {btn("÷", () => operation("÷"), "bg-accent text-bg hover:opacity-90")}
        {["7","8","9"].map(d => btn(d, () => digit(d)))}
        {btn("×", () => operation("×"), "bg-accent text-bg hover:opacity-90")}
        {["4","5","6"].map(d => btn(d, () => digit(d)))}
        {btn("-", () => operation("-"), "bg-accent text-bg hover:opacity-90")}
        {["1","2","3"].map(d => btn(d, () => digit(d)))}
        {btn("+", () => operation("+"), "bg-accent text-bg hover:opacity-90")}
        {btn("0", () => digit("0"), "col-span-2")}
        {btn(".", dot)}
        {btn("=", equals, "col-span-2 bg-accent text-bg font-bold hover:opacity-90")}
      </div>
    </div>
  );
}

// ── Caixa de dica/atenção destacada ───────────────────────────────────────
function BoxDica({ tipo, texto }: { tipo: "dica" | "atencao" | "exemplo"; texto: string }) {
  const conf = {
    dica:     { icon: "💡", label: "Dica",    cls: "border-ok/30 bg-ok/5 text-ok" },
    atencao:  { icon: "⚠️", label: "Atenção", cls: "border-warn/30 bg-warn/5 text-warn" },
    exemplo:  { icon: "📌", label: "Exemplo", cls: "border-accent/30 bg-accent/5 text-accent" },
  }[tipo];
  return (
    <div className={`mt-3 rounded-lg border p-3 ${conf.cls}`}>
      <span className="mr-1 text-xs font-bold">{conf.icon} {conf.label}:</span>
      <span className="text-xs">{texto}</span>
    </div>
  );
}

// ── Leitor principal ───────────────────────────────────────────────────────
export default function ModuloLeitor({ areaSlug, areaNome, modulo }: { areaSlug: string; areaNome: string; modulo: Modulo }) {
  const [pagina, setPagina] = useState(0);
  const total = modulo.paginas.length;
  const atual = modulo.paginas[pagina];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href={`/dashboard/cursos/${areaSlug}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> {areaNome}
      </Link>

      {/* Barra de progresso */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-panel-border">
          <div className="h-1.5 rounded-full bg-accent transition-all" style={{ width: `${((pagina + 1) / total) * 100}%` }} />
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{pagina + 1}/{total}</span>
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{modulo.titulo}</p>

      <div className="mt-4 rounded-xl border border-panel-border bg-panel p-6">
        <h1 className="font-display text-xl font-bold">{atual.titulo}</h1>

        {atual.videoUrl && (
          <div className="mt-4 aspect-video overflow-hidden rounded-md border border-panel-border">
            <iframe src={atual.videoUrl} className="h-full w-full" allowFullScreen />
          </div>
        )}

        {atual.conteudo.length > 0 && (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-text">
            {atual.conteudo.map((p, i) => {
              if (p.startsWith("[DICA]"))    return <BoxDica key={i} tipo={"dica" as const}    texto={p.replace("[DICA]", "").trim()} />;
              if (p.startsWith("[ATENCAO]")) return <BoxDica key={i} tipo={"atencao" as const} texto={p.replace("[ATENCAO]", "").trim()} />;
              if (p.startsWith("[EXEMPLO]")) return <BoxDica key={i} tipo={"exemplo" as const} texto={p.replace("[EXEMPLO]", "").trim()} />;
              return <p key={i}>{p}</p>;
            })}
          </div>
        )}

        {atual.equacoes && atual.equacoes.length > 0 && (
          <div className="mt-4 space-y-3">
            {atual.equacoes.map((eq, i) => (
              <div key={i} className="rounded-lg border border-panel-border bg-bg-elevated p-3">
                <Formula latex={eq.latex} block />
                {eq.legenda && <p className="mt-1 text-center text-xs text-muted">{eq.legenda}</p>}
              </div>
            ))}
          </div>
        )}

        {atual.conteudo2 && atual.conteudo2.length > 0 && (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-text">
            {atual.conteudo2.map((p, i) => {
              if (p.startsWith("[DICA]"))    return <BoxDica key={i} tipo={"dica" as const}    texto={p.replace("[DICA]", "").trim()} />;
              if (p.startsWith("[ATENCAO]")) return <BoxDica key={i} tipo={"atencao" as const} texto={p.replace("[ATENCAO]", "").trim()} />;
              if (p.startsWith("[EXEMPLO]")) return <BoxDica key={i} tipo={"exemplo" as const} texto={p.replace("[EXEMPLO]", "").trim()} />;
              return <p key={i}>{p}</p>;
            })}
          </div>
        )}

        {atual.tabelasSimbolos && atual.tabelasSimbolos.length > 0 && (
          <div className="mt-2 space-y-4">
            {atual.tabelasSimbolos.map((id, i) => (
              <TabelaSimbolos key={i} id={id as TabelaSimbolosId} />
            ))}
          </div>
        )}

        {atual.animacao === "lei-de-ohm" && (
          <div className="mt-5"><AnimacaoLeiDeOhm /></div>
        )}

        {atual.dicas && atual.dicas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-panel-border pt-3">
            <span className="text-xs text-muted">Passe o mouse pra ver:</span>
            {atual.dicas.map((d, i) => (
              <DicaGrafico key={i} gatilho={d.gatilho} titulo={d.titulo} explicacao={d.explicacao} tipo={d.tipo as import("../../dica-grafico").TipoGrafico} />
            ))}
          </div>
        )}

        {/* Calculadora embutida */}
        {(atual as { calculadora?: boolean }).calculadora && <GadgetCalc />}

        {/* Mini-quiz ao final da página */}
        {atual.questoes && atual.questoes.length > 0 && (
          <MiniQuiz questoes={atual.questoes} />
        )}

        {!atual.videoUrl && (
          <div className="mt-4 flex items-center gap-2 rounded-md border border-dashed border-panel-border bg-bg-elevated/50 px-3 py-2 text-xs text-muted">
            <Video size={14} /> Vídeo desta página ainda não disponível.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => setPagina(p => Math.max(0, p - 1))} disabled={pagina === 0}
          className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-30">
          <ChevronLeft size={15} /> Anterior
        </button>
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <button key={i} onClick={() => setPagina(i)}
              className={`h-2 w-2 rounded-full transition-all ${i === pagina ? "w-4 bg-accent" : "bg-panel-border hover:bg-muted"}`} />
          ))}
        </div>
        <button onClick={() => setPagina(p => Math.min(total - 1, p + 1))} disabled={pagina === total - 1}
          className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-30">
          Próxima <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
