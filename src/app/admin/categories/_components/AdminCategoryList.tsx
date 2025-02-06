"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../../_components/Loading";
import { Category } from "../../../_types/PostType";
import useCategoryList from "../../../_hooks/useCategoryList";

const AdminCategoryList: React.FC = () => {
  const { categoryList, isLoading } = useCategoryList();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between mb-10">
        <h2 className="font-bold text-xl">カテゴリー一覧</h2>

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
              className="w-full font-bold p-4 border-solid border-b-2 hover:bg-slate-100 transition-all"
              key={category.id}
            >
              <Link href={`/admin/categories/${category.id}`}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminCategoryList;
