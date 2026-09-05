import { LEAD_STATUSES, SECTOR_SUGGESTIONS, type LeadStatus } from "@/lib/leads/constants";
import { computeLeadScore } from "@/lib/leads/score";
import type { LumaInteractionRow, LumaLeadRow } from "@/lib/supabase/database.types";

/**
 * Jeu d'exemple pour le mode démo (Supabase non configuré).
 * Entreprises FICTIVES, générées de façon déterministe — jamais des données réelles.
 * Sert uniquement à voir le design avec une densité réaliste.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CITIES: Array<{ city: string; postal: string; weight: number }> = [
  { city: "Montpellier", postal: "34000", weight: 6 },
  { city: "Castelnau-le-Lez", postal: "34170", weight: 2 },
  { city: "Lattes", postal: "34970", weight: 2 },
  { city: "Pérols", postal: "34470", weight: 1 },
  { city: "Saint-Jean-de-Védas", postal: "34430", weight: 1 },
  { city: "Juvignac", postal: "34990", weight: 1 },
  { city: "Mauguio", postal: "34130", weight: 1 },
  { city: "Lunel", postal: "34400", weight: 1 },
  { city: "Sète", postal: "34200", weight: 1 },
  { city: "Béziers", postal: "34500", weight: 1 },
];

const NAME_PREFIX: Record<string, string[]> = {
  "Garage / réparation auto": ["Garage", "Auto Service", "Carrosserie", "Mécanique"],
  Cuisiniste: ["Cuisines", "Atelier Cuisine", "Espace Cuisine"],
  "Location de voiture": ["Location", "Rent", "Autoloc"],
  "Dépannage plomberie / chauffage / serrurerie": ["Dépannage", "Plomberie", "Serrurerie", "Chauffage"],
  "Salle de sport": ["Fitness", "Club", "Studio"],
  "Auto-école": ["Auto-École", "École de conduite"],
  Déménagement: ["Déménagements", "Transports"],
  Nettoyage: ["Nettoyage", "Propreté", "Services"],
  "Location de matériel": ["Loc Matériel", "Location", "Matériel"],
  "Conciergerie de gestion locative": ["Conciergerie", "Gestion", "Keys"],
};

const NAME_SUFFIX = [
  "du Lez", "Saint-Roch", "des Arceaux", "Antigone", "Port Marianne", "Odysseum", "Beaux-Arts",
  "Comédie", "Boutonnet", "Figuerolles", "Celleneuve", "Aiguelongue", "Millénaire", "Garosud",
  "des Prés d'Arènes", "Sud", "Hérault", "Occitan", "Méditerranée", "Peyrou", "Tournezy", "Ovalie",
  "Croix d'Argent", "Mosson", "Hôpitaux", "Alco", "Rimbaud", "Gambetta", "Pompignane", "Lemasson",
  "Las Rebes", "Estanove", "du Littoral", "de la Gare", "Grammont", "Père Soulas",
];

const PAIN_SIGNALS = [
  "Avis : « impossible de les joindre, 3 appels sans réponse »",
  "Avis : « devis promis sous 48 h, reçu après 10 jours »",
  "Avis : « répondeur en permanence, j'ai fini par aller ailleurs »",
  "Avis : « ne répondent pas aux messages WhatsApp le week-end »",
  "Avis : « très bon travail mais très dur à avoir au téléphone »",
];

const STATUS_WEIGHTS: Array<[LeadStatus, number]> = [
  ["nouveau", 22],
  ["a_appeler", 16],
  ["appele_sans_reponse", 9],
  ["a_rappeler", 8],
  ["rdv_pris", 4],
  ["audit_envoye", 2],
  ["client", 1],
  ["perdu", 3],
  ["hors_cible", 3],
];

const REVENUES = ["<100K", "100-300K", "300-500K", ">500K"];

function pickWeighted<T>(rand: () => number, items: Array<[T, number]>): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [item, w] of items) {
    r -= w;
    if (r <= 0) return item;
  }
  return items[items.length - 1][0];
}

function phone(rand: () => number): string {
  const mobile = rand() < 0.45;
  const head = mobile ? (rand() < 0.5 ? "06" : "07") : "04 67";
  const rest = Array.from({ length: mobile ? 4 : 3 }, () => String(Math.floor(rand() * 100)).padStart(2, "0"));
  return `${head} ${rest.join(" ")}`;
}

function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildDemoData(now: Date = new Date()): { leads: LumaLeadRow[]; interactions: LumaInteractionRow[] } {
  const rand = mulberry32(20260905);
  const leads: LumaLeadRow[] = [];
  const interactions: LumaInteractionRow[] = [];
  const used = new Set<string>();
  const sectors = [...SECTOR_SUGGESTIONS];
  const cityPool: Array<[(typeof CITIES)[number], number]> = CITIES.map((c) => [c, c.weight]);

  let i = 0;
  while (leads.length < 64 && i < 500) {
    i += 1;
    const sector = sectors[Math.floor(rand() * sectors.length)];
    const prefixes = NAME_PREFIX[sector] ?? ["Société"];
    const name = `${prefixes[Math.floor(rand() * prefixes.length)]} ${NAME_SUFFIX[Math.floor(rand() * NAME_SUFFIX.length)]}`;
    const cityRow = pickWeighted(rand, cityPool);
    const key = `${name}|${cityRow.city}`;
    if (used.has(key)) continue;
    used.add(key);

    const status = pickWeighted(rand, STATUS_WEIGHTS);
    const hasWa = rand() < 0.4 ? true : rand() < 0.5 ? false : null;
    const openYear = rand() < 0.6 ? true : rand() < 0.5 ? false : null;
    const revenue = rand() < 0.8 ? REVENUES[Math.floor(rand() * REVENUES.length)] : null;
    const pain = rand() < 0.35 ? PAIN_SIGNALS[Math.floor(rand() * PAIN_SIGNALS.length)] : null;
    const website = rand() < 0.65 ? `${slug(name)}.fr` : null;
    const createdDaysAgo = Math.floor(rand() * 40);
    const createdAt = new Date(now.getTime() - createdDaysAgo * 86_400_000 - rand() * 86_400_000);

    // Prochaine action : en retard / aujourd'hui / à venir / aucune
    let nextAt: Date | null = null;
    if (!["perdu", "hors_cible", "client", "nouveau"].includes(status)) {
      const r = rand();
      if (r < 0.3) nextAt = new Date(now.getTime() - (0.5 + rand() * 3) * 86_400_000);
      else if (r < 0.6) nextAt = new Date(now.getTime() - rand() * 6 * 3_600_000);
      else if (r < 0.9) nextAt = new Date(now.getTime() + (0.2 + rand() * 6) * 86_400_000);
      if (nextAt) nextAt.setMinutes(nextAt.getMinutes() < 30 ? 0 : 30, 0, 0);
    } else if (status === "nouveau" && rand() < 0.25) {
      nextAt = new Date(now.getTime() - rand() * 4 * 3_600_000);
      nextAt.setMinutes(0, 0, 0);
    }

    const nextNotes = [
      "Rappeler le gérant, absent ce matin",
      "Envoyer l'audit chiffré après l'appel",
      "Demander si les demandes arrivent par WhatsApp",
      "Relance après devis",
      "Confirmer le créneau du RDV",
      null,
    ];

    const partial = {
      has_whatsapp_button: hasWa,
      open_year_round: openYear,
      estimated_revenue: revenue,
      pain_signals: pain,
      website,
      city: cityRow.city,
    };

    const lead: LumaLeadRow = {
      id: `demo-${String(leads.length + 1).padStart(3, "0")}`,
      company_name: name,
      sector,
      city: cityRow.city,
      address: rand() < 0.7 ? `${Math.floor(1 + rand() * 180)} rue ${NAME_SUFFIX[Math.floor(rand() * NAME_SUFFIX.length)]}` : null,
      postal_code: cityRow.postal,
      phone: phone(rand),
      email: rand() < 0.5 ? `contact@${slug(name)}.fr` : null,
      website,
      instagram: rand() < 0.3 ? `@${slug(name).replace(/-/g, "")}` : null,
      google_maps_url: rand() < 0.6 ? `https://maps.google.com/?q=${encodeURIComponent(`${name} ${cityRow.city}`)}` : null,
      has_whatsapp_button: hasWa,
      open_year_round: openYear,
      estimated_revenue: revenue,
      google_rating: rand() < 0.85 ? Math.round((3.4 + rand() * 1.6) * 10) / 10 : null,
      google_reviews_count: rand() < 0.85 ? Math.floor(5 + rand() * 300) : null,
      pain_signals: pain,
      lead_score: computeLeadScore(partial),
      status,
      source: rand() < 0.7 ? "csv-demo" : "saisie manuelle",
      next_action_at: nextAt ? nextAt.toISOString() : null,
      next_action_note: nextAt ? nextNotes[Math.floor(rand() * nextNotes.length)] : null,
      owner_notes: rand() < 0.25 ? "Le gérant décroche plutôt en fin de journée." : null,
      created_at: createdAt.toISOString(),
      updated_at: new Date(createdAt.getTime() + rand() * createdDaysAgo * 86_400_000).toISOString(),
    };
    leads.push(lead);

    if (status !== "nouveau" && rand() < 0.8) {
      const n = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < n; k += 1) {
        const at = new Date(createdAt.getTime() + rand() * (now.getTime() - createdAt.getTime()));
        const type = rand() < 0.7 ? "appel" : rand() < 0.5 ? "whatsapp" : "note";
        const outcomes = ["pas de réponse", "intéressé", "rappeler jeudi", "pas le bon interlocuteur", "RDV pris"];
        interactions.push({
          id: `demo-int-${lead.id}-${k}`,
          lead_id: lead.id,
          type,
          outcome: type === "note" ? null : outcomes[Math.floor(rand() * outcomes.length)],
          content:
            type === "note"
              ? "Reçoit ses demandes de devis par WhatsApp, répond le soir."
              : rand() < 0.5
                ? "Gérant occupé, demande un rappel."
                : null,
          occurred_at: at.toISOString(),
        });
      }
    }
  }

  // sanity : statuts tous valides
  for (const l of leads) if (!LEAD_STATUSES.includes(l.status)) l.status = "nouveau";
  return { leads, interactions };
}
