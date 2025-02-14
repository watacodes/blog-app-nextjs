"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../../_utils/fetcher";
import { PostDetailResponse } from "../../../../_types/PostDetailResponse";
import useSupabaseSession from "../../../../_hooks/useSupabaseSession";

const useAdminPostDetail = () => {
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const URL = `/api/admin/posts/${id}`;

  const { data, error, isLoading } = useSWR(
    token ? [URL, token] : null,
    ([url, token]) => fetcher<PostDetailResponse>({ url, token })
  );

  const post = data?.post;

  return { post, error, isLoading };
};

export default useAdminPostDetail;
