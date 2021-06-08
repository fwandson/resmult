import { AxiosResponse } from 'axios';
import RESOURCE_URLS from '../names';
import api from 'src/api';
import { GetNames } from './types';

const tiposCargaHoraria = {
  get: (): Promise<AxiosResponse<GetNames.Return>> =>
    api.get(RESOURCE_URLS.GET_TIPOS_CARGA_HORARIA),
};

export default tiposCargaHoraria;
