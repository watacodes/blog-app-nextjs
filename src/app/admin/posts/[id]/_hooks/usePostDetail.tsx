import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePostDetail = () => {
  const { id } = useParams();
  const URL = `/api/admin/posts/${id}`;
  const { error, isLoading, data } = useSWR(URL, fetcher);

  return { data, error, isLoading };
};

export default usePostDetail;
