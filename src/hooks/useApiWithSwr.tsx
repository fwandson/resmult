import api from 'src/api';
import useSWR, { SWRResponse } from 'swr';
import { AxiosRequestConfig } from 'axios';

interface useApiWithSwrParms {
  url: string;
  axiosRequestConfig?: AxiosRequestConfig;
}

export function useApiWithSwr<Data, Error = unknown>(parms: useApiWithSwrParms) {
  const { url, axiosRequestConfig } = parms;

  const { data, error, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async (url) => {
      const response = await api.get(url, axiosRequestConfig);
      return response.data;
    }
  );

  return { data, error, mutate, isValidating } as SWRResponse<Data, Error>;
}
