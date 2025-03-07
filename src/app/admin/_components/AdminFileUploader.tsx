"use client";

import { InputLabel, FormControl } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../_utils/supabase";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  labelName: string;
  children: React.ReactNode;
  onChangeImageUrl: Dispatch<SetStateAction<string>>;
};

const FileUploader: React.FC<Props> = ({
  labelName,
  children,
  onChangeImageUrl,
}) => {
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(
    null
  );

  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<string> => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const filePath = `private/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("post_thumbnail")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    return data.path;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (dataPath: string) => void
  ) => {
    const dataPath = await handleImageChange(e);
    setThumbnailImageKey(dataPath);
    fieldOnChange(dataPath);
  };

  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);
      onChangeImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey, onChangeImageUrl]);

  return (
    <>
      <InputLabel id={labelName}>{children}</InputLabel>
      <FormControl margin="normal">
        <Controller
          name={labelName}
          control={control}
          render={({ field: { onChange, ref, ...restField } }) => (
            <input
              {...restField}
              type="file"
              ref={ref}
              id={labelName}
              value=""
              onChange={(e) => handleFileChange(e, onChange)}
              disabled={isSubmitting}
              accept="/image/*"
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default FileUploader;
