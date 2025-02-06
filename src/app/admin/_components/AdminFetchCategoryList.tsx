"use client";

import Select from "react-select";
import useCategoryList from "../../_hooks/useCategoryList";

const AdminFetchCategoryList: React.FC = () => {
  const { categoryList } = useCategoryList();

  return (
    <Select
      defaultValue={categoryList[0]}
      isMulti
      name="category"
      options={categoryList}
    />
  );
};

export default AdminFetchCategoryList;
