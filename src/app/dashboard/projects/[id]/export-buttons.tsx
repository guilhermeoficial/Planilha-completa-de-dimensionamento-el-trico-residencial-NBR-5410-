"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText } from "lucide-react";
import type { CircuitoCalculado, ResumoDemanda } from "@/lib/nbr5410";
import type { ItemOrcamento } from "@/lib/comercial";
import type { AmbienteRow, ProjectRow, CircuitoRow, MotorRow } from "@/lib/types";
import type { BalancoFases } from "@/lib/nbr5410";

const tableStyle = {
  styles: { fontSize: 8, cellPadding: 4 },
  headStyles: { fillColor: [242, 163, 61] as [number, number, number], textColor: 20, fontStyle: "bold" as const },
  alternateRowStyles: { fillColor: [247, 247, 247] as [number, number, number] },
};

function secao(doc: jsPDF, titulo: string, y: number, margem: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(titulo, margem, y);
  doc.setDrawColor(20);
  doc.line(margem, y + 4, 555, y + 4);
  return y + 18;
}

interface Props {
  project: ProjectRow;
  ambientes: AmbienteRow[];
  circuitosCalculados: CircuitoCalculado[];
  circuitosOriginais: CircuitoRow[];
  orcamentoItens: ItemOrcamento[];
  orcamentoTotal: number;
  motores: MotorRow[];
  balanco: BalancoFases;
  resumoDemanda: ResumoDemanda;
}

