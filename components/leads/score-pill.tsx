import { scoreTier } from "@/lib/leads/score";
import { cn } from "@/lib/utils";

/**
 * Élément signature (1/2) — pastille de score. Jamais un chiffre nu.
 * 0-39 neutre · 40-69 navy · 70-100 or (seul usage de l'or dans les données).
 */
export function ScorePill({ score, className }: { score: number; className?: string }) {
  const tier = scoreTier(score);
  return (
    <span
      title={`Score ${score} / 100`}
      aria-label={`Score ${score} sur 100`}
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2 font-data text-xs font-medium",
        tier === "high" && "border-gold/60 bg-gold-tint text-gold-deep",
        tier === "mid" && "border-transparent bg-navy-tint text-navy",
        tier === "low" && "border-transparent bg-status-neutral-bg text-status-neutral-fg",
        className
      )}
    >
      {tier === "high" && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />}
      {score}
    </span>
  );
}
