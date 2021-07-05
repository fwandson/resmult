/* eslint-disable @typescript-eslint/no-explicit-any */
import api from 'src/api';
import useSWR, { SWRResponse, SWRConfiguration } from 'swr';
import { AxiosRequestConfig } from 'axios';

interface useApiWithSwrParms {
  url: any;
  axiosRequestConfig?: AxiosRequestConfig;
  swrConfiguration?: SWRConfiguration;
}

export function useApiWithSwr<Data, Error = unknown>(
  parms: useApiWithSwrParms
) {
  const { url, axiosRequestConfig, swrConfiguration } = parms;

  const { data, error, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async (url) => {
      const response = await api.get(url, axiosRequestConfig);
      return response.data;
    },
    swrConfiguration
  );

  return { data, error, mutate, isValidating } as SWRResponse<Data, Error>;
}
