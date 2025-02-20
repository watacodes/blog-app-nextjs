"use client";

import { useParams, useRouter } from "next/navigation";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";
import CategoryEditForm from "../_components/AdminCategoryEditForm";
import { api } from "../../../_utils/api";
import useFetch from "../../../_hooks/useFetch";
import { CategoryFormData, CategoryResponse } from "../types/CategoryResponse";
import Loading from "../../../_components/Loading";

const Page: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { data, isLoading } = useFetch<CategoryResponse>(
    `/api/admin/categories/${id}`
  );

  if (isLoading) return <Loading />;

  const category = data?.category ? { category: data.category } : null;

  const handleUpdate = async (category: CategoryFormData) => {
    try {
      const res = await api.put({
        url: `/api/admin/categories/${id}`,
        token,
        body: category,
      });

      console.log("The category has been updated: ", res);
      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete({
        url: `/api/admin/categories/${id}`,
        token,
      });

      console.log("The category has been deleted: ", res);
      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full p-4">
      <CategoryEditForm
        initialData={category}
        onDelete={handleDelete}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default Page;
