enum RESOURCE_URLS {
  LOGIN = '/auth',
  GET_TURMAS = '/residencia-multiprofissional/supervisores/turmas',
  GET_TURMAS_OFERTAS = '/residencia-multiprofissional/supervisores/turma/:id/ofertas',
  GET_TIPOS_CARGA_HORARIA = '/residencia-multiprofissional/carga-horaria/tipos',
  GET_TIPOS_CARGA_HORARIA_COMPLEMENTAR = '/residencia-multiprofissional/carga-horaria-complementar/tipos',
  POST_CARGA_HORARIA_COMPLEMENTAR = '/residencia-multiprofissional/supervisores/turma/:idTurma/oferta/:idOferta/cargahoraria-complementar',
  GET_OFERTA_RESIDENTES = '/residencia-multiprofissional/supervisores/turma/:idTurma/oferta/:idOferta/residentes',
  GET_ENFASES = '/residencia-multiprofissional/enfases',
  GET_NUCLEOS_PROFISSIONAIS = '/residencia-multiprofissional/nucleos-profissionais',
  GET_PESSOA = '/pessoa/:idPessoa',
  POST_FALTAS = '/residencia-multiprofissional/supervisores/turma/:idTurma/oferta/:idOferta/faltas',
  POST_NOTAS = '/residencia-multiprofissional/supervisores/turma/:idTurma/oferta/:idOferta/notas',
}

export default RESOURCE_URLS;
