"use client";

import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import AdminSideBar from "./AdminSideBar";

// const buttonProperty = {
//   color: "bg-purple-600",
//   text: ["作成"],
//   fontColor: "white",
// };

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "console";

type CreatePost = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};

export const AdminNewPost: React.FC = () => {
  const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    thumbnailUrl: yup.string().required(),
    categories: yup.array().of(
      yup.object({
        id: yup.number().required(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
  });

  const onSubmit = async (post: CreatePost) => {
    const formattedPost = {
      ...post,
      categories: post.categories.map((id) => Number(id)),
    };

    try {
      const res = await fetch("http://localhost:3000/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedPost),
      });

      const result = await res.json();
      console.log("The data has been submitted: ", result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col w-full py-4 px-8">
        <h1 className="font-bold text-2xl mb-10">記事作成</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md text-gray-600 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              className="border border-solid rounded-sm p-2 border-gray-300"
              {...register("title")}
            />
            <p>{errors.title?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-md text-gray-600 my-2">
              内容
            </label>
            <input
              type="text"
              id="content"
              className="border border-solid rounded-sm p-2 border-gray-300"
              {...register("content")}
            />
            <p>{errors.content?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-md text-gray-600 my-2">
              サムネイルURL
            </label>
            <input
              type="text"
              id="thumbnail"
              className="border border-solid rounded-sm p-2 border-gray-300"
              {...register("thumbnailUrl")}
            />
            <p>{errors.thumbnailUrl?.message}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="text-md text-gray-600 my-2">
              カテゴリー
            </label>
            <select
              multiple
              defaultValue={[]}
              className="border border-solid rounded-sm p-3 border-gray-300"
              {...register("categories")}
            >
              <option value="1">React</option>
              <option value="2">TypeScript</option>
            </select>
            <p>{errors.categories?.message}</p>
          </div>
          <button
            type="submit"
            className="text-white bg-purple-600 bg-rounded-sm px-3 py-1 mr-2"
          >
            作成
          </button>
        </form>
      </div>
    </div>
  );
};
