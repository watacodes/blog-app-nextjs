"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NotFound from "../../_components/NotFound";
import Loading from "../../_components/Loading";
import Image from "next/image";
import dayjs from "dayjs";
import { DisplayPostType } from "../../_types/DispalyPostType";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<DisplayPostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the post.");
        }

        const result = await res.json();
        const formattedPost = {
          ...result.post,
          categories: result.post.postCategories.map((cat) => ({
            id: cat.category.id,
            name: cat.category.name,
          })),
        };
        console.log("this is the post", formattedPost);
        setPost(formattedPost);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [id]);

  if (isLoading) return <Loading />;
  if (!post) return <NotFound />;

  const date: string = dayjs(post.createdAt).format("MM/DD/YYYY");

  return (
    <div className="flex flex-col p-2 items-center">
      <div className="items-center w-[800px]">
        <div className="mt-10 mb-5">
          <Image
            className="h-auto max-w-full"
            src={post.thumbnailUrl}
            width={800}
            height={400}
            alt="A thumbnail of the post"
          />
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">{date}</div>
            <div className="flex px-4">
              {post.categories?.map((category, idx) => {
                return (
                  <button
                    key={idx}
                    className="border border-blue-600 rounded-md px-2 py-1 mx-1 text-sm text-blue-600"
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
          <h1 className="py-5 text-2xl">{post.title}</h1>
          <div
            className="overflow-hidden min-w-fit"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
