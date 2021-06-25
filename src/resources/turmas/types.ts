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
  export interface Turma {
    id?: number;
    codigoTurma: string;
    descricao: string;
    dataInicio?: string;
    dataFim?: string;
  }
  export interface Modulo {
    nome: string;
    id: number;
  }

  export interface TipoCargaHoraria {
    tipo: string;
    cargahoraria: string;
  }

  export interface Nucleosprofissionai {
    id: number;
    descricao: string;
    abreviatura: string;
  }

  export interface Enfas {
    id: number;
    descricao: string;
    abreviatura: string;
  }
  export interface AtividadeModulo {
    id: number;
    periodo: string;
    descricao: string;
    sumula?: unknown;
    cargaHoraria: string;
    modulo?: unknown;
    enfases: Enfas[];
    nucleosprofissionais: Nucleosprofissionai[];
  }

  export interface OfertasModulo {
    id: number;
    dataInicio: string;
    dataFim: string;
    encerramento?: string;
    nome: string;
    semestre: number;
    semestre_descricao: string;
    turma: Turma;
    modulo: Modulo;
    cargahoraria: string;
    unidadetematicaid: number;
    tipoCargaHoraria: TipoCargaHoraria[];
    atividadeModulo: AtividadeModulo;
  }

  export interface Params {
    id: number;
  }

  export interface Return {
    ofertasModulos: OfertasModulo[];
  }
}

export declare namespace GetResidentesNames {
  export interface Person {
    id: number;
    name: string;
    photourl?: string;
  }

  export interface Enfase {
    id: number;
    descricao: string;
  }

  export interface NucleoProfissional {
    id: number;
    descricao: string;
  }

  export interface Turma {
    descricao: string;
  }

  export interface InstituicaoFormadoraPerson {
    name: string;
  }

  export interface InstituicaoExecutoraPerson {
    name: string;
  }

  export interface Falta {
    id: number;
    residenteId: number;
    ofertaId: number;
    tipo: string;
    falta: string;
    observacao?: string;
  }

  export interface Nota {
    id: number;
    residenteId: number;
    ofertaId: number;
    semestre: number;
    notaDeAtividadeDeProduto: string;
    notaDeAvaliacaoDeDesempenho: string;
  }

  export interface TipoCargaHorariaComplementar {
    id: number;
    descricao: string;
  }

  export interface Cargahorariacomplementar {
    id: number;
    tipoCargaHorariaComplementar: TipoCargaHorariaComplementar;
    residente: number;
    oferta: number;
    cargaHoraria: string;
    justificativa: string;
    tipoCargaHoraria: string;
  }

  export interface CargaHorariaPendente {
    tipo: string;
    cargaHorariaPendente: number;
  }

  export interface Residente {
    id: number;
    inicio: string;
    fimPrevisto: string;
    person: Person;
    enfase: Enfase;
    nucleoProfissional: NucleoProfissional;
    turma: Turma;
    instituicaoFormadoraPerson: InstituicaoFormadoraPerson;
    instituicaoExecutoraPerson: InstituicaoExecutoraPerson;
    faltas: Falta[];
    nota?: Nota;
    cargahorariapendente: CargaHorariaPendente[];
    cargahorariacomplementar: Cargahorariacomplementar[];
  }

  export interface Return {
    residentes: Residente[];
  }

  export interface Params {
    idTurma: number;
    idOferta: number;
  }
}
