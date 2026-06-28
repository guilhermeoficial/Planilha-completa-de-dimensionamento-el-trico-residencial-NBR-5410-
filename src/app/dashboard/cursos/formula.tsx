"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  latex: string;
  block?: boolean;
}

/** Renderiza uma expressão LaTeX usando KaTeX. Use block=true para fórmulas em destaque, centralizadas. */
export default function Formula({ latex, block = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [latex, block]);

  return block ? (
    <div className="my-3 overflow-x-auto rounded-md border border-panel-border bg-bg-elevated px-4 py-3 text-center">
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} />
  );
}
