"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePostList = () => {
  const { data, error, isLoading } = useSWR("/api/posts", fetcher);

  const posts = data?.posts || [];

  return { posts, isLoading, error };
};

export default usePostList;
