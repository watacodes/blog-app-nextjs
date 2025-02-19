import { FetcherProps } from "./../_types/FetcherProps";

export const fetcher = async <T>({ url, token }: FetcherProps): Promise<T> => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    return data as T;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
};
