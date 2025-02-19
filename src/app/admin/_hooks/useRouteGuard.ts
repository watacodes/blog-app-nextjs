"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSupabaseSession from "../../_hooks/useSupabaseSession";

export const useRouteGuard = () => {
  const router = useRouter();
  const { session } = useSupabaseSession();

  useEffect(() => {
    if (session === undefined) return;

    const fetcher = async () => {
      if (session === null) {
        router.replace("/login"); // replace method over push so that user will be prevented from going back to previous page
      }
    };

    fetcher();
  }, [router, session]);
};
