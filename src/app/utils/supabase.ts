'use client';

import { useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export function useSupabase() {
  const { isLoaded, session } = useSession();

  const client = useMemo(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        accessToken: async () => session?.getToken() ?? null,
      }
    );
  }, [session]);

  return {
    client,
    isLoaded,
    isConfigured: Boolean(client),
  };
}
