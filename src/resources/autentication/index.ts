import { AxiosResponse } from 'axios';
import api from 'src/api';
import { LoginParams, LoginReturn } from './types';

const base = '/auth';

const autentication = {
  login: async (params: LoginParams): Promise<AxiosResponse<LoginReturn>> =>
    await api.post(base, params),
};

export default autentication;
