"use client";

import Select from "react-select";
import useCategories from "../../_hooks/useCategories";

const AdminFetchCategoryList: React.FC = () => {
  const { data } = useCategories();

  return (
    <Select
      defaultValue={data.categories[0]}
      isMulti
      name="category"
      options={data.categories}
    />
  );
};

export default AdminFetchCategoryList;
