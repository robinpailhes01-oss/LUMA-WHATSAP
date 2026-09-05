/** Helpers de format — dates relatives (élément signature), téléphones, liens d'action. */

export type NextActionTone = "overdue" | "now" | "soon" | "later";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const dayFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" });
const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
const dateTimeFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});
const longDateTimeFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * "dans 2 h" · "en retard de 1 j" · "demain 09:00" · "jeu. 12 sept." — compte à rebours relatif.
 */
export function formatNextAction(
  iso: string | null | undefined,
  now: Date = new Date()
): { label: string; tone: NextActionTone } | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const diff = date.getTime() - now.getTime();

  if (diff < 0) {
    const late = -diff;
    if (late < HOUR) return { label: `en retard de ${Math.max(1, Math.round(late / MIN))} min`, tone: "overdue" };
    if (late < DAY) return { label: `en retard de ${Math.round(late / HOUR)} h`, tone: "overdue" };
    return { label: `en retard de ${Math.round(late / DAY)} j`, tone: "overdue" };
  }
  if (diff < 15 * MIN) return { label: "maintenant", tone: "now" };
  if (diff < HOUR) return { label: `dans ${Math.round(diff / MIN)} min`, tone: "soon" };
  if (isSameDay(date, now)) return { label: `dans ${Math.round(diff / HOUR)} h`, tone: "soon" };

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (isSameDay(date, tomorrow)) return { label: `demain ${timeFmt.format(date)}`, tone: "later" };
  if (diff < 7 * DAY) return { label: dayFmt.format(date), tone: "later" };
  return { label: dateFmt.format(date), tone: "later" };
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateTimeFmt.format(d);
}

export function formatLongDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : longDateTimeFmt.format(d);
}

/** Valeur pour <input type="datetime-local"> (heure locale, sans secondes). */
export function toDateTimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDateTimeLocal(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Date à J+n, 09:00 heure locale. */
export function atNineInDays(days: number, from: Date = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d;
}

/** "0467123456" → "04 67 12 34 56" ; laisse tel quel si non reconnu. */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  if (digits.length === 11 && digits.startsWith("33")) {
    return ("0" + digits.slice(2)).replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }
  return phone;
}

export function telHref(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

/** wa.me exige l'indicatif international sans "+" : 06… → 336… */
export function waHref(phone: string | null | undefined): string | null {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) digits = "33" + digits.slice(1);
  if (digits.startsWith("0033")) digits = digits.slice(2);
  return digits.length >= 9 ? `https://wa.me/${digits}` : null;
}

export function websiteHref(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function websiteLabel(url: string | null | undefined): string {
  if (!url) return "";
  return url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
}

export function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${Math.round(value)} %`;
}
