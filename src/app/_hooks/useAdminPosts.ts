"use client";

import { PostResponse } from "./../_types/PostResponse";
import useFetch from "./useFetch";

const useAdminPosts = () => {
  const { data, error, isLoading } = useFetch<PostResponse>("/api/admin/posts");

  const posts = data?.posts || [];

  return { posts, error, isLoading };
};

export default useAdminPosts;
