import RESOURCE_URLS from 'src/resources/names';
import { GetNames } from 'src/resources/tiposCargaHoraria/types';
import { useApiWithSwr } from './useApiWithSwr';

function useTiposCargaHoraria() {
  const { data } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS_OFERTAS,
    swrConfiguration: {
      refreshInterval: 2 * 60 * 60 * 1000, // horas * minutos * segundos * milesegundos
    },
  });

  return { data };
}

export default useTiposCargaHoraria;
