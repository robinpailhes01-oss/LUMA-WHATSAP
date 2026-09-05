import { ExternalLink, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { telHref, waHref, websiteHref } from "@/lib/format";
import type { LumaLeadRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

/** Appeler (tel:) · WhatsApp (wa.me) · Site — boutons ≥ 44px en variante tactile. */
export function LeadActions({
  lead,
  size = "default",
  className,
  showSite = true,
}: {
  lead: Pick<LumaLeadRow, "phone" | "website">;
  size?: "default" | "touch";
  className?: string;
  showSite?: boolean;
}) {
  const tel = telHref(lead.phone);
  const wa = waHref(lead.phone);
  const site = websiteHref(lead.website);
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button asChild={Boolean(tel)} variant="secondary" size={size} disabled={!tel}>
        {tel ? (
          <a href={tel}>
            <Phone /> Appeler
          </a>
        ) : (
          <span>
            <Phone /> Appeler
          </span>
        )}
      </Button>
      <Button asChild={Boolean(wa)} variant="outline" size={size} disabled={!wa}>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> WhatsApp
          </a>
        ) : (
          <span>
            <MessageCircle /> WhatsApp
          </span>
        )}
      </Button>
      {showSite ? (
        <Button asChild={Boolean(site)} variant="outline" size={size} disabled={!site}>
          {site ? (
            <a href={site} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Site
            </a>
          ) : (
            <span>
              <ExternalLink /> Site
            </span>
          )}
        </Button>
      ) : null}
    </div>
  );
}
