"use client";

import { useParams, useRouter } from "next/navigation";
import usePostDetail from "./_hooks/usePostDetail";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";
import Loading from "../../../_components/Loading";
import ErrorComponent from "../../../_components/Error";

const AdminPostEditPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { post, error, isLoading } = usePostDetail();

  const handleUpdate = async (post: PostType) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const result = await res.json();
      console.log("The post has been updated: ", result);
      router.push("/admin/posts");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/posts");
      } else {
        console.error("Failed to delete post.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <AdminPost
      initialPostData={post}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default AdminPostEditPage;
