import { AxiosResponse } from 'axios';
import api from 'src/api';
import RESOURCE_URLS from '../names';
import { LoginNames } from './types';

const autentication = {
  login: (
    params: LoginNames.Params
  ): Promise<AxiosResponse<LoginNames.Return>> =>
    api.post(RESOURCE_URLS.LOGIN, params),
};

export default autentication;
