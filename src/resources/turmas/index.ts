import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { GetResidentesNames, GetOfertasNames, GetNames } from './types';

const turmas = {
  get: (): Promise<AxiosResponse<GetNames.Return>> =>
    api.get(RESOURCE_URLS.GET_TURMAS),
  getOfertas: (
    params: GetOfertasNames.Params
  ): Promise<AxiosResponse<GetOfertasNames.Return>> =>
    api.get(RESOURCE_URLS.GET_TURMAS_OFERTAS.replace(':id', String(params.id))),
  getResidentes: (
    params: GetResidentesNames.Params
  ): Promise<AxiosResponse<GetResidentesNames.Return>> => {
    const { idTurma, idOferta } = params;
    return api.get(
      RESOURCE_URLS.GET_OFERTA_RESIDENTES.replace(
        ':idTurma',
        String(idTurma)
      ).replace(':idOferta', String(idOferta))
    );
  },
};

export default turmas;
