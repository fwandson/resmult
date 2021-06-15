import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { PostNames } from './types';

const faltas = {
  registar: (
    params: PostNames.Params,
    idTurma: number,
    idOferta: number
  ): Promise<AxiosResponse<PostNames.Return>> =>
    api.post(
      RESOURCE_URLS.POST_FALTAS.replace(':idTurma', String(idTurma)).replace(
        ':idOferta',
        String(idOferta)
      ),
      params
    ),
};

export default faltas;
