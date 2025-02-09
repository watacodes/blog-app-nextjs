import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";

const useCategories = () => {
  const URL = "/api/admin/categories";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { data, isLoading, error };
};

export default useCategories;
