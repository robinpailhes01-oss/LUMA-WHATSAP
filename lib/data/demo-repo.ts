import { computeLeadScore } from "@/lib/leads/score";
import type { LeadStatus } from "@/lib/leads/constants";
import { buildDemoData } from "@/lib/data/demo-seed";
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

/**
 * Dépôt démo : Supabase non configuré. Données FICTIVES stockées dans localStorage
 * (survivent au rechargement, restent dans ce navigateur). Remplacé automatiquement
 * par le dépôt Supabase dès que .env.local est renseigné.
 */

const STORAGE_KEY = "luma-leads-demo-v1";
const LATENCY_MS = 180;

type Store = { leads: LumaLeadRow[]; interactions: LumaInteractionRow[]; emptied?: boolean };

function wait(ms = LATENCY_MS) {
  return new Promise((r) => setTimeout(r, ms));
}

function normKey(name: string, city: string | null | undefined) {
  return `${name.trim().toLowerCase()}|${(city ?? "").trim().toLowerCase()}`;
}

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function compare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a === null || a === undefined || a === "") return 1; // nulls en dernier
  if (b === null || b === undefined || b === "") return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "fr", { sensitivity: "base" });
}

export class DemoLeadsRepo implements LeadsRepo {
  readonly mode = "demo" as const;
  private store: Store | null = null;

