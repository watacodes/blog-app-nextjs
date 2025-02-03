"use client";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import AdminSideBar from "./AdminSideBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { PostType } from "../../_types/PostType";

type Category = {
  id: number;
  name: string;
};

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
      id: yup.number().required(),
    })
  ),
});

export const AdminPost: React.FC<Props> = ({
  initialPostData,
  onSubmit,
  onDelete,
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
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

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/categories", {
          method: "GET",
        });
        const { categories } = await res.json();
        setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

  const handleCategoryChange = (
    e: SelectChangeEvent<number[]>,
    feildOnChange: (value: { id: number }[]) => void
  ) => {
    const selectedCategories = e.target.value as number[];
    const formattedCategories = selectedCategories.map((id) => ({ id }));
    console.log(formattedCategories);
    feildOnChange(formattedCategories);
  };

  return (
    <div className="flex">
      <AdminSideBar />
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
            helperText={errors.content?.message}
          />

          <InputLabel id="thumbnailUrl">サムネイルURL</InputLabel>
          <TextField
            {...register("thumbnailUrl")}
            fullWidth
            margin="normal"
            helperText={errors.thumbnailUrl?.message}
          />

          <FormControl fullWidth margin="normal" sx={{ mt: 4 }}>
            <InputLabel id="postCategories">カテゴリー</InputLabel>
            <Controller
              name="postCategories"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="categories"
                  multiple
                  value={field.value ? field.value.map((c) => c.id) : []}
                  onChange={(e) => handleCategoryChange(e, field.onChange)}
                  input={<OutlinedInput id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {categoryList
                        .filter((c) => selected.includes(c.id))
                        .map((c) => (
                          <Chip key={c.id} label={c.name} />
                        ))}
                    </Box>
                  )}
                >
                  {categoryList.map((c) => {
                    return (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>

          <button
            type="submit"
            className="text-white bg-purple-600 rounded-md px-3 py-1 mt-4 mr-2"
          >
            {initialPostData ? "更新" : "作成"}
          </button>

          {onDelete && (
            <button
              onClick={onDelete}
              className="text-white bg-red-600 rounded-md px-3 py-1 mt-4"
            >
              削除
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
