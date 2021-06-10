import { find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import { GetNames } from 'src/resources/enfases/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';

function useEnfases() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return[]>({
    url: RESOURCE_URLS.GET_ENFASES,
  });

  const findEnfase = useCallback(
    (predicate: ListIterateeCustom<GetNames.Return, boolean>) =>
      find(data, predicate),
    [data]
  );

  return { data, findEnfase, ...rest };
}

export default useEnfases;
