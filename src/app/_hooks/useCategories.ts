"use client";

import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { CategoriesResponse } from "../_types/CategoriesResponse";
import useSupabaseSession from "./useSupabaseSession";

const useCategories = () => {
  const { token } = useSupabaseSession();
  const URL = "/api/admin/categories";
  const { data, error, isLoading } = useSWR(
    token ? [URL, token] : null,
    ([url, token]) => fetcher<CategoriesResponse>({ url, token })
  );

  const categories = data?.categories ?? [];

  return { categories, error, isLoading };
};

export default useCategories;
