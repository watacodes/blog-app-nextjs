"use client";

import { useRouter } from "next/navigation";
import CategoryEditForm from "../_components/AdminCategoryEditForm";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";
import { api } from "../../../_utils/api";

const Page: React.FC = () => {
  const { token } = useSupabaseSession();
  const router = useRouter();

  const onSubmit = async (category) => {
    try {
      const res = await api.post({
        url: "/api/admin/categories/",
        token,
        body: category,
      });

      console.log("The category has been submitted: ", res);
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
