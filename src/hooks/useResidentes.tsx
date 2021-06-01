import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';
import { GetResidentesNames } from 'src/resources/turmas/types';

interface UseResidentesParams {
  idTurma: number;
  idOferta: number;
}

function useResidentes(params: UseResidentesParams) {
  const { idTurma, idOferta } = params;

  const { data, ...rest } = useApiWithSwr<GetResidentesNames.Return>({
    url: RESOURCE_URLS.GET_OFERTA_RESIDENTES.replace(
      ':idTurma',
      String(idTurma)
    ).replace(':idOferta', String(idOferta)),
  });

  const turma = data?.residentes[0].turma;

  return { data, turma, ...rest };
}

export default useResidentes;
