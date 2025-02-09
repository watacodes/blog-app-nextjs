"use client";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import useCategories from "../../_hooks/useCategories";
import Loading from "../../_components/Loading";
import ErrorComponent from "../../_components/Error";

const AdminCategorySelect: React.FC = () => {
  const { categories, error, isLoading } = useCategories();

  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const handleCategoryChange = (
    e: SelectChangeEvent<number[]>,
    feildOnChange: (value: { categoryId: number }[]) => void
  ) => {
    const selectedCategories = (e.target.value as []) || [];
    const availableCatIds = categories.map((c) => c.id);
    const validCatIds = selectedCategories
      .filter((id) => availableCatIds.includes(id))
      .map((id) => ({
        categoryId: id,
      }));
    feildOnChange(validCatIds);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="flex flex-col">
      <InputLabel id="postCategories">カテゴリー</InputLabel>

      <FormControl fullWidth margin="normal">
        <Controller
          name="postCategories"
          control={control}
          disabled={isSubmitting}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              labelId="postCategories"
              multiple
              value={field.value ? field.value.map((c) => c.categoryId) : []}
              onChange={(e) => handleCategoryChange(e, field.onChange)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {categories
                      .filter((c) => selected.includes(c.id))
                      .map((c) => (
                        <Chip key={c.id} label={c.name} />
                      ))}
                  </Box>
                );
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 16,
                  },
                },
              }}
            >
              {categories.map((c) => {
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
    </div>
  );
};

export default AdminCategorySelect;
