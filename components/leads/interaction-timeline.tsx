import { formatDateTime } from "@/lib/format";
import { INTERACTION_TYPE_LABELS } from "@/lib/leads/constants";
import type { LumaInteractionRow } from "@/lib/supabase/database.types";

export function InteractionTimeline({ interactions }: { interactions: LumaInteractionRow[] }) {
  if (interactions.length === 0) {
    return <p className="rounded-sm border border-dashed border-line px-4 py-6 text-sm text-ink-muted">Aucune interaction pour l&apos;instant.</p>;
  }
  return (
    <ol className="relative flex flex-col gap-4 border-l border-line pl-4">
      {interactions.map((it) => (
        <li key={it.id} className="relative">
          <span aria-hidden className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border border-paper bg-navy" />
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-medium text-ink">{INTERACTION_TYPE_LABELS[it.type]}</span>
            {it.outcome ? <span className="text-sm text-ink-muted">· {it.outcome}</span> : null}
            <span className="ml-auto font-data text-xs text-ink-muted">{formatDateTime(it.occurred_at)}</span>
          </div>
          {it.content ? <p className="mt-1 whitespace-pre-line text-sm text-ink">{it.content}</p> : null}
        </li>
      ))}
    </ol>
  );
}
