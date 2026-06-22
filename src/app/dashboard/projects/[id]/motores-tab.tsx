"use client";

import { useState } from "react";
import { Plus, Trash2, Gauge } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { calcularCorrecaoFP, PRECOS_PADRAO, type EntradaMotor } from "@/lib/comercial";
import type { MotorRow } from "@/lib/types";

interface Props {
  projectId: string;
  motores: MotorRow[];
  capacitorPorKvar: number;
  onChange: () => void;
}

const TIPOS_MOTOR: EntradaMotor["tipo"][] = ["Monofásico", "Trifásico"];

export default function MotoresTab({ projectId, motores, capacitorPorKvar, onChange }: Props) {
  const supabase = createClient();
  const [novo, setNovo] = useState({
    nome: "",
    tipo: "Trifásico" as EntradaMotor["tipo"],
    potenciaCv: "",
    tensao: "380",
    fpAtual: "0.75",
    fpDesejado: "0.95",
    quantidade: "1",
  });

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    if (!novo.nome || !novo.potenciaCv) return;
    await supabase.from("motores").insert({
      project_id: projectId,
      nome: novo.nome,
      tipo: novo.tipo,
      potencia_cv: Number(novo.potenciaCv),
      tensao_v: Number(novo.tensao),
      fp_atual: Number(novo.fpAtual),
      fp_desejado: Number(novo.fpDesejado),
      quantidade: Number(novo.quantidade) || 1,
    });
    setNovo({ nome: "", tipo: "Trifásico", potenciaCv: "", tensao: "380", fpAtual: "0.75", fpDesejado: "0.95", quantidade: "1" });
    onChange();
  }

  async function remover(id: string) {
    await supabase.from("motores").delete().eq("id", id);
    onChange();
  }

  const resultados = motores.map((m) => ({
    motor: m,
    resultado: calcularCorrecaoFP(
      {
        tipo: m.tipo,
        potencia: Number(m.potencia_cv),
        unidadePotencia: "CV",
        fpAtual: Number(m.fp_atual),
        fpDesejado: Number(m.fp_desejado),
        quantidade: m.quantidade,
      },
      capacitorPorKvar
    ),
  }));

  const totalKvar = resultados.reduce((s, r) => s + r.resultado.bancoTotalKvar, 0);
  const totalPreco = resultados.reduce((s, r) => s + r.resultado.precoEstimado, 0);

  return (
    <div>
      <div className="mb-5 rounded-lg border border-panel-border bg-panel p-4">
        <p className="mb-3 flex items-center gap-2 font-display text-sm font-semibold">
          <Gauge size={16} className="text-accent" /> Correção de fator de potência — motores
        </p>
        <p className="mb-4 text-xs text-muted">
          Cadastre os motores monofásicos ou trifásicos da instalação (industrial/extra) e o sistema calcula
          a potência reativa necessária (kVAr) e sugere um banco de capacitores padrão de mercado para elevar
          o fator de potência ao valor desejado.
        </p>
        <form onSubmit={criar} className="grid gap-2 sm:grid-cols-7">
          <input
            placeholder="Nome / identificação"
            value={novo.nome}
            onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm sm:col-span-2"
          />
          <select
            value={novo.tipo}
            onChange={(e) => setNovo({ ...novo, tipo: e.target.value as EntradaMotor["tipo"] })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          >
            {TIPOS_MOTOR.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input
            placeholder="Potência (CV)"
            type="number"
            step="0.1"
            value={novo.potenciaCv}
            onChange={(e) => setNovo({ ...novo, potenciaCv: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          />
          <input
            placeholder="Tensão (V)"
            type="number"
            value={novo.tensao}
            onChange={(e) => setNovo({ ...novo, tensao: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          />
          <input
            placeholder="FP atual"
            type="number"
            step="0.01"
            max={1}
            value={novo.fpAtual}
            onChange={(e) => setNovo({ ...novo, fpAtual: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          />
          <input
            placeholder="FP desejado"
            type="number"
            step="0.01"
            max={1}
            value={novo.fpDesejado}
            onChange={(e) => setNovo({ ...novo, fpDesejado: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          />
          <input
            placeholder="Qtd."
            type="number"
            min={1}
            value={novo.quantidade}
            onChange={(e) => setNovo({ ...novo, quantidade: e.target.value })}
            className="rounded-md border border-panel-border bg-bg px-2.5 py-2 text-sm"
          />
          <button className="flex items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity sm:col-span-7">
            <Plus size={15} /> Adicionar motor
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border border-panel-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5">Motor</th>
              <th className="px-3 py-2.5">Tipo</th>
              <th className="px-3 py-2.5">Potência</th>
              <th className="px-3 py-2.5">Qtd.</th>
              <th className="px-3 py-2.5">FP atual → desejado</th>
              <th className="px-3 py-2.5">Qc necessário</th>
              <th className="px-3 py-2.5">Banco sugerido</th>
              <th className="px-3 py-2.5">Preço estimado</th>
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {resultados.map(({ motor: m, resultado: r }) => (
              <tr key={m.id} className="border-t border-panel-border">
                <td className="px-3 py-2 font-medium">{m.nome}</td>
                <td className="px-3 py-2 text-muted">{m.tipo}</td>
                <td className="tabular px-3 py-2">{Number(m.potencia_cv).toFixed(1)} CV</td>
                <td className="tabular px-3 py-2">{m.quantidade}</td>
                <td className="tabular px-3 py-2 text-muted">{Number(m.fp_atual).toFixed(2)} → {Number(m.fp_desejado).toFixed(2)}</td>
                <td className="tabular px-3 py-2">{r.qcNecessarioKvar.toFixed(2)} kVAr</td>
                <td className="tabular px-3 py-2">{r.bancoSugeridoKvar.join(" + ") || "—"} kVAr</td>
                <td className="tabular px-3 py-2 font-medium text-accent">
                  {r.precoEstimado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="px-3 py-2 text-right">
                  <button onClick={() => remover(m.id)} className="text-muted hover:text-danger">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {motores.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-muted">
                  Nenhum motor cadastrado. Use esta aba para instalações industriais ou cargas extras
                  (bombas, compressores, motores trifásicos) que precisem de correção de fator de potência.
                </td>
              </tr>
            )}
          </tbody>
          {motores.length > 0 && (
            <tfoot>
              <tr className="border-t border-panel-border font-medium">
                <td className="px-3 py-2.5" colSpan={6}>Total do banco de capacitores</td>
                <td className="tabular px-3 py-2.5">{totalKvar.toFixed(2)} kVAr</td>
                <td className="tabular px-3 py-2.5 text-accent">
                  {totalPreco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        Preço de referência: {capacitorPorKvar.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}/kVAr
        (ajuste na aba Orçamento). Cálculo: Qc = P × (tan(arccos(FP atual)) − tan(arccos(FP desejado))).
      </p>
    </div>
  );
}
