import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePosts = () => {
  const URL = "/api/admin/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { data, isLoading, error };
};

export default usePosts;
