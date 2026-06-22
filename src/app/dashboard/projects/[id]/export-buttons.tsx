"use client";

import * as XLSX from "xlsx";
import { FileSpreadsheet, FileText } from "lucide-react";
import type { CircuitoCalculado, ResumoDemanda } from "@/lib/nbr5410";
import type { ItemOrcamento } from "@/lib/comercial";
import type { AmbienteRow, ProjectRow, CircuitoRow, MotorRow } from "@/lib/types";
import type { BalancoFases } from "@/lib/nbr5410";

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
    const janela = window.open("", "_blank");
    if (!janela) return;
    janela.document.write(montarHtmlRelatorio({ project, ambientes, circuitosCalculados, circuitosOriginais, orcamentoItens, orcamentoTotal, motores, balanco, resumoDemanda }));
    janela.document.close();
    janela.focus();
    setTimeout(() => janela.print(), 400);
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

function montarHtmlRelatorio(d: Props): string {
  const dataHoje = new Date().toLocaleDateString("pt-BR");
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Memorial Elétrico — ${d.project.nome}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #111; padding: 32px; font-size: 12px; }
  h1 { font-size: 20px; margin-bottom: 2px; }
  h2 { font-size: 14px; margin-top: 28px; margin-bottom: 8px; border-bottom: 2px solid #111; padding-bottom: 4px; }
  p.sub { color: #555; margin-top: 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  th, td { border: 1px solid #ccc; padding: 5px 7px; text-align: left; }
  th { background: #f0f0f0; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.03em; }
  td { font-size: 11px; }
  .num { text-align: right; font-family: "Courier New", monospace; }
  .total-row td { font-weight: bold; background: #f7f7f7; }
  .fase-R { color: #c0392b; } .fase-S { color: #b8860b; } .fase-T { color: #2462a8; }
  .footer { margin-top: 30px; font-size: 10px; color: #888; }
  @media print { body { padding: 12px; } }
</style>
</head>
<body>
  <h1>Memorial Descritivo — Instalação Elétrica Residencial</h1>
  <p class="sub">Projeto: <strong>${d.project.nome}</strong> ${d.project.cliente ? `· Cliente: ${d.project.cliente}` : ""} · Tensão: ${d.project.tensao_v}V · Entrada: ${d.project.tipo_entrada} · Emitido em ${dataHoje}</p>
  ${
    d.project.responsavel_tecnico || d.project.numero_art
      ? `<p class="sub">Responsável técnico: <strong>${d.project.responsavel_tecnico ?? "—"}</strong>${d.project.registro_profissional ? ` · ${d.project.registro_profissional}` : ""}${d.project.numero_art ? ` · ART/RRT nº ${d.project.numero_art}` : ""}</p>`
      : ""
  }

  <h2>0. Resumo de demanda geral</h2>
  <table>
    <thead><tr><th>Carga instalada total</th><th>Corrente de entrada estimada</th><th>Disjuntor geral recomendado</th></tr></thead>
    <tbody>
      <tr>
        <td class="num">${Math.round(d.resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")} W</td>
        <td class="num">${d.resumoDemanda.correnteEntradaA.toFixed(1)} A</td>
        <td class="num"><strong>${d.resumoDemanda.disjuntorGeralA} A</strong></td>
      </tr>
    </tbody>
  </table>
  <p class="footer" style="margin-top:0">Estimativa simplificada (carga ativa total + margem de 15%), sem fatores de demanda da NBR 14039 — confirme o padrão de entrada com a concessionária local.</p>

  <h2>1. Ambientes e previsão de carga</h2>
  <table>
    <thead><tr><th>Ambiente</th><th>Tipo</th><th>Área (m²)</th><th>Perímetro (m)</th></tr></thead>
    <tbody>
      ${d.ambientes.map((a) => `<tr><td>${a.nome}</td><td>${a.tipo}</td><td class="num">${Number(a.area_m2).toFixed(1)}</td><td class="num">${Number(a.perimetro_m).toFixed(1)}</td></tr>`).join("")}
    </tbody>
  </table>

  <h2>2. Memorial de circuitos</h2>
  <table>
    <thead>
      <tr><th>Nº</th><th>Descrição</th><th>Tipo</th><th>Qtd. pontos</th><th>Fase</th><th>VA</th><th>Comp. (m)</th><th>Isolação</th><th>Ib (A)</th><th>Cabo (mm²)</th><th>Queda (%)</th><th>Disjuntor (A)</th></tr>
    </thead>
    <tbody>
      ${d.circuitosCalculados
        .map((c) => {
          const original = d.circuitosOriginais.find((o) => o.id === c.id);
          return `<tr>
            <td>${c.numero}</td><td>${c.descricao}</td><td>${c.tipo}</td>
            <td class="num">${original?.qtd_pontos ?? 1}</td>
            <td class="fase-${c.fase}"><strong>${c.fase}</strong></td>
            <td class="num">${c.potenciaVA}</td><td class="num">${c.comprimentoM}</td><td>${c.isolacao}</td>
            <td class="num">${c.ibA.toFixed(2)}</td><td class="num">${c.secaoFinalMm2}</td>
            <td class="num">${c.quedaPercent.toFixed(2)}</td><td class="num">${c.disjuntorA}</td>
          </tr>`;
        })
        .join("")}
    </tbody>
  </table>

  <h2>3. Balanceamento de fases</h2>
  <table>
    <thead><tr><th>Fase</th><th>Potência total (W)</th></tr></thead>
    <tbody>
      <tr><td class="fase-R"><strong>R</strong></td><td class="num">${Math.round(d.balanco.R).toLocaleString("pt-BR")}</td></tr>
      <tr><td class="fase-S"><strong>S</strong></td><td class="num">${Math.round(d.balanco.S).toLocaleString("pt-BR")}</td></tr>
      <tr><td class="fase-T"><strong>T</strong></td><td class="num">${Math.round(d.balanco.T).toLocaleString("pt-BR")}</td></tr>
      <tr class="total-row"><td>Desbalanceamento</td><td class="num">${d.balanco.desbalanceamentoPercent.toFixed(1)}%</td></tr>
    </tbody>
  </table>

  <h2>4. Orçamento estimado de materiais</h2>
  <table>
    <thead><tr><th>Item</th><th>Qtd.</th><th>Unid.</th><th>R$ unit.</th><th>R$ total</th></tr></thead>
    <tbody>
      ${d.orcamentoItens.map((i) => `<tr><td>${i.descricao}</td><td class="num">${i.quantidade}</td><td>${i.unidade}</td><td class="num">${moeda(i.precoUnitario)}</td><td class="num">${moeda(i.precoTotal)}</td></tr>`).join("")}
      <tr class="total-row"><td colspan="4">Total estimado</td><td class="num">${moeda(d.orcamentoTotal)}</td></tr>
    </tbody>
  </table>

  ${
    d.motores.length > 0
      ? `<h2>5. Instalação industrial / extra — correção de fator de potência</h2>
  <table>
    <thead><tr><th>Motor</th><th>Tipo</th><th>Potência (CV)</th><th>Qtd.</th><th>FP atual</th><th>FP desejado</th></tr></thead>
    <tbody>
      ${d.motores.map((m) => `<tr><td>${m.nome}</td><td>${m.tipo}</td><td class="num">${Number(m.potencia_cv).toFixed(1)}</td><td class="num">${m.quantidade}</td><td class="num">${Number(m.fp_atual).toFixed(2)}</td><td class="num">${Number(m.fp_desejado).toFixed(2)}</td></tr>`).join("")}
    </tbody>
  </table>`
      : ""
  }

  <p class="footer">
    Memorial gerado automaticamente pelo sistema Voltis a partir do motor de cálculo NBR 5410.
    Os preços de materiais são estimativas de referência editáveis — confira valores atualizados
    com seu fornecedor antes de fechar o orçamento com o cliente. Este documento não substitui a
    responsabilidade técnica do profissional habilitado (ART/RRT).
  </p>
</body>
</html>`;
}
