import { find, ListIterateeCustom } from 'lodash';
import { useCallback } from 'react';
import RESOURCE_URLS from 'src/resources/names';
import { GetNames } from 'src/resources/tiposCargaHoraria/types';
import { useApiWithSwr } from './useApiWithSwr';

function useTiposCargaHorariaComplementar() {
  const { data, error, isValidating } = useApiWithSwr<GetNames.Return[]>({
    url: RESOURCE_URLS.GET_TIPOS_CARGA_HORARIA_COMPLEMENTAR,
    swrConfiguration: {
      refreshInterval: 2 * 60 * 60 * 1000, // horas * minutos * segundos * milesegundos
    },
  });

  const findTipoCargaHoraria = useCallback(
    (predicate?: ListIterateeCustom<GetNames.Return, boolean>) =>
      find(data, predicate),
    [data]
  );

  return { data, error, isValidating, findTipoCargaHoraria };
}

export default useTiposCargaHorariaComplementar;
