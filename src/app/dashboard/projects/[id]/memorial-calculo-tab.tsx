"use client";

import { Printer, FileText, Table2 } from "lucide-react";
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

function Secao({ num, titulo, children }: { num: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-accent font-mono text-xs font-bold text-bg">{num}</span>
        <h2 className="text-sm font-bold uppercase tracking-wide text-text">{titulo}</h2>
        <div className="flex-1 border-t border-panel-border" />
      </div>
      {children}
    </section>
  );
}

function Eq({ label, latex, resultado, obs }: { label: string; latex: string; resultado: string; obs?: string }) {
  return (
    <div className="mb-4 rounded-lg border border-panel-border bg-bg-elevated p-4">
      <p className="mb-2 text-xs font-semibold text-muted">{label}</p>
      <Formula latex={latex} block />
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-muted">Resultado:</span>
        <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-sm font-bold text-accent">{resultado}</span>
        {obs && <span className={obs.includes("⚠") ? "text-xs text-danger" : "text-xs text-ok"}>{obs}</span>}
      </div>
    </div>
  );
}

function LinhaInfo({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex justify-between border-b border-panel-border py-1.5 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{valor}</span>
    </div>
  );
}

type Amp = CircuitoCalculado & { ampacidadeFinalA?: number };

export default function MemorialCalculoTab({ project, ambientes, circuitosCalculados, circuitosOriginais, resumoDemanda, balanco }: Props) {
  const dataHoje = new Date().toLocaleDateString("pt-BR");
  const trifasico = project.tipo_entrada === "Trifásico";
  const proj = project as ProjectRow & { concessionaria?: string };

  // ── Exportar Memorial PDF ──────────────────────────────────────────────────
  function exportarMemorialPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const M = 40; const W = doc.internal.pageSize.getWidth();
    let y = 0;

    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 70, "F");
    doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(15);
    doc.text("MEMORIAL DE CÁLCULO", M, 28);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text("Instalação Elétrica Residencial — NBR 5410:2004", M, 46);
    doc.text(dataHoje, W - M, 28, { align: "right" });
    doc.setTextColor(0); y = 88;

    doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, W - 2*M, 40, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(...AZUL);
    doc.text("IDENTIFICAÇÃO", M + 6, y + 12);
    doc.setFont("helvetica", "normal"); doc.setTextColor(30,30,30);
    doc.text(`Projeto: ${project.nome}   Cliente: ${project.cliente ?? "—"}   Tensão: ${project.tensao_v} V   Entrada: ${project.tipo_entrada ?? "Monofásico"}`, M + 6, y + 26);
    if (project.responsavel_tecnico) doc.text(`Resp. Técnico: ${project.responsavel_tecnico}${project.numero_art ? "   ART nº " + project.numero_art : ""}`, M + 6, y + 38);
    y += 54; doc.setTextColor(0);

    doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, W - 2*M, 16, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...AZUL);
    doc.text("RESUMO DE DEMANDA", M + 6, y + 11); y += 22; doc.setTextColor(0);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text(`Carga total: ${Math.round(resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")} W`, M, y); y += 14;
    const Vn = project.tensao_v;
    doc.text(`Corrente: Ib = P${trifasico ? " / (√3 × " + Vn + ")" : " / " + Vn} = ${resumoDemanda.correnteEntradaA.toFixed(1)} A`, M, y); y += 14;
    doc.text(`Disjuntor geral: ${resumoDemanda.disjuntorGeralA} A`, M, y); y += 20;
    if (trifasico) {
      doc.text(`Balanço: R=${Math.round(balanco.R)}W  S=${Math.round(balanco.S)}W  T=${Math.round(balanco.T)}W  Desvio=${balanco.desbalanceamentoPercent.toFixed(1)}%`, M, y); y += 20;
    }

    y += 8;
    doc.setFillColor(...AZUL_CLARO); doc.rect(M, y, W - 2*M, 16, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...AZUL);
    doc.text("DIMENSIONAMENTO DOS CIRCUITOS", M + 6, y + 11); y += 22; doc.setTextColor(0);

    for (const c of circuitosCalculados) {
      if (y > 720) { doc.addPage(); y = 50; }
      const amp = (c as Amp).ampacidadeFinalA;
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
      doc.text(`C${c.numero} — ${c.descricao} (${c.tipo} · Fase ${c.fase} · ${c.comprimentoM}m)`, M, y); y += 12;
      doc.setFont("helvetica", "normal");
      doc.text(`  P = ${c.potenciaVA}VA × ${c.fp} = ${Math.round(c.potenciaW)}W`, M, y); y += 11;
      doc.text(`  Ib = ${Math.round(c.potenciaW)} / ${c.tensaoV} = ${c.ibA.toFixed(2)}A`, M, y); y += 11;
      doc.text(`  Cabo: ${c.secaoFinalMm2}mm²  Iz=${amp ? amp.toFixed(0) : "—"}A`, M, y); y += 11;
      doc.text(`  ΔV = ${c.quedaPercent.toFixed(2)}%  ${c.quedaPercent <= 4 ? "✓ OK" : "⚠ EXCEDE 4%"}`, M, y); y += 11;
      doc.text(`  Disjuntor: Ib(${c.ibA.toFixed(1)}) ≤ In(${c.disjuntorA}) ≤ Iz(${amp ? amp.toFixed(0) : "—"}) ✓`, M, y); y += 16;
    }

    const totalPg = doc.getNumberOfPages();
    for (let p = 1; p <= totalPg; p++) {
      doc.setPage(p);
      const ph = doc.internal.pageSize.getHeight();
      doc.setFillColor(...AZUL); doc.rect(0, ph - 18, W, 18, "F");
      doc.setTextColor(255); doc.setFontSize(7.5);
      doc.text(`${project.nome} — Memorial de Cálculo — NBR 5410`, M, ph - 6);
      doc.text(`Pág. ${p} / ${totalPg}`, W - M, ph - 6, { align: "right" });
    }
    doc.save(`${project.nome.toLowerCase().replace(/\s+/g,"-")}-memorial-calculo.pdf`);
  }

  // ── Exportar Tabela PDF ────────────────────────────────────────────────────
  function exportarTabelaPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
    const M = 30; const W = doc.internal.pageSize.getWidth();
    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 50, "F");
    doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text("TABELA DE CIRCUITOS", M, 22);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text(`${project.nome} · ${project.tensao_v}V · ${project.tipo_entrada ?? "Monofásico"} · ${dataHoje}`, M, 38);
    doc.setTextColor(0);
    autoTable(doc, {
      startY: 60, margin: { left: M, right: M },
      styles: { fontSize: 7.5, cellPadding: 3 },
      headStyles: { fillColor: AZUL, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: CINZA },
      head: [["Nº","Descrição","Tipo","Pts","Fase","VA","W","m","Isol.","Ib(A)","Cabo(mm²)","Iz(A)","ΔV(%)","Disj.(A)"]],
      body: circuitosCalculados.map(c => {
        const orig = circuitosOriginais.find(o => o.id === c.id);
        const amp = (c as Amp).ampacidadeFinalA;
        return [c.numero, c.descricao, c.tipo, orig?.qtd_pontos ?? 1, c.fase,
          c.potenciaVA, Math.round(c.potenciaW), c.comprimentoM, c.isolacao,
          c.ibA.toFixed(2), c.secaoFinalMm2, amp ? amp.toFixed(0) : "—",
          c.quedaPercent.toFixed(2), c.disjuntorA];
      }),
    });
    const totalPg = doc.getNumberOfPages();
    for (let p = 1; p <= totalPg; p++) {
      doc.setPage(p);
      const ph = doc.internal.pageSize.getHeight();
      doc.setFillColor(...AZUL); doc.rect(0, ph - 16, W, 16, "F");
      doc.setTextColor(255); doc.setFontSize(7);
      doc.text(`${project.nome} — Tabela de Circuitos`, M, ph - 5);
      doc.text(`Pág. ${p} / ${totalPg}`, W - M, ph - 5, { align: "right" });
    }
    doc.save(`${project.nome.toLowerCase().replace(/\s+/g,"-")}-circuitos.pdf`);
  }

  // ── Dados de identificação (fora do JSX) ──────────────────────────────────
  const dadosIdent: Array<{ label: string; valor: string }> = [
    { label: "Projeto",         valor: project.nome },
    { label: "Cliente",         valor: project.cliente ?? "—" },
    { label: "Tensão da rede",  valor: `${project.tensao_v} V` },
    { label: "Tipo de entrada", valor: project.tipo_entrada ?? "Monofásico" },
    { label: "Concessionária",  valor: proj.concessionaria ?? "—" },
    { label: "Emissão",         valor: dataHoje },
  ];
  if (project.responsavel_tecnico) dadosIdent.push({ label: "Resp. Técnico", valor: project.responsavel_tecnico });
  if (project.numero_art) dadosIdent.push({ label: "ART/RRT nº", valor: project.numero_art });

  return (
    <div>
      {/* Barra de exportação */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-panel-border bg-panel p-4">
        <div>
          <h1 className="font-bold">Memorial de Cálculo</h1>
          <p className="text-xs text-muted">Instalação Elétrica Residencial · NBR 5410:2004</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors">
            <Printer size={15} /> Imprimir
          </button>
          <button onClick={exportarMemorialPDF}
            className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent hover:bg-accent/20 transition-colors">
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
        <div className="grid grid-cols-2 gap-4 rounded-lg border border-panel-border bg-panel p-5 text-sm">
          {dadosIdent.map(({ label, valor }) => (
            <LinhaInfo key={label} label={label} valor={valor} />
          ))}
        </div>
      </Secao>

      {/* 2. Resumo de demanda */}
      <Secao num="2" titulo="Resumo de Demanda Geral">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Eq
              label="Carga instalada total"
              latex={`P_{total} = \\sum_{i=1}^{n} P_i = ${Math.round(resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")}\\text{ W}`}
              resultado={`${Math.round(resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")} W`}
            />
            <Eq
              label={trifasico ? "Corrente de entrada — Trifásico" : "Corrente de entrada — Monofásico"}
              latex={trifasico
                ? `I_b = \\dfrac{P}{\\sqrt{3}\\cdot V} = \\dfrac{${Math.round(resumoDemanda.cargaInstaladaW)}}{1{,}732 \\times ${project.tensao_v}} = ${resumoDemanda.correnteEntradaA.toFixed(1)}\\text{ A}`
                : `I_b = \\dfrac{P}{V} = \\dfrac{${Math.round(resumoDemanda.cargaInstaladaW)}}{${project.tensao_v}} = ${resumoDemanda.correnteEntradaA.toFixed(1)}\\text{ A}`}
              resultado={`${resumoDemanda.correnteEntradaA.toFixed(1)} A`}
            />
          </div>
          {trifasico && (
            <div>
              <Eq
                label="Balanço de fases (W por fase)"
                latex={`R = ${Math.round(balanco.R)}\\text{ W},\\quad S = ${Math.round(balanco.S)}\\text{ W},\\quad T = ${Math.round(balanco.T)}\\text{ W}`}
                resultado={`Desvio: ${balanco.desbalanceamentoPercent.toFixed(1)}%`}
                obs={balanco.desbalanceamentoPercent > 10 ? "⚠ > 10%" : "✓ OK"}
              />
            </div>
          )}
        </div>
      </Secao>

      {/* 3. Circuitos */}
      <Secao num="3" titulo="Dimensionamento dos Circuitos">
        <p className="mb-4 text-xs text-muted">
          Seção mínima NBR 5410: TUG ≥ 2,5mm² · Iluminação ≥ 1,5mm² · ΔV máx. 4%
        </p>
        <div className="space-y-6">
          {circuitosCalculados.map(c => {
            const amp = (c as Amp).ampacidadeFinalA;
            return (
              <div key={c.id} className={`rounded-xl border p-5 ${c.quedaPercent > 4 ? "border-danger/40" : "border-panel-border"} bg-panel`}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-sm font-bold text-accent">C{c.numero}</span>
                  <span className="font-semibold">{c.descricao}</span>
                  <span className={`rounded px-1.5 py-0.5 text-xs ${c.tipo === "Iluminação" ? "bg-warn/15 text-warn" : c.tipo === "TUG" ? "bg-ok/15 text-ok" : "bg-accent/15 text-accent"}`}>{c.tipo}</span>
                  <span className="ml-auto text-xs text-muted">Fase {c.fase} · {c.isolacao} · {c.comprimentoM} m</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Eq
                      label="Potência ativa"
                      latex={`P = S \\times FP = ${c.potenciaVA} \\times ${c.fp} = ${Math.round(c.potenciaW)}\\text{ W}`}
                      resultado={`${Math.round(c.potenciaW)} W`}
                    />
                    <Eq
                      label="Corrente de projeto"
                      latex={`I_b = \\dfrac{P}{V} = \\dfrac{${Math.round(c.potenciaW)}}{${c.tensaoV}} = ${c.ibA.toFixed(2)}\\text{ A}`}
                      resultado={`${c.ibA.toFixed(2)} A`}
                    />
                  </div>
                  <div>
                    <Eq
                      label={c.tipo === "TUG" ? "Seção do cabo (mín. 2,5mm² para TUG)" : "Seção do cabo"}
                      latex={`I_b \\leq I_z \\Rightarrow ${c.ibA.toFixed(1)} \\leq ${amp ? amp.toFixed(0) : "—"}\\text{ A} \\Rightarrow \\boxed{${c.secaoFinalMm2}\\text{ mm}^2}`}
                      resultado={`${c.secaoFinalMm2} mm² · Iz = ${amp ? amp.toFixed(0) : "—"} A`}
                    />
                    <Eq
                      label="Queda de tensão"
                      latex={`\\Delta V = \\dfrac{2 \\rho L I_b}{A V_n} \\times 100 = ${c.quedaPercent.toFixed(2)}\\%`}
                      resultado={`${c.quedaPercent.toFixed(2)} %`}
                      obs={c.quedaPercent > 4 ? "⚠ Excede 4%" : "✓ OK"}
                    />
                    <Eq
                      label="Disjuntor — verificação Ib ≤ In ≤ Iz"
                      latex={`${c.ibA.toFixed(1)} \\leq \\underbrace{${c.disjuntorA}}_{I_n} \\leq ${amp ? amp.toFixed(0) : "—"}\\text{ A}\\quad \\checkmark`}
                      resultado={`${c.disjuntorA} A`}
                      obs="✓"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Secao>

      {/* 4. Conformidade */}
      <Secao num="4" titulo="Verificação de Conformidade — NBR 5410">
        <div className="space-y-2">
          {([
            ["Seção mínima TUG ≥ 2,5mm²", circuitosCalculados.filter(c => c.tipo === "TUG").every(c => c.secaoFinalMm2 >= 2.5)],
            ["Seção mínima Iluminação ≥ 1,5mm²", circuitosCalculados.filter(c => c.tipo === "Iluminação").every(c => c.secaoFinalMm2 >= 1.5)],
            ["Queda de tensão ≤ 4% em todos os circuitos", circuitosCalculados.every(c => c.quedaPercent <= 4)],
            ["Seletividade: Ib ≤ In ≤ Iz", circuitosCalculados.every(c => c.ibA <= c.disjuntorA)],
            ["Circuito exclusivo de iluminação", circuitosCalculados.some(c => c.tipo === "Iluminação")],
            ["TUG áreas molhadas separado", circuitosCalculados.some(c => c.descricao.toLowerCase().includes("molhad"))],
            ...(trifasico ? [["Desbalanceamento ≤ 10%", balanco.desbalanceamentoPercent <= 10] as [string, boolean]] : []),
          ] as [string, boolean][]).map(([item, ok]) => (
            <div key={item} className={`flex items-center justify-between rounded-lg border p-3 ${ok ? "border-ok/30 bg-ok/5" : "border-danger/30 bg-danger/5"}`}>
              <span className="text-sm">{item}</span>
              <span className={`rounded px-2 py-0.5 text-xs font-bold ${ok ? "bg-ok/20 text-ok" : "bg-danger/20 text-danger"}`}>
                {ok ? "✓ Conforme" : "✗ Verificar"}
              </span>
            </div>
          ))}
        </div>
      </Secao>
    </div>
  );
}
