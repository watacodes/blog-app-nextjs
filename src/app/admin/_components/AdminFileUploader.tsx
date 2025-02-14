import { InputLabel, FormControl, inputAdornmentClasses } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../_utils/supabase";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  labelName: string;
  children: React.ReactNode;
  setThumbnailImageUrl: Dispatch<SetStateAction<string>>;
};

const FileUploader: React.FC<Props> = ({
  labelName,
  children,
  setThumbnailImageUrl,
}) => {
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(
    null
  );

  const {
    register,
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<string> => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
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

    console.log("file path:", filePath);
    console.log("data path: ", data.path);

    setThumbnailImageKey(data.path);
  };

  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);
      console.log("public url: ", publicUrl);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey]);

  return (
    <>
      <InputLabel id={labelName}>{children}</InputLabel>
      <FormControl margin="normal">
        <Controller
          name={labelName}
          control={control}
          render={() => (
            <input
              {...register(labelName)}
              type="file"
              id={labelName}
              onChange={(e) => handleImageChange(e)}
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
