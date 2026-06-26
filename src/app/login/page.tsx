"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<"login" | "signup" | "esqueci">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setCarregando(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) setErro(traduzErro(error.message));
      else router.push("/dashboard");
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { data: { nome } },
      });
      if (error) setErro(traduzErro(error.message));
      else {
        setAviso("Conta criada! Verifique seu e-mail para confirmar o acesso, depois entre normalmente.");
        setMode("login");
      }
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });
      if (error) setErro(traduzErro(error.message));
      else setAviso("Enviamos um link para o seu e-mail. Clique nele para criar uma nova senha.");
    }
    setCarregando(false);
  }

  return (
    <main className="flex flex-1 items-center justify-center blueprint-grid px-6">
      <div className="w-full max-w-sm rounded-xl border border-panel-border bg-panel p-7 shadow-2xl shadow-black/40">
        <Link href="/" className="mb-6 flex items-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>

        {mode !== "esqueci" && (
          <div className="mb-6 flex rounded-md border border-panel-border p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-sm py-1.5 transition-colors ${mode === "login" ? "bg-accent text-bg font-medium" : "text-muted"}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-sm py-1.5 transition-colors ${mode === "signup" ? "bg-accent text-bg font-medium" : "text-muted"}`}
            >
              Criar conta
            </button>
          </div>
        )}

        {mode === "esqueci" && (
          <p className="mb-5 text-sm text-muted">
            Digite seu e-mail e enviaremos um link para você criar uma nova senha.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <Field label="Nome">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="input"
                placeholder="Seu nome"
              />
            </Field>
          )}
          <Field label="E-mail">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="voce@exemplo.com"
            />
          </Field>
          {mode !== "esqueci" && (
            <Field label="Senha">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="input"
                placeholder="••••••••"
              />
            </Field>
          )}

          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("esqueci");
                setErro(null);
                setAviso(null);
              }}
              className="text-xs text-muted hover:text-accent"
            >
              Esqueci minha senha
            </button>
          )}

          {erro && <p className="text-sm text-danger">{erro}</p>}
          {aviso && <p className="text-sm text-ok">{aviso}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 w-full rounded-md bg-accent py-2.5 font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {carregando
              ? "Aguarde..."
              : mode === "login"
              ? "Entrar"
              : mode === "signup"
              ? "Criar conta"
              : "Enviar link de redefinição"}
          </button>

          {mode === "esqueci" && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErro(null);
                setAviso(null);
              }}
              className="w-full text-center text-xs text-muted hover:text-text"
            >
              Voltar para o login
            </button>
          )}
        </form>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}

function traduzErro(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("User already registered")) return "Já existe uma conta com esse e-mail.";
  if (msg.includes("Password should be")) return "A senha deve ter pelo menos 6 caracteres.";
  return msg;
}
