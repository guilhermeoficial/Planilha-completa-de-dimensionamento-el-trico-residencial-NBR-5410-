import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { buscarArea, type BlocoEdital } from "@/lib/cursos-data";

const ORDEM_BLOCOS: BlocoEdital[] = ["Conhecimentos Básicos", "Bloco I", "Bloco II", "Bloco III"];

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = buscarArea(areaSlug);
  if (!area) notFound();

  let contador = 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/dashboard/cursos" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> Cursos
      </Link>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Nível {area.nivel}</p>
      <h1 className="mt-1 font-display text-2xl font-bold">{area.nome}</h1>
      <p className="mt-1 text-sm text-muted">{area.descricao}</p>
      <p className="mt-3 inline-block rounded-md border border-dashed border-panel-border bg-bg-elevated/50 px-3 py-1.5 text-xs text-muted">
        Organizado conforme o edital verticalizado (Petrobras — Manutenção Elétrica)
      </p>

      {area.modulos.length === 0 && (
        <p className="mt-6 text-sm text-muted">Conteúdo dessa área em preparação — volte em breve.</p>
      )}

      {ORDEM_BLOCOS.map((blocoAtual) => {
        const modulosDoBloco = area.modulos.filter((m) => m.bloco === blocoAtual);
        if (modulosDoBloco.length === 0) return null;

        return (
          <div key={blocoAtual} className="mt-7">
            <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-muted">{blocoAtual}</h2>
            <div className="space-y-2">
              {modulosDoBloco.map((modulo) => {
                contador += 1;
                const temConteudo = modulo.paginas.length > 1 || (modulo.paginas[0]?.equacoes?.length ?? 0) > 0;
                return (
                  <Link
                    key={modulo.slug}
                    href={`/dashboard/cursos/${area.slug}/${modulo.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-panel-border bg-panel p-4 transition-colors hover:border-accent"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent">{contador}</span>
                    <div className="flex-1">
                      <p className="font-medium">{modulo.titulo}</p>
                      <p className="text-sm text-muted">{modulo.descricao}</p>
                    </div>
                    {!temConteudo && (
                      <span className="shrink-0 rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted">em produção</span>
                    )}
                    <Layers size={16} className="text-muted" />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
