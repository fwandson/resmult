import RESOURCE_URLS from 'src/resources/names';
import { GetNames } from 'src/resources/pessoas/types';
import { useApiWithSwr } from './useApiWithSwr';

interface UsePessoaParams {
  idPessoa: number | string; // id da turma
}

function usePessoa(params: UsePessoaParams) {
  const { idPessoa } = params;

  const { data, ...rest } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_PESSOA.replace(':idPessoa', String(idPessoa)),
  });

  return { data, ...rest };
}

export default usePessoa;
