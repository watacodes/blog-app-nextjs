import { useState, useEffect } from "react";
import { PostType } from "../_types/PostType";
import { CustomError } from "../_types/CustomError";

const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/posts", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Could not fetch posts.");
        }
        const { posts } = await res.json();
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  return { posts, isLoading, error };
};

export default usePosts;
