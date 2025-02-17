"use client";

import Link from "next/link";
import dayjs from "dayjs";
import useAdminPosts from "../../_hooks/useAdminPosts";
import Loading from "../../_components/Loading";
import ErrorComponent from "../../_components/Error";
import useSupabaseSession from "../../_hooks/useSupabaseSession";
import { useEffect } from "react";

const AdminPostList: React.FC = () => {
  const { posts, error, isLoading } = useAdminPosts();
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
  }, [token]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between mb-10">
        <h2 className="flex items-center font-bold text-xl">記事一覧</h2>
        <Link href="/admin/posts/new">
          <button className="text-white bg-blue-600 rounded-sm px-3 py-1 text-md">
            新規作成
          </button>
        </Link>
      </div>
      <ul>
        {posts.map((post) => {
          const date = dayjs(post.createdAt).format("YYYY/M/D");
          return (
            <li
              className="font-bold border-solid border-b-2 p-4 hover:bg-slate-100 transition-all"
              key={post.id}
            >
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
