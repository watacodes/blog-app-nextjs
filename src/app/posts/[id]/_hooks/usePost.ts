"use client";

import useSWR from "swr";
import { FetcherProps } from "./../../../_types/FetcherProps";
import { PostDetailResponse } from "../../../_types/PostDetailResponse";

const fetcher = async <T>({ url }: FetcherProps): Promise<T> => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("data", data); // 2) This returns the actual data

    return data as T;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const usePost = (id: string) => {
  const URL = `/api/posts/${id}`;
  const { data, error, isLoading } = useSWR(URL, (url) =>
    fetcher<PostDetailResponse>({ url })
  );

  const post = data?.post;

  console.log("fetched post: ", post); // 1) However, this returns undefined

  return { post, error, isLoading };
};

export default usePost;
