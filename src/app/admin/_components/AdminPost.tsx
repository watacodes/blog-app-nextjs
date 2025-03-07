"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostType } from "../../_types/PostType";
import CustomTextField from "../../_components/CustomTextField";
import Image from "next/image";
import { DisplayPostType } from "../../_types/DisplayPostType";
import FileUploader from "./AdminFileUploader";
import AdminCategorySelect from "./AdminCategorySelect";

type Props = {
  initialPostData?: PostType & DisplayPostType;
  onSubmit: (post: PostType) => void;
  onDelete?: () => void;
};

const schema = yup.object({
  title: yup.string().min(1).required(),
  content: yup.string().min(10).required(),
  thumbnailImageKey: yup.string(),
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
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(
    null
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialPostData || {
      title: "",
      content: "",
      thumbnailImageKey: "",
      postCategories: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (initialPostData) {
      reset(initialPostData);
    }
  }, [initialPostData, reset]);

  return (
    <div className="h-full w-full">
      <FormProvider {...methods}>
        <div className="h-full w-full">
          <h1 className="font-bold text-2xl mb-10">
            {initialPostData ? "記事編集" : "記事作成"}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-2"
          >
            <CustomTextField labelName="title">タイトル</CustomTextField>
            <CustomTextField labelName="content" rows={8}>
              内容
            </CustomTextField>

            <FileUploader
              labelName="thumbnailImageKey"
              onChangeImageUrl={setThumbnailImageUrl}
            >
              サムネイル
            </FileUploader>

            {thumbnailImageUrl && (
              <div className="mt-2">
                <Image
                  src={thumbnailImageUrl}
                  alt="thumbnail"
                  width={400}
                  height={400}
                />
              </div>
            )}

            <AdminCategorySelect />

            <div>
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
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};
