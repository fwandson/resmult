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
