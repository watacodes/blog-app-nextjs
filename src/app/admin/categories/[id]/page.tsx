"use client";

import AdminSideBar from "../../_components/AdminSideBar";
import CategoryEditPage from "./_components/AdminCategoryEditPage";

const Page: React.FC = () => {
  return (
    <div className="flex w-full">
      <AdminSideBar />
      <CategoryEditPage />
    </div>
  );
};

export default Page;
