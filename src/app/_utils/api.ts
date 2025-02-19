import { FetcherProps } from "./../_types/FetcherProps";

export const api = {
  async put<T>({ url, token, body }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to update.");
    }

    return res.json();
  },

  async post<T>({ url, token, body }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to create.");
    }

    return res.json();
  },

  async delete<T>({ url, token }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete.");
    }

    return res.json();
  },
};
