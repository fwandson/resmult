import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { GetNames } from './types';

const pessoas = {
  get: (params: GetNames.Params): Promise<AxiosResponse<GetNames.Return>> =>
    api.get(
      RESOURCE_URLS.GET_PESSOA.replace(':idPessoa', String(params.idPessoa))
    ),
};

export default pessoas;
