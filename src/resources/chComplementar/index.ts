import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { DeleteNames, PostNames, PutNames } from './types';

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
    api.delete(
      RESOURCE_URLS.DELETE_CARGA_HORARIA_COMPLEMENTAR.replace(
        ':idTurma',
        String(params.idTurma)
      )
        .replace(':idOferta', String(params.idOferta))
        .replace(':idChComplementar', String(params.idChComplementar))
    ),
  editar: (params: PutNames.Params): Promise<AxiosResponse<PutNames.Return>> =>
    api.put(
      RESOURCE_URLS.PUT_CARGA_HORARIA_COMPLEMENTAR.replace(
        ':idTurma',
        String(params.idTurma)
      )
        .replace(':idOferta', String(params.idOferta))
        .replace(':idChComplementar', String(params.idChComplementar)),
      { cargaHoraria: params.cargaHoraria }
    ),
};

export default chComplementar;
