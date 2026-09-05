import type { LeadStatus } from "@/lib/leads/constants";
import type {
  LumaInteractionInsert,
  LumaInteractionRow,
  LumaLeadInsert,
  LumaLeadRow,
  LumaLeadUpdate,
} from "@/lib/supabase/database.types";

export type LeadSort =
  | "company_name"
  | "sector"
  | "city"
  | "status"
  | "lead_score"
  | "next_action_at"
  | "phone"
  | "website"
  | "created_at";

export type WhatsappFilter = "" | "true" | "false" | "null";

export type LeadQuery = {
  search: string;
  status: LeadStatus | "";
  sector: string;
  city: string;
  minScore: number;
  whatsapp: WhatsappFilter;
  sort: LeadSort;
  dir: "asc" | "desc";
  page: number;
  pageSize: number;
};

export const DEFAULT_LEAD_QUERY: LeadQuery = {
  search: "",
  status: "",
  sector: "",
  city: "",
  minScore: 0,
  whatsapp: "",
  sort: "next_action_at",
  dir: "asc",
  page: 1,
  pageSize: 50,
};

export type LeadPage = {
  rows: LumaLeadRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type TodayStats = {
  /** Leads dont next_action_at ≤ maintenant (hors perdu / hors_cible). */
  toCallToday: number;
  /** Leads en statut "rdv_pris" dont updated_at est dans le mois courant. */
  meetingsThisMonth: number;
  /** (rdv_pris + audit_envoye + client) / (tous les leads sauf hors_cible), en %. null si aucun lead. */
  conversionRate: number | null;
};

export type ImportResult = {
  added: number;
  skipped: number;
  errors: number;
  errorMessages: string[];
};

export type Facets = { sectors: string[]; cities: string[] };

export interface LeadsRepo {
  readonly mode: "demo" | "supabase";
  listLeads(query: LeadQuery): Promise<LeadPage>;
  listFacets(): Promise<Facets>;
  getLead(id: string): Promise<LumaLeadRow | null>;
  createLead(input: LumaLeadInsert): Promise<LumaLeadRow>;
  updateLead(id: string, patch: LumaLeadUpdate): Promise<LumaLeadRow>;
  updateStatusBulk(ids: string[], status: LeadStatus): Promise<void>;
  importLeads(rows: LumaLeadInsert[]): Promise<ImportResult>;
  listInteractions(leadId: string): Promise<LumaInteractionRow[]>;
  addInteraction(input: LumaInteractionInsert): Promise<LumaInteractionRow>;
  listToday(): Promise<LumaLeadRow[]>;
  getTodayStats(): Promise<TodayStats>;
}

export type { LumaInteractionInsert, LumaInteractionRow, LumaLeadInsert, LumaLeadRow, LumaLeadUpdate };
