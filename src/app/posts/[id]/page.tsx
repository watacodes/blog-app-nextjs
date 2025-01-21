"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PostData } from "@/app/_types/types";
import dayjs from "dayjs";
import NotFound from "@/app/_components/NotFound";
import Loading from "@/app/_components/Loading";
import CategoryButton from "@/app/posts/_components/CategoryButton";
import Image from "next/image";

type PostResponse = {
  post: PostData;
};

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch the post.");
        }
        const { post }: PostResponse = await res.json();
        console.log("this is the post", post);
        setPost(post);
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
    <div>
      <div className="flex flex-col justify-center items-center p-2">
        <div>
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
                {post.categories.map((name, idx) => {
                  return <CategoryButton key={idx} name={name} />;
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
    </div>
  );
};

export default PostDetails;
