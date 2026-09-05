import { HIGH_REVENUE_RANGES } from "@/lib/leads/constants";
import type { LumaLeadRow } from "@/lib/supabase/database.types";

type ScoreInput = Partial<
  Pick<
    LumaLeadRow,
    | "has_whatsapp_button"
    | "open_year_round"
    | "estimated_revenue"
    | "pain_signals"
    | "website"
    | "city"
  >
>;

/**
 * Règle de lead_score (0-100), recalculée côté app à chaque édition :
 * +30 WhatsApp visible · +20 ouvert à l'année · +20 CA ∈ {300-500K, >500K}
 * +15 pain_signals non vide · +10 site non vide · +5 ville contient "Montpellier"
 */
export function computeLeadScore(lead: ScoreInput): number {
  let score = 0;
  if (lead.has_whatsapp_button === true) score += 30;
  if (lead.open_year_round === true) score += 20;
  if (lead.estimated_revenue && HIGH_REVENUE_RANGES.includes(lead.estimated_revenue.trim())) score += 20;
  if (lead.pain_signals && lead.pain_signals.trim() !== "") score += 15;
  if (lead.website && lead.website.trim() !== "") score += 10;
  if (lead.city && lead.city.toLowerCase().includes("montpellier")) score += 5;
  return Math.min(100, Math.max(0, score));
}

/** Palier d'affichage de la pastille de score (DESIGN.md : 0-39 / 40-69 / 70-100). */
export type ScoreTier = "low" | "mid" | "high";

export function scoreTier(score: number): ScoreTier {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}
