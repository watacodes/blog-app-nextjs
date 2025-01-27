"use client";

import Link from "next/link";
// import NewPostEditPage from "../posts/new/page";
import { useState, useEffect } from "react";
import { MicroCmsPost } from "../../_types/MicroCmsPost";
import { CustomError } from "../../_types/CustomError";
import dayjs from "dayjs";

const AdminPostList = () => {
  // TODO: After implementing the GET method to fetch all the posts,
  //       pass the params(id) so that a new article can be edited/issued.

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

        const res = await fetch("http://localhost:3000/api/admin/posts", {
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
              {post.title}
              <div className="text-sm font-light text-gray-400 mb-2">
                {date}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminPostList;
