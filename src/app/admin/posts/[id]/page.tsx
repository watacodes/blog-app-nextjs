"use client";

import { useParams, useRouter } from "next/navigation";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";
import { useState, useEffect } from "react";
import Loading from "../../../_components/Loading";

const AdminPostEditPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          method: "GET",
        });
        const { post } = await res.json();
        console.log("post: ", post);
        setPost(post);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, [id]);

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

  return (
    <AdminPost
      initialPostData={post}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default AdminPostEditPage;
