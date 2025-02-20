"use client";

import { useParams, useRouter } from "next/navigation";
import useAdminPostDetail from "./_hooks/useAdminPostDetail";
import { AdminPost } from "../../_components/AdminPost";
import { PostType } from "../../../_types/PostType";
import Loading from "../../../_components/Loading";
import ErrorComponent from "../../../_components/Error";
import useSupabaseSession from "../../../_hooks/useSupabaseSession";
import { api } from "../../../_utils/api";

const AdminPostEditPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();

  const { post, error, isLoading } = useAdminPostDetail();

  const handleUpdate = async (post: PostType) => {
    try {
      const res = await api.put({
        url: `/api/admin/posts/${id}`,
        token,
        body: post,
      });

      console.log("The post has been updated: ", res);
      router.push("/admin/posts");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete({ url: `/api/admin/posts/${id}`, token });

      console.log("Deleted: ", res);

      router.push("/admin/posts");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
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
