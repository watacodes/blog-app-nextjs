"use client";

import { useParams } from "next/navigation";
import { PostDetailResponse } from "../../../../_types/PostDetailResponse";
import useFetch from "../../../../_hooks/useFetch";

const useAdminPostDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useFetch<PostDetailResponse>(
    `/api/admin/posts/${id}`
  );

  const post = data?.post;

  return { post, error, isLoading };
};

export default useAdminPostDetail;
