"use client";

import { usePathname } from "next/navigation";
import { useRouteGuard } from "./_hooks/useRouteGuard";
import AdminSideBar from "./_components/AdminSideBar";
import Link from "next/link";

const AdminLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  useRouteGuard();
  const pathname = usePathname();
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };
  return (
    <div className="flex">
      <aside className="fixed bg-gray-100 w-[280px] left-0 buttom-0 top-[72px]">
        <AdminSideBar />
      </aside>
      <div className="ml-[280px] p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
