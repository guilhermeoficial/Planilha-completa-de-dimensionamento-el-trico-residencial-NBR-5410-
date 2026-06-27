"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { areaExternaAproximadaCabo, escolherEletroduto } from "@/lib/calculadoras";
import { TABELA_CABOS } from "@/lib/nbr5410";

export default function EletrodutoPage() {
  const [condutores, setCondutores] = useState<number[]>([2.5, 2.5, 2.5]);

  const areaTotal = condutores.reduce((s, c) => s + areaExternaAproximadaCabo(c), 0);
  const resultado = escolherEletroduto(areaTotal);

  function atualizar(i: number, valor: number) {
    setCondutores((c) => c.map((v, idx) => (idx === i ? valor : v)));
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/dashboard/ferramentas" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Ferramentas
      </Link>
      <h1 className="font-display text-2xl font-bold">Dimensionamento de Eletroduto</h1>
      <p className="mt-1 text-sm text-muted">Escolhe o eletroduto pela taxa de ocupação máxima de 40% recomendada pela NBR 5410.</p>

      <div className="mt-6 space-y-2">
        {condutores.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-20 text-xs text-muted">Condutor {i + 1}</span>
            <select value={c} onChange={(e) => atualizar(i, Number(e.target.value))} className="flex-1 rounded-md border border-panel-border bg-panel px-3 py-2 text-sm text-text">
              {TABELA_CABOS.map((l) => <option key={l.bitola} value={l.bitola}>{l.bitola} mm²</option>)}
            </select>
            <button onClick={() => setCondutores((cs) => cs.filter((_, idx) => idx !== i))} disabled={condutores.length <= 1} className="text-muted hover:text-danger">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button onClick={() => setCondutores((c) => [...c, 2.5])} className="flex items-center gap-1.5 rounded-md border border-dashed border-panel-border px-3 py-2 text-sm text-muted hover:border-accent hover:text-text">
          <Plus size={15} /> Adicionar condutor
        </button>
      </div>

      <div className="mt-5 rounded-lg border border-accent/40 bg-accent/10 p-5 text-center">
        {resultado ? (
          <>
            <p className="text-xs text-muted">Eletroduto recomendado</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent">{resultado.dn}</p>
            <p className="mt-1 text-xs text-muted">Taxa de ocupação: {resultado.taxaOcupacao.toFixed(1)}%</p>
          </>
        ) : (
          <p className="text-sm text-danger">Quantidade de condutores excede os eletrodutos da tabela — divida em mais de um duto.</p>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">Área externa de cada condutor estimada por regra prática (~1,4× a seção nominal). Para precisão total, use a área externa real do fabricante do cabo.</p>
    </div>
  );
}
