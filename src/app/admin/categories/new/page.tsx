"use client";

import { useRouter } from "next/navigation";
import CategoryEditForm from "../_components/AdminCategoryEditForm";

const Page: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (category) => {
    try {
      const res = await fetch("/api/admin/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const result = await res.json();
      console.log("Category: ", result);
      router.push("/admin/categories");
    } catch (error) {
      throw new Error("POST request failed.");
    }
  };

  return (
    <div className="flex flex-col w-full p-4">
      <CategoryEditForm onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
