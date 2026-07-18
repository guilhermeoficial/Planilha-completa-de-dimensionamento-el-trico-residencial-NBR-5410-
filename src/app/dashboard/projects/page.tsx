"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Copy, Trash2, FolderOpen, Zap, Search, Clock, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow } from "@/lib/types";

export default function ProjetosPage() {
  const supabase = createClient();
  const router = useRouter();

  const [projetos, setProjetos] = useState<ProjectRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [duplicando, setDuplicando] = useState<string | null>(null);
  const [excluindo, setExcluindo] = useState<string | null>(null);

  // Formulário novo projeto
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [tensao, setTensao] = useState<110 | 127 | 220>(220);
  const [tipoEntrada, setTipoEntrada] = useState<"Monofásico" | "Bifásico" | "Trifásico">("Monofásico");
  const [concessionaria, setConcessionaria] = useState("COSERN");

  async function carregar() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", userData.user.id)
      .order("created_at", { ascending: false });
    setProjetos((data as ProjectRow[]) ?? []);
    setCarregando(false);
  }

  useEffect(() => { carregar(); }, []);

  async function criarProjeto(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: novo, error } = await supabase
      .from("projects")
      .insert({ nome, cliente, owner_id: userData.user.id, tensao_v: tensao, tipo_entrada: tipoEntrada, concessionaria })
      .select()
      .single();
    if (!error && novo) {
      router.push(`/dashboard/projects/${(novo as ProjectRow).id}`);
    }
    setSalvando(false);
  }

  async function duplicar(p: ProjectRow, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    setDuplicando(p.id);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: novo, error } = await supabase
      .from("projects")
      .insert({ nome: `${p.nome} (cópia)`, cliente: p.cliente, owner_id: userData.user.id, tensao_v: p.tensao_v, tipo_entrada: p.tipo_entrada })
      .select()
      .single();
    if (!error && novo) router.push(`/dashboard/projects/${(novo as ProjectRow).id}`);
    setDuplicando(null);
  }

  async function excluir(p: ProjectRow, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    if (!confirm(`Excluir "${p.nome}"? Esta ação não pode ser desfeita.`)) return;
    setExcluindo(p.id);
    await supabase.from("projects").delete().eq("id", p.id);
    await carregar();
    setExcluindo(null);
  }

  const filtrados = projetos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.cliente ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Cabeçalho */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Meus Projetos</h1>
          <p className="mt-1 text-sm text-muted">{projetos.length} projeto{projetos.length !== 1 ? "s" : ""} elétrico{projetos.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setMostrarForm(f => !f)}
          className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition-opacity"
        >
          <Plus size={15} /> Novo projeto
        </button>
      </div>

      {/* Formulário novo projeto */}
      {mostrarForm && (
        <div className="mb-6 rounded-2xl border border-accent/30 bg-panel p-6">
          <h2 className="mb-4 font-semibold">Novo projeto elétrico</h2>
          <form onSubmit={criarProjeto} className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-muted">Nome do projeto *</label>
              <input required value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Ex: Residência Silva — 220m²"
                className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Cliente</label>
              <input value={cliente} onChange={e => setCliente(e.target.value)}
                placeholder="Nome do cliente"
                className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Tensão</label>
              <select value={tensao} onChange={e => setTensao(Number(e.target.value) as 110|127|220)}
                className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-sm">
                <option value={110}>110 V</option>
                <option value={127}>127 V</option>
                <option value={220}>220 V</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Tipo de entrada</label>
              <select value={tipoEntrada} onChange={e => setTipoEntrada(e.target.value as "Monofásico"|"Bifásico"|"Trifásico")}
                className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-sm">
                <option value="Monofásico">Monofásico</option>
                <option value="Bifásico">Bifásico</option>
                <option value="Trifásico">Trifásico</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Concessionária</label>
              <select value={concessionaria} onChange={e => setConcessionaria(e.target.value)}
                className="w-full rounded-lg border border-panel-border bg-bg px-3 py-2 text-sm">
                <optgroup label="Nordeste">
                  <option value="COSERN">COSERN — Rio Grande do Norte</option>
                  <option value="CELPE">CELPE — Pernambuco</option>
                  <option value="COELBA">COELBA — Bahia</option>
                  <option value="COELCE">COELCE — Ceará</option>
                  <option value="CEAL">CEAL — Alagoas</option>
                  <option value="ENERGISA-PB">ENERGISA — Paraíba</option>
                  <option value="CEMAR">CEMAR — Maranhão</option>
                </optgroup>
                <optgroup label="Sudeste">
                  <option value="CEMIG">CEMIG — Minas Gerais</option>
                  <option value="LIGHT">LIGHT — Rio de Janeiro</option>
                  <option value="ENEL-SP">ENEL — São Paulo</option>
                  <option value="CPFL">CPFL — São Paulo (interior)</option>
                  <option value="ESCELSA">ESCELSA — Espírito Santo</option>
                </optgroup>
                <optgroup label="Sul">
                  <option value="COPEL">COPEL — Paraná</option>
                  <option value="CELESC">CELESC — Santa Catarina</option>
                  <option value="RGE">RGE — Rio Grande do Sul</option>
                </optgroup>
                <optgroup label="Centro-Oeste / Norte">
                  <option value="CEB">CEB — Distrito Federal</option>
                  <option value="CELG">CELG — Goiás</option>
                  <option value="CELPA">CELPA — Pará</option>
                  <option value="AMAZONAS-E">AMAZONAS ENERGIA</option>
                </optgroup>
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" disabled={salvando}
                className="flex-1 rounded-lg bg-accent py-2.5 text-sm font-semibold text-bg hover:opacity-90 disabled:opacity-50">
                {salvando ? "Criando..." : "Criar projeto"}
              </button>
              <button type="button" onClick={() => setMostrarForm(false)}
                className="rounded-lg border border-panel-border px-4 py-2.5 text-sm hover:border-accent transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Busca */}
      {projetos.length > 3 && (
        <div className="mb-4 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou cliente..."
            className="w-full rounded-xl border border-panel-border bg-panel pl-9 pr-4 py-2.5 text-sm"
          />
        </div>
      )}

      {/* Lista de projetos */}
      {carregando ? (
        <div className="py-16 text-center text-sm text-muted">Carregando projetos...</div>
      ) : filtrados.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <FolderOpen size={40} className="text-muted/40" />
          <div>
            <p className="font-semibold text-text">
              {busca ? `Nenhum projeto encontrado para "${busca}"` : "Nenhum projeto ainda"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {busca ? "Tente outro termo." : "Crie seu primeiro projeto elétrico clicando em \"Novo projeto\"."}
            </p>
          </div>
          {!busca && (
            <button onClick={() => setMostrarForm(true)}
              className="flex items-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90">
              <Plus size={15} /> Criar projeto
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtrados.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projects/${p.id}`}
              className="group flex items-center justify-between rounded-2xl border border-panel-border bg-panel px-5 py-4 transition-all hover:border-accent/50 hover:bg-accent/5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-text group-hover:text-accent transition-colors">
                    {p.nome}
                  </p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${p.tipo_entrada === "Trifásico" ? "bg-phase-t/15 text-phase-t" : p.tipo_entrada === "Bifásico" ? "bg-phase-s/15 text-phase-s" : "bg-phase-r/15 text-phase-r"}`}>
                    {p.tipo_entrada ?? "Monofásico"}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  {p.cliente && <span>{p.cliente}</span>}
                  {p.cliente && <span>·</span>}
                  <span className="flex items-center gap-1"><Zap size={11} /> {p.tensao_v} V</span>
                  {(p as {concessionaria?: string}).concessionaria && (
                    <><span>·</span><span>{(p as {concessionaria?: string}).concessionaria}</span></>
                  )}
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {new Date(p.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="ml-4 flex shrink-0 items-center gap-1" onClick={e => e.preventDefault()}>
                <button
                  onClick={e => duplicar(p, e)}
                  disabled={duplicando === p.id}
                  title="Duplicar projeto"
                  className="rounded-lg p-2 text-muted hover:bg-panel-border hover:text-text transition-colors disabled:opacity-40"
                >
                  {duplicando === p.id ? <span className="text-xs">...</span> : <Copy size={14} />}
                </button>
                <button
                  onClick={e => excluir(p, e)}
                  disabled={excluindo === p.id}
                  title="Excluir projeto"
                  className="rounded-lg p-2 text-muted hover:bg-danger/10 hover:text-danger transition-colors disabled:opacity-40"
                >
                  {excluindo === p.id ? <span className="text-xs">...</span> : <Trash2 size={14} />}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
