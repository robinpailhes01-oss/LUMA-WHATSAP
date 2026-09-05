"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { InteractionTimeline } from "@/components/leads/interaction-timeline";
import { LeadActions } from "@/components/leads/lead-actions";
import { LeadForm } from "@/components/leads/lead-form";
import { LogInteractionForm } from "@/components/leads/log-interaction-form";
import { NextAction } from "@/components/leads/next-action";
import { ScorePill } from "@/components/leads/score-pill";
import { StatusPill } from "@/components/leads/status-pill";
import { EmptyState, ErrorState } from "@/components/states/states";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRepo } from "@/lib/data";
import { useAsync } from "@/lib/data/hooks";
import { formatDateTime } from "@/lib/format";

export function LeadDetail({ id }: { id: string }) {
  const lead = useAsync(() => getRepo().getLead(id), [id]);
  const interactions = useAsync(() => getRepo().listInteractions(id), [id]);

  if (lead.loading && !lead.data) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-row w-72" />
        <div className="grid gap-6 lg:grid-cols-12">
          <Skeleton className="h-96 lg:col-span-7" />
          <Skeleton className="h-96 lg:col-span-5" />
        </div>
      </div>
    );
  }
  if (lead.error) return <ErrorState message={lead.error} onRetry={lead.refetch} />;
  if (!lead.data) {
    return (
      <EmptyState
        title="Lead introuvable"
        description="Il a peut-être été supprimé, ou l'adresse est incorrecte."
        action={
          <Button asChild variant="outline" size="touch">
            <Link href="/leads">Retour à la table</Link>
          </Button>
        }
      />
    );
  }
  const row = lead.data;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/leads" className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-navy">
        <ArrowLeft className="h-3 w-3" /> Leads
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="min-w-0 break-words">{row.company_name}</h1>
          <ScorePill score={row.lead_score} />
          <StatusPill status={row.status} />
        </div>
        <p className="text-sm text-ink-muted">
          {[row.sector, row.city, row.postal_code].filter(Boolean).join(" · ")}
          {row.source ? (
            <>
              {" "}
              · source <span className="whitespace-nowrap font-data">{row.source}</span>
            </>
          ) : null}
          {" · "}créé le <span className="font-data">{formatDateTime(row.created_at)}</span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <LeadActions lead={row} size="touch" />
          <NextAction at={row.next_action_at} note={row.next_action_note} showNote className="ml-auto" />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-lg border border-line bg-paper p-4 md:p-6 lg:col-span-7">
          <LeadForm lead={row} onSaved={(u) => lead.setData(() => u)} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <section className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-4 md:p-6">
            <h2 className="typo-label">Logger un appel</h2>
            <LogInteractionForm
              lead={row}
              onSaved={(u, it) => {
                lead.setData(() => u);
                interactions.setData((prev) => [it, ...(prev ?? [])]);
              }}
            />
          </section>
          <section className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-4 md:p-6">
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
      </div>
    </div>
  );
}