export default function ExportButtons({
  project,
  ambientes,
  circuitosCalculados,
  circuitosOriginais,
  orcamentoItens,
  orcamentoTotal,
  motores,
  balanco,
  resumoDemanda,
}: Props) {
  function exportarExcel() {
    const wb = XLSX.utils.book_new();

    const abaAmbientes = ambientes.map((a) => ({
      Ambiente: a.nome,
      Tipo: a.tipo,
      "Área (m²)": Number(a.area_m2),
      "Perímetro (m)": Number(a.perimetro_m),
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(abaAmbientes), "Ambientes");

    const abaCircuitos = circuitosCalculados.map((c) => {
      const original = circuitosOriginais.find((o) => o.id === c.id);
      return {
        "Nº": c.numero,
        Descrição: c.descricao,
        Tipo: c.tipo,
        "Qtd. pontos (tomadas/luz)": original?.qtd_pontos ?? 1,
        Fase: c.fase,
        "Potência (VA)": c.potenciaVA,
        "Potência (W)": Math.round(c.potenciaW),
        "Comprimento (m)": c.comprimentoM,
        Isolação: c.isolacao,
        "Ib (A)": Number(c.ibA.toFixed(2)),
        "Cabo (mm²)": c.secaoFinalMm2,
        "Queda (%)": Number(c.quedaPercent.toFixed(2)),
        "Disjuntor (A)": c.disjuntorA,
      };
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(abaCircuitos), "Circuitos");

    const abaBalanco = [
      { Fase: "R", "Potência (W)": Math.round(balanco.R) },
      { Fase: "S", "Potência (W)": Math.round(balanco.S) },
      { Fase: "T", "Potência (W)": Math.round(balanco.T) },
      { Fase: "Desbalanceamento (%)", "Potência (W)": Number(balanco.desbalanceamentoPercent.toFixed(1)) },
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(abaBalanco), "Balanço de Fases");

    const abaOrcamento = orcamentoItens.map((i) => ({
      Item: i.descricao,
      Quantidade: i.quantidade,
      Unidade: i.unidade,
      "R$ unitário": i.precoUnitario,
      "R$ total": i.precoTotal,
    }));
    abaOrcamento.push({ Item: "TOTAL ESTIMADO", Quantidade: 0, Unidade: "", "R$ unitário": 0, "R$ total": orcamentoTotal });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(abaOrcamento), "Orçamento");

    if (motores.length > 0) {
      const abaMotores = motores.map((m) => ({
        Motor: m.nome,
        Tipo: m.tipo,
        "Potência (CV)": Number(m.potencia_cv),
        "Tensão (V)": m.tensao_v,
        "FP atual": Number(m.fp_atual),
        "FP desejado": Number(m.fp_desejado),
        Quantidade: m.quantidade,
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(abaMotores), "Motores - FP");
    }

    XLSX.writeFile(wb, `${slug(project.nome)}-memorial-eletrico.xlsx`);
  }

  function exportarPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margem = 40;
    let y = 50;
    const dataHoje = new Date().toLocaleDateString("pt-BR");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Memorial Descritivo — Instalação Elétrica Residencial", margem, y);
    y += 22;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90);
    doc.text(
      `Projeto: ${project.nome}${project.cliente ? `  ·  Cliente: ${project.cliente}` : ""}  ·  Tensão: ${project.tensao_v}V  ·  Entrada: ${project.tipo_entrada}  ·  Emitido em ${dataHoje}`,
      margem,
      y
    );
    y += 14;
    if (project.responsavel_tecnico || project.numero_art) {
      doc.text(
        `Responsável técnico: ${project.responsavel_tecnico ?? "—"}${project.registro_profissional ? `  ·  ${project.registro_profissional}` : ""}${project.numero_art ? `  ·  ART/RRT nº ${project.numero_art}` : ""}`,
        margem,
        y
      );
      y += 14;
    }
    doc.setTextColor(0);
    y += 6;

    y = secao(doc, "0. Resumo de demanda geral", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Carga instalada total", "Corrente de entrada estimada", "Disjuntor geral recomendado"]],
      body: [[
        `${Math.round(resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")} W`,
        `${resumoDemanda.correnteEntradaA.toFixed(1)} A`,
        `${resumoDemanda.disjuntorGeralA} A`,
      ]],
      ...tableStyle,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;

    y = secao(doc, "1. Ambientes e previsão de carga", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Ambiente", "Tipo", "Área (m²)", "Perímetro (m)"]],
      body: ambientes.map((a) => [a.nome, a.tipo, Number(a.area_m2).toFixed(1), Number(a.perimetro_m).toFixed(1)]),
      ...tableStyle,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;

    y = secao(doc, "2. Memorial de circuitos", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Nº", "Descrição", "Tipo", "Pontos", "Fase", "VA", "Comp.(m)", "Isol.", "Ib(A)", "Cabo(mm²)", "Queda(%)", "Disj.(A)"]],
      body: circuitosCalculados.map((c) => {
        const original = circuitosOriginais.find((o) => o.id === c.id);
        return [
          c.numero, c.descricao, c.tipo, original?.qtd_pontos ?? 1, c.fase, c.potenciaVA, c.comprimentoM, c.isolacao,
          c.ibA.toFixed(2), c.secaoFinalMm2, c.quedaPercent.toFixed(2), c.disjuntorA,
        ];
      }),
      styles: { ...tableStyle.styles, fontSize: 7.5 },
      headStyles: tableStyle.headStyles,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;

    if (y > 680) { doc.addPage(); y = 50; }
    y = secao(doc, "3. Balanceamento de fases", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Fase", "Potência total (W)"]],
      body: [
        ["R", Math.round(balanco.R).toLocaleString("pt-BR")],
        ["S", Math.round(balanco.S).toLocaleString("pt-BR")],
        ["T", Math.round(balanco.T).toLocaleString("pt-BR")],
        ["Desbalanceamento", `${balanco.desbalanceamentoPercent.toFixed(1)}%`],
      ],
      ...tableStyle,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;

    if (y > 650) { doc.addPage(); y = 50; }
    y = secao(doc, "4. Orçamento estimado de materiais", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Item", "Qtd.", "Unid.", "R$ unit.", "R$ total"]],
      body: [
        ...orcamentoItens.map((i) => [i.descricao, i.quantidade, i.unidade, moeda(i.precoUnitario), moeda(i.precoTotal)]),
        ["TOTAL ESTIMADO", "", "", "", moeda(orcamentoTotal)],
      ],
      ...tableStyle,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;

    if (motores.length > 0) {
      if (y > 650) { doc.addPage(); y = 50; }
      y = secao(doc, "5. Instalação industrial / extra — correção de fator de potência", y, margem);
      autoTable(doc, {
        startY: y,
        margin: { left: margem, right: margem },
        head: [["Motor", "Tipo", "Potência (CV)", "Qtd.", "FP atual", "FP desejado"]],
        body: motores.map((m) => [
          m.nome, m.tipo, Number(m.potencia_cv).toFixed(1), m.quantidade, Number(m.fp_atual).toFixed(2), Number(m.fp_desejado).toFixed(2),
        ]),
        ...tableStyle,
      });
      y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 16;
    }

    doc.setFontSize(7.5);
    doc.setTextColor(140);
    doc.text(
      "Memorial gerado automaticamente pelo sistema Voltis a partir do motor de cálculo NBR 5410. Os preços de\n" +
        "materiais são estimativas de referência editáveis — confira valores atualizados com seu fornecedor antes\n" +
        "de fechar o orçamento com o cliente. Este documento não substitui a responsabilidade técnica do\n" +
        "profissional habilitado (ART/RRT).",
      margem,
      Math.min(y + 10, 800)
    );

    doc.save(`${slug(project.nome)}-memorial-eletrico.pdf`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportarExcel}
        className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent"
      >
        <FileSpreadsheet size={15} /> Exportar Excel
      </button>
      <button
        onClick={exportarPDF}
        className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent"
      >
        <FileText size={15} /> Exportar PDF
      </button>
    </div>
  );
}

function slug(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function moeda(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

