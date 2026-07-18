"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, Wand2, Lock, Unlock, Zap, Combine, Copy, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  calcularMemorial,
  calcularBalanco,
  balancearFases,
  calcularPrevisaoCarga,
  type Circuito,
  type TipoCircuito,
  type Fase,
  type Isolacao,
  type Ambiente,
} from "@/lib/nbr5410";
import type { AmbienteRow, AmbienteTueRow, CircuitoRow } from "@/lib/types";
import BalancoCard from "./balanco-card";

interface Props {
  projectId: string;
  tensaoV: number;
  circuitos: CircuitoRow[];
  ambientes: AmbienteRow[];
  tuesPorAmbiente: Record<string, AmbienteTueRow[]>;
  onChange: () => void;
}

const TIPOS: TipoCircuito[] = ["Iluminação", "TUG", "TUE"];
const FASES: Fase[] = ["R", "S", "T"];

export default function CircuitosTab({ projectId, tensaoV, circuitos, ambientes, tuesPorAmbiente, onChange }: Props) {
  const supabase = createClient();
  const [gerando, setGerando] = useState(false);
  const [balanceando, setBalanceando] = useState(false);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const POR_PAGINA = 10;

  function alternarSelecao(id: string) {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  /** Junta os circuitos selecionados em um único circuito (soma a potência, mantém o maior comprimento) */
  async function agruparSelecionados() {
    const itens = circuitos.filter((c) => selecionados.has(c.id));
    if (itens.length < 2) return;
    const principal = itens[0];
    const restantes = itens.slice(1);
    const potenciaTotal = itens.reduce((s, c) => s + Number(c.potencia_va), 0);
    const maiorComprimento = Math.max(...itens.map((c) => Number(c.comprimento_m)));
    const descricaoUnida = itens.map((c) => c.descricao).join(" + ");

    await supabase.from("circuitos").update({
      descricao: descricaoUnida,
      potencia_va: potenciaTotal,
      comprimento_m: maiorComprimento,
    }).eq("id", principal.id);

    await supabase.from("circuitos").delete().in("id", restantes.map((c) => c.id));
    setSelecionados(new Set());
    onChange();
  }

  /** Duplica um circuito (útil para dividir uma carga em dois disjuntores) */
  async function duplicarCircuito(c: CircuitoRow) {
    const proximoNumero = circuitos.length ? Math.max(...circuitos.map((x) => x.numero)) + 1 : 1;
    await supabase.from("circuitos").insert({
      project_id: projectId,
      numero: proximoNumero,
      descricao: `${c.descricao} (cópia)`,
      tipo: c.tipo,
      tensao_v: c.tensao_v,
      fp: c.fp,
      fase: c.fase,
      potencia_va: c.potencia_va,
      comprimento_m: c.comprimento_m,
      isolacao: c.isolacao,
      bloqueado: c.bloqueado,
      qtd_pontos: c.qtd_pontos,
    });
    onChange();
  }

  const calculados = useMemo(() => {
    const entrada: Circuito[] = circuitos.map((c) => ({
      id: c.id,
      numero: c.numero,
      descricao: c.descricao,
      tipo: c.tipo,
      tensaoV: c.tensao_v,
      fp: Number(c.fp),
      fase: c.fase,
      potenciaVA: Number(c.potencia_va),
      comprimentoM: Number(c.comprimento_m),
      isolacao: c.isolacao,
    }));
    return calcularMemorial(entrada);
  }, [circuitos]);

  const balanco = useMemo(
    () => calcularBalanco(calculados.map((c) => ({ fase: c.fase, potenciaW: c.potenciaW }))),
    [calculados]
  );

  const filtrados = useMemo(() => {
    if (!busca.trim()) return calculados;
    const termo = busca.trim().toLowerCase();
    return calculados.filter(
      (c) =>
        c.descricao.toLowerCase().includes(termo) ||
        c.tipo.toLowerCase().includes(termo) ||
        c.fase.toLowerCase() === termo ||
        String(c.numero).includes(termo)
    );
  }, [calculados, busca]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const circuitosPagina = filtrados.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

  async function atualizar(id: string, patch: Partial<CircuitoRow>) {
    await supabase.from("circuitos").update(patch).eq("id", id);
    onChange();
  }

  async function remover(id: string) {
    await supabase.from("circuitos").delete().eq("id", id);
    onChange();
  }

  async function adicionarCircuito(template?: "iluminacao" | "tug-seco" | "tug-molhado" | "tue") {
    const proximoNumero = circuitos.length ? Math.max(...circuitos.map((c) => c.numero)) + 1 : 1;
    const fasesCiclo: Fase[] = ["R", "S", "T"];
    const fase = fasesCiclo[circuitos.length % 3];

    const templates: Record<string, Partial<Omit<CircuitoRow, "id">>> = {
      "iluminacao":    { descricao: "Iluminação",        tipo: "Iluminação", fp: 0.92, potencia_va: 600,  qtd_pontos: 4,  comprimento_m: 20 },
      "tug-seco":     { descricao: "TUG — Áreas Secas", tipo: "TUG",        fp: 0.92, potencia_va: 1800, qtd_pontos: 6,  comprimento_m: 20 },
      "tug-molhado":  { descricao: "TUG — Áreas Molhadas", tipo: "TUG",     fp: 0.92, potencia_va: 2000, qtd_pontos: 5,  comprimento_m: 20 },
      "tue":          { descricao: "Equipamento específico", tipo: "TUE",    fp: 0.95, potencia_va: 2000, qtd_pontos: 1,  comprimento_m: 15 },
    };

    const base = template ? templates[template] : {};

    await supabase.from("circuitos").insert({
      project_id: projectId,
      numero: proximoNumero,
      descricao: "Novo circuito",
      tipo: "TUG",
      tensao_v: tensaoV,
      fp: 0.92,
      fase,
      potencia_va: 1000,
      comprimento_m: 15,
      isolacao: "PVC",
      qtd_pontos: 1,
      bloqueado: false,
      ...base,
    });
    onChange();
  }

  /** Gera os circuitos automaticamente a partir da previsão de carga dos ambientes cadastrados */
  async function gerarCircuitosDosAmbientes() {
    // Verificar se já há circuitos — pedir confirmação para não duplicar
    if (circuitos.length > 0) {
      const confirmar = window.confirm(
        `Já existem ${circuitos.length} circuito(s) neste projeto.\n\nDeseja SUBSTITUIR todos os circuitos não-bloqueados pelos gerados automaticamente?\n\nCircuitos bloqueados serão mantidos.`
      );
      if (!confirmar) return;
      const naoBloquedados = circuitos.filter((c) => !c.bloqueado).map((c) => c.id);
      if (naoBloquedados.length > 0) {
        await supabase.from("circuitos").delete().in("id", naoBloquedados);
      }
    }

    setGerando(true);
    const fasesCiclo: Fase[] = ["R", "S", "T"];
    let faseIdx = 0;
    const novos: Omit<CircuitoRow, "id">[] = [];
    const bloqueados = circuitos.filter((c) => c.bloqueado);
    let numero = bloqueados.length ? Math.max(...bloqueados.map((c) => c.numero)) + 1 : 1;

    // Tipos de ambiente molhado (NBR 5410) — varanda/externo também exige proteção extra
    const tiposMolhados = ["Banheiro", "Serviço/Cozinha", "Varanda/Externo"];

    // Equipamentos que realmente exigem circuito TUE exclusivo (fixos, alta potência)
    function ehTUEverdadeiro(nome: string, potenciaW: number): boolean {
      const n = nome.toLowerCase();
      return (
        n.includes("ar condicionado") || n.includes("split") || n.includes(" ac ") ||
        n.includes("chuveiro") || n.includes("aquecedor") || n.includes("ducha") ||
        n.includes("cooktop") || n.includes("indução") || n.includes("cook") ||
        n.includes("forno embutir") || n.includes("forno elétrico embutir") ||
        n.includes("sauna") || n.includes("jacuzzi") || n.includes("hidro") ||
        n.includes("bomba") || n.includes("piscina") || n.includes("elevador") ||
        potenciaW >= 4000  // equipamentos acima de 4kW sempre TUE
      );
    }

    // Acumular potências por categoria
    let potIlumTotal = 0;
    let pontosIlumTotal = 0;
    let potTugMolhadoTotal = 0;
    let pontossTugMolhado = 0;
    let potTugSecoTotal = 0;
    let pontosTugSeco = 0;
    const tuesIndividuais: Array<{ nome: string; potenciaVA: number; fp: number; qtd: number }> = [];

    for (const a of ambientes) {
      const tues = tuesPorAmbiente[a.id] ?? [];
      const ambienteCalc: Ambiente = {
        id: a.id,
        nome: a.nome,
        tipo: a.tipo,
        areaM2: Number(a.area_m2),
        perimetroM: Number(a.perimetro_m),
        pontosLuzManual: a.pontos_luz_manual,
        tuesVinculados: tues.map((t) => ({ tueNome: t.nome, potenciaW: Number(t.potencia_w), fp: Number(t.fp), quantidade: t.quantidade })),
      };
      const previsao = calcularPrevisaoCarga(ambienteCalc);
      const eMolhado = tiposMolhados.includes(a.tipo);

      // Acumular iluminação
      potIlumTotal += previsao.potIluminacaoVA;
      pontosIlumTotal += previsao.pontosLuzMin;

      // Acumular TUG por categoria
      if (previsao.potTugVA > 0) {
        if (eMolhado) {
          potTugMolhadoTotal += previsao.potTugVA;
          pontossTugMolhado += previsao.tugMin;
        } else {
          potTugSecoTotal += previsao.potTugVA;
          pontosTugSeco += previsao.tugMin;
        }
      }

      // TUEs — separar verdadeiros TUEs dos que vão para TUG
      for (const t of tues) {
        const potW = Number(t.potencia_w) * t.quantidade;
        if (ehTUEverdadeiro(t.nome, potW)) {
          // TUE real → circuito individual
          tuesIndividuais.push({
            nome: t.nome,
            potenciaVA: potW / (Number(t.fp) || 1),
            fp: Number(t.fp),
            qtd: t.quantidade,
          });
        } else {
          // Vai para TUG do ambiente correspondente
          const potVA = potW / (Number(t.fp) || 1);
          if (eMolhado) {
            potTugMolhadoTotal += potVA;
            pontossTugMolhado += t.quantidade;
          } else {
            potTugSecoTotal += potVA;
            pontosTugSeco += t.quantidade;
          }
        }
      }
    }

    // 1. Circuito único de iluminação
    if (potIlumTotal > 0) {
      novos.push({
        project_id: projectId, numero: numero++,
        descricao: "Iluminação Geral",
        tipo: "Iluminação", tensao_v: tensaoV, fp: 0.92,
        fase: fasesCiclo[faseIdx++ % 3],
        potencia_va: potIlumTotal,
        comprimento_m: 20, isolacao: "PVC", bloqueado: false,
        qtd_pontos: pontosIlumTotal,
      });
    }

    // 2. TUG Áreas Molhadas (cozinha, banheiro, serviço)
    if (potTugMolhadoTotal > 0) {
      novos.push({
        project_id: projectId, numero: numero++,
        descricao: "TUG — Áreas Molhadas",
        tipo: "TUG", tensao_v: tensaoV, fp: 0.92,
        fase: fasesCiclo[faseIdx++ % 3],
        potencia_va: potTugMolhadoTotal,
        comprimento_m: 20, isolacao: "PVC", bloqueado: false,
        qtd_pontos: pontossTugMolhado,
      });
    }

    // 3. TUG Áreas Secas (sala, quartos, etc.)
    if (potTugSecoTotal > 0) {
      novos.push({
        project_id: projectId, numero: numero++,
        descricao: "TUG — Áreas Secas",
        tipo: "TUG", tensao_v: tensaoV, fp: 0.92,
        fase: fasesCiclo[faseIdx++ % 3],
        potencia_va: potTugSecoTotal,
        comprimento_m: 20, isolacao: "PVC", bloqueado: false,
        qtd_pontos: pontosTugSeco,
      });
    }

    // 4. TUEs individuais
    for (const tue of tuesIndividuais) {
      novos.push({
        project_id: projectId, numero: numero++,
        descricao: tue.nome,
        tipo: "TUE", tensao_v: tensaoV, fp: tue.fp,
        fase: fasesCiclo[faseIdx++ % 3],
        potencia_va: tue.potenciaVA,
        comprimento_m: 15, isolacao: "PVC", bloqueado: false,
        qtd_pontos: tue.qtd,
      });
    }

    if (novos.length) await supabase.from("circuitos").insert(novos);
    setGerando(false);
    onChange();
  }

  async function balancearFasesAutomaticamente() {
    setBalanceando(true);
    const bloqueados = new Set(circuitos.filter((c) => c.bloqueado).map((c) => c.id));
    const entrada = calculados.map((c) => ({ id: c.id, potenciaW: c.potenciaW, fase: c.fase }));
    const resultado = balancearFases(entrada, bloqueados);

    await Promise.all(
      resultado.map((r) => {
        const original = circuitos.find((c) => c.id === r.id);
        if (original && original.fase !== r.fase) {
          return supabase.from("circuitos").update({ fase: r.fase }).eq("id", r.id);
        }
        return Promise.resolve();
      })
    );
    setBalanceando(false);
    onChange();
  }

  return (
    <div>
      <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-panel-border bg-panel p-4">
          <button
            onClick={gerarCircuitosDosAmbientes}
            disabled={gerando || ambientes.length === 0}
            className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-40"
          >
            <Wand2 size={15} /> {gerando ? "Gerando..." : "Gerar circuitos a partir dos ambientes"}
          </button>
          <button
            onClick={adicionarCircuito}
            className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent"
          >
            <Plus size={15} /> Circuito manual
          </button>

          {/* Atalhos rápidos */}
          <div className="flex items-center gap-1 rounded-md border border-panel-border px-2 py-1">
            <span className="text-xs text-muted mr-1">Adicionar:</span>
            <button onClick={() => adicionarCircuito("iluminacao")}
              className="rounded px-2 py-1 text-xs hover:bg-panel-border transition-colors" title="Iluminação Geral">
              💡 Iluminação
            </button>
            <button onClick={() => adicionarCircuito("tug-seco")}
              className="rounded px-2 py-1 text-xs hover:bg-panel-border transition-colors" title="TUG Áreas Secas">
              🔌 TUG Seco
            </button>
            <button onClick={() => adicionarCircuito("tug-molhado")}
              className="rounded px-2 py-1 text-xs hover:bg-panel-border transition-colors" title="TUG Áreas Molhadas">
              💧 TUG Molhado
            </button>
            <button onClick={() => adicionarCircuito("tue")}
              className="rounded px-2 py-1 text-xs hover:bg-panel-border transition-colors" title="Equipamento específico">
              ⚡ TUE
            </button>
          </div>
          <button
            onClick={agruparSelecionados}
            disabled={selecionados.size < 2}
            title="Selecione 2 ou mais circuitos na tabela (caixa de marcação) para juntá-los em um só disjuntor"
            className="flex items-center gap-1.5 rounded-md border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-40"
          >
            <Combine size={15} /> Agrupar selecionados {selecionados.size > 1 ? `(${selecionados.size})` : ""}
          </button>
          <button
            onClick={balancearFasesAutomaticamente}
            disabled={balanceando || circuitos.length === 0}
            className="ml-auto flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Zap size={15} /> {balanceando ? "Balanceando..." : "Balancear fases automaticamente"}
          </button>
        </div>
        <BalancoCard balanco={balanco} />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Search size={15} className="text-muted" />
        <input
          value={busca}
          onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
          placeholder="Buscar por descrição, tipo, fase ou número..."
          className="w-full max-w-sm rounded-md border border-panel-border bg-panel px-3 py-1.5 text-sm"
        />
        {busca && (
          <span className="text-xs text-muted">{filtrados.length} de {circuitos.length} circuito(s)</span>
        )}
        {!busca && circuitos.length > POR_PAGINA && (
          <span className="text-xs text-muted">{(paginaAtual - 1) * POR_PAGINA + 1}–{Math.min(paginaAtual * POR_PAGINA, filtrados.length)} de {circuitos.length}</span>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-panel-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5" />
              <th className="px-3 py-2.5">Nº</th>
              <th className="px-3 py-2.5">Descrição</th>
              <th className="px-3 py-2.5">Tipo</th>
              <th className="px-3 py-2.5">Pontos</th>
              <th className="px-3 py-2.5">Fase</th>
              <th className="px-3 py-2.5">VA</th>
              <th className="px-3 py-2.5">Comp. (m)</th>
              <th className="px-3 py-2.5">Isolação</th>
              <th className="px-3 py-2.5">Ib (A)</th>
              <th className="px-3 py-2.5">Cabo (mm²)</th>
              <th className="px-3 py-2.5 text-ok">Iz (A)</th>
              <th className="px-3 py-2.5">Queda (%)</th>
              <th className="px-3 py-2.5">Disjuntor (A)</th>
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {circuitosPagina.map((c) => {
              const original = circuitos.find((o) => o.id === c.id)!;
              return (
                <tr key={c.id} className="border-t border-panel-border">
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selecionados.has(c.id)}
                      onChange={() => alternarSelecao(c.id)}
                      className="accent-accent"
                    />
                  </td>
                  <td className="tabular px-3 py-2 text-muted">{c.numero}</td>
                  <td className="px-3 py-2">
                    <input
                      defaultValue={c.descricao}
                      onBlur={(e) => e.target.value !== c.descricao && atualizar(c.id, { descricao: e.target.value })}
                      className="w-44 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={c.tipo}
                      onChange={(e) => atualizar(c.id, { tipo: e.target.value as TipoCircuito })}
                      className="rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    >
                      {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      defaultValue={original.qtd_pontos}
                      title="Quantidade de pontos de tomada/iluminação atendidos por este circuito"
                      onBlur={(e) => Number(e.target.value) !== original.qtd_pontos && atualizar(c.id, { qtd_pontos: Number(e.target.value) })}
                      className="tabular w-14 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={c.fase}
                        onChange={(e) => atualizar(c.id, { fase: e.target.value as Fase })}
                        className="rounded border border-transparent bg-transparent px-1 py-0.5 font-mono font-semibold hover:border-panel-border focus:border-accent focus:outline-none"
                        style={{ color: c.fase === "R" ? "var(--phase-r)" : c.fase === "S" ? "var(--phase-s)" : "var(--phase-t)" }}
                      >
                        {FASES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <button
                        title={original.bloqueado ? "Fase fixa — não muda no balanceamento" : "Fase livre — pode mudar no balanceamento"}
                        onClick={() => atualizar(c.id, { bloqueado: !original.bloqueado })}
                        className="text-muted hover:text-text"
                      >
                        {original.bloqueado ? <Lock size={13} /> : <Unlock size={13} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      defaultValue={c.potenciaVA}
                      onBlur={(e) => Number(e.target.value) !== c.potenciaVA && atualizar(c.id, { potencia_va: Number(e.target.value) })}
                      className="tabular w-20 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      defaultValue={c.comprimentoM}
                      onBlur={(e) => Number(e.target.value) !== c.comprimentoM && atualizar(c.id, { comprimento_m: Number(e.target.value) })}
                      className="tabular w-16 rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={c.isolacao}
                      onChange={(e) => atualizar(c.id, { isolacao: e.target.value as Isolacao })}
                      className="rounded border border-transparent bg-transparent px-1 py-0.5 hover:border-panel-border focus:border-accent focus:outline-none"
                    >
                      <option value="PVC">PVC</option>
                      <option value="EPR">EPR</option>
                    </select>
                  </td>
                  <td className="tabular px-3 py-2 text-muted">{c.ibA.toFixed(2)}</td>
                  <td className="tabular px-3 py-2">{c.secaoFinalMm2}</td>
                  <td className="tabular px-3 py-2 font-medium text-ok">{c.ampacidadeFinalA?.toFixed(0) ?? "—"} A</td>
                  <td className={`tabular px-3 py-2 ${c.quedaPercent > 4 ? "text-danger" : "text-muted"}`}>{c.quedaPercent.toFixed(2)}</td>
                  <td className="tabular px-3 py-2 font-medium">{c.disjuntorA}</td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => duplicarCircuito(original)} title="Duplicar (dividir carga em outro disjuntor)" className="mr-2 text-muted hover:text-text">
                      <Copy size={15} />
                    </button>
                    <button onClick={() => remover(c.id)} className="text-muted hover:text-danger">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {circuitos.length === 0 && (
              <tr>
                <td colSpan={14} className="px-4 py-8 text-center text-muted">
                  Nenhum circuito ainda. Cadastre os ambientes e clique em "Gerar circuitos a partir dos ambientes".
                </td>
              </tr>
            )}
            {circuitos.length > 0 && filtrados.length === 0 && (
              <tr>
                <td colSpan={14} className="px-4 py-8 text-center text-muted">
                  Nenhum circuito encontrado para "{busca}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>{filtrados.length} circuito(s) — página {paginaAtual} de {totalPaginas}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPagina(1)}
              disabled={paginaAtual === 1}
              className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30"
            >«</button>
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30"
            >‹ Anterior</button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPaginas || Math.abs(p - paginaAtual) <= 1)
              .map((p, idx, arr) => (
                <>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span key={`gap-${p}`} className="px-1">…</span>}
                  <button
                    key={p}
                    onClick={() => setPagina(p)}
                    className={`rounded px-2 py-1 ${p === paginaAtual ? "bg-accent text-bg font-bold" : "hover:bg-panel-border"}`}
                  >{p}</button>
                </>
              ))}
            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
              className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30"
            >Próxima ›</button>
            <button
              onClick={() => setPagina(totalPaginas)}
              disabled={paginaAtual === totalPaginas}
              className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30"
            >»</button>
          </div>
        </div>
      )}
    </div>
  );
}
