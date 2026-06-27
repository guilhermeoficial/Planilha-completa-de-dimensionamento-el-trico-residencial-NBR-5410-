import Link from "next/link";
import {
  Zap, GitMerge, Calculator, Ruler, Gauge, Palette, ArrowLeft, GraduationCap,
  Thermometer, Layers, Sparkles, AlertTriangle, Boxes, ListTree, Lightbulb, Sun, BatteryCharging,
  Activity, Cable, Shapes,
} from "lucide-react";

const CATEGORIAS = [
  {
    nome: "Dimensionamento & Proteção",
    itens: [
      { slug: "fatores-correcao", nome: "Fatores de Correção (FCT/FCA)", desc: "Corrige a corrente admissível por temperatura e agrupamento.", icon: Thermometer },
      { slug: "fator-demanda", nome: "Fator de Demanda", desc: "Estima a demanda real de iluminação e TUG por faixas de potência.", icon: Layers },
      { slug: "curto-circuito", nome: "Curto-Circuito Simplificado", desc: "Corrente de curto-circuito estimada num ponto da instalação.", icon: AlertTriangle },
      { slug: "eletroduto", nome: "Dimensionamento de Eletroduto", desc: "Escolhe o eletroduto pela taxa de ocupação de 40%.", icon: Boxes },
      { slug: "seletividade", nome: "Seletividade entre Disjuntores", desc: "Verificação rápida de coordenação entre disjuntores.", icon: ListTree },
    ],
  },
  {
    nome: "Perdas & Eficiência",
    itens: [
      { slug: "perda-joule", nome: "Perda por Efeito Joule", desc: "Potência dissipada em calor num trecho de cabo.", icon: Activity },
      { slug: "eficiencia-motor", nome: "Eficiência de Motor", desc: "Relação entre potência de entrada e saída de um motor.", icon: Gauge },
      { slug: "correcao-fp", nome: "Correção de Fator de Potência", desc: "Banco de capacitores avulso, sem precisar de projeto.", icon: Sparkles },
    ],
  },
  {
    nome: "Motores & Trifásico",
    itens: [
      { slug: "estrela-triangulo", nome: "Estrela-Triângulo", desc: "Tensão e corrente de fase/linha na partida de motores.", icon: GitMerge },
      { slug: "partida-motor", nome: "Corrente de Partida", desc: "Compare partida direta, estrela-triângulo, soft-starter e inversor.", icon: Zap },
      { slug: "cabo-disjuntor-motor", nome: "Cabo e Disjuntor para Motor", desc: "Dimensionamento simplificado considerando o regime de partida.", icon: Cable },
    ],
  },
  {
    nome: "Iluminação",
    itens: [
      { slug: "luminotecnica", nome: "Luminotécnica (Lúmens)", desc: "Quantas luminárias para atingir o lux desejado no ambiente.", icon: Lightbulb },
    ],
  },
  {
    nome: "Energia Solar & Backup",
    itens: [
      { slug: "fotovoltaico", nome: "Dimensionamento Fotovoltaico", desc: "Potência e número de painéis a partir do consumo mensal.", icon: Sun },
      { slug: "autonomia-bateria", nome: "Autonomia de Bateria/No-break", desc: "Por quanto tempo a bateria sustenta uma carga.", icon: BatteryCharging },
    ],
  },
  {
    nome: "Geral & Conversões",
    itens: [
      { slug: "lei-de-ohm", nome: "Lei de Ohm & Potência", desc: "Informe 2 grandezas e calcule as demais.", icon: Zap },
      { slug: "resistencia-equivalente", nome: "Resistência Equivalente", desc: "Associações em série e em paralelo.", icon: Calculator },
      { slug: "conversor-unidades", nome: "Conversor de Potência", desc: "CV, HP, W e kW.", icon: Ruler },
      { slug: "conversor-temperatura", nome: "Conversor de Temperatura", desc: "°C, °F e Kelvin.", icon: Thermometer },
      { slug: "queda-de-tensao", nome: "Queda de Tensão Simples", desc: "Sem precisar montar um projeto completo.", icon: Gauge },
      { slug: "codigo-de-cores", nome: "Código de Cores de Resistores", desc: "Monte as faixas e descubra o valor.", icon: Palette },
      { slug: "area-perimetro", nome: "Área e Perímetro", desc: "Formas comuns — retângulo, círculo, triângulo.", icon: Shapes },
    ],
  },
];

export default function FerramentasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Projetos
      </Link>

      <h1 className="font-display text-2xl font-bold">Calculadoras & Conversores</h1>
      <p className="mt-1 text-sm text-muted">Ferramentas avulsas de bancada — não precisam de um projeto aberto.</p>

      {CATEGORIAS.map((cat) => (
        <div key={cat.nome} className="mt-8">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted">{cat.nome}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cat.itens.map((f) => (
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
          </div>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted">Próximo módulo</h2>
        <Link
          href="/dashboard/cursos"
          className="block max-w-sm rounded-lg border border-panel-border bg-panel p-5 transition-colors hover:border-accent"
        >
          <GraduationCap size={20} className="text-accent" />
          <h3 className="mt-3 font-display font-semibold">Módulo de Cursos</h3>
          <p className="mt-1.5 text-sm text-muted">Treinamentos por área — Eletrotécnica, Eletrônica e mais. Já disponível!</p>
        </Link>
      </div>
    </div>
  );
}
