import { useEffect, useState } from "react";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const data = await fetcher();
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: (err as Error).message,
          });
        }
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}
