"use client";

import { useRouter } from "next/navigation";
import CategoryEditForm from "../_components/AdminCategoryEditForm";
import { api } from "../../../_utils/api";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";

const Page: React.FC = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();

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
      console.error(error);
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
