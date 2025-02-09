import useSWR from "swr";
import { fetcher } from "../../../_utils/fetcher";

const usePost = (id: string) => {
  const URL = `/api/posts/${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher);

  const post = data?.post;

  return { post, error, isLoading };
};

export default usePost;
