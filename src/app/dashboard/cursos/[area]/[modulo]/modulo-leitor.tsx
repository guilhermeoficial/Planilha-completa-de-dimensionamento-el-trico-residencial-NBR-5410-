"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, Video } from "lucide-react";
import type { Modulo } from "@/lib/cursos-data";

export default function ModuloLeitor({ areaSlug, areaNome, modulo }: { areaSlug: string; areaNome: string; modulo: Modulo }) {
  const [pagina, setPagina] = useState(0);
  const total = modulo.paginas.length;
  const atual = modulo.paginas[pagina];

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href={`/dashboard/cursos/${areaSlug}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
        <ArrowLeft size={15} /> {areaNome}
      </Link>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{modulo.titulo}</p>
      <div className="mt-4 rounded-lg border border-panel-border bg-panel p-6">
        <h1 className="font-display text-xl font-bold">{atual.titulo}</h1>

        {atual.videoUrl ? (
          <div className="mt-4 aspect-video overflow-hidden rounded-md border border-panel-border">
            <iframe src={atual.videoUrl} className="h-full w-full" allowFullScreen />
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 rounded-md border border-dashed border-panel-border bg-bg-elevated/50 px-3 py-2 text-xs text-muted">
            <Video size={14} /> Vídeo desta página ainda não disponível — conteúdo em texto abaixo.
          </div>
        )}

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-text">
          {atual.conteudo.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setPagina((p) => Math.max(0, p - 1))}
          disabled={pagina === 0}
          className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-30"
        >
          <ChevronLeft size={15} /> Anterior
        </button>
        <span className="font-mono text-xs text-muted">Página {pagina + 1} de {total}</span>
        <button
          onClick={() => setPagina((p) => Math.min(total - 1, p + 1))}
          disabled={pagina === total - 1}
          className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Próxima <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
