import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useCategories = () => {
  const URL = "/api/admin/categories";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { categories: data, isLoading, error };
};

export default useCategories;
