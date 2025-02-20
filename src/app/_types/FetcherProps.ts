import { PostType } from "./PostType";
import { CategoryFormData } from "../admin/categories/types/CategoryResponse";

export type FetcherProps = {
  url: string;
  token?: string;
  body?: CategoryFormData | PostType;
};
