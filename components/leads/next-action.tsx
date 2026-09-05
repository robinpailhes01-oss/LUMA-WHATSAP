"use client";

import { useEffect, useState } from "react";

import { formatDateTime, formatNextAction, type NextActionTone } from "@/lib/format";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<NextActionTone, string> = {
  overdue: "text-danger",
  now: "text-navy",
  soon: "text-navy",
  later: "text-ink-muted",
};

/**
 * Élément signature (2/2) — compte à rebours relatif de la prochaine action.
 * Seul endroit où `danger` apparaît hors erreur (retard). Se rafraîchit chaque minute.
 */
export function NextAction({
  at,
  note,
  className,
  showNote = false,
}: {
  at: string | null | undefined;
  note?: string | null;
  className?: string;
  showNote?: boolean;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const rel = formatNextAction(at, now);
  if (!rel) return <span className={cn("font-data text-xs text-ink-muted/60", className)}>—</span>;

  return (
    <span className={cn("flex min-w-0 flex-col leading-tight", className)}>
      <span
        className={cn("truncate font-data text-xs font-medium", TONE_CLASS[rel.tone])}
        title={formatDateTime(at)}
      >
        {rel.tone === "overdue" && <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-danger align-middle" />}
        {rel.label}
      </span>
      {showNote && note ? (
        <span className="truncate text-xs text-ink-muted" title={note}>
          {note}
        </span>
      ) : null}
    </span>
  );
}
