"use client";

import { useForm } from "react-hook-form";
import AdminSideBar from "../../_components/AdminSideBar";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const AdminNewCategory: React.FC = () => {
  const schema = yup.object({
    name: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (category) => {
    console.log("cat: ", category);
    try {
      const res = await fetch("http://localhost:3000/api/admin/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const result = await res.json();
      console.log("The category has been submitted: ", result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
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
              className="border border-solid rounded-sm p-2 border-gray-300 w-full mb-4"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>
          <button
            type="submit"
            className="text-white bg-purple-600 rounded-md px-3 py-1 mr-2"
          >
            作成
          </button>
        </form>
      </div>
    </div>
  );
};
