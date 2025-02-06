import { useState, useEffect } from "react";
import { Category } from "../_types/PostType";

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  return { categoryList, isLoading };
};

export default useCategoryList;
