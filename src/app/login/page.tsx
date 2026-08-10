"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Landmark, CheckCircle2, ShieldCheck } from "lucide-react";

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
    <main className="flex min-h-screen flex-1 blueprint-grid">
      {/* ── Painel institucional (some em telas pequenas) ── */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden border-r border-panel-border bg-bg-elevated px-10 py-12 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="selo h-8 w-8 shrink-0 text-accent">
            <Landmark size={15} />
          </span>
          <div className="leading-none">
            <div className="font-display text-lg font-semibold tracking-tight">Voltis</div>
            <div className="text-[10px] uppercase tracking-widest text-muted">Preparação para concursos</div>
          </div>
        </Link>

        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight mb-4">
            Sua aprovação começa com preparação séria.
          </h1>
          <p className="text-sm text-muted leading-relaxed mb-8 max-w-sm">
            Cursos completos, banco de questões fiel às bancas CESGRANRIO e CEBRASPE,
            e ferramentas de dimensionamento — tudo em uma única plataforma.
          </p>
          <ul className="space-y-3">
            {[
              "Mais de 250 questões comentadas",
              "Módulos completos de Eletrotécnica e Informática",
              "Ferramentas de dimensionamento conforme NBR 5410",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                <CheckCircle2 size={15} className="text-ok shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck size={14} className="text-accent" />
          Seus dados protegidos, acesso via login seguro
        </div>
      </div>

      {/* ── Formulário ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2 font-display text-base font-bold lg:hidden">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Voltis
          </Link>

          <h2 className="font-display text-xl font-semibold mb-1">
            {mode === "login" ? "Acesse sua conta" : mode === "signup" ? "Criar conta gratuita" : "Redefinir senha"}
          </h2>
          <p className="text-sm text-muted mb-6">
            {mode === "login"
              ? "Entre para continuar seus estudos."
              : mode === "signup"
              ? "Leva menos de um minuto."
              : "Você receberá um link por e-mail."}
          </p>

          {mode !== "esqueci" && (
            <div className="mb-6 flex rounded-md border border-panel-border p-1 text-sm">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-sm py-1.5 transition-colors ${mode === "login" ? "bg-accent text-accent-ink font-medium" : "text-muted"}`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-sm py-1.5 transition-colors ${mode === "signup" ? "bg-accent text-accent-ink font-medium" : "text-muted"}`}
              >
                Criar conta
              </button>
            </div>
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
              className="mt-2 w-full rounded-md bg-accent py-2.5 font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
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
