import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/** État vide : une invitation à agir (import CSV), jamais une impasse. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line bg-paper px-6 py-12 md:items-center md:text-center">
      <p className="font-display text-xl text-navy">{title}</p>
      {description ? <p className="max-w-md text-sm text-ink-muted">{description}</p> : null}
      {action ?? (
        <Button asChild variant="primary" size="touch">
          <Link href="/import">Importer un CSV</Link>
        </Button>
      )}
    </div>
  );
}

/** État d'erreur : message + retry. */
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-lg border border-status-red-fg/30 bg-status-red-bg/50 px-6 py-8">
      <div className="flex items-center gap-2 text-status-red-fg">
        <AlertTriangle className="h-4 w-4" />
        <p className="font-medium">Une erreur est survenue</p>
      </div>
      <p className="font-mono text-xs text-ink-muted">{message}</p>
      {onRetry ? (
        <Button variant="outline" size="touch" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </Button>
      ) : null}
    </div>
  );
}

/** Skeleton de lignes 44px (table ou liste). */
export function RowsSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-paper" aria-busy="true" aria-label="Chargement">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex h-row items-center gap-4 px-4">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="hidden h-3 w-24 md:block" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="ml-auto h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
