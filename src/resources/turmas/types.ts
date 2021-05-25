// Get Turmas
export interface Turma {
  id: number;
  codigoTurma: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  quantidadeperiodo: number;
  componente: string;
}

export interface GetTurmasReturn {
  turmas: Turma[];
}

// Get Ofertas Turma
export interface Modulo {
  nome: string;
  id: number;
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
}

export interface GetOfertasTurmasReturn {
  ofertasModulos: OfertasModulo[];
}