  private load(): Store {
    if (this.store) return this.store;
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.store = JSON.parse(raw) as Store;
          return this.store;
        }
      } catch {
        /* stockage indisponible : on repart du jeu généré */
      }
    }
    this.store = buildDemoData();
    this.persist();
    return this.store;
  }

  private persist() {
    if (typeof window === "undefined" || !this.store) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
    } catch {
      /* quota / navigation privée : on continue en mémoire */
    }
  }

  /** Vide les données (pour voir les états vides) ou recharge le jeu d'exemple. */
  reset(empty: boolean) {
    this.store = empty ? { leads: [], interactions: [], emptied: true } : buildDemoData();
    this.persist();
  }

  get isEmptied(): boolean {
    return Boolean(this.load().emptied);
  }

  async listLeads(q: LeadQuery): Promise<LeadPage> {
    await wait();
    const { leads } = this.load();
    const search = q.search.trim().toLowerCase();
    let rows = leads.filter((l) => {
      if (search && !`${l.company_name} ${l.city ?? ""}`.toLowerCase().includes(search)) return false;
      if (q.status && l.status !== q.status) return false;
      if (q.sector && l.sector !== q.sector) return false;
      if (q.city && l.city !== q.city) return false;
      if (q.minScore > 0 && l.lead_score < q.minScore) return false;
      if (q.whatsapp === "true" && l.has_whatsapp_button !== true) return false;
      if (q.whatsapp === "false" && l.has_whatsapp_button !== false) return false;
      if (q.whatsapp === "null" && l.has_whatsapp_button !== null) return false;
      return true;
    });
    rows = [...rows].sort((a, b) => {
      const c = compare(a[q.sort], b[q.sort]);
      // les valeurs nulles restent en dernier quel que soit le sens
      if (a[q.sort] == null || b[q.sort] == null) return c;
      return q.dir === "asc" ? c : -c;
    });
    const start = (q.page - 1) * q.pageSize;
    return { rows: rows.slice(start, start + q.pageSize), total: rows.length, page: q.page, pageSize: q.pageSize };
  }

  async listFacets(): Promise<Facets> {
    const { leads } = this.load();
    const sectors = Array.from(new Set(leads.map((l) => l.sector).filter((s): s is string => Boolean(s)))).sort((a, b) =>
      a.localeCompare(b, "fr")
    );
    const cities = Array.from(new Set(leads.map((l) => l.city).filter((s): s is string => Boolean(s)))).sort((a, b) =>
      a.localeCompare(b, "fr")
    );
    return { sectors, cities };
  }

  async getLead(id: string): Promise<LumaLeadRow | null> {
    await wait();
    return this.load().leads.find((l) => l.id === id) ?? null;
  }

  private build(input: LumaLeadInsert, now: string): LumaLeadRow {
    const base: LumaLeadRow = {
      id: input.id ?? newId("lead"),
      company_name: input.company_name.trim(),
      sector: input.sector ?? null,
      city: input.city ?? null,
      address: input.address ?? null,
      postal_code: input.postal_code ?? null,
      phone: input.phone ?? null,
      email: input.email ?? null,
      website: input.website ?? null,
      instagram: input.instagram ?? null,
      google_maps_url: input.google_maps_url ?? null,
      has_whatsapp_button: input.has_whatsapp_button ?? null,
      open_year_round: input.open_year_round ?? null,
      estimated_revenue: input.estimated_revenue ?? null,
      google_rating: input.google_rating ?? null,
      google_reviews_count: input.google_reviews_count ?? null,
      pain_signals: input.pain_signals ?? null,
      lead_score: 0,
      status: input.status ?? "nouveau",
      source: input.source ?? null,
      next_action_at: input.next_action_at ?? null,
      next_action_note: input.next_action_note ?? null,
      owner_notes: input.owner_notes ?? null,
      created_at: input.created_at ?? now,
      updated_at: now,
    };
    base.lead_score = computeLeadScore(base);
    return base;
  }

  async createLead(input: LumaLeadInsert): Promise<LumaLeadRow> {
    await wait();
    const store = this.load();
    const key = normKey(input.company_name, input.city);
    if (store.leads.some((l) => normKey(l.company_name, l.city) === key)) {
      throw new Error("Un lead avec ce nom et cette ville existe déjà.");
    }
    const lead = this.build(input, new Date().toISOString());
    store.leads.unshift(lead);
    store.emptied = false;
    this.persist();
    return lead;
  }

  async updateLead(id: string, patch: LumaLeadUpdate): Promise<LumaLeadRow> {
    await wait();
    const store = this.load();
    const idx = store.leads.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error("Lead introuvable.");
    const merged: LumaLeadRow = { ...store.leads[idx], ...patch, id, updated_at: new Date().toISOString() };
    merged.lead_score = computeLeadScore(merged);
    store.leads[idx] = merged;
    this.persist();
    return merged;
  }

  async updateStatusBulk(ids: string[], status: LeadStatus): Promise<void> {
    await wait();
    const store = this.load();
    const set = new Set(ids);
    const now = new Date().toISOString();
    store.leads = store.leads.map((l) => (set.has(l.id) ? { ...l, status, updated_at: now } : l));
    this.persist();
  }

  async importLeads(rows: LumaLeadInsert[]): Promise<ImportResult> {
    await wait(400);
    const store = this.load();
    const existing = new Set(store.leads.map((l) => normKey(l.company_name, l.city)));
    const result: ImportResult = { added: 0, skipped: 0, errors: 0, errorMessages: [] };
    const now = new Date().toISOString();
    rows.forEach((row, i) => {
      if (!row.company_name || !row.company_name.trim()) {
        result.errors += 1;
        result.errorMessages.push(`Ligne ${i + 2} : nom d'entreprise manquant`);
        return;
      }
      const key = normKey(row.company_name, row.city);
      if (existing.has(key)) {
        result.skipped += 1;
        return;
      }
      existing.add(key);
      store.leads.unshift(this.build(row, now));
      result.added += 1;
    });
    if (result.added > 0) store.emptied = false;
    this.persist();
    return result;
  }

  async listInteractions(leadId: string): Promise<LumaInteractionRow[]> {
    await wait();
    return this.load()
      .interactions.filter((i) => i.lead_id === leadId)
      .sort((a, b) => b.occurred_at.localeCompare(a.occurred_at));
  }

  async addInteraction(input: LumaInteractionInsert): Promise<LumaInteractionRow> {
    await wait();
    const store = this.load();
    const row: LumaInteractionRow = {
      id: newId("int"),
      lead_id: input.lead_id,
      type: input.type,
      outcome: input.outcome ?? null,
      content: input.content ?? null,
      occurred_at: input.occurred_at ?? new Date().toISOString(),
    };
    store.interactions.push(row);
    this.persist();
    return row;
  }

  async listToday(): Promise<LumaLeadRow[]> {
    await wait();
    const now = Date.now();
    return this.load()
      .leads.filter(
        (l) =>
          l.next_action_at &&
          new Date(l.next_action_at).getTime() <= now &&
          l.status !== "perdu" &&
          l.status !== "hors_cible"
      )
      .sort((a, b) => b.lead_score - a.lead_score || (a.next_action_at ?? "").localeCompare(b.next_action_at ?? ""));
  }

  async getTodayStats(): Promise<TodayStats> {
    const { leads } = this.load();
    const today = await this.listToday();
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const meetings = leads.filter((l) => l.status === "rdv_pris" && new Date(l.updated_at) >= monthStart).length;
    const pool = leads.filter((l) => l.status !== "hors_cible");
    const converted = pool.filter((l) => ["rdv_pris", "audit_envoye", "client"].includes(l.status)).length;
    return {
      toCallToday: today.length,
      meetingsThisMonth: meetings,
      conversionRate: pool.length ? (converted / pool.length) * 100 : null,
    };
  }
}
