/**
 * Valeurs contraintes par le schéma (supabase/migrations/20260905000000_init_luma.sql)
 * et listes de suggestions issues du brief. Source unique pour l'app.
 */

export const LEAD_STATUSES = [
  "nouveau",
  "a_appeler",
  "appele_sans_reponse",
  "a_rappeler",
  "rdv_pris",
  "audit_envoye",
  "client",
  "perdu",
  "hors_cible",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nouveau: "Nouveau",
  a_appeler: "À appeler",
  appele_sans_reponse: "Appelé, sans réponse",
  a_rappeler: "À rappeler",
  rdv_pris: "RDV pris",
  audit_envoye: "Audit envoyé",
  client: "Client",
  perdu: "Perdu",
  hors_cible: "Hors cible",
};

/** Teinte de pastille par statut — voir DESIGN.md, tokens `status.*` (texte + couleur, jamais couleur seule). */
export type StatusTone = "neutral" | "navy" | "amber" | "green" | "teal" | "red";

export const LEAD_STATUS_TONES: Record<LeadStatus, StatusTone> = {
  nouveau: "neutral",
  a_appeler: "navy",
  appele_sans_reponse: "amber",
  a_rappeler: "amber",
  rdv_pris: "green",
  audit_envoye: "teal",
  client: "green",
  perdu: "red",
  hors_cible: "neutral",
};

export const INTERACTION_TYPES = ["appel", "email", "whatsapp", "visite", "note"] as const;

export type InteractionType = (typeof INTERACTION_TYPES)[number];

export const INTERACTION_TYPE_LABELS: Record<InteractionType, string> = {
  appel: "Appel",
  email: "Email",
  whatsapp: "WhatsApp",
  visite: "Visite",
  note: "Note",
};

/** Secteurs prioritaires (suggestions ; le champ `sector` reste libre). */
export const SECTOR_SUGGESTIONS = [
  "Garage / réparation auto",
  "Cuisiniste",
  "Location de voiture",
  "Dépannage plomberie / chauffage / serrurerie",
  "Salle de sport",
  "Auto-école",
  "Déménagement",
  "Nettoyage",
  "Location de matériel",
  "Conciergerie de gestion locative",
] as const;

/** Tranches de CA (suggestions ; le champ `estimated_revenue` reste libre). */
export const REVENUE_RANGES = ["<100K", "100-300K", "300-500K", ">500K"] as const;

export type RevenueRange = (typeof REVENUE_RANGES)[number];

/** Tranches comptant pour le score (cible 300-500K et au-delà). */
export const HIGH_REVENUE_RANGES: readonly string[] = ["300-500K", ">500K"];
