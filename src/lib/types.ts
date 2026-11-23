export interface ProjectRow {
  id: string;
  owner_id: string;
  nome: string;
  cliente: string | null;
  endereco: string | null;
  tensao_v: number;
  dps_quantidade: number;
  precos_json: Record<string, unknown>;
  responsavel_tecnico: string | null;
  registro_profissional: string | null;
  numero_art: string | null;
  tipo_entrada: "Monofásico" | "Bifásico" | "Trifásico";
  dossie_json?: DossieJson | null;
  config_json?: ConfigProjeto | null;
  created_at: string;
  updated_at: string;
}

export interface MotorRow {
  id: string;
  project_id: string;
  nome: string;
  tipo: "Monofásico" | "Trifásico";
  potencia_cv: number;
  tensao_v: number;
  fp_atual: number;
  fp_desejado: number;
  quantidade: number;
}

export interface AmbienteRow {
  id: string;
  project_id: string;
  nome: string;
  tipo: "Social/Quarto" | "Serviço/Cozinha" | "Banheiro" | "Varanda/Externo";
  area_m2: number;
  perimetro_m: number;
  pontos_luz_manual: number | null;
  ordem: number;
}

export interface AmbienteTueRow {
  id: string;
  ambiente_id: string;
  nome: string;
  potencia_w: number;
  fp: number;
  quantidade: number;
}

export interface CircuitoRow {
  id: string;
  project_id: string;
  numero: number;
  descricao: string;
  tipo: "Iluminação" | "TUG" | "TUE";
  tensao_v: number;
  fp: number;
  fase: "R" | "S" | "T" | "RST";
  potencia_va: number;
  comprimento_m: number;
  isolacao: "PVC" | "EPR";
  bloqueado: boolean;
  qtd_pontos: number;
  grupo_id?: string | null; // agrupamento visual de circuitos
  dr_30ma?: boolean | null;
  fca?: number | null; // fator de agrupamento próprio do circuito
  disjuntor_a?: number | null; // disjuntor definido em projeto
}

/** Opções de cálculo do projeto (coluna projects.config_json). */
export interface ConfigProjeto {
  /** "dis-nor-030": demanda pelo método da concessionária (unidade comercial). */
  metodo_demanda?: "simplificado" | "dis-nor-030";
  /** Fator de correção por agrupamento padrão (ex.: 0,70 para 3 circuitos por eletroduto). */
  fca?: number;
  cargas_demanda?: { grupo: string; descricao: string; potenciaW: number; fp: number; quantidade?: number }[];
}

export interface DossieKpi { rotulo: string; valor: string; nota?: string }
export type DossieSecao = { titulo: string; descricao?: string } & (
  | { tipo: "tabela"; colunas: string[]; linhas: (string | number)[][]; alinharDireita?: number[]; destacarUltima?: boolean }
  | { tipo: "lista"; itens: { tag?: string; texto: string; detalhe?: string }[] }
  | { tipo: "kv"; itens: { k: string; v: string }[] }
);
export interface DossieJson {
  titulo: string;
  subtitulo?: string;
  documento?: string;
  revisao?: string;
  data?: string;
  kpis: DossieKpi[];
  secoes: DossieSecao[];
}
