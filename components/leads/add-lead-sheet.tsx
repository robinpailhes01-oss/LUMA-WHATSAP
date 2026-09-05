"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getRepo } from "@/lib/data";
import { SECTOR_SUGGESTIONS } from "@/lib/leads/constants";
import type { LumaLeadRow } from "@/lib/supabase/database.types";

const EMPTY = { company_name: "", city: "", phone: "", website: "", sector: "" };

/** Ajout manuel — formulaire minimal : entreprise, ville, téléphone, site, secteur. */
export function AddLeadSheet({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (lead: LumaLeadRow) => void;
}) {
  const [draft, setDraft] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onInput = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const orNull = (s: string) => (s.trim() ? s.trim() : null);
      const lead = await getRepo().createLead({
        company_name: draft.company_name.trim(),
        city: orNull(draft.city),
        phone: orNull(draft.phone),
        website: orNull(draft.website),
        sector: orNull(draft.sector),
        source: "saisie manuelle",
        status: "a_appeler",
      });
      setDraft(EMPTY);
      onCreated(lead);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Création impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <form onSubmit={submit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>Nouveau lead</SheetTitle>
            <SheetDescription>Le minimum pour pouvoir appeler. Le reste se complète dans la fiche.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-company">Entreprise *</Label>
              <Input id="new-company" value={draft.company_name} onChange={onInput("company_name")} required autoFocus />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-city">Ville</Label>
              <Input id="new-city" value={draft.city} onChange={onInput("city")} placeholder="Montpellier" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-phone">Téléphone</Label>
              <Input id="new-phone" type="tel" value={draft.phone} onChange={onInput("phone")} className="font-data" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-website">Site</Label>
              <Input id="new-website" value={draft.website} onChange={onInput("website")} placeholder="exemple.fr" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-sector">Secteur</Label>
              <Input id="new-sector" value={draft.sector} onChange={onInput("sector")} list="new-sectors" />
              <datalist id="new-sectors">
                {SECTOR_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            {error ? (
              <p role="alert" className="text-xs text-danger">
                {error}
              </p>
            ) : null}
          </div>
          <SheetFooter className="mt-auto">
            <Button type="button" variant="ghost" size="touch" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary" size="touch" disabled={saving}>
              {saving ? "Création…" : "Créer le lead"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
