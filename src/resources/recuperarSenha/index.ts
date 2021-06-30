import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { PostNames } from './types';

const recuperarSenha = {
  enviarEmail: (
    params: PostNames.Params
  ): Promise<AxiosResponse<PostNames.Return>> =>
    api.post(RESOURCE_URLS.GET_RECUPERAR_SENHA, params),
};

export default recuperarSenha;
