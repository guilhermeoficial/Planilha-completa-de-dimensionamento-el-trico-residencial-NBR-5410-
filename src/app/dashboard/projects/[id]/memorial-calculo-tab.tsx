"use client";

import { Printer, FileText, Table2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
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
function Secao({ num, titulo, children, cor = "accent" }: { num: string; titulo: string; children: React.ReactNode; cor?: string }) {
  return (
    <section className="mb-10 print:break-before-auto">
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded bg-${cor} font-mono text-xs font-bold text-bg`}>{num}</span>
        <h2 className={`text-sm font-bold uppercase tracking-widest text-${cor}`}>{titulo}</h2>
        <div className="flex-1 border-t border-panel-border" />
      </div>
      {children}
    </section>
  );
}

function Bloco({ titulo, children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-panel-border bg-panel p-5">
      {titulo && <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">{titulo}</p>}
      {children}
    </div>
  );
}

function Eq({ label, latex, resultado, unidade, obs, cor }: { label: string; latex: string; resultado: string | number; unidade?: string; obs?: string; cor?: "ok" | "danger" | "warn" }) {
  return (
    <div className="mb-5 rounded-lg border border-panel-border bg-bg-elevated p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <div className="overflow-x-auto">
        <Formula latex={latex} block />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-panel-border pt-2">
        <span className="text-xs text-muted">Resultado:</span>
        <span className={`rounded px-2.5 py-0.5 font-mono text-sm font-bold ${cor === "danger" ? "bg-danger/15 text-danger" : cor === "warn" ? "bg-warn/15 text-warn" : "bg-accent/15 text-accent"}`}>
          {resultado}{unidade ? ` ${unidade}` : ""}
        </span>
        {obs && <span className={`text-xs font-medium ${cor === "danger" ? "text-danger" : cor === "ok" ? "text-ok" : "text-muted"}`}>{obs}</span>}
      </div>
    </div>
  );
}

function Linha({ label, valor, destaque = false }: { label: string; valor: string | number; destaque?: boolean }) {
  return (
    <div className={`flex items-center justify-between border-b border-panel-border py-2 last:border-0 ${destaque ? "font-semibold" : ""}`}>
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-sm ${destaque ? "text-accent" : "text-text"}`}>{valor}</span>
    </div>
  );
}

