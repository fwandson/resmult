enum RESOURCE_URLS {
  LOGIN = '/auth',
  GET_TURMAS = '/residencia-multiprofissional/supervisores/turmas',
  GET_TURMAS_OFERTAS = '/residencia-multiprofissional/supervisores/turma/:id/ofertas',
  GET_TIPOS_CARGA_HORARIA = '/residencia-multiprofissional/carga-horaria/tipos',
  GET_OFERTA_RESIDENTES = '/residencia-multiprofissional/supervisores/turma/:idTurma/oferta/:idOferta/residentes',
  GET_ENFASES = '/residencia-multiprofissional/enfases',
}

export default RESOURCE_URLS;
