import { LEAD_STATUS_LABELS, LEAD_STATUS_TONES, type LeadStatus, type StatusTone } from "@/lib/leads/constants";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: "bg-status-neutral-bg text-status-neutral-fg",
  navy: "bg-status-navy-bg text-status-navy-fg",
  amber: "bg-status-amber-bg text-status-amber-fg",
  green: "bg-status-green-bg text-status-green-fg",
  teal: "bg-status-teal-bg text-status-teal-fg",
  red: "bg-status-red-bg text-status-red-fg",
};

/** Statut = texte + couleur désaturée, jamais la couleur seule. */
export function StatusPill({ status, className }: { status: LeadStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 max-w-full items-center truncate rounded-full px-2 text-xs font-medium",
        TONE_CLASS[LEAD_STATUS_TONES[status]],
        status === "hors_cible" && "line-through decoration-ink-muted/60",
        className
      )}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
