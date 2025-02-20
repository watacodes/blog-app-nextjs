"use client";

import { DisplayPostType } from "./_types/DisplayPostType";
import Loading from "./_components/Loading";
import PostCard from "./_components/PostCard";
import usePostList from "./_hooks/usePostList";
import NotFound from "./_components/NotFound";

const Posts: React.FC = () => {
  const { posts, error, isLoading } = usePostList();

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className="w-screen h-screen flex flex-col items-center pt-10">
      <ul className="justify-center items-center w-[800px]">
        {posts.map((post: DisplayPostType) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
