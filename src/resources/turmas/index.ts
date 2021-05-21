import { AxiosResponse } from 'axios';
import api from 'src/api';
import { GetTurmasReturn } from './types';

const base = '/residencia-multiprofissional/supervisores/turmas';

const turmas = {
  base,
  get: (): Promise<AxiosResponse<GetTurmasReturn>> => api.get(base),
};

export default turmas;
