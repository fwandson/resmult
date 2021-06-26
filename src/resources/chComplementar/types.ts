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

export declare namespace PutNames {
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
    idTurma: number;
    idOferta: number;
    idChComplementar: number;
    cargaHoraria: CargaHoraria;
  }
}

export declare namespace DeleteNames {
  export interface Return {
    sucesso: boolean;
  }

  export interface Params {
    idTurma: number;
    idOferta: number;
    idChComplementar: number;
  }
}
