"use client";

import { useEffect, useMemo, useState } from "react";

import { ScorePill } from "@/components/leads/score-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { Textarea } from "@/components/ui/textarea";
import { getRepo } from "@/lib/data";
import { fromDateTimeLocal, toDateTimeLocal } from "@/lib/format";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, REVENUE_RANGES, SECTOR_SUGGESTIONS, type LeadStatus } from "@/lib/leads/constants";
import { computeLeadScore } from "@/lib/leads/score";
import type { LumaLeadRow, LumaLeadUpdate } from "@/lib/supabase/database.types";

type Tri = "" | "true" | "false";
const triToBool = (v: Tri) => (v === "" ? null : v === "true");
const boolToTri = (v: boolean | null): Tri => (v === null ? "" : v ? "true" : "false");

type Draft = {
  company_name: string;
  sector: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  google_maps_url: string;
  has_whatsapp_button: Tri;
  open_year_round: Tri;
  estimated_revenue: string;
  google_rating: string;
  google_reviews_count: string;
  pain_signals: string;
  status: LeadStatus;
  source: string;
  next_action_at: string;
  next_action_note: string;
  owner_notes: string;
};

function toDraft(l: LumaLeadRow): Draft {
  return {
    company_name: l.company_name,
    sector: l.sector ?? "",
    city: l.city ?? "",
    address: l.address ?? "",
    postal_code: l.postal_code ?? "",
    phone: l.phone ?? "",
    email: l.email ?? "",
    website: l.website ?? "",
    instagram: l.instagram ?? "",
    google_maps_url: l.google_maps_url ?? "",
    has_whatsapp_button: boolToTri(l.has_whatsapp_button),
    open_year_round: boolToTri(l.open_year_round),
    estimated_revenue: l.estimated_revenue ?? "",
    google_rating: l.google_rating === null ? "" : String(l.google_rating),
    google_reviews_count: l.google_reviews_count === null ? "" : String(l.google_reviews_count),
    pain_signals: l.pain_signals ?? "",
    status: l.status,
    source: l.source ?? "",
    next_action_at: toDateTimeLocal(l.next_action_at),
    next_action_note: l.next_action_note ?? "",
    owner_notes: l.owner_notes ?? "",
  };
}

const orNull = (s: string) => (s.trim() === "" ? null : s.trim());

function toPatch(d: Draft): LumaLeadUpdate {
  const rating = d.google_rating.trim() === "" ? null : Number(d.google_rating.replace(",", "."));
  const reviews = d.google_reviews_count.trim() === "" ? null : Math.round(Number(d.google_reviews_count));
  return {
    company_name: d.company_name.trim(),
    sector: orNull(d.sector),
    city: orNull(d.city),
    address: orNull(d.address),
    postal_code: orNull(d.postal_code),
    phone: orNull(d.phone),
    email: orNull(d.email),
    website: orNull(d.website),
    instagram: orNull(d.instagram),
    google_maps_url: orNull(d.google_maps_url),
    has_whatsapp_button: triToBool(d.has_whatsapp_button),
    open_year_round: triToBool(d.open_year_round),
    estimated_revenue: orNull(d.estimated_revenue),
    google_rating: rating !== null && Number.isFinite(rating) ? rating : null,
    google_reviews_count: reviews !== null && Number.isFinite(reviews) ? reviews : null,
    pain_signals: orNull(d.pain_signals),
    status: d.status,
    source: orNull(d.source),
    next_action_at: fromDateTimeLocal(d.next_action_at),
    next_action_note: orNull(d.next_action_note),
    owner_notes: orNull(d.owner_notes),
  };
}

function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="typo-label">{title}</h2>
      {children}
    </section>
  );
}

