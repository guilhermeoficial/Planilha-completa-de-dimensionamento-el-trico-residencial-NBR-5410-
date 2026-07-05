"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Target, TrendingUp, BarChart3, Brain, Calendar,
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line,
} from "recharts";
import { createClient } from "@/lib/supabase/client";
import { QUESTOES } from "@/lib/questoes-data";

// ── Tipos ──────────────────────────────────────────────────────
type Confianca = "alta" | "media" | "baixa" | "chute";

interface Resposta {
  questao_id: string;
  correta: boolean;
  confianca: Confianca;
  created_at: string;
}

interface EstatConfianca {
  label: string;
  valor: Confianca;
  total: number;
  acertos: number;
  erros: number;
  cor: string;
  pct: number;
}

interface EstatAssunto {
  assunto: string;
  total: number;
  acertos: number;
  pct: number;
}

interface EstatDia {
  dia: string;
  acertos: number;
  erros: number;
}

// ── Configuração de confiança ──────────────────────────────────
const CONFIG_CONFIANCA: Record<Confianca, { label: string; cor: string; descricao: string }> = {
  alta:  { label: "100% — Certeza",  cor: "var(--ok)",       descricao: "Marcadas com certeza total" },
  media: { label: "50% — Dúvida",    cor: "var(--phase-s)",  descricao: "Marcadas com ~50% de certeza" },
  baixa: { label: "25% — Incerto",   cor: "var(--phase-t)",  descricao: "Marcadas com ~25% de certeza" },
  chute: { label: "Chute",           cor: "var(--danger)",   descricao: "Marcadas no chute" },
};

// ── Helpers ────────────────────────────────────────────────────
function pctStr(v: number, total: number) {
  if (total === 0) return "0%";
  return `${((v / total) * 100).toFixed(1)}%`;
}

