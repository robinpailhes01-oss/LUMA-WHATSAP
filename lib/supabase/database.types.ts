/**
 * Types Supabase pour luma_leads / luma_interactions.
 * Miroir manuel de supabase/migrations/20260905000000_init_luma.sql —
 * à régénérer (`supabase gen types`) si le schéma change.
 */
import type { InteractionType, LeadStatus } from "@/lib/leads/constants";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type LumaLeadRow = {
  id: string;
  company_name: string;
  sector: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  google_maps_url: string | null;
  has_whatsapp_button: boolean | null;
  open_year_round: boolean | null;
  estimated_revenue: string | null;
  google_rating: number | null;
  google_reviews_count: number | null;
  pain_signals: string | null;
  lead_score: number;
  status: LeadStatus;
  source: string | null;
  next_action_at: string | null;
  next_action_note: string | null;
  owner_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LumaLeadInsert = Partial<Omit<LumaLeadRow, "company_name">> & {
  company_name: string;
};

export type LumaLeadUpdate = Partial<LumaLeadRow>;

export type LumaInteractionRow = {
  id: string;
  lead_id: string;
  type: InteractionType;
  outcome: string | null;
  content: string | null;
  occurred_at: string;
};

export type LumaInteractionInsert = Partial<Omit<LumaInteractionRow, "lead_id" | "type">> & {
  lead_id: string;
  type: InteractionType;
};

export type LumaInteractionUpdate = Partial<LumaInteractionRow>;

/** Forme attendue par `createClient<Database>()` de @supabase/supabase-js. */
export type Database = {
  public: {
    Tables: {
      luma_leads: {
        Row: LumaLeadRow;
        Insert: LumaLeadInsert;
        Update: LumaLeadUpdate;
        Relationships: [];
      };
      luma_interactions: {
        Row: LumaInteractionRow;
        Insert: LumaInteractionInsert;
        Update: LumaInteractionUpdate;
        Relationships: [
          {
            foreignKeyName: "luma_interactions_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "luma_leads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type { Json };
