import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { DeleteNames, PostNames } from './types';

const chComplementar = {
  adicionar: (
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
  remover: (
    params: DeleteNames.Params
  ): Promise<AxiosResponse<DeleteNames.Return>> =>
    api.post(
      RESOURCE_URLS.POST_CARGA_HORARIA_COMPLEMENTAR.replace(
        ':idTurma',
        String(params.idTurma)
      )
        .replace(':idOferta', String(params.idOferta))
        .replace(':idChComplementar', String(params.idChComplementar)),

      params
    ),
};

export default chComplementar;
