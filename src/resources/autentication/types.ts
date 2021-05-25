export declare namespace LoginNames {
  export const url = '/auth';
  export interface Params {
    usuario: string;
    senha: string;
  }

  export interface Return {
    login: string;
    access_token: string;
  }
}
