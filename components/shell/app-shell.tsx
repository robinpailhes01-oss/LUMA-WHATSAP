"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Table2, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { DemoBanner } from "@/components/shell/demo-banner";

const NAV = [
  { href: "/", label: "Aujourd'hui", icon: CalendarCheck },
  { href: "/leads", label: "Leads", icon: Table2 },
  { href: "/import", label: "Import", icon: Upload },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Coque de l'app — DESIGN.md étape 5 : sidebar silencieuse (fond cream, entrée active navy + barre 2px),
 * barre de navigation basse 56px sous lg (étape 7).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-dvh lg:flex">
      <aside className="hidden lg:flex lg:w-sidebar lg:shrink-0 lg:flex-col lg:border-r lg:border-line lg:px-4 lg:py-6">
        <Link href="/" className="mb-8 px-3 font-display text-xl font-semibold leading-none text-navy">
          Luma <span className="text-ink-muted">Leads</span>
        </Link>
        <nav aria-label="Navigation principale" className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-9 items-center gap-3 rounded-sm px-3 text-sm transition-colors duration-micro",
                  active ? "font-medium text-navy" : "text-ink-muted hover:bg-navy-tint/60 hover:text-navy"
                )}
              >
                {active && <span aria-hidden className="absolute -left-4 top-2 h-5 w-0.5 bg-navy" />}
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto px-3 text-xs text-ink-muted">L&apos;Employé WhatsApp 24/7</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-bottomnav lg:pb-0">
        <DemoBanner />
        <main className="mx-auto w-full max-w-content flex-1 px-4 py-6 md:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-40 grid h-bottomnav grid-cols-3 border-t border-line bg-cream/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors duration-micro",
                active ? "font-medium text-navy" : "text-ink-muted"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
