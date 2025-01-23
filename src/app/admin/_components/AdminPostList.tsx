"use client";

import Link from "next/link";
import NewPostEditPage from "../posts/new/page";

const AdminPostList = () => {
  // TODO: After implementing the GET method to fetch all the posts,
  //       pass the params(id) so that a new article can be edited/issued.

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
      <div>ARTICLES COME HERE</div>
    </div>
  );
};

export default AdminPostList;
