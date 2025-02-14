"use client";

import { useRouter } from "next/navigation";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";
import { CustomError } from "../../../_types/CustomError";
import { useState } from "react";
import ErrorComponent from "../../../_components/Error";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";

const NewPostPage: React.FC = () => {
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [error, isError] = useState<CustomError | null>(null);

  const handleCreate = async (post: PostType) => {
    try {
      const res = await fetch("/api/admin/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        throw new Error("Failed to create post.");
      }
      const result = await res.json();
      console.log("The data has been submitted: ", result);
      router.push("/admin/posts");
    } catch (error) {
      if (error instanceof Error) isError(error);
    }
  };

  if (error) return <ErrorComponent error={error} />;

  return <AdminPost onSubmit={handleCreate} />;
};

export default NewPostPage;
