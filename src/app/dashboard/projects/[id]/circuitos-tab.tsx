"use client";

import { Fragment, useMemo, useState } from "react";
import { Plus, Trash2, Wand2, Lock, Unlock, Zap, Combine, Copy, Search, CheckCircle2, AlertTriangle, Pencil, Check, ChevronDown } from "lucide-react";
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
  tipoEntrada: string;
  circuitos: CircuitoRow[];
  ambientes: AmbienteRow[];
  tuesPorAmbiente: Record<string, AmbienteTueRow[]>;
  onChange: () => void;
}

const TIPOS: TipoCircuito[] = ["Iluminação", "TUG", "TUE"];
const FASES: Fase[] = ["R", "S", "T"];

export default function CircuitosTab({ projectId, tensaoV, tipoEntrada, circuitos, ambientes, tuesPorAmbiente, onChange }: Props) {
  const supabase = createClient();
  const [gerando, setGerando] = useState(false);
  const [balanceando, setBalanceando] = useState(false);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(25);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [menuAdd, setMenuAdd] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<"todos" | TipoCircuito>("todos");
  const [filtroFase, setFiltroFase] = useState<"todas" | Fase>("todas");
  const POR_PAGINA = porPagina;

  function alternarSelecao(id: string) {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }

  /** Junta os circuitos selecionados em um único circuito (soma a potência, mantém o maior comprimento) */
  /** Agrupa circuitos selecionados visualmente (mesmo grupo_id, sem deletar) */
  async function agruparSelecionados() {
    const itens = circuitos.filter((c) => selecionados.has(c.id));
    if (itens.length < 2) return;
    // Gerar ID de grupo único baseado nos IDs dos circuitos
    const grupoId = itens.map((c) => c.id).sort().join("-").slice(0, 40);
    // Atualizar todos com o mesmo grupo_id
    for (const c of itens) {
      await supabase.from("circuitos").update({ grupo_id: grupoId }).eq("id", c.id);
    }
    setSelecionados(new Set());
    onChange();
  }

  /** Desagrupa um circuito (remove do grupo) */
  async function desagrupar(id: string) {
    await supabase.from("circuitos").update({ grupo_id: null }).eq("id", id);
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
    const termo = busca.trim().toLowerCase();
    return calculados.filter(
      (c) =>
        (filtroTipo === "todos" || c.tipo === filtroTipo) &&
        (filtroFase === "todas" || c.fase === filtroFase) &&
        (!termo ||
          c.descricao.toLowerCase().includes(termo) ||
          c.tipo.toLowerCase().includes(termo) ||
          c.fase.toLowerCase() === termo ||
          String(c.numero).includes(termo))
    );
  }, [calculados, busca, filtroTipo, filtroFase]);
  const maxVA = Math.max(1, ...calculados.map((c) => c.potenciaVA));
  const nAlertas = calculados.filter((c) => c.quedaPercent > 4 || c.ibA > c.disjuntorA).length;

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

  const fmt = (n: number, d = 0) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const COR_FASE: Record<Fase, string> = { R: "var(--phase-r)", S: "var(--phase-s)", T: "var(--phase-t)" };
  const CHIP_TIPO: Record<TipoCircuito, string> = { "Iluminação": "bg-warn/15 text-warn", TUG: "bg-ok/15 text-ok", TUE: "bg-accent/15 text-accent" };
  const coresGrupo = ["border-l-accent", "border-l-phase-s", "border-l-phase-t", "border-l-ok", "border-l-warn", "border-l-danger"];
  const gruposIds = [...new Set(circuitos.filter((x) => x.grupo_id).map((x) => x.grupo_id))];
  const inputCls = "rounded-md border border-panel-border bg-bg px-2 py-1 text-sm focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Cabeçalho + ações + balanço */}
      <div className="mb-5 grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-panel-border bg-panel p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold">Quadro de circuitos</h2>
              <p className="mt-0.5 text-xs text-muted">
                {calculados.length} circuitos · {fmt(calculados.reduce((a, c) => a + c.potenciaVA, 0))} VA instalados
                {nAlertas > 0 ? <span className="ml-2 font-semibold text-danger">· {nAlertas} com alerta</span> : calculados.length > 0 ? <span className="ml-2 font-semibold text-ok">· todos conformes</span> : null}
              </p>
            </div>
            <button
              onClick={() => { setModoEdicao((v) => !v); setEditandoId(null); }}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${modoEdicao ? "border-accent bg-accent/15 text-accent" : "border-panel-border text-muted hover:border-accent hover:text-text"}`}
              title="Liga a edição em todas as linhas. Para editar uma só, use o lápis da linha."
            >
              {modoEdicao ? <Check size={13} /> : <Pencil size={13} />} {modoEdicao ? "Edição ligada" : "Editar tudo"}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={gerarCircuitosDosAmbientes} disabled={gerando || ambientes.length === 0}
              className="flex items-center gap-1.5 rounded-lg border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-40">
              <Wand2 size={15} /> {gerando ? "Gerando..." : "Gerar a partir dos ambientes"}
            </button>
            <div className="relative">
              <button onClick={() => setMenuAdd((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent">
                <Plus size={15} /> Adicionar circuito <ChevronDown size={14} className="text-muted" />
              </button>
              {menuAdd && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuAdd(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1.5 w-60 rounded-xl border border-panel-border bg-panel p-1.5 shadow-2xl">
                    {([
                      ["💡", "Iluminação geral", "iluminacao"],
                      ["🔌", "TUG áreas secas", "tug-seco"],
                      ["💧", "TUG áreas molhadas", "tug-molhado"],
                      ["⚡", "TUE (equipamento específico)", "tue"],
                    ] as const).map(([ic, nome, t]) => (
                      <button key={t} onClick={() => { adicionarCircuito(t); setMenuAdd(false); }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-panel-border/60">
                        <span>{ic}</span>{nome}
                      </button>
                    ))}
                    <div className="my-1 border-t border-panel-border" />
                    <button onClick={() => { adicionarCircuito(); setMenuAdd(false); }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-panel-border/60">
                      <Plus size={14} /> Circuito em branco
                    </button>
                  </div>
                </>
              )}
            </div>
            <button onClick={agruparSelecionados} disabled={selecionados.size < 2}
              title="Marque 2 ou mais circuitos na tabela para juntá-los em um só disjuntor"
              className="flex items-center gap-1.5 rounded-lg border border-panel-border px-3.5 py-2 text-sm transition-colors hover:border-accent disabled:opacity-40">
              <Combine size={15} /> Agrupar{selecionados.size > 1 ? ` (${selecionados.size})` : ""}
            </button>
            <button onClick={balancearFasesAutomaticamente} disabled={balanceando || circuitos.length === 0}
              className="ml-auto flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-40">
              <Zap size={15} /> {balanceando ? "Balanceando..." : "Balancear fases"}
            </button>
          </div>
        </div>
        {tipoEntrada === "Trifásico" ? (
          <BalancoCard balanco={balanco} />
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-panel-border bg-panel p-4 text-center text-xs text-muted">
            Balanço de fases disponível<br />somente para entrada trifásica.
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1 rounded-lg border border-panel-border bg-panel p-1 text-xs">
          {(["todos", "Iluminação", "TUG", "TUE"] as const).map((t) => (
            <button key={t} onClick={() => { setFiltroTipo(t); setPagina(1); }}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filtroTipo === t ? "bg-accent text-bg" : "text-muted hover:text-text"}`}>
              {t === "todos" ? "Todos" : t} <span className="opacity-70">{t === "todos" ? calculados.length : calculados.filter((c) => c.tipo === t).length}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-panel-border bg-panel p-1 text-xs">
          {(["todas", "R", "S", "T"] as const).map((f) => (
            <button key={f} onClick={() => { setFiltroFase(f); setPagina(1); }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${filtroFase === f ? "bg-bg-elevated text-text ring-1 ring-panel-border" : "text-muted hover:text-text"}`}>
              {f !== "todas" && <span className="h-2 w-2 rounded-full" style={{ background: COR_FASE[f] }} />}
              {f === "todas" ? "Todas as fases" : `Fase ${f}`}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full max-w-xs">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={busca} onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
            placeholder="Buscar descrição, tipo, fase ou nº..." className={`${inputCls} w-full py-2 pl-9`} />
        </div>
      </div>

      {/* Tabela */}
      <div className="max-h-[72vh] overflow-auto rounded-xl border border-panel-border bg-panel">
        <table className="w-full min-w-[1080px] text-sm">
          <thead className="sticky top-0 z-10 bg-bg-elevated text-left text-[11px] font-semibold uppercase tracking-wider text-muted shadow-[0_1px_0_0_var(--panel-border)]">
            <tr>
              <th className="w-10 px-3 py-3" />
              <th className="w-16 px-2 py-3">Nº</th>
              <th className="min-w-[26rem] px-3 py-3">Descrição</th>
              <th className="w-20 px-2 py-3 text-center">Fase</th>
              <th className="w-32 px-3 py-3">Carga (VA)</th>
              <th className="w-20 px-3 py-3 text-right">Ib (A)</th>
              <th className="w-20 px-3 py-3 text-right">Cabo</th>
              <th className="w-20 px-3 py-3 text-right">Iz (A)</th>
              <th className="w-32 px-3 py-3">Queda (%)</th>
              <th className="w-32 px-3 py-3">Disjuntor</th>
              <th className="w-24 px-3 py-3 text-center">Status</th>
              <th className="w-24 px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {circuitosPagina.map((c) => {
              const original = circuitos.find((o) => o.id === c.id)!;
              const grupo = original.grupo_id;
              const grupoIdx = grupo ? gruposIds.indexOf(grupo) : -1;
              const corGrupo = grupoIdx >= 0 ? coresGrupo[grupoIdx % coresGrupo.length] : "";
              const edit = modoEdicao || editandoId === c.id;
              const alerta = c.quedaPercent > 4 || c.ibA > c.disjuntorA;
              const uso = Math.min(100, (c.ibA / Math.max(c.disjuntorA, 1)) * 100);
              const queda = Math.min(100, (c.quedaPercent / 4) * 100);
              return (
                <tr key={c.id} className={`group border-t border-panel-border/70 align-middle transition-colors hover:bg-bg-elevated/60 ${grupo ? `border-l-4 ${corGrupo}` : ""} ${alerta ? "bg-danger/[0.06]" : ""}`}>
                  <td className="px-3 py-2.5">
                    <input type="checkbox" checked={selecionados.has(c.id)} onChange={() => alternarSelecao(c.id)} className="accent-accent" />
                  </td>
                  <td className="px-2 py-2.5">
                    <span className="inline-flex items-center rounded-md border border-panel-border bg-bg px-2 py-0.5 font-mono text-xs font-bold">C{String(c.numero).padStart(2, "0")}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    {edit ? (
                      <div className="space-y-1.5">
                        <input defaultValue={c.descricao} onBlur={(e) => e.target.value !== c.descricao && atualizar(c.id, { descricao: e.target.value })} className={`${inputCls} w-full`} />
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
                          <select value={c.tipo} onChange={(e) => atualizar(c.id, { tipo: e.target.value as TipoCircuito })} className={inputCls}>
                            {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <label className="flex items-center gap-1">pontos
                            <input type="number" min={0} defaultValue={original.qtd_pontos} onBlur={(e) => Number(e.target.value) !== original.qtd_pontos && atualizar(c.id, { qtd_pontos: Number(e.target.value) })} className={`${inputCls} tabular w-16`} />
                          </label>
                          <label className="flex items-center gap-1">comp. (m)
                            <input type="number" defaultValue={c.comprimentoM} onBlur={(e) => Number(e.target.value) !== c.comprimentoM && atualizar(c.id, { comprimento_m: Number(e.target.value) })} className={`${inputCls} tabular w-16`} />
                          </label>
                          <select value={c.isolacao} onChange={(e) => atualizar(c.id, { isolacao: e.target.value as Isolacao })} className={inputCls}>
                            <option value="PVC">PVC</option><option value="EPR">EPR</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="line-clamp-1 max-w-[34rem] font-medium leading-snug" title={c.descricao}>{c.descricao}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
                          <span className={`rounded-full px-2 py-0.5 font-semibold ${CHIP_TIPO[c.tipo]}`}>{c.tipo}</span>
                          <span>{original.qtd_pontos} {original.qtd_pontos === 1 ? "ponto" : "pontos"}</span>·<span>{fmt(c.comprimentoM)} m</span>·<span>{c.isolacao}</span>
                          {grupo && (
                            <button onClick={() => desagrupar(original.id)} title="Remover do grupo" className="flex items-center gap-0.5 rounded bg-accent/10 px-1.5 py-0.5 font-bold text-accent hover:bg-accent/20">
                              <Combine size={9} /> grupo
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2.5">
                    <div className="flex items-center justify-center gap-1.5">
                      {edit ? (
                        <select value={c.fase} onChange={(e) => atualizar(c.id, { fase: e.target.value as Fase })} className={`${inputCls} font-mono font-bold`} style={{ color: COR_FASE[c.fase] }}>
                          {FASES.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-bold text-bg" style={{ background: COR_FASE[c.fase] }}>{c.fase}</span>
                      )}
                      <button title={original.bloqueado ? "Fase fixa: não muda no balanceamento" : "Fase livre: pode mudar no balanceamento"}
                        onClick={() => atualizar(c.id, { bloqueado: !original.bloqueado })} className="text-muted hover:text-text">
                        {original.bloqueado ? <Lock size={13} /> : <Unlock size={13} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    {edit ? (
                      <input type="number" defaultValue={c.potenciaVA} onBlur={(e) => Number(e.target.value) !== c.potenciaVA && atualizar(c.id, { potencia_va: Number(e.target.value) })} className={`${inputCls} tabular w-24`} />
                    ) : (
                      <div>
                        <p className="tabular font-semibold">{fmt(c.potenciaVA)}</p>
                        <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-bg-elevated"><div className="h-full rounded-full bg-accent/70" style={{ width: `${(c.potenciaVA / maxVA) * 100}%` }} /></div>
                      </div>
                    )}
                  </td>
                  <td className="tabular px-3 py-2.5 text-right text-muted">{fmt(c.ibA, 2)}</td>
                  <td className="tabular px-3 py-2.5 text-right font-medium">{fmt(c.secaoFinalMm2, 1)} <span className="text-[11px] font-normal text-muted">mm²</span></td>
                  <td className="tabular px-3 py-2.5 text-right font-medium text-ok">{c.ampacidadeFinalA ? fmt(c.ampacidadeFinalA) : "—"}</td>
                  <td className="px-3 py-2.5">
                    <p className={`tabular font-medium ${c.quedaPercent > 4 ? "text-danger" : ""}`}>{fmt(c.quedaPercent, 2)}</p>
                    <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-bg-elevated"><div className={`h-full rounded-full ${c.quedaPercent > 4 ? "bg-danger" : c.quedaPercent > 3 ? "bg-warn" : "bg-ok"}`} style={{ width: `${queda}%` }} /></div>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="tabular font-semibold">{c.disjuntorA} A</p>
                    <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-bg-elevated"><div className={`h-full rounded-full ${uso > 100 ? "bg-danger" : uso > 80 ? "bg-warn" : "bg-ok"}`} style={{ width: `${uso}%` }} /></div>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {alerta ? (
                      <span title={c.quedaPercent > 4 ? "Queda de tensão acima de 4%" : "Ib maior que o disjuntor"} className="inline-flex items-center gap-1 rounded-full bg-danger/15 px-2.5 py-1 text-[11px] font-bold text-danger"><AlertTriangle size={11} /> Verificar</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ok/15 px-2.5 py-1 text-[11px] font-bold text-ok"><CheckCircle2 size={11} /> OK</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2 text-muted opacity-60 transition-opacity group-hover:opacity-100">
                      <button onClick={() => setEditandoId(editandoId === c.id ? null : c.id)} title={editandoId === c.id ? "Concluir edição" : "Editar esta linha"} className="hover:text-accent">
                        {editandoId === c.id ? <Check size={15} /> : <Pencil size={15} />}
                      </button>
                      <button onClick={() => duplicarCircuito(original)} title="Duplicar (dividir carga em outro disjuntor)" className="hover:text-text"><Copy size={15} /></button>
                      <button onClick={() => remover(c.id)} title="Excluir" className="hover:text-danger"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {circuitos.length === 0 && (
              <tr><td colSpan={12} className="px-4 py-10 text-center text-muted">Nenhum circuito ainda. Cadastre os ambientes e clique em &quot;Gerar a partir dos ambientes&quot;.</td></tr>
            )}
            {circuitos.length > 0 && filtrados.length === 0 && (
              <tr><td colSpan={12} className="px-4 py-10 text-center text-muted">Nenhum circuito encontrado com esses filtros.</td></tr>
            )}
          </tbody>
          {calculados.length > 0 && (
            <tfoot className="sticky bottom-0 bg-bg-elevated text-xs font-semibold shadow-[0_-1px_0_0_var(--panel-border)]">
              <tr>
                <td className="px-3 py-2.5" colSpan={3}>Total · {calculados.length} circuitos · {circuitos.reduce((a, o) => a + (o.qtd_pontos ?? 0), 0)} pontos</td>
                <td className="px-2 py-2.5" />
                <td className="tabular px-3 py-2.5">{fmt(calculados.reduce((a, c) => a + c.potenciaVA, 0))} VA</td>
                <td className="px-3 py-2.5" colSpan={7} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Paginação */}
      {(totalPaginas > 1 || filtrados.length > 10) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span>
            {filtrados.length === 0 ? 0 : (paginaAtual - 1) * POR_PAGINA + 1}–{Math.min(paginaAtual * POR_PAGINA, filtrados.length)} de {filtrados.length} circuito(s)
          </span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5">Linhas por página
              <select value={porPagina} onChange={(e) => { setPorPagina(Number(e.target.value)); setPagina(1); }} className={`${inputCls} py-0.5 text-xs`}>
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            {totalPaginas > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaAtual === 1} className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30">‹ Anterior</button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPaginas || Math.abs(p - paginaAtual) <= 1)
                  .map((p, idx, arr) => (
                    <Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1">…</span>}
                      <button onClick={() => setPagina(p)} className={`rounded px-2.5 py-1 ${p === paginaAtual ? "bg-accent font-bold text-bg" : "hover:bg-panel-border"}`}>{p}</button>
                    </Fragment>
                  ))}
                <button onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={paginaAtual === totalPaginas} className="rounded px-2 py-1 hover:bg-panel-border disabled:opacity-30">Próxima ›</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
