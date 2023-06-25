import apiClient from './api';
import useSWR from 'swr';

export const useQueryGames = (options) => {
  const key = 'entries';
  const {
    data,
    error,
    isError,
    mutate,
    isValidating,
    isLoading,
  } = useSWR(
    () => key,
    () => apiClient.get('data'),
    options ?? null
  );

  return {
    data,
    error,
    isLoading,
    isError,
    isValidating,
    mutate,
  };
};
