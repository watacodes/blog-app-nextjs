"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../../../_components/Loading";

const CategoryEditPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/categories/${id}`,
          {
            method: "GET",
          }
        );
        const result = await res.json();
        setCategory(result.data);
      } catch (error) {
        throw new Error("Failed to fetch.");
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
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

  const handleUpdate = async () => {
    try {
      if (!category.trim()) return;

      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the category name.");
      }

      const result = await res.json();
      router.push("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-2xl font-bold mb-8">カテゴリー編集</h1>

      <div className="w-full">
        <label htmlFor="category" className="text-gray-500">
          カテゴリー名
        </label>
        <input
          className="w-full border border-b rounded-sm py-1 px-2 mb-4"
          type="text"
          id="category"
          value={category || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex">
        <button
          className="bg-purple-600 text-white text-sm rounded-md px-3 py-1 mr-2"
          onClick={handleUpdate}
        >
          更新
        </button>
        <button
          className="bg-red-600 text-white text-sm rounded-md px-3 py-1"
          onClick={handleDelete}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default CategoryEditPage;
