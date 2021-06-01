import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';
import { GetResidentesNames } from 'src/resources/turmas/types';

interface UseResidentesParams {
  idTurma: number;
  idOferta: number;
}

function useResidentes(params: UseResidentesParams) {
  const { idTurma, idOferta } = params;

  return useApiWithSwr<GetResidentesNames.Return>({
    url: RESOURCE_URLS.GET_OFERTA_RESIDENTES.replace(
      ':idTurma',
      String(idTurma)
    ).replace(':idOferta', String(idOferta)),
  });
}

export default useResidentes;
