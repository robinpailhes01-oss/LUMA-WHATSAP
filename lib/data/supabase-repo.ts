import type { SupabaseClient } from "@supabase/supabase-js";

import { computeLeadScore } from "@/lib/leads/score";
import type { LeadStatus } from "@/lib/leads/constants";
import type { Database } from "@/lib/supabase/database.types";
import type {
  Facets,
  ImportResult,
  LeadPage,
  LeadQuery,
  LeadsRepo,
  LumaInteractionInsert,
  LumaInteractionRow,
  LumaLeadInsert,
  LumaLeadRow,
  LumaLeadUpdate,
  TodayStats,
} from "@/lib/data/types";

/** Dépôt Supabase : toutes les écritures passent par la base, rien en local. */
export class SupabaseLeadsRepo implements LeadsRepo {
  readonly mode = "supabase" as const;

  constructor(private readonly client: SupabaseClient<Database>) {}

  private static fail(error: { message: string } | null, fallback: string): never {
    throw new Error(error?.message || fallback);
  }

  async listLeads(q: LeadQuery): Promise<LeadPage> {
    let query = this.client.from("luma_leads").select("*", { count: "exact" });
    const search = q.search.trim();
    if (search) {
      const safe = search.replace(/[%,()]/g, " ");
      query = query.or(`company_name.ilike.%${safe}%,city.ilike.%${safe}%`);
    }
    if (q.status) query = query.eq("status", q.status);
    if (q.sector) query = query.eq("sector", q.sector);
    if (q.city) query = query.eq("city", q.city);
    if (q.minScore > 0) query = query.gte("lead_score", q.minScore);
    if (q.whatsapp === "true") query = query.eq("has_whatsapp_button", true);
    if (q.whatsapp === "false") query = query.eq("has_whatsapp_button", false);
    if (q.whatsapp === "null") query = query.is("has_whatsapp_button", null);

    const from = (q.page - 1) * q.pageSize;
    const { data, error, count } = await query
      .order(q.sort, { ascending: q.dir === "asc", nullsFirst: false })
      .order("company_name", { ascending: true })
      .range(from, from + q.pageSize - 1);
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de charger les leads.");
    return { rows: data ?? [], total: count ?? 0, page: q.page, pageSize: q.pageSize };
  }

  async listFacets(): Promise<Facets> {
    const { data, error } = await this.client.from("luma_leads").select("sector, city").limit(2000);
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de charger les filtres.");
    const sectors = new Set<string>();
    const cities = new Set<string>();
    for (const row of data ?? []) {
      if (row.sector) sectors.add(row.sector);
      if (row.city) cities.add(row.city);
    }
    const sortFr = (a: string, b: string) => a.localeCompare(b, "fr");
    return { sectors: Array.from(sectors).sort(sortFr), cities: Array.from(cities).sort(sortFr) };
  }

  async getLead(id: string): Promise<LumaLeadRow | null> {
    const { data, error } = await this.client.from("luma_leads").select("*").eq("id", id).maybeSingle();
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de charger la fiche.");
    return data;
  }

  async createLead(input: LumaLeadInsert): Promise<LumaLeadRow> {
    const payload: LumaLeadInsert = { ...input, lead_score: computeLeadScore(input) };
    const { data, error } = await this.client.from("luma_leads").insert(payload).select("*").single();
    if (error) {
      if (error.code === "23505") throw new Error("Un lead avec ce nom et cette ville existe déjà.");
      SupabaseLeadsRepo.fail(error, "Impossible de créer le lead.");
    }
    return data;
  }

  async updateLead(id: string, patch: LumaLeadUpdate): Promise<LumaLeadRow> {
    const current = await this.getLead(id);
    if (!current) throw new Error("Lead introuvable.");
    const merged = { ...current, ...patch };
    const payload: LumaLeadUpdate = { ...patch, lead_score: computeLeadScore(merged) };
    const { data, error } = await this.client.from("luma_leads").update(payload).eq("id", id).select("*").single();
    if (error) SupabaseLeadsRepo.fail(error, "Impossible d'enregistrer la fiche.");
    return data;
  }

