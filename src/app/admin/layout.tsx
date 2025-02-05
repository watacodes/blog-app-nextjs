"use client";

import AdminSideBar from "./_components/AdminSideBar";

const AdminLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminSideBar />
      {children}
    </div>
  );
};

export default AdminLayout;
