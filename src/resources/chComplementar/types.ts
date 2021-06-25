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

  export interface CargaHoraria {
    residenteId: number;
    tipoCargaHorariaComplementar: number;
    cargaHoraria: number;
    justificativa: string;
    tipoCargaHoraria: string;
  }

  export interface Params {
    cargaHoraria: CargaHoraria;
  }
}
