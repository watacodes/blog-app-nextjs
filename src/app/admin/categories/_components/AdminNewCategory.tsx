"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const schema = yup.object({
  name: yup.string().required(),
});

export const AdminNewCategory: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

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
    <div className="flex w-full">
      <div className="flex flex-col w-full py-4 px-8">
        <h1 className="font-bold text-2xl mb-10">カテゴリー作成</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-md text-gray-600 mb-2">
              カテゴリー名
            </label>
            <input
              type="text"
              id="name"
              disabled={isSubmitting}
              className="border border-solid rounded-sm p-2 border-gray-300 w-full mb-4"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-purple-600 rounded-md px-3 py-1 mr-2"
          >
            作成
          </button>
        </form>
      </div>
    </div>
  );
};
