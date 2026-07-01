"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function TemaToggle() {
  const [claro, setClaro] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem("voltis-tema");
    const prefereClaro = salvo === "claro" || (!salvo && window.matchMedia("(prefers-color-scheme: light)").matches);
    setClaro(prefereClaro);
    document.documentElement.classList.toggle("light", prefereClaro);
    setMontado(true);
  }, []);

  function alternar() {
    const novoClaro = !claro;
    setClaro(novoClaro);
    document.documentElement.classList.toggle("light", novoClaro);
    localStorage.setItem("voltis-tema", novoClaro ? "claro" : "escuro");
  }

  if (!montado) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={alternar}
      title={claro ? "Mudar para tema escuro" : "Mudar para tema claro"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-panel-border bg-bg-elevated text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {claro ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
