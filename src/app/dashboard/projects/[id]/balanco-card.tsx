"use client";

import { BarChart3 } from "lucide-react";
import type { BalancoFases } from "@/lib/nbr5410";

const PHASE_COLOR: Record<"R" | "S" | "T", string> = {
  R: "var(--phase-r)",
  S: "var(--phase-s)",
  T: "var(--phase-t)",
};

const STATUS_LABEL: Record<BalancoFases["status"], string> = {
  ok: "Balanceado",
  atencao: "Atenção",
  critico: "Reorganizar fases",
};

const STATUS_COLOR: Record<BalancoFases["status"], string> = {
  ok: "text-ok",
  atencao: "text-warn",
  critico: "text-danger",
};

export default function BalancoCard({ balanco }: { balanco: BalancoFases }) {
  const max = Math.max(balanco.R, balanco.S, balanco.T, 1);
  const bars: { fase: "R" | "S" | "T"; valor: number }[] = [
    { fase: "R", valor: balanco.R },
    { fase: "S", valor: balanco.S },
    { fase: "T", valor: balanco.T },
  ];

  return (
    <div className="rounded-lg border border-panel-border bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          <BarChart3 size={16} className="text-accent" /> Balanceamento de fases
        </div>
        <span className={`font-mono text-xs ${STATUS_COLOR[balanco.status]}`}>
          {STATUS_LABEL[balanco.status]} · {balanco.desbalanceamentoPercent.toFixed(1)}%
        </span>
      </div>
      <div className="space-y-2.5">
        {bars.map((b) => (
          <div key={b.fase} className="flex items-center gap-3">
            <span className="w-4 font-mono text-sm font-medium" style={{ color: PHASE_COLOR[b.fase] }}>
              {b.fase}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(b.valor / max) * 100}%`, background: PHASE_COLOR[b.fase] }}
              />
            </div>
            <span className="tabular w-20 text-right text-sm text-muted">{b.valor.toLocaleString("pt-BR")} W</span>
          </div>
        ))}
      </div>
    </div>
  );
}
