import { filter, find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import RESOURCE_URLS from 'src/resources/names';
import { GetNames } from 'src/resources/turmas/types';
import { useApiWithSwr } from './useApiWithSwr';

function useTurmas() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS,
  });

  /**
   * Encontra uma turma
   */
  const findTurma = useCallback(
    (predicate: ListIterateeCustom<GetNames.Turma, boolean>) =>
      find(data?.turmas, predicate),
    [data]
  );

  /**
   * Filtra as turmas
   */
  const filterTurmas = useCallback(
    (predicate?: ListIterateeCustom<GetNames.Turma, boolean>) =>
      filter(data?.turmas, predicate),
    [data]
  );

  return { data, findTurma, filterTurmas, ...rest };
}

export default useTurmas;
