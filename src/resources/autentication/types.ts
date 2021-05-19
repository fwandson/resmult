export interface LoginParams {
  usuario: string;
  senha: string;
}

export interface LoginReturn {
  login: string;
  access_token: string;
}
