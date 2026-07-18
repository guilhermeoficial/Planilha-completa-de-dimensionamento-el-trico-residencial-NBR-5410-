"use client";

import { useRef } from "react";
import { Printer, Download } from "lucide-react";
import type { CircuitoCalculado, ResumoDemanda, BalancoFases } from "@/lib/nbr5410";
import type { AmbienteRow, ProjectRow, CircuitoRow } from "@/lib/types";

interface Props {
  project: ProjectRow;
  ambientes: AmbienteRow[];
  circuitosCalculados: CircuitoCalculado[];
  circuitosOriginais: CircuitoRow[];
  resumoDemanda: ResumoDemanda;
  balanco: BalancoFases;
}

function Secao({ numero, titulo, children }: { numero: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-accent text-xs font-bold text-bg">{numero}</span>
        <h2 className="text-base font-bold text-text">{titulo}</h2>
        <div className="flex-1 border-t border-panel-border" />
      </div>
      {children}
    </section>
  );
}

function Formula({ expressao, resultado, unidade }: { expressao: string; resultado: string; unidade?: string }) {
  return (
    <div className="my-1 flex items-center gap-2 font-mono text-sm">
      <span className="text-muted">{expressao}</span>
      <span className="text-accent font-bold">=  {resultado}{unidade ? ` ${unidade}` : ""}</span>
    </div>
  );
}

function LinhaDado({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="flex justify-between border-b border-panel-border py-1.5 text-sm last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-text">{valor}</span>
    </div>
  );
}

