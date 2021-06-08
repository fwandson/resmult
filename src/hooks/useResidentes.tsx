import { filter, find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import RESOURCE_URLS from 'src/resources/names';
import { GetResidentesNames } from 'src/resources/turmas/types';
import { useApiWithSwr } from './useApiWithSwr';
interface UseResidentesParams {
  idTurma: number | string;
  idOferta: number | string;
}

function useResidentes(params: UseResidentesParams) {
  const { idTurma, idOferta } = params;

  const { data, ...rest } = useApiWithSwr<GetResidentesNames.Return>({
    url: RESOURCE_URLS.GET_OFERTA_RESIDENTES.replace(
      ':idTurma',
      String(idTurma)
    ).replace(':idOferta', String(idOferta)),
  });

  const turma = data?.residentes[0]?.turma || ({} as GetResidentesNames.Turma);

  /**
   * Encontra um residente
   */
  const findResidente = useCallback(
    (predicate?: ListIterateeCustom<GetResidentesNames.Residente, boolean>) =>
      find(data?.residentes, predicate),
    [data]
  );

  /**
   * Filtra residentes
   */
  const filterResidentes = useCallback(
    (predicate?: ListIterateeCustom<GetResidentesNames.Residente, boolean>) =>
      filter(data?.residentes, predicate),
    [data]
  );

  /**
   * Buscar residentes pelo nome
   */
  const searchResidentes = useCallback(
    (value: string) =>
      filter(data?.residentes, (residente) =>
        residente.person.name
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase())
      ),
    [data]
  );

  return {
    data,
    turma,
    findResidente,
    filterResidentes,
    searchResidentes,
    ...rest,
  };
}

export default useResidentes;
