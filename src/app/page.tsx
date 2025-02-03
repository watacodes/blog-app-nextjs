"use client";

import { useEffect, useState } from "react";
import { CustomError } from "./_types/CustomError";
import { DisplayPostType } from "./_types/DispalyPostType";
import Error from "./_components/Error";
import Loading from "./_components/Loading";
import PostCard from "./_components/PostCard";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<DisplayPostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);

      try {
        const res = await fetch("/api/posts", {
          method: "GET",
        });
        console.log(res);
        const { posts } = await res.json();
        const formattedPosts = posts.map((post) => ({
          ...post,
          categories: post.postCategories.map((cat) => ({
            id: cat.category.id,
            name: cat.category.name,
          })),
        }));
        setPosts(formattedPosts);
      } catch (error: any) {
        if (error.message && error.code) {
          setError(error);
        } else {
          const fallbackError: CustomError = {
            message: error.message || "Unexpected Error occured.",
            code: error.code || 500,
          };
          setError(fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="w-screen h-svh flex flex-col items-center pt-10">
      <ul className="justify-center items-center w-[800px]">
        {posts.map((post: DisplayPostType) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