function Conformidade({ item, criterio, ok }: { item: string; criterio: string; ok: boolean }) {
  return (
    <div className={`flex items-start justify-between rounded-lg border p-3.5 ${ok ? "border-ok/30 bg-ok/5" : "border-danger/30 bg-danger/5"}`}>
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

export default function MemorialCalculoTab({ project, ambientes, circuitosCalculados, circuitosOriginais, resumoDemanda, balanco }: Props) {
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
  const potDemandaW = potTotal * fatorDemanda;

  // Corrente de entrada
  const sqrt3 = 1.7320508;
  const ibEntrada = trifasico
    ? potDemandaW / (sqrt3 * Vn * 0.92)
    : bifasico
    ? potDemandaW / (2 * Vn * 0.92)
    : potDemandaW / (Vn * 0.92);

  // Seção do ramal de entrada (cabo)
  const secaoRamal = ibEntrada <= 25 ? 6 : ibEntrada <= 35 ? 10 : ibEntrada <= 50 ? 16 : ibEntrada <= 70 ? 25 : ibEntrada <= 95 ? 35 : 50;

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
    const M = 40; const W = doc.internal.pageSize.getWidth();
    let y = 0;

    // Capa
    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 75, "F");
    doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("MEMORIAL DE CÁLCULO", M, 30);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text("Instalação Elétrica Residencial — ABNT NBR 5410:2004", M, 48);
    doc.setFontSize(8); doc.text(dataHoje, W - M, 30, { align: "right" });
    doc.text("Voltis — Dimensionamento Elétrico Profissional", W - M, 42, { align: "right" });
    doc.setTextColor(0); y = 90;

    // Identificação
    doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, W - 2*M, 52, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...AZUL);
    doc.text("IDENTIFICAÇÃO DO PROJETO", M + 6, y + 11);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(30,30,30);
    doc.text(`Projeto: ${project.nome}`, M + 6, y + 23);
    doc.text(`Cliente: ${project.cliente ?? "—"}`, M + 200, y + 23);
    doc.text(`Tensão: ${Vn} V`, M + 370, y + 23);
    doc.text(`Entrada: ${project.tipo_entrada ?? "Monofásico"}`, M + 6, y + 36);
    doc.text(`Concessionária: ${concessionaria}`, M + 150, y + 36);
    if (project.responsavel_tecnico) doc.text(`Resp. Técnico: ${project.responsavel_tecnico}${project.numero_art ? "  ·  ART/RRT nº " + project.numero_art : ""}`, M + 6, y + 49);
    y += 62; doc.setTextColor(0);

    const addSecao = (titulo: string) => {
      if (y > 720) { doc.addPage(); y = 40; }
      doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, W - 2*M, 16, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(...AZUL);
      doc.text(titulo, M + 6, y + 11); y += 22; doc.setTextColor(0);
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    };

    const addLinha = (txt: string) => { if (y > 750) { doc.addPage(); y = 40; } doc.text(txt, M + 4, y); y += 12; };

    // Seção 1 — Referências
    addSecao("1. REFERÊNCIAS NORMATIVAS");
    addLinha("• ABNT NBR 5410:2004 — Instalações elétricas de baixa tensão");
    addLinha("• ABNT NBR 5444:1989 — Símbolos gráficos para instalações prediais");
    addLinha(`• Normas de fornecimento da ${concessionaria}`);
    addLinha("• NR-10 (MTE) — Segurança em instalações e serviços em eletricidade");
    y += 6;

    // Seção 2 — Dados do sistema
    addSecao("2. DADOS DO SISTEMA ELÉTRICO");
    addLinha(`Tensão nominal: ${Vn} V  ·  Frequência: 60 Hz  ·  Tipo de entrada: ${project.tipo_entrada ?? "Monofásico"}`);
    addLinha(`Sistema de distribuição: TN-S  ·  Condutor PE separado do N em todo o circuito`);
    addLinha(`Número de ambientes: ${ambientes.length}  ·  Número de circuitos: ${circuitosCalculados.length}`);
    y += 6;

    // Seção 3 — Fator de demanda
    addSecao("3. FATOR DE DEMANDA — NBR 5410 TABELA 10.3");
    addLinha(`Carga instalada total: ΣP = ${Math.round(potTotal).toLocaleString("pt-BR")} W`);
    addLinha(`Fator de demanda adotado (FD): ${(fatorDemanda * 100).toFixed(0)}%`);
    addLinha(`Potência de demanda: Pd = ${Math.round(potTotal)} × ${fatorDemanda} = ${Math.round(potDemandaW).toLocaleString("pt-BR")} W`);
    y += 6;

    // Seção 4 — Corrente de entrada
    addSecao("4. CORRENTE DE ENTRADA E RAMAL");
    if (trifasico) addLinha(`Ib = Pd / (√3 × Vn × FP) = ${Math.round(potDemandaW)} / (1,732 × ${Vn} × 0,92) = ${ibEntrada.toFixed(1)} A`);
    else addLinha(`Ib = Pd / (Vn × FP) = ${Math.round(potDemandaW)} / (${Vn} × 0,92) = ${ibEntrada.toFixed(1)} A`);
    addLinha(`Seção mínima do ramal de entrada: ${secaoRamal} mm²`);
    addLinha(`Disjuntor geral: ${resumoDemanda.disjuntorGeralA} A`);
    y += 6;

    // Seção 5 — Circuitos
    addSecao("5. MEMORIAL DE DIMENSIONAMENTO DOS CIRCUITOS");
    for (const c of circuitosCalculados) {
      if (y > 700) { doc.addPage(); y = 40; }
      const amp = (c as Amp).ampacidadeFinalA;
      doc.setFont("helvetica", "bold");
      addLinha(`C${c.numero} — ${c.descricao} (${c.tipo} · Fase ${c.fase} · ${c.isolacao} · L=${c.comprimentoM}m)`);
      doc.setFont("helvetica", "normal");
      addLinha(`  a) Potência: P = ${c.potenciaVA} VA × FP(${c.fp}) = ${Math.round(c.potenciaW)} W`);
      addLinha(`  b) Corrente: Ib = ${Math.round(c.potenciaW)} / ${c.tensaoV} = ${c.ibA.toFixed(2)} A`);
      addLinha(`  c) Cabo: ${c.secaoFinalMm2} mm² — Iz = ${amp ? amp.toFixed(0) : "—"} A${c.tipo === "TUG" ? " (mín. 2,5mm² por NBR 5410)" : ""}`);
      addLinha(`  d) Queda de tensão: ΔV = ${c.quedaPercent.toFixed(2)}% ${c.quedaPercent <= 4 ? "✓ OK (≤ 4%)" : "⚠ EXCEDE 4% — ampliar seção"}`);
      addLinha(`  e) Disjuntor: Ib(${c.ibA.toFixed(1)}A) ≤ In(${c.disjuntorA}A) ≤ Iz(${amp ? amp.toFixed(0) : "—"}A) ✓`);
      y += 4;
    }

    // Seção 6 — Balanço
    if (trifasico) {
      addSecao("6. BALANÇO DE FASES");
      addLinha(`Fase R: ${Math.round(balanco.R)} W  ·  Fase S: ${Math.round(balanco.S)} W  ·  Fase T: ${Math.round(balanco.T)} W`);
      addLinha(`Desbalanceamento: ${balanco.desbalanceamentoPercent.toFixed(1)}% ${balanco.desbalanceamentoPercent <= 10 ? "✓ OK" : "⚠ VERIFICAR (máx. 10%)"}`);
    }

    // Rodapé
    const totalPg = doc.getNumberOfPages();
    for (let p = 1; p <= totalPg; p++) {
      doc.setPage(p);
      const ph = doc.internal.pageSize.getHeight();
      doc.setFillColor(...AZUL); doc.rect(0, ph - 18, W, 18, "F");
      doc.setTextColor(255); doc.setFontSize(7.5);
      doc.text(`${project.nome} — Memorial de Cálculo — NBR 5410:2004`, M, ph - 6);
      doc.text(`Página ${p} de ${totalPg}`, W - M, ph - 6, { align: "right" });
    }
    doc.save(`${project.nome.toLowerCase().replace(/\s+/g,"-")}-memorial-calculo.pdf`);
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
      head: [["Nº","Descrição","Tipo","Pts","Fase","VA","W","L(m)","Isol.","Ib(A)","Cabo(mm²)","Iz(A)","ΔV(%)","Disj.(A)","OK?"]],
      body: circuitosCalculados.map(c => {
        const orig = circuitosOriginais.find(o => o.id === c.id);
        const amp = (c as Amp).ampacidadeFinalA;
        return [
          c.numero, c.descricao, c.tipo, orig?.qtd_pontos ?? 1, c.fase,
          c.potenciaVA, Math.round(c.potenciaW), c.comprimentoM, c.isolacao,
          c.ibA.toFixed(2), c.secaoFinalMm2, amp ? amp.toFixed(0) : "—",
          c.quedaPercent.toFixed(2), c.disjuntorA,
          c.quedaPercent <= 4 && c.ibA <= c.disjuntorA ? "✓" : "✗",
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

  return (
    <div>
      {/* Barra de exportação */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-panel-border bg-panel p-5">
        <div>
          <h1 className="text-lg font-bold">Memorial de Cálculo</h1>
          <p className="text-xs text-muted">Instalação Elétrica Residencial · ABNT NBR 5410:2004 · {concessionaria}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors">
            <Printer size={15} /> Imprimir
          </button>
          <button onClick={exportarMemorialPDF}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity">
            <FileText size={15} /> Memorial de Cálculo (PDF)
          </button>
          <button onClick={exportarTabelaPDF}
            className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors">
            <Table2 size={15} /> Tabela de Circuitos (PDF)
          </button>
        </div>
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
            <Linha label="Tensão nominal" valor={`${Vn} V`} />
            <Linha label="Frequência" valor="60 Hz" />
            <Linha label="Tipo de entrada" valor={project.tipo_entrada ?? "Monofásico"} />
          </Bloco>
          <Bloco titulo="Sistema de aterramento">
            <Linha label="Esquema adotado" valor="TN-S" />
            <Linha label="Condutor PE" valor="Separado do N" />
            <Linha label="Haste de aterramento" valor="≥ 1 haste 2,4 m" />
          </Bloco>
          <Bloco titulo="Proteção diferencial">
            <Linha label="IDR geral" valor="300 mA (recomendado)" />
            <Linha label="IDR áreas molhadas" valor="30 mA (obrigatório)" />
            <Linha label="Referência" valor="NBR 5410 §5.1.3" />
          </Bloco>
        </div>
      </Secao>

      {/* 4. Fator de demanda */}
      <Secao num="4" titulo="Fator de Demanda — NBR 5410 Tabela 10.3">
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
      </Secao>

      {/* 5. Corrente de entrada e ramal */}
      <Secao num="5" titulo="Corrente de Entrada e Dimensionamento do Ramal">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Eq
              label={trifasico ? "Corrente de entrada (trifásico)" : bifasico ? "Corrente de entrada (bifásico)" : "Corrente de entrada (monofásico)"}
              latex={
                trifasico
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
              <Linha label="Critério" valor={`${concessionaria} + NBR 5410 §6.3`} />
            </Bloco>
          </div>
        </div>
      </Secao>

      {/* 6. Memorial por circuito */}
      <Secao num="6" titulo="Dimensionamento Individual dos Circuitos">
        <div className="mb-4 rounded-lg border border-warn/30 bg-warn/5 p-3 text-xs text-warn flex items-start gap-2">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>Critérios: Seção mínima TUG ≥ 2,5mm² · Iluminação ≥ 1,5mm² · TUE ≥ 2,5mm² · Queda de tensão máx. 4% · Temperatura ambiente 30°C · Instalação embutida em conduto</span>
        </div>
        <div className="space-y-8">
          {circuitosCalculados.map(c => {
            const amp = (c as Amp).ampacidadeFinalA;
            const quedaOk = c.quedaPercent <= 4;
            const selOk   = c.ibA <= c.disjuntorA && c.disjuntorA <= (amp ?? 999);
            return (
              <div key={c.id} className={`rounded-2xl border p-6 ${!quedaOk ? "border-danger/40 bg-danger/5" : "border-panel-border bg-panel"}`}>
                {/* Header do circuito */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-accent/15 px-3 py-1 font-mono font-bold text-accent">C{c.numero}</span>
                  <span className="text-base font-bold">{c.descricao}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.tipo === "Iluminação" ? "bg-warn/15 text-warn" : c.tipo === "TUG" ? "bg-ok/15 text-ok" : "bg-accent/15 text-accent"}`}>{c.tipo}</span>
                  <div className="ml-auto flex gap-2 text-xs text-muted">
                    <span>Fase {c.fase}</span>·<span>{c.isolacao}</span>·<span>{c.comprimentoM} m</span>·<span>{circuitosOriginais.find(o=>o.id===c.id)?.qtd_pontos ?? "—"} pontos</span>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Coluna esquerda — correntes */}
                  <div>
                    <Eq
                      label="a) Potência ativa"
                      latex={`P = S \\times FP = ${c.potenciaVA}\\text{ VA} \\times ${c.fp} = ${Math.round(c.potenciaW)}\\text{ W}`}
                      resultado={`${Math.round(c.potenciaW)} W`}
                    />
                    <Eq
                      label="b) Corrente de projeto (Ib)"
                      latex={`I_b = \\dfrac{P}{V_n} = \\dfrac{${Math.round(c.potenciaW)}}{${c.tensaoV}} = ${c.ibA.toFixed(2)}\\text{ A}`}
                      resultado={`${c.ibA.toFixed(2)} A`}
                    />
                  </div>
                  {/* Coluna direita — cabo e disjuntor */}
                  <div>
                    <Eq
                      label={`c) Seção do cabo${c.tipo === "TUG" ? " (mín. 2,5mm² — TUG)" : c.tipo === "Iluminação" ? " (mín. 1,5mm²)" : " (mín. 2,5mm² — TUE)"}`}
                      latex={`I_b \\leq I_z \\;\\Rightarrow\\; ${c.ibA.toFixed(1)} \\leq ${amp ? amp.toFixed(0) : "—"}\\text{ A} \\;\\Rightarrow\\; \\boxed{${c.secaoFinalMm2}\\text{ mm}^2\\text{ Cu ${c.isolacao}}}`}
                      resultado={`${c.secaoFinalMm2} mm² · Iz = ${amp ? amp.toFixed(0) : "—"} A`}
                    />
                    <Eq
                      label="d) Queda de tensão"
                      latex={`\\Delta V = \\dfrac{2 \\cdot \\rho \\cdot L \\cdot I_b}{A \\cdot V_n} \\times 100 = \\dfrac{2 \\times 1{,}72\\times10^{-8} \\times ${c.comprimentoM} \\times ${c.ibA.toFixed(2)}}{${c.secaoFinalMm2}\\times10^{-6} \\times ${c.tensaoV}} \\times 100 = ${c.quedaPercent.toFixed(2)}\\%`}
                      resultado={`${c.quedaPercent.toFixed(2)} %`}
                      obs={quedaOk ? "✓ ≤ 4%" : "⚠ Excede 4% — ampliar seção"}
                      cor={quedaOk ? undefined : "danger"}
                    />
                    <Eq
                      label="e) Disjuntor — verificação de seletividade"
                      latex={`I_b \\leq I_n \\leq I_z \\;\\Rightarrow\\; ${c.ibA.toFixed(1)} \\leq \\underbrace{${c.disjuntorA}}_{\\text{In adotado}} \\leq ${amp ? amp.toFixed(0) : "—"}\\text{ A}`}
                      resultado={`${c.disjuntorA} A`}
                      obs={selOk ? "✓ Condição satisfeita" : "⚠ Verificar"}
                      cor={selOk ? "ok" : "danger"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Secao>

      {/* 7. Balanço de fases */}
      {trifasico && (
        <Secao num="7" titulo="Balanço de Fases — Sistema Trifásico">
          <div className="grid gap-4 md:grid-cols-2">
            <Bloco titulo="Cargas por fase (W)">
              {[["R", balanco.R], ["S", balanco.S], ["T", balanco.T]].map(([fase, val]) => (
                <div key={String(fase)} className="flex items-center gap-3 border-b border-panel-border py-2 last:border-0">
                  <span className={`flex h-6 w-6 items-center justify-center rounded font-mono text-xs font-bold text-bg ${fase === "R" ? "bg-phase-r" : fase === "S" ? "bg-phase-s" : "bg-phase-t"}`}>{fase}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-panel-border">
                    <div className={`h-2 rounded-full ${fase === "R" ? "bg-phase-r" : fase === "S" ? "bg-phase-s" : "bg-phase-t"}`}
                      style={{ width: `${(Number(val) / Math.max(balanco.R, balanco.S, balanco.T)) * 100}%` }} />
                  </div>
                  <span className="w-24 text-right font-mono text-sm">{Math.round(Number(val)).toLocaleString("pt-BR")} W</span>
                </div>
              ))}
            </Bloco>
            <div>
              <Eq
                label="Desbalanceamento percentual"
                latex={`\\delta = \\dfrac{P_{max} - P_{min}}{P_{med}} \\times 100 = \\dfrac{${Math.round(Math.max(balanco.R,balanco.S,balanco.T))} - ${Math.round(Math.min(balanco.R,balanco.S,balanco.T))}}{${Math.round((balanco.R+balanco.S+balanco.T)/3)}} \\times 100 = ${balanco.desbalanceamentoPercent.toFixed(1)}\\%`}
                resultado={`${balanco.desbalanceamentoPercent.toFixed(1)} %`}
                obs={balanco.desbalanceamentoPercent <= 10 ? "✓ OK (≤ 10%)" : "⚠ Redistribuir circuitos"}
                cor={balanco.desbalanceamentoPercent <= 10 ? "ok" : "danger"}
              />
            </div>
          </div>
        </Secao>
      )}

      {/* 8. Aterramento */}
      <Secao num={trifasico ? "8" : "7"} titulo="Sistema de Aterramento — TN-S">
        <div className="grid gap-4 md:grid-cols-2">
          <Bloco titulo="Critérios NBR 5410 §5.4">
            <Linha label="Esquema de aterramento" valor="TN-S" />
            <Linha label="Condutor PE" valor="Separado do neutro (N)" />
            <Linha label="Seção mínima PE (≤ 16mm²)" valor="Igual ao condutor de fase" />
            <Linha label="Seção mínima PE (16–35mm²)" valor="16 mm²" />
            <Linha label="Seção mínima PE (> 35mm²)" valor="Metade da fase" />
            <Linha label="Resistência do aterramento" valor="≤ 10 Ω" destaque />
          </Bloco>
          <Bloco titulo="Haste de aterramento (NBR 7117)">
            <Linha label="Tipo de haste" valor="Copperweld Ø 3/4″" />
            <Linha label="Comprimento mínimo" valor="2,40 m" />
            <Linha label="Profundidade de enterramento" valor="≥ 2,40 m vertical" />
            <Linha label="Resistividade típica (RN)" valor="ρ ≈ 100 Ω·m (areia fina)" />
            <Linha label="Resistência estimada (1 haste)" valor={`R ≈ ρ/2πL = ${(100/(2*Math.PI*2.4)).toFixed(1)} Ω`} />
          </Bloco>
        </div>
        <Eq
          label="Resistência de aterramento — haste vertical (Norma NBR 7117)"
          latex={`R = \\dfrac{\\rho}{2\\pi L}\\left[\\ln\\dfrac{4L}{d} - 1\\right] \\approx \\dfrac{100}{2\\pi \\times 2{,}4}\\left[\\ln\\dfrac{4\\times2{,}4}{0{,}019} - 1\\right] \\approx ${((100/(2*Math.PI*2.4))*(Math.log(4*2.4/0.019)-1)).toFixed(1)}\\text{ }\\Omega`}
          resultado={`${((100/(2*Math.PI*2.4))*(Math.log(4*2.4/0.019)-1)).toFixed(1)} Ω (estimado)`}
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
        <div className="space-y-2">
          {([
            ["Seção mínima TUG ≥ 2,5mm²", "NBR 5410 §6.2.3.1", circuitosCalculados.filter(c=>c.tipo==="TUG").every(c=>c.secaoFinalMm2>=2.5)],
            ["Seção mínima Iluminação ≥ 1,5mm²", "NBR 5410 §6.2.3.1", circuitosCalculados.filter(c=>c.tipo==="Iluminação").every(c=>c.secaoFinalMm2>=1.5)],
            ["Queda de tensão ≤ 4% em todos os circuitos", "NBR 5410 §6.2.7", circuitosCalculados.every(c=>c.quedaPercent<=4)],
            ["Seletividade: Ib ≤ In ≤ Iz em todos os circuitos", "NBR 5410 §6.3.6", circuitosCalculados.every(c=>c.ibA<=c.disjuntorA)],
            ["Circuito exclusivo de iluminação presente", "NBR 5410 §9.2.1", circuitosCalculados.some(c=>c.tipo==="Iluminação")],
            ["TUG áreas molhadas em circuito separado", "NBR 5410 §9.5.2", circuitosCalculados.some(c=>c.descricao.toLowerCase().includes("molhad"))],
            ["Número de circuitos satisfatório (≥ 3)", "NBR 5410 §9.2", circuitosCalculados.length>=3],
            ...(trifasico ? [["Desbalanceamento de fases ≤ 10%", "Prática recomendada", balanco.desbalanceamentoPercent<=10] as [string,string,boolean]] : []),
          ] as [string,string,boolean][]).map(([item, ref, ok]) => (
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
    </div>
  );
}
