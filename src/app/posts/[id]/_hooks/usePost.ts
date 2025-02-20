"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePost = (id: string) => {
  const URL = `/api/posts/${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher);

  const post = data?.post;

  return { post, error, isLoading };
};

export default usePost;
