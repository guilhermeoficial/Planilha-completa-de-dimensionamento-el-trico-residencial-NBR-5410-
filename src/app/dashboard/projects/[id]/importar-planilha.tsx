"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { TipoAmbiente } from "@/lib/nbr5410";

interface Props {
  projectId: string;
  ordemInicial: number;
  onImported: () => void;
}

const TIPOS_VALIDOS: TipoAmbiente[] = ["Social/Quarto", "Serviço/Cozinha", "Banheiro", "Varanda/Externo"];

function normalizar(s: string): string {
  return s
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function mapearTipo(valor: string | undefined): TipoAmbiente {
  const v = normalizar(valor ?? "");
  if (v.includes("banheiro") || v.includes("wc") || v.includes("lavabo")) return "Banheiro";
  if (v.includes("cozinha") || v.includes("servico") || v.includes("área de servico") || v.includes("lavanderia")) return "Serviço/Cozinha";
  if (v.includes("varanda") || v.includes("externo") || v.includes("garagem") || v.includes("terraco")) return "Varanda/Externo";
  return "Social/Quarto";
}

function encontrarColuna(linha: Record<string, unknown>, candidatos: string[]): string | undefined {
  const chaves = Object.keys(linha);
  for (const candidato of candidatos) {
    const achada = chaves.find((k) => normalizar(k) === normalizar(candidato));
    if (achada) return String(linha[achada] ?? "");
  }
  return undefined;
}

export default function ImportarPlanilha({ projectId, ordemInicial, onImported }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resumo, setResumo] = useState<string | null>(null);

  async function handleFile(file: File) {
    setCarregando(true);
    setErro(null);
    setResumo(null);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const linhas = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

      if (linhas.length === 0) {
        setErro("A planilha está vazia ou não foi possível ler a primeira aba.");
        setCarregando(false);
        return;
      }

      const novos = linhas
        .map((linha, i) => {
          const nome = encontrarColuna(linha, ["nome", "ambiente", "comodo", "cômodo", "nome do ambiente"]);
          const tipoBruto = encontrarColuna(linha, ["tipo", "tipo de ambiente", "categoria"]);
          const area = encontrarColuna(linha, ["area", "área", "area (m2)", "área (m²)", "area_m2"]);
          const perimetro = encontrarColuna(linha, ["perimetro", "perímetro", "perimetro (m)", "perímetro (m)", "perimetro_m"]);

          if (!nome) return null;
          return {
            project_id: projectId,
            nome: String(nome),
            tipo: mapearTipo(tipoBruto),
            area_m2: Number(String(area).replace(",", ".")) || 0,
            perimetro_m: Number(String(perimetro).replace(",", ".")) || 0,
            ordem: ordemInicial + i,
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      if (novos.length === 0) {
        setErro('Não encontrei uma coluna de nome do ambiente. Use colunas como "Nome", "Tipo", "Área" e "Perímetro".');
        setCarregando(false);
        return;
      }

      const { error } = await supabase.from("ambientes").insert(novos);
      if (error) {
        setErro(`Erro ao salvar: ${error.message}`);
      } else {
        setResumo(`${novos.length} ambiente(s) importado(s) com sucesso.`);
        onImported();
      }
    } catch {
      setErro("Não consegui ler esse arquivo. Verifique se é um .xlsx, .xls ou .csv válido.");
    }
    setCarregando(false);
  }

  return (
    <div className="rounded-lg border border-dashed border-panel-border bg-panel p-4">
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Importar ambientes de uma planilha</p>
          <p className="text-xs text-muted">
            Aceita .xlsx, .xls ou .csv com colunas como <span className="tabular">Nome</span>,{" "}
            <span className="tabular">Tipo</span>, <span className="tabular">Área</span> e{" "}
            <span className="tabular">Perímetro</span>.
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={carregando}
          className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-50"
        >
          <Upload size={15} /> {carregando ? "Importando..." : "Selecionar arquivo"}
        </button>
      </div>
      {erro && <p className="mt-2 text-xs text-danger">{erro}</p>}
      {resumo && <p className="mt-2 text-xs text-ok">{resumo}</p>}
    </div>
  );
}
