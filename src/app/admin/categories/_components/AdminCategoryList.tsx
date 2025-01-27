"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CategoryProps = {
  name: string;
  id: number;
};

const AdminCategoryList: React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/categories", {
          method: "GET",
        });

        const { categories } = await res.json();
        console.log(categories);
        setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetcher();
  }, []);

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between mb-10">
        <h2 className="font-bold text-xl">カテゴリー一覧</h2>

        {/* TODO: Add create button to add a new category */}
        <Link href="./categories/new">
          <button className="text-white bg-blue-600 rounded-sm px-3 py-1 text-md">
            新規作成
          </button>
        </Link>
      </div>
      <ul>
        {categoryList.map((category) => {
          return (
            <li
              className="w-full font-bold p-4 border-solid border-b-2"
              key={category.id}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminCategoryList;
