"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink, Plus, Search } from "lucide-react";

import { AddLeadSheet } from "@/components/leads/add-lead-sheet";
import { LeadPanel } from "@/components/leads/lead-panel";
import { NextAction } from "@/components/leads/next-action";
import { ScorePill } from "@/components/leads/score-pill";
import { StatusSelect } from "@/components/leads/status-select";
import { PageHeader } from "@/components/shell/page-header";
import { EmptyState, ErrorState, RowsSkeleton } from "@/components/states/states";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { getRepo } from "@/lib/data";
import { useAsync } from "@/lib/data/hooks";
import { DEFAULT_LEAD_QUERY, type LeadQuery, type LeadSort, type WhatsappFilter } from "@/lib/data/types";
import { formatPhone, websiteHref, websiteLabel } from "@/lib/format";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/constants";
import type { LumaLeadRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

/** Largeurs en % (table-layout: fixed) : la troncature remplace le débordement. */
const COLUMNS: Array<{ key: LeadSort; label: string; width: string }> = [
  { key: "company_name", label: "Entreprise", width: "19%" },
  { key: "sector", label: "Secteur", width: "13%" },
  { key: "city", label: "Ville", width: "10%" },
  { key: "status", label: "Statut", width: "14%" },
  { key: "lead_score", label: "Score", width: "6%" },
  { key: "next_action_at", label: "Prochaine action", width: "16%" },
  { key: "phone", label: "Téléphone", width: "12%" },
  { key: "website", label: "Site", width: "10%" },
];

function useDebounced<T>(value: T, delay: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export function LeadsTable() {
  const [query, setQuery] = useState<LeadQuery>(DEFAULT_LEAD_QUERY);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounced(searchInput, 250);
  const effectiveQuery = useMemo(() => ({ ...query, search: debouncedSearch }), [query, debouncedSearch]);

  const page = useAsync(() => getRepo().listLeads(effectiveQuery), [effectiveQuery]);
  const facets = useAsync(() => getRepo().listFacets(), []);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<LeadStatus>("a_appeler");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [rowError, setRowError] = useState<string | null>(null);

  const patch = (p: Partial<LeadQuery>) => {
    setQuery((q) => ({ ...q, ...p, page: p.page ?? 1 }));
    setSelected(new Set());
  };
  const sortBy = (key: LeadSort) =>
    patch(query.sort === key ? { dir: query.dir === "asc" ? "desc" : "asc" } : { sort: key, dir: key === "lead_score" ? "desc" : "asc" });

  const replaceRow = useCallback(
    (updated: LumaLeadRow) =>
      page.setData((prev) => (prev ? { ...prev, rows: prev.rows.map((r) => (r.id === updated.id ? updated : r)) } : prev)),
    [page]
  );

  const changeStatus = async (row: LumaLeadRow, status: LeadStatus) => {
    setRowError(null);
    replaceRow({ ...row, status });
    try {
      replaceRow(await getRepo().updateLead(row.id, { status }));
    } catch (e) {
      replaceRow(row);
      setRowError(e instanceof Error ? e.message : "Changement de statut impossible");
    }
  };

  const applyBulk = async () => {
    if (selected.size === 0) return;
    setBulkSaving(true);
    setRowError(null);
    try {
      await getRepo().updateStatusBulk(Array.from(selected), bulkStatus);
      page.setData((prev) =>
        prev ? { ...prev, rows: prev.rows.map((r) => (selected.has(r.id) ? { ...r, status: bulkStatus } : r)) } : prev
      );
      setSelected(new Set());
    } catch (e) {
      setRowError(e instanceof Error ? e.message : "Changement groupé impossible");
    } finally {
      setBulkSaving(false);
    }
  };

  const rows = page.data?.rows ?? [];
  const total = page.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const hasFilters = Boolean(query.status || query.sector || query.city || query.minScore || query.whatsapp || debouncedSearch);

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  const toggleOne = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle={page.data ? `${total} lead${total > 1 ? "s" : ""}${hasFilters ? " (filtrés)" : ""}` : undefined}
        action={
          <Button variant="primary" size="touch" onClick={() => setAdding(true)}>
            <Plus /> Ajouter un lead
          </Button>
        }
      />

      {/* Filtres */}
      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="relative col-span-2 md:col-span-3 lg:col-span-2">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <Input
            aria-label="Rechercher une entreprise ou une ville"
            placeholder="Entreprise, ville…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSelected(new Set());
            }}
            className="pl-9"
          />
        </div>
        <SelectNative aria-label="Statut" value={query.status} onChange={(e) => patch({ status: e.target.value as LeadStatus | "" })}>
          <option value="">Tous statuts</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </SelectNative>
        <SelectNative aria-label="Secteur" value={query.sector} onChange={(e) => patch({ sector: e.target.value })}>
          <option value="">Tous secteurs</option>
          {(facets.data?.sectors ?? []).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectNative>
        <SelectNative aria-label="Ville" value={query.city} onChange={(e) => patch({ city: e.target.value })}>
          <option value="">Toutes villes</option>
          {(facets.data?.cities ?? []).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectNative>
        <div className="grid grid-cols-2 gap-2">
          <SelectNative aria-label="Score minimum" value={String(query.minScore)} onChange={(e) => patch({ minScore: Number(e.target.value) })} className="font-data">
            <option value="0">Score</option>
            <option value="40">≥ 40</option>
            <option value="70">≥ 70</option>
          </SelectNative>
          <SelectNative aria-label="WhatsApp visible" value={query.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value as WhatsappFilter })}>
            <option value="">WA</option>
            <option value="true">WA oui</option>
            <option value="false">WA non</option>
            <option value="null">WA inconnu</option>
          </SelectNative>
        </div>
      </div>

      {/* Barre de sélection groupée */}
      {selected.size > 0 ? (
        <div className="mb-3 flex flex-wrap items-center gap-3 rounded-sm border border-navy/30 bg-navy-tint px-4 py-2 text-sm text-navy">
          <span className="font-data">{selected.size}</span> sélectionné{selected.size > 1 ? "s" : ""}
          <div className="ml-auto flex items-center gap-2">
            <SelectNative aria-label="Nouveau statut" value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value as LeadStatus)} className="h-8 text-xs">
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </SelectNative>
            <Button size="sm" variant="secondary" onClick={applyBulk} disabled={bulkSaving}>
              {bulkSaving ? "…" : "Appliquer"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
              Annuler
            </Button>
          </div>
        </div>
      ) : null}

      {rowError ? (
        <p role="alert" className="mb-3 text-xs text-danger">
          {rowError}
        </p>
      ) : null}

      {page.loading && !page.data ? (
        <RowsSkeleton rows={10} />
      ) : page.error ? (
        <ErrorState message={page.error} onRetry={page.refetch} />
      ) : rows.length === 0 ? (
        hasFilters ? (
          <EmptyState
            title="Aucun lead ne correspond"
            description="Essaie d'élargir les filtres ou la recherche."
            action={
              <Button
                variant="outline"
                size="touch"
                onClick={() => {
                  setSearchInput("");
                  setQuery(DEFAULT_LEAD_QUERY);
                }}
              >
                Réinitialiser les filtres
              </Button>
            }
          />
        ) : (
          <EmptyState title="Aucun lead pour l'instant" description="Importe un fichier CSV pour remplir la table, ou ajoute un lead à la main." />
        )
      ) : (
        <>
          {/* Desktop : table */}
          <div className={cn("hidden overflow-x-auto rounded-lg border border-line bg-paper md:block", page.loading && "opacity-60 transition-opacity duration-standard")}>
            <table className="w-full min-w-[1000px] table-fixed border-collapse text-sm">
              <colgroup>
                <col style={{ width: 40 }} />
                {COLUMNS.map((c) => (
                  <col key={c.key} style={{ width: c.width }} />
                ))}
              </colgroup>
              <thead>
                <tr className="border-b border-line">
                  <th className="w-10 px-3">
                    <Checkbox aria-label="Tout sélectionner" checked={allSelected} onCheckedChange={toggleAll} />
                  </th>
                  {COLUMNS.map((c) => {
                    const active = query.sort === c.key;
                    const Icon = active ? (query.dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
                    return (
                      <th key={c.key} scope="col" className="h-row px-3 text-left" aria-sort={active ? (query.dir === "asc" ? "ascending" : "descending") : "none"}>
                        <button
                          type="button"
                          onClick={() => sortBy(c.key)}
                          className={cn("typo-label inline-flex h-8 items-center gap-1 rounded-sm hover:text-navy", active && "text-navy")}
                        >
                          {c.label}
                          <Icon className={cn("h-3 w-3", !active && "opacity-40")} />
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const site = websiteHref(row.website);
                  const isSel = selected.has(row.id);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setOpenId(row.id)}
                      className={cn(
                        "h-row cursor-pointer border-b border-line transition-colors duration-micro last:border-b-0 hover:bg-cream/70",
                        isSel && "bg-navy-tint/50"
                      )}
                    >
                      <td className="px-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox aria-label={`Sélectionner ${row.company_name}`} checked={isSel} onCheckedChange={() => toggleOne(row.id)} />
                      </td>
                      <td className="truncate px-3 font-medium text-ink" title={row.company_name}>
                        <button type="button" onClick={() => setOpenId(row.id)} className="max-w-full truncate text-left align-middle hover:underline hover:underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
                          {row.company_name}
                        </button>
                      </td>
                      <td className="truncate px-3 text-ink-muted" title={row.sector ?? undefined}>{row.sector ?? "—"}</td>
                      <td className="truncate px-3" title={row.city ?? undefined}>{row.city ?? "—"}</td>
                      <td className="px-3">
                        <StatusSelect value={row.status} onChange={(s) => changeStatus(row, s)} />
                      </td>
                      <td className="px-3">
                        <ScorePill score={row.lead_score} />
                      </td>
                      <td className="px-3">
                        <NextAction at={row.next_action_at} note={row.next_action_note} showNote className="max-w-full" />
                      </td>
                      <td className="whitespace-nowrap px-3 font-data text-xs">{row.phone ? formatPhone(row.phone) : <span className="text-ink-muted/60">—</span>}</td>
                      <td className="px-3" onClick={(e) => e.stopPropagation()}>
                        {site ? (
                          <a href={site} target="_blank" rel="noopener noreferrer" className="flex max-w-full items-center gap-1 text-navy hover:underline hover:underline-offset-2">
                            <span className="truncate">{websiteLabel(row.website)}</span>
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-ink-muted/60">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile : cartes compactes (DESIGN.md étape 7) */}
          <ul className={cn("flex flex-col gap-2 md:hidden", page.loading && "opacity-60")}>
            {rows.map((row) => {
              const isSel = selected.has(row.id);
              return (
                <li key={row.id} className={cn("rounded-lg border border-line bg-paper p-3", isSel && "border-navy bg-navy-tint/40")}>
                  <div className="flex items-start gap-3">
                    <Checkbox aria-label={`Sélectionner ${row.company_name}`} checked={isSel} onCheckedChange={() => toggleOne(row.id)} className="mt-1" />
                    <button type="button" onClick={() => setOpenId(row.id)} className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
                      <p className="truncate font-medium text-ink">{row.company_name}</p>
                      <p className="truncate text-xs text-ink-muted">{[row.sector, row.city].filter(Boolean).join(" · ") || "—"}</p>
                    </button>
                    <ScorePill score={row.lead_score} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <StatusSelect value={row.status} onChange={(s) => changeStatus(row, s)} />
                    <NextAction at={row.next_action_at} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button asChild={Boolean(row.phone)} variant="secondary" size="touch" disabled={!row.phone}>
                      {row.phone ? <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}>Appeler</a> : <span>Appeler</span>}
                    </Button>
                    <Button variant="outline" size="touch" onClick={() => setOpenId(row.id)}>
                      Fiche
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Pagination serveur, 50 par page */}
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-ink-muted">
            <span className="font-data text-xs">
              {(query.page - 1) * query.pageSize + 1}–{Math.min(query.page * query.pageSize, total)} / {total}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="touch" disabled={query.page <= 1} onClick={() => patch({ page: query.page - 1 })}>
                Précédent
              </Button>
              <span className="grid h-row place-content-center px-2 font-data text-xs">
                {query.page} / {pageCount}
              </span>
              <Button variant="outline" size="touch" disabled={query.page >= pageCount} onClick={() => patch({ page: query.page + 1 })}>
                Suivant
              </Button>
            </div>
          </div>
        </>
      )}

      <LeadPanel leadId={openId} onClose={() => setOpenId(null)} onLeadChange={replaceRow} />
      <AddLeadSheet
        open={adding}
        onOpenChange={setAdding}
        onCreated={() => {
          void page.refetch();
          void facets.refetch();
        }}
      />
    </>
  );
}
