import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const useCategories = () => {
  const URL = "/api/admin/categories";
  const { data, error, isLoading } = useSWR(URL, fetcher, {
    fallbackData: { categories: [] },
  });

  const categories = data.categories;

  return { categories, error, isLoading };
};

export default useCategories;
