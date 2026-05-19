import { useEffect, useState } from 'react';

export const useGetApiQuery = <T>(apiRequsetFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const data = await apiRequsetFn();
        setData(data as T);
      } catch (err: unknown) {
        throw new Error(err as string);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return { data, isFetching };
};
