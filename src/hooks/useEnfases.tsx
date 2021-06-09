import { GetNames } from 'src/resources/enfases/types';
import RESOURCE_URLS from 'src/resources/names';
import { useApiWithSwr } from './useApiWithSwr';

function useEnfases() {
  const { data, ...rest } = useApiWithSwr<GetNames.Return>({
    url: RESOURCE_URLS.GET_ENFASES,
  });

  return { data, ...rest };
}

export default useEnfases;
