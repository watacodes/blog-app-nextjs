import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePostList = () => {
  const URL = "/api/posts";
  const { data, error, isLoading } = useSWR(URL, fetcher);

  return { data, isLoading, error };
};

export default usePostList;
