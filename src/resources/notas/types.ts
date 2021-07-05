export declare namespace PostNames {
  export interface NotaReturn {
    id: number;
    residenteId: number;
    ofertaId: number;
    semestre: number;
    notaDeAtividadeDeProduto: string;
    notaDeAvaliacaoDeDesempenho: string;
  }

  export interface Return {
    sucesso: boolean;
    notas: NotaReturn[];
  }

  export interface NotaParams {
    residenteid: number;
    notadeatividadedeproduto?: string | null;
    notadeavaliacaodedesempenho?: string | null;
  }

  export interface Params {
    notas: NotaParams[];
  }
}
