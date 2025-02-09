import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const usePostList = () => {
  const URL = "/api/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { data, isLoading, error };
};

export default usePostList;
