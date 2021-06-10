import { find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import { GetNames } from 'src/resources/enfases/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';

function useEnfases() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return[]>({
    url: RESOURCE_URLS.GET_ENFASES,
    swrConfiguration: {
      refreshInterval: 2 * 60 * 60 * 1000, // horas * minutos * segundos * milesegundos
    },
  });

  const findEnfase = useCallback(
    (predicate: ListIterateeCustom<GetNames.Return, boolean>) =>
      find(data, predicate),
    [data]
  );

  return { data, findEnfase, ...rest };
}

export default useEnfases;
