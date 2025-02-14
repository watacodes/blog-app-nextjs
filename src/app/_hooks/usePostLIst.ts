import { FetcherProps } from "../_types/FetcherProps";
import { PostResponse } from "./../_types/PostResponse";
import useSWR from "swr";

const fetcher = <T>({ url }: FetcherProps): Promise<T> =>
  fetch(url).then((res) => res.json());

const usePostList = () => {
  const URL = "/api/posts";
  const { data, error, isLoading } = useSWR(URL, (url) =>
    fetcher<PostResponse>({ url })
  );

  const posts = data?.posts || [];

  return { posts, isLoading, error };
};

export default usePostList;
