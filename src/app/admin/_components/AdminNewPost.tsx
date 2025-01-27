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

type Category = {
  id: number;
  name: string;
};

type CreatePost = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  thumbnailUrl: yup.string().required(),
  categories: yup.array().of(
    yup.object({
      id: yup.number().required(),
    })
  ),
});

export const AdminNewPost: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/categories", {
          method: "GET",
        });
        const { categories } = await res.json();
        console.log("Cat: ", categories);
        setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    const {
      target: { value },
    } = e;
    setCategoryName((prevCat) => [...prevCat, value]);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
  });

  const onSubmit = async (post: CreatePost) => {
    console.log(post);
    try {
      const res = await fetch("http://localhost:3000/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const result = await res.json();
      console.log("The data has been submitted: ", result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return;
    } finally {
      reset();
    }
  };

  const handleCategoryChange = (
    e: SelectChangeEvent<number[]>,
    feildOnChange: (value: { id: number }[]) => void
  ) => {
    const selectedCategories = e.target.value as number[];
    const formattedCategories = selectedCategories.map((id) => ({ id }));
    feildOnChange(formattedCategories);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col w-full py-4 px-8">
        <h1 className="font-bold text-2xl mb-10">記事作成</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("title")}
            label="タイトル"
            fullWidth
            margin="normal"
            helperText={errors.title?.message}
          />
          <TextField
            {...register("content")}
            label="内容"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            helperText={errors.content?.message}
          />
          <TextField
            {...register("thumbnailUrl")}
            label="サムネイルURL"
            fullWidth
            margin="normal"
            helperText={errors.thumbnailUrl?.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="categories">カテゴリー</InputLabel>
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="categories"
                  multiple
                  value={field.value ? field.value.map((c) => c.id) : []}
                  onChange={(e) => handleCategoryChange(e, field.onChange)}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="カテゴリー"
                    />
                  }
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
            className="text-white bg-purple-600 rounded-md px-3 py-1 mt-4"
          >
            作成
          </button>
        </form>
      </div>
    </div>
  );
};
