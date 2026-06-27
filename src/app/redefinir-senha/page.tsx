"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const supabase = createClient();
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [sessaoValida, setSessaoValida] = useState<boolean | null>(null);

  useEffect(() => {
    async function processarLink() {
      // Fluxo PKCE (padrão do @supabase/ssr): o link de recuperação chega com
      // ?code=... na URL. Precisamos troca-lo manualmente por uma sessão.
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (data.session && !error) {
          setSessaoValida(true);
          window.history.replaceState({}, "", window.location.pathname);
          return;
        }
      }

      // Fallback: fluxo antigo com #access_token no hash, ou sessão já existente.
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSessaoValida(true);
        return;
      }

      setSessaoValida(false);
    }

    processarLink();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setSessaoValida(true);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    setCarregando(false);

    if (error) {
      setErro(error.message);
    } else {
      setAviso("Senha atualizada! Redirecionando...");
      setTimeout(() => router.push("/dashboard"), 1200);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center blueprint-grid px-6">
      <div className="w-full max-w-sm rounded-xl border border-panel-border bg-panel p-7 shadow-2xl shadow-black/40">
        <Link href="/" className="mb-6 flex items-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>

        <h1 className="mb-1 font-display text-lg font-bold">Criar nova senha</h1>

        {sessaoValida === false ? (
          <div className="text-sm text-muted">
            <p>Este link de redefinição é inválido ou expirou.</p>
            <Link href="/login" className="mt-3 inline-block text-accent hover:underline">
              Voltar para o login e solicitar um novo link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Nova senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="input"
                placeholder="••••••••"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted">Confirmar nova senha</span>
              <input
                type="password"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
                minLength={6}
                className="input"
                placeholder="••••••••"
              />
            </label>

            {erro && <p className="text-sm text-danger">{erro}</p>}
            {aviso && <p className="text-sm text-ok">{aviso}</p>}

            <button
              type="submit"
              disabled={carregando}
              className="mt-2 w-full rounded-md bg-accent py-2.5 font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {carregando ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--panel-border);
          border-radius: 0.375rem;
          padding: 0.55rem 0.7rem;
          font-size: 0.875rem;
          color: var(--text);
        }
        .input:focus {
          outline: none;
          border-color: var(--accent);
        }
      `}</style>
    </main>
  );
}