  async updateStatusBulk(ids: string[], status: LeadStatus): Promise<void> {
    const { error } = await this.client.from("luma_leads").update({ status }).in("id", ids);
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de changer le statut.");
  }

  async importLeads(rows: LumaLeadInsert[]): Promise<ImportResult> {
    const result: ImportResult = { added: 0, skipped: 0, errors: 0, errorMessages: [] };
    const valid: LumaLeadInsert[] = [];
    rows.forEach((row, i) => {
      if (!row.company_name || !row.company_name.trim()) {
        result.errors += 1;
        result.errorMessages.push(`Ligne ${i + 2} : nom d'entreprise manquant`);
        return;
      }
      valid.push({ ...row, company_name: row.company_name.trim(), lead_score: computeLeadScore(row) });
    });
    // Doublons internes au fichier : gardés une seule fois
    const seen = new Set<string>();
    const unique = valid.filter((r) => {
      const key = `${r.company_name.toLowerCase()}|${(r.city ?? "").toLowerCase()}`;
      if (seen.has(key)) {
        result.skipped += 1;
        return false;
      }
      seen.add(key);
      return true;
    });
    const CHUNK = 200;
    for (let i = 0; i < unique.length; i += CHUNK) {
      const chunk = unique.slice(i, i + CHUNK);
      const { data, error } = await this.client
        .from("luma_leads")
        .upsert(chunk, { onConflict: "company_name,city", ignoreDuplicates: true })
        .select("id");
      if (error) {
        result.errors += chunk.length;
        result.errorMessages.push(`Lot ${i / CHUNK + 1} : ${error.message}`);
        continue;
      }
      const inserted = data?.length ?? 0;
      result.added += inserted;
      result.skipped += chunk.length - inserted;
    }
    return result;
  }

  async listInteractions(leadId: string): Promise<LumaInteractionRow[]> {
    const { data, error } = await this.client
      .from("luma_interactions")
      .select("*")
      .eq("lead_id", leadId)
      .order("occurred_at", { ascending: false });
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de charger l'historique.");
    return data ?? [];
  }

  async addInteraction(input: LumaInteractionInsert): Promise<LumaInteractionRow> {
    const { data, error } = await this.client.from("luma_interactions").insert(input).select("*").single();
    if (error) SupabaseLeadsRepo.fail(error, "Impossible d'enregistrer l'interaction.");
    return data;
  }

  async listToday(): Promise<LumaLeadRow[]> {
    const { data, error } = await this.client
      .from("luma_leads")
      .select("*")
      .lte("next_action_at", new Date().toISOString())
      .not("status", "in", "(perdu,hors_cible)")
      .order("lead_score", { ascending: false })
      .order("next_action_at", { ascending: true })
      .limit(200);
    if (error) SupabaseLeadsRepo.fail(error, "Impossible de charger la vue du jour.");
    return data ?? [];
  }

  async getTodayStats(): Promise<TodayStats> {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const [today, meetings, pool, converted] = await Promise.all([
      this.client
        .from("luma_leads")
        .select("id", { count: "exact", head: true })
        .lte("next_action_at", new Date().toISOString())
        .not("status", "in", "(perdu,hors_cible)"),
      this.client
        .from("luma_leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "rdv_pris")
        .gte("updated_at", monthStart.toISOString()),
      this.client.from("luma_leads").select("id", { count: "exact", head: true }).neq("status", "hors_cible"),
      this.client
        .from("luma_leads")
        .select("id", { count: "exact", head: true })
        .in("status", ["rdv_pris", "audit_envoye", "client"]),
    ]);
    const firstError = [today, meetings, pool, converted].find((r) => r.error)?.error ?? null;
    if (firstError) SupabaseLeadsRepo.fail(firstError, "Impossible de charger les indicateurs.");
    const poolCount = pool.count ?? 0;
    return {
      toCallToday: today.count ?? 0,
      meetingsThisMonth: meetings.count ?? 0,
      conversionRate: poolCount ? ((converted.count ?? 0) / poolCount) * 100 : null,
    };
  }
}
