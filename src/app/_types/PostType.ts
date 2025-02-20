export type PostType = {
  id: number;
  title: string;
  content: string;
  thumbnailImageKey: string;
  createdAt?: Date;
  updatedAt?: Date;
  postCategories: Category[];
};

export type Category = {
  id: number;
  name: string;
  categoryId: number;
  postId: number;
};
