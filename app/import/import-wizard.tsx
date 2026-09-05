"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import { FileUp } from "lucide-react";

import { PageHeader } from "@/components/shell/page-header";
import { ErrorState } from "@/components/states/states";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";
import { getRepo } from "@/lib/data";
import type { ImportResult } from "@/lib/data/types";
import { autoDetectMapping, IMPORT_FIELDS, rowToLead, type ColumnMapping, type ImportField } from "@/lib/import/mapping";
import { cn } from "@/lib/utils";

type Step = "upload" | "map" | "importing" | "done";

function Steps({ current }: { current: Step }) {
  const items: Array<[Step, string]> = [
    ["upload", "Fichier"],
    ["map", "Colonnes"],
    ["done", "Rapport"],
  ];
  const idx = items.findIndex(([s]) => s === current || (current === "importing" && s === "done"));
  return (
    <ol className="mb-6 flex items-center gap-3 text-xs">
      {items.map(([s, label], i) => (
        <li key={s} className={cn("flex items-center gap-2", i <= idx ? "text-navy" : "text-ink-muted")}>
          <span className={cn("grid h-5 w-5 place-content-center rounded-full border font-data", i <= idx ? "border-navy bg-navy text-cream" : "border-line")}>{i + 1}</span>
          {label}
          {i < items.length - 1 ? <span aria-hidden className="mx-1 h-px w-6 bg-line" /> : null}
        </li>
      ))}
    </ol>
  );
}

