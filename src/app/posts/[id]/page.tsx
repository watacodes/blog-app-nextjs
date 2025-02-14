"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import usePost from "./_hooks/usePost";
import Loading from "../../_components/Loading";
import Image from "next/image";
import dayjs from "dayjs";
import ErrorComponent from "../../_components/Error";
import { supabase } from "../../../_utils/supabase";

type Param = {
  id: string;
};

const PostDetails: React.FC = () => {
  const { id } = useParams() as Param;
  const { post, isLoading, error } = usePost(id);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(
    null
  );

  console.log(post);
  // useEffect(() => {
  //   if (!thumbnailImageKey) return;

  //   const fetcher = async () => {
  //     const {
  //       data: { publicUrl },
  //     } = await supabase.storage
  //       .from("post_thumbnail")
  //       .getPublicUrl(thumbnailImageKey);
  //     console.log("public url: ", publicUrl);

  //     setThumbnailImageUrl(publicUrl);
  //   };

  //   fetcher();
  // }, [thumbnailImageKey]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;
  const date: string = dayjs(post.createdAt).format("MM/DD/YYYY");

  return (
    <div className="flex flex-col p-2 items-center">
      <div className="items-center w-[800px]">
        <div className="mt-10 mb-5">
          {/* <Image
            className="h-auto max-w-full"
            src={post.thumbnailImageKey}
            width={800}
            height={400}
            alt="A thumbnail of the post"
          /> */}
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">{date}</div>
            <div className="flex px-4">
              {post.categories.map((category, idx) => {
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
