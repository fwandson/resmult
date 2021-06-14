export declare namespace GetNames {
  export interface Estado {
    id: string;
    nome: string;
  }

  export interface Cidade {
    id: number;
    nome: string;
    estado: Estado;
  }

  export interface Return {
    id: number;
    name: string;
    perfil?: unknown;
    userName: string;
    estado?: string;
    cidade: Cidade;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    telefoneResidencial: string;
    celular?: string;
    email: string;
  }

  export interface Params {
    idPessoa: number | string;
  }
}
