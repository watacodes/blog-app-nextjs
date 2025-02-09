import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const usePosts = () => {
  const URL = "/api/admin/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { data, isLoading, error };
};

export default usePosts;
