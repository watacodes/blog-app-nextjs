export type PostType = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  postCategories: { id: number }[];
};
