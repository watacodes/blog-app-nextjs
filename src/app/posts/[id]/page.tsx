"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import CategoryButton from "@/app/posts/_components/CategoryButton";
import NotFound from "@/app/_components/NotFound";
import Loading from "@/app/_components/Loading";
import Image from "next/image";
import dayjs from "dayjs";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        // const res = await fetch(
        //   `https://lczfym7uqu.microcms.io/api/v1/posts/${id}`,
        //   {
        //     headers: {
        //       "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
        //     },
        //   }
        // );

        const res = await fetch(`https://localhost:3000/app/posts/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the post.");
        }

        const data: MicroCmsPost = await res.json();
        console.log("this is the post", data);
        setPost(data);
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
              src={post.thumbnail.url}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              alt="A thumbnail of the post"
            />
          </div>
          <div className="p-3">
            <div className="flex justify-between">
              <div className="text-sm text-gray-400">{date}</div>
              <div className="flex px-4">
                {post.categories.map((category, idx) => {
                  return <CategoryButton key={idx} name={category.name} />;
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
