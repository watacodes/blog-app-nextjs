export type DisplayPostType = {
  id: number;
  title: string;
  content: string;
  thumbnailImageKey: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: { id: number; name: string }[];
};
