"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CustomError } from "../../_types/CustomError";
import { PostType } from "../../_types/PostType";
import dayjs from "dayjs";
import Loading from "../../_components/Loading";
import Error from "../../_components/Error";

const AdminPostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/posts", {
          method: "GET",
        });
        const { posts } = await res.json();
        setPosts(posts);
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
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between mb-10">
        <h2 className="font-bold text-xl">記事一覧</h2>
        <Link href="./posts/new">
          <button className="text-white bg-blue-600 rounded-sm px-3 py-1 text-md">
            新規作成
          </button>
        </Link>
      </div>
      <ul>
        {posts.map((post) => {
          const date = dayjs(post.createdAt).format("YYYY/M/D");
          return (
            <li className="font-bold border-solid border-b-2 p-4" key={post.id}>
              <Link href={`/admin/posts/${post.id}`}>
                {post.title}
                <div className="text-sm font-light text-gray-400 mb-2">
                  {date}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminPostList;
