export declare namespace PostNames {
  export interface TipoCargaHorariaComplementar {
    id: number;
    descricao: string;
  }

  export interface CargaHorariaComplementar {
    id: number;
    tipoCargaHorariaComplementar: TipoCargaHorariaComplementar;
    residente: number;
    oferta: number;
    cargaHoraria: string;
    justificativa: string;
    tipoCargaHoraria: string;
  }

  export interface Return {
    sucesso: boolean;
    cargaHorariaComplementar: CargaHorariaComplementar;
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
