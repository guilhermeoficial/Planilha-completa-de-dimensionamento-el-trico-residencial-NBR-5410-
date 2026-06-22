"use client";

import { useState } from "react";
import { Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { calcularOrcamento, type PrecosReferencia } from "@/lib/comercial";
import type { CircuitoCalculado } from "@/lib/nbr5410";

interface Props {
  circuitos: CircuitoCalculado[];
  dpsQuantidade: number;
  onDpsChange: (qtd: number) => void;
  precos: PrecosReferencia;
  onPrecosChange: (precos: PrecosReferencia) => void;
}

export default function OrcamentoCard({ circuitos, dpsQuantidade, onDpsChange, precos, onPrecosChange }: Props) {
  const [editandoPrecos, setEditandoPrecos] = useState(false);

  const orcamento = calcularOrcamento(circuitos, precos, dpsQuantidade);

  function atualizarPrecoCabo(bitola: number, valor: number) {
    onPrecosChange({ ...precos, caboPorMm2PorMetro: { ...precos.caboPorMm2PorMetro, [bitola]: valor } });
  }

  return (
    <div className="rounded-lg border border-panel-border bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          <Calculator size={16} className="text-accent" /> Orçamento estimado de materiais
        </div>
        <button
          onClick={() => setEditandoPrecos((v) => !v)}
          className="flex items-center gap-1 text-xs text-muted hover:text-text"
        >
          Ajustar preços de referência {editandoPrecos ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      <p className="mb-3 text-xs text-muted">
        Valores de referência aproximados — ajuste para os preços atuais da sua região (ex: Leroy Merlin,
        Ferreira Costa) antes de fechar o orçamento com o cliente.
      </p>

      {editandoPrecos && (
        <div className="mb-4 grid gap-2 rounded-md border border-panel-border bg-bg p-3 sm:grid-cols-3">
          {Object.entries(precos.caboPorMm2PorMetro).map(([bitola, preco]) => (
            <label key={bitola} className="text-xs text-muted">
              Cabo {bitola}mm² (R$/m)
              <input
                type="number"
                step="0.01"
                defaultValue={preco}
                onBlur={(e) => atualizarPrecoCabo(Number(bitola), Number(e.target.value))}
                className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
              />
            </label>
          ))}
          <label className="text-xs text-muted">
            Disjuntor (R$/un)
            <input
              type="number" step="0.01" defaultValue={precos.disjuntorUnitario}
              onBlur={(e) => onPrecosChange({ ...precos, disjuntorUnitario: Number(e.target.value) })}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
          <label className="text-xs text-muted">
            DPS Classe II (R$/un)
            <input
              type="number" step="0.01" defaultValue={precos.dpsUnitario}
              onBlur={(e) => onPrecosChange({ ...precos, dpsUnitario: Number(e.target.value) })}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Eletroduto+conectores (R$/circuito)
            <input
              type="number" step="0.01" defaultValue={precos.conduiteEConectorPorCircuito}
              onBlur={(e) => onPrecosChange({ ...precos, conduiteEConectorPorCircuito: Number(e.target.value) })}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Quadro de distribuição (R$)
            <input
              type="number" step="0.01" defaultValue={precos.quadroDistribuicaoBase}
              onBlur={(e) => onPrecosChange({ ...precos, quadroDistribuicaoBase: Number(e.target.value) })}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Quantidade de DPS no projeto
            <input
              type="number" min={0} defaultValue={dpsQuantidade}
              onBlur={(e) => onDpsChange(Number(e.target.value))}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
          <label className="text-xs text-muted">
            Banco de capacitores (R$/kVAr)
            <input
              type="number" step="0.01" defaultValue={precos.capacitorPorKvar}
              onBlur={(e) => onPrecosChange({ ...precos, capacitorPorKvar: Number(e.target.value) })}
              className="tabular mt-0.5 w-full rounded border border-panel-border bg-panel px-2 py-1 text-text"
            />
          </label>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-1.5">Item</th>
              <th className="py-1.5">Qtd.</th>
              <th className="py-1.5">Unid.</th>
              <th className="py-1.5">R$ unit.</th>
              <th className="py-1.5 text-right">R$ total</th>
            </tr>
          </thead>
          <tbody>
            {orcamento.itens.map((i) => (
              <tr key={i.descricao} className="border-t border-panel-border">
                <td className="py-1.5">{i.descricao}</td>
                <td className="tabular py-1.5">{i.quantidade}</td>
                <td className="py-1.5 text-muted">{i.unidade}</td>
                <td className="tabular py-1.5 text-muted">{i.precoUnitario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td className="tabular py-1.5 text-right">{i.precoTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-panel-border font-medium">
              <td className="py-2" colSpan={4}>Total estimado de materiais</td>
              <td className="tabular py-2 text-right text-accent">
                {orcamento.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
