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
    <Link
      href={href}
      className={`p-4 hover:bg-blue-100 ${isSelected(href) && "bg-blue-100"}`}
    >
      {children}
    </Link>
  );
};

const AdminSideBar: React.FC = () => {
  return (
    <aside className="flex flex-col w-[280px] bg-gray-100">
      <MenuItem href="/admin/posts">記事一覧</MenuItem>
      <MenuItem href="/admin/categories">カテゴリー一覧</MenuItem>
    </aside>
  );
};

export default AdminSideBar;
