"use client";

import useSWR from "swr";
import useSupabaseSession from "./useSupabaseSession";
import { PostResponse } from "../_types/PostResponse";
import { fetcher } from "../_utils/fetcher";

const useAdminPosts = () => {
  const { token } = useSupabaseSession();
  const URL = "/api/admin/posts";
  const { data, error, isLoading } = useSWR(
    token ? [URL, token] : null,
    ([url, token]) => fetcher<PostResponse>({ url, token })
  );

  const posts = data?.posts || [];

  return { posts, error, isLoading };
};

export default useAdminPosts;
