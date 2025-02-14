"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItemProps = {
  href: string;
  children: React.ReactNode;
  isSelected: (path: string) => boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ children, href, isSelected }) => {
  return (
    <Link
      href={href}
      className={`p-4 block hover:bg-blue-100 ${
        isSelected(href) && "bg-blue-100"
      }`}
    >
      {children}
    </Link>
  );
};

const AdminSideBar: React.FC = () => {
  const pathname = usePathname();
  const isSelected = (href: string) => pathname.includes(href);

  return (
    <aside className="fixed bg-gray-100 w-[280px] left-0 bottom-0 top-[72px]">
      <MenuItem href="/admin/posts" isSelected={isSelected}>
        記事一覧
      </MenuItem>
      <MenuItem href="/admin/categories" isSelected={isSelected}>
        カテゴリー一覧
      </MenuItem>
    </aside>
  );
};

export default AdminSideBar;
