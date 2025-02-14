"use client";

import { useRouteGuard } from "./_hooks/useRouteGuard";
import AdminSideBar from "./_components/AdminSideBar";

const AdminLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  useRouteGuard();

  return (
    <div className="flex flex-1">
      <AdminSideBar />
      <div className="ml-[280px] p-8 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
