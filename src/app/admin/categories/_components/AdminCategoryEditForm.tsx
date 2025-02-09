"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategoryType } from "../types/types";
import Buttons from "./Buttons";
import { useEffect, useState } from "react";
import Loading from "../../../_components/Loading";

const schema = yup.object().shape({
  category: yup.string().min(1).required(),
});

const CategoryEditForm: React.FC<CategoryType> = ({
  initialData,
  onSubmit,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
    setIsLoading(false);
  }, [initialData, reset]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-gray-500 pb-4">
            カテゴリー名
          </label>

          <input
            className="w-full border border-b rounded-sm py-1 px-2"
            type="text"
            id="category"
            disabled={isSubmitting}
            {...register("category")}
          />

          <p className="text-red-600 my-2">{errors.category?.message}</p>

          <Buttons
            initialData={initialData}
            isSubmitting={isSubmitting}
            onDelete={onDelete}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryEditForm;
