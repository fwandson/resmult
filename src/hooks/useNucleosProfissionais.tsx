import { find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import { GetNames } from 'src/resources/nucleosProfissionais/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';

function useNucleosProfissionais() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return[]>({
    url: RESOURCE_URLS.GET_NUCLEOS_PROFISSIONAIS,
    swrConfiguration: {
      refreshInterval: 2 * 60 * 60 * 1000, // horas * minutos * segundos * milesegundos
      initialData: [],
    },
  });

  const findNucleosProfissionais = useCallback(
    (predicate: ListIterateeCustom<GetNames.Return, boolean>) =>
      find(data, predicate),
    [data]
  );

  return { data, findNucleosProfissionais, ...rest };
}

export default useNucleosProfissionais;
