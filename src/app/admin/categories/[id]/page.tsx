"use client";

import { useParams, useRouter } from "next/navigation";
import { CategoryFormData } from "../types/types";
import CategoryEditForm from "../_components/AdminCategoryEditForm";
import { useState, useEffect } from "react";

const Page: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<CategoryFormData | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch category name.");
        }

        const { data } = await res.json();
        setInitialData({ category: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, [id]);

  const handleUpdate = async (data: CategoryFormData) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.category }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the category name.");
      }

      const result = await res.json();
      console.log(result);
      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/categories");
      } else {
        console.error("Failed to delete category.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full p-4">
      <CategoryEditForm
        initialData={initialData}
        onDelete={handleDelete}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default Page;
