import { FetcherProps } from "./../_types/FetcherProps";
import { api } from "./api";

export const fetcher = async <T>({ url }: FetcherProps): Promise<T> => {
  try {
    const res = await api.get({ url });
    return res as T;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
};
