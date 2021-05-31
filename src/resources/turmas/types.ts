export declare namespace GetNames {
  export interface Turma {
    id: number;
    codigoTurma: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    quantidadeperiodo: number;
    componente: string;
  }

  export interface Return {
    turmas: Turma[];
  }
}

export declare namespace GetOfertasNames {
  export interface Modulo {
    nome: string;
    id: number;
  }

  export interface TipoCargaHoraria {
    tipo: string;
    cargahoraria: string;
  }

  export interface OfertasModulo {
    id: number;
    dataInicio: string;
    dataFim: string;
    encerramento?: unknown;
    nome: string;
    semestre: number;
    semestre_descricao: string;
    turma: {
      id?: number;
      codigoTurma: string;
      descricao: string;
      dataInicio?: Date;
      dataFim?: Date;
    };
    modulo: Modulo;
    cargahoraria: string;
    unidadetematicaid: number;
    tipoCargaHoraria: TipoCargaHoraria[];
  }

  export interface Params {
    id: number;
  }

  export interface Return {
    ofertasModulos: OfertasModulo[];
  }
}
