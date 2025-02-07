"use client";

import { useEffect, useState } from "react";
import { CustomError } from "./_types/CustomError";
import { DisplayPostType } from "./_types/DispalyPostType";
import Loading from "./_components/Loading";
import PostCard from "./_components/PostCard";
import ErrorComponent from "./_components/Error";
import usePostList from "./_hooks/usePostLIst";

const Posts: React.FC = () => {
  const { data, error, isLoading } = usePostList();
  console.log(data);
  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="w-screen h-svh flex flex-col items-center pt-10">
      <ul className="justify-center items-center w-[800px]">
        {data.posts.map((post: DisplayPostType) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
