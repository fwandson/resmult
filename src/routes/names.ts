// Aqui vão as rotas
export default {
  HOME: '/',
  LOGIN: '/login',
  TURMAS: '/turmas',
  TURMA_DETAILS: '/turmas/:id',
  FALTAS_REGISTRO: '/turmas/:idTurma/faltas/:idOferta/registro',
  NOTAS_REGISTRO: '/turmas/:idTurma/notas/:idOferta/registro',
  CH_COMP_REGISTRO: '/turmas/:idTurma/ch-complementar/:idOferta/registro',
  OFERTAS: '/ofertas',
  RESIDENTE_DETAILS: '/residentes/:idTurma/:idOferta/:idResidente',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  TYPOGRAPHY: '/typography',
  NOT_FOUND: '*',
};
