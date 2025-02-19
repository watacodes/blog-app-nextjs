import { PostResponse } from "./../_types/PostResponse";
import useFetch from "./useFetch";

const usePostList = () => {
  const { data, error, isLoading } = useFetch<PostResponse>("/api/posts");

  const posts = data?.posts || [];

  return { posts, isLoading, error };
};

export default usePostList;
