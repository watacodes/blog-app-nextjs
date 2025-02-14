"use client";

import useSWR from "swr";
import { FetcherProps } from "./../../../_types/FetcherProps";
import { PostDetailResponse } from "../../../_types/PostDetailResponse";

const fetcher = <T>({ url }: FetcherProps): Promise<T> =>
  fetch(url).then((res) => res.json());

const usePost = (id: string) => {
  const URL = `/api/posts/${id}`;
  const { data, error, isLoading } = useSWR(URL, (url) =>
    fetcher<PostDetailResponse>({ url })
  );

  const post = data?.post;

  return { post, error, isLoading };
};

export default usePost;
