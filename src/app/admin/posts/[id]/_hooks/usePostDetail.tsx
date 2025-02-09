import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../../_utils/fetcher";

const usePostDetail = () => {
  const { id } = useParams();
  const URL = `/api/admin/posts/${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher, {
    fallbackData: { post: [] },
  });

  const post = data.post;

  return { post, error, isLoading };
};

export default usePostDetail;
