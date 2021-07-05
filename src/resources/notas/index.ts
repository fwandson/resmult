import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { PostNames } from './types';

const notas = {
  registar: (
    params: PostNames.Params,
    idTurma: number,
    idOferta: number
  ): Promise<AxiosResponse<PostNames.Return>> =>
    api.post(
      RESOURCE_URLS.POST_NOTAS.replace(':idTurma', String(idTurma)).replace(
        ':idOferta',
        String(idOferta)
      ),
      params
    ),
};

export default notas;
