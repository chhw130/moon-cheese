import { useEffect, useState } from 'react';

export const useGetApiQuery = <T>(apiRequsetFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const data = await apiRequsetFn();
        setData(data as T);
      } catch (err: unknown) {
        setError(err as Error);
        // throw new Error(err as string);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return { data, isFetching, isError: Boolean(error), error };
};
