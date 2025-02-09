import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const usePostList = () => {
  const URL = "/api/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher, {
    fallbackData: { posts: [] },
  });

  const posts = data.posts;

  return { posts, error, isLoading };
};

export default usePostList;