/** Import CSV : upload → aperçu 5 lignes → mapping (auto-détecté, corrigeable) → upsert → rapport. */
export function ImportWizard() {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [parseError, setParseError] = useState<string | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const source = useMemo(() => `csv-${new Date().toISOString().slice(0, 10)}`, []);
  const mappedFields = Object.values(mapping).filter(Boolean) as ImportField[];
  const hasCompany = mappedFields.includes("company_name");

  const handleFile = (file: File) => {
    setParseError(null);
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (h) => h.trim(),
      complete: (res) => {
        const hs = (res.meta.fields ?? []).filter(Boolean);
        if (hs.length === 0 || res.data.length === 0) {
          setParseError("Le fichier ne contient aucune ligne exploitable (en-têtes attendus en première ligne).");
          return;
        }
        setHeaders(hs);
        setRows(res.data);
        setMapping(autoDetectMapping(hs));
        setStep("map");
      },
      error: (err) => setParseError(err.message),
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const setField = (header: string, field: ImportField | "") =>
    setMapping((m) => {
      const next: ColumnMapping = { ...m };
      // un champ ne peut être alimenté que par une seule colonne
      if (field) for (const h of Object.keys(next)) if (next[h] === field) next[h] = "";
      next[header] = field;
      return next;
    });

  const runImport = async () => {
    setStep("importing");
    setImportError(null);
    try {
      const leads = rows.map((r) => rowToLead(r, mapping, source));
      const res = await getRepo().importLeads(leads);
      setResult(res);
      setStep("done");
    } catch (e) {
      setImportError(e instanceof Error ? e.message : "Import impossible");
      setStep("map");
    }
  };

  const reset = () => {
    setStep("upload");
    setFileName("");
    setHeaders([]);
    setRows([]);
    setMapping({});
    setResult(null);
    setImportError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <PageHeader title="Importer des leads" subtitle="Un fichier CSV avec une ligne d'en-têtes. Les doublons (entreprise + ville) sont ignorés." />
      <Steps current={step} />

      {step === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center gap-4 rounded-lg border border-dashed bg-paper px-6 py-16 text-center transition-colors duration-micro",
            dragging ? "border-navy bg-navy-tint/40" : "border-line"
          )}
        >
          <FileUp className="h-6 w-6 text-navy" strokeWidth={1.5} />
          <div>
            <p className="font-medium text-ink">Dépose ton fichier CSV ici</p>
            <p className="mt-1 text-sm text-ink-muted">ou choisis-le depuis ton appareil. Séparateur virgule ou point-virgule, UTF-8.</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            id="csv-file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <Button variant="primary" size="touch" onClick={() => inputRef.current?.click()}>
            Choisir un fichier
          </Button>
          {parseError ? (
            <p role="alert" className="text-xs text-danger">
              {parseError}
            </p>
          ) : null}
          <p className="text-xs text-ink-muted">
            Colonnes reconnues automatiquement : entreprise, secteur, ville, téléphone, site, email, WhatsApp, CA, note Google, avis…
          </p>
        </div>
      ) : null}

      {step === "map" || step === "importing" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-data text-xs text-ink-muted">{fileName}</span>
            <span className="text-ink-muted">
              <span className="font-data">{rows.length}</span> ligne{rows.length > 1 ? "s" : ""} · <span className="font-data">{headers.length}</span> colonnes · source{" "}
              <span className="font-data">{source}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={reset} className="ml-auto">
              Changer de fichier
            </Button>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="typo-label">Correspondance des colonnes</h2>
            <div className="overflow-x-auto rounded-lg border border-line bg-paper">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="typo-label h-row px-3 text-left">Colonne CSV</th>
                    <th className="typo-label h-row px-3 text-left">Exemple</th>
                    <th className="typo-label h-row px-3 text-left">Champ Luma</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((h) => (
                    <tr key={h} className="border-b border-line last:border-b-0">
                      <td className="h-row px-3 font-medium text-ink">{h}</td>
                      <td className="max-w-[240px] truncate px-3 font-data text-xs text-ink-muted">{rows[0]?.[h] || "—"}</td>
                      <td className="px-3 py-1">
                        <SelectNative aria-label={`Champ pour ${h}`} value={mapping[h] ?? ""} onChange={(e) => setField(h, e.target.value as ImportField | "")} className={cn("h-8 text-xs", !mapping[h] && "text-ink-muted")}>
                          <option value="">Ignorer</option>
                          {IMPORT_FIELDS.map((f) => (
                            <option key={f.field} value={f.field}>
                              {f.label}
                            </option>
                          ))}
                        </SelectNative>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!hasCompany ? (
              <p role="alert" className="text-xs text-danger">
                Associe une colonne au champ « Entreprise » pour pouvoir importer.
              </p>
            ) : null}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="typo-label">Aperçu — 5 premières lignes</h2>
            <div className="overflow-x-auto rounded-lg border border-line bg-paper">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line">
                    {headers.map((h) => (
                      <th key={h} className={cn("h-9 whitespace-nowrap px-3 text-left font-medium", mapping[h] ? "text-navy" : "text-ink-muted line-through decoration-line")}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((r, i) => (
                    <tr key={i} className="border-b border-line last:border-b-0">
                      {headers.map((h) => (
                        <td key={h} className={cn("h-9 max-w-[200px] truncate whitespace-nowrap px-3", mapping[h] ? "text-ink" : "text-ink-muted/60")}>
                          {r[h] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {importError ? <ErrorState message={importError} onRetry={runImport} /> : null}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="touch" onClick={reset}>
              Annuler
            </Button>
            <Button variant="primary" size="touch" onClick={runImport} disabled={!hasCompany || step === "importing"}>
              {step === "importing" ? "Import en cours…" : `Importer ${rows.length} ligne${rows.length > 1 ? "s" : ""}`}
            </Button>
          </div>
        </div>
      ) : null}

      {step === "done" && result ? (
        <div className="flex flex-col gap-6 rounded-lg border border-line bg-paper p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="typo-label">Ajoutés</span>
              <span className="font-data text-2xl leading-none text-navy">{result.added}</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-line pl-4">
              <span className="typo-label">Ignorés</span>
              <span className="font-data text-2xl leading-none text-ink-muted">{result.skipped}</span>
              <span className="text-xs text-ink-muted">doublons</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-line pl-4">
              <span className="typo-label">Erreurs</span>
              <span className={cn("font-data text-2xl leading-none", result.errors ? "text-danger" : "text-ink-muted")}>{result.errors}</span>
            </div>
          </div>
          {result.errorMessages.length > 0 ? (
            <ul className="max-h-40 overflow-y-auto rounded-sm border border-line bg-cream/60 p-3 font-mono text-xs text-ink-muted">
              {result.errorMessages.slice(0, 50).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="primary" size="touch">
              <Link href="/leads">Voir la table</Link>
            </Button>
            <Button variant="outline" size="touch" onClick={reset}>
              Importer un autre fichier
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
