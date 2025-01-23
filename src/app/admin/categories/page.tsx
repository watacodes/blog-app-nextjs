"use client";

import AdminSideBar from "../_components/AdminSideBar";
import AdminCategoryList from "./_components/AdminCategoryList";

// /admin/categories

const AdminCategoryPage: React.FC = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminCategoryList />
    </div>
  );
};

export default AdminCategoryPage;