/** Fiche lead : tous les champs éditables, score recalculé en direct, une seule action primaire. */
export function LeadForm({ lead, onSaved }: { lead: LumaLeadRow; onSaved: (updated: LumaLeadRow) => void }) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(lead));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setDraft(toDraft(lead));
  }, [lead]);

  const set = <K extends keyof Draft>(key: K) => (value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const onInput = (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  const liveScore = useMemo(() => computeLeadScore(toPatch(draft)), [draft]);
  const dirty = useMemo(() => JSON.stringify(toDraft(lead)) !== JSON.stringify(draft), [lead, draft]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.company_name.trim()) {
      setError("Le nom de l'entreprise est obligatoire.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await getRepo().updateLead(lead.id, toPatch(draft));
      setSavedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <Section title="Identité">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Entreprise *" htmlFor="company_name">
            <Input id="company_name" value={draft.company_name} onChange={onInput("company_name")} required />
          </Field>
          <Field label="Secteur" htmlFor="sector">
            <Input id="sector" value={draft.sector} onChange={onInput("sector")} list="sectors" />
            <datalist id="sectors">
              {SECTOR_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Field>
          <Field label="Ville" htmlFor="city">
            <Input id="city" value={draft.city} onChange={onInput("city")} />
          </Field>
          <Field label="Code postal" htmlFor="postal_code">
            <Input id="postal_code" value={draft.postal_code} onChange={onInput("postal_code")} className="font-data" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Adresse" htmlFor="address">
              <Input id="address" value={draft.address} onChange={onInput("address")} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Téléphone" htmlFor="phone">
            <Input id="phone" type="tel" value={draft.phone} onChange={onInput("phone")} className="font-data" />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" value={draft.email} onChange={onInput("email")} />
          </Field>
          <Field label="Site web" htmlFor="website">
            <Input id="website" value={draft.website} onChange={onInput("website")} placeholder="exemple.fr" />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" value={draft.instagram} onChange={onInput("instagram")} placeholder="@compte" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Lien Google Maps" htmlFor="google_maps_url">
              <Input id="google_maps_url" value={draft.google_maps_url} onChange={onInput("google_maps_url")} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Qualification">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp visible" htmlFor="has_whatsapp_button" hint="+30 au score si oui">
            <SelectNative id="has_whatsapp_button" value={draft.has_whatsapp_button} onChange={(e) => set("has_whatsapp_button")(e.target.value as Tri)}>
              <option value="">Inconnu</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </SelectNative>
          </Field>
          <Field label="Ouvert à l'année" htmlFor="open_year_round" hint="+20 au score si oui">
            <SelectNative id="open_year_round" value={draft.open_year_round} onChange={(e) => set("open_year_round")(e.target.value as Tri)}>
              <option value="">Inconnu</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </SelectNative>
          </Field>
          <Field label="CA estimé" htmlFor="estimated_revenue" hint="+20 si 300-500K ou >500K">
            <Input id="estimated_revenue" value={draft.estimated_revenue} onChange={onInput("estimated_revenue")} list="revenues" className="font-data" />
            <datalist id="revenues">
              {REVENUE_RANGES.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Note Google" htmlFor="google_rating">
              <Input id="google_rating" inputMode="decimal" value={draft.google_rating} onChange={onInput("google_rating")} className="font-data" />
            </Field>
            <Field label="Nb d'avis" htmlFor="google_reviews_count">
              <Input id="google_reviews_count" inputMode="numeric" value={draft.google_reviews_count} onChange={onInput("google_reviews_count")} className="font-data" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Signaux de douleur" htmlFor="pain_signals" hint="Extraits d'avis mentionnant lenteur ou joignabilité (+15 si renseigné)">
              <Textarea id="pain_signals" value={draft.pain_signals} onChange={onInput("pain_signals")} rows={3} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Suivi">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Statut" htmlFor="status">
            <SelectNative id="status" value={draft.status} onChange={(e) => set("status")(e.target.value as LeadStatus)}>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </SelectNative>
          </Field>
          <Field label="Source" htmlFor="source">
            <Input id="source" value={draft.source} onChange={onInput("source")} className="font-data" />
          </Field>
          <Field label="Prochaine action" htmlFor="next_action_at">
            <Input id="next_action_at" type="datetime-local" value={draft.next_action_at} onChange={onInput("next_action_at")} className="font-data" />
          </Field>
          <Field label="Note prochaine action" htmlFor="next_action_note">
            <Input id="next_action_note" value={draft.next_action_note} onChange={onInput("next_action_note")} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes" htmlFor="owner_notes">
              <Textarea id="owner_notes" value={draft.owner_notes} onChange={onInput("owner_notes")} rows={4} />
            </Field>
          </div>
        </div>
      </Section>

      <div className="sticky bottom-bottomnav z-10 -mx-4 flex items-center gap-3 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6 lg:bottom-0">
        <span className="text-xs text-ink-muted">Score</span>
        <ScorePill score={liveScore} />
        {error ? (
          <span role="alert" className="text-xs text-danger">
            {error}
          </span>
        ) : savedAt ? (
          <span className="font-data text-xs text-ink-muted">enregistré {savedAt}</span>
        ) : null}
        <Button type="submit" variant="primary" size="touch" disabled={saving || !dirty} className="ml-auto">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
