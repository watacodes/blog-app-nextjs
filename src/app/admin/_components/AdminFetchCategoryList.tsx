"use client";

import Select from "react-select";
import useCategories from "../../_hooks/useCategories";
import Loading from "../../_components/Loading";
import ErrorComponent from "../../_components/Error";

const AdminFetchCategoryList: React.FC = () => {
  const { categories, error, isLoading } = useCategories();

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

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
