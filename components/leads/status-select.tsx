"use client";

import { LEAD_STATUSES, LEAD_STATUS_LABELS, LEAD_STATUS_TONES, type LeadStatus, type StatusTone } from "@/lib/leads/constants";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: "bg-status-neutral-bg text-status-neutral-fg",
  navy: "bg-status-navy-bg text-status-navy-fg",
  amber: "bg-status-amber-bg text-status-amber-fg",
  green: "bg-status-green-bg text-status-green-fg",
  teal: "bg-status-teal-bg text-status-teal-fg",
  red: "bg-status-red-bg text-status-red-fg",
};

/**
 * Édition inline du statut : la pastille EST le <select> (un clic, picker natif au clavier / au pouce).
 */
export function StatusSelect({
  value,
  onChange,
  disabled,
  className,
  size = "pill",
}: {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
  disabled?: boolean;
  className?: string;
  size?: "pill" | "field";
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      aria-label="Statut"
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className={cn(
        "cursor-pointer appearance-none rounded-full border-0 text-xs font-medium transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 disabled:cursor-wait disabled:opacity-60",
        size === "pill" ? "h-6 pl-2 pr-5" : "h-9 rounded-sm pl-3 pr-8 text-sm",
        TONE_CLASS[LEAD_STATUS_TONES[value]],
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: size === "pill" ? "right 6px center" : "right 10px center",
      }}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
