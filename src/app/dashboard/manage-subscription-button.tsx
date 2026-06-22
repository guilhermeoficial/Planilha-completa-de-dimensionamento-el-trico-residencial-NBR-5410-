"use client";

import { useState } from "react";

export default function ManageSubscriptionButton() {
  const [carregando, setCarregando] = useState(false);

  async function abrirPortal() {
    setCarregando(true);
    try {
      const resp = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await resp.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      onClick={abrirPortal}
      disabled={carregando}
      className="hidden rounded-md border border-panel-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-text disabled:opacity-50 sm:inline-block"
    >
      {carregando ? "Abrindo..." : "Gerenciar assinatura"}
    </button>
  );
}
