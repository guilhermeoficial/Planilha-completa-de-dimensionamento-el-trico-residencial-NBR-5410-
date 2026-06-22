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
  fase: "R" | "S" | "T";
  potencia_va: number;
  comprimento_m: number;
  isolacao: "PVC" | "EPR";
  bloqueado: boolean;
  qtd_pontos: number;
}
