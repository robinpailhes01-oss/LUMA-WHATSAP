import { DemoLeadsRepo } from "@/lib/data/demo-repo";
import { SupabaseLeadsRepo } from "@/lib/data/supabase-repo";
import type { LeadsRepo } from "@/lib/data/types";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

let repo: LeadsRepo | null = null;

/** Dépôt actif : Supabase si .env.local est renseigné, sinon démo (données fictives locales). */
export function getRepo(): LeadsRepo {
  if (!repo) repo = isSupabaseConfigured ? new SupabaseLeadsRepo(getSupabaseBrowserClient()) : new DemoLeadsRepo();
  return repo;
}

export function getDemoRepo(): DemoLeadsRepo | null {
  const r = getRepo();
  return r instanceof DemoLeadsRepo ? r : null;
}

export { isSupabaseConfigured };
