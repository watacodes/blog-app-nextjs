"use client";

import { supabase } from "../../_utils/supabase";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // undefined: loading | null: not logged in | Session: logged in
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    };

    fetcher();
  }, [pathname]);

  return { session, token, isLoading };
};

export default useSupabaseSession;
