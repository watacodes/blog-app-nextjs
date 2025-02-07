import { useEffect, useState } from "react";
import { DisplayPostType } from "../../../_types/DispalyPostType";
import { CustomError } from "../../../_types/CustomError";

const usePost = (id: string) => {
  const [post, setPost] = useState<DisplayPostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the post.");
        }

        const result = await res.json();
        const formattedPost = {
          ...result.post,
          categories: result.post.postCategories.map((cat) => ({
            id: cat.category.id,
            name: cat.category.name,
          })),
        };
        console.log("this is the post", formattedPost);
        setPost(formattedPost);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [id]);

  return { post, isLoading, error };
};

export default usePost;
