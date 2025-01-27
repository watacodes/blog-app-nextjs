"use client";

import { useState, useEffect } from "react";
import Select from "react-select";

type Props = {
  name: string;
  id: number;
};

const AdminFetchCategoryList: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Props[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/categories", {
          method: "GET",
        });
        const { categories } = await res.json();
        console.log(categories);
        setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetcher();
  }, []);

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
