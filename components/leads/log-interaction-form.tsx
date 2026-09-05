"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { Textarea } from "@/components/ui/textarea";
import { getRepo } from "@/lib/data";
import { atNineInDays, fromDateTimeLocal, toDateTimeLocal } from "@/lib/format";
import {
  INTERACTION_TYPES,
  INTERACTION_TYPE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type InteractionType,
  type LeadStatus,
} from "@/lib/leads/constants";
import type { LumaInteractionRow, LumaLeadRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

const QUICK_OUTCOMES: Array<{ label: string; status?: LeadStatus; followUpDays?: number; followUpNote?: string }> = [
  { label: "pas de réponse", status: "appele_sans_reponse", followUpDays: 2, followUpNote: "Relance après appel sans réponse" },
  { label: "intéressé", status: "a_rappeler", followUpDays: 1, followUpNote: "Rappel — intéressé" },
  { label: "rappeler plus tard", status: "a_rappeler", followUpDays: 3, followUpNote: "Rappel demandé" },
  { label: "RDV pris", status: "rdv_pris" },
  { label: "pas intéressé", status: "perdu" },
  { label: "hors cible", status: "hors_cible" },
];

function isNoAnswer(outcome: string) {
  const s = outcome.toLowerCase();
  return s.includes("pas de réponse") || s.includes("pas de reponse") || s.includes("sans réponse") || s.includes("répondeur");
}

/**
 * "Logger un appel" — type + résultat + note + relance. Résultat "pas de réponse" ⇒ relance J+2 proposée
 * automatiquement (modifiable). Le statut suggéré suit le résultat, toujours corrigeable.
 */
export function LogInteractionForm({
  lead,
  onSaved,
  compact = false,
}: {
  lead: LumaLeadRow;
  onSaved: (updated: LumaLeadRow, interaction: LumaInteractionRow) => void;
  compact?: boolean;
}) {
  const [type, setType] = useState<InteractionType>("appel");
  const [outcome, setOutcome] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [followUp, setFollowUp] = useState(false);
  const [followUpAt, setFollowUpAt] = useState(toDateTimeLocal(atNineInDays(2).toISOString()));
  const [followUpNote, setFollowUpNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyOutcome = (value: string) => {
    setOutcome(value);
    const quick = QUICK_OUTCOMES.find((q) => q.label === value);
    if (quick?.status) setStatus(quick.status);
    if (quick?.followUpDays) {
      setFollowUp(true);
      setFollowUpAt(toDateTimeLocal(atNineInDays(quick.followUpDays).toISOString()));
      setFollowUpNote(quick.followUpNote ?? "");
    } else if (isNoAnswer(value)) {
      setFollowUp(true);
      setFollowUpAt(toDateTimeLocal(atNineInDays(2).toISOString()));
      setFollowUpNote("Relance après appel sans réponse");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const repo = getRepo();
      const interaction = await repo.addInteraction({
        lead_id: lead.id,
        type,
        outcome: outcome.trim() || null,
        content: content.trim() || null,
      });
      const patch: Partial<LumaLeadRow> = { status };
      if (followUp) {
        patch.next_action_at = fromDateTimeLocal(followUpAt);
        patch.next_action_note = followUpNote.trim() || null;
      } else if (lead.next_action_at && new Date(lead.next_action_at).getTime() <= Date.now()) {
        // L'action du jour est faite : on la retire de la liste "Aujourd'hui"
        patch.next_action_at = null;
        patch.next_action_note = null;
      }
      const updated = await repo.updateLead(lead.id, patch);
      setOutcome("");
      setContent("");
      setFollowUp(false);
      setFollowUpNote("");
      onSaved(updated, interaction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-[140px_1fr]")}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`type-${lead.id}`}>Type</Label>
          <SelectNative id={`type-${lead.id}`} value={type} onChange={(e) => setType(e.target.value as InteractionType)}>
            {INTERACTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {INTERACTION_TYPE_LABELS[t]}
              </option>
            ))}
          </SelectNative>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`outcome-${lead.id}`}>Résultat</Label>
          <Input
            id={`outcome-${lead.id}`}
            value={outcome}
            onChange={(e) => applyOutcome(e.target.value)}
            placeholder="pas de réponse, intéressé, rappeler jeudi…"
            list={`outcomes-${lead.id}`}
          />
          <datalist id={`outcomes-${lead.id}`}>
            {QUICK_OUTCOMES.map((q) => (
              <option key={q.label} value={q.label} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5" aria-label="Résultats rapides">
        {QUICK_OUTCOMES.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => applyOutcome(q.label)}
            className={cn(
              "h-8 rounded-full border px-3 text-xs transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy",
              outcome === q.label ? "border-navy bg-navy text-cream" : "border-line bg-paper text-ink hover:border-navy"
            )}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`content-${lead.id}`}>Note</Label>
        <Textarea
          id={`content-${lead.id}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ce qui s'est dit, à qui on a parlé…"
          rows={compact ? 2 : 3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`status-${lead.id}`}>Nouveau statut</Label>
        <SelectNative id={`status-${lead.id}`} value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)}>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </SelectNative>
      </div>

      <div className="rounded-sm border border-line bg-cream/60 p-3">
        <label className="flex min-h-[28px] cursor-pointer items-center gap-2 text-sm">
          <Checkbox checked={followUp} onCheckedChange={(v) => setFollowUp(v === true)} />
          Fixer une relance
        </label>
        {followUp ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-[200px_1fr]">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`fu-at-${lead.id}`}>Date</Label>
              <Input
                id={`fu-at-${lead.id}`}
                type="datetime-local"
                value={followUpAt}
                onChange={(e) => setFollowUpAt(e.target.value)}
                className="font-data"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`fu-note-${lead.id}`}>Note de relance</Label>
              <Input
                id={`fu-note-${lead.id}`}
                value={followUpNote}
                onChange={(e) => setFollowUpNote(e.target.value)}
                placeholder="Rappeler le gérant"
              />
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="touch" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
