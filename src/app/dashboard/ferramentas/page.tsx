import Link from "next/link";
import { Zap, GitMerge, Calculator, Ruler, Gauge, Palette, ArrowLeft, GraduationCap, Lock } from "lucide-react";

const FERRAMENTAS = [
  {
    slug: "estrela-triangulo",
    nome: "Estrela-Triângulo",
    desc: "Tensão e corrente de fase/linha na partida de motores trifásicos.",
    icon: GitMerge,
  },
  {
    slug: "lei-de-ohm",
    nome: "Lei de Ohm & Potência",
    desc: "Informe 2 grandezas (V, I, R ou P) e calcule as demais.",
    icon: Zap,
  },
  {
    slug: "resistencia-equivalente",
    nome: "Resistência Equivalente",
    desc: "Associações em série e em paralelo, com qualquer número de resistores.",
    icon: Calculator,
  },
  {
    slug: "conversor-unidades",
    nome: "Conversor de Potência",
    desc: "CV, HP, W e kW — converta entre as unidades mais usadas em motores.",
    icon: Ruler,
  },
  {
    slug: "queda-de-tensao",
    nome: "Queda de Tensão Simples",
    desc: "Calcule a queda de tensão de um trecho sem montar um projeto completo.",
    icon: Gauge,
  },
  {
    slug: "codigo-de-cores",
    nome: "Código de Cores de Resistores",
    desc: "Monte as faixas de cor e descubra o valor do resistor (e o inverso).",
    icon: Palette,
  },
];

export default function FerramentasPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Projetos
      </Link>

      <h1 className="font-display text-2xl font-bold">Calculadoras & Conversores</h1>
      <p className="mt-1 text-sm text-muted">Ferramentas avulsas de bancada — não precisam de um projeto aberto.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FERRAMENTAS.map((f) => (
          <Link
            key={f.slug}
            href={`/dashboard/ferramentas/${f.slug}`}
            className="group rounded-lg border border-panel-border bg-panel p-5 transition-colors hover:border-accent"
          >
            <f.icon size={20} className="text-accent" />
            <h3 className="mt-3 font-display font-semibold">{f.nome}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
          </Link>
        ))}

        <div className="relative rounded-lg border border-dashed border-panel-border bg-bg-elevated/40 p-5 opacity-70">
          <Lock size={14} className="absolute right-4 top-4 text-muted" />
          <GraduationCap size={20} className="text-muted" />
          <h3 className="mt-3 font-display font-semibold text-muted">Módulo de Cursos</h3>
          <p className="mt-1.5 text-sm text-muted">Treinamentos e cursos técnicos em elétrica. Em breve.</p>
        </div>
      </div>
    </div>
  );
}