export default function MemorialCalculoTab({
  project, ambientes, circuitosCalculados, circuitosOriginais, resumoDemanda, balanco,
}: Props) {
  const refImprimir = useRef<HTMLDivElement>(null);
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  function imprimir() {
    window.print();
  }

  const trifasico = project.tipo_entrada === "Trifásico";

  return (
    <div>
      {/* Barra de ações */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Memorial de Cálculo</h1>
          <p className="text-xs text-muted">Instalação Elétrica Residencial — NBR 5410:2004</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={imprimir}
            className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Printer size={15} /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Conteúdo do memorial */}
      <div ref={refImprimir} className="space-y-2 print:text-black">

        {/* Capa */}
        <div className="mb-8 rounded-xl border border-panel-border bg-panel p-6">
          <div className="mb-4 border-b border-panel-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Memorial de Cálculo</p>
            <h1 className="mt-1 text-2xl font-bold">Instalação Elétrica Residencial</h1>
            <p className="mt-0.5 text-sm text-muted">Conforme NBR 5410:2004</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <LinhaDado label="Projeto" valor={project.nome} />
            <LinhaDado label="Data" valor={dataHoje} />
            {project.cliente && <LinhaDado label="Cliente" valor={project.cliente} />}
            <LinhaDado label="Tensão da rede" valor={`${project.tensao_v} V`} />
            <LinhaDado label="Tipo de entrada" valor={project.tipo_entrada ?? "Monofásico"} />
            {(project as {concessionaria?: string}).concessionaria && (
              <LinhaDado label="Concessionária" valor={(project as {concessionaria?: string}).concessionaria!} />
            )}
            {project.responsavel_tecnico && <LinhaDado label="Responsável técnico" valor={project.responsavel_tecnico} />}
            {project.numero_art && <LinhaDado label="ART/RRT nº" valor={project.numero_art} />}
          </div>
        </div>

        {/* 1. Referências normativas */}
        <Secao numero="1" titulo="Referências Normativas">
          <div className="rounded-lg border border-panel-border bg-panel p-4 text-sm space-y-1">
            <p>• <strong>NBR 5410:2004</strong> — Instalações elétricas de baixa tensão</p>
            <p>• <strong>NBR 5444:1989</strong> — Símbolos gráficos para instalações elétricas prediais</p>
            <p>• <strong>NR 10</strong> — Segurança em instalações e serviços em eletricidade</p>
            <p>• <strong>IEC 60364</strong> — Electrical installations of buildings (referência internacional)</p>
            {(project as {concessionaria?: string}).concessionaria && (
              <p>• <strong>Normas da {(project as {concessionaria?: string}).concessionaria}</strong> — Critérios específicos da concessionária local</p>
            )}
          </div>
        </Secao>

        {/* 2. Dados do sistema */}
        <Secao numero="2" titulo="Dados do Sistema Elétrico">
          <div className="rounded-lg border border-panel-border bg-panel p-4">
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <LinhaDado label="Tensão de alimentação" valor={`${project.tensao_v} V`} />
                <LinhaDado label="Frequência" valor="60 Hz" />
                <LinhaDado label="Sistema de aterramento" valor="TN-S (recomendado NBR 5410)" />
              </div>
              <div>
                <LinhaDado label="Tipo de entrada" valor={project.tipo_entrada ?? "Monofásico"} />
                <LinhaDado label="Nº de ambientes" valor={ambientes.length} />
                <LinhaDado label="Nº de circuitos" valor={circuitosCalculados.length} />
              </div>
            </div>
          </div>
        </Secao>

        {/* 3. Previsão de carga por ambiente */}
        <Secao numero="3" titulo="Previsão de Carga por Ambiente">
          <p className="mb-3 text-xs text-muted">
            Calculada conforme NBR 5410 — seção 9 (iluminação) e 9.5 (tomadas de uso geral).
            Mínimo de 100 VA por circuito de iluminação; TUG dimensionada por perímetro do ambiente.
          </p>
          <div className="overflow-x-auto rounded-lg border border-panel-border">
            <table className="w-full text-sm">
              <thead className="bg-bg-elevated text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2.5">Ambiente</th>
                  <th className="px-4 py-2.5">Tipo</th>
                  <th className="px-4 py-2.5 text-right">Área (m²)</th>
                  <th className="px-4 py-2.5 text-right">Pts. Luz</th>
                  <th className="px-4 py-2.5 text-right">Ilum. (VA)</th>
                  <th className="px-4 py-2.5 text-right">Pts. TUG</th>
                  <th className="px-4 py-2.5 text-right">TUG (VA)</th>
                </tr>
              </thead>
              <tbody>
                {ambientes.map((a, i) => (
                  <tr key={a.id} className={`border-t border-panel-border ${i % 2 === 0 ? "" : "bg-bg-elevated/40"}`}>
                    <td className="px-4 py-2 font-medium">{a.nome}</td>
                    <td className="px-4 py-2 text-muted">{a.tipo}</td>
                    <td className="px-4 py-2 text-right tabular">{Number(a.area_m2).toFixed(1)}</td>
                    <td className="px-4 py-2 text-right tabular">{a.pontos_luz_manual ?? "—"}</td>
                    <td className="px-4 py-2 text-right tabular">{a.pontos_luz_manual ? (a.pontos_luz_manual * 12 / 0.92).toFixed(0) : "calc. NBR"}</td>
                    <td className="px-4 py-2 text-right tabular">—</td>
                    <td className="px-4 py-2 text-right tabular">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Secao>

        {/* 4. Memorial de cada circuito */}
        <Secao numero="4" titulo="Memorial de Dimensionamento dos Circuitos">
          <p className="mb-3 text-xs text-muted">
            Cada circuito é dimensionado conforme NBR 5410 — seção 6 (seleção de condutores) e seção 7 (proteções).
            Critério de queda de tensão: máximo 4% nos circuitos terminais.
          </p>
          <div className="space-y-4">
            {circuitosCalculados.map((c, i) => {
              const original = circuitosOriginais.find(o => o.id === c.id);
              return (
                <div key={c.id} className={`rounded-lg border p-4 ${c.quedaPercent > 4 ? "border-danger/40 bg-danger/5" : "border-panel-border bg-panel"}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent/15 px-2 py-0.5 text-xs font-mono font-bold text-accent">C{c.numero}</span>
                      <span className="font-semibold">{c.descricao}</span>
                      <span className={`rounded px-1.5 py-0.5 text-xs ${c.tipo === "Iluminação" ? "bg-warn/15 text-warn" : c.tipo === "TUG" ? "bg-ok/15 text-ok" : "bg-accent/15 text-accent"}`}>
                        {c.tipo}
                      </span>
                    </div>
                    <span className="text-xs text-muted">Fase {c.fase} · {c.isolacao} · {c.comprimentoM} m</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Dados de entrada */}
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-muted">Dados de entrada</p>
                      <Formula expressao={`P = ${c.potenciaVA} VA × ${c.fp} (FP)`} resultado={`${Math.round(c.potenciaW)} W`} />
                      <Formula expressao={`Ib = P / V = ${Math.round(c.potenciaW)} / ${c.tensaoV}`} resultado={`${c.ibA.toFixed(2)} A`} />
                      {original?.qtd_pontos && (
                        <p className="mt-1 text-xs text-muted">Pontos: {original.qtd_pontos} · {c.potenciaVA / (original.qtd_pontos || 1)} VA cada</p>
                      )}
                    </div>

                    {/* Dimensionamento */}
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-muted">Dimensionamento do cabo</p>
                      <Formula
                        expressao={`Seção mínima (${c.tipo === "TUG" ? "TUG → mín. 2,5mm²" : "por Ib"})`}
                        resultado={`${c.secaoFinalMm2} mm²`}
                      />
                      <Formula
                        expressao={`Iz (cap. condução ${c.isolacao} 2 condutores)`}
                        resultado={`${(c as {ampacidadeFinalA?: number}).ampacidadeFinalA?.toFixed(0) ?? "—"} A`}
                      />
                      <Formula
                        expressao={`ΔV = 2 × ρ × L × Ib / (A × V) × 100`}
                        resultado={`${c.quedaPercent.toFixed(2)} %`}
                        unidade={c.quedaPercent > 4 ? "⚠️ EXCEDE 4%" : "✓"}
                      />
                      <Formula
                        expressao={`Disjuntor: Ib ≤ In ≤ Iz → ${c.ibA.toFixed(1)} ≤ ${c.disjuntorA} ≤ ${(c as {ampacidadeFinalA?: number}).ampacidadeFinalA?.toFixed(0) ?? "—"}`}
                        resultado={`${c.disjuntorA} A`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Secao>

        {/* 5. Resumo de demanda */}
        <Secao numero="5" titulo="Resumo da Demanda Geral">
          <div className="rounded-lg border border-panel-border bg-panel p-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted">Cálculo da demanda</p>
                <Formula
                  expressao="Carga instalada total"
                  resultado={`${Math.round(resumoDemanda.cargaInstaladaW).toLocaleString("pt-BR")} W`}
                />
                <Formula
                  expressao={`I_entrada = P / (${trifasico ? "√3 × " : ""}V)`}
                  resultado={`${resumoDemanda.correnteEntradaA.toFixed(1)} A`}
                />
                <Formula
                  expressao="Disjuntor geral recomendado"
                  resultado={`${resumoDemanda.disjuntorGeralA} A`}
                />
              </div>
              {trifasico && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted">Balanço de fases</p>
                  <Formula expressao="Fase R" resultado={`${Math.round(balanco.R).toLocaleString("pt-BR")} W`} />
                  <Formula expressao="Fase S" resultado={`${Math.round(balanco.S).toLocaleString("pt-BR")} W`} />
                  <Formula expressao="Fase T" resultado={`${Math.round(balanco.T).toLocaleString("pt-BR")} W`} />
                  <Formula
                    expressao="Desbalanceamento"
                    resultado={`${balanco.desbalanceamentoPercent.toFixed(1)} %`}
                    unidade={balanco.desbalanceamentoPercent > 10 ? "⚠️" : "✓"}
                  />
                </div>
              )}
            </div>
          </div>
        </Secao>

        {/* 6. Verificação de conformidade */}
        <Secao numero="6" titulo="Verificação de Conformidade — NBR 5410">
          <div className="space-y-2">
            {[
              {
                item: "Seção mínima dos condutores de fase",
                criterio: "≥ 1,5mm² (iluminação) e ≥ 2,5mm² (TUG)",
                ok: circuitosCalculados.every(c =>
                  c.tipo === "TUG" ? c.secaoFinalMm2 >= 2.5 : c.secaoFinalMm2 >= 1.5
                ),
              },
              {
                item: "Queda de tensão nos circuitos terminais",
                criterio: "≤ 4% (NBR 5410 — seção 6.2.7)",
                ok: circuitosCalculados.every(c => c.quedaPercent <= 4),
              },
              {
                item: "Seletividade: Ib ≤ In (disjuntor) ≤ Iz (cabo)",
                criterio: "Corrente de projeto ≤ disjuntor ≤ capacidade do cabo",
                ok: circuitosCalculados.every(c =>
                  c.ibA <= c.disjuntorA &&
                  c.disjuntorA <= ((c as {ampacidadeFinalA?: number}).ampacidadeFinalA ?? 999)
                ),
              },
              {
                item: "Circuito de iluminação separado",
                criterio: "Pelo menos 1 circuito exclusivo de iluminação",
                ok: circuitosCalculados.some(c => c.tipo === "Iluminação"),
              },
              {
                item: "TUG áreas molhadas no próprio circuito",
                criterio: "Circuito separado para cozinha/banheiro/área de serviço",
                ok: circuitosCalculados.some(c => c.descricao.toLowerCase().includes("molhad")),
              },
            ].map(({ item, criterio, ok }) => (
              <div key={item} className={`flex items-start justify-between rounded-lg border p-3 ${ok ? "border-ok/30 bg-ok/5" : "border-danger/30 bg-danger/5"}`}>
                <div>
                  <p className="text-sm font-medium">{item}</p>
                  <p className="text-xs text-muted">{criterio}</p>
                </div>
                <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold ${ok ? "bg-ok/20 text-ok" : "bg-danger/20 text-danger"}`}>
                  {ok ? "✓ Conforme" : "✗ Verificar"}
                </span>
              </div>
            ))}
          </div>
        </Secao>

        {/* Assinatura */}
        <div className="mt-8 border-t border-panel-border pt-6">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="h-12 border-b border-panel-border" />
              <p className="mt-2 text-muted">{project.responsavel_tecnico ?? "Responsável Técnico"}</p>
              {project.registro_profissional && (
                <p className="text-xs text-muted">{project.registro_profissional}</p>
              )}
              {project.numero_art && (
                <p className="text-xs text-muted">ART/RRT nº {project.numero_art}</p>
              )}
            </div>
            <div className="text-right text-xs text-muted">
              <p>Gerado em {dataHoje}</p>
              <p className="mt-1">Voltis — Dimensionamento Elétrico</p>
              <p>Conforme NBR 5410:2004</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
