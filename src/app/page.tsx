"use client";

import { DisplayPostType } from "./_types/DispalyPostType";
import Loading from "./_components/Loading";
import PostCard from "./_components/PostCard";
import ErrorComponent from "./_components/Error";
import usePostList from "./_hooks/usePostList";

const Posts: React.FC = () => {
  const { posts, error, isLoading } = usePostList();

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="w-screen h-svh flex flex-col items-center pt-10">
      <ul className="justify-center items-center w-[800px]">
        {posts.map((post: DisplayPostType) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
