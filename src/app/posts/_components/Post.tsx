"use client";

import dayjs from "dayjs";
import CategoryButton from "@/app/posts/_components/CategoryButton";
import { PostData } from "@/app/_types/types";
import Link from "next/link";

type Props = {
  post: PostData;
};

const Post: React.FC<Props> = ({ post }) => {
  const date: string = dayjs(post.createdAt).format("MM/DD/YYYY");

  return (
    <Link href={`/posts/${post.id}`}>
      <li
        key={post.id}
        className="border border-solid border-gray-300 rounded-md p-4 my-8"
      >
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">{date}</div>
          <div className="flex">
            {post.categories.map((name, idx) => {
              return <CategoryButton key={idx} name={name} />;
            })}
          </div>
        </div>
        <h1 className="text-2xl py-4">{post.title}</h1>
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </li>
    </Link>
  );
};
export default Post;
