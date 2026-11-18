"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "projeto-docs";

interface Arquivo { name: string; size: number; updated: string }

function limparNome(n: string) {
  return n.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_");
}
function tamanho(b: number) {
  return b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;
}

export default function DocumentosTab({ projectId }: { projectId: string }) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const listar = useCallback(
    async (u: string) => {
      const { data, error } = await supabase.storage.from(BUCKET).list(`${u}/${projectId}`, { sortBy: { column: "name", order: "asc" } });
      if (error) {
        setErro(error.message.includes("not found") ? "Armazenamento ainda não configurado (rode a migração 008 no Supabase)." : error.message);
        return;
      }
      setArquivos(
        (data ?? [])
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({ name: f.name, size: Number(f.metadata?.size ?? 0), updated: f.updated_at ?? "" }))
      );
    },
    [supabase, projectId]
  );

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUid(data.user.id);
        listar(data.user.id);
      }
    })();
  }, [supabase, listar]);

  async function enviar(files: FileList | null) {
    if (!files || !uid) return;
    setOcupado(true);
    setErro(null);
    for (const f of Array.from(files)) {
      const { error } = await supabase.storage.from(BUCKET).upload(`${uid}/${projectId}/${limparNome(f.name)}`, f, { upsert: true });
      if (error) setErro(error.message);
    }
    await listar(uid);
    setOcupado(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function baixar(nome: string) {
    if (!uid) return;
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(`${uid}/${projectId}/${nome}`, 300);
    if (error || !data) setErro(error?.message ?? "Não foi possível gerar o link.");
    else window.open(data.signedUrl, "_blank", "noopener");
  }

  async function apagar(nome: string) {
    if (!uid || !confirm(`Apagar "${nome}"?`)) return;
    const { error } = await supabase.storage.from(BUCKET).remove([`${uid}/${projectId}/${nome}`]);
    if (error) setErro(error.message);
    else listar(uid);
  }

  return (
    <div className="rounded-lg border border-panel-border bg-panel p-5">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-sm font-semibold">Documentos do projeto</h3>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={ocupado || !uid}
          className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink hover:opacity-90 disabled:opacity-50"
        >
          <Upload size={13} /> {ocupado ? "Enviando..." : "Enviar arquivos"}
        </button>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => enviar(e.target.files)} />
      </div>
      <p className="mb-4 text-xs text-muted">
        Proposta, planilha, plantas e pranchas. Os arquivos ficam em armazenamento privado: só a sua conta consegue abrir.
      </p>

      {erro && <p className="mb-3 text-sm text-danger">{erro}</p>}

      {arquivos.length === 0 ? (
        <p className="rounded-md border border-dashed border-panel-border p-6 text-center text-sm text-muted">Nenhum documento enviado ainda.</p>
      ) : (
        <ul className="divide-y divide-panel-border">
          {arquivos.map((a) => (
            <li key={a.name} className="flex items-center gap-3 py-2.5 text-sm">
              <FileText size={16} className="shrink-0 text-accent" />
              <span className="min-w-0 flex-1 truncate">{a.name}</span>
              <span className="tabular shrink-0 text-xs text-muted">{tamanho(a.size)}</span>
              <button onClick={() => baixar(a.name)} className="text-muted hover:text-accent" title="Abrir / baixar"><Download size={15} /></button>
              <button onClick={() => apagar(a.name)} className="text-muted hover:text-danger" title="Apagar"><Trash2 size={15} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
