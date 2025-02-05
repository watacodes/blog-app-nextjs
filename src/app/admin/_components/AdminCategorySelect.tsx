import { useState, useEffect } from "react";
import { Category } from "../../_types/PostType";
import { Controller } from "react-hook-form";

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

const AdminCategorySelect = ({ control, isSubmitting }) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

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
    feildOnChange: (value: { categoryId: number }[]) => void
  ) => {
    const selectedCategories = (e.target.value as []) || [];
    const availableCatIds = categoryList.map((c) => c.id);
    const validCatIds = selectedCategories
      .filter((id) => availableCatIds.includes(id))
      .map((id) => ({
        categoryId: id,
      }));

    feildOnChange(validCatIds);
  };

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
                console.log("selected: ", selected);
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {categoryList
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
                    mt: 4,
                  },
                },
              }}
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
    </div>
  );
};

export default AdminCategorySelect;
