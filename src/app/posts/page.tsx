"use client";

import { useEffect, useState } from "react";
import { CustomError } from "../_types/types";
import Error from "../_components/Error";
import Loading from "@/app/_components/Loading";
import { PostData } from "../_types/types";
import Post from "./_components/Post";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
        );
        const data = await res.json();
        setPosts(data.posts);
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
        {posts.map((post: PostData) => {
          return <Post post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
