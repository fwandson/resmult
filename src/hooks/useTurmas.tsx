import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';
import { GetNames } from 'src/resources/turmas/types';

function useTurmas() {
  const { ...rest } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS,
  });

  return { ...rest };
}

export default useTurmas;
