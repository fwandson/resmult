import { GetOfertasNames } from 'src/resources/turmas/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';

interface UseOfertasParams {
  id: number;
}

function useOfertas(params: UseOfertasParams) {
  const { id } = params;

  const { ...rest } = useApiWithSwr<GetOfertasNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS_OFERTAS.replace(':id', String(id)),
  });

  return { ...rest };
}

export default useOfertas;
