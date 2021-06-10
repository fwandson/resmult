import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { GetNames } from './types';

const nucleosProfissionais = {
  get: (): Promise<AxiosResponse<GetNames.Return>> =>
    api.get(RESOURCE_URLS.GET_ENFASES),
};

export default nucleosProfissionais;
