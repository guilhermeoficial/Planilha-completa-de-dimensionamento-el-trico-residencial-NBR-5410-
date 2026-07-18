"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText } from "lucide-react";
import type { CircuitoCalculado, ResumoDemanda } from "@/lib/nbr5410";
import type { ItemOrcamento } from "@/lib/comercial";
import type { AmbienteRow, ProjectRow, CircuitoRow, MotorRow } from "@/lib/types";
import type { BalancoFases } from "@/lib/nbr5410";

// Paleta profissional — azul institucional + cinzas
const AZUL      = [30, 64, 105]  as [number, number, number];
const AZUL_CLARO = [220, 230, 242] as [number, number, number];
const CINZA_LINHA = [245, 246, 248] as [number, number, number];
const CINZA_BORDA = [180, 185, 195] as [number, number, number];

const tableStyle = {
  styles: { fontSize: 8, cellPadding: 3.5, lineColor: CINZA_BORDA, lineWidth: 0.3 },
  headStyles: { fillColor: AZUL, textColor: 255, fontStyle: "bold" as const, fontSize: 8 },
  alternateRowStyles: { fillColor: CINZA_LINHA },
  columnStyles: {},
};

function secao(doc: jsPDF, titulo: string, y: number, margem: number): number {
  // Fundo azul claro para o título da seção
  doc.setFillColor(...AZUL_CLARO);
  doc.rect(margem, y - 10, 515, 16, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...AZUL);
  doc.text(titulo.toUpperCase(), margem + 6, y);
  doc.setTextColor(0);
  return y + 14;
}

function rodape(doc: jsPDF, paginaAtual: number, totalPaginas: number, projeto: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const y = doc.internal.pageSize.getHeight() - 20;
  doc.setFillColor(...AZUL);
  doc.rect(0, y - 4, pageWidth, 18, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(255);
  doc.text(`${projeto} — Memorial Elétrico Residencial — NBR 5410`, 40, y + 6);
  doc.text(`Página ${paginaAtual} de ${totalPaginas}`, pageWidth - 60, y + 6);
  doc.setTextColor(0);
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
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 0;
    const dataHoje = new Date().toLocaleDateString("pt-BR");

    // ── Cabeçalho da capa ──────────────────────────────────────────────────
    // Faixa azul superior
    doc.setFillColor(...AZUL);
    doc.rect(0, 0, pageWidth, 72, "F");

    // Título principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("MEMORIAL DESCRITIVO", margem, 30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Instalação Elétrica Residencial — NBR 5410", margem, 48);

    // Data no canto superior direito
    doc.setFontSize(8);
    doc.text(dataHoje, pageWidth - margem, 30, { align: "right" });
    doc.text("Voltis — Dimensionamento Elétrico", pageWidth - margem, 42, { align: "right" });

    y = 88;

    // ── Identificação do projeto ───────────────────────────────────────────
    doc.setFillColor(...AZUL_CLARO);
    doc.rect(margem, y, pageWidth - 2 * margem, project.responsavel_tecnico ? 42 : 28, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...AZUL);
    doc.text("IDENTIFICAÇÃO DO PROJETO", margem + 8, y + 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    doc.text(`Projeto: ${project.nome}`, margem + 8, y + 24);
    const col2 = margem + 200;
    if (project.cliente) doc.text(`Cliente: ${project.cliente}`, col2, y + 24);
    doc.text(`Tensão: ${project.tensao_v} V`, col2 + 130, y + 24);
    doc.text(`Entrada: ${project.tipo_entrada}`, col2 + 190, y + 24);
    if (project.responsavel_tecnico) {
      doc.text(
        `Resp. Técnico: ${project.responsavel_tecnico}${project.registro_profissional ? "  ·  " + project.registro_profissional : ""}${project.numero_art ? "  ·  ART/RRT nº " + project.numero_art : ""}`,
        margem + 8, y + 37
      );
    }
    y += (project.responsavel_tecnico ? 42 : 28) + 18;
    doc.setTextColor(0);

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
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 18;

    y = secao(doc, "1. Ambientes e previsão de carga", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Ambiente", "Tipo", "Área (m²)", "Perímetro (m)"]],
      body: ambientes.map((a) => [a.nome, a.tipo, Number(a.area_m2).toFixed(1), Number(a.perimetro_m).toFixed(1)]),
      ...tableStyle,
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 18;

    y = secao(doc, "2. Memorial de circuitos", y, margem);
    autoTable(doc, {
      startY: y,
      margin: { left: margem, right: margem },
      head: [["Nº", "Descrição", "Tipo", "Pts", "Fase", "VA", "m", "Isol.", "Ib(A)", "Cabo(mm²)", "Iz(A)", "ΔV(%)", "Disj.(A)"]],
      body: circuitosCalculados.map((c) => {
        const original = circuitosOriginais.find((o) => o.id === c.id);
        return [
          c.numero, c.descricao, c.tipo, original?.qtd_pontos ?? 1, c.fase, c.potenciaVA, c.comprimentoM, c.isolacao,
          c.ibA.toFixed(2), c.secaoFinalMm2, c.ampacidadeFinalA?.toFixed(0) ?? "—", c.quedaPercent.toFixed(2), c.disjuntorA,
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

    // Rodapé em todas as páginas
    const totalPaginas = doc.getNumberOfPages();
    for (let p = 1; p <= totalPaginas; p++) {
      doc.setPage(p);
      rodape(doc, p, totalPaginas, project.nome);
    }

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

