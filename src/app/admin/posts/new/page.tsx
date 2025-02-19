"use client";

import { useRouter } from "next/navigation";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";
import { CustomError } from "../../../_types/CustomError";
import { useState } from "react";
import ErrorComponent from "../../../_components/Error";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";
import { api } from "../../../_utils/api";

const NewPostPage: React.FC = () => {
  const { token } = useSupabaseSession();
  const [error, isError] = useState<CustomError | null>(null);
  const router = useRouter();
  const handleCreate = async (post: PostType) => {
    try {
      const res = await api.post({
        url: "/api/admin/posts/new",
        token,
        body: post,
      });

      console.log("The data has been submitted: ", res);
      router.push("/admin/posts");
    } catch (error) {
      if (error instanceof Error) isError(error);
    }
  };

  if (error) return <ErrorComponent error={error} />;

  return <AdminPost onSubmit={handleCreate} />;
};

export default NewPostPage;
