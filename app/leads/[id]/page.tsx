import { LeadDetail } from "@/app/leads/[id]/lead-detail";

export const metadata = { title: "Fiche lead — Luma Leads" };

export default function LeadPage({ params }: { params: { id: string } }) {
  return <LeadDetail id={params.id} />;
}
