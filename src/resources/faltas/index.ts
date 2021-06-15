import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { PostNames } from './types';

const faltas = {
  registar: (
    params: PostNames.Params
  ): Promise<AxiosResponse<PostNames.Return>> =>
    api.post(RESOURCE_URLS.POST_FALTAS, params),
};

export default faltas;
