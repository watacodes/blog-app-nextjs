import { DisplayPostType } from "./DisplayPostType";

export type PostResponse = {
  status: string;
  message: string;
  posts: DisplayPostType[];
};
