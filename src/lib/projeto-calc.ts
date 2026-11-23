import {
  calcularMemorial,
  calcularBalanco,
  calcularResumoDemanda,
  calcularResumoDemandaDisNor030,
  type BalancoFases,
  type CargaDemanda,
  type CircuitoCalculado,
  type ResumoDemanda,
} from "@/lib/nbr5410";
import type { CircuitoRow, ConfigProjeto, ProjectRow } from "@/lib/types";

export function configDoProjeto(project?: Pick<ProjectRow, "config_json"> | null): ConfigProjeto {
  return project?.config_json ?? {};
}

/** Linhas do banco → circuitos calculados, aplicando as opções do projeto (fator de agrupamento). */
export function calcularCircuitosDoProjeto(rows: CircuitoRow[], config: ConfigProjeto): CircuitoCalculado[] {
  return calcularMemorial(
    rows.map((c) => ({
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
      fca: c.fca != null ? Number(c.fca) : null,
      disjuntorFixoA: c.disjuntor_a != null ? Number(c.disjuntor_a) : null,
      dr30ma: !!c.dr_30ma,
    })),
    { fca: config.fca }
  );
}

/** Equilíbrio de fases pela carga aparente (VA), que acompanha a corrente em cada fase. */
export function balancoPorVA(calculados: CircuitoCalculado[]): BalancoFases {
  return calcularBalanco(calculados.map((c) => ({ fase: c.fase, potenciaW: c.potenciaVA })));
}

export function resumoDoProjeto(
  calculados: CircuitoCalculado[],
  project: Pick<ProjectRow, "tensao_v" | "tipo_entrada" | "config_json">,
  concessionaria = "COSERN"
): ResumoDemanda {
  const config = configDoProjeto(project);
  if (config.metodo_demanda === "dis-nor-030" && config.cargas_demanda?.length) {
    return calcularResumoDemandaDisNor030(calculados, config.cargas_demanda as CargaDemanda[], project.tensao_v);
  }
  return calcularResumoDemanda(calculados, project.tensao_v, project.tipo_entrada ?? "Monofásico", concessionaria);
}
