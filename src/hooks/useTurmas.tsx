import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';
import { GetNames } from 'src/resources/turmas/types';
import { find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';

function useTurmas() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS,
  });

  const findTurma = useCallback(
    (predicate: ListIterateeCustom<GetNames.Turma, boolean>) =>
      find(data?.turmas, predicate),
    [data]
  );

  return { data, findTurma, ...rest };
}

export default useTurmas;
