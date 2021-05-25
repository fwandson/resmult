import { AxiosResponse } from 'axios';
import api from 'src/api';
import { GetOfertasTurmasReturn, GetTurmasReturn } from './types';

const base = '/residencia-multiprofissional/supervisores/turmas';

const turmas = {
  base,
  get: (): Promise<AxiosResponse<GetTurmasReturn>> => api.get(base),
  getOfertas: (id: number): Promise<AxiosResponse<GetOfertasTurmasReturn>> =>
    api.get(`/residencia-multiprofissional/supervisores/turma/${id}/ofertas`),
};

export default turmas;
