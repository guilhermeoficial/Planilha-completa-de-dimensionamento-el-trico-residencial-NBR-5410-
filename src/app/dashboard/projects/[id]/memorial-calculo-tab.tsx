"use client";

import { useEffect, useState } from "react";
import { Printer, FileText, Table2, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronsUpDown } from "lucide-react";
import type { CSSProperties } from "react";
import Formula from "@/app/dashboard/cursos/formula";
import type { CircuitoCalculado, ResumoDemanda, BalancoFases } from "@/lib/nbr5410";
import type { AmbienteRow, ProjectRow, CircuitoRow } from "@/lib/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  project: ProjectRow;
  ambientes: AmbienteRow[];
  circuitosCalculados: CircuitoCalculado[];
  circuitosOriginais: CircuitoRow[];
  resumoDemanda: ResumoDemanda;
  balanco: BalancoFases;
}

const AZUL: [number,number,number] = [30, 64, 105];
const AZUL_CLARO: [number,number,number] = [220, 230, 242];
const CINZA: [number,number,number] = [245, 246, 248];

type Amp = CircuitoCalculado & { ampacidadeFinalA?: number };

// ── Componentes visuais ──────────────────────────────────────────────────────
// Variáveis de tema "papel": a folha do memorial é sempre clara, como o documento impresso/PDF.
const PAPEL = {
  "--bg": "#ffffff", "--bg-elevated": "#eef1f6", "--panel": "#f6f8fb", "--panel-border": "#d8dfea",
  "--text": "#14213d", "--muted": "#5b667a", "--accent": "#1b2a7b", "--accent-soft": "#1b2a7b14", "--accent-ink": "#ffffff",
  "--ok": "#16774f", "--warn": "#a8741a", "--danger": "#b6383d",
  "--phase-r": "#b6383d", "--phase-s": "#a67c0a", "--phase-t": "#275f8a",
} as CSSProperties;

