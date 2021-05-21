import { AxiosResponse } from 'axios';
import api from 'src/api';
import { LoginParams, LoginReturn } from './types';

const base = '/auth';

const autentication = {
  base,
  login: (params: LoginParams): Promise<AxiosResponse<LoginReturn>> =>
    api.post(base, params),
};

export default autentication;
