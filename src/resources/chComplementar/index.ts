import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { PostNames } from './types';

const chComplementar = {
  registar: (
    params: PostNames.Params,
    idTurma: number,
    idOferta: number
  ): Promise<AxiosResponse<PostNames.Return>> =>
    api.post(
      RESOURCE_URLS.POST_CARGA_HORARIA_COMPLEMENTAR.replace(
        ':idTurma',
        String(idTurma)
      ).replace(':idOferta', String(idOferta)),
      params
    ),
};

export default chComplementar;
