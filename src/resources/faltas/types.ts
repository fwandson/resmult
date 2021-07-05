export declare namespace PostNames {
  export interface Falta {
    id: number;
    residenteId: number;
    ofertaId: number;
    tipo: string;
    falta: string;
    observacao: string;
  }

  export interface Return {
    sucesso: boolean;
    faltas: Falta[];
  }

  export interface Params {
    faltas: {
      residenteid: number;
      falta: number;
      tipo: string;
      observacao: string;
    }[];
  }
}
