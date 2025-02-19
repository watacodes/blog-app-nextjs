import { PostType } from "./PostType";
import { DisplayPostType } from "./DisplayPostType";

export type PostDetailResponse = {
  status: string;
  message: string;
  post: DisplayPostType & PostType;
};
