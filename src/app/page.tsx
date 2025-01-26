"use client";

import { useEffect, useState } from "react";
import Post from "./posts/_components/Post";
import { CustomError } from "./_types/CustomError";
import { MicroCmsPost } from "./_types/MicroCmsPost";
import Error from "./_components/Error";
import Loading from "./_components/Loading";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        /* const res = await fetch("https://lczfym7uqu.microcms.io/api/v1/posts", {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
          },
        }); */

        const res = await fetch("https://localhost:3000/app/posts", {
          method: "GET",
        });
        console.log(res);
        const { contents } = await res.json();
        console.log(contents);
        setPosts(contents);
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
        {posts.map((post: MicroCmsPost) => {
          return <Post post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