function Secao({ num, titulo, children }: { num: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={`sec-${num}`} className="mb-10 scroll-mt-6">
      <div className="mb-4 flex items-baseline gap-3 border-b-2 border-accent pb-1.5">
        <span className="font-mono text-sm font-bold text-warn">{num.padStart(2, "0")}</span>
        <h2 className="font-display text-lg font-semibold tracking-tight text-text">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

function Kpi({ label, valor, sub, cor }: { label: string; valor: string; sub?: string; cor?: "ok" | "danger" | "warn" }) {
  const c = cor === "danger" ? "text-danger" : cor === "warn" ? "text-warn" : cor === "ok" ? "text-ok" : "text-accent";
  return (
    <div className="px-4 py-3 print:break-inside-avoid">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-0.5 font-display text-2xl font-semibold leading-tight ${c}`}>{valor}</p>
      {sub && <p className="text-[11px] text-muted">{sub}</p>}
    </div>
  );
}

function Bloco({ titulo, children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-lg border border-panel-border bg-panel p-4">
      {titulo && <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-accent">{titulo}</p>}
      {children}
    </div>
  );
}

function Eq({ label, latex, resultado, unidade, obs, cor }: { label: string; latex: string; resultado: string | number; unidade?: string; obs?: string; cor?: "ok" | "danger" | "warn" }) {
  return (
    <div className="mb-4 rounded-lg border border-panel-border bg-bg p-4 print:break-inside-avoid">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted">{label}</p>
      <div className="overflow-x-auto text-[15px]"><Formula latex={latex} block /></div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">Resultado</span>
        <span className={`rounded px-2.5 py-0.5 font-mono text-sm font-bold ${cor === "danger" ? "bg-danger/15 text-danger" : cor === "warn" ? "bg-warn/15 text-warn" : "bg-accent/10 text-accent"}`}>
          {resultado}{unidade ? ` ${unidade}` : ""}
        </span>
        {obs && <span className={`text-xs font-medium ${cor === "danger" ? "text-danger" : cor === "ok" ? "text-ok" : "text-muted"}`}>{obs}</span>}
      </div>
    </div>
  );
}

/** Versão compacta para a memória de cada circuito: rótulo + resultado numa linha e a fórmula logo abaixo. */
function EqLinha({ label, latex, resultado, obs, cor, className = "" }: { label: string; latex: string; resultado: string; obs?: string; cor?: "ok" | "danger" | "warn"; className?: string }) {
  return (
    <div className={`rounded-md border border-panel-border bg-bg px-3 py-2 print:break-inside-avoid ${className}`}>
      <div className="mb-0.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{label}</p>
        <div className="flex items-center gap-2">
          {obs && <span className={`text-[11px] font-medium ${cor === "danger" ? "text-danger" : cor === "ok" ? "text-ok" : "text-muted"}`}>{obs}</span>}
          <span className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${cor === "danger" ? "bg-danger/15 text-danger" : cor === "warn" ? "bg-warn/15 text-warn" : "bg-accent/10 text-accent"}`}>{resultado}</span>
        </div>
      </div>
      <div className="overflow-x-auto text-[13px]"><Formula latex={latex} /></div>
    </div>
  );
}

function Linha({ label, valor, destaque = false }: { label: string; valor: string | number; destaque?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 border-b border-panel-border/70 py-1.5 last:border-0 ${destaque ? "font-semibold" : ""}`}>
      <span className="text-[13px] text-muted">{label}</span>
      <span className={`text-right text-[13px] ${destaque ? "text-accent" : "text-text"}`}>{valor}</span>
    </div>
  );
}

function Conformidade({ item, criterio, ok }: { item: string; criterio: string; ok: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-3 rounded-lg border p-3 print:break-inside-avoid ${ok ? "border-ok/30 bg-ok/5" : "border-danger/30 bg-danger/5"}`}>
      <div className="flex items-start gap-2">
        {ok ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-ok" /> : <XCircle size={15} className="mt-0.5 shrink-0 text-danger" />}
        <div>
          <p className="text-sm font-medium">{item}</p>
          <p className="text-xs text-muted">{criterio}</p>
        </div>
      </div>
      <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold ${ok ? "bg-ok/20 text-ok" : "bg-danger/20 text-danger"}`}>
        {ok ? "✓ Conforme" : "✗ Verificar"}
      </span>
    </div>
  );
}

// Ambientes considerados molhados (NBR 5410) e palavras que indicam, na descrição do circuito, que ele atende áreas molhadas.
const TIPOS_AMBIENTE_MOLHADO = ["Banheiro", "Serviço/Cozinha", "Varanda/Externo"];
const REGEX_AREA_MOLHADA = /molhad|cozinha|copa|banheiro|bwc|lavagem|lavanderia|servi[cç]o|dml|externo|varanda|purificador|gel[aá]gua/i;

export default function MemorialCalculoTab({ project, ambientes, circuitosCalculados, circuitosOriginais, resumoDemanda, balanco }: Props) {
  const [abertos, setAbertos] = useState(true);
  const temAreaMolhada = ambientes.some((a) => TIPOS_AMBIENTE_MOLHADO.includes(a.tipo));
  const dataHoje = new Date().toLocaleDateString("pt-BR");
  const trifasico = project.tipo_entrada === "Trifásico";
  const bifasico  = project.tipo_entrada === "Bifásico";
  const Vn = project.tensao_v;
  const proj = project as ProjectRow & { concessionaria?: string };
  const concessionaria = proj.concessionaria ?? "COSERN";

  // Fator de demanda NBR 5410 Tabela 10.3
  const potTotal = resumoDemanda.cargaInstaladaW;
  let fatorDemanda = 1.0;
  if (potTotal <= 3000) fatorDemanda = 1.00;
  else if (potTotal <= 6000) fatorDemanda = 0.80;
  else if (potTotal <= 10000) fatorDemanda = 0.65;
  else if (potTotal <= 15000) fatorDemanda = 0.55;
  else fatorDemanda = 0.50;
  const disNor = resumoDemanda.metodo === "dis-nor-030";
  const potDemandaW = disNor ? (resumoDemanda.demandaKVA ?? 0) * 1000 : potTotal * fatorDemanda;
  if (disNor) fatorDemanda = potTotal > 0 ? potDemandaW / potTotal : 1;
  const cfg = (project as ProjectRow).config_json ?? {};
  const VL_PARA_VF: Record<number, number> = { 380: 220, 220: 127, 440: 254 };
  const tensaoTxt = trifasico ? `${Vn} V entre fases / ${VL_PARA_VF[Vn] ?? Math.round(Vn / 1.732)} V fase-neutro` : `${Vn} V`;
  const esquemaTxt = disNor ? "TN-C-S" : "TN-S";
  const peTxt = disNor ? "Separado do neutro a partir do padrão de entrada" : "Separado do N em todo o circuito";
  const hasteTxt = disNor ? "Aço-cobreada Ø 13 mm x 2,40 m (NBR 13571)" : "Copperweld Ø 3/4″";
  const dHaste = disNor ? 0.013 : 0.019;

  // Corrente de entrada
  const sqrt3 = 1.7320508;
  const ibEntrada = disNor
    ? resumoDemanda.correnteEntradaA
    : trifasico
    ? potDemandaW / (sqrt3 * Vn * 0.92)
    : bifasico
    ? potDemandaW / (2 * Vn * 0.92)
    : potDemandaW / (Vn * 0.92);

  // Seção do ramal de entrada (cabo)
  const secaoRamal = disNor ? (resumoDemanda.secaoRamalMm2 ?? 0) : ibEntrada <= 25 ? 6 : ibEntrada <= 35 ? 10 : ibEntrada <= 50 ? 16 : ibEntrada <= 70 ? 25 : ibEntrada <= 95 ? 35 : 50;

  // Verificação de conformidade (usada no resumo do topo e na seção final)
  const forca = circuitosCalculados.filter((c) => c.tipo !== "Iluminação");
  const origem = (id: string) => circuitosOriginais.find((o) => o.id === id);
  const tugMolhados = circuitosCalculados.filter((c) => c.tipo === "TUG" && REGEX_AREA_MOLHADA.test(c.descricao));
  const verificacoes: [string, string, boolean][] = [
    ["Seção mínima de força (TUG e TUE) ≥ 2,5 mm²", "NBR 5410, Tabela 47", forca.every((c) => c.secaoFinalMm2 >= 2.5)],
    ["Seção mínima de iluminação ≥ 1,5 mm²", "NBR 5410, Tabela 47", circuitosCalculados.filter((c) => c.tipo === "Iluminação").every((c) => c.secaoFinalMm2 >= 1.5)],
    ["Queda de tensão ≤ 4% em todos os circuitos", "NBR 5410 §6.2.7", circuitosCalculados.every((c) => c.quedaPercent <= 4)],
    ["Proteção: Ib ≤ In ≤ Iz em todos os circuitos", "NBR 5410 §5.3.4.1", circuitosCalculados.every((c) => c.ibA <= c.disjuntorA && c.disjuntorA <= c.ampacidadeFinalA + 1e-9)],
    ["Circuito exclusivo de iluminação presente", "NBR 5410 §9.2.1", circuitosCalculados.some((c) => c.tipo === "Iluminação")],
    ["Tomadas de áreas molhadas com DR de 30 mA", temAreaMolhada ? "NBR 5410 §5.1.3.2.2" : "NBR 5410 §5.1.3.2.2 · não aplicável: nenhum ambiente molhado cadastrado", !temAreaMolhada || tugMolhados.every((c) => !!origem(c.id)?.dr_30ma)],
    ["Número de circuitos satisfatório (≥ 3)", "NBR 5410 §9.2", circuitosCalculados.length >= 3],
    ...(trifasico ? [["Desbalanceamento de fases ≤ 10%", "Prática recomendada", balanco.desbalanceamentoPercent <= 10] as [string, string, boolean]] : []),
  ];
  const conformes = verificacoes.filter((v) => v[2]).length;
  const circuitosComAlerta = circuitosCalculados.filter((c) => c.quedaPercent > 4 || c.ibA > c.disjuntorA || c.disjuntorA > c.ampacidadeFinalA + 1e-9).length;
  const numAterramento = trifasico ? "8" : "7";
  const numChoques = trifasico ? "9" : "8";
  const numConformidade = trifasico ? "10" : "9";
  const indice: [string, string][] = [
    ["1", "Identificação"], ["2", "Normas"], ["3", "Sistema"], ["4", "Demanda"], ["5", "Entrada"], ["6", "Circuitos"],
    ...(trifasico ? [["7", "Fases"] as [string, string]] : []),
    [numAterramento, "Aterramento"], [numChoques, "DR"], [numConformidade, "Conformidade"],
  ];

  // Dados de identificação
  const dadosIdent = [
    { label: "Projeto", valor: project.nome },
    { label: "Cliente", valor: project.cliente ?? "—" },
    { label: "Endereço", valor: (project as {endereco?: string}).endereco ?? "—" },
    { label: "Tensão da rede", valor: `${Vn} V` },
    { label: "Tipo de entrada", valor: project.tipo_entrada ?? "Monofásico" },
    { label: "Concessionária", valor: concessionaria },
    { label: "Emitido em", valor: dataHoje },
    ...(project.responsavel_tecnico ? [{ label: "Responsável Técnico", valor: project.responsavel_tecnico }] : []),
    ...(project.registro_profissional ? [{ label: "Registro", valor: project.registro_profissional }] : []),
    ...(project.numero_art ? [{ label: "ART/RRT nº", valor: project.numero_art }] : []),
  ];

  // ── Exportar Memorial PDF ────────────────────────────────────────────────
  function exportarMemorialPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const M = 40;
    const W = doc.internal.pageSize.getWidth();
    const PH = doc.internal.pageSize.getHeight();
    const CW = W - 2 * M;
    const BOTTOM = PH - 36;
    const TOP = 40;
    let y = 0;

    const novaPagina = () => { doc.addPage(); y = TOP; };
    const garantir = (h: number) => { if (y + h > BOTTOM) novaPagina(); };

    // Texto com quebra automática. Retorna a altura usada.
    const texto = (txt: string, o: { x?: number; w?: number; size?: number; bold?: boolean; cor?: [number, number, number]; lh?: number; draw?: boolean } = {}) => {
      const size = o.size ?? 9; const lh = o.lh ?? size * 1.45;
      const x = o.x ?? M; const w = o.w ?? CW - (x - M);
      doc.setFont("helvetica", o.bold ? "bold" : "normal"); doc.setFontSize(size);
      const linhas = doc.splitTextToSize(txt, w) as string[];
      if (o.draw !== false) {
        doc.setTextColor(...(o.cor ?? [30, 30, 30]));
        linhas.forEach((l, i) => doc.text(l, x, y + size + i * lh - size * 0.15));
      }
      return linhas.length * lh;
    };
    const linha = (txt: string, indent = 0, o: { bold?: boolean; size?: number; cor?: [number, number, number] } = {}) => {
      const h = texto(txt, { ...o, x: M + 4 + indent, draw: false });
      garantir(h);
      texto(txt, { ...o, x: M + 4 + indent });
      y += h + 1;
    };
    const secao = (titulo: string) => {
      garantir(18 + 8 + 30);
      doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, CW, 18, "F");
      doc.setFillColor(...AZUL); doc.rect(M, y, 3, 18, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...AZUL);
      doc.text(titulo, M + 10, y + 12.5);
      y += 18 + 8;
    };

    // ── Capa
    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 72, "F");
    doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(17);
    doc.text("MEMORIAL DE CÁLCULO", M, 32);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text("Instalação elétrica de baixa tensão · ABNT NBR 5410:2004", M, 50);
    doc.setFontSize(8.5);
    doc.text(dataHoje, W - M, 32, { align: "right" });
    doc.text("Voltis · Dimensionamento Elétrico", W - M, 46, { align: "right" });
    y = 72 + 18;

    // ── Identificação (grade de 2 colunas, cada campo com quebra própria)
    const campos: [string, string][] = [
      ["PROJETO", project.nome],
      ["CLIENTE", project.cliente ?? "-"],
      ["TENSÃO", `${Vn} V`],
      ["ENTRADA", project.tipo_entrada ?? "Monofásico"],
      ["CONCESSIONÁRIA", concessionaria],
      ["EMISSÃO", dataHoje],
    ];
    if (project.responsavel_tecnico) campos.push(["RESPONSÁVEL TÉCNICO", project.responsavel_tecnico]);
    if (project.registro_profissional) campos.push(["REGISTRO", project.registro_profissional]);
    if (project.numero_art) campos.push(["ART/RRT Nº", project.numero_art]);
    const colW = (CW - 36) / 2;
    const linhasId: { esq: [string, string]; dir?: [string, string]; h: number }[] = [];
    for (let i = 0; i < campos.length; i += 2) {
      const esq = campos[i]; const dir = campos[i + 1];
      const hE = texto(esq[1], { w: colW, size: 9.5, draw: false });
      const hD = dir ? texto(dir[1], { w: colW, size: 9.5, draw: false }) : 0;
      linhasId.push({ esq, dir, h: 11 + Math.max(hE, hD) + 7 });
    }
    const hBox = 12 + linhasId.reduce((a, l) => a + l.h, 0) + 4;
    garantir(hBox);
    doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, CW, hBox, "F");
    doc.setFillColor(...AZUL); doc.rect(M, y, 3, hBox, "F");
    let yy = y + 12;
    for (const l of linhasId) {
      const pares: [[string, string], number][] = [[l.esq, M + 14]];
      if (l.dir) pares.push([l.dir, M + 14 + colW + 18]);
      for (const [[rot, val], x] of pares) {
        doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...AZUL);
        doc.text(rot, x, yy + 5);
        const save = y; y = yy + 11;
        texto(val, { x, w: colW, size: 9.5 });
        y = save;
      }
      yy += l.h;
    }
    y += hBox + 16;

    // ── 1. Referências
    secao("1. REFERÊNCIAS NORMATIVAS");
    linha("ABNT NBR 5410:2004 · Instalações elétricas de baixa tensão", 6);
    linha("ABNT NBR 5444:1989 · Símbolos gráficos para instalações elétricas prediais", 6);
    linha(`Normas de fornecimento da ${concessionaria}`, 6);
    linha("NR-10 (MTE) · Segurança em instalações e serviços em eletricidade", 6);
    y += 10;

    // ── 2. Sistema
    secao("2. DADOS DO SISTEMA ELÉTRICO");
    linha(`Tensão nominal: ${tensaoTxt}  ·  Frequência: 60 Hz  ·  Tipo de entrada: ${project.tipo_entrada ?? "Monofásico"}`, 6);
    linha(`Sistema de distribuição: ${esquemaTxt}. ${peTxt}.`, 6);
    linha(`Ambientes: ${ambientes.length}  ·  Circuitos: ${circuitosCalculados.length}`, 6);
    y += 10;

    // ── 3. Demanda
    const kva = (n: number) => n.toFixed(2).replace(".", ",");
    if (disNor) {
      secao("3. DEMANDA: MÉTODO DA DIS-NOR-030");
      linha(`Carga instalada total: ${Math.round(potTotal).toLocaleString("pt-BR")} W`, 6);
      for (const pa of resumoDemanda.parcelas ?? []) linha(`Parcela ${pa.id} (${pa.descricao}): ${kva(pa.kva)} kVA`, 6);
      linha(`Demanda total: D = ${kva(potDemandaW / 1000)} kVA`, 6, { bold: true });
      linha(`Categoria Cosern ${resumoDemanda.categoria?.id ?? "(conferir)"}: disjuntor geral ${resumoDemanda.disjuntorGeralA} A`, 6);
    } else {
      secao("3. CARGA INSTALADA E DEMANDA");
      linha(`Carga instalada total: ${Math.round(potTotal).toLocaleString("pt-BR")} W`, 6);
      linha(`Fator de demanda adotado (FD): ${(fatorDemanda * 100).toFixed(0)}%`, 6);
      linha(`Demanda: Pd = ${Math.round(potTotal).toLocaleString("pt-BR")} x ${fatorDemanda} = ${Math.round(potDemandaW).toLocaleString("pt-BR")} W`, 6);
    }
    y += 10;

    // ── 4. Entrada
    secao("4. CORRENTE DE ENTRADA E RAMAL");
    if (disNor) linha(`Ib = D / (raiz(3) x VL) = ${Math.round(potDemandaW)} / (1,732 x ${Vn}) = ${ibEntrada.toFixed(1).replace(".", ",")} A`, 6);
    else if (trifasico) linha(`Ib = Pd / (raiz(3) x Vn x FP) = ${Math.round(potDemandaW)} / (1,732 x ${Vn} x 0,92) = ${ibEntrada.toFixed(1)} A`, 6);
    else linha(`Ib = Pd / (Vn x FP) = ${Math.round(potDemandaW)} / (${Vn} x 0,92) = ${ibEntrada.toFixed(1)} A`, 6);
    linha(disNor ? `Ramal de entrada: ${resumoDemanda.categoria?.ramalDescricao ?? secaoRamal + " mm²"}` : `Seção mínima do ramal de entrada: ${secaoRamal} mm²`, 6);
    linha(`Disjuntor geral: ${resumoDemanda.disjuntorGeralA} A`, 6);
    y += 10;

    // ── 5. Circuitos
    secao("5. DIMENSIONAMENTO DOS CIRCUITOS");
    for (const c of circuitosCalculados) {
      const amp = (c as Amp).ampacidadeFinalA;
      const ampTxt = amp ? amp.toFixed(1) : "-";
      const titulo = `C${String(c.numero).padStart(2, "0")}   ${c.descricao}`;
      const meta = `${c.tipo}  ·  ${c.fase === "RST" ? "Trifásico (3F)" : "Fase " + c.fase}${circuitosOriginais.find((o) => o.id === c.id)?.dr_30ma ? "  ·  DR 30 mA" : ""}  ·  ${c.isolacao}  ·  L = ${c.comprimentoM} m`;
      const calc: string[] = [
        `a) Potência: P = ${(Math.round(c.potenciaVA * 100) / 100)} VA x FP ${Number(c.fp.toFixed(3))} = ${Math.round(c.potenciaW)} W`,
        c.trifasico
          ? `b) Corrente: Ib = S / (raiz(3) x VL) = ${Math.round(c.potenciaVA)} / (1,732 x ${c.tensaoV}) = ${c.ibA.toFixed(2)} A`
          : `b) Corrente: Ib = S / V = ${Math.round(c.potenciaVA)} / ${c.tensaoV} = ${c.ibA.toFixed(2)} A`,
        `c) Condutor: ${c.secaoFinalMm2} mm², Iz = ${ampTxt} A${c.fcaAplicado < 1 ? ` (FCA ${String(c.fcaAplicado).replace(".", ",")})` : ""}${c.tipo !== "Iluminação" ? " (mín. 2,5 mm²)" : ""}`,
        `d) Queda de tensão: ${c.quedaPercent.toFixed(2)}%  ${c.quedaPercent <= 4 ? "OK (limite 4%)" : "EXCEDE 4%: ampliar seção"}`,
        `e) Proteção: Ib ${c.ibA.toFixed(1)} A <= In ${c.disjuntorA} A <= Iz ${ampTxt} A`,
      ];
      for (let i = 0; i < calc.length; i++) calc[i] = calc[i].replace(/(\d)\.(\d)/g, "$1,$2");
      const hT = texto(titulo, { x: M + 10, w: CW - 20, size: 9.5, bold: true, draw: false });
      const hCalc = calc.reduce((a, t) => a + texto(t, { x: M + 14, w: CW - 24, size: 8.5, draw: false }) + 1, 0);
      const hTotal = 6 + hT + 12 + 4 + hCalc + 10;
      garantir(hTotal);
      doc.setFillColor(...CINZA); doc.rect(M, y, CW, 6 + hT + 12 + 4, "F");
      doc.setFillColor(...AZUL); doc.rect(M, y, 3, 6 + hT + 12 + 4, "F");
      y += 6;
      texto(titulo, { x: M + 10, w: CW - 20, size: 9.5, bold: true, cor: AZUL });
      y += hT;
      texto(meta, { x: M + 10, size: 8, cor: [90, 100, 115] });
      y += 12 + 4 + 3;
      for (const t of calc) { const h = texto(t, { x: M + 14, w: CW - 24, size: 8.5 }); y += h + 1; }
      y += 10;
    }

    // ── 6. Balanço
    if (trifasico) {
      secao("6. BALANÇO DE FASES");
      linha(`Fase R: ${Math.round(balanco.R)} VA (${(balanco.R / 220).toFixed(1).replace(".", ",")} A)  ·  Fase S: ${Math.round(balanco.S)} VA (${(balanco.S / 220).toFixed(1).replace(".", ",")} A)  ·  Fase T: ${Math.round(balanco.T)} VA (${(balanco.T / 220).toFixed(1).replace(".", ",")} A)`, 6);
      linha(`Desbalanceamento: ${balanco.desbalanceamentoPercent.toFixed(1)}%  ${balanco.desbalanceamentoPercent <= 10 ? "OK (limite 10%)" : "VERIFICAR (limite 10%)"}`, 6);
    }

    // ── Rodapé
    const totalPg = doc.getNumberOfPages();
    for (let p = 1; p <= totalPg; p++) {
      doc.setPage(p);
      doc.setFillColor(...AZUL); doc.rect(0, PH - 20, W, 20, "F");
      doc.setTextColor(255); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      doc.text(`${project.nome} · Memorial de Cálculo · NBR 5410:2004`, M, PH - 7);
      doc.text(`Página ${p} de ${totalPg}`, W - M, PH - 7, { align: "right" });
    }
    doc.save(`${project.nome.toLowerCase().replace(/\s+/g, "-")}-memorial-calculo.pdf`);
  }

  // ── Exportar Tabela PDF ────────────────────────────────────────────────
  function exportarTabelaPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
    const M = 30; const W = doc.internal.pageSize.getWidth();
    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 50, "F");
    doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("QUADRO DE CARGAS — TABELA DE CIRCUITOS", M, 22);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text(`${project.nome}  ·  ${Vn}V  ·  ${project.tipo_entrada ?? "Monofásico"}  ·  ${concessionaria}  ·  ${dataHoje}`, M, 38);
    doc.setTextColor(0);
    autoTable(doc, {
      startY: 58, margin: { left: M, right: M },
      styles: { fontSize: 7.5, cellPadding: 3, lineColor: [200,205,210], lineWidth: 0.2 },
      headStyles: { fillColor: AZUL, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: CINZA },
      head: [["Nº","Descrição","Tipo","Pts","Fase","VA","W","L(m)","Isol.","Ib(A)","Cabo(mm²)","Iz(A)","dV(%)","Disj.(A)","OK?"]],
      body: circuitosCalculados.map(c => {
        const orig = circuitosOriginais.find(o => o.id === c.id);
        const amp = (c as Amp).ampacidadeFinalA;
        return [
          c.numero, c.descricao, c.tipo, orig?.qtd_pontos ?? 1, c.fase,
          c.potenciaVA, Math.round(c.potenciaW), c.comprimentoM, c.isolacao,
          c.ibA.toFixed(2), c.secaoFinalMm2, amp ? amp.toFixed(1) : "—",
          c.quedaPercent.toFixed(2), c.disjuntorA,
          c.quedaPercent <= 4 && c.ibA <= c.disjuntorA ? "OK" : "X",
        ];
      }),
    });
    const cur = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(80,80,80);
    doc.text(`Carga total: ${Math.round(potTotal).toLocaleString("pt-BR")} W  ·  FD: ${(fatorDemanda*100).toFixed(0)}%  ·  Demanda: ${Math.round(potDemandaW).toLocaleString("pt-BR")} W  ·  Ib entrada: ${ibEntrada.toFixed(1)} A  ·  Disj. geral: ${resumoDemanda.disjuntorGeralA} A  ·  Ramal: ${secaoRamal} mm²`, M, cur);
    const totalPg = doc.getNumberOfPages();
    for (let p = 1; p <= totalPg; p++) {
      doc.setPage(p);
      const ph = doc.internal.pageSize.getHeight();
      doc.setFillColor(...AZUL); doc.rect(0, ph - 16, W, 16, "F");
      doc.setTextColor(255); doc.setFontSize(7);
      doc.text(`${project.nome} — Tabela de Circuitos — NBR 5410`, M, ph - 5);
      doc.text(`Pág. ${p} / ${totalPg}`, W - M, ph - 5, { align: "right" });
    }
    doc.save(`${project.nome.toLowerCase().replace(/\s+/g,"-")}-circuitos.pdf`);
  }

  const [ativo, setAtivo] = useState("1");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[id^='sec-']"));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => { const v = entries.filter((e) => e.isIntersecting).sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top)[0]; if (v) setAtivo(v.target.id.replace("sec-", "")); },
      { rootMargin: "-10% 0px -70% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [circuitosCalculados.length, trifasico]);

  return (
    <div className="grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)] print:block">
      {/* Menu lateral */}
      <aside className="print:hidden lg:sticky lg:top-4 lg:self-start">
        <div className="flex flex-col gap-2">
          <button onClick={exportarMemorialPDF} className="flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90">
            <FileText size={15} /> Memorial (PDF)
          </button>
          <button onClick={exportarTabelaPDF} className="flex items-center justify-center gap-1.5 rounded-lg border border-panel-border px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
            <Table2 size={15} /> Tabela de circuitos (PDF)
          </button>
          <button onClick={() => { setAbertos(true); setTimeout(() => window.print(), 150); }} className="flex items-center justify-center gap-1.5 rounded-lg border border-panel-border px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
            <Printer size={15} /> Imprimir
          </button>
        </div>
        <nav className="mt-4 rounded-xl border border-panel-border bg-panel p-2">
          <p className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-muted">Neste documento</p>
          {indice.map(([n, nome]) => (
            <a key={n} href={`#sec-${n}`} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors ${ativo === n ? "bg-accent/15 font-semibold text-accent" : "text-muted hover:bg-panel-border/60 hover:text-text"}`}>
              <span className="w-5 font-mono text-[11px] font-bold text-accent">{n.padStart(2, "0")}</span>{nome}
            </a>
          ))}
        </nav>
      </aside>

      {/* Folha do memorial */}
      <article style={PAPEL} className="min-w-0 rounded-xl bg-white p-6 text-text shadow-2xl ring-1 ring-black/10 md:p-10 print:rounded-none print:p-0 print:shadow-none print:ring-0">
        <header className="mb-8 border-b-4 border-double border-accent pb-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-warn">Memorial de Cálculo · Instalações Elétricas de Baixa Tensão</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-text md:text-4xl">{project.nome}</h1>
          <p className="mt-1 text-sm text-muted">ABNT NBR 5410:2004 · {concessionaria} · {dataHoje}</p>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:grid-cols-4">
            {[
              ["Cliente", project.cliente ?? "—"],
              ["Endereço", (project as { endereco?: string }).endereco ?? "—"],
              ["Responsável técnico", project.responsavel_tecnico ?? "—"],
              ["Registro", project.registro_profissional ?? "—"],
            ].map(([k, v]) => (
              <div key={k}><p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{k}</p><p className="font-medium text-text">{v}</p></div>
            ))}
          </div>
        </header>

        <div className="mb-10 grid grid-cols-2 divide-x divide-y divide-panel-border overflow-hidden rounded-lg border border-panel-border bg-panel md:grid-cols-3 lg:grid-cols-6 lg:divide-y-0 print:grid-cols-6 print:divide-y-0">
          <Kpi label="Carga instalada" valor={`${(potTotal / 1000).toFixed(1)} kW`} sub={`${circuitosCalculados.length} circuitos`} />
          <Kpi label="Demanda" valor={disNor ? `${(potDemandaW / 1000).toFixed(2).replace(".", ",")} kVA` : `${(potDemandaW / 1000).toFixed(1)} kW`} sub={disNor ? `DIS-NOR-030${resumoDemanda.categoria ? ` · ${resumoDemanda.categoria.id}` : ""}` : `FD ${(fatorDemanda * 100).toFixed(0)}%`} />
          <Kpi label="Corrente de entrada" valor={`${ibEntrada.toFixed(1)} A`} sub={`Ramal ${secaoRamal} mm²`} />
          <Kpi label="Disjuntor geral" valor={`${resumoDemanda.disjuntorGeralA} A`} sub={project.tipo_entrada ?? "Monofásico"} />
          <Kpi label="Circuitos com alerta" valor={String(circuitosComAlerta)} sub={trifasico ? `Desbalanço ${balanco.desbalanceamentoPercent.toFixed(1)}%` : "ΔV ≤ 4% e Ib ≤ In"} cor={circuitosComAlerta ? "danger" : "ok"} />
          <Kpi label="Conformidade" valor={`${conformes}/${verificacoes.length}`} sub="Itens da NBR 5410" cor={conformes === verificacoes.length ? "ok" : "warn"} />
        </div>

      {/* 1. Identificação */}
      <Secao num="1" titulo="Identificação do Projeto">
        <Bloco>
          <div className="grid grid-cols-2 gap-x-8">
            {dadosIdent.map(({ label, valor }) => (
              <Linha key={label} label={label} valor={valor} />
            ))}
          </div>
        </Bloco>
      </Secao>

      {/* 2. Referências Normativas */}
      <Secao num="2" titulo="Referências Normativas">
        <Bloco>
          {[
            ["NBR 5410:2004", "Instalações elétricas de baixa tensão — requisitos gerais"],
            ["NBR 5444:1989", "Símbolos gráficos para instalações elétricas prediais"],
            ["NBR 14136:2012", "Plugues e tomadas para uso doméstico e análogo — padrão brasileiro"],
            ["NR-10 (MTE)", "Segurança em instalações e serviços em eletricidade"],
            ["IEC 60364", "Electrical installations of buildings (referência internacional)"],
            [`Normas ${concessionaria}`, "Critérios de fornecimento e padrão de entrada da concessionária local"],
          ].map(([norma, desc]) => (
            <div key={norma} className="flex gap-3 border-b border-panel-border py-2 last:border-0 text-sm">
              <span className="w-36 shrink-0 font-mono font-semibold text-accent">{norma}</span>
              <span className="text-muted">{desc}</span>
            </div>
          ))}
        </Bloco>
      </Secao>

      {/* 3. Dados do sistema */}
      <Secao num="3" titulo="Dados do Sistema Elétrico">
        <div className="grid gap-4 md:grid-cols-3">
          <Bloco titulo="Alimentação">
            <Linha label="Tensão nominal" valor={tensaoTxt} />
            <Linha label="Frequência" valor="60 Hz" />
            <Linha label="Tipo de entrada" valor={project.tipo_entrada ?? "Monofásico"} />
          </Bloco>
          <Bloco titulo="Sistema de aterramento">
            <Linha label="Esquema adotado" valor={esquemaTxt} />
            <Linha label="Condutor PE" valor={peTxt} />
            <Linha label="Haste de aterramento" valor="≥ 1 haste 2,4 m" />
          </Bloco>
          <Bloco titulo="Proteção diferencial">
            <Linha label="IDR geral" valor="300 mA (recomendado)" />
            <Linha label="IDR áreas molhadas" valor="30 mA (obrigatório)" />
            <Linha label="Referência" valor="NBR 5410 §5.1.3" />
          </Bloco>
        </div>
      </Secao>

      {/* 4. Demanda */}
      <Secao num="4" titulo={disNor ? "Demanda: método da DIS-NOR-030 (Neoenergia)" : "Fator de Demanda (estimativa simplificada)"}>
        {disNor ? (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-panel-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-elevated text-left text-xs uppercase text-muted">
                  <tr><th className="px-4 py-2.5">Parcela</th><th className="px-4 py-2.5">Descrição</th><th className="px-4 py-2.5">Base de cálculo</th><th className="px-4 py-2.5 text-right">kVA</th></tr>
                </thead>
                <tbody>
                  {(resumoDemanda.parcelas ?? []).map((p) => (
                    <tr key={p.id} className="border-t border-panel-border">
                      <td className="px-4 py-2 font-mono font-bold text-accent">{p.id}</td>
                      <td className="px-4 py-2 font-medium">{p.descricao}</td>
                      <td className="px-4 py-2 text-xs text-muted">{p.base}</td>
                      <td className="tabular px-4 py-2 text-right">{p.kva.toFixed(2).replace(".", ",")}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-panel-border bg-accent/10 font-semibold text-accent">
                    <td className="px-4 py-2.5" colSpan={3}>Demanda total D = a + d + f + g + h</td>
                    <td className="tabular px-4 py-2.5 text-right">{(potDemandaW / 1000).toFixed(2).replace(".", ",")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Bloco titulo="Cargas consideradas na demanda">
                {(cfg.cargas_demanda ?? []).map((c, i) => (
                  <Linha key={i} label={c.descricao} valor={`${Math.round(c.potenciaW * (c.quantidade ?? 1)).toLocaleString("pt-BR")} W · FP ${String(c.fp).replace(".", ",")}`} />
                ))}
                <Linha label="Carga instalada (soma dos circuitos)" valor={`${Math.round(potTotal).toLocaleString("pt-BR")} W`} destaque />
              </Bloco>
              <Bloco titulo={`Categoria Cosern ${resumoDemanda.categoria?.id ?? "(conferir)"}`}>
                <Linha label="Faixa de demanda" valor={resumoDemanda.categoria ? `${String(resumoDemanda.categoria.demandaMinKVA).replace(".", ",")} a ${resumoDemanda.categoria.demandaMaxKVA} kVA` : "fora das categorias cadastradas"} />
                <Linha label="Demanda do projeto" valor={`${(potDemandaW / 1000).toFixed(2).replace(".", ",")} kVA`} />
                <Linha label="Disjuntor geral" valor={`${resumoDemanda.disjuntorGeralA} A`} destaque />
                <Linha label="Ramal de entrada" valor={resumoDemanda.categoria?.ramalDescricao ?? "-"} />
                <Linha label="Carga instalada máx. (baixa tensão)" valor="75 kW (ANEEL REN 1000/2021)" />
              </Bloco>
            </div>
            <p className="text-xs text-muted">Fatores das Tabelas 12, 14 e 22 da DIS-NOR-030 (revisão 04) para escolas; conferir a revisão vigente antes de protocolar. O fator de demanda do ar-condicionado foi adotado em 1,00 a favor da segurança.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-4 overflow-hidden rounded-xl border border-panel-border">
                <table className="w-full text-sm">
                  <thead className="bg-bg-elevated text-left text-xs uppercase text-muted">
                    <tr>
                      <th className="px-4 py-2.5">Carga instalada</th>
                      <th className="px-4 py-2.5 text-right">Fator (FD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["≤ 3.000 W",   "100%", potTotal <= 3000],
                      ["3.001 – 6.000 W", "80%", potTotal > 3000 && potTotal <= 6000],
                      ["6.001 – 10.000 W","65%", potTotal > 6000 && potTotal <= 10000],
                      ["10.001 – 15.000 W","55%", potTotal > 10000 && potTotal <= 15000],
                      ["> 15.000 W",  "50%", potTotal > 15000],
                    ].map(([faixa, fd, ativo]) => (
                      <tr key={String(faixa)} className={`border-t border-panel-border ${ativo ? "bg-accent/10 font-semibold text-accent" : ""}`}>
                        <td className="px-4 py-2">{faixa}</td>
                        <td className="px-4 py-2 text-right">{fd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <Eq
                label="Carga instalada total"
                latex={`P_{inst} = \\sum_{i=1}^{${circuitosCalculados.length}} P_i = ${Math.round(potTotal).toLocaleString("pt-BR")}\\text{ W}`}
                resultado={`${Math.round(potTotal).toLocaleString("pt-BR")} W`}
              />
              <Eq
                label="Potência de demanda"
                latex={`P_d = P_{inst} \\times FD = ${Math.round(potTotal).toLocaleString("pt-BR")} \\times ${fatorDemanda} = ${Math.round(potDemandaW).toLocaleString("pt-BR")}\\text{ W}`}
                resultado={`${Math.round(potDemandaW).toLocaleString("pt-BR")} W`}
                obs={`FD = ${(fatorDemanda*100).toFixed(0)}%`}
              />
            </div>
          </div>
        )}
      </Secao>

      {/* 5. Corrente de entrada e ramal */}
      <Secao num="5" titulo="Corrente de Entrada e Dimensionamento do Ramal">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Eq
              label={trifasico ? "Corrente de entrada (trifásico)" : bifasico ? "Corrente de entrada (bifásico)" : "Corrente de entrada (monofásico)"}
              latex={
                disNor
                  ? `I_b = \\dfrac{S_D}{\\sqrt{3}\\cdot V_L} = \\dfrac{${Math.round(potDemandaW)}}{1{,}732 \\times ${Vn}} = ${ibEntrada.toFixed(1)}\\text{ A}`
                  : trifasico
                  ? `I_b = \\dfrac{P_d}{\\sqrt{3}\\cdot V_n \\cdot FP} = \\dfrac{${Math.round(potDemandaW)}}{1{,}732 \\times ${Vn} \\times 0{,}92} = ${ibEntrada.toFixed(1)}\\text{ A}`
                  : bifasico
                  ? `I_b = \\dfrac{P_d}{2 \\cdot V_n \\cdot FP} = \\dfrac{${Math.round(potDemandaW)}}{2 \\times ${Vn} \\times 0{,}92} = ${ibEntrada.toFixed(1)}\\text{ A}`
                  : `I_b = \\dfrac{P_d}{V_n \\cdot FP} = \\dfrac{${Math.round(potDemandaW)}}{${Vn} \\times 0{,}92} = ${ibEntrada.toFixed(1)}\\text{ A}`
              }
              resultado={`${ibEntrada.toFixed(1)} A`}
            />
          </div>
          <div>
            <Bloco titulo="Ramal de entrada">
              <Linha label="Corrente de projeto (Ib)" valor={`${ibEntrada.toFixed(1)} A`} />
              <Linha label="Seção do ramal (cabo Cu)" valor={`${secaoRamal} mm²`} destaque />
              <Linha label="Disjuntor geral" valor={`${resumoDemanda.disjuntorGeralA} A`} destaque />
              <Linha label="Critério" valor={disNor ? `${concessionaria}: categoria ${resumoDemanda.categoria?.id ?? "?"} + NBR 5410` : `${concessionaria} + NBR 5410 §6.3`} />
            </Bloco>
          </div>
        </div>
      </Secao>

      {/* 6. Memorial por circuito */}
      <Secao num="6" titulo="Dimensionamento Individual dos Circuitos">
        <div className="mb-4 rounded-lg border border-warn/30 bg-warn/5 p-3 text-xs text-warn flex items-start gap-2">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>Critérios: Seção mínima iluminação 1,5 mm² · força (TUG e TUE) 2,5 mm² · Queda de tensão máx. 4% · 30 °C · Embutido em eletroduto{cfg.fca ? ` · FCA ${String(cfg.fca).replace(".", ",")} (circuitos agrupados)` : ""}</span>
        </div>
        <div className="mb-6 overflow-x-auto rounded-xl border border-panel-border">
          <table className="w-full whitespace-nowrap text-sm">
            <thead className="bg-bg-elevated text-left text-xs uppercase text-muted">
              <tr>
                <th className="px-3 py-2.5">Nº</th><th className="px-3 py-2.5">Descrição</th><th className="px-3 py-2.5">Tipo</th>
                <th className="px-3 py-2.5">Fase</th><th className="px-3 py-2.5 text-right">VA</th><th className="px-3 py-2.5 text-right">Ib (A)</th>
                <th className="px-3 py-2.5 text-right">Cabo (mm²)</th><th className="px-3 py-2.5 text-right">ΔV (%)</th>
                <th className="px-3 py-2.5 text-right">Disj. (A)</th><th className="px-3 py-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {circuitosCalculados.map((c) => {
                const ok = c.quedaPercent <= 4 && c.ibA <= c.disjuntorA;
                return (
                  <tr key={c.id} className={`border-t border-panel-border ${ok ? "" : "bg-danger/[0.05]"}`}>
                    <td className="px-3 py-1.5 font-mono"><a href={`#circ-${c.id}`} onClick={() => setAbertos(true)} className="font-bold text-accent hover:underline">C{c.numero}</a></td>
                    <td className="max-w-[22rem] truncate px-3 py-1.5" title={c.descricao}>{c.descricao}</td>
                    <td className="px-3 py-1.5"><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c.tipo === "Iluminação" ? "bg-warn/15 text-warn" : c.tipo === "TUG" ? "bg-ok/15 text-ok" : "bg-accent/15 text-accent"}`}>{c.tipo}</span></td>
                    <td className="px-3 py-1.5 font-mono">{c.fase === "RST" ? "3F" : c.fase}</td>
                    <td className="tabular px-3 py-1.5 text-right">{Math.round(c.potenciaVA).toLocaleString("pt-BR")}</td>
                    <td className="tabular px-3 py-1.5 text-right">{c.ibA.toFixed(2)}</td>
                    <td className="tabular px-3 py-1.5 text-right">{c.secaoFinalMm2}</td>
                    <td className={`tabular px-3 py-1.5 text-right ${c.quedaPercent > 4 ? "font-bold text-danger" : ""}`}>{c.quedaPercent.toFixed(2)}</td>
                    <td className="tabular px-3 py-1.5 text-right font-medium">{c.disjuntorA}</td>
                    <td className="px-3 py-1.5 text-center">{ok ? <CheckCircle2 size={14} className="inline text-ok" /> : <XCircle size={14} className="inline text-danger" />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mb-4 flex items-center justify-between print:hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">Memória de cálculo de cada circuito</p>
          <button onClick={() => setAbertos((v) => !v)} className="flex items-center gap-1.5 rounded-lg border border-panel-border px-3 py-1.5 text-xs hover:border-accent hover:text-accent transition-colors">
            <ChevronsUpDown size={13} /> {abertos ? "Recolher todos" : "Expandir todos"}
          </button>
        </div>
        <div className="space-y-2.5">
          {circuitosCalculados.map(c => {
            const amp = (c as Amp).ampacidadeFinalA;
            const quedaOk = c.quedaPercent <= 4;
            const selOk   = c.ibA <= c.disjuntorA && c.disjuntorA <= (amp ?? 999);
            return (
              <details key={`${c.id}-${abertos}`} id={`circ-${c.id}`} open={abertos}
                style={{ borderLeftColor: c.fase === "RST" ? "var(--accent)" : `var(--phase-${c.fase.toLowerCase()})` }}
                className={`group scroll-mt-6 rounded-lg border border-l-4 p-3 print:break-inside-avoid ${!quedaOk ? "border-danger/40 bg-danger/5" : "border-panel-border bg-panel"}`}>
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 [&::-webkit-details-marker]:hidden">
                  <ChevronDown size={15} className="shrink-0 text-muted transition-transform group-open:rotate-180 print:hidden" />
                  <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold text-bg">C{String(c.numero).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{c.descricao}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c.tipo === "Iluminação" ? "bg-warn/15 text-warn" : c.tipo === "TUG" ? "bg-ok/15 text-ok" : "bg-accent/10 text-accent"}`}>{c.tipo}</span>
                  <span className="font-mono text-[11px] text-muted">{c.fase === "RST" ? "Trifásico 3F" : `Fase ${c.fase}`}{circuitosOriginais.find(o=>o.id===c.id)?.dr_30ma ? " · DR 30 mA" : ""} · {c.comprimentoM} m · {circuitosOriginais.find(o=>o.id===c.id)?.qtd_pontos ?? "—"} pts · {c.isolacao}</span>
                </summary>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <EqLinha label="a) Potência ativa" latex={`P = S \\times FP = ${Math.round(c.potenciaVA * 100) / 100}\\text{ VA} \\times ${Number(c.fp.toFixed(3))} = ${Math.round(c.potenciaW)}\\text{ W}`} resultado={`${Math.round(c.potenciaW)} W`} />
                  <EqLinha label="b) Corrente de projeto (Ib)" latex={c.trifasico ? `I_b = \\dfrac{S}{\\sqrt{3}\\cdot V_L} = \\dfrac{${Math.round(c.potenciaVA)}}{1{,}732 \\times ${c.tensaoV}} = ${c.ibA.toFixed(2)}\\text{ A}` : `I_b = \\dfrac{S}{V_n} = \\dfrac{${Math.round(c.potenciaVA)}}{${c.tensaoV}} = ${c.ibA.toFixed(2)}\\text{ A}`} resultado={`${c.ibA.toFixed(2)} A`} />
                  <EqLinha label={`c) Seção do cabo (mín. ${c.tipo === "Iluminação" ? "1,5" : "2,5"} mm²${c.fcaAplicado < 1 ? ` · FCA ${String(c.fcaAplicado).replace(".", ",")}` : ""})`} latex={`I_b \\leq I_z \\Rightarrow ${c.ibA.toFixed(1)} \\leq ${amp ? amp.toFixed(1) : "—"}\\text{ A} \\Rightarrow \\boxed{${c.secaoFinalMm2}\\text{ mm}^2}`} resultado={`${c.secaoFinalMm2} mm² · Iz ${amp ? amp.toFixed(1) : "—"} A`} />
                  <EqLinha label="d) Disjuntor (seletividade)" latex={`I_b \\leq I_n \\leq I_z \\Rightarrow ${c.ibA.toFixed(1)} \\leq ${c.disjuntorA} \\leq ${amp ? amp.toFixed(1) : "—"}\\text{ A}`} resultado={`${c.disjuntorA} A`} obs={selOk ? "✓ condição satisfeita" : "⚠ verificar"} cor={selOk ? "ok" : "danger"} />
                  <EqLinha className="md:col-span-2" label="e) Queda de tensão" latex={`\\Delta V = \\dfrac{${c.trifasico ? "\\sqrt{3}" : "2"} \\cdot \\rho \\cdot L \\cdot I_b}{A \\cdot V_n} \\times 100 = \\dfrac{${c.trifasico ? "1{,}732" : "2"} \\times 1{,}72\\times10^{-8} \\times ${c.comprimentoM} \\times ${c.ibA.toFixed(2)}}{${c.secaoFinalMm2}\\times10^{-6} \\times ${c.tensaoV}} \\times 100 = ${c.quedaPercent.toFixed(2)}\\%`} resultado={`${c.quedaPercent.toFixed(2)} %`} obs={quedaOk ? "✓ ≤ 4%" : "⚠ excede 4%: ampliar a seção"} cor={quedaOk ? "ok" : "danger"} />
                </div>
              </details>
            );
          })}
        </div>
      </Secao>

      {/* 7. Balanço de fases */}
      {trifasico && (
        <Secao num="7" titulo="Balanço de Fases — Sistema Trifásico">
          <div className="grid gap-4 md:grid-cols-2">
            <Bloco titulo="Carga aparente por fase (VA)">
              {[["R", balanco.R], ["S", balanco.S], ["T", balanco.T]].map(([fase, val]) => (
                <div key={String(fase)} className="flex items-center gap-3 border-b border-panel-border py-2 last:border-0">
                  <span className={`flex h-6 w-6 items-center justify-center rounded font-mono text-xs font-bold text-bg ${fase === "R" ? "bg-phase-r" : fase === "S" ? "bg-phase-s" : "bg-phase-t"}`}>{fase}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-panel-border">
                    <div className={`h-2 rounded-full ${fase === "R" ? "bg-phase-r" : fase === "S" ? "bg-phase-s" : "bg-phase-t"}`}
                      style={{ width: `${(Number(val) / Math.max(balanco.R, balanco.S, balanco.T)) * 100}%` }} />
                  </div>
                  <span className="w-40 text-right font-mono text-sm">{Math.round(Number(val)).toLocaleString("pt-BR")} VA · {(Number(val) / 220).toFixed(1).replace(".", ",")} A</span>
                </div>
              ))}
            </Bloco>
            <div>
              <Eq
                label="Desbalanceamento percentual"
                latex={`\\delta = \\dfrac{S_{max} - S_{min}}{S_{med}} \\times 100 = \\dfrac{${Math.round(Math.max(balanco.R,balanco.S,balanco.T))} - ${Math.round(Math.min(balanco.R,balanco.S,balanco.T))}}{${Math.round((balanco.R+balanco.S+balanco.T)/3)}} \\times 100 = ${balanco.desbalanceamentoPercent.toFixed(1)}\\%`}
                resultado={`${balanco.desbalanceamentoPercent.toFixed(1)} %`}
                obs={balanco.desbalanceamentoPercent <= 10 ? "✓ OK (≤ 10%)" : "⚠ Redistribuir circuitos"}
                cor={balanco.desbalanceamentoPercent <= 10 ? "ok" : "danger"}
              />
            </div>
          </div>
        </Secao>
      )}

      {/* 8. Aterramento */}
      <Secao num={trifasico ? "8" : "7"} titulo={`Sistema de Aterramento: ${esquemaTxt}`}>
        <div className="grid gap-4 md:grid-cols-2">
          <Bloco titulo="Critérios NBR 5410 §5.4">
            <Linha label="Esquema de aterramento" valor={esquemaTxt} />
            <Linha label="Condutor PE" valor={peTxt} />
            <Linha label="Seção mínima PE (≤ 16mm²)" valor="Igual ao condutor de fase" />
            <Linha label="Seção mínima PE (16–35mm²)" valor="16 mm²" />
            <Linha label="Seção mínima PE (> 35mm²)" valor="Metade da fase" />
            <Linha label="Resistência do aterramento" valor="≤ 10 Ω" destaque />
          </Bloco>
          <Bloco titulo="Haste de aterramento (NBR 7117)">
            <Linha label="Tipo de haste" valor={hasteTxt} />
            <Linha label="Comprimento mínimo" valor="2,40 m" />
            <Linha label="Profundidade de enterramento" valor="≥ 2,40 m vertical" />
            <Linha label="Resistividade típica (RN)" valor="ρ ≈ 100 Ω·m (areia fina)" />
            <Linha label="Resistência estimada (1 haste)" valor={`R ≈ ρ/2πL = ${(100/(2*Math.PI*2.4)).toFixed(1)} Ω`} />
          </Bloco>
        </div>
        <Eq
          label="Resistência de aterramento — haste vertical (Norma NBR 7117)"
          latex={`R = \\dfrac{\\rho}{2\\pi L}\\left[\\ln\\dfrac{4L}{d} - 1\\right] \\approx \\dfrac{100}{2\\pi \\times 2{,}4}\\left[\\ln\\dfrac{4\\times2{,}4}{${String(dHaste).replace(".", "{,}")}} - 1\\right] \\approx ${((100/(2*Math.PI*2.4))*(Math.log(4*2.4/dHaste)-1)).toFixed(1)}\\text{ }\\Omega`}
          resultado={`${((100/(2*Math.PI*2.4))*(Math.log(4*2.4/dHaste)-1)).toFixed(1)} Ω (estimado)`}
          obs="Medir com terrômetro após instalação"
        />
      </Secao>

      {/* 9. Proteção contra choques */}
      <Secao num={trifasico ? "9" : "8"} titulo="Proteção contra Choques Elétricos — DR / IDR">
        <Bloco>
          <div className="mb-4 overflow-hidden rounded-xl border border-panel-border">
            <table className="w-full text-sm">
              <thead className="bg-bg-elevated text-left text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-2.5">Local / Circuito</th>
                  <th className="px-4 py-2.5">IDR recomendado</th>
                  <th className="px-4 py-2.5">Referência</th>
                  <th className="px-4 py-2.5">Obrigatoriedade</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Banheiros e WC", "30 mA", "NBR 5410 §5.1.3.2", "Obrigatório"],
                  ["Cozinha e área de serviço", "30 mA", "NBR 5410 §5.1.3.2", "Obrigatório"],
                  ["Tomadas externas / varanda", "30 mA", "NBR 5410 §5.1.3.2", "Obrigatório"],
                  ["Tomadas de uso geral (TUG)", "30 mA", "NBR 5410 §5.1.3", "Recomendado"],
                  ["Chuveiro elétrico", "30 mA", "NBR 5410 §5.1.3.2", "Obrigatório"],
                  ["Geral da instalação", "300 mA", "NBR 5410 §5.1.3", "Recomendado"],
                ].map(([loc, idr, ref, obr]) => (
                  <tr key={String(loc)} className="border-t border-panel-border">
                    <td className="px-4 py-2 font-medium">{loc}</td>
                    <td className="px-4 py-2 font-mono text-accent">{idr}</td>
                    <td className="px-4 py-2 text-muted text-xs">{ref}</td>
                    <td className="px-4 py-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${obr === "Obrigatório" ? "bg-danger/15 text-danger" : "bg-warn/15 text-warn"}`}>{obr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Bloco>
      </Secao>

      {/* 10. Verificação de conformidade */}
      <Secao num={trifasico ? "10" : "9"} titulo="Verificação de Conformidade — NBR 5410:2004">
        <div className="grid gap-2 md:grid-cols-2">
          {verificacoes.map(([item, ref, ok]) => (
            <Conformidade key={item} item={item} criterio={ref} ok={ok} />
          ))}
        </div>
      </Secao>

      {/* Assinatura */}
      <div className="mt-10 border-t border-panel-border pt-8">
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <div className="h-14 border-b border-panel-border" />
            <p className="mt-2 font-medium">{project.responsavel_tecnico ?? "Responsável Técnico"}</p>
            {project.registro_profissional && <p className="text-xs text-muted">{project.registro_profissional}</p>}
            {project.numero_art && <p className="text-xs text-muted">ART/RRT nº {project.numero_art}</p>}
          </div>
          <div className="text-right text-xs text-muted">
            <p className="font-mono">{dataHoje}</p>
            <p className="mt-1">Gerado por Voltis — Dimensionamento Elétrico</p>
            <p>Conforme ABNT NBR 5410:2004</p>
          </div>
        </div>
      </div>
      </article>
    </div>
  );
}
