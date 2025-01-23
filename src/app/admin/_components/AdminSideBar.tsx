"use client";

import Link from "next/link";

const AdminSideBar: React.FC = () => {
  return (
    <ul className="w-1/5 h-screen bg-gray-200 flex flex-col">
      <Link href="/admin/posts" className="p-4 ">
        記事一覧
      </Link>
      <Link href="/admin/categories" className="p-4">
        カテゴリー一覧
      </Link>
    </ul>
  );
};

export default AdminSideBar;
