"use client";

import { InputLabel, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

type Props = {
  labelName: string;
  children: string;
  rows?: number;
};

const CustomTextField: React.FC<Props> = ({ labelName, children, rows }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <>
      <InputLabel id={labelName}>{children}</InputLabel>
      <TextField
        {...register(labelName)}
        fullWidth
        margin="normal"
        multiline={rows ? true : false}
        rows={rows}
        sx={{ mb: 4 }}
        disabled={isSubmitting}
        helperText={errors.labelName?.message.toString()}
      />
    </>
  );
};

export default CustomTextField;
