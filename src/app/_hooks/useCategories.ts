"use client";

import { CategoriesResponse } from "../_types/CategoriesResponse";
import useFetch from "./useFetch";

const useCategories = () => {
  const { data, error, isLoading } = useFetch<CategoriesResponse>(
    "/api/admin/categories"
  );

  const categories = data?.categories ?? [];

  return { categories, error, isLoading };
};

export default useCategories;
