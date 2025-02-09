"use client";

import Link from "next/link";

type MenuItemProps = {
  href: string;
  children: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, href }) => {
  return (
    <li className="py-8 px-2 hover:bg-slate-300 transition-all">
      <Link href={href} className="p-4">
        {children}
      </Link>
    </li>
  );
};

const AdminSideBar: React.FC = () => {
  return (
    <ul className="w-1/5 h-screen bg-gray-200 flex flex-col">
      <MenuItem href="/admin/posts">記事一覧</MenuItem>
      <MenuItem href="/admin/categories">カテゴリー一覧</MenuItem>
    </ul>
  );
};

export default AdminSideBar;
