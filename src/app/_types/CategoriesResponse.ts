export type CategoryType = {
  id: number;
  name: string;
};

export type CategoriesResponse = {
  status: string;
  message: string;
  categories: CategoryType[];
};
