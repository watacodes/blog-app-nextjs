export type DisplayPostType = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: { id: number; name: string }[];
};
