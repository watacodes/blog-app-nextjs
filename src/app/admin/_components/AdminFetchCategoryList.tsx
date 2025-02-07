"use client";

import Select from "react-select";
import useCategories from "../../_hooks/useCategories";

const AdminFetchCategoryList: React.FC = () => {
  const { categories } = useCategories();

  return (
    <Select
      defaultValue={categories[0]}
      isMulti
      name="category"
      options={categories}
    />
  );
};

export default AdminFetchCategoryList;
