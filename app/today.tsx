"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { LeadPanel } from "@/components/leads/lead-panel";
import { NextAction } from "@/components/leads/next-action";
import { ScorePill } from "@/components/leads/score-pill";
import { StatusPill } from "@/components/leads/status-pill";
import { PageHeader } from "@/components/shell/page-header";
import { EmptyState, ErrorState, RowsSkeleton } from "@/components/states/states";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRepo } from "@/lib/data";
import { useAsync } from "@/lib/data/hooks";
import { atNineInDays, formatPercent, formatPhone, telHref } from "@/lib/format";
import type { LumaLeadRow } from "@/lib/supabase/database.types";

const EASE = [0.16, 1, 0.3, 1] as const;

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1 border-l border-line pl-4 first:border-l-0 first:pl-0">
      <span className="typo-label min-h-[32px] sm:min-h-0">{label}</span>
      <span className="font-data text-2xl leading-none text-navy">{value}</span>
      {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
    </div>
  );
}

/** Vue Aujourd'hui — "qui appeler maintenant". Chaque ligne actionnable sans quitter la page. */
export function Today() {
  const list = useAsync(() => getRepo().listToday(), []);
  const stats = useAsync(() => getRepo().getTodayStats(), []);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const monthLabel = new Date().toLocaleDateString("fr-FR", { month: "long" });

  const removeRow = (id: string) => list.setData((prev) => (prev ? prev.filter((r) => r.id !== id) : prev));

  const postpone = async (row: LumaLeadRow) => {
    setBusyId(row.id);
    setError(null);
    try {
      await getRepo().updateLead(row.id, { next_action_at: atNineInDays(1).toISOString() });
      removeRow(row.id);
      void stats.refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Report impossible");
    } finally {
      setBusyId(null);
    }
  };

  const onLeadChange = (updated: LumaLeadRow) => {
    const stillDue = updated.next_action_at && new Date(updated.next_action_at).getTime() <= Date.now();
    if (stillDue && updated.status !== "perdu" && updated.status !== "hors_cible") {
      list.setData((prev) => (prev ? prev.map((r) => (r.id === updated.id ? updated : r)) : prev));
    } else {
      removeRow(updated.id);
    }
    void stats.refetch();
  };

  const rows = list.data ?? [];

  return (
    <>
      <PageHeader
        title="Aujourd'hui"
        subtitle={new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
      />

      <section aria-label="Indicateurs" className="mb-8 grid grid-cols-3 gap-4 rounded-lg border border-line bg-paper p-4 md:p-6">
        {stats.loading && !stats.data ? (
          <>
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </>
        ) : stats.error ? (
          <div className="col-span-3">
            <ErrorState message={stats.error} onRetry={stats.refetch} />
          </div>
        ) : (
          <>
            <Stat label="À appeler" value={String(stats.data?.toCallToday ?? 0)} hint="échéance dépassée" />
            <Stat label="RDV pris" value={String(stats.data?.meetingsThisMonth ?? 0)} hint={`en ${monthLabel}`} />
            <Stat label="Nouveau → RDV" value={formatPercent(stats.data?.conversionRate ?? null)} hint="tous leads" />
          </>
        )}
      </section>

      {error ? (
        <p role="alert" className="mb-3 text-xs text-danger">
          {error}
        </p>
      ) : null}

      {list.loading && !list.data ? (
        <RowsSkeleton rows={6} />
      ) : list.error ? (
        <ErrorState message={list.error} onRetry={list.refetch} />
      ) : rows.length === 0 ? (
        <EmptyState
          title="Rien à appeler pour l'instant"
          description="Aucun lead n'a d'échéance dépassée. Fixe des relances depuis la table ou importe de nouveaux leads."
          action={
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="touch">
                <Link href="/leads">Ouvrir la table</Link>
              </Button>
              <Button asChild variant="outline" size="touch">
                <Link href="/import">Importer un CSV</Link>
              </Button>
            </div>
          }
        />
      ) : (
        <ul className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {rows.map((row) => {
              const tel = telHref(row.phone);
              return (
                <motion.li
                  key={row.id}
                  layout={!reduced}
                  initial={false}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
                  transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
                  className="rounded-lg border border-line bg-paper p-3 md:flex md:items-center md:gap-4 md:px-4"
                >
                  <div className="flex items-start gap-3 md:min-w-0 md:flex-1 md:items-center">
                    <button
                      type="button"
                      onClick={() => setOpenId(row.id)}
                      className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate font-medium text-ink">{row.company_name}</span>
                        <ScorePill score={row.lead_score} />
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-ink-muted">
                        {[row.sector, row.city].filter(Boolean).join(" · ")}
                        {row.phone ? <span className="font-data"> · {formatPhone(row.phone)}</span> : null}
                      </span>
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-3 md:mt-0 md:w-[380px] md:shrink-0">
                    <StatusPill status={row.status} className="shrink-0" />
                    <NextAction at={row.next_action_at} note={row.next_action_note} showNote className="min-w-0 flex-1" />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 md:mt-0 md:flex md:shrink-0">
                    <Button asChild={Boolean(tel)} variant="secondary" size="touch" disabled={!tel}>
                      {tel ? (
                        <a href={tel}>
                          <Phone /> Appeler
                        </a>
                      ) : (
                        <span>
                          <Phone /> Appeler
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" size="touch" onClick={() => setOpenId(row.id)}>
                      Logger
                    </Button>
                    <Button variant="ghost" size="touch" onClick={() => postpone(row)} disabled={busyId === row.id}>
                      {busyId === row.id ? "…" : "Demain"}
                    </Button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <LeadPanel leadId={openId} onClose={() => setOpenId(null)} onLeadChange={onLeadChange} />
    </>
  );
}
