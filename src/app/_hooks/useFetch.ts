import useSupabaseSession from "./useSupabaseSession";
import { fetcher } from "../_utils/fetcher";
import useSWR from "swr";

const useFetch = <T>(url: string) => {
  const { token } = useSupabaseSession();
  const { data, error, isLoading } = useSWR(
    token ? [url, token] : null,
    ([url, token]) => fetcher<T>({ url, token })
  );

  return { data, error, isLoading };
};

export default useFetch;
