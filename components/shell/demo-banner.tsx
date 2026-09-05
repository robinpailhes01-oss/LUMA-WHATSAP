"use client";

import { useEffect, useState } from "react";

import { getDemoRepo, isSupabaseConfigured } from "@/lib/data";

/** Bandeau visible tant que Supabase n'est pas configuré. Permet de vider / recharger les exemples. */
export function DemoBanner() {
  const [emptied, setEmptied] = useState(false);
  useEffect(() => {
    setEmptied(getDemoRepo()?.isEmptied ?? false);
  }, []);
  if (isSupabaseConfigured) return null;

  const toggle = () => {
    const repo = getDemoRepo();
    if (!repo) return;
    repo.reset(!emptied);
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line bg-gold-tint/60 px-4 py-2 text-xs text-gold-deep md:px-6 lg:px-8">
      <span className="font-medium">Mode démo</span>
      <span className="text-ink-muted sm:hidden">Données fictives, Supabase non configuré.</span>
      <span className="hidden text-ink-muted sm:inline">
        Connexion Supabase non configurée — renseigne <code className="font-mono">.env.local</code>. Les données affichées sont
        fictives et restent dans ce navigateur.
      </span>
      <button type="button" onClick={toggle} className="ml-auto underline underline-offset-2 hover:text-ink">
        {emptied ? "Recharger les exemples" : "Vider les données"}
      </button>
    </div>
  );
}
