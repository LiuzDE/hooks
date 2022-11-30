import { useState, useCallback, useEffect } from "react";

type UseFetcherArgs = {
  input: RequestInfo | URL;
  init?: Omit<RequestInit, "signal">;
  triggerOnMount?: boolean;
};

export const useFetcher = <T>({
  input,
  init,
  triggerOnMount = true,
}: UseFetcherArgs) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [input, init]);

  useEffect(() => {
    if (triggerOnMount) {
      refetch();

      return () => {
        controller.abort();
      };
    }
  }, [triggerOnMount, refetch]);

  return { response, error, isLoading, refetch };
};
