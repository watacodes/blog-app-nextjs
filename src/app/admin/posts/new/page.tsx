"use client";

import { useRouter } from "next/navigation";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";

const NewPostPage: React.FC = () => {
  const router = useRouter();

  const handleCreate = async (post: PostType) => {
    try {
      const res = await fetch("/api/admin/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const result = await res.json();
      console.log("The data has been submitted: ", result);
      router.push("/admin/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return <AdminPost onSubmit={handleCreate} />;
};

export default NewPostPage;
