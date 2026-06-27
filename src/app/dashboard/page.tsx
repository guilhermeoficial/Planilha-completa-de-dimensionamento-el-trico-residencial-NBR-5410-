"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, AmbienteRow, AmbienteTueRow, CircuitoRow, MotorRow } from "@/lib/types";
import { Plus, FolderOpen, Copy, Wrench, GraduationCap } from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [projetos, setProjetos] = useState<ProjectRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [duplicando, setDuplicando] = useState<string | null>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setCarregando(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjetos((data as ProjectRow[]) ?? []);
    setCarregando(false);
  }

  async function criarProjeto(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { error } = await supabase
      .from("projects")
      .insert({ nome, cliente, owner_id: userData.user.id });
    if (!error) {
      setNome("");
      setCliente("");
      setMostrarForm(false);
      carregar();
    }
    setSalvando(false);
  }

  /** Duplica um projeto inteiro: ambientes, TUEs vinculados, circuitos e motores */
  async function duplicarProjeto(p: ProjectRow, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDuplicando(p.id);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data: novoProjeto, error } = await supabase
      .from("projects")
      .insert({
        owner_id: userData.user.id,
        nome: `${p.nome} (cópia)`,
        cliente: p.cliente,
        endereco: p.endereco,
        tensao_v: p.tensao_v,
        tipo_entrada: p.tipo_entrada,
        dps_quantidade: p.dps_quantidade,
        precos_json: p.precos_json,
        responsavel_tecnico: p.responsavel_tecnico,
        registro_profissional: p.registro_profissional,
      })
      .select()
      .single();

    if (error || !novoProjeto) {
      setDuplicando(null);
      return;
    }

    const [{ data: ambientes }, { data: circuitos }, { data: motores }] = await Promise.all([
      supabase.from("ambientes").select("*").eq("project_id", p.id),
      supabase.from("circuitos").select("*").eq("project_id", p.id),
      supabase.from("motores").select("*").eq("project_id", p.id),
    ]);

    const mapaAmbientes = new Map<string, string>();
    for (const a of (ambientes as AmbienteRow[]) ?? []) {
      const { data: novoAmbiente } = await supabase
        .from("ambientes")
        .insert({
          project_id: novoProjeto.id,
          nome: a.nome,
          tipo: a.tipo,
          area_m2: a.area_m2,
          perimetro_m: a.perimetro_m,
          pontos_luz_manual: a.pontos_luz_manual,
          ordem: a.ordem,
        })
        .select()
        .single();
      if (novoAmbiente) mapaAmbientes.set(a.id, novoAmbiente.id);
    }

    if (mapaAmbientes.size > 0) {
      const { data: tues } = await supabase
        .from("ambiente_tues")
        .select("*")
        .in("ambiente_id", Array.from(mapaAmbientes.keys()));
      const novosTues = ((tues as AmbienteTueRow[]) ?? []).map((t) => ({
        ambiente_id: mapaAmbientes.get(t.ambiente_id),
        nome: t.nome,
        potencia_w: t.potencia_w,
        fp: t.fp,
        quantidade: t.quantidade,
      }));
      if (novosTues.length) await supabase.from("ambiente_tues").insert(novosTues);
    }

    const novosCircuitos = ((circuitos as CircuitoRow[]) ?? []).map((c) => ({
      project_id: novoProjeto.id,
      numero: c.numero,
      descricao: c.descricao,
      tipo: c.tipo,
      tensao_v: c.tensao_v,
      fp: c.fp,
      fase: c.fase,
      potencia_va: c.potencia_va,
      comprimento_m: c.comprimento_m,
      isolacao: c.isolacao,
      bloqueado: c.bloqueado,
      qtd_pontos: c.qtd_pontos,
    }));
    if (novosCircuitos.length) await supabase.from("circuitos").insert(novosCircuitos);

    const novosMotores = ((motores as MotorRow[]) ?? []).map((m) => ({
      project_id: novoProjeto.id,
      nome: m.nome,
      tipo: m.tipo,
      potencia_cv: m.potencia_cv,
      tensao_v: m.tensao_v,
      fp_atual: m.fp_atual,
      fp_desejado: m.fp_desejado,
      quantidade: m.quantidade,
    }));
    if (novosMotores.length) await supabase.from("motores").insert(novosMotores);

    setDuplicando(null);
    router.push(`/dashboard/projects/${novoProjeto.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Seus projetos</h1>
          <p className="mt-1 text-sm text-muted">Cada projeto reúne ambientes, equipamentos e o memorial de circuitos.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/cursos"
            className="flex items-center gap-1.5 rounded-md border border-panel-border px-4 py-2 text-sm transition-colors hover:border-accent"
          >
            <GraduationCap size={16} /> Cursos
          </Link>
          <Link
            href="/dashboard/ferramentas"
            className="flex items-center gap-1.5 rounded-md border border-panel-border px-4 py-2 text-sm transition-colors hover:border-accent"
          >
            <Wrench size={16} /> Calculadoras & Conversores
          </Link>
          <button
            onClick={() => setMostrarForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Novo projeto
          </button>
        </div>
      </div>

      {mostrarForm && (
        <form onSubmit={criarProjeto} className="mb-6 grid gap-3 rounded-lg border border-panel-border bg-panel p-5 sm:grid-cols-[1fr_1fr_auto]">
          <input
            required
            placeholder="Nome do projeto (ex: Residência Silva)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
          />
          <input
            placeholder="Cliente (opcional)"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="rounded-md border border-panel-border bg-bg px-3 py-2 text-sm"
          />
          <button
            disabled={salvando}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {salvando ? "Criando..." : "Criar"}
          </button>
        </form>
      )}

      {carregando ? (
        <p className="text-sm text-muted">Carregando...</p>
      ) : projetos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-panel-border p-10 text-center text-muted">
          <FolderOpen className="mx-auto mb-3 opacity-50" size={28} />
          <p className="text-sm">Nenhum projeto ainda. Clique em "Novo projeto" para começar o levantamento de carga.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projects/${p.id}`}
              className="group relative rounded-lg border border-panel-border bg-panel p-5 transition-colors hover:border-accent"
            >
              <button
                onClick={(e) => duplicarProjeto(p, e)}
                disabled={duplicando === p.id}
                title="Duplicar projeto"
                className="absolute right-3 top-3 rounded-md p-1.5 text-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100 disabled:opacity-50"
              >
                <Copy size={15} />
              </button>
              <h3 className="font-display font-semibold pr-6">{p.nome}</h3>
              <p className="mt-1 text-sm text-muted">{p.cliente || "Sem cliente vinculado"}</p>
              <p className="mt-3 font-mono text-xs text-muted">
                {duplicando === p.id ? "Duplicando..." : `${p.tensao_v}V · criado em ${new Date(p.created_at).toLocaleDateString("pt-BR")}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
