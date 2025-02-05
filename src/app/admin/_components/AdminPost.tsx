"use client";

import { useEffect } from "react";
import { InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminCategorySelect from "./AdminCategorySelect";
import { PostType } from "../../_types/PostType";

type Props = {
  initialPostData?: PostType;
  onSubmit: (post: PostType) => void;
  onDelete?: () => void;
};

const schema = yup.object({
  title: yup.string().min(1).required(),
  content: yup.string().min(10).required(),
  thumbnailUrl: yup.string().required(),
  postCategories: yup.array().of(
    yup.object({
      categoryId: yup.number().required(),
    })
  ),
});

export const AdminPost: React.FC<Props> = ({
  initialPostData,
  onSubmit,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostType>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
    defaultValues: initialPostData || {
      title: "",
      content: "",
      thumbnailUrl: "https://placehold.jp/800x400.png",
      postCategories: [],
    },
  });

  useEffect(() => {
    if (initialPostData) {
      reset(initialPostData);
    }
  }, [initialPostData, reset]);

  return (
    <>
      <div className="flex flex-col w-full py-4 px-8">
        <h1 className="font-bold text-2xl mb-10">
          {initialPostData ? "記事編集" : "記事作成"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputLabel id="title">タイトル</InputLabel>
          <TextField
            {...register("title")}
            fullWidth
            margin="normal"
            sx={{ mb: 4 }}
            disabled={isSubmitting}
            helperText={errors.title?.message}
          />

          <InputLabel id="content">内容</InputLabel>
          <TextField
            {...register("content")}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            sx={{ mb: 4 }}
            disabled={isSubmitting}
            helperText={errors.content?.message}
          />

          <InputLabel id="thumbnailUrl">サムネイルURL</InputLabel>
          <TextField
            {...register("thumbnailUrl")}
            fullWidth
            margin="normal"
            sx={{ mb: 4 }}
            disabled={isSubmitting}
            helperText={errors.thumbnailUrl?.message}
          />

          <AdminCategorySelect control={control} isSubmitting={isSubmitting} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-purple-600 rounded-md px-3 py-1 mt-4 mr-2"
          >
            {initialPostData ? "更新" : "作成"}
          </button>

          {onDelete && (
            <button
              onClick={onDelete}
              disabled={isSubmitting}
              className="text-white bg-red-600 rounded-md px-3 py-1 mt-4"
            >
              削除
            </button>
          )}
        </form>
      </div>
    </>
  );
};
