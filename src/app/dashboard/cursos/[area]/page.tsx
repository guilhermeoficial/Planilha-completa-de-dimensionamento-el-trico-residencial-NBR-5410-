import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { buscarArea } from "@/lib/cursos-data";

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = buscarArea(areaSlug);
  if (!area) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/dashboard/cursos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Cursos
      </Link>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Nível {area.nivel}</p>
      <h1 className="mt-1 font-display text-2xl font-bold">{area.nome}</h1>
      <p className="mt-1 text-sm text-muted">{area.descricao}</p>

      <div className="mt-6 space-y-2">
        {area.modulos.length === 0 && (
          <p className="text-sm text-muted">Conteúdo dessa área em preparação — volte em breve.</p>
        )}
        {area.modulos.map((modulo, i) => (
          <Link
            key={modulo.slug}
            href={`/dashboard/cursos/${area.slug}/${modulo.slug}`}
            className="flex items-center gap-3 rounded-lg border border-panel-border bg-panel p-4 transition-colors hover:border-accent"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent">{i + 1}</span>
            <div className="flex-1">
              <p className="font-medium">{modulo.titulo}</p>
              <p className="text-sm text-muted">{modulo.descricao}</p>
            </div>
            <Layers size={16} className="text-muted" />
          </Link>
        ))}
      </div>
    </div>
  );
}
