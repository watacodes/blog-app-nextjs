import { FetcherProps } from "../_types/FetcherProps";
import { PostResponse } from "./../_types/PostResponse";
import useSWR from "swr";

const fetcher = async <T>({ url }: FetcherProps): Promise<T> => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("fetched: ", data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
};

const usePostList = () => {
  const URL = "/api/posts";
  const { data, error, isLoading } = useSWR(URL, (url) =>
    fetcher<PostResponse>({ url })
  );

  const posts = data?.posts || [];

  return { posts, isLoading, error };
};

export default usePostList;
