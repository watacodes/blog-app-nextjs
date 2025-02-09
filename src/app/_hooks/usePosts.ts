import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const usePosts = () => {
  const URL = "/api/admin/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher, {
    fallbackData: { posts: [] },
  });

  console.log(data);

  const posts = data.posts;

  return { posts, error, isLoading };
};

export default usePosts;
