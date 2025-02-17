"use client";

import { useRouter } from "next/navigation";
import CategoryEditForm from "../_components/AdminCategoryEditForm";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";

const Page: React.FC = () => {
  const { token } = useSupabaseSession();
  const router = useRouter();

  const onSubmit = async (category) => {
    try {
      const res = await fetch("/api/admin/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(category),
      });

      const result = await res.json();
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
