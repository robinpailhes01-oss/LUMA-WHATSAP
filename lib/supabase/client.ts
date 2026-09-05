import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

export function getSupabaseEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export const isSupabaseConfigured = getSupabaseEnv() !== null;

let client: SupabaseClient<Database> | null = null;

/** Client navigateur (singleton). Ne jamais appeler sans `isSupabaseConfigured`. */
export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  const env = getSupabaseEnv();
  if (!env) throw new Error("Connexion Supabase non configurée — renseigne .env.local");
  if (!client) client = createBrowserClient<Database>(env.url, env.anonKey);
  return client;
}
