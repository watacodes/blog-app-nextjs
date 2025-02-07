import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("failed to fetch post");
    } else {
      const result = await res.json();
      const formattedPost = {
        ...result.post,
        categories: result.post.postCategories.map((cat) => ({
          id: cat.category.id,
          name: cat.category.name,
        })),
      };
      return formattedPost;
    }
  } catch (e) {
    console.error(e);
  }
};

const usePost = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/posts/${id}`, fetcher);

  return { post: data, isLoading, error };
};

export default usePost;
