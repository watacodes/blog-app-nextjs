"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItemProps = {
  href: string;
  children: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isSelected = (href: string) => pathname.includes(href);

  return (
    <li>
      <Link
        href={href}
        className={`p-4 block hover:bg-blue-100 ${
          isSelected("/admin/posts") && "bg-blue-100"
        }`}
      >
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
