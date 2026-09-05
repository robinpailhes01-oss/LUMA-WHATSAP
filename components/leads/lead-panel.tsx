"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { InteractionTimeline } from "@/components/leads/interaction-timeline";
import { LeadActions } from "@/components/leads/lead-actions";
import { LogInteractionForm } from "@/components/leads/log-interaction-form";
import { NextAction } from "@/components/leads/next-action";
import { ScorePill } from "@/components/leads/score-pill";
import { StatusSelect } from "@/components/leads/status-select";
import { ErrorState } from "@/components/states/states";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { getRepo } from "@/lib/data";
import { useAsync } from "@/lib/data/hooks";
import { formatPhone } from "@/lib/format";
import type { LeadStatus } from "@/lib/leads/constants";
import type { LumaLeadRow } from "@/lib/supabase/database.types";

/**
 * Panneau latéral d'un lead (depuis la table ou la vue Aujourd'hui) :
 * en-tête + actions + "Logger un appel" + timeline. Lien vers la fiche complète.
 */
export function LeadPanel({
  leadId,
  onClose,
  onLeadChange,
}: {
  leadId: string | null;
  onClose: () => void;
  onLeadChange?: (lead: LumaLeadRow) => void;
}) {
  return (
    <Sheet open={leadId !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-y-auto">
        {leadId ? <PanelBody leadId={leadId} onLeadChange={onLeadChange} /> : null}
      </SheetContent>
    </Sheet>
  );
}

function PanelBody({ leadId, onLeadChange }: { leadId: string; onLeadChange?: (lead: LumaLeadRow) => void }) {
  const lead = useAsync(() => getRepo().getLead(leadId), [leadId]);
  const interactions = useAsync(() => getRepo().listInteractions(leadId), [leadId]);

  if (lead.loading && !lead.data) {
    return (
      <>
        <SheetHeader>
          <SheetTitle>
            <Skeleton className="h-5 w-48" />
          </SheetTitle>
          <SheetDescription>
            <Skeleton className="h-3 w-32" />
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 p-6">
          <Skeleton className="h-row w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </>
    );
  }
  if (lead.error || !lead.data) {
    return (
      <>
        <SheetHeader>
          <SheetTitle>Fiche lead</SheetTitle>
          <SheetDescription>Impossible d&apos;ouvrir cette fiche.</SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <ErrorState message={lead.error ?? "Lead introuvable"} onRetry={lead.refetch} />
        </div>
      </>
    );
  }

  const row = lead.data;
  const update = (updated: LumaLeadRow) => {
    lead.setData(() => updated);
    onLeadChange?.(updated);
  };
  const changeStatus = async (status: LeadStatus) => {
    const updated = await getRepo().updateLead(row.id, { status });
    update(updated);
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className="flex flex-wrap items-center gap-2">
          <span className="min-w-0 truncate">{row.company_name}</span>
          <ScorePill score={row.lead_score} />
        </SheetTitle>
        <SheetDescription className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{[row.sector, row.city].filter(Boolean).join(" · ")}</span>
          {row.phone ? <span className="font-data text-ink">{formatPhone(row.phone)}</span> : null}
        </SheetDescription>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <StatusSelect value={row.status} onChange={changeStatus} />
          <NextAction at={row.next_action_at} note={row.next_action_note} showNote />
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <LeadActions lead={row} size="touch" />
          <Button asChild variant="ghost" size="touch" className="ml-auto">
            <Link href={`/leads/${row.id}`}>
              Fiche complète <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <section className="flex flex-col gap-3 rounded-lg border border-line bg-cream/40 p-4">
          <h2 className="typo-label">Logger un appel</h2>
          <LogInteractionForm
            lead={row}
            compact
            onSaved={(updated, interaction) => {
              update(updated);
              interactions.setData((prev) => [interaction, ...(prev ?? [])]);
            }}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="typo-label">Historique</h2>
          {interactions.loading && !interactions.data ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ) : interactions.error ? (
            <ErrorState message={interactions.error} onRetry={interactions.refetch} />
          ) : (
            <InteractionTimeline interactions={interactions.data ?? []} />
          )}
        </section>
      </div>
    </>
  );
}
