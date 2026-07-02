"use client";

import { useEffect, useRef } from "react";

/**
 * Explosão animada — aparece sobre a alternativa eliminada.
 * Flash central + partículas voando + escurecimento com efeito queimado.
 */
export default function Explosao({ visivel }: { visivel: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !visivel) return;
    // reinicia a animação removendo e readicionando a classe
    ref.current.classList.remove("explosao-ativa");
    void ref.current.offsetWidth; // força reflow
    ref.current.classList.add("explosao-ativa");
  }, [visivel]);

  if (!visivel) return null;

  // 12 partículas em ângulos distribuídos
  const particulas = Array.from({ length: 12 }, (_, i) => {
    const angulo = (i / 12) * 360;
    const distancia = 28 + Math.random() * 22;
    const tamanho = 2 + Math.random() * 3;
    const delay = Math.random() * 60;
    const cor = i % 3 === 0
      ? "var(--phase-r)"
      : i % 3 === 1
      ? "var(--phase-s)"
      : "var(--warn)";
    const rad = (angulo * Math.PI) / 180;
    const tx = Math.cos(rad) * distancia;
    const ty = Math.sin(rad) * distancia;
    return { angulo, tx, ty, tamanho, delay, cor };
  });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      style={{ zIndex: 10 }}
    >
      {/* Escurecimento queimado */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: "radial-gradient(ellipse at 40% 50%, rgba(30,10,0,0.82) 0%, rgba(10,5,0,0.70) 60%, rgba(0,0,0,0.55) 100%)",
          animation: "exp-escurecer 0.3s 0.08s ease-out both",
        }}
      />

      {/* Borda chamuscada */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: "inset 0 0 12px 4px rgba(255,80,0,0.25), inset 0 0 3px 1px rgba(255,140,0,0.4)",
          animation: "exp-escurecer 0.3s 0.1s ease-out both",
        }}
      />

      {/* Flash central */}
      <div
        style={{
          position: "absolute",
          left: "38%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 40, height: 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,220,80,1) 0%, rgba(255,100,0,0.8) 40%, transparent 75%)",
          animation: "exp-flash 0.28s ease-out both",
        }}
      />

      {/* Onda de choque */}
      <div
        style={{
          position: "absolute",
          left: "38%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 8, height: 8,
          borderRadius: "50%",
          border: "2px solid rgba(255,180,50,0.8)",
          animation: "exp-onda 0.4s ease-out both",
        }}
      />

      {/* Partículas */}
      {particulas.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "38%", top: "50%",
            width: p.tamanho, height: p.tamanho,
            borderRadius: p.tamanho > 3.5 ? "2px" : "50%",
            background: p.cor,
            boxShadow: `0 0 ${p.tamanho}px ${p.cor}`,
            animation: `exp-particula 0.5s ${p.delay}ms cubic-bezier(0.22,0.61,0.36,1) both`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Fumaça residual */}
      <div
        style={{
          position: "absolute",
          left: "38%", top: "45%",
          width: 18, height: 18,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,40,0,0.5) 0%, transparent 70%)",
          animation: "exp-fumaca 0.8s 0.2s ease-out both",
        }}
      />

      <style>{`
        @keyframes exp-flash {
          0%   { transform: translate(-50%,-50%) scale(0.1); opacity: 1; }
          40%  { transform: translate(-50%,-50%) scale(1.4);  opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1.8);  opacity: 0; }
        }
        @keyframes exp-onda {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(8);   opacity: 0;   }
        }
        @keyframes exp-particula {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1);   opacity: 1; }
          100% { transform: translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes exp-escurecer {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes exp-fumaca {
          0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0.7; }
          100% { transform: translate(-50%,-80%) scale(3);   opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
