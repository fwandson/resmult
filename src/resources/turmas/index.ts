import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { GetOfertasNames, GetNames } from './types';

const turmas = {
  get: (): Promise<AxiosResponse<GetNames.Return>> =>
    api.get(RESOURCE_URLS.GET_TURMAS),
  getOfertas: (
    params: GetOfertasNames.Params
  ): Promise<AxiosResponse<GetOfertasNames.Return>> =>
    api.get(RESOURCE_URLS.GET_TURMAS_OFERTAS.replace(':id', String(params.id))),
};

export default turmas;
