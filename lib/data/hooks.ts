"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  /** Met à jour la donnée localement après une écriture réussie (évite un rechargement complet). */
  setData: (updater: (prev: T | null) => T | null) => void;
};

/** Chargement asynchrone avec états explicites : chargement / erreur + retry / données. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const version = useRef(0);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const run = useCallback(async () => {
    const v = ++version.current;
    setLoading(true);
    setError(null);
    try {
      const result = await fnRef.current();
      if (v === version.current) setData(result);
    } catch (e) {
      if (v === version.current) setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      if (v === version.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const set = useCallback((updater: (prev: T | null) => T | null) => setData((prev) => updater(prev)), []);

  return { data, loading, error, refetch: run, setData: set };
}
