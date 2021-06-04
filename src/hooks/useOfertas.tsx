import { GetOfertasNames } from 'src/resources/turmas/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';
import { useCallback } from 'react';
import { filter, find, ListIterateeCustom } from 'lodash';

interface UseOfertasParams {
  id: number; // id da turma
}

function useOfertas(params: UseOfertasParams) {
  const { id } = params;

  const { data, ...rest } = useApiWithSwr<GetOfertasNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS_OFERTAS.replace(':id', String(id)),
  });

  const findOferta = useCallback(
    (predicate: ListIterateeCustom<GetOfertasNames.OfertasModulo, boolean>) =>
      find(data?.ofertasModulos, predicate),
    [data]
  );

  /**
   * Buscar ofertas pelo nome
   */
  const searchOfertas = useCallback(
    (value: string) =>
      filter(data?.ofertasModulos, (oberta) =>
        oberta.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ),
    [data]
  );

  return { data, findOferta, searchOfertas, ...rest };
}

export default useOfertas;
