import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../../_utils/fetcher";

const usePostDetail = () => {
  const { id } = useParams();
  const URL = `/api/admin/posts/${id}`;
  const { error, isLoading, data } = useSWR(URL, fetcher);

  return { data, error, isLoading };
};

export default usePostDetail;
