import { supabase } from "../../_utils/supabase";
import { FetcherProps } from "./../_types/FetcherProps";

const getAccessToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session.access_token;
};

export const api = {
  async get<T>({ url }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAccessToken(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update.");
    }

    return res.json();
  },

  async put<T>({ url, body }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAccessToken(),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to update.");
    }

    return res.json();
  },

  async post<T>({ url, body }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAccessToken(),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to create.");
    }

    return res.json();
  },

  async delete<T>({ url }: FetcherProps): Promise<T> {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getAccessToken(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete.");
    }

    return res.json();
  },
};
