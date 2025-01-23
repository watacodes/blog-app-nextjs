"use client";

import AdminSideBar from "../_components/AdminSideBar";
import AdminPostList from "../_components/AdminPostList";

// /admin/posts

const AdminArticlePage: React.FC = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <AdminPostList />
    </div>
  );
};

export default AdminArticlePage;
