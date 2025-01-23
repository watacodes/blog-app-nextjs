"use client";

import { AdminButton } from "./AdminButton";
import AdminSideBar from "./AdminSideBar";

const buttonProperty = {
  color: "bg-purple-600",
  text: ["作成"],
  fontColor: "white",
};

export const AdminNewPost: React.FC = () => {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col w-full py-4 px-8">
        <h1 className="font-bold text-2xl mb-10">記事作成</h1>
        <div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md text-gray-600 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              className="border border-solid rounded-sm p-2 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-md text-gray-600 my-2">
              内容
            </label>
            <input
              type="text"
              id="content"
              className="border border-solid rounded-sm p-2 border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-md text-gray-600 my-2">
              サムネイルURL
            </label>
            <input
              type="text"
              id="thumbnail"
              className="border border-solid rounded-sm p-2 border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="text-md text-gray-600 my-2">
              カテゴリー
            </label>
            <select
              name="category"
              id="category"
              className="border border-solid rounded-sm p-3 border-gray-300"
            >
              <option value="typescript">TypeScript</option>
            </select>
          </div>
          <AdminButton buttonProperty={buttonProperty} />
        </div>
      </div>
    </div>
  );
};
