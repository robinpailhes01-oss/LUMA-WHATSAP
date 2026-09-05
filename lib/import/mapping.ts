import type { LumaLeadInsert } from "@/lib/supabase/database.types";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads/constants";

/** Champs luma_leads importables + alias reconnus (auto-détection par nom de colonne). */
export type ImportField = keyof Omit<LumaLeadInsert, "id" | "lead_score" | "created_at" | "updated_at">;

export const IMPORT_FIELDS: Array<{ field: ImportField; label: string; aliases: string[] }> = [
  { field: "company_name", label: "Entreprise *", aliases: ["entreprise", "company", "company_name", "nom", "name", "société", "societe", "raison sociale"] },
  { field: "sector", label: "Secteur", aliases: ["secteur", "sector", "activité", "activite", "category", "catégorie", "type"] },
  { field: "city", label: "Ville", aliases: ["ville", "city", "commune"] },
  { field: "address", label: "Adresse", aliases: ["adresse", "address", "rue"] },
  { field: "postal_code", label: "Code postal", aliases: ["code postal", "postal_code", "cp", "zip", "postcode"] },
  { field: "phone", label: "Téléphone", aliases: ["téléphone", "telephone", "phone", "tel", "tél", "mobile", "portable"] },
  { field: "email", label: "Email", aliases: ["email", "e-mail", "mail", "courriel"] },
  { field: "website", label: "Site web", aliases: ["site", "site web", "website", "web", "url", "domaine"] },
  { field: "instagram", label: "Instagram", aliases: ["instagram", "insta"] },
  { field: "google_maps_url", label: "Lien Google Maps", aliases: ["google maps", "maps", "google_maps_url", "maps_url", "lien maps"] },
  { field: "has_whatsapp_button", label: "WhatsApp visible", aliases: ["whatsapp", "has_whatsapp_button", "bouton whatsapp", "whatsapp visible"] },
  { field: "open_year_round", label: "Ouvert à l'année", aliases: ["ouvert à l'année", "ouvert a l'annee", "open_year_round", "annuel", "toute l'année"] },
  { field: "estimated_revenue", label: "CA estimé", aliases: ["ca", "ca estimé", "chiffre d'affaires", "estimated_revenue", "revenue", "tranche ca"] },
  { field: "google_rating", label: "Note Google", aliases: ["note", "note google", "rating", "google_rating", "étoiles"] },
  { field: "google_reviews_count", label: "Nb d'avis", aliases: ["avis", "nb avis", "reviews", "google_reviews_count", "nombre d'avis", "review count"] },
  { field: "pain_signals", label: "Signaux de douleur", aliases: ["pain", "pain_signals", "signaux", "douleurs", "extraits avis"] },
  { field: "status", label: "Statut", aliases: ["statut", "status", "état", "etat"] },
  { field: "source", label: "Source", aliases: ["source", "origine"] },
  { field: "next_action_note", label: "Note prochaine action", aliases: ["next_action_note", "prochaine action", "action"] },
  { field: "owner_notes", label: "Notes", aliases: ["notes", "owner_notes", "commentaire", "commentaires", "remarques"] },
];

export type ColumnMapping = Record<string, ImportField | "">;

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Propose un mapping colonne CSV → champ, par nom (exact d'abord, puis inclusion). */
export function autoDetectMapping(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};
  const taken = new Set<ImportField>();
  const normalizedFields = IMPORT_FIELDS.map((f) => ({ field: f.field, aliases: f.aliases.map(norm) }));

  for (const header of headers) {
    const h = norm(header);
    let match: ImportField | "" = "";
    for (const f of normalizedFields) {
      if (taken.has(f.field)) continue;
      if (f.aliases.includes(h)) {
        match = f.field;
        break;
      }
    }
    if (!match) {
      for (const f of normalizedFields) {
        if (taken.has(f.field)) continue;
        if (f.aliases.some((a) => a.length > 2 && (h.includes(a) || a.includes(h)))) {
          match = f.field;
          break;
        }
      }
    }
    if (match) taken.add(match);
    mapping[header] = match;
  }
  return mapping;
}

function toBool(v: string): boolean | null {
  const s = norm(v);
  if (["oui", "yes", "true", "1", "vrai", "x", "o"].includes(s)) return true;
  if (["non", "no", "false", "0", "faux", "n"].includes(s)) return false;
  return null;
}

function toNumber(v: string): number | null {
  const n = Number(v.replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function toStatus(v: string): LeadStatus | null {
  const s = norm(v).replace(/ /g, "_");
  return (LEAD_STATUSES as readonly string[]).includes(s) ? (s as LeadStatus) : null;
}

/** Transforme une ligne CSV (objet header → valeur) en insertion luma_leads selon le mapping. */
export function rowToLead(row: Record<string, string>, mapping: ColumnMapping, source: string): LumaLeadInsert {
  const lead: LumaLeadInsert = { company_name: "", source };
  for (const [header, field] of Object.entries(mapping)) {
    if (!field) continue;
    const raw = (row[header] ?? "").toString().trim();
    if (!raw) continue;
    switch (field) {
      case "has_whatsapp_button":
      case "open_year_round":
        lead[field] = toBool(raw);
        break;
      case "google_rating":
        lead.google_rating = toNumber(raw);
        break;
      case "google_reviews_count": {
        const n = toNumber(raw);
        lead.google_reviews_count = n === null ? null : Math.round(n);
        break;
      }
      case "status": {
        const st = toStatus(raw);
        if (st) lead.status = st;
        break;
      }
      case "source":
        lead.source = raw;
        break;
      default:
        lead[field] = raw;
    }
  }
  return lead;
}