function formatarDia(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ── Tooltip customizado ────────────────────────────────────────
function TooltipCustom({ active, payload, label }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-panel-border bg-panel px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 font-semibold text-text">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────
export default function EstatisticasPage() {
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("respostas_questoes")
        .select("questao_id, correta, confianca, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      setRespostas((data ?? []) as Resposta[]);
      setCarregando(false);
    }
    carregar();
  }, []);

  // ── Cálculos ──────────────────────────────────────────────────
  const total = respostas.length;
  const acertosTotal = respostas.filter((r) => r.correta).length;
  const errosTotal = total - acertosTotal;
  const pctAcerto = total > 0 ? (acertosTotal / total) * 100 : 0;

  // Sequência atual de acertos
  const sequencia = (() => {
    let seq = 0;
    for (let i = respostas.length - 1; i >= 0; i--) {
      if (respostas[i].correta) seq++;
      else break;
    }
    return seq;
  })();

  // Por confiança
  const porConfianca: EstatConfianca[] = (["alta", "media", "baixa", "chute"] as Confianca[]).map((v) => {
    const grupo = respostas.filter((r) => r.confianca === v);
    const acertos = grupo.filter((r) => r.correta).length;
    return {
      label: CONFIG_CONFIANCA[v].label,
      valor: v,
      total: grupo.length,
      acertos,
      erros: grupo.length - acertos,
      cor: CONFIG_CONFIANCA[v].cor,
      pct: total > 0 ? (grupo.length / total) * 100 : 0,
    };
  }).filter((e) => e.total > 0);

  // Dados para rosca de distribuição de confiança
  const dadosRosca = porConfianca.map((e) => ({
    name: CONFIG_CONFIANCA[e.valor].label.split("—")[0].trim(),
    value: e.total,
    cor: e.cor,
  }));

  // Por assunto (top 8)
  const mapaAssuntos: Record<string, { total: number; acertos: number }> = {};
  respostas.forEach((r) => {
    const q = QUESTOES.find((q) => q.id === r.questao_id);
    if (!q) return;
    if (!mapaAssuntos[q.assunto]) mapaAssuntos[q.assunto] = { total: 0, acertos: 0 };
    mapaAssuntos[q.assunto].total++;
    if (r.correta) mapaAssuntos[q.assunto].acertos++;
  });
  const porAssunto: EstatAssunto[] = Object.entries(mapaAssuntos)
    .map(([assunto, { total, acertos }]) => ({
      assunto: assunto.length > 28 ? assunto.slice(0, 26) + "…" : assunto,
      total,
      acertos,
      pct: total > 0 ? (acertos / total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);

  // Evolução diária — últimos 14 dias
  const hoje = new Date();
  const dias14: EstatDia[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(d.getDate() - (13 - i));
    const diaStr = d.toISOString().slice(0, 10);
    const doDia = respostas.filter((r) => r.created_at.slice(0, 10) === diaStr);
    return {
      dia: formatarDia(diaStr),
      acertos: doDia.filter((r) => r.correta).length,
      erros: doDia.filter((r) => !r.correta).length,
    };
  });

  // ── Render ─────────────────────────────────────────────────────
  if (carregando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Carregando estatísticas…</p>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <BarChart3 size={40} className="mx-auto mb-4 text-muted" />
        <h2 className="font-display text-xl font-bold">Nenhuma resposta ainda</h2>
        <p className="mt-2 text-muted">Responda algumas questões para ver suas estatísticas aqui.</p>
        <Link href="/dashboard/cursos/questoes" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-bg hover:opacity-90">
          Ir para as questões
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      {/* Cabeçalho */}
      <div className="mb-8 flex items-center gap-3">
        <Link href="/dashboard/cursos/questoes" className="flex items-center gap-1.5 text-sm text-muted hover:text-text">
          <ArrowLeft size={15} /> Questões
        </Link>
        <span className="text-panel-border">/</span>
        <h1 className="font-display text-xl font-bold">Estatísticas</h1>
      </div>

      {/* ── Bloco 1 — Visão geral ── */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Target,    label: "Total respondidas", valor: total,                       cor: "text-text" },
          { icon: TrendingUp,label: "% de acerto",       valor: `${pctAcerto.toFixed(1)}%`,  cor: pctAcerto >= 70 ? "text-ok" : pctAcerto >= 50 ? "text-warn" : "text-danger" },
          { icon: BarChart3, label: "Acertos",           valor: acertosTotal,                cor: "text-ok" },
          { icon: Brain,     label: "Sequência atual",   valor: `${sequencia} ✓`,            cor: sequencia >= 5 ? "text-ok" : "text-muted" },
        ].map(({ icon: Icon, label, valor, cor }) => (
          <div key={label} className="rounded-xl border border-panel-border bg-panel p-5">
            <div className="mb-2 flex items-center gap-2 text-muted">
              <Icon size={14} /><span className="text-xs">{label}</span>
            </div>
            <p className={`font-display text-2xl font-bold ${cor}`}>{valor}</p>
          </div>
        ))}
      </div>

      {/* ── Bloco 2 — Distribuição de confiança (rosca + detalhes) ── */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">

        {/* Rosca */}
        <div className="rounded-xl border border-panel-border bg-panel p-6">
          <h2 className="mb-1 font-display text-sm font-semibold">Distribuição de confiança</h2>
          <p className="mb-4 text-xs text-muted">Como você marcou suas respostas</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dadosRosca}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {dadosRosca.map((entry, i) => (
                  <Cell key={i} fill={entry.cor} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v} questões`, ""]}
                contentStyle={{ background: "var(--panel)", border: "1px solid var(--panel-border)", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Legenda */}
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {porConfianca.map((e) => (
              <div key={e.valor} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: e.cor }} />
                <span className="text-muted">{CONFIG_CONFIANCA[e.valor].label.split("—")[0].trim()}</span>
                <span className="ml-auto font-semibold text-text">{e.pct.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confiança × Resultado */}
        <div className="rounded-xl border border-panel-border bg-panel p-6">
          <h2 className="mb-1 font-display text-sm font-semibold">Confiança × Resultado</h2>
          <p className="mb-4 text-xs text-muted">Acertos e erros por nível de confiança</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={porConfianca} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                tickFormatter={(v) => v.split("—")[0].trim()}
                axisLine={false} tickLine={false}
              />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipCustom />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted)" }} />
              <Bar dataKey="acertos" name="Acertos" fill="var(--ok)"     radius={[4, 4, 0, 0]} />
              <Bar dataKey="erros"   name="Erros"   fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bloco 3 — Tabela confiança detalhada ── */}
      <div className="mb-6 rounded-xl border border-panel-border bg-panel p-6">
        <h2 className="mb-1 font-display text-sm font-semibold">Detalhamento por confiança</h2>
        <p className="mb-4 text-xs text-muted">Quantidade e percentual de acerto em cada nível</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-panel-border text-xs text-muted">
                <th className="pb-2 text-left">Nível de confiança</th>
                <th className="pb-2 text-right">Total</th>
                <th className="pb-2 text-right">% do total</th>
                <th className="pb-2 text-right">Acertos</th>
                <th className="pb-2 text-right">Erros</th>
                <th className="pb-2 text-right">% acerto</th>
              </tr>
            </thead>
            <tbody>
              {porConfianca.map((e) => (
                <tr key={e.valor} className="border-b border-panel-border/50">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: e.cor }} />
                      <span>{CONFIG_CONFIANCA[e.valor].label}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-semibold">{e.total}</td>
                  <td className="py-3 text-right text-muted">{e.pct.toFixed(1)}%</td>
                  <td className="py-3 text-right text-ok">{e.acertos}</td>
                  <td className="py-3 text-right text-danger">{e.erros}</td>
                  <td className="py-3 text-right">
                    <span className={`font-semibold ${
                      (e.acertos / e.total) >= 0.7 ? "text-ok"
                      : (e.acertos / e.total) >= 0.5 ? "text-warn"
                      : "text-danger"
                    }`}>
                      {pctStr(e.acertos, e.total)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bloco 4 — Por assunto ── */}
      {porAssunto.length > 0 && (
        <div className="mb-6 rounded-xl border border-panel-border bg-panel p-6">
          <h2 className="mb-1 font-display text-sm font-semibold">Desempenho por assunto</h2>
          <p className="mb-4 text-xs text-muted">Top {porAssunto.length} assuntos mais respondidos</p>
          <div className="space-y-3">
            {porAssunto.map((e) => (
              <div key={e.assunto}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-text">{e.assunto}</span>
                  <span className="text-muted">{e.acertos}/{e.total} — <span className={e.pct >= 70 ? "text-ok font-semibold" : e.pct >= 50 ? "text-warn" : "text-danger"}>{e.pct.toFixed(0)}%</span></span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${e.pct}%`,
                      background: e.pct >= 70 ? "var(--ok)" : e.pct >= 50 ? "var(--warn)" : "var(--danger)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Bloco 5 — Evolução diária ── */}
      <div className="rounded-xl border border-panel-border bg-panel p-6">
        <div className="mb-1 flex items-center gap-2">
          <Calendar size={15} className="text-muted" />
          <h2 className="font-display text-sm font-semibold">Evolução nos últimos 14 dias</h2>
        </div>
        <p className="mb-4 text-xs text-muted">Acertos e erros por dia</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={dias14}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
            <XAxis dataKey="dia" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<TooltipCustom />} />
            <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted)" }} />
            <Line
              type="monotone" dataKey="acertos" name="Acertos"
              stroke="var(--ok)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--ok)" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone" dataKey="erros" name="Erros"
              stroke="var(--danger)" strokeWidth={2} dot={{ r: 3, fill: "var(--danger)" }}
              strokeDasharray="4 2" activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
