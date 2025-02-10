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

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const handleCategoryChange = (
    e: SelectChangeEvent<number[]>, // originally num[]
    feildOnChange: (value: { categoryId: number }[]) => void
  ) => {
    const selectedCategories = (e.target.value as number[]) || []; // originally number[]

    console.log("selected cat:", selectedCategories);

    const availableCatIds = categories.map((c) => c.id);

    console.log("available catID: ", availableCatIds);

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
          control={control} // passing control so that the value can be registerd to react hook form
          disabled={isSubmitting}
          render={(
            { field } // Field = the dropdown box?
          ) => (
            <Select
              {...field} // takes all the values of the field?
              fullWidth
              labelId="postCategories"
              multiple // allows multiple selection
              value={field.value ? field.value.map((c) => c.categoryId) : []} // if there's a field.value, return an array of categoryId. Else an empty array.
              onChange={(e) => handleCategoryChange(e, field.onChange)} // field.onChange is kind of like a state setter?
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => {
                // renderValue decides the values to be rendered/displayed based on the clicked items in the dropdown?
                console.log("selected: ", selected);
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {categories
                      .filter((c) => selected.includes(c.id))
                      .map((c) => (
                        <Chip key={c.id} label={c.name} /> // The label = name of category that's selected
                      ))}
                  </Box>
                );
              }}
            >
              {categories.map((c) => {
                // maps categories, an array of object with id and name's values
                console.log("cat: ", categories);
                console.log("c: ", c);
                console.log("c item: ", c.name);

                return (
                  <MenuItem key={c.id} value={c.id}>
                    {" "}
                    {/* i set value here so that the value (c.id) can be used to identify which category is  */}
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
